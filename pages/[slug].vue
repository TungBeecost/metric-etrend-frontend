<script setup>
import GeneralOverview from "~/components/report/GeneralOverview.vue";
import Overview from "~/components/report/Overview.vue";
import PriceRangeStatistic from "~/components/report/PriceRangeStatistic.vue";
import BrandStatistic from "~/components/report/BrandStatistic.vue";
import TopShopStatistic from "~/components/report/TopShopStatistic.vue";
import ListProducts from "~/components/report/ListProducts.vue";
import { ref, onMounted, onUnmounted } from "vue";
import moment from "moment";
import { REPORT_ENDPOINTS } from "~/constant/endpoints";
import PosterDetailReport from "~/components/report/PosterDetailReport.vue";
import KeywordStatistic from "~/components/report/KeywordStatistic.vue";
import listCategory from '~/public/file_json/list_category.json';
import IndeptReportLink from "~/components/report/IndeptReportLink.vue";
import { useCurrentUser } from "~/stores/current-user.js";
import { useGTM } from '~/composables/useGTM';
import {NAVIGATIONS} from "~/constant/constains";
import RelateReport from "~/components/RelateReport.vue";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const currentUserStore = useCurrentUser();
const gtm = useGTM();
const { userInfo } = storeToRefs(currentUserStore);
const checkLevelCategory = ref(false);
const showModal = ref(false);
const showAdvertisement = ref(false);
const showNotification = ref(true);
const loadingRecommend = ref(true);
const loadingSuggest = ref(true);
const showButton = ref(false);

const fetchSuggest = async (value = '', options = {}) => {
  try {
    const body = {
      limit: 5,
      lst_field: ["name", "slug"],
      offset: 0,
      sort: "popularity",
      lst_query: value ? [value] : [],
      ...options
    };
    const { lst_report } = await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.search.endpoint}`, {
      method: 'POST',
      body
    });
    return lst_report;
  } catch (error) {
    return [];
  } finally {
    loadingSuggest.value = false;
  }
};

const trackEvent = (event, data) => {
  if (gtm) {
    gtm.push({ event, ...data });
  }
};

const fetchRecommend = async (categoryReportId, number_of_reports = 18) => {
  try {
    return await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.list_recomend.endpoint}?category_report_id=${categoryReportId}&number_of_reports=${number_of_reports}`);
  } catch (error) {
    return [];
  } finally {
    loadingRecommend.value = false;
  }
};

const handleScroll = () => {
  const scrollThreshold = isMobile.value ? 800 : 850;
  showAdvertisement.value = window.scrollY > scrollThreshold;
};

const fetchReportData = async () => {
  const slug = route.params.slug;
  try {
    let isHideContent = true;

    const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : '';
    let url = `${config.public.API_ENDPOINT}/api/report/detail?slug=${slug}`;
    if (config.public.SSR === 'true') {
      url += `&is_bot=true`;
    }
    const response = await $fetch(
        url,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
    );

    if (!response) {
      await router.push('/search');
    }

    const category = listCategory.find(cat => cat.value === response.category_report_id);
    if (category && category.level === 1) {
      checkLevelCategory.value = true;
      const children = listCategory.filter(cat => cat.parent === category.value && cat.level === 2);
      if (children.length > 0) {
        response.category_report_id = children[0].value;
      }
    }

    const { tier_report } = response;
    if (tier_report !== 'e_community' || config.public.SSR === 'true') {
      isHideContent = false;
    }
    const [listRecommend] = await Promise.all([
      fetchRecommend(response.category_report_id)
    ]);

    let breadcrumbs = [
      {
        name: "Báo cáo",
        value: "search",
      },
      ...(response.lst_category || []).map((item) => {
        const url = `search?category_report_id=${item.id}`;
        return {
          name: item.name,
          value: url,
        };
      }),
    ];
    if (response?.report_type === 'report_product_line') {
      breadcrumbs = [...breadcrumbs, {
        name: response.name,
        value: null,
      }];
    }

    return {
      reportDetail: response,
      listRecommend,
      isHideContent,
      breadcrumbs
    };
  } catch (error) {
    console.log(error);
    await router.push('/search');
    return {};
  }
};

const { data } = await useAsyncData(fetchReportData);

const { data: tagSuggestions } = await useAsyncData(
    'fetchSuggest',
    async () => {
      return await fetchSuggest(data?.reportDetail?.name, { limit: 5 });
    }
);

const isMobile = ref(window?.innerWidth <= 768);

const updateWindowSize = () => {
  isMobile.value = window?.innerWidth <= 768;
};

onMounted(() => {
  trackEvent('page_view', { page: route.path });
  window.addEventListener('resize', updateWindowSize);
  window.addEventListener('scroll', handleScroll);
  const transactionId = route.query.transaction_id;
  if (transactionId) {
    showModal.value = true;
  }
});

const handleOk = () => {
  showModal.value = false;
  navigateTo(`${NAVIGATIONS.home}${route.params.slug}`);
};

const handleShowNotification = () => {
  showNotification.value = false;
  showButton.value = true;
}

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
  window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
  <Head>
    <Title>{{ data?.reportDetail.name }} - Báo cáo xu hướng thị trường sàn TMĐT</Title>
    <Meta hid="og:title" property="og:title" :content="`Báo cáo thị trường ${data?.reportDetail.name} dành cho doanh nghiệp - Cập nhật tháng ${moment().format('MM/YYYY')}`"/>
    <Meta hid="description" name="description" :content="`Báo cáo chi tiết thị trường ${data?.reportDetail.name}`"/>
    <Meta hid="og:description" property="og:description" :content="`Báo cáo chi tiết thị trường ${data?.reportDetail.name}`"/>
    <Meta hid="og:image" property="og:image" :content="data?.reportDetail?.url_cover || data?.reportDetail?.url_thumbnail"/>
    <Meta hid="og:image:alt" property="og:image:alt" :content="`Báo cáo thị trường ${data?.reportDetail.name}`"/>
    <Link rel="canonical" :href="config.public.BASE_URL + route.fullPath"/>
    <component is="script" type="application/ld+json">
      {{
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Metric",
              item: "https://ereport.vn",
            },
            ...(data.reportDetail.lst_category || []).map((item, index) => ({
              "@type": "ListItem",
              position: index + 2,
              name: item.name,
              item: `https://ereport.vn/${item.slug}`,
            })),
          ]
        })
      }}
    </component>
  </Head>

  <div class="container_content">
    <div v-if="loadingRecommend" class="default_section">
      <a-skeleton />
    </div>
    <div v-else>
      <div class="title default_section">
        <div class="breadcrumbs">
          <Breadcrumb :breadcrumbs="data?.breadcrumbs"/>
        </div>
        <h1 class="title_main">
          Báo cáo {{ data?.reportDetail.name }} - Báo cáo xu hướng thị trường sàn TMĐT
        </h1>
        <div class="container_report_detail">
          <div class="container_report_detail_left">
            <overview :is-hide-content="data.isHideContent" :data="data?.reportDetail"/>
            <report-content :data="data?.reportDetail"/>
          </div>
          <div class="container_report_detail_right">
            <indept-report-link :slug="route.params.slug" :data="data.reportDetail"/>
            <report-filter-detail :data="data?.reportDetail" :filter="data.filter_custom" class="report-filter-detail"/>
          </div>
        </div>
      </div>
      <div class="container default_section">
        <div class="general_overview_container">
          <div v-if="loadingRecommend" class="default_section">
            <a-skeleton />
          </div>
          <relate-report v-else class="default_section relate_report" :recomends="data?.listRecommend" />
          <div class="title_main ">
            Báo cáo tổng quan thị trường {{ data?.reportDetail.name }} trên sàn TMĐT
          </div>
          <general-overview :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
          <keyword-statistic v-if="data?.reportDetail?.report_type === 'report_category'" :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
          <price-range-statistic :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
          <brand-statistic :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
          <top-shop-statistic :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
          <list-products :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
        </div>
      </div>
      <poster-detail-report :list-suggest="tagSuggestions" :loading="loadingSuggest"/>
      <transition name="fade">
        <div v-if="showAdvertisement" class="advertisement">
          <scroll-notification
              v-if="data.reportDetail.name"
              :data="data.reportDetail"
              :show-notification="showNotification"
              :show-button="showButton"
              @show-notification="handleShowNotification"
          />
        </div>
      </transition>
    </div> <!-- Missing closing div for the main container -->
    <a-modal v-if="showModal" v-model:visible="showModal" width="600px" :footer="null" @ok="handleOk">
      <div class="modal_content">
        <div class="alert_success">
          <div class="icon_success">
            <svg width="105" height="104" viewBox="0 0 105 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="52.5" cy="52" r="52" fill="#EAF8EE"/>
              <circle cx="52.5" cy="52" r="35" fill="#CDEDD6"/>
              <g clip-path="url(#clip0_4772_93595)">
                <rect x="34.5" y="34" width="36" height="36" rx="18" fill="white"/>
                <path
                    d="M52.5 34C48.9399 34 45.4598 35.0557 42.4997 37.0335C39.5397 39.0114 37.2326 41.8226 35.8702 45.1117C34.5078 48.4008 34.1513 52.02 34.8459 55.5116C35.5404 59.0033 37.2547 62.2106 39.7721 64.7279C42.2894 67.2453 45.4967 68.9596 48.9884 69.6541C52.48 70.3487 56.0992 69.9922 59.3883 68.6298C62.6774 67.2674 65.4886 64.9603 67.4665 62.0003C69.4443 59.0402 70.5 55.5601 70.5 52C70.495 47.2276 68.5969 42.6522 65.2224 39.2776C61.8478 35.9031 57.2724 34.005 52.5 34ZM60.4027 48.8258L50.7104 58.5181C50.5818 58.6468 50.4291 58.7489 50.261 58.8186C50.0929 58.8883 49.9127 58.9242 49.7308 58.9242C49.5488 58.9242 49.3686 58.8883 49.2005 58.8186C49.0325 58.7489 48.8798 58.6468 48.7512 58.5181L44.5973 54.3642C44.3375 54.1044 44.1915 53.752 44.1915 53.3846C44.1915 53.0172 44.3375 52.6648 44.5973 52.405C44.8571 52.1452 45.2095 51.9992 45.5769 51.9992C45.9444 51.9992 46.2967 52.1452 46.5565 52.405L49.7308 55.581L58.4435 46.8665C58.5721 46.7379 58.7248 46.6358 58.8929 46.5662C59.061 46.4966 59.2411 46.4608 59.4231 46.4608C59.605 46.4608 59.7852 46.4966 59.9532 46.5662C60.1213 46.6358 60.274 46.7379 60.4027 46.8665C60.5313 46.9952 60.6334 47.1479 60.703 47.316C60.7726 47.4841 60.8085 47.6642 60.8085 47.8462C60.8085 48.0281 60.7726 48.2082 60.703 48.3763C60.6334 48.5444 60.5313 48.6971 60.4027 48.8258Z"
                    fill="#35A855"/>
              </g>
              <defs>
                <clipPath id="clip0_4772_93595">
                  <rect x="34.5" y="34" width="36" height="36" rx="18" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="title_content_sucess">
            <div class="title_success">Thanh toán thành công</div>
            <div class="content_success" style="font-size: 16px">
              Hệ thống đang xử lý và báo cáo sẽ được gửi qua email của bạn trong vòng 5 phút
            </div>
          </div>
          <a-button style="height: 40px" type="primary" @click="handleOk">Tôi đã hiểu</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
.container_content {
  padding-top: 40px;
  padding-bottom: 40px;

  .title {
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;

    .breadcrumbs {
      display: flex;
      gap: 10px;
    }

    .container_report_detail{
      display: flex;
      gap: 24px;

      .container_report_detail_left{
        flex:0.7;
        display: flex;
        flex-direction: column;
        gap: 16px
      }

      .container_report_detail_right{
        flex:0.3;
        display: flex;
        flex-direction: column;
        gap: 16px
      }

    }
  }

  .container {
    display: flex;
    gap: 20px;

    .general_overview_container {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .report-title {
        font-size: 36px;
        font-weight: 700;
        line-height: 48px;
        color: #101828;
      }
    }

  }
}

.modal_content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  animation: fadeIn 0.5s ease-out forwards;

  .alert_success {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    .icon_success {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 105px;
      height: 104px;
    }

    .title_content_sucess {
      text-align: center;

      .title_success {
        font-size: 24px;
        line-height: 38px;
        font-weight: bold;
        color: #000;
      }
    }
  }
}

.title_main{
  font-size: 36px;
  font-weight: 700;
  line-height: 48px;
  color: #101828;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.relate_report{
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .container_report_detail{
    flex-direction: column;
    gap: 16px;
  }

  .container_report_detail_right {
    order: -1;
  }

  .different_info {
    order: -1;
  }

  .different_info .maybe-interested-component {
    order: 2;
  }

  .title_main{
    font-size: 24px;
    line-height: 32px;
  }

  .title{
    padding-bottom: 16px !important;
  }
}
</style>