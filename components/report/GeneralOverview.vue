<script setup lang="ts">
import { computed } from 'vue';
import SummaryStatistic from "~/components/report/SummaryStatistic.vue";
import { formatSortTextCurrency } from "~/helpers/utils";
import dayjs from "dayjs";
import { formatNumber } from "~/helpers/FormatHelper";

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
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
  const { lst_revenue_sale_monthly } = props.data.data_analytic.by_overview;
  const highestMonthRevenue = lst_revenue_sale_monthly.reduce(
      (acc: { revenue: number }, item: { revenue: string | number }) => {
        const itemRevenue = typeof item.revenue === 'string' ? parseFloat(item.revenue) : item.revenue;
        if (itemRevenue > acc.revenue) {
          return { ...item, revenue: itemRevenue };
        }
        return acc;
      },
      { revenue: 0 }
  );
  return highestMonthRevenue;
});

const formattedHighestMonthRevenue = computed(() => {
  return formatSortTextCurrency(hightestMonthRevenue.value.revenue);
});

const formatCurrency = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};

const formattedHighestMonthSale = computed(() => {
  return formatSortTextCurrency(hightestMonthRevenue.value.sale);
});

const formatDateFunc = (value: string, format: string) => {
  return dayjs(value, "YYYYMMDD").format(format);
};

const correctedSalesData = props.data.data_analytic.by_overview.lst_revenue_sale_monthly
    .slice()
    .map((item: { sale: number, score?: number }) => {
      if (item.sale !== undefined) {
        return item.sale;
      } else if (item.score !== undefined) {
        return item.score;
      } else {
        return 0; // Default value if both are undefined
      }
    });

console.log('data', correctedSalesData);

const diffMonths = computed(() => {
  const { start_date, end_date } = props.data.filter_custom;
  const startDate = dayjs(start_date);
  const endDate = dayjs(end_date);
  return endDate.diff(startDate, "months") + 1 + " tháng";
});

const diffRevenueMonths = computed(() => {
  const { lst_revenue_sale_monthly } = props.data.data_analytic.by_overview;
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
        formatter: function(this: { x: string, y: number, series: { name: string } }): string {
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
            formatter: function(this: { value: number }): string {
              return formatSortTextCurrency(this.value);
            }
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
          yAxis: 0,
          zIndex: 1,
          data: correctedSalesData,
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
          },
          dataLabels: {
            enabled: true,
            formatter: function(this: { y: number }): string {
              console.log('Data label', this.y);
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
    <div style="font-size: 16px; color: #241E46; font-weight: bold; text-align: center">Doanh số và sản phẩm đã bán theo tháng</div>
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
          Doanh số bán {{data.name}} trong {{ diffMonths }} đạt:
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
        Cập nhật tình hình thị trường {{ data.name }} có hơn
          <span>
            {{ formatNumber(data.data_analytic.by_overview.shop) }}
          </span>
        nhà bán trên sàn TMĐT với hơn
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
        <b class="text-bold">{{ platform.name }}</b> chiếm
          {{ Number(platform.ratio_revenue * 100).toFixed(1) }}%
        tổng doanh số và
          {{ Number(platform.ratio_sale * 100).toFixed(1) }}%
        về sản lượng
      </li>
      <li>
        Doanh số của sản phẩm {{ data.name }} trong tháng
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
        {{ diffRevenueMonths.diffPercent > 0 ? "tốt" : "thấp" }} hơn so với
        tháng
        {{ formatDateFunc(diffRevenueMonths.previousMonth[0].begin, "MM/YYYY") }}
        là {{ Math.abs(diffRevenueMonths.diffPercent) }}%.
      </li>
      <li>
        <b class="text-bold">Nhận xét trung hạn</b> trong 6 tháng gần
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
        </BlurContent>% so với 6 tháng liền kề.
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
