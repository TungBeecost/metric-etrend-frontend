<script setup lang="ts">
import type { SearchReportPayload } from "~/services/reports";
import { REPORT_ENDPOINTS } from "~/constant/endpoints";
import { ref, onMounted } from 'vue';
import {formatNumber} from "~/helpers/FormatHelper";

const config = useRuntimeConfig();
const isLoading = ref(true);
const tableData = ref([]);

const diffRevenueLatestQuarterPercent = (record: any) => {
  const dataAnalytic = record.by_overview;
  if (!dataAnalytic || dataAnalytic.length < 6) return NaN;

  const latestQuarter = dataAnalytic.slice(-3);
  const previousQuarter = dataAnalytic.slice(-6, -3);

  const revenueLatestQuarter = latestQuarter.reduce(
      (acc: number, item: { revenue: number }) => acc + item.revenue,
      0
  );
  const revenuePreviousQuarter = previousQuarter.reduce(
      (acc: number, item: { revenue: number }) => acc + item.revenue,
      0
  );

  const diff = revenueLatestQuarter - revenuePreviousQuarter;
  return parseFloat(((diff / revenuePreviousQuarter) * 100).toFixed(2));
};

const fetchReport = async () => {
  try {
    const body: SearchReportPayload = {
      limit: 40,
      lst_field: ["name", "slug", "url_thumbnail", "revenue_monthly", "created_at", "by_overview"],
      lst_query: [],
      lst_category_report_id: [],
      offset: 0,
      sort: "search_volume_shopee",
      order: "desc",
    };
    const { lst_report }: any = await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.search.endpoint}`, {
      method: 'POST',
      body
    });
    tableData.value = lst_report.map((item: any, index: number) => ({
      ...item,
      index: index + 1
    }));
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchReport();
});

const handleClickReport = (slug: string) => {
  window.location.href = `${config.public.BASE_URL}/${slug}`;
};
const columns = [
  {
    title: '',
    dataIndex: 'index',
    key: 'index',
    width: 30,
  },
  {
    title: 'Từ khoá',
    dataIndex: 'keyword',
    key: 'keyword',
    width: 300,
  },
  {
    title: 'Lượt tìm kiếm',
    dataIndex: 'search_volume',
    key: 'search_volume',
    width: 150,
  },
  {
    title: 'Tăng trưởng',
    dataIndex: 'growth',
    key: 'growth',
    width: 150,
  },
  {
    title: 'Xu hướng tăng trưởng',
    dataIndex: 'growth_trend',
    key: 'growth_trend',
    width: 200,
  },
  {
    title: '',
    dataIndex: 'view_report',
    key: 'view_report',
    width: 30,
  },
];
</script>

<template>
  <div id="top_report_trending_keyword" class="default_section">
    <div class="title_container">
      <div class="title">
        <div class="lable">Từ khoá trending</div>
        <p>Top từ khoá có lượng tìm kiếm trên Shopee cao nhất</p>
      </div>
    </div>
    <div class="content_container">
      <a-table
          :data-source="tableData"
          :columns="columns"
          :row-key="record => record.key"
          :scroll="{ x: 1000 }"
          :loading="tableData.length === 0"
          :pagination="{ pageSize: 4 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'keyword'">
            {{record.name}}
          </template>
          <template v-if="column.dataIndex === 'search_volume'">
            {{formatNumber(record.search_volume_shopee)}}
          </template>
          <template v-if="column.dataIndex === 'growth'">
            <p :style="{ color: diffRevenueLatestQuarterPercent(record) >= 0 ? '#35A855' : '#EE3324' }">
              {{ diffRevenueLatestQuarterPercent(record) >= 0 ? '+ ' : '- ' }}{{ Math.abs(diffRevenueLatestQuarterPercent(record)) }}%
            </p>
          </template>
          <template v-if="column.dataIndex === 'growth_trend'">
            <mini-trend-chart :data="record"/>
          </template>
          <template v-if="column.dataIndex === 'view_report'">
            <a-tooltip>
              <template #title>Xem báo cáo</template>
              <div style="cursor: pointer" @click="handleClickReport(record.slug)">
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="36" height="36" rx="18" fill="#EEEBFF"/>
                  <path d="M19.5 17L24.5 12M24.5 12H21.1667M24.5 12V15.3333M24.5 19.3333V22.6667C24.5 23.0203 24.3595 23.3594 24.1095 23.6095C23.8594 23.8595 23.5203 24 23.1667 24H13.8333C13.4797 24 13.1406 23.8595 12.8905 23.6095C12.6405 23.3594 12.5 23.0203 12.5 22.6667V13.3333C12.5 12.9797 12.6405 12.6406 12.8905 12.3905C13.1406 12.1405 13.4797 12 13.8333 12H17.1667" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </a-tooltip>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
#top_report_trending_keyword{
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

      .lable{
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