<script setup lang="ts">
import {formatAndRoundSortTextCurrencyWithMinValue, formatCurrency, formatNumberIntoText} from "~/helpers/FormatHelper";
const route = useRoute();

const columns = [
  {
    title: 'Báo cáo',
    dataIndex: 'report',
    key: 'report',
  },
  {
    title: 'Lượt tìm kiếm Shopee',
    dataIndex: 'shopee_searches',
    key: 'shopee_searches',
  },
  {
    title: 'Doanh số 2024',
    dataIndex: 'revenue',
    key: 'revenue',
  },
  {
    title: 'Tăng trưởng',
    dataIndex: 'growth',
    key: 'growth',
  },
  {
      title: 'Xu hướng tăng trưởng',
    dataIndex: 'growth_trend',
    key: 'growth_trend',
  },
];

const tableData = ref([]);
const config = useRuntimeConfig();

const fetchReportDetails = async () => {
  try {
    const slug = route.params.slug;
    const url = `${config.public.API_ENDPOINT}/api/report/detail_pdf?slug=${slug}`;
    const response = await fetch(url);
    const data = await response.json();
    tableData.value = data.lst_report_related.map((item: any) => {
      const currentMonth = new Date().getFullYear() * 100 + (new Date().getMonth() + 1);
      return {
        ...item,
        key: item.slug,
        name: item.name[0].toUpperCase() + item.name.slice(1),
        shopee_searches: item.search_volume_shopee,
        revenue_monthly: item.revenue_monthly * 1000000,
        revenue_by_month: item.revenue_by_month,
        revenue: formatNumberIntoText(item.revenue_by_month.reduce((sum: any, item: any) =>
            item.month >= currentMonth - 101 && item.month < currentMonth ? sum + item.revenue : sum, 0)),
      };
    });
  } catch (error) {
    console.error('Error fetching report details:', error);
  }
};

const diffRevenueLatestQuarterPercent = (record: any) => {
  const dataAnalytic = record;
  if (!dataAnalytic || !dataAnalytic.revenue_by_month) return NaN;
  const lst_revenue_sale_monthly = dataAnalytic.revenue_by_month;
  const latestQuarter = lst_revenue_sale_monthly.slice(-3);
  const previousQuarter = lst_revenue_sale_monthly.slice(-6, -3);
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

const handleClick = (slug: any) => {
  window.location.href = `${config.public.URL_BASE}/${slug}`;
};

onMounted(() => {
  fetchReportDetails();
});

</script>

<template>
  <div id="suggest_report_page">
    <div class="suggest_report_container default_section">
      <div class="suggest_report_title">
        <h1>Khám phá ngay báo cáo cùng ngành hàng</h1>
        <p>Trong lúc chờ đợi, xem thêm các báo cáo liên quan tới báo cáo bạn đã mua</p>
      </div>
      <div class="suggest_report_content">
        <a-table
            :data-source="tableData"
            :columns="columns"
            :row-key="record => record.key"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'report'">
              <div class="report_container" @click="handleClick(record.slug)">
                <img v-if="record.url_thumbnail" :src="record.url_thumbnail" alt="report" >
                <img v-else src="/images/default_thumbnail_report.png" alt="report" >
                <div class="report_content">
                  <p class="name_report">{{record.name}}</p>
                  <div class="report_info">
                    <img src="/icons/ShopIcon.svg" alt="shop" >
                    <p>{{formatAndRoundSortTextCurrencyWithMinValue(record.shop)}}</p>
                    <p> - nhà bán</p>
                  </div>
                  <div class="report_info">
                    <img src="/icons/ProductIcon.svg" alt="product" >
                    <p>{{formatAndRoundSortTextCurrencyWithMinValue(record.product)}}</p>
                    <p> - sản phẩm</p>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'growth'">
              <p :style="{ color: diffRevenueLatestQuarterPercent(record) >= 0 ? '#35A855' : '#EE3324' }">
                {{ Math.abs(diffRevenueLatestQuarterPercent(record)) }}%
              </p>
            </template>
            <template v-if="column.dataIndex === 'growth_trend'">
              <mini-trend-chart :data="record"/>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#suggest_report_page{
  background: #FBFAFC;

  .suggest_report_container{
    padding: 64px 0;
    display: flex;
    flex-direction: column;
    gap: 48px;
    cursor: pointer;

    .suggest_report_title{
      display: flex;
      flex-direction: column;
      gap: 12px;

      h1{
        text-align: center;
        font-size: 36px;
        font-weight: 700;
        line-height: 48px;
      }

      p{
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }
    }
  }
}

.report_container{
  display: flex;
  gap: 16px;

  img{
    width: 72px;
    height: 72px;
    border-radius: 8px;
  }

  .report_content{
    .name_report{
      overflow: hidden;
      color: var(--Neutral-neutral-10, #2E323C);
      text-overflow: ellipsis;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      align-self: stretch;
    }

    .report_info{
      display: flex;
      align-items: center;
      gap: 4px;

      img{
        width: 16px;
        height: 16px;
      }
    }
  }


}

</style>

<style lang="scss">
#suggest_report_page{
  .suggest_report_container{
    .suggest_report_content{
      .ant-table-wrapper{
        .ant-spin-nested-loading{
          .ant-spin-container{
            .ant-table{
              .ant-table-container{
                .ant-table-content{
                  table{
                    thead{
                      tr{
                        th{
                          background: #EEEBFF;
                          text-align: center;
                        }
                      }
                    }
                    tbody{
                      tr{
                        td:not(:first-child) {
                          align-content: center;
                          text-align: center;
                        }
                        td:last-child {
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        }
                      }
                    }
                  }
                }
              }
            }
            .ant-pagination{
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>