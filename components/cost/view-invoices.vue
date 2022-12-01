<template>
  <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
    <header class="modal-card-head">
      <p class="modal-card-title">View Invoices</p>
      <button @click="show(false)" type="button" class="delete" />
    </header>
    <section class="modal-card-body">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">File name</th>
            <th width="10%" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <th>{{ invoice.id }}</th>
            <td>{{ invoice.file_name }}</td>
            <td>
              <b-button
                @click="downloadInvoice(invoice)"
                size="sm"
                variant="outline-primary"
                >Download</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </b-modal>
</template>

<script>
export default {
  props: {
    invoices: {
      type: Array,
      default() {
        return []
      }
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
  methods: {
    show(show = true) {
      this.isModalActive = show
    },
    downloadInvoice(file) {
      window.open(file.url, '_blank')
    }
  }
}
</script>
