<template>
  <a-config-provider
      v-if="fetchedUser"
      :theme="{
      token: {
        colorPrimary: '#E85912',
        colorText: '#241E46',
        fontFamily: 'Inter'
      },
    }"
  >
    <div class="container">
      <div class="top-bar" @click="navigateToPricing">
        <div class="text">
          <b style="font-size: 14px">Ưu đãi giảm 30%</b>
          <span style="font-size: 14px"> áp dụng với tất cả các gói dịch vụ đến hết ngày 30/09/2024</span>
        </div>
      </div>
      <!-- header section -->
      <header ref="headerRef" :class="{ darkBlueHeader: isDarkBlueHeader, 'shadow': isScrolled }">
        <div :class="['header', { 'default_section': !isMobile }]">
          <NuxtImg
              :src="isDarkBlueHeader ? '/images/Logo.svg' : '/images/Logo-black.svg'"
              class="logo"
              :width="isMobile ? 113 : 166"
              :height="isMobile ? 21 : 32"
              style="cursor: pointer; padding-left: 24px"
              @click="navigateToHome"
          />

          <div style="padding-right: 24px" @click="toggleMenu">
            <CustomIcon v-if="isMobile && !isShowMenu" :is-custom-size="true" :type="isDarkBlueHeader ? 'Menu' : 'MenuBlack'" />
            <CustomIcon v-else-if="isShowMenu" :is-custom-size="true" type="Close" />
          </div>

          <HeaderNavbar v-if="!isMobile" :is-dark-blue-header="isDarkBlueHeader" />
          <HeaderMobileMenu v-else :active="isShowMenu" />
        </div>
      </header>

      <!-- content section -->
      <main>
        <slot />
      </main>

      <!-- footer section -->
      <footer>
        <div class="default_section footer">
          <Footer />
        </div>
      </footer>
    </div>
  </a-config-provider>
  <div
      v-else
      class="loading"
      style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; position: fixed;"
  >
    <a-spin size="large" />
  </div>
</template>

<script setup lang="ts">
import { NAVIGATIONS } from '~/constant/constains';
import { useGTM } from '~/composables/useGTM';

const { fetchCurrentUser } = useCurrentUser();
const { userInfo, fetchedUser } = storeToRefs(useCurrentUser());
const gtm = useGTM();
const route = useRoute();
const headerRef = ref(null);
const isScrolled = ref(false);
const isMobile = ref(false);

if (!userInfo.value.id) {
  fetchCurrentUser();
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 1380;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const { isShowMenu } = useShowMainMenu();

const toggleMenu = () => {
  isShowMenu.value = !isShowMenu.value;
};

// mobile menu always using white header
watch(isShowMenu, () => {
  if (isShowMenu.value) isDarkBlueHeader.value = false;
  else recheckHeader();
});

const menuDarkBlue = [NAVIGATIONS.home, NAVIGATIONS.pricing];
const isDarkBlueHeader = ref(false);
const recheckHeader = () => {
  isDarkBlueHeader.value = menuDarkBlue.includes(route.path);
};

const navigateToHome = () => {
  navigateTo(NAVIGATIONS.home);
};

const navigateToPricing = () => {
  navigateTo(NAVIGATIONS.pricing);
};

// Track GTM events
const trackEvent = (event: string, data: any) => {
  if (gtm) {
    gtm.push({ event, ...data });
  }
};

onMounted(() => {
  // Initial check for mobile
  handleResize();
  recheckHeader();

  // Track page view
  trackEvent('page_view', { page: route.path });

  let lastScrollTop = 0;
  const topBar = document.querySelector('.top-bar') as HTMLElement;
  const header = document.querySelector('header') as HTMLElement;

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      // Mobile-specific behavior
      if (scrollTop > lastScrollTop && scrollTop > 64) {
        if (topBar) topBar.style.top = '-65px';
        if (header) header.style.top = '0';
      } else {
        if (topBar) topBar.style.top = '0';
        if (header) header.style.top = '64px';
      }
    } else if (screenWidth <= 1380) {
      if (scrollTop > lastScrollTop && scrollTop > 40) {
        if (topBar) topBar.style.top = '-40px';
        if (header) header.style.top = '0';
      } else {
        if (topBar) topBar.style.top = '0';
        if (header) header.style.top = '40px';
      }
    } else {
      if (scrollTop > lastScrollTop && scrollTop > 33) {
        if (topBar) topBar.style.top = '-32px';
        if (header) header.style.top = '0';
      } else {
        if (topBar) topBar.style.top = '0';
        if (header) header.style.top = '32px';
      }
    }

    lastScrollTop = scrollTop;
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize); // Add resize listener
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize); // Remove resize listener
});

// Watch for route changes to update header color
watch(() => route.path, () => {
  recheckHeader();
});
</script>

<style lang="scss" scoped>
@import url("./default.scss");
</style>