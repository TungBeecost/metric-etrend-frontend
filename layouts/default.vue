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
    <div
        class="container"
    >
      <div class="top-bar">
        <div class="text">
          <b>Ưu đãi giảm 30%</b>
          <span> áp dụng với tất cả các gói dịch vụ đến hết ngày 22/08/2024</span>
        </div>
      </div>
      <!-- header section -->
      <header ref="headerRef" :class="{ darkBlueHeader: isDarkBlueHeader, 'shadow': isScrolled }">
        <div class="header default_section">
          <NuxtImg
              :src="isDarkBlueHeader ? '/images/Logo.svg' : '/images/Logo-black.svg'" class="logo"
              :width="device.isMobile ? 113 : 166" :height="device.isMobile ? 21 : 32" style="cursor: pointer"
              @click="navigateToHome"
          />

          <div @click="setShowMenu(!isShowMenu)">
            <CustomIcon v-if="device.isMobile && !isShowMenu" :is-custom-size="true" :type="isDarkBlueHeader ? 'Menu' : 'MenuBlack'"/>
            <CustomIcon v-else-if="isShowMenu" :is-custom-size="true" type="Close"/>
          </div>

          <HeaderNavbar v-if="!device.isMobile" :is-dark-blue-header="isDarkBlueHeader"/>
          <HeaderMobileMenu v-else :active="isShowMenu"/>
        </div>
      </header>

      <!-- content section -->
      <main>
        <slot/>
      </main>

      <!-- footer section -->
      <footer>
        <div class="default_section footer">
          <Footer/>
        </div>
      </footer>
    </div>
  </a-config-provider>
  <div
      v-else
      class="loading"
      style="display: flex; align-items: center; justify-content: center;width: 100%; height: 100%; position: fixed;"
  >
    <a-spin size="large"/>
  </div>
</template>

<script setup lang="ts">
import {NAVIGATIONS} from '~/constant/constains';

const {fetchCurrentUser} = useCurrentUser();
const {userInfo, fetchedUser} = storeToRefs(useCurrentUser());
const route = useRoute();
const headerRef = ref(null);
const isScrolled = ref(false);

if (!userInfo.value.id) {
  fetchCurrentUser();
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

// side bar handler
const device = useDevice();

const {isShowMenu, setShowMenu} = useShowMainMenu();

// mobile menu always using white header
watch(isShowMenu, () => {
  if (isShowMenu.value) isDarkBlueHeader.value = false;
  else recheckHeader();
})

const menuDarkBlue = [NAVIGATIONS.home, NAVIGATIONS.pricing];
const isDarkBlueHeader = useState(() => false);
const recheckHeader = () => {
  if (isDarkBlueHeader.value !== !!menuDarkBlue.includes(route.path)) isDarkBlueHeader.value = !isDarkBlueHeader.value;
}

const navigateToHome = () => {
  navigateTo(NAVIGATIONS.home);
}
// recheck header color when change route
watch(() => route.path, () => {
  recheckHeader()
}, {immediate: true})

onMounted(() => {
  let lastScrollTop = 0;
  const topBar = document.querySelector('.top-bar') as HTMLElement;
  const header = document.querySelector('header') as HTMLElement;

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop) {
      // Scroll down
      if (topBar) topBar.style.top = '-30px';
      if (header) header.style.top = '0';
    } else {
      // Scroll up
      if (topBar) topBar.style.top = '0';
      if (header) header.style.top = '30px';
    }
    lastScrollTop = scrollTop;
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initialize on mount in case the page is already scrolled
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});


</script>

<style lang="scss" scoped>
@import url("./default.scss");
</style>