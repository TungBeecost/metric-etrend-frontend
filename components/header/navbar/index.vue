<template>
  <div class="headerNavbar">
    <div class="headerNavbarMenu">
      <AButton v-for="(item, index) in MENUS" :key="index" type="text" :class="{ headerText: isDarkBlueHeader, headerTextDarkBlue: !isDarkBlueHeader }" @click="navigateTo(item.to)">{{ item.label }}
      </AButton>
    </div>
    <div class="headerNavbarCallButton">
      <AButton @click="navigateTo(NAVIGATIONS.signIn)">Đăng nhập</AButton>
      <AButton type="primary" @click="navigateTo(NAVIGATIONS.contactUs)">Liên hệ tư vấn</AButton>
    </div>

  </div>
</template>

<script setup lang="ts">
import { MENUS, NAVIGATIONS } from '../../../constant/constains';

defineProps<{
  isDarkBlueHeader: boolean
}>()
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>