<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="app-title">
    <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="32" rx="4" fill="#EEEBFF"/>
    </svg>
    <h2 class="title">{{text}}</h2>
  </div>
</template>

<style scoped lang="scss">
.app-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 0.25rem;
  h2.title {
    display: inline-block;
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #241E46;
  }
}
</style>
