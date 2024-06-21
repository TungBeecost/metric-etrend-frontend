<template>
  <div class="wrapper">
    <NuxtImg :src="src" class="branch" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string,
  width?: string,
  height?: string
}>()
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 173px;
  height: 100px;
  padding: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.branch {
  border-radius: 8px;
  background: #FFF;
}
</style>