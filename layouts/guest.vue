<template>
  <div>
    <!-- Begin navbar -->
    <navbar />
    <!-- End navbar -->
    <nuxt />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
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
