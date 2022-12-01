<template>
  <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
    <header class="modal-card-head">
      <p class="modal-card-title">
        <span v-if="formData.id">Update partner</span>
        <span v-else>Add new cost partner</span>
      </p>
      <button @click="isModalActive = false" type="button" class="delete" />
    </header>
    <section class="modal-card-body">
      <div class="content">
        <b-field
          :type="{ 'is-danger': errors.has('name') }"
          :message="errors.first('name')"
          label="Name"
        >
          <b-input
            v-model="formData.name"
            v-validate="'required'"
            name="name"
          ></b-input>
        </b-field>

        <b-field
          :type="{ 'is-danger': errors.has('payment_method') }"
          :message="errors.first('payment_method')"
          label="Payment method"
        >
          <b-select
            v-model="formData.payment_method"
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
        <template v-if="formData.payment_method === 1">
          <b-field
            :type="{ 'is-danger': errors.has('payment_info.name') }"
            :message="errors.first('payment_info.name')"
            label="Beneficiary name"
          >
            <b-input
              v-model="formData.payment_info.name"
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
              v-model="formData.payment_info.street"
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
              v-model="formData.payment_info.city"
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
              v-model="formData.payment_info.postal_code"
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
              v-model="formData.payment_info.country_code"
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
              v-model="formData.payment_info.iban_account_number"
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
              v-model="formData.payment_info.swift_code"
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
              v-model="formData.payment_info.notes"
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
              v-model="formData.payment_info.name"
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
              v-model="formData.payment_info.iban_account_number"
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
              v-model="formData.payment_info.notes"
              v-validate="'required'"
              name="notes"
            ></b-input>
          </b-field>
        </template>
      </div>
    </section>
    <footer class="modal-card-foot">
      <b-button @click="isModalActive = false" label="Close" />
      <b-button @click="submit" label="Submit" type="is-primary" />
    </footer>
  </b-modal>
</template>

<script>
import countries from '@/utils/countries'
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
          name: '',
          payment_method: 1,
          payment_info: {}
        }
      }
    }
  },
  data() {
    return {
      countries: countries,
      isModalActive: false,
      formData: {
        name: '',
        payment_info: {}
      },
      methods: [
        { label: 'Wiretransfer', value: 1 },
        { label: 'Bitsafe', value: 2 },
        { label: 'SEPA', value: 3 }
      ]
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
  },
  methods: {
    submit() {
      this.$emit('submit', this.formData)
    }
  }
}
</script>
