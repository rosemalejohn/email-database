<template>
  <div class="dmy-picker">
    <b-select v-model="date.day" expanded>
      <option v-for="d in days" :value="d" :key="d">
        {{ d }}
      </option>
    </b-select>
    <b-select v-model="date.month" expanded>
      <option v-for="m in months" :value="m.value" :key="m.value">
        {{ m.text }}
      </option>
    </b-select>
    <b-select v-model="date.year" expanded>
      <option v-for="y in years" :value="y" :key="y">
        {{ y }}
      </option>
    </b-select>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    maxDate: {
      type: [String, Date],
      default: () => ''
    },
    minDate: {
      type: [String, Date],
      default: () => ''
    },
    yearRange: {
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      date: {
        day: 0,
        month: 0,
        year: 0
      }
    }
  },

  computed: {
    dmaxDate() {
      return this.maxDate ? dayjs(this.maxDate) : dayjs()
    },
    dminDate() {
      return this.minDate
        ? dayjs(this.minDate)
        : this.dmaxDate.subtract(this.yearRange, 'year')
    },
    ddateValue() {
      return dayjs(this.dateString)
    },
    daysInMonth() {
      return dayjs(`${this.date.year}-${this.date.month}-1`).daysInMonth() || 30
    },
    dateString() {
      const d = String(this.date.day).padStart(2, '0')
      const m = String(this.date.month).padStart(2, '0')
      const y = String(this.date.year)
      return `${y}-${m}-${d}`
    },
    months() {
      return [
        { value: 1, text: 'Jan' },
        { value: 2, text: 'Feb' },
        { value: 3, text: 'Mar' },
        { value: 4, text: 'Apr' },
        { value: 5, text: 'May' },
        { value: 6, text: 'Jun' },
        { value: 7, text: 'Jul' },
        { value: 8, text: 'Aug' },
        { value: 9, text: 'Sep' },
        { value: 10, text: 'Oct' },
        { value: 11, text: 'Nov' },
        { value: 12, text: 'Dec' }
      ]
    },
    days() {
      return Array.from({ length: this.daysInMonth }, (v, k) => k + 1)
    },
    years() {
      return Array.from(
        { length: (this.dmaxDate.year() - this.dminDate.year()) / 1 + 1 },
        (_, i) => this.dminDate.year() + i * 1
      ).reverse()
    },
    hasError() {
      return !!this.errorMessages
    },
    errorMessage() {
      if (this.errorMessages instanceof Array) {
        return this.errorMessages[0]
      } else {
        return this.errorMessages
      }
    }
  },

  watch: {
    value(val) {
      this.setDate()
    },
    'date.month'() {
      if (this.date.day > this.daysInMonth) {
        this.date.day = this.daysInMonth
      }
    },
    dateString(value) {
      if (this.ddateValue.isValid()) {
        this.$emit('input', value)
      }
    }
  },

  created() {
    this.setDate()
  },

  methods: {
    setDate() {
      if (this.value) {
        const dValue = dayjs(this.value)
        this.date = {
          day: dValue.date(),
          month: dValue.month() + 1,
          year: dValue.year()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dmy-picker {
  display: flex;
  .control {
    width: 100%;
  }
}
</style>
