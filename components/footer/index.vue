<template>
  <div>
    <div class="footerContent">
      <!-- introduce -->
      <div class="info introduce">
        <NuxtImg src="/images/Logo-black.svg" width="186" height="36" />
        <p style="font-size: 16px">Khai thác hơn 1 triệu báo cáo thị trường Ecommerce dựa trên nền tảng Big Data ứng dụng AI của Metric. Cung cấp cho cá nhân & doanh nghiệp mọi xu hướng và dữ liệu về hàng hóa, thương hiệu, nhà bán... chỉ trong 5 giây. Giúp tăng tốc các hoạt động kinh doanh 5 lần và nắm giữ mọi cơ hội thị trường.</p>
        <NuxtImg src="/images/gov-mark.png" width="176" height="67" />
      </div>

      <!-- term & policy -->
      <div class="info term" style="font-size: 16px">
        <div class="title" >Chính sách & quy định</div>
        <NuxtLink v-for="(item, index) in TERM_AND_POLICIES" :key="index" style="font-size: 16px" :to="item.link" class="termLink">
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- contact -->
      <div class="info contact" style="font-size: 16px">
        <div class="title">Liên hệ</div>
        <div v-for="(item, index) in CONTACTS"  :key="index" class="contactItem">
          <CustomIcon :type="item.icon as any" :is-custom-size="true" />
          <p style="font-size: 16px">{{ item.label }}</p>
        </div>
      </div>
    </div>

    <div class="divider" />

    <div class="footerSignature">
      <p class="copyright">© 2024 Metric.vn</p>
      <div class="socialIconList">
        <div onclick="window.location = 'https://www.facebook.com/metricplatform'">
          <NuxtImg src="/icons/Social-FB.svg" width="24" height="24" class="" />
        </div>
        <div onclick="window.location = 'https://www.linkedin.com/company/metricplatform/mycompany/'">
          <NuxtImg src="/icons/Social-Linkedin.svg" width="24" height="24" />
        </div>
        <div onclick="window.location = 'https://www.youtube.com/@metricplatform'">
          <NuxtImg src="/icons/Social-Ytb.svg" width="24" height="24" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { CONTACTS, TERM_AND_POLICIES } from '~/constant/constains';


</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>