<script setup lang="ts">
import {computed, ref, onMounted} from 'vue';
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

onMounted(() => {
  screenWidth.value = window.innerWidth;
});

const hightestMonthRevenue = computed(() => {
  const byOverview = props.data?.data_analytic?.by_overview;
  if (!byOverview) {
    return {revenue: 0};
  }
  const {lst_revenue_sale_monthly} = byOverview;
  const highestMonthRevenue = lst_revenue_sale_monthly.reduce(
      (acc: { revenue: number }, item: { revenue: string | number }) => {
        const itemRevenue = typeof item.revenue === 'string' ? parseFloat(item.revenue) : item.revenue;
        if (itemRevenue > acc.revenue) {
          return {...item, revenue: itemRevenue};
        }
        return acc;
      },
      {revenue: 0}
  );
  return highestMonthRevenue;
});

const formattedHighestMonthRevenue = computed(() => {
  return formatSortTextCurrency(hightestMonthRevenue.value.revenue);
});

const formatCurrency = (value: number | string): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "";
};

const formattedHighestMonthSale = computed(() => {
  return formatSortTextCurrency(hightestMonthRevenue.value.sale);
});

const formatDateFunc = (value: string, format: string) => {
  return dayjs(value, "YYYYMMDD").format(format);
};


const diffMonths = computed(() => {
  const filterCustom = props.data?.filter_custom;
  if (!filterCustom) {
    return "0 tháng";
  }
  const {start_date, end_date} = filterCustom;
  const startDate = dayjs(start_date);
  const endDate = dayjs(end_date);
  return endDate.diff(startDate, "months") + 1 + " tháng";
});

const diffRevenueMonths = computed(() => {
  const byOverview = props.data?.data_analytic?.by_overview;
  if (!byOverview) {
    return {revenue: 0};
  }
  const {lst_revenue_sale_monthly} = byOverview;
  const latestMonth = lst_revenue_sale_monthly.slice(-1);
  const previousMonth = lst_revenue_sale_monthly.slice(-2, -1);
  const diff = latestMonth[0].revenue - previousMonth[0].revenue;
  const diffPercent = (diff / previousMonth[0].revenue) * 100;
  return {
    latestMonth,
    previousMonth,
    diffPercent: parseFloat(diffPercent.toFixed(2))
  };
});

const diffHalfYear = computed(() => {
  const byOverview = props.data?.data_analytic?.by_overview;
  if (!byOverview) {
    return {revenue: 0};
  }
  const {lst_revenue_sale_monthly} = byOverview;
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

const charts = computed(() => {
  if (!props.data) return [];
  const platformId = props.data.filter_custom.lst_platform_id[0];
  const isMobile = screenWidth.value < 768;

  let yAxisTitleText = 'Số sản phẩm đã bán';
  let xAxisTitleText = '';

  if (isMobile) {
    yAxisTitleText = '';
    xAxisTitleText = 'Số sản phẩm đã bán';
  }

  const lst_revenue_sale_monthly = props.data.data_analytic.by_overview.lst_revenue_sale_monthly.length > 12 ?
      props.data.data_analytic.by_overview.lst_revenue_sale_monthly.slice(-12) :
      props.data.data_analytic.by_overview.lst_revenue_sale_monthly;

  return [
    {
      title: {
        text: null,
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
        enabled: true,
        formatter: function (this: { x: string, y: number, series: { name: string } }): string {
          return `<b>${this.series.name}</b><br/>${this.x}: ${formatCurrency(this.y)}`;
        }
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
          opposite: true,
          labels: {
            style: {
              fontSize: '12px',
              color: '#241E46',
              fontWeight: 400,
              fontFamily: 'Inter'
            },
          }
        },
        {
          title: {
            text: 'Doanh số',
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
            },
            // formatter: function (this: { value: number }): string {
            //   return formatSortTextCurrency(this.value, false, true);
            // }
          }
        },
      ],
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      xAxis: {
        categories: lst_revenue_sale_monthly.map(
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
          yAxis: 0,
          zIndex: 1,
          data: lst_revenue_sale_monthly
              .map(
                  (monthly: {
                    sale: number,
                    score?: number,
                    by_platform?: { platform_id: number, sale: number }[]
                  }) =>
                      monthly.sale || (monthly.by_platform?.find(
                          (p: { platform_id: number }) => Number(p.platform_id) === platformId
                      )?.sale || monthly.score)
              ),
        },
        {
          name: 'Doanh số',
          stack: 'platform_revenue_price_range',
          type: 'column',
          yAxis: 1,
          borderRadius: 3,
          data: lst_revenue_sale_monthly
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
          },
          dataLabels: {
            enabled: true,
            formatter: function (this: { y: number }): string {
              return formatSortTextCurrency(this.y);
            },
            verticalAlign: 'top',
            y: -20,
            style: {
              fontSize: '10px',
              color: '#241E46',
              fontWeight: 400,
              fontFamily: 'Inter'
            }
          }
        },
      ]
    }
  ]
});

const filteredPlatforms = computed(() => {
  return props.data?.data_analytic?.by_marketplace?.lst_marketplace.filter((platform: any) => {
    return parseFloat(Number(platform.ratio_revenue * 100).toFixed(1)) !== 0 || parseFloat(Number(platform.ratio_sale * 100).toFixed(1)) !== 0;
  });
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
        <h3 class="statistic-item__title">Tổng quan</h3>
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
          :is-hide-content="props.isHideContent"
          :data="props.data"
      />
    </div>
    <InsightBlock>
      <li>
        <b>
          Doanh số bán {{ data?.name }} trong {{ diffMonths }} đạt:
          <BlurContent :is-hide-content="props.isHideContent">
        <span>
          <b>
            {{ formatSortTextCurrency(data.data_analytic.by_overview.revenue) }}
          </b>
        </span>
          </BlurContent>
          đồng, với
          <BlurContent :is-hide-content="props.isHideContent">
        <span>
          <b>
            {{ formatSortTextCurrency(data.data_analytic.by_overview.sale) }}
          </b>
        </span>
          </BlurContent>
          sản phẩm bán ra.
        </b>
      </li>
      <li>
        Cập nhật tình hình thị trường {{ data?.name }} có hơn
        <span>
            {{ formatNumber(data?.data_analytic?.by_overview?.shop) }}
          </span>
        nhà bán trên sàn TMĐT với hơn
        <BlurContent :is-hide-content="props.isHideContent">
          <span>
            {{ formatNumber(data?.data_analytic?.by_overview?.product) }}
          </span>
        </BlurContent>
        mặt hàng.
      </li>
      <li
          v-for="platform in filteredPlatforms"
          :key="platform.name"
      >
        <b class="text-bold">{{ platform.name }}</b> chiếm
        {{ Number(platform.ratio_revenue * 100).toFixed(1) }}%
        tổng doanh số và
        {{ Number(platform.ratio_sale * 100).toFixed(1) }}%
        về sản lượng
      </li>
      <li>
        Doanh số của sản phẩm {{ data?.name }} trong tháng
        {{ formatDateFunc(hightestMonthRevenue.begin, "MM/YYYY") }}
        đạt mức cao nhất với
        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{ formattedHighestMonthRevenue }}
          </span>
        </BlurContent>
        đồng và
        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{ formattedHighestMonthSale }}
          </span>
        </BlurContent>
        về sản lượng.
      </li>
      <li>
        Quy mô thị trường {{ data?.name }} tháng
        {{ diffRevenueMonths?.diffPercent !== undefined && diffRevenueMonths.diffPercent > 0 ? "tốt" : "thấp" }} hơn so
        với tháng đạt
        <BlurContent :is-hide-content="isHideContent">
    <span>
      {{
        diffRevenueMonths.latestMonth?.[0]?.revenue
            ? formatSortTextCurrency(diffRevenueMonths.latestMonth[0].revenue)
            : 'N/A'
      }}
    </span>
        </BlurContent>
        doanh số và tăng trưởng
        {{ diffRevenueMonths?.diffPercent !== undefined && diffRevenueMonths.diffPercent > 0 ? "tốt" : "thấp" }} hơn so
        với
        tháng
        {{
          diffRevenueMonths.previousMonth?.[0]?.begin ? formatDateFunc(diffRevenueMonths.previousMonth[0].begin, "MM/YYYY") : 'N/A'
        }}
        là {{ Math.abs(diffRevenueMonths?.diffPercent || 0) }}%.
      </li>
      <li>
        <b class="text-bold">Nhận xét trung hạn</b> trong 6 tháng gần
        nhất, {{ data?.name }}
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
.general_overview {
  border: 1px solid #EEEBFF;
  border-radius: 8px;
  padding: 24px;
  background: #fff;

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
