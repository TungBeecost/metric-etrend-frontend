<script setup>
import {toSeoName} from "~/helpers/StringHelper";
import GeneralOverview from "~/components/report/GeneralOverview.vue";
import Overview from "~/components/report/Overview.vue";
import PriceRangeStatistic from "~/components/report/PriceRangeStatistic.vue";
import BrandStatistic from "~/components/report/BrandStatistic.vue";
import TopShopStatistic from "~/components/report/TopShopStatistic.vue";
import ListProducts from "~/components/report/ListProducts.vue";
import {ref} from "vue";
import moment from "moment";
import UnlockReport from "~/components/report/UnlockReport.vue";
import {useCurrentUser} from "~/stores/current-user";
import MaybeInterested from "~/components/report/MaybeInterested.vue";
import {REPORT_ENDPOINTS} from "~/constant/endpoints";
import PosterDetailReport from "~/components/report/PosterDetailReport.vue";
import KeywordStatistic from "~/components/report/KeywordStatistic.vue";

const currentUserStore = useCurrentUser();
const route = useRoute()
const config = useRuntimeConfig();

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
    const {lst_report} = await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.search.endpoint}`, {
      method: 'POST',
      body
    })
    return lst_report
  } catch (error) {
    return [];
  }
};

const fetchRecommend = async (categoryReportId) => {
  try {
    return await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.list_recomend.endpoint}?category_report_id=${categoryReportId}`)
  } catch (error) {
    return [];
  }
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
    const {tier_report} = response;
    // console.log('tier_report', tier_report)
    // console.log('SSR', config.public.SSR)
    if (tier_report !== 'free' || config.public.SSR === 'true') {
      isHideContent = false;
    }
    const [listRecommend] = await Promise.all([
      // fetchSuggest(response.name),
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
    ]
    if (response?.report_type === 'report_product_line') {
      breadcrumbs = [...breadcrumbs, {
        name: response.name,
        value: null,
      }]
    }

    return {
      reportDetail: response,
      listRecommend,
      isHideContent,
      breadcrumbs
    }
  } catch (error) {
    console.log(error)

    return {}
  }
};

const {data} = await useAsyncData(fetchReportData);

const {data: tagSuggestions} = await useAsyncData(
    'fetchSuggest',
    async () => {
      return await fetchSuggest(data?.reportDetail?.name, {limit: 5});
    }
);

const isMobile = ref(window?.innerWidth <= 768);

const updateWindowSize = () => {
  isMobile.value = window?.innerWidth <= 768;
};

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
});
</script>

<template>
  <Title>{{ data?.reportDetail.name }} - Báo cáo xu hướng thị trường sàn TMĐT</Title>
  <Meta name="og:title"
        :content="`Báo cáo thị trường ${data?.reportDetail.name} dành cho doanh nghiệp - Cập nhật tháng ${moment().format('MM/YYYY')}`"/>
  <Meta name="description" :content="`Báo cáo chi tiết thị trường ${data?.reportDetail.name}`"/>
  <Meta name="og:description" :content="`Báo cáo chi tiết thị trường ${data?.reportDetail.name}`"/>
  <Meta name="og:image" :content="data?.reportDetail?.url_cover || data?.reportDetail?.url_thumbnail"/>
  <Meta name="og:image:alt" :content="`Báo cáo thị trường ${data?.reportDetail.name}`"/>
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
            item: "https://ereport.metric.vn",
          },
          ...(data.reportDetail.lst_category || []).map((item, index) => ({
            "@type": "ListItem",
            position: index + 2,
            name: item.name,
            item: `https://ereport.metric.vn/${item.slug}`,
          })),
        ]
      })
    }}
  </component>

  <div class="container_content">
    <div class="title default_section">
      <div class="breadcrumbs">
        <Breadcrumb :breadcrumbs="data?.breadcrumbs"/>
      </div>
      <h1 class="report-title">
        {{ data?.reportDetail.name }} - Báo cáo xu hướng thị trường sàn TMĐT
      </h1>
    </div>
    <div class="container default_section">
      <div class="general_overview_container">
        <general-overview :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
        <keyword-statistic v-if="data?.reportDetail?.report_type === 'report_category'" :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
        <price-range-statistic :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
        <brand-statistic :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
        <top-shop-statistic :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
        <list-products :data="data?.reportDetail" :is-hide-content="data.isHideContent"/>
      </div>
      <div class="different_info">
        <unlock-report v-if="!currentUserStore.authenticated"/>
        <overview :is-hide-content="data.isHideContent" :data="data?.reportDetail"/>
        <report-content :data="data?.reportDetail"/>
        <report-filter-detail :data="data?.reportDetail" :filter="data.filter_custom" class="report-filter-detail"/>
        <maybe-interested v-if="!isMobile" :recomends="data.listRecommend"/>
      </div>
    </div>
    <maybe-interested v-if="isMobile" :recomends="data?.listRecommend"/>
    <poster-detail-report :list-suggest="tagSuggestions"/>
  </div>
</template>

<style scoped lang="scss">
.container_content {
  padding-top: 40px;
  padding-bottom: 40px;

  .title {
    display: flex;
    flex-direction: column;

    .breadcrumbs {
      display: flex;
      gap: 10px;
    }

    .report-title {
      font-size: 36px;
      font-weight: 700;
      line-height: 48px;
      color: #101828;
    }
  }

  .container {
    display: flex;
    gap: 20px;

    .general_overview_container {
      flex: 0.7;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .different_info {
      flex: 0.3;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }
}


@media (max-width: 768px) {

  .container_content {
    .title {
      .report-title {
        font-size: 24px;
        line-height: 32px;
      }
    }
  }

  .different_info {
    order: -1;
  }

  .different_info .maybe-interested-component {
    order: 2; /* Ensures that maybe-interested is moved to the bottom */
  }


}
</style>