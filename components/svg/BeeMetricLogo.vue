<script setup>

defineProps({
  cs: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <!--  <svg width="236" height="100" viewBox="0 0 236 100" fill="none" xmlns="http://www.w3.org/2000/svg">-->
  <!--    <image width="236" height="100" :href="'/images/metric_logo.svg'" preserveAspectRatio="xMidYMid meet" />-->
  <NuxtImg src="/images/metric_logo.svg" alt="Metric"/>
  <!--  </svg>-->
</template>
