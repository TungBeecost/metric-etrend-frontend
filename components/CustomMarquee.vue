<template>
  <div class="custom-marquee">
    <div class="marquee-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@keyframes marqueeEffect {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-200%); /* Adjusted for the duplicated content */
  }
}

.custom-marquee {
  overflow: hidden;
  white-space: nowrap;
}

.marquee-content {
  display: flex;
  flex-direction: row;
  animation: marqueeEffect 60s linear infinite; /* Adjusted duration for the duplicated content */
  will-change: transform;
}
</style>