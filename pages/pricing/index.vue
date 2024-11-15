<template>
  <div>
    <div class="section sectionPricing">
      <div class="bg">
        <img src="/images/background-search.png" class="background">
      </div>
      <Plans />
    </div>
    <div class="section sectionPartner">
      <Parters />
    </div>
    <ContactUs />
  </div>
</template>

<script setup lang="ts">
import { PAGE_TITLES } from '~/constant/constains';

useSeoMeta({
  title: PAGE_TITLES.pricing
})
</script>

<style lang="scss" scoped>
@import url("pricing.scss");
</style>
