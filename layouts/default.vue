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

    <Head>
      <!--      <Title>eReport - Kho báo cáo Ecommerce toàn diện</Title>-->
      <!--      <Meta hid="og:title" property="og:title" :content="`eReport - Kho báo cáo Ecommerce toàn diện`"/>-->
      <!--      <Meta hid="og:description" name="og:description" :content="`eReport là Kho báo cáo thị trường Ecommerce toàn diện giúp Doanh nghiệp, Thương hiệu và Nhà bán tiết kiệm thời gian nghiên cứu thị trường, giảm thiểu rủi ro đầu tư với dữ liệu chính xác nhất.`"/>-->
      <!--      <Meta hid="og:image" property="og:image" :content="'https://lh3.googleusercontent.com/pw/AP1GczMTZp0lf_VW7W_Y6n3qg602m-LlqfpCIeVX_i4D3pnqT6FiloK5hY86XfTsqVHd4xRRs9tSKppP6FZdEPWO_V8D_UEsfj8KEnChoiU7zyiwDlHzZaTeAePmGxcqzG98qDJ9bahok5MhwtDzp3EKTiI_=w1600-h900-s-no-gm'"/>-->
    </Head>
    <div class="container-metric">
      <div v-if="showTopBar" class="top-bar" @click="navigateToPricing">
        <div class="text">
          <b style="font-size: 14px">Ưu đãi đặc biệt</b>
          <span style="font-size: 14px"> áp dụng với tất cả các gói dịch vụ đến hết ngày 30/09/2024</span>
        </div>
      </div>
      <!-- header section -->
      <header ref="headerRef" :class="{ darkBlueHeader: isDarkBlueHeader, 'shadow': isScrolled }">
        <div :class="['header', { 'default_section': !isMobile }]">
          <NuxtImg
              :src="isDarkBlueHeader ? '/images/Logo.svg' : '/images/Logo-black.svg'"
              class="logo"
              :width="isMobile ? 160 : 270"
              :height="isMobile ? 21 : 32"
              style="cursor: pointer; padding-left: 24px"
              @click="navigateToHome"
          />

          <div style="padding-right: 24px" @click="toggleMenu">
            <CustomIcon v-if="isMobile && !isShowMenu" :is-custom-size="true" type="Menu"/>
            <CustomIcon v-else-if="isShowMenu" :is-custom-size="true" type="Close"/>
          </div>
          <HeaderNavbar v-if="!isMobile" :is-dark-blue-header="isDarkBlueHeader"/>
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
    <CampaignPopup v-if="showCampaignPopup"/>
  </a-config-provider>
  <div
      v-else
      class="loading"
      style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; position: fixed;"
  >
    <a-spin size="large"/>
  </div>
</template>

<script setup lang="ts">
import {NAVIGATIONS} from '~/constant/constains';
import {useGTM} from '~/composables/useGTM';
import CampaignPopup from '~/components/CampaignPopup.vue';
import moment from "moment/moment";

const {fetchCurrentUser} = useCurrentUser();
const {userInfo, fetchedUser} = storeToRefs(useCurrentUser());
const gtm = useGTM();
const route = useRoute();
const headerRef = ref(null);
const isScrolled = ref(false);
const isMobile = ref(false);
const showTopBar = ref(false); // New reactive property to control top-bar visibility

if (!userInfo.value.id) {
  fetchCurrentUser();
}

const showCampaignPopup = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 1024;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const {isShowMenu} = useShowMainMenu();

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

watchEffect(() => {
  useHead({
    script: !['index', 'slug'].includes(route.name) ? [{
      hid: 'chat-plugin-script',
      src: 'https://chat-plugin.pancake.vn/main/auto?page_id=web_metricplatform',
      type: 'text/javascript',
      async: true,
      defer: true,
    }] : []
  });

  const chatElClass = 'pkcp-parent-container';

  const isHideRoute = ['index', 'slug'].includes(route.name);

  if (isHideRoute && document.getElementsByClassName(chatElClass).length > 0) {
    document.getElementsByClassName(chatElClass)[0].style.display = 'none';
  } else if (!isHideRoute && document.getElementsByClassName(chatElClass).length > 0) {
    document.getElementsByClassName(chatElClass)[0].style.display = 'block';
  }
});

const navigateToHome = () => {
  navigateTo(NAVIGATIONS.home);
};

const navigateToPricing = () => {
  const CAMPAIGN_URL = 'https://dangky.metric.vn/ereportoffer_300/?utm_source=website&utm_medium=ereport_t9&pub=popup';
  window.open(CAMPAIGN_URL, '_blank');
  // navigateTo(NAVIGATIONS.pricing);
};

// Track GTM events
const trackEvent = (event, data) => {
  if (gtm) {
    gtm.push({event, ...data});
  }
};

onMounted(() => {
  // Initial check for mobile
  handleResize();
  recheckHeader();

  let lastScrollTop = 0;
  const header = document.querySelector('header');

  const handleScroll = () => {
    if (!header) return; // Ensure header is not null

    const scrollTop = window.scrollY;
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      // Mobile-specific behavior
      if (scrollTop > lastScrollTop && scrollTop > 64) {
        header.style.top = showTopBar.value ? '-64px' : '0';
      } else {
        header.style.top = '0';
      }
    } else if (screenWidth <= 1380) {
      if (scrollTop > lastScrollTop && scrollTop > 40) {
        header.style.top = showTopBar.value ? '-40px' : '0';
      } else {
        header.style.top = '0';
      }
    } else {
      if (scrollTop > lastScrollTop && scrollTop > 33) {
        header.style.top = showTopBar.value ? '-33px' : '0';
      } else {
        header.style.top = '0';
      }
    }

    lastScrollTop = scrollTop;
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
  handleScroll();

  // Show campaign popup only on home and search pages
  if (route.path === NAVIGATIONS.home || route.path === NAVIGATIONS.search || route.path === NAVIGATIONS.report) {
    showCampaignPopup.value = true;
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});

watch(() => route.path, () => {
  recheckHeader();
  // Show campaign popup only on home and search pages
  if (route.path === NAVIGATIONS.home || route.path === NAVIGATIONS.search || route.path === NAVIGATIONS.report) {
    showCampaignPopup.value = true;
  } else {
    showCampaignPopup.value = false;
  }
});
</script>

<style lang="scss" scoped>
@import url("./default.scss");
</style>
