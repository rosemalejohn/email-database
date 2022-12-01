import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  events: 'blur|input'
})

Vue.prototype.$setErrorsFromResponse = function(errorResponse) {
  // only allow this function to be run if the validator exists
  if (!this.$validator) {
    return
  }

  // clear errors
  this.$validator.errors.clear()

  // check if errors exist
  if (!errorResponse.errors) {
    return
  }

  const errorFields = Object.keys(errorResponse.errors)

  // insert laravel errors
  errorFields.map(field => {
    const msg = errorResponse.errors[field].join(', ')

    this.$validator.errors.add({ field, msg })
  })
}
