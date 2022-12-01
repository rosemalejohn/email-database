<template>
  <div v-if="form">
    <form @submit.prevent="submit">
      <b-field
        :type="{ 'is-danger': errors.has('applicant_name') }"
        :message="errors.first('applicant_name')"
        label="Applicant name"
      >
        <b-input
          v-model="form.applicant_name"
          v-validate="'required'"
          data-vv-as="applicant name"
          name="applicant_name"
        ></b-input>
      </b-field>

      <b-field
        :type="{ 'is-danger': errors.has('email') }"
        :message="errors.first('email')"
        label="Email"
      >
        <b-input
          v-model="form.email"
          v-validate="'email'"
          type="email"
          name="email"
        ></b-input>
      </b-field>

      <b-field
        :type="{ 'is-danger': errors.has('invoice_number') }"
        :message="errors.first('invoice_number')"
        label="Invoice Number"
      >
        <b-input
          v-model="form.invoice_number"
          v-validate="'required'"
          data-vv-as="invoice number"
          name="invoice_number"
        ></b-input>
      </b-field>

      <b-field
        :type="{ 'is-danger': errors.has('currency') }"
        :message="errors.first('currency')"
        label="Currency"
      >
        <b-select
          v-model="form.currency"
          data-vv-as="currency"
          expanded
          name="currency"
        >
          <option
            v-for="currency in currencies"
            :value="currency"
            :key="currency"
          >
            {{ currency }}
          </option>
        </b-select>
      </b-field>

      <b-field
        :type="{ 'is-danger': errors.has('cost_partner_id') }"
        :message="errors.first('cost_partner_id')"
        label="Select Partner"
      >
        <b-select
          @input="onPartnerChanged"
          v-model="form.cost_partner_id"
          data-vv-as="partner"
          expanded
          name="cost_partner_id"
        >
          <option
            v-for="partner in partners"
            :value="partner.id"
            :key="partner.id"
          >
            {{ partner.name }}
          </option>
        </b-select>
      </b-field>

      <b-field
        :type="{ 'is-danger': errors.has('payment_method') }"
        :message="errors.first('payment_method')"
        label="Payment method"
      >
        <b-select
          v-model="form.payment_method"
          data-vv-as="payment_method"
          expanded
          name="payment_method"
        >
          <option
            v-for="method in methods"
            :value="method.value"
            :key="method.value"
          >
            {{ method.label }}
          </option>
        </b-select>
      </b-field>

      <!-- Wiretransfer -->
      <template v-if="form.payment_method === 1">
        <b-field
          :type="{ 'is-danger': errors.has('payment_info.name') }"
          :message="errors.first('payment_info.name')"
          label="Beneficiary name"
        >
          <b-input
            v-model="form.payment_info.name"
            v-validate="'required'"
            data-vv-as="beneficiary name"
            name="beneficiary_name"
          ></b-input>
        </b-field>

        <b-field
          :type="{ 'is-danger': errors.has('payment_info.street') }"
          :message="errors.first('payment_info.street')"
          label="Beneficiary street"
        >
          <b-input
            v-model="form.payment_info.street"
            v-validate="'required'"
            data-vv-as="beneficiary street"
            name="beneficiary_street"
          ></b-input>
        </b-field>

        <b-field
          :type="{ 'is-danger': errors.has('payment_info.city') }"
          :message="errors.first('payment_info.city')"
          label="Beneficiary city"
        >
          <b-input
            v-model="form.payment_info.city"
            v-validate="'required'"
            data-vv-as="beneficiary city"
            name="beneficiary_city"
          ></b-input>
        </b-field>

        <b-field
          :type="{
            'is-danger': errors.has('payment_info.postal_code')
          }"
          :message="errors.first('payment_info.postal_code')"
          label="Beneficiary postal code"
        >
          <b-input
            v-model="form.payment_info.postal_code"
            v-validate="'required'"
            data-vv-as="beneficiary postal_code"
            name="beneficiary_postal_code"
          ></b-input>
        </b-field>

        <b-field
          :type="{
            'is-danger': errors.has('payment_info.country_code')
          }"
          :message="errors.first('payment_info.country_code')"
          label="Country"
        >
          <b-select
            v-model="form.payment_info.country_code"
            data-vv-as="country code"
            expanded
            name="country_code"
          >
            <option
              v-for="(country, code) in countries"
              :key="code"
              :value="code"
            >
              {{ country }}
            </option>
          </b-select>
        </b-field>

        <b-field
          :type="{
            'is-danger': errors.has('payment_info.iban_account_number')
          }"
          :message="errors.first('payment_info.iban_account_number')"
          label="Beneficiary IBAN account number"
        >
          <b-input
            v-model="form.payment_info.iban_account_number"
            v-validate="'required'"
            data-vv-as="beneficiary IBAN account number"
            name="beneficiary_iban_account_number"
          ></b-input>
        </b-field>

        <b-field
          :type="{
            'is-danger': errors.has('payment_info.swift_code')
          }"
          :message="errors.first('payment_info.swift_code')"
          label="Beneficiary Swift Code"
        >
          <b-input
            v-model="form.payment_info.swift_code"
            v-validate="'required'"
            data-vv-as="beneficiary Swift code"
            name="swift_code"
          ></b-input>
        </b-field>

        <b-field
          :type="{
            'is-danger': errors.has('payment_info.notes')
          }"
          :message="errors.first('payment_info.notes')"
          label="Notes"
        >
          <b-input
            v-model="form.payment_info.notes"
            v-validate="'required'"
            name="notes"
          ></b-input>
        </b-field>
      </template>

      <!-- Bitsafe and SEPA -->
      <template v-else>
        <b-field
          :type="{ 'is-danger': errors.has('payment_info.name') }"
          :message="errors.first('payment_info.name')"
          label="Beneficiary name"
        >
          <b-input
            v-model="form.payment_info.name"
            v-validate="'required'"
            data-vv-as="beneficiary name"
            name="beneficiary_name"
          ></b-input>
        </b-field>

        <b-field
          :type="{
            'is-danger': errors.has('payment_info.iban_account_number')
          }"
          :message="errors.first('payment_info.iban_account_number')"
          label="Beneficiary IBAN account number"
        >
          <b-input
            v-model="form.payment_info.iban_account_number"
            v-validate="'required'"
            data-vv-as="beneficiary IBAN account number"
            name="beneficiary_iban_account_number"
          ></b-input>
        </b-field>

        <b-field
          :type="{
            'is-danger': errors.has('payment_info.notes')
          }"
          :message="errors.first('payment_info.notes')"
          label="Notes"
        >
          <b-input
            v-model="form.payment_info.notes"
            v-validate="'required'"
            name="notes"
          ></b-input>
        </b-field>
      </template>

      <b-field label="Attach invoice">
        <b-field
          :class="{ 'has-name': !!form.invoice_file }"
          class="file is-primary"
        >
          <!-- <b-upload v-model="form.invoice_file" class="file-label" multiple>
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">Click to upload</span>
            </span>
            <span v-if="form.invoice_file" class="file-name">
              {{ form.invoice_file.name }}
            </span>
          </b-upload> -->

          <b-upload v-model="form.invoice_file" multiple class="file-label">
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">Click to upload</span>
            </span>
          </b-upload>
        </b-field>
      </b-field>

      <div class="tags">
        <span
          v-for="(file, index) in form.invoice_file"
          :key="index"
          class="tag is-primary"
        >
          {{ file.name || file.file_name }}
          <button
            @click="deleteFile(index)"
            class="delete is-small"
            type="button"
          ></button>
        </span>
      </div>

      <div class="level">
        <div class="level-left">
          <p class="title is-6 is-spaced">Breakdowns</p>
        </div>
        <div class="level-right">
          <b-button @click="addNewBreakdown" size="is-small">Add new</b-button>
        </div>
      </div>

      <div v-if="form.breakdowns.length" class="content">
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Category</th>
              <th>Title</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Period</th>
              <th width="15%"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(breakdown, i) in form.breakdowns" :key="i">
              <td>{{ breakdown.category_text }}</td>
              <td>{{ breakdown.title }}</td>
              <td>{{ form.currency }}</td>
              <td>{{ breakdown.amount }}</td>
              <td>
                {{ breakdown.period_from }}
                <span v-if="breakdown.period_from && breakdown.period_to"
                  >to</span
                >
                {{ breakdown.period_to }}
              </td>
              <td>
                <b-button
                  @click="updateBreakdown(breakdown)"
                  style="padding-top: 2px; padding-bottom: 2px"
                  type="is-success"
                  icon-right="pencil"
                  size="is-small"
                />
                <b-button
                  @click="deleteBreakdown(i)"
                  style="padding-top: 2px; padding-bottom: 2px"
                  type="is-danger"
                  icon-right="delete"
                  size="is-small"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="field m-t-30 m-b-30">
        <div class="control">
          <button
            :disabled="submitting"
            :class="{ 'is-loading': submitting }"
            class="button is-primary is-fullwidth"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>

    <breakdown
      @submit="onBreakdownAdded"
      :show.sync="isCostBreakdownModalActive"
      v-model="selectedBreakdown"
    />
  </div>
</template>

<script>
import { find } from 'lodash'
import CostPartner from '@/models/CostPartner'
import countries from '@/utils/countries'
import Breakdown from '@/components/cost/breakdown'

export default {
  components: {
    Breakdown
  },
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
      isCostBreakdownModalActive: false,
      selectedBreakdown: null,
      submitting: false,
      countries: countries,
      partners: [],
      categories: [],
      currencies: ['USD', 'GBP', 'EUR'],
      methods: [
        { label: 'Wiretransfer', value: 1 },
        { label: 'Bitsafe', value: 2 },
        { label: 'SEPA', value: 3 }
      ],
      form: {
        applicant_name: '',
        email: '',
        invoice_number: '',
        cost_partner_id: null,
        breakdowns: [],
        invoice_file: null,
        currency: 'USD',
        payment_method: 1,
        payment_info: {}
      }
    }
  },
  watch: {
    value(val) {
      this.form = val
    },
    form(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    this.form = this.value
    this.getPartners()
  },
  methods: {
    async getPartners() {
      const { data } = await CostPartner.get()
      this.partners = data
    },
    deleteBreakdown(index) {
      this.form.breakdowns.splice(index, 1)
    },
    updateBreakdown(breakdown) {
      this.selectedBreakdown = breakdown
      this.isCostBreakdownModalActive = true
    },
    addNewBreakdown() {
      this.selectedBreakdown = null
      this.isCostBreakdownModalActive = true
    },
    onBreakdownAdded(breakdown) {
      delete breakdown.period
      breakdown.currency = this.form.currency
      this.form.breakdowns.push(breakdown)
    },
    onPartnerChanged() {
      const partner = find(this.partners, partner => {
        return partner.id === this.form.cost_partner_id
      })
      if (partner && partner.payment_method) {
        this.form.payment_method = partner.payment_method
        this.form.payment_info = partner.payment_info
      }
    },
    deleteFile(index) {
      this.form.invoice_file.splice(index, 1)
    },
    submit() {
      this.$emit('submit', this.form)
    }
  }
}
</script>
