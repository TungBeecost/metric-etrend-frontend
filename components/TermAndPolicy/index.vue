<template>
  <div class="wrapper">
    <TermAndPolicySidebarTerm />
    <div class="content">
      <TermAndPolicyBannerTerm :icon-type="banner.type" :title="banner.title" />

      <div class="detail">
        <slot name="detail" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TypeIcon } from '../CustomIcon/index.vue';

defineProps<{
  banner: {
    type: TypeIcon,
    title: string,
  },

}>()
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>