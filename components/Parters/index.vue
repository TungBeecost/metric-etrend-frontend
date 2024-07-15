<template>
  <div class="wrapper">
    <div class="sectionHeader">
      <p class="sectionTitle">Hơn 1000+ đối tác tin cậy của Metric</p>
    </div>
    <CustomMarquee class="marqueeWrapper">
      <BrandItem v-for="(branch, index) in PARTERS" :key="index" :src="branch" class="parterItem" />
    </CustomMarquee>
  </div>
</template>

<script setup lang="ts">
import { PARTERS } from "~/constant/constains"
import CustomMarquee from "@/components/CustomMarquee.vue"
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>