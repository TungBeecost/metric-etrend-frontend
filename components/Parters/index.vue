<template>
  <div class="wrapper">
    <div class="sectionHeader">
      <p class="sectionTitle">Hơn 500+ đối tác tin cậy của Metric</p>
    </div>
    <Vue3Marquee>
      <div v-for="(branch, index) in PARTERS" :key="index" class="lst-brand-wrapper">
        <div
            style="width: 100%; height: 150px; display: flex; align-items: center; justify-content: center;padding: 16px 24px;"
        >
          <img :src="branch" class="branch" alt="">
        </div>
      </div>
    </Vue3Marquee>
  </div>
</template>

<script setup lang="ts">
import {PARTERS} from "~/constant/constains"
</script>

<style lang="scss" scoped>
@import url("./index.scss");

.lst-brand-wrapper {
  display: flex;
  width: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.branch {
  background: #FFF;

  width: 100%;
  height: 100%;

  object-fit: contain;
}
</style>