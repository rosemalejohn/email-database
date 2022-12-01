<template>
  <div>
    <!-- Navbar -->
    <navbar v-if="showLayout" />
    <!-- Error content -->
    <section class="hero is-grey is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-half is-offset-3 has-text-centered">
              <h1 class="has-text-centered has-text-size-xl">
                Unfortunately, we have a problem
              </h1>
              <p class="m-t-40 has-text-black">
                We have encountered an unusual problem. Our technical team has
                been informed.
              </p>

              <div class="bth-container m-t-50">
                <router-link
                  :to="{ path: '/' }"
                  class="button is-primary is-fullwidth"
                >
                  Back to home
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
  props: {
    error: {
      type: Object,
      default() {
        return {
          showLayout: true
        }
      }
    }
  },
  computed: {
    showLayout() {
      if (this.error.showLayout !== undefined) {
        return this.error.showLayout
      }
      return true
    }
  }
}
</script>
