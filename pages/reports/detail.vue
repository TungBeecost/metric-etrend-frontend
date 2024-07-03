<script setup lang="ts">
import axios from "axios";
import {toSeoName} from "~/helpers/StringHelper";
import GeneralOverview from "~/components/report/GeneralOverview.vue";
import Overview from "~/components/report/Overview.vue";
import PriceRangeStatistic from "~/components/report/PriceRangeStatistic.vue";
import {EVENT_TYPE} from "~/constant/general/EventConstant";
import BrandStatistic from "~/components/report/BrandStatistic.vue";
import TopShopStatistic from "~/components/report/TopShopStatistic.vue";
import ReportContent from "~/components/report/ReportContent.vue";
import ListProducts from "~/components/report/ListProducts.vue";
import {ref} from "vue";
import PosterDetailReport from "~/components/report/PosterDetailReport.vue";

interface Category {
  name: string;
  id: string;
}

interface Data {
  name: string;
  lst_category: Category[];
  filter_custom: any;
}
const isFreeUser = false;
const isHideContent = true;
const data = ref<Data | null>(null);

const fetchTableData = async () => {
  try {
    const response = await axios.get('https://api-web.metric.vn/api/report/detail?slug=giay-nam', {
      headers: {
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1b25nbGRAbWV0cmljLnZuIiwiZXhwIjoxNzE5NDU5MTk4LCJpYXQiOjE3MTg4NTQzOTgsImlzcyI6IkF1dGhlbnRpY2F0aW9uIFNlcnZpY2UiLCJzdWIiOiJEdXkgQ8awxqFuZyBMw6oifQ.s5ilAouYDUAYKz70E5uet3fQhPjovTBhuvpC-qIA8xY',
      }
    });
    data.value = response.data;
    console.log(response.data);
  } catch (error) {
    // handle the error here
    console.error(error);
  }
};

const breadcrumbs = computed(() => {
  if (data.value) {
    console.log(data.value.lst_category);
    return [
      {
        name: "Báo cáo",
        value: "search",
      },
      ...(data.value.lst_category || []).map((item) => {
        const url = `${toSeoName(item.name, "category")}-c.${item.id}`;
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
  fetchTableData();
});
</script>

<template>
  <div class="container_content">
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
        <general-overview :data="data as Record<string, any>" :is-hide-content="false" :is-free-user="false"/>
        <price-range-statistic
            :data="data"
            :is-free-user="isFreeUser"
            :is-hide-content="isHideContent"
        />
        <brand-statistic
            :data="data"
            :is-free-user="isFreeUser"
            :is-hide-content="isHideContent"
        />
        <top-shop-statistic
            :data="data"
            :is-free-user="isFreeUser"
            :is-hide-content="isHideContent"
        />
        <list-products
            :data="data"
            :is-free-user="isFreeUser"
            :is-hide-content="isHideContent"
        />
      </div>
      <div v-if="data" class="different_info">
        <overview :data="data as Record<string, any>"/>
        <report-content />
        <report-filter-detail :data="data" :filter="data.filter_custom" class="report-filter-detail"/>
      </div>
    </div>
      <poster-detail-report/>
  </div>
</template>

<style scoped lang="scss">
.container_content{
  padding-top: 40px;
  padding-bottom: 40px;

  .title{
    display: flex;
    flex-direction: column;

    .breadcrumbs{
      display: flex;
      gap: 10px;
    }

    .report-title{
      font-size: 36px;
      font-weight: 700;
      line-height: 48px;
      color: #101828;
    }
  }

  .container{
    display: flex;
    gap: 20px;

    .general_overview_container {
      flex: 0.8;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .different_info {
      flex: 0.2;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
}

@media (min-width: 1919px) {
  .default_section {
    flex-direction: row;
    width: calc(100% - 200px);
    margin: 0 auto;
  }
}

@media (max-width: 1919px) {
  .default_section {
    flex-direction: row;
    width: calc(100% - 200px);
    margin: 0 auto;
  }
}

@media (max-width: 1439px) {
  .default_section {
    flex-direction: row;
    width: calc(100% - 200px);
    margin: 0 auto;
  }
}

@media (max-width: 1023px) {
  .default_section {
    flex-direction: column;
    width: calc(100% - 100px);
    margin: 0 auto;
  }
}

@media (max-width: 767px) {
  .default_section {
    flex-direction: column;
    width: calc(100% - 50px);
    margin: 0 auto;
  }
}

@media (max-width: 424px) {
  .default_section {
    flex-direction: column;
    width: calc(100% - 20px);
    margin: 0 auto;
  }
}
</style>