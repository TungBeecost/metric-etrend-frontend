<template>
  <div class="wrapper">
    <div class="sectionHeader">
      <p class="sectionTitle">Hơn 500+ đối tác tin cậy của Metric</p>
    </div>
    <Vue3Marquee gradient="true">
      <BrandItem v-for="(branch, index) in PARTERS" :key="index" :src="branch" class="parterItem" />
    </Vue3Marquee>
  </div>
</template>

<script setup lang="ts">
import { PARTERS } from "~/constant/constains"

</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>