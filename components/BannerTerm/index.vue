<template>
  <div class="bannerWrapper">
    <p class="title">{{ title }}</p>
    <CustomIcon :type="iconType" :is-custom-size="true" class="icon" />
  </div>

</template>

<script setup lang="ts">
import type { TypeIcon } from '../CustomIcon/index.vue';

defineProps<{
  title: string,
  iconType: TypeIcon
}>()
</script>

<style lang="scss" scoped>
@import url("./index.scss")
</style>