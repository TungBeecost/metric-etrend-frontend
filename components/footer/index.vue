<template>
  <div>
    <div class="footerContent">
      <!-- introduce -->
      <div class="info introduce">
        <NuxtImg src="/images/Logo-black.svg" width="186" height="36" />
        <p style="font-size: 16px">Metric là Nền tảng Số liệu Thương mại Điện tử dành cho Doanh nghiệp, Thương hiệu và Nhà bán. Metric tạo ra báo cáo phân tích dữ liệu thị trường chỉ trong 30 giây, giúp việc thực thi và ra
          quyết định kinh doanh nhanh hơn 5 lần.</p>
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
        <div v-for="(item, index) in CONTACTS" :key="index" class="contactItem">
          <CustomIcon :type="item.icon as any" />
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