<template>
  <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
    <header class="modal-card-head">
      <p class="modal-card-title">Add new cost category</p>
      <button @click="isModalActive = false" type="button" class="delete" />
    </header>
    <section class="modal-card-body">
      <div class="content">
        <b-field
          :type="{ 'is-danger': errors.has('code') }"
          :message="errors.first('code')"
          label="Code"
        >
          <b-input
            v-model="formData.code"
            v-validate="'required'"
            name="code"
          ></b-input>
        </b-field>
        <b-field
          :type="{ 'is-danger': errors.has('name') }"
          :message="errors.first('name')"
          label="Name"
        >
          <b-input v-model="formData.name" name="name"></b-input>
        </b-field>
        <b-field
          :type="{ 'is-danger': errors.has('parent_id') }"
          :message="errors.first('parent_id')"
          label="Parent"
        >
          <b-select
            v-model="formData.parent_id"
            placeholder="Select parent category"
            name="parent_id"
            expanded
          >
            <template v-for="option in categories">
              <option
                v-if="option.id !== formData.id"
                :value="option.id"
                :key="option.id"
              >
                {{ option.code
                }}<span v-if="option.code && option.name"> - </span
                >{{ option.name }}
              </option>
            </template>
          </b-select>
        </b-field>
      </div>
    </section>
    <footer class="modal-card-foot">
      <b-button @click="isModalActive = false" label="Close" />
      <b-button @click="submit" label="Submit" type="is-primary" />
    </footer>
  </b-modal>
</template>

<script>
import CostCategory from '@/models/CostCategory'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default() {
        return {
          name: ''
        }
      }
    }
  },
  data() {
    return {
      isModalActive: false,
      categories: [],
      formData: {
        name: ''
      }
    }
  },
  watch: {
    isModalActive(val) {
      this.$emit('input', val)
    },
    value(val) {
      if (val) {
        this.formData = this.form
      }
      this.isModalActive = val
    }
  },
  mounted() {
    this.isModalActive = this.value
    this.formData = this.form
    this.getCategories()
  },
  methods: {
    async getCategories() {
      const { data } = await CostCategory.get()
      this.categories = data
    },
    submit() {
      this.$emit('submit', this.formData)
      this.isModalActive = false
    }
  }
}
</script>
