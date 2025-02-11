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
    <slot/>
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

    if (device.isMobile) {
      if (scrollTop > lastScrollTop) {
        if (topBar) topBar.style.top = '-65px';
        if (header) header.style.top = '0';
      } else {
        if (topBar) topBar.style.top = '0';
        if (header) header.style.top = '60px';
      }
    } else {
      if (scrollTop > lastScrollTop) {
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
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
@import url("./default.scss");
</style>
