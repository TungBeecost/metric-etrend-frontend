<script setup lang="ts">
import type {SearchReportPayload} from "~/services/reports";
import {REPORT_ENDPOINTS} from "~/constant/endpoints";
import ItemFeatureReport from "~/components/report/ItemFeatureReport.vue";
import ItemFeatureReportFree from "~/components/ItemFeatureReportFree.vue";
import {NAVIGATIONS} from "~/constant/constains";


const config = useRuntimeConfig();

const fetchReport = async () => {
  console.log('fetchReport')
  try {
    const body: SearchReportPayload = {
      limit: 10,
      lst_field: ["name", "slug", "url_thumbnail", "revenue_monthly", "gr_quarter", "shop", "created_at"],
      lst_query: [],
      lst_category_report_id: [],
      offset: 0,
      sort: "popularity",
      source: ["marketing"],
    };
    const {lst_report}: any = await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.search.endpoint}`, {
      method: 'POST',
      body
    })
    return lst_report
  } catch (e) {
    console.log(e)
  }
}

const handleButtonFree = () => {
  navigateTo(`${NAVIGATIONS.search}?price_type=marketing`);
}

const {data: lstReport} = await useAsyncData(fetchReport)
</script>

<template>
<div class="report_free">
  <div class="tile_report_free default_section">
    <div class="title">Báo cáo miễn phí</div>
    <div class="content">Truy cập không giới hạn kho báo cáo thị trường Thương mại điện tử miễn phí</div>
  </div>
  <div v-if="lstReport" class="detail_report_free default_section">
    <item-feature-report-free :reports="(lstReport || []).slice(0, 10)"/>
  </div>
  <img src="/images/background-search.png" class="background">
  <a-button style="height: 40px;  z-index: 2; padding: 9px 16px; font-weight: 500;" @click="handleButtonFree">Xem thêm</a-button>
</div>
</template>

<style scoped lang="scss">
.report_free{
  display: flex;
  padding: 60px 0;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  background: var(--Gradient, linear-gradient(270deg, #4745A5 0%, #241E46 98.36%));
  position: relative;

  .tile_report_free{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     gap: 16px;
     z-index: 2;

      .title{
        text-align: center;
        line-height: 48px;
        font-size: 36px;
        font-weight: 700;
        color: #FFFFFF;
      }

      .content{
        text-align: center;
        line-height: 32px;
        font-size: 20px;
        font-weight: 400;
        color: #FFFFFF;
      }
   }

  .detail_report_free {
    padding: 40px 0;
    z-index: 2;
  }

  .background{
    width: 100%;
    opacity: 0.2;
    //transform: rotate(-15deg) scale(1.1);
    position: absolute;
    object-fit: fill;
    top: 0;
    left: 0;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: 1;
  }
}

@media (max-width: 768px) {
  .report_free{
    padding: 40px 0;
    gap: 24px;

    .tile_report_free{
      .title{
        font-size: 24px;
        line-height: 36px;
      }

      .content{
        font-size: 16px;
        line-height: 24px;
      }
    }

  }
}
</style>