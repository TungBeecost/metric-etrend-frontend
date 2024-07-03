<script setup lang="ts">
import {computed} from 'vue';
import SummaryStatistic from "~/components/report/SummaryStatistic.vue";

import {formatSortTextCurrency} from "~/helpers/utils";
import dayjs from "dayjs";
import {formatNumber} from "~/helpers/FormatHelper";


const props = defineProps({
  data: {
    type: Object,
    default: () => {
    },
  },
  isHideContent: {
    type: Boolean,
    default: false
  },
  isFreeUser: {
    type: Boolean,
    default: true,
  },
});

const platformNames: Record<number, string> = {
  1: "Shopee",
  2: "Lazada",
  3: "Tiki",
  4: "Sendo",
};

const platformColors: Record<string, string> = {
  Shopee: "#FF9264",
  Lazada: "#47538F",
  Tiki: "#5BAFFE",
};

const diffRevenueMonths = computed(() => {
  const { lst_revenue_sale_monthly } = props.data.data_analytic.by_overview;
  const latestMonth = lst_revenue_sale_monthly.slice(-1);
  const previousMonth = lst_revenue_sale_monthly.slice(-2, -1);
  const revenueLatestMonth = latestMonth.reduce(
      (acc: number, item: { revenue: number }) => acc + item.revenue,
      0
  );
  const revenuePreviousMonth = previousMonth.reduce(
      (acc: number, item: { revenue: number }) => acc + item.revenue,
      0
  );
  const diff = revenueLatestMonth - revenuePreviousMonth;
  return {
    diffPercent: ((diff / revenuePreviousMonth) * 100).toFixed(1),
    latestMonth,
    previousMonth,
  };
});

const hightestMonthRevenue = computed(() => {
  const { lst_revenue_sale_monthly } = props.data.data_analytic.by_overview;
  const highestMonthRevenue = lst_revenue_sale_monthly.reduce(
      (acc: { revenue: number }, item: { revenue: number }) => {
        if (item.revenue > acc.revenue) {
          return item;
        }
        return acc;
      },
      lst_revenue_sale_monthly[0]
  );
  return highestMonthRevenue;
});

const diffHalfYear = computed(() => {
  const { lst_revenue_sale_monthly } = props.data.data_analytic.by_overview;
  const latestHalfYear = lst_revenue_sale_monthly.slice(-6);
  const previousHalfYear = lst_revenue_sale_monthly.slice(-12, -6);
  const revenueLatestHalfYear = latestHalfYear.reduce(
      (acc: number, item: { revenue: number }) => acc + item.revenue,
      0
  );
  const revenuePreviousHalfYear = previousHalfYear.reduce(
      (acc: number, item: { revenue: number }) => acc + item.revenue,
      0
  );
  const diff = revenueLatestHalfYear - revenuePreviousHalfYear;
  return {
    diffPercent: ((diff / revenuePreviousHalfYear) * 100).toFixed(1),
    latestHalfYear,
    previousHalfYear,
  };
});

const formatDateFunc = (value: string, format: string) => {
  return dayjs(value, "YYYYMMDD").format(format);
};

const diffMonths = computed(() => {
  const {start_date, end_date} = props.data.filter_custom;
  const startDate = dayjs(start_date);
  const endDate = dayjs(end_date);
  return endDate.diff(startDate, "months") + 1 + " tháng";
});

const charts = computed(() => {
  if (!props.data) return [];
  const platformId = props.data.filter_custom.lst_platform_id[0];
  return [
    {
      title: {
        text: 'Doanh số và sản phẩm đã bán theo tháng',
        style: {
          fontSize: '14px',
          color: '#241E46',
          fontWeight: 700,
          fontFamily: 'Inter'
        }
      },
      tooltip: {
        enabled: false,
      },
      yAxis: [
        {
          title: {
            text: 'Sản lượng',
            style: {
              fontSize: '12px',
              color: '#241E46',
              fontWeight: 400,
              fontFamily: 'Inter'
            }
          },
          opposite: true,
          labels: {
            style: {
              fontSize: '12px',
              color: '#241E46',
              fontWeight: 400,
              fontFamily: 'Inter'
            }
          }
        },
        {
          title: false,
          labels: {
            enabled: false,
          }
        },
      ],
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      legend: {
        enabled: true,
        reversed: true,
        symbolRadius: 1,
      },
      xAxis: {
        categories: props.data.data_analytic.by_overview.lst_revenue_sale_monthly.map(
            ({begin}: { begin: string }) => `${formatDateFunc(begin, 'MM/YYYY')}`
        ),
        labels: {
          style: {
            fontSize: '12px',
            color: '#241E46',
            fontWeight: 400,
            fontFamily: 'Inter'
          }
        }
      },
      series: [
        {
          name: 'Sản lượng',
          color: '#1A1A46',
          type: 'spline',
          zIndex: 1,
          data: props.data.data_analytic.by_overview.lst_revenue_sale_monthly
              .slice()
              .map((item: { sale: number, score?: number }) => item.sale || item.score),
        },
        {
          name: 'Doanh số',
          stack: 'platform_revenue_price_range',
          type: 'column',
          yAxis: 1,
          borderRadius: 3,
          data: props.data.data_analytic.by_overview.lst_revenue_sale_monthly
              .slice()
              .map(
                  (monthly: { revenue: number, score?: number, by_platform?: { platform_id: number, revenue: number }[] }) =>
                      monthly.revenue || (monthly.by_platform?.find(
                          (p: { platform_id: number }) => Number(p.platform_id) === platformId
                      )?.revenue || monthly.score)
              ),
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, '#FCA14E'],
              [1, '#FF733F']
            ]
          }
        },
      ]
    }
  ]
});
</script>

<template>
  <div class="general_overview">
    <div class="statistic-item__title">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
      </svg>
      <div>
        <div class="statistic-item__title">Tổng quan</div>
      </div>
    </div>
    <summary-statistic :data="props.data" :is-hide-content="isHideContent"/>
    <div
        id="monthly-growth-chart"
        ref="monthlyGrowthChart"
        style="margin-bottom: 24px;"
    >
      <highchart :options="charts[0]"/>
    </div>
    <div id="thi-phan-cac-san-thuong-mai-dien-tu" class="items-center">
      <platform-chart
          v-if="props.data"
          :classified-analytic-response="{REVENUE_TOTAL: {platforms: data.data_analytic.by_marketplace.lst_marketplace}}"
          :is-hide-content="props.isFreeUser"
      />
    </div>
    <InsightBlock>
      <li>
    <span class="text-bold">
      Doanh số bán {{ data.name }} trong {{ diffMonths }}: đạt
      <BlurContent :is-hide-content="isFreeUser">
        <span>
          {{ formatSortTextCurrency(data.data_analytic.by_overview.revenue) }}
        </span>
      </BlurContent>
      đồng, với
      <BlurContent :is-hide-content="isHideContent">
        <span>
          {{ formatSortTextCurrency(data.data_analytic.by_overview.sale) }}
        </span>
      </BlurContent>
      sản phẩm bán ra
    </span>
      </li>
      <li>
        Cập nhật tình hình thị trường {{ data.name }} có hơn
        {{ formatNumber(data.data_analytic.by_overview.shop) }} nhà bán trên
        sàn TMĐT với hơn
        <BlurContent :is-hide-content="isHideContent">
      <span>
        {{ formatNumber(data.data_analytic.by_overview.product) }}
      </span>
        </BlurContent>
        mặt hàng
      </li>
      <li
          v-for="platform in data.data_analytic.by_marketplace.lst_marketplace"
          :key="platform.name"
      >
        <span class="text-bold">{{ platform.name }}</span> chiếm
        {{ Number(platform.ratio_revenue * 100).toFixed(1) }}% tổng doanh số và
        {{ Number(platform.ratio_sale * 100).toFixed(1) }}% về sản lượng
      </li>
      <li>
        Doanh số của sản phẩm {{ data.name }} trong tháng
        {{ formatDateFunc(hightestMonthRevenue.begin, "MM/YYYY") }}
        đạt mức cao nhất với
        <BlurContent :is-hide-content="isHideContent">
      <span>
        {{ formatSortTextCurrency(hightestMonthRevenue.revenue) }}
      </span>
        </BlurContent>
        đồng và
        <BlurContent :is-hide-content="isHideContent">
      <span>
        {{ formatSortTextCurrency(hightestMonthRevenue.sale) }}
      </span>
        </BlurContent>
        về sản lượng.
      </li>
      <li>
        Quy mô thị trường {{ data.name }} tháng
        {{ formatDateFunc(diffRevenueMonths.latestMonth[0].begin, "MM/YYYY") }}
        đạt
        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{
              formatSortTextCurrency(diffRevenueMonths.latestMonth[0].revenue)
            }}
          </span>
        </BlurContent>
        doanh số và tăng trưởng
        {{ Number(diffRevenueMonths.diffPercent) > 0 ? "tốt" : "thấp" }} hơn so với
        tháng
        {{ formatDateFunc(diffRevenueMonths.previousMonth[0].begin, "MM/YYYY") }}
        là {{ Math.abs(Number(diffRevenueMonths.diffPercent)) }}%.
      </li>
      <li>
        <span class="text-bold">Nhận xét trung hạn</span> trong 6 tháng gần
        nhất, {{ data.name }}
        {{
          Number(diffHalfYear.diffPercent) > 0
              ? "tăng trưởng doanh thu"
              : "doanh thu giảm"
        }}
        <BlurContent :is-hide-content="isHideContent">
    <span>
      {{ diffHalfYear.diffPercent }}
    </span>
        </BlurContent>
        % so với 6 tháng liền kề.
      </li>
    </InsightBlock>
  </div>
</template>

<style scoped lang="scss">
.general_overview{
  border: 1px solid #EEEBFF;
  border-radius: 8px;
  padding: 24px;

  .statistic-item__title {
    display: flex;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    color: #101828;

    svg {
      margin-right: 8px;
    }
  }

  .items-center {
    display: flex;
    align-items: center;
    gap: 20px;
  }

}
</style>
