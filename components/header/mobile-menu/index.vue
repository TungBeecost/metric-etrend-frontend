<template>
  <div :class="{ headerNavbar: 1, active: active }">
    <!-- <div class="headerNavbarMenu">
      <AButton type="text" class="headerText">Trang chủ</AButton>
      <AButton type="text" class="headerText">Báo cáo</AButton>
      <AButton type="text" class="headerText">Bảng giá dịch vụ</AButton>
    </div>
    <div class="headerNavbarCallButton">
      <AButton>Đăng nhập</AButton>
      <AButton type="primary">Liên hệ tư vấn</AButton>
    </div> -->

    <div class="login">

      <p>Đăng nhập ngay để không bỏ lỡ hàng trăm báo cáo và xu hướng mới nhất!</p>
      <AButton type="primary" size="large">Đăng nhập</AButton>
    </div>


  </div>
</template>

<script setup lang="ts">

defineProps<{
  active: boolean;
}>()
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>