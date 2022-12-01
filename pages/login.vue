<template>
  <section class="hero is-grey is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <div class="card">
              <div class="card-content">
                <div class="card-title">
                  <h1 class="has-text-centered">Admin Login</h1>
                </div>
                <form @submit.prevent="login">
                  <b-field
                    :type="{ 'is-danger': errors.has('email') }"
                    :message="errors.first('email')"
                    label="Email"
                  >
                    <b-input
                      v-model="form.email"
                      v-validate="'required|email'"
                      name="email"
                      placeholder="your@email.com"
                    ></b-input>
                  </b-field>
                  <b-field
                    :type="{ 'is-danger': errors.has('password') }"
                    :message="errors.first('password')"
                    label="Password"
                  >
                    <b-input
                      v-model="form.password"
                      v-validate="'required'"
                      type="password"
                      placeholder="Password"
                      password-reveal
                    ></b-input>
                  </b-field>

                  <b-field
                    :type="{ 'is-danger': errors.has('token') }"
                    :message="errors.first('token')"
                    class="m-b-0"
                    label="Token"
                  >
                    <b-input
                      v-model="form.token"
                      v-validate="'required'"
                      type="text"
                      placeholder="Token"
                    ></b-input>
                  </b-field>

                  <div class="field m-t-30 m-b-30">
                    <div class="control">
                      <button
                        :disabled="submitting"
                        :class="{ 'is-loading': submitting }"
                        class="button is-primary is-fullwidth"
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </form>

                <div class="l-card-links">
                  <nuxt-link to="/forgot-password">Forgot password</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'guest',
  middleware: 'guest',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      submitting: false
    }
  },
  methods: {
    async login() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        this.submitting = true
        await this.$auth.login({
          data: {
            email: this.form.email,
            password: this.form.password,
            token: this.form.token
          }
        })
        window.location.reload()
      } catch (e) {
        if (e.response.status === 401) {
          this.$validator.errors.add({
            field: 'email',
            msg: 'Invalid email/password combination.'
          })
        }

        if (e.response.status === 480) {
          this.$validator.errors.add({
            field: 'email',
            msg: 'Please verify your email.'
          })
        }
      }
      this.submitting = false
    }
  }
}
</script>
