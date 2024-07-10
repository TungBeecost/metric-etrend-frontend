<script setup>
import {useCurrentUser} from "~/stores/current-user"
// import {NAVIGATIONS} from "~/constant/constains.js";
const props = defineProps({
  isDarkBlueHeader: {
    type: Boolean,
    default: false
  }
});

const currentUserStore = useCurrentUser();

const userData = computed(() => currentUserStore.userInfo);

</script>

<template>
  <a-dropdown placement="bottomRight" trigger="click">
    <div v-if="userData?.id" class="user-profile">
      <a-avatar class="avatar-image" :src="userData?.avatar" size="small"/>
      <span
          :class="{ headerText: props.isDarkBlueHeader, headerTextDarkBlue: !props.isDarkBlueHeader }"
            class="user-name">
        {{ userData?.display_name }}
      </span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :fill="props.isDarkBlueHeader ? '#FFFFFF' : '#241E46'" d="M13.9669 8.20604L9.98987 12.3724C9.95293 12.4112 9.90907 12.4419 9.86079 12.4629C9.81251 12.4838 9.76076 12.4946 9.7085 12.4946C9.65623 12.4946 9.60448 12.4838 9.5562 12.4629C9.50792 12.4419 9.46406 12.4112 9.42712 12.3724L5.45014 8.20604C5.39445 8.14777 5.35653 8.0735 5.34116 7.99264C5.32578 7.91178 5.33366 7.82795 5.36379 7.75178C5.39391 7.67561 5.44494 7.61052 5.51039 7.56474C5.57585 7.51896 5.65281 7.49456 5.73151 7.49463H13.6855C13.7642 7.49456 13.8411 7.51896 13.9066 7.56474C13.9721 7.61052 14.0231 7.67561 14.0532 7.75178C14.0833 7.82795 14.0912 7.91178 14.0758 7.99264C14.0605 8.0735 14.0225 8.14777 13.9669 8.20604Z"/>
      </svg>
    </div>
    <template #overlay>
      <a-menu class="user-profile-btn-dropdown">
        <a-menu-item>
          <span @click="currentUserStore.logOut()">Sign out</span>
<!--          <span @click="navigateTo(NAVIGATIONS.account)">Account</span>-->
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
</style>
