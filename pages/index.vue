<template>
  <!-- parter section -->
  <div class="partnersSection">
    <p class="sectionTitle">Hơn 500+ đối tác tin cậy của Metric</p>
    <div class="partners">
      <BrandItem v-for="(branch, index) in brands" :key="index" :src="branch" />
    </div>

    <!-- highligh section-->

    <!-- testimonials section-->

    <!-- pricing section -->

    <!-- contact us section -->
  </div>
</template>

<script setup lang="ts">
const brands = [
  "/assets/images/branch/branch1.png",
  "/assets/images/branch/guardian.png",
  "/assets/images/branch/lazada.png",
  "/assets/images/branch/shopee.png",
  "/assets/images/branch/themobileworld.png",
  "/assets/images/branch/tiki.png",
  "/assets/images/branch/unilever.png"
];
</script>

<style lang="scss" scoped>
//@import url("./index.scss");
</style>
