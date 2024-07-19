<template>
  <div id="headerNavbar">
    <div class="headerNavbarMenu">
      <AButton v-for="(item, index) in MENUS" :key="index" type="text"
               :class="{ headerText: isDarkBlueHeader, headerTextDarkBlue: !isDarkBlueHeader }"
               @click="navigateTo(item.to)"
      >
        {{ item.label }}
      </AButton>
    </div>
    <div v-if="fetchedUser" id="headButtonLogin" class="headerNavbarCallButton">
      <div v-if="!userInfo.email" style="display: flex; gap: 16px">
        <a-button style="height: 40px" @click="currentUserStore.setShowPopupLogin(true)">
          Đăng nhập
        </a-button>
        <AButton style="height: 40px" type="primary" @click="navigateTo(NAVIGATIONS.contactUs)">Liên hệ tư vấn</AButton>
      </div>
      <div v-else style="display: flex; gap: 16px; align-items: center">
        <AButton style="height: 40px" type="primary" @click="navigateTo(NAVIGATIONS.contactUs)">Liên hệ tư vấn</AButton>
        <span style="color: #EEEBFF">|</span>
        <user-profile :is-dark-blue-header="isDarkBlueHeader"/>
      </div>
    </div>

    <a-modal class="button_login" :visible="currentUserStore.isShowPopupLogin"
             :footer="false"
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

const {fetchedUser, userInfo} = storeToRefs(currentUserStore);
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>

<style lang="scss">
#headerNavbar {
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

  span {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
}

</style>