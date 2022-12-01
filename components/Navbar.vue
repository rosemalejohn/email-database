<template>
  <div>
    <nav
      class="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link to="/" class="navbar-item">
            <b>Email Database</b>
          </nuxt-link>

          <div v-if="$auth.user.data" class="d-nav-icons">
            <a
              id="nb"
              @click="mobileNav = !mobileNav"
              role="button"
              class="navbar-burger m-l-0"
              aria-label="menu"
              aria-expanded="false"
            >
              <i class="material-icons">menu</i>
            </a>
          </div>
        </div>
        <!-- if user is auth -->
        <div v-if="user" class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <b-button @click="logout" type="is-primary">Logout </b-button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Add class .collapse to the .d-nav-main to open mobile menu -->
    <div class="d-nav-m is-hidden-desktop">
      <div class="container">
        <div :class="{ collapse: !mobileNav }" class="d-nav-main">
          <nav class="level">
            <div class="level-left">
              <p class="level-item">
                <nuxt-link to="/users">Users</nuxt-link>
              </p>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      mobileNav: 'false'
    }
  },
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
