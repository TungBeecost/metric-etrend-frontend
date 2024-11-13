<template>
  <div id="headerNavbar">
    <div class="headerNavbarMenu">
      <nuxt-link v-for="(item, index) in MENUS" :key="index" :to="item.to" class="navbar-item">
        <div :class="{ headerText: isDarkBlueHeader, headerTextDarkBlue: !isDarkBlueHeader }">
          {{ item.label }}
        </div>
      </nuxt-link>
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

    <a-modal
        class="button_login" :visible="currentUserStore.isShowPopupLogin"
        :footer="false"
        style="margin-top: 30px"
        destroy-on-close
        @ok="currentUserStore.setShowPopupLogin(false)"
        @cancel="currentUserStore.setShowPopupLogin(false)"
    >
      <login-button/>
    </a-modal>
  </div>
</template>

<script setup>
import {MENUS, NAVIGATIONS} from '~/constant/constains';
import LoginButton from "~/components/google/LoginButton.vue";
import UserProfile from "~/components/account/UserProfile.vue";
import {useCurrentUser} from "~/stores/current-user"

const {isDarkBlueHeader} = defineProps({
  isDarkBlueHeader: {
    type: Boolean,
    default: false
  }
})

const currentUserStore = useCurrentUser();

const {fetchedUser, userInfo} = storeToRefs(currentUserStore);
</script>

<style lang="scss" scoped>
#headerNavbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .headerText, .headerTextDarkBlue {
    font-weight: 500;
    font-size: 16px;
  }

  .headerText {
    color: white;

    &:hover {
      color: $primary;
    }
  }

  .headerTextDarkBlue {
    color: $default_text_color;


    &:hover {
      color: $primary;
      //background-color: $hovering;
    }
  }
}

.headerNavbarMenu {
  display: flex;
  flex-direction: row;
  gap: 40px;
  color: white;

  @include tablet {
    gap: 0;
  }
}

.headerNavbarCallButton {
  display: flex;
  flex-direction: row;
  gap: 24px;

  align-items: center;
}

.mobileMenu {
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
}

.active {
  display: block;
}
</style>

<style lang="scss">
.headerNavbarMenu {
  display: flex;
  align-items: center;

  .navbar-item {
    color: var(--Dark-blue-dark-blue-8, #241E46);
    text-align: center;

    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;

    cursor: pointer;

    text-decoration: none;
  }
}

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
    //font-size: 16px;
    line-height: 24px;
  }
}

</style>