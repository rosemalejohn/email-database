export default function({ $axios, store, app }) {
  $axios.onError(error => {
    if (error && error.response && error.response.status === 422) {
      store.dispatch('validation/setErrors', error.response.data.errors)
    }

    if (error && error.response) {
      store.dispatch('validation/failedLogin', error.response.status)
    }

    return Promise.reject(error)
  })

  $axios.onResponse(() => {
    // alert('test')
  })

  $axios.onRequest(() => {
    store.dispatch('validation/clearErrors')
  })
}
