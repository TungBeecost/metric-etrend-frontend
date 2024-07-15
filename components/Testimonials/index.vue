<template>
  <div class="wrapper">
    <div class="sectionHeader">
      <p class="sectionTitle">Nguồn số liệu đáng tin cậy <br> được các đơn vị truyền thông, báo chí sử dụng</p>
    </div>
    <CustomMarquee class="marqueeWrapper">
      <BrandItem v-for="(branch, index) in brands" :key="index" :src="branch" class="brandItem" />
    </CustomMarquee>
  </div>
</template>

<script setup lang="ts">
import {TESTIMONIAL_BRANDS} from "~/constant/constains"
import CustomMarquee from "@/components/CustomMarquee.vue"

const brands = ref([...TESTIMONIAL_BRANDS]);

onMounted(() => {
  // Duplicate the first item at the end for a seamless loop
  if (brands.value.length > 0) {
    brands.value.push(brands.value[0]);
  }
});
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>