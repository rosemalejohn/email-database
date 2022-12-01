<template>
  <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
    <header class="modal-card-head">
      <p class="modal-card-title">Add reason</p>
      <button @click="isModalActive = false" type="button" class="delete" />
    </header>
    <section class="modal-card-body">
      <b-field
        :type="{ 'is-danger': errors.has('applicant_name') }"
        :message="errors.first('applicant_name')"
        label="Reason"
      >
        <b-input
          v-model="form.adjustment_reason"
          v-validate="'required'"
          type="textarea"
          data-vv-as="adjustment reason"
          name="adjustment_reason"
        >
        </b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <b-button @click="submit">Send request</b-button>
    </footer>
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
      isModalActive: false,
      form: {
        adjustment_reason: ''
      }
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
  },
  methods: {
    submit() {
      this.$emit('submit', this.form)
    }
  }
}
</script>
