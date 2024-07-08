<script setup>
import { useAuthStore } from "~/helpers/auth.js";

const authStore = useAuthStore();

const userData = computed(() => authStore.user);
console.log(userData.value);
</script>

<template>
  <a-dropdown placement="bottomRight" trigger="click">
    <div class="user-profile">
      <a-avatar class="avatar-image" :src="userData.avatar" size="small" />
      <span class="user-name">{{ userData.first_name }} {{ userData.last_name }}</span>
    </div>
    <template #overlay>
      <a-menu class="user-profile-btn-dropdown">
        <a-menu-item>
          <span @click="authStore.logOut()">Sign out</span>
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
  .user-name {
    line-height: 50px;
  }

}
.user-profile:hover {
  box-shadow: inset 0 -2px #e85912;
  color: #e85912;
}
</style>
