<script setup lang="ts">
import type {SearchReportPayload} from "~/services/reports";
import {REPORT_ENDPOINTS} from "~/constant/endpoints";
import ItemFeatureReport from "~/components/report/ItemFeatureReport.vue";
const lstReport = ref([]);
const config = useRuntimeConfig();
const isLoading = ref(true);

const fetchReport = async () => {
  try {
    const body: SearchReportPayload = {
      limit: 10,
      lst_field: ["name", "slug", "url_thumbnail", "revenue_monthly", "gr_quarter", "shop", "created_at", "url_square"],
      lst_query: [],
      lst_category_report_id: [],
      offset: 0,
      sort: "created_at",
      order: "desc",
      lst_report_type: ['report_category']
    };
    const { lst_report }: any = await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.search.endpoint}`, {
      method: 'POST',
      body
    });
    lstReport.value = lst_report;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchReport();
});

const handleClickCategory = () => {
  window.location.href = '/search?report_type=report_category';
};
</script>

<template>
  <div class="top_report_category default_section">
    <div class="title_container">
      <div class="title">
        <div>Top Ngành hàng tăng trưởng</div>
        <p>Top Ngành hàng tăng trưởng doanh số so với cùng kỳ cao nhất</p>
      </div>
      <div @click="handleClickCategory" class="description">
          <span>Xem tất cả</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.86914 5.22021L12.2441 9.90771L7.86914 14.5952" stroke="#1890FF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      </div>
    </div>
    <div class="content_container">
      <div class="list_report">
        <a-skeleton v-if="isLoading" class="default_section" :paragraph="{ rows: 7 }"/>
        <item-feature-report v-else :reports="(lstReport || []).slice(0, 10)"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top_report_category{
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .title_container{
    display: flex;
    gap: 8px;

    .title{
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1 0 0;

      div{
        color: var(--Dark-blue-dark-blue-8, #241E46);
        font-size: 36px;
        font-weight: 700;
        line-height: 48px;
      }

      p{
        font-size: 20px;
        font-weight: 400;
        line-height: 32px;
      }
    }

    .description{
      display: flex;
      padding: 5px 8px 5px 5.5px;
      justify-content: center;
      align-items: flex-end;
      color: #1890FF;
      gap: 5.5px;
      cursor: pointer;
    }
  }
}
</style>