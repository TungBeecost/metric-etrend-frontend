<template>
  <div class="headerNavbar">
    <div class="headerNavbarMenu">
      <AButton v-for="(item, index) in MENUS" :key="index" type="text"
               :class="{ headerText: isDarkBlueHeader, headerTextDarkBlue: !isDarkBlueHeader }"
               @click="navigateTo(item.to)">{{ item.label }}
      </AButton>
    </div>
    <div id="headButtonLogin" class="headerNavbarCallButton">
      <div style="display: flex; gap: 16px">
        <a-button v-if="!currentUserStore.authenticated" @click="currentUserStore.setShowPopupLogin(true)">Đăng nhập</a-button>
        <AButton type="primary" @click="navigateTo(NAVIGATIONS.contactUs)">Liên hệ tư vấn</AButton>
        <span v-if="currentUserStore.authenticated" style="color: #EEEBFF">|</span>
        <user-profile v-if="currentUserStore.authenticated" :is-dark-blue-header="isDarkBlueHeader"/>
      </div>

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