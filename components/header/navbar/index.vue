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
      <div style="display: flex; gap: 16px">
        <svg style="cursor: pointer" width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.80957" width="40" height="40" rx="8" fill="#FBFAFC"/>
          <path d="M19.3096 26C23.4517 26 26.8096 22.6421 26.8096 18.5C26.8096 14.3579 23.4517 11 19.3096 11C15.1674 11 11.8096 14.3579 11.8096 18.5C11.8096 22.6421 15.1674 26 19.3096 26Z" stroke="#9D97BF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M24.6133 23.8032L29.8098 28.9998" stroke="#9D97BF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg style="cursor: pointer" width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.80957" width="40" height="40" rx="8" fill="#FBFAFC"/>
            <g clip-path="url(#clip0_5920_184562)">
              <path d="M29.8096 26.75V27.5C29.8096 28.2956 29.4935 29.0587 28.9309 29.6213C28.3683 30.1839 27.6052 30.5 26.8096 30.5H21.5596" stroke="#9D97BF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M29.8096 20H26.8096C26.4117 20 26.0302 20.158 25.7489 20.4393C25.4676 20.7206 25.3096 21.1022 25.3096 21.5V25.25C25.3096 25.6478 25.4676 26.0294 25.7489 26.3107C26.0302 26.592 26.4117 26.75 26.8096 26.75H29.8096V20ZM29.8096 20C29.8096 18.8181 29.5768 17.6478 29.1245 16.5558C28.6722 15.4639 28.0093 14.4718 27.1735 13.636C26.3378 12.8003 25.3457 12.1374 24.2537 11.6851C23.1618 11.2328 21.9915 11 20.8096 11C19.6277 11 18.4573 11.2328 17.3654 11.6851C16.2735 12.1374 15.2813 12.8003 14.4456 13.636C13.6099 14.4718 12.9469 15.4639 12.4947 16.5558C12.0424 17.6478 11.8096 18.8181 11.8096 20M11.8096 20V25.25C11.8096 25.6478 11.9676 26.0294 12.2489 26.3107C12.5302 26.592 12.9117 26.75 13.3096 26.75H14.8096C15.2074 26.75 15.5889 26.592 15.8702 26.3107C16.1515 26.0294 16.3096 25.6478 16.3096 25.25V21.5C16.3096 21.1022 16.1515 20.7206 15.8702 20.4393C15.5889 20.158 15.2074 20 14.8096 20H11.8096Z" stroke="#9D97BF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_5920_184562">
                <rect width="24" height="24" fill="white" transform="translate(8.80957 8)"/>
              </clipPath>
            </defs>
          </svg>
      </div>
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
             style="margin-top: 30px"
             @ok="currentUserStore.setShowPopupLogin(false)"
             @cancel="currentUserStore.setShowPopupLogin(false)">
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
    gap: 0px;
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