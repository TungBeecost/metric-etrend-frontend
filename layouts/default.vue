<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#E85912',
    },
  }">
    <div class="container">
      <!-- header section -->
      <header>
        <img src="/public/images//Logo.svg">

        <HeaderNavbar v-if="device.isDesktop" />
        <HeaderNavbar v-else />
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



</script>

<style lang="scss" scoped>
@import url("./default.scss");
</style>