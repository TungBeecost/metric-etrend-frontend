<template>
  <div :class="{ headerNavbar: 1, active: active }">
    <div class="login">
      <p>Đăng nhập ngay để không bỏ lỡ hàng trăm báo cáo và xu hướng mới nhất!</p>
      <AButton type="primary" size="large" @click="authStore.setShowPopupLogin(true)">Đăng nhập</AButton>
    </div>

    <div class="divider" />
    <NuxtLink v-for="item in MENUS" :key="item.label" :to="item.to" class="menu">
      <AButton size="large" type="text" class="menuItem" @click="setShowMenu(false)">

        <CustomIcon :type="item.icon as any" class="menuIcon" />
        {{ item.label }}
      </AButton>
    </NuxtLink>

    <div class="divider" />

    <NuxtLink :to="NAVIGATIONS.contactUs" class="menu">
      <AButton size="large" type="text" class="menuItem" @click="setShowMenu(false)">
        <CustomIcon type="ContactUs" class="menuIcon" />
        Liên hệ tư vấn
      </AButton>
    </NuxtLink>


  </div>
</template>

<script setup lang="ts">

import { MENUS, NAVIGATIONS } from '~/constant/constains';

defineProps<{
  active: boolean;
}>()

const { setShowMenu } = useShowMainMenu();

const authStore = useAuthStore();
onBeforeMount(() => {
  authStore.checkAuth();
});
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>