<template>
  <div class="wrapper">
    <div style="width: 100%; height: 100%">
      <img :src="src" class="branch">
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 200px;
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

  width: 100%;

  background-size: cover;
}
</style>
