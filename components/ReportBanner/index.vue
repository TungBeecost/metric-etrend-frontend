<template>
  <div class="callActionBanner">
    <img loading="lazy" src="images/orange-banner-wave.png" class="background" />

    <div class="callActionBlock">
      <p class="title">Truy cập kho dữ liệu với hàng trăm báo cáo và xu hướng mới nhất</p>
      <AButton type="primary" @click="navigateTo(NAVIGATIONS.report)">Khám phá ngay</AButton>
    </div>

    <div class="illustrationBlock">
      <img loading="lazy" src="/images/Chart.svg" class="mainIllust" />
      <img loading="lazy" src="/images/Line-Styling.svg" class="sideIllust" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { NAVIGATIONS } from '~/constant/constains';

const router = useRouter();

function navigateTo(path: string) {
  router.push(path);
}
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
