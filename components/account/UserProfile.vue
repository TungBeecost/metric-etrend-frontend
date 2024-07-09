<script setup>
import {useCurrentUser} from "~/stores/current-user"

const currentUserStore = useCurrentUser();

const userData = computed(() => currentUserStore.userInfo);
</script>

<template>
  <a-dropdown placement="bottomRight" trigger="click">
    <div v-if="userData?.id" class="user-profile">
      <a-avatar class="avatar-image" :src="userData?.avatar" size="small"/>
      <span class="user-name">{{ userData?.display_name }}</span>
    </div>
    <template #overlay>
      <a-menu class="user-profile-btn-dropdown">
        <a-menu-item>
          <span @click="currentUserStore.logOut()">Sign out</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">
.user-profile {
  cursor: pointer;

  .avatar-image {
    border-radius: 50%;
    border: 1px solid #eeebff;
    margin-right: 8px;
    width: 32px;
    height: 32px;
  }
}

.user-profile:hover {
  box-shadow: inset 0 -2px #e85912;
  color: #e85912;
}
</style>
