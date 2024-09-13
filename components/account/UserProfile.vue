<script setup>
import { useCurrentUser } from "~/stores/current-user";
import { NAVIGATIONS } from "~/constant/constains";
const props = defineProps({
  isDarkBlueHeader: {
    type: Boolean,
    default: false
  }
});

const currentUserStore = useCurrentUser();
const { userInfo } = storeToRefs(currentUserStore);
const userData = computed(() => currentUserStore.userInfo);
const isDropdownOpen = ref(false);

const handleVisibleChange = (visible) => {
  isDropdownOpen.value = visible;
};

const displayName = computed(() => {
  const name = userData.value?.display_name;
  return name?.length > 18 ? `${name.substring(0, 15)}...` : name;
});

const handleClick = () => {
  navigateTo(NAVIGATIONS.account);
};

const handleClickRequestSupport = () => {
  navigateTo(NAVIGATIONS.requestSupport);
};

const handleHandClickRequestSupport = () => {
  navigateTo(NAVIGATIONS.handingrequestSupport);
};

// Change the getPopupContainer function to return a different element
const getPopupContainer = () => document.querySelector('.user-profile');
</script>

<template>
  <a-dropdown placement="bottomLeft" trigger="click" :get-popup-container="getPopupContainer" @visible-change="handleVisibleChange">
    <div v-if="userData?.id" class="user-profile">
        <a-avatar style="cursor: pointer" class="avatar-image" :src="userData?.avatar" size="small"/>
      <span :class="{ headerText: props.isDarkBlueHeader, headerTextDarkBlue: !props.isDarkBlueHeader }" class="user-name" style="cursor: pointer">
        {{ displayName }}
      </span>
      <svg :class="{ 'rotate-svg': isDropdownOpen, 'rotate-svg-back': !isDropdownOpen }" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">        <path :fill="props.isDarkBlueHeader ? '#FFFFFF' : '#241E46'" d="M13.9669 8.20604L9.98987 12.3724C9.95293 12.4112 9.90907 12.4419 9.86079 12.4629C9.81251 12.4838 9.76076 12.4946 9.7085 12.4946C9.65623 12.4946 9.60448 12.4838 9.5562 12.4629C9.50792 12.4419 9.46406 12.4112 9.42712 12.3724L5.45014 8.20604C5.39445 8.14777 5.35653 8.0735 5.34116 7.99264C5.32578 7.91178 5.33366 7.82795 5.36379 7.75178C5.39391 7.67561 5.44494 7.61052 5.51039 7.56474C5.57585 7.51896 5.65281 7.49456 5.73151 7.49463H13.6855C13.7642 7.49456 13.8411 7.51896 13.9066 7.56474C13.9721 7.61052 14.0231 7.67561 14.0532 7.75178C14.0833 7.82795 14.0912 7.91178 14.0758 7.99264C14.0605 8.0735 14.0225 8.14777 13.9669 8.20604Z"/>
      </svg>
    </div>
    <template #overlay>
      <a-menu class="user-profile-btn-dropdown">
        <a-menu-item>
          <div class="option_btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z" stroke="#000000" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 13.5C3.21063 11.4081 5.40937 10 8 10C10.5906 10 12.7894 11.4081 14 13.5" stroke="#000000" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span @click="handleClick">Thông tin tài khoản</span>
          </div>
        </a-menu-item>
        <a-menu-item>
          <div class="option_btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_6488_254800)">
                <path d="M14 12.5V13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 15 12 15H8.5" stroke="#332D59" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 8H12C11.7348 8 11.4804 8.10536 11.2929 8.29289C11.1054 8.48043 11 8.73478 11 9V11.5C11 11.7652 11.1054 12.0196 11.2929 12.2071C11.4804 12.3946 11.7348 12.5 12 12.5H14V8ZM14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8M2 8V11.5C2 11.7652 2.10536 12.0196 2.29289 12.2071C2.48043 12.3946 2.73478 12.5 3 12.5H4C4.26522 12.5 4.51957 12.3946 4.70711 12.2071C4.89464 12.0196 5 11.7652 5 11.5V9C5 8.73478 4.89464 8.48043 4.70711 8.29289C4.51957 8.10536 4.26522 8 4 8H2Z" stroke="#332D59" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_6488_254800">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span @click="handleClickRequestSupport">Yêu cầu hỗ trợ</span>
          </div>
        </a-menu-item>
        <a-menu-item v-if="userInfo.email && userInfo.email.endsWith('@metric.vn')">
          <div class="option_btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_6488_254809)">
                <path d="M10.5 14H3.5C3.36739 14 3.24021 13.9473 3.14645 13.8536C3.05268 13.7598 3 13.6326 3 13.5V4.5C3 4.36739 3.05268 4.24021 3.14645 4.14645C3.24021 4.05268 3.36739 4 3.5 4H8.5L11 6.5V13.5C11 13.6326 10.9473 13.7598 10.8536 13.8536C10.7598 13.9473 10.6326 14 10.5 14Z" stroke="#332D59" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 4V2.5C5 2.36739 5.05268 2.24021 5.14645 2.14645C5.24021 2.05268 5.36739 2 5.5 2H10.5L13 4.5V11.5C13 11.6326 12.9473 11.7598 12.8536 11.8536C12.7598 11.9473 12.6326 12 12.5 12H11" stroke="#332D59" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.5 9.5H8.5" stroke="#332D59" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.5 11.5H8.5" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_6488_254809">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span @click="handleHandClickRequestSupport">Xử lý yêu cầu hỗ trợ</span>
          </div>
        </a-menu-item>
        <a-menu-item>
          <div class="option_btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1_129541)">
                <path d="M6.5 2.5H3C2.86739 2.5 2.74021 2.55268 2.64645 2.64645C2.55268 2.74021 2.5 2.86739 2.5 3V13C2.5 13.1326 2.55268 13.2598 2.64645 13.3536C2.74021 13.4473 2.86739 13.5 3 13.5H6.5" stroke="#332D59" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.5 8H13.5" stroke="#332D59" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11 5.5L13.5 8L11 10.5" stroke="#332D59" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1_129541">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span @click="currentUserStore.logOut()">Đăng xuất</span>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">
.user-profile {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  .avatar-image {
    border-radius: 50%;
    border: 1px solid #eeebff;
    margin-right: 8px;
    width: 32px;
    height: 32px;
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }
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
    background-color: $hovering;
  }
}

.rotate-svg {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.rotate-svg-back {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.user-profile-btn-dropdown {
  width: 200px;
  padding: 8px 0;
  margin-top: 10px;
  .option_btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #FDEEE7;

      svg path {
        stroke: #E85912;
      }

      span {
        color: #E85912;
      }
    }

    span {
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
