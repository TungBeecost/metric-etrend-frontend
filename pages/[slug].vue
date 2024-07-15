<script setup lang="ts">
import {toSeoName} from "~/helpers/StringHelper";
import GeneralOverview from "~/components/report/GeneralOverview.vue";
import Overview from "~/components/report/Overview.vue";
import PriceRangeStatistic from "~/components/report/PriceRangeStatistic.vue";
import BrandStatistic from "~/components/report/BrandStatistic.vue";
import TopShopStatistic from "~/components/report/TopShopStatistic.vue";
import ListProducts from "~/components/report/ListProducts.vue";
import {ref} from "vue";
import PosterDetailReport from "~/components/report/PosterDetailReport.vue";
import {PAGE_TITLES} from "~/constant/constains";
import UnlockReport from "~/components/report/UnlockReport.vue";
import axios from "~/services/axios-wrapper";
import {useCurrentUser} from "~/stores/current-user";
import {type LstRecommed, searchReport, type SearchReportPayload} from "~/services/reports"
import MaybeInterested from "~/components/report/MaybeInterested.vue";
import {useSearchReport} from "#imports";
const { fetchListRecommend } = useSearchReport()
const listTagSuggestions = ref<string[]>([]);
const listRecommend = ref<LstRecommed[] | null>(null);

interface Category {
  name: string;
  id: string;
}

interface Data {
  name: string;
  lst_category: Category[];
  filter_custom: any
  category_report_id: string;
}

const currentUserStore = useCurrentUser();


const isHideContent = ref(true);
const data = ref<Data | null>(null);
const loading = ref(true);


const route = useRoute()
const slug = route.params.slug;


const fetchReportData = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`https://api-ereport.staging.muadee.vn/api/report/detail?slug=${slug}`);
    console.log(response.data);
    const {tier_report} = response.data;
    if (tier_report !== 'free') {
      isHideContent.value = false;
    }
    data.value = response.data;
    loading.value = false;
    if (data.value) {
      await fetchTagSuggest(data.value.name);
      await fetchDataRecommend(data.value.category_report_id);
    }
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
};

const fetchSuggest = async (value: string | null, options?: SearchReportPayload) => {
  try {
    const body: SearchReportPayload = {
      limit: 5,
      lst_field: ["name", "slug"],
      offset: 0,
      sort: "popularity",
      lst_query: value ? [value] : [],
      ...options
    };
    const data = await searchReport(body);

    if (data && data.lst_report) {
      return data.lst_report.map((item) => item.name);
    } else {
      return [];
    }
  } catch (error) {
    console.error("fetchSuggest error: ", error);
    return [];
  }
};

const fetchTagSuggest = async (value: string) => {
  console.log('fetchTagSuggest', value);
  try {
    const result = await fetchSuggest(value);
    if (result.length) {
      listTagSuggestions.value = result;
    } else {
      listTagSuggestions.value = [];
    }
  }
  catch (e) {
    console.error(e);
  }
};

const fetchDataRecommend = async (category_report_id: string) => {
  try {
    const result = await fetchListRecommend(category_report_id);
    if (result !== null) {
      listRecommend.value = result;
    } else {
      listRecommend.value = [];
    }
  }
  catch (e) {
    console.error(e);
  }
}

const breadcrumbs = computed(() => {
  if (data.value) {
    return [
      {
        name: "Báo cáo",
        value: "search",
      },
      ...(data.value.lst_category || []).map((item) => {
        const url = `search?category_report_id=${item.id}`;
        return {
          name: item.name,
          value: url,
        };
      }),
      {
        name: data.value.name,
        value: null,
      },
    ];
  }
});

onMounted(() => {
  fetchReportData();
});

console.log(toSeoName(slug));


const isMobile = ref(window?.innerWidth <= 768);

const updateWindowSize = () => {
  isMobile.value = window?.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
});

useSeoMeta({
  title: PAGE_TITLES.reportDetail + " " + toSeoName(slug)
})
</script>

<template>
  <div v-if="loading" class="container_content">
    <div class="title default_section">
      <div class="loading-skeleton">
        <div>
          <a-skeleton-input size="large" active style="width: max(50%, 300px); margin-bottom: 24px;"/>
        </div>
        <div style="display: flex; justify-content: space-between;width: 100%; margin-bottom: 24px;">
          <a-skeleton-input size="small" active style="width: max(30%, 300px); "/>
        </div>
        <div class="container">
          <div class="general_overview_container" style="display: flex; width: 100%; gap: 24px">
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px; border-radius: 16px 0 0 16px">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px; border-radius: 0 16px 16px 0"
                 class="hide-on-mobile">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
          </div>
          <div class="different_info">
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container_content">
    <div class="title default_section">
      <div v-if="data" class="breadcrumbs">
        <Breadcrumb :breadcrumbs="breadcrumbs"/>
      </div>
      <h1 v-if="data" class="report-title">
        {{ data.name }} - Báo cáo xu hướng thị trường sàn TMĐT
      </h1>
    </div>
    <div class="container default_section">
      <div v-if="data" class="general_overview_container">
        <general-overview :data="data as Record<string, any>" :is-hide-content="isHideContent"/>
        <price-range-statistic :data="data" :is-hide-content="isHideContent"/>
        <brand-statistic :data="data" :is-hide-content="isHideContent"/>
        <top-shop-statistic :data="data" :is-hide-content="isHideContent"/>
        <list-products :data="data" :is-hide-content="isHideContent"/>
      </div>
      <div v-if="data" class="different_info">
        <unlock-report v-if="!currentUserStore.authenticated"/>
        <overview :is-hide-content="isHideContent" :data="data as Record<string, any>"/>
        <report-content/>
        <report-filter-detail :data="data" :filter="data.filter_custom" class="report-filter-detail"/>
        <maybe-interested v-if="listRecommend && !isMobile" :recomends="listRecommend"/>
      </div>
    </div>
    <maybe-interested v-if="listRecommend && isMobile" :recomends="listRecommend"/>
    <poster-detail-report :list-suggest="listTagSuggestions"/>
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
  .different_info {
    order: -1;
  }

  .different_info .maybe-interested-component {
    order: 2; /* Ensures that maybe-interested is moved to the bottom */
  }

}
</style>