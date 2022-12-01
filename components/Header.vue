<template>
  <div class="d-nav is-hidden-mobile">
    <div class="container">
      <!-- Add class .collapse to the .d-nav-main to open mobile menu -->
      <div class="d-nav-main is-hidden-touch">
        <nav class="level">
          <div class="level-left">
            <p class="level-item">
              <nuxt-link to="/users">Users</nuxt-link>
            </p>
            <p class="level-item">
              <nuxt-link to="/settings">Settings</nuxt-link>
            </p>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: state => state.auth.user.data
    })
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
