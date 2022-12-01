export const state = () => ({
  errors_validation: {},
  login_failed: false
})

export const getters = {
  errors(state) {
    return state.errors_validation
  },

  login_failed(state) {
    return state.login_failed
  }
}

export const mutations = {
  SET_VALIDATION_ERRORS(state, errors) {
    state.errors_validation = errors
  },

  SET_FAILED_LOGIN(state, error) {
    state.login_failed = error
  },

  SET_TRY_LOGIN(state) {
    state.login_failed = false
  }
}

export const actions = {
  setErrors({ commit }, errors) {
    commit('SET_VALIDATION_ERRORS', errors)
  },
  failedLogin({ commit }, error) {
    commit('SET_FAILED_LOGIN', error)
  },
  clearErrors({ commit }) {
    commit('SET_VALIDATION_ERRORS', {})
    commit('SET_TRY_LOGIN')
  }
}
