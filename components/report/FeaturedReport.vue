<script setup lang="ts">
import ItemFeatureReport from './ItemFeatureReport.vue';
import {type SearchReportPayload} from "~/services/reports";
import {REPORT_ENDPOINTS} from "~/constant/endpoints";

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

const {data: lstReport} = await useAsyncData(fetchReport)
</script>

<template>
  <div class="featured_report">
    <div class="default_section">
      <div class="title_content">
        <div class="tittle">Báo Cáo Nổi Bật</div>
        <div class="content">
          <div>
            Khám phá ngay các báo cáo đón đầu xu hướng bán hàng hiện nay giúp bạn nắm bắt kịp thời biến động thị trường và đưa ra quyết định đầu tư chính xác.
          </div>
        </div>
      </div>
        <div class="new_report">
          <item-feature-report :reports="(lstReport || []).slice(0, 10)"/>
        </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.featured_report {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  padding-top: 60px;
  //width: 100vh;
  height: 100%;
  //background-color: #FBFAFC;
  padding-bottom: 100px;
}

.title_content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-bottom: 64px;
}

.tittle {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #241E46;

  margin-bottom: 16px;
}

.content {
  div {
    text-align: center;
    font-size: 20px;
    color: #716B95;
    line-height: 32px;
  }
}

@media (max-width: 1023px) {
  .featured_report {
    padding-top: 40px;
    gap: 32px;
  }

  .title_content {
    gap: 8px;
    margin-bottom: 40px;
  }

  .tittle {
    font-size: 24px;
  }

  .content {
    font-size: 16px;
    line-height: 24px;

    .desktop-break {
      display: none;
    }
  }
}

@media (min-width: 1024px) {
  .featured_report {
    .title_content {
      .content {
        .desktop-break {
          display: inline;
        }
      }
    }
  }
}

@media (max-width: 1919px) {
  .featured_report {
    padding-top: 50px;
    gap: 50px;
  }

  .title_content {
    gap: 12px;
    margin-bottom: 50px;
  }

  .tittle {
    font-size: 32px;
  }

  .content {
    font-size: 18px;
    line-height: 28px;
  }
}

@media (max-width: 1550px) {
  .featured_report {
    padding-top: 45px;
    gap: 45px;
  }

  .title_content {
    gap: 10px;
    margin-bottom: 45px;
  }

  .tittle {
    font-size: 30px;
  }

  .content {
    font-size: 18px;
    line-height: 28px;
  }
}

</style>
