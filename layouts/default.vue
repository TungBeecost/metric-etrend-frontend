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
      <header :class="{ showMenu: isShowMenu }">
        <NuxtImg :src="isShowMenu ? '/images/Logo-black.svg' : '/images/Logo.svg'" class="logo" :width="device.isMobile ? 113 : 166" :height="device.isMobile ? 21 : 32" />

        <nuxtimg @click="isShowMenu = !isShowMenu">
          <NuxtImg v-if="device.isMobile && !isShowMenu" src="/icons/Menu.svg" width="24" height="24" />
          <NuxtImg v-if="isShowMenu" src="/icons/Close.svg" width="24" height="24" />
        </nuxtimg>


        <HeaderNavbar v-if="!device.isMobile" />

        <HeaderMobileMenu v-if="device.isMobile" :active="isShowMenu" />
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

// side bar handler
const device = useDevice();

const isShowMenu = useState(() => true);

</script>

<style lang="scss" scoped>
@import url("./default.scss");
</style>