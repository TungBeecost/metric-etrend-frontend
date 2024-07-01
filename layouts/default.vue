<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#E85912',
      colorText: '#241E46',
      fontFamily: 'Inter'
    },
  }">
    <div class="container">
      <!-- header section -->
      <header :class="{ darkBlueHeader: isDarkBlueHeader }">
        <NuxtImg :src="isDarkBlueHeader ? '/images/Logo.svg' : '/images/Logo-black.svg'" class="logo" :width="device.isMobile ? 113 : 166" :height="device.isMobile ? 21 : 32" />

        <div @click="setShowMenu(!isShowMenu)">
          <CustomIcon v-if="device.isMobile && !isShowMenu" :type="isDarkBlueHeader ? 'Menu' : 'MenuBlack'" />
          <CustomIcon v-else-if="isShowMenu" type="Close" />
        </div>

        <HeaderNavbar v-if="!device.isMobile" :is-dark-blue-header="isDarkBlueHeader" />
        <HeaderMobileMenu v-else :active="isShowMenu" />
      </header>

      <!-- content section -->
      <main>
        <slot />
      </main>

      <!-- footer section -->
      <footer>
        <Footer />
      </footer>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { NAVIGATIONS } from '../constant/constains';

const route = useRoute();

// side bar handler
const device = useDevice();

const { isShowMenu, setShowMenu } = useShowMainMenu();

// mobile menu always using white header
watch(isShowMenu, () => {
  if (isShowMenu.value === true) isDarkBlueHeader.value = false;
  else recheckHeader();
})

const menuDarkBlue = [NAVIGATIONS.home, NAVIGATIONS.pricing];
const isDarkBlueHeader = useState(() => false);
const recheckHeader = () => {
  if (isDarkBlueHeader.value !== !!menuDarkBlue.includes(route.path)) isDarkBlueHeader.value = !isDarkBlueHeader.value;
}
// recheck header color when change route
watch(() => route.path, () => {
  recheckHeader()
}, { immediate: true })

</script>

<style lang="scss" scoped>
@import url("./default.scss");
</style>