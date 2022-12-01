<template>
  <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
    <header class="modal-card-head">
      <p class="modal-card-title">Cost breakdowns</p>
      <button @click="isModalActive = false" type="button" class="delete" />
    </header>
    <section class="modal-card-body">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Category</th>
            <th>Period</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(breakdown, i) in breakdowns" :key="i">
            <td>{{ breakdown.title }}</td>
            <td>{{ breakdown.amount }}</td>
            <td>{{ breakdown.currency }}</td>
            <td>
              <span v-if="breakdown.category">
                {{ breakdown.category.code }}
                <span v-if="breakdown.category.code && breakdown.category.name">
                  - </span
                >{{ breakdown.category.name }}</span
              >
            </td>
            <td>
              {{ breakdown.period_from }}
              <span v-if="breakdown.period_from && breakdown.period_to"
                >to</span
              >
              {{ breakdown.period_to }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="modal-card-foot"></footer>
  </b-modal>
</template>

<script>
export default {
  props: {
    breakdowns: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isModalActive: false
    }
  },
  watch: {
    isModalActive(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.isModalActive = val
    }
  },
  mounted() {
    this.isModalActive = this.value
  }
}
</script>
