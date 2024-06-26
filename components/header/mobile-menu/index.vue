<template>
  <div :class="{ headerNavbar: 1, active: active }">
    <div class="login">
      <p>Đăng nhập ngay để không bỏ lỡ hàng trăm báo cáo và xu hướng mới nhất!</p>
      <AButton type="primary" size="large" @click="navigateTo(NAVIGATIONS.signIn)">Đăng nhập</AButton>
    </div>

    <div class="divider" />


    <NuxtLink v-for="item in MENUS" :key="item.label" :to="item.to" class="menu">
      <AButton size="large" type="text" class="menuItem">

        <CustomIcon :type="item.icon as any" :width="20" :height="20" />
        {{ item.label }}
      </AButton>
    </NuxtLink>

    <div class="divider" />

    <NuxtLink :to="NAVIGATIONS.contactUs" class="menu">
      <AButton size="large" type="text" class="menuItem">
        <CustomIcon type="ContactUs" :width="20" :height="20" />
        Liên hệ tư vấn
      </AButton>
    </NuxtLink>


  </div>
</template>

<script setup lang="ts">

import { MENUS, NAVIGATIONS } from '../../../helpers/constains';

defineProps<{
  active: boolean;
}>()
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>