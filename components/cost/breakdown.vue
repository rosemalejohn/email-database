<template>
  <b-modal :active.sync="showModal" :width="640" scroll="keep">
    <header class="modal-card-head">
      <p class="modal-card-title">
        <span v-if="isUpdating">Update cost breakdown</span>
        <span v-else>Add cost breakdown</span>
      </p>
      <button @click="showModal = false" type="button" class="delete" />
    </header>
    <section class="modal-card-body">
      <div v-if="form" class="content">
        <b-field
          :type="{ 'is-danger': errors.has('cost_category_id') }"
          :message="errors.first('cost_category_id')"
          label="Select Category"
        >
          <b-select
            v-validate="'required'"
            v-model="form.cost_category_id"
            data-vv-as="category"
            expanded
            name="cost_category_id"
          >
            <option
              v-for="category in categories"
              :value="category.id"
              :key="category.id"
            >
              {{ category.code }}
              <span v-if="category.code && category.name"> - </span
              >{{ category.name }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Date period">
          <b-datepicker
            v-model="form.period"
            expanded
            placeholder="Click to select..."
            range
          >
          </b-datepicker>
        </b-field>

        <b-field
          :type="{ 'is-danger': errors.has('title') }"
          :message="errors.first('title')"
          label="Title"
        >
          <b-input
            v-model="form.title"
            v-validate="'required'"
            name="title"
          ></b-input>
        </b-field>

        <b-field
          :type="{ 'is-danger': errors.has('amount') }"
          :message="errors.first('amount')"
          label="Amount"
        >
          <b-input
            v-model="form.amount"
            v-validate="{ required: true, regex: /^\d*\.?\d*$/ }"
            name="amount"
          ></b-input>
        </b-field>
      </div>
    </section>
    <footer class="modal-card-foot">
      <b-button @click="showModal = false" label="Close" />
      <b-button
        @click="submit"
        :label="isUpdating ? 'Update breakdown' : 'Add breakdown'"
        type="is-primary"
      />
    </footer>
  </b-modal>
</template>

<script>
import dayjs from 'dayjs'
import { find } from 'lodash'
import CostCategory from '@/models/CostCategory'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default() {
        return {
          title: '',
          cost_category_id: null,
          amount: null,
          currency: 'GBP',
          period: null
        }
      }
    }
  },
  data() {
    return {
      categories: [],
      form: this.value,
      showModal: false
    }
  },
  computed: {
    isUpdating() {
      return !!this.value
    }
  },
  watch: {
    show(val) {
      this.showModal = val
    },
    showModal(val) {
      this.$emit('update:show', val)
    },
    value(val) {
      if (!val) {
        this.initForm()
      } else {
        this.form = val
        this.form.period = [
          new Date(this.form.period_from),
          new Date(this.form.period_to)
        ]
      }
    }
  },
  mounted() {
    this.getCategories()
    this.isModalActive = this.value
    this.initForm()
  },
  methods: {
    async getCategories() {
      const { data } = await CostCategory.get()
      this.categories = data
    },
    initForm() {
      this.form = {
        title: '',
        cost_category_id: null,
        amount: null,
        currency: 'GBP',
        period: null
      }
    },
    submit() {
      const category = find(this.categories, category => {
        return category.id === this.form.cost_category_id
      })
      if (category) {
        this.form.category_text = `${category.code || ''} ${category.name ||
          ''}`
      }
      if (this.form.period) {
        this.form.period_from = dayjs(this.form.period[0]).format('YYYY-MM-DD')
        this.form.period_to = dayjs(this.form.period[1]).format('YYYY-MM-DD')
      }

      if (this.value) {
        this.$emit('input', this.form)
      } else {
        this.$emit('submit', this.form)
      }

      this.initForm()
      this.showModal = false
    }
  }
}
</script>
