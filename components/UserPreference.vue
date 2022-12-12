<template>
  <div>
    <p class="mb-0 has-text-black">
      Photo: {{ preference.photos ? 'Yes' : 'No' }}
    </p>
    <p class="mb-0 has-text-black">
      Online: {{ preference.online ? 'Yes' : 'No' }}
    </p>
    <p class="mb-0 has-text-black">Looking for: {{ preference.looking_for }}</p>
    <p class="mb-0 has-text-black">Ages: {{ preference.ages }}</p>
    <p class="mb-0 has-text-black">Lives in: {{ preference.lives_in }}</p>
  </div>
</template>

<script>
export default {
  props: {
    preference: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
