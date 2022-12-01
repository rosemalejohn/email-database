<template>
  <div>
    <!-- Begin navbar -->
    <navbar />
    <!-- End navbar -->
    <!-- Begin dashboard nav -->
    <nav-header />
    <!-- End dashboard nav -->
    <div class="container section">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import NavHeader from '@/components/Header'

export default {
  components: {
    Navbar,
    NavHeader
  },
  head() {
    return {
      htmlAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
</style>
