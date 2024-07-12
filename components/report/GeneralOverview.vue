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
    default: true
  },
});

const screenWidth = ref(window?.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window?.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const hightestMonthRevenue = computed(() => {
  const {lst_revenue_sale_monthly} = props.data.data_analytic.by_overview;
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
  const isMobile = screenWidth.value < 768; // Assuming 768px as a breakpoint for mobile devices

  let yAxisTitleText = 'Số sản phẩm đã bán';
  let xAxisTitleText = '';

  if (isMobile) {
    yAxisTitleText = '';
    xAxisTitleText = 'Số sản phẩm đã bán';
  }
  return [
    {
      title: {
        text: 'Doanh số và sản phẩm đã bán theo tháng',
        style: {
          fontSize: '14px',
          color: '#241E46',
          fontWeight: 700,
          fontFamily: 'Inter',
        },
        margin: 50,
      },
      legend: {
        enabled: true,
        symbolHeight: 10,
        symbolWidth: 10,
        itemStyle: {
          fontSize: '12px',
          color: '#241E46',
          fontWeight: 400,
          fontFamily: 'Inter'
        }
      },
      tooltip: {
        enabled: false,
      },
      yAxis: [
        {
          title: {
            text: yAxisTitleText,
            style: {
              fontSize: '12px',
              color: '#241E46',
              fontWeight: 400,
              fontFamily: 'Inter'
            },
          },
          opposite: false,
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
        },
        title: {
          text: xAxisTitleText,
          align: 'low',
          style: {
            fontSize: '12px',
            color: '#241E46',
            fontWeight: 400,
            fontFamily: 'Inter'
          },
          y: -290,
          x: -50,
        },
      },
      series: [
        {
          name: 'Số sản phẩm đã bán',
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
                  (monthly: {
                    revenue: number,
                    score?: number,
                    by_platform?: { platform_id: number, revenue: number }[]
                  }) =>
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
    <summary-statistic :data="props.data" :is-hide-content="props.isHideContent"/>
    <div
        id="monthly-growth-chart"
        ref="monthlyGrowthChart"
        style="margin-bottom: 24px; position: relative;"
    >
      <highchart :options="charts[0]"/>
      <ChartMask v-if="props.isHideContent" :report="props.data"/>
    </div>
    <div id="thi-phan-cac-san-thuong-mai-dien-tu" class="items-center">
      <platform-chart
          v-if="props.data"
          :classified-analytic-response="{REVENUE_TOTAL: {platforms: data.data_analytic.by_marketplace.lst_marketplace}}"
          :is-hide-content="props.isHideContent"
      />
    </div>
    <InsightBlock>
      <li>
        Trong {{ diffMonths }}, nhóm hàng {{ data.name }}:
        đạt tổng doanh số
        <BlurContent :is-hide-content="props.isHideContent">
        <span>
          {{ formatSortTextCurrency(data.data_analytic.by_overview.revenue) }}
        </span>
        </BlurContent>
        đồng, với
        <BlurContent :is-hide-content="props.isHideContent">
        <span>
          {{ formatSortTextCurrency(data.data_analytic.by_overview.sale) }}
        </span>
        </BlurContent>
        sản phẩm bán ra.
      </li>
      <li>
        Thị trường {{ data.name }} có hơn
        <BlurContent :is-hide-content="props.isHideContent">
          <span>
            {{ formatNumber(data.data_analytic.by_overview.shop) }}
          </span>
        </BlurContent>
         nhà bán trên
        sàn TMĐT với hơn
        <BlurContent :is-hide-content="props.isHideContent">
      <span>
        {{ formatNumber(data.data_analytic.by_overview.product) }}
      </span>
        </BlurContent>
        mặt hàng.
      </li>
      <li
          v-for="platform in data.data_analytic.by_marketplace.lst_marketplace"
          :key="platform.name"
      >
        <span class="text-bold">{{ platform.name }}</span> chiếm
        <BlurContent :is-hide-content="props.isHideContent">
          {{ Number(platform.ratio_revenue * 100).toFixed(1) }}%
        </BlurContent>
        tổng doanh số, tương ứng
        <BlurContent :is-hide-content="props.isHideContent">
          {{ formatSortTextCurrency(platform.revenue) }}
        </BlurContent>
        đồng.
      </li>
      <li>
        Tháng
        <BlurContent :is-hide-content="props.isHideContent">
          {{ formatDateFunc(hightestMonthRevenue.begin, "MM/YYYY") }}
        </BlurContent>
        ghi nhận doanh số cao nhất trong 12 tháng
      </li>
    </InsightBlock>
  </div>
</template>

<style scoped lang="scss">
.general_overview {
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

@media (max-width: 768px) {
  .general_overview {
    border: none;
    padding: 16px;
  }
}
</style>
