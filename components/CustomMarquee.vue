<script setup>
import { onMounted, ref } from 'vue';

const marqueeContent = ref(null);
let animationFrameId = null;

const animateMarquee = () => {
  const contentWidth = marqueeContent.value.offsetWidth / 2; // Since content is duplicated
  let currentPosition = 0;

  const step = () => {
    currentPosition -= 1; // Adjust speed as necessary
    if (Math.abs(currentPosition) >= contentWidth) {
      currentPosition += contentWidth; // Reset to start position of duplicated content
    }
    marqueeContent.value.style.transform = `translateX(${currentPosition}px)`;
    animationFrameId = requestAnimationFrame(step);
  };

  step();
};

onMounted(() => {
  animateMarquee();
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<template>
  <div class="custom-marquee" ref="marquee">
    <div class="marquee-content" ref="marqueeContent">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.custom-marquee {
  overflow: hidden;
  white-space: nowrap;
}

.marquee-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  will-change: transform;
}
</style>