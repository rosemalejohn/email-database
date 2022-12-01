<template>
  <div></div>
</template>

<script>
export default {
  layout: 'admin',
  created() {
    if (this.$auth.user) {
      this.$router.replace('/users')
    } else {
      this.$router.replace('/login')
    }
  }
}
</script>
