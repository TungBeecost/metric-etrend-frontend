<template>
  <div class="bannerWrapper">
    <div class="title">{{ title }}</div>
    <CustomIcon :type="iconType" :is-custom-size="true" class="icon" />
  </div>

</template>

<script setup lang="ts">
import type { TypeIcon } from '~/components/CustomIcon/index.vue';

defineProps<{
  title: string,
  iconType: TypeIcon
}>()
</script>

<style lang="scss" scoped>
@import url("./index.scss")
</style>