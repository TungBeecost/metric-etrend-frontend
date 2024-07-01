<template>
  <div class="wrapper">
    <div class="sectionHeader">
      <p class="sectionTitle">Nguồn số liệu đáng tin cậy <br> được các đơn vị truyền thông, báo chí sử dụng</p>
    </div>
    <div class="testimonialsList">
      <BrandItem v-for="(branch, index) in TESTIMONIAL_BRANDS" :key="index" :src="branch" class="brandItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TESTIMONIAL_BRANDS } from "~/constant/constains"

</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>