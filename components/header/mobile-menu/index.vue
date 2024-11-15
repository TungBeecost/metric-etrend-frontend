<template>
  <div :class="{ headerNavbar: 1, active: active }">
    <div v-if="!userInfo.id" class="login">
      <p style="font-weight: 500; font-size: 16px">Đăng nhập ngay để không bỏ lỡ hàng trăm báo cáo và xu hướng mới nhất!</p>
      <AButton style="font-weight: 500 " type="primary" size="large" @click="handleLoginClick">Đăng nhập</AButton>
    </div>
    <div v-if="userInfo.id" style="display: flex; gap: 16px; cursor: pointer" @click="handleClickInfo">
      <div class="ava">
        <a-avatar style="cursor: pointer" class="avatar-image" :src="userInfo?.avatar" size="large"/>
      </div>
      <div class="name_and_mail">
        <div class="name" style="font-size: 16px; font-weight: 700">{{ userInfo?.display_name }}</div>
        <div class="email" style="font-size: 12px">{{ userInfo?.email }}</div>
      </div>
    </div>
    <div class="divider"/>
    <NuxtLink v-for="item in MENUS" :key="item.label" :to="item.to" class="menu">
      <AButton size="large" type="text" class="menuItem" @click="setShowMenu(false)">
        <CustomIcon :type="item.icon as any" class="menuIcon" :is-custom-size="true"/>
        {{ item.label }}
      </AButton>
    </NuxtLink>

    <div class="divider"/>

    <NuxtLink :to="NAVIGATIONS.contactUs" class="menu">
      <AButton size="large" type="text" class="menuItem" @click="setShowMenu(false)">
        <CustomIcon type="ContactUs" class="menuIcon" :is-custom-size="true"/>
        Liên hệ tư vấn
      </AButton>
    </NuxtLink>

    <NuxtLink :to="NAVIGATIONS.requestSupport" class="menu">
      <AButton size="large" type="text" class="menuItem" @click="setShowMenu(false)">
        <CustomIcon type="Ticket" class="menuIcon" :is-custom-size="true"/>
        Yêu cầu hỗ trợ
      </AButton>
    </NuxtLink>

    <NuxtLink :to="NAVIGATIONS.handingrequestSupport" class="menu">
      <AButton size="large" type="text" class="menuItem" @click="setShowMenu(false)">
        <CustomIcon type="InternalTicket" class="menuIcon" :is-custom-size="true"/>
        Xử lý yêu cầu hỗ trợ
      </AButton>
    </NuxtLink>

    <div v-if="userInfo.id" class="divider"/>

    <NuxtLink v-if="userInfo.id" :to="NAVIGATIONS.home" class="menu">
      <AButton size="large" type="text" class="menuItem" @click="setLogOut">
        <CustomIcon type="Logout" class="menuIcon" :is-custom-size="true"/>
        Đăng xuất
      </AButton>
    </NuxtLink>

    <!-- Login Modal -->
    <a-modal class="button_login" :open="currentUserStore.isShowPopupLogin"
             :footer="false"
             style="padding-top: 24px"
             @ok="currentUserStore.setShowPopupLogin(false)"
             @cancel="currentUserStore.setShowPopupLogin(false)">
      <login-button/>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { MENUS, NAVIGATIONS } from '~/constant/constains';
import LoginButton from "~/components/google/LoginButton.vue";
defineProps<{
  active: boolean;
}>()

const { setShowMenu } = useShowMainMenu();
const currentUserStore = useCurrentUser();
const { userInfo } = storeToRefs(currentUserStore);

const setLogOut = () => {
  currentUserStore.logOut();
  setShowMenu(false);
}

const handleClickInfo = () => {
  setShowMenu(false);
  navigateTo(NAVIGATIONS.account);
}

const handleLoginClick = () => {
  currentUserStore.setShowPopupLogin(true);
  setShowMenu(false);
}
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
