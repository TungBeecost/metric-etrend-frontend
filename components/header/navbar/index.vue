<template>
  <div class="headerNavbar">
    <div class="headerNavbarMenu">
      <AButton v-for="(item, index) in MENUS" :key="index" type="text"
               :class="{ headerText: isDarkBlueHeader, headerTextDarkBlue: !isDarkBlueHeader }"
               @click="navigateTo(item.to)">{{ item.label }}
      </AButton>
    </div>
    <div id="headButtonLogin" class="headerNavbarCallButton">
      <div v-if="!currentUserStore.authenticated" style="display: flex; gap: 16px">
        <a-button @click="currentUserStore.setShowPopupLogin(true)">Đăng nhập</a-button>
        <AButton type="primary" @click="navigateTo(NAVIGATIONS.contactUs)">Liên hệ tư vấn</AButton>
      </div>
      <user-profile v-else/>
    </div>

    <a-modal class="button_login" :visible="currentUserStore.isShowPopupLogin"
             @ok="currentUserStore.setShowPopupLogin(false)"
             @cancel="currentUserStore.setShowPopupLogin(false)">
      <login-button/>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {MENUS, NAVIGATIONS} from '~/constant/constains';
import LoginButton from "~/components/google/LoginButton.vue";
import UserProfile from "~/components/account/UserProfile.vue";
import {useCurrentUser} from "~/stores/current-user"

defineProps<{
  isDarkBlueHeader: boolean
}>()

const currentUserStore = useCurrentUser();
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>

<style lang="scss">
.button_login {
  .ant-modal-content {
    .ant-modal-body {
      padding: 0;
    }

    .ant-modal-footer {
      display: none;
    }
  }
}
</style>