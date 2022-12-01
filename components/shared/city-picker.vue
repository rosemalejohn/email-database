<template>
  <b-autocomplete
    :value="selected"
    :data="cities"
    :loading="isFetchingCity"
    @typing="getCities"
    @select="onCitySelect"
    placeholder="Search city"
  >
    <span slot-scope="props">{{ props.option.name }}</span>
    <span slot="empty">No cities found</span>
  </b-autocomplete>
</template>

<script>
import { debounce } from 'lodash'
import City from '@/models/City'

export default {
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      selected: null,
      isFetchingCity: false,
      cities: []
    }
  },
  watch: {
    value(val) {
      this.selected = val
    }
  },
  mounted() {
    this.selected = this.value
  },
  methods: {
    getCities: debounce(function(searchKey = '') {
      if (!searchKey) {
        return this.$emit('cleared')
      }
      this.isFetchingCity = true
      return City.where('nameStarts', searchKey)
        .get()
        .then(({ data }) => {
          this.cities = data
        })
        .catch(() => {})
        .then(() => {
          this.isFetchingCity = false
        })
    }, 500),
    onCitySelect(city) {
      this.$emit('input', city)
    }
  }
}
</script>
