<template>
  <div class="headerNavbar">
    <div class="headerNavbarMenu">
      <AButton v-for="(item, index) in MENUS" :key="index" type="text" :class="{ headerText: isDarkBlueHeader, headerTextDarkBlue: !isDarkBlueHeader }" @click="navigateTo(item.to)">{{ item.label }}
      </AButton>
    </div>
    <div id="headButtonLogin" class="headerNavbarCallButton">
      <a-button v-if="!authStore.authenticated" type="primary" @click="authStore.setShowPopupLogin(true)">Đăng nhập</a-button>
      <user-profile v-else/>
      <a-modal
          class="button_login"
          :visible="authStore.isShowPopupLogin"
          @ok="authStore.setShowPopupLogin(false)"
          @cancel="authStore.setShowPopupLogin(false)"
      >
        <login-button/>
      </a-modal>
      <AButton type="primary" @click="navigateTo(NAVIGATIONS.contactUs)">Liên hệ tư vấn</AButton>
    </div>

  </div>
</template>

<script setup lang="ts">
import { MENUS, NAVIGATIONS } from '~/constant/constains';
import LoginButton from "~/components/google/LoginButton.vue";
import UserProfile from "~/components/account/UserProfile.vue";
import {useAuthStore} from "~/helpers/auth";

defineProps<{
  isDarkBlueHeader: boolean
}>()

const authStore = useAuthStore();
onBeforeMount(() => {
  authStore.checkAuth();
});
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>

<style lang="scss">
.button_login{
  .ant-modal-content{
    .ant-modal-body{
      padding: 0;
    }
    .ant-modal-footer{
      display: none;
    }
  }
}
</style>