<template>
  <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
    <header class="modal-card-head">
      <p class="modal-card-title">Filter users</p>
      <button @click="isModalActive = false" type="button" class="delete" />
    </header>
    <section class="modal-card-body">
      <b-field label="Gender">
        <b-select v-model="filters.gender" placeholder="Gender" expanded>
          <option value="">All Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </b-select>
      </b-field>

      <b-field label="Age range" class="is-hidden-mobile w-240 distance-slider">
        <b-slider
          v-model="filters.ages"
          :min="18"
          :max="70"
          :step="1"
          class="tw-w-full"
          size="is-medium"
          type="is-primary"
        >
        </b-slider>
      </b-field>

      <b-field label="Activated">
        <b-select
          v-model="filters.activated"
          placeholder="Filter Activated"
          expanded
        >
          <option value="">All NA and Activated</option>
          <option :value="1">Activated</option>
          <option :value="0">Not Activated</option>
        </b-select>
      </b-field>

      <b-field label="Paying Member">
        <b-select v-model="filters.paying" placeholder="Filter Paying" expanded>
          <option value="">All Member</option>
          <option :value="1">Paying Member</option>
          <option :value="0">Non Paying Member</option>
        </b-select>
      </b-field>

      <b-field label="Status">
        <b-select v-model="filters.status" placeholder="Filter Status" expanded>
          <option value="">All Status</option>
          <option :value="1">New</option>
          <option :value="2">Used</option>
        </b-select>
      </b-field>

      <b-field label="Status">
        <b-select
          v-model="filters.site_id"
          placeholder="Filter Status"
          expanded
        >
          <option value="">All Sites</option>
          <option :value="1">Shagtoday</option>
          <option :value="4">Hookuptoday</option>
          <option :value="5">Hookup69</option>
          <option :value="8">Wannahookup</option>
        </b-select>
      </b-field>

      <b-field label="Date Joined">
        <b-datepicker
          @input="onChangeRange"
          v-model="dateRange"
          placeholder="Filter by date joined"
          range
        >
        </b-datepicker>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <b-button @click="submit">Apply Filters</b-button>
      <b-button @click="exportFilter">Export</b-button>
    </footer>
  </b-modal>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isModalActive: false,
      dateRange: null,
      filters: {
        gender: '',
        activated: '',
        looking_for: '',
        paying: '',
        date_joined: '',
        status: '',
        site_id: '',
        ages: [18, 70]
      }
    }
  },
  watch: {
    value(val) {
      this.filters = val
    }
  },
  mounted() {
    this.filters = this.value
  },
  methods: {
    show() {
      this.isModalActive = true
    },
    submit() {
      this.$emit('input', this.filters)
      this.isModalActive = false
    },
    onChangeRange(dates) {
      const from = dayjs(dates[0])
      const to = dayjs(dates[1])
      this.filters.date_joined = `${from.format('YYYY-MM-DD')},${to.format(
        'YYYY-MM-DD'
      )}`
    },
    exportFilter() {
      this.$emit('export', this.filters)
      this.isModalActive = false
    }
  }
}
</script>
