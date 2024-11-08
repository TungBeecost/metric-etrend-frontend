<template>
  <div id="thi-phan-cac-san-tmdt-keyword">
    <div class="main-slide">
      <div class="title"><span>THỊ PHẦN CÁC SÀN TMĐT</span></div>
      <div class="flex items-center flex-col" style="gap: 20px">
        <div class="statistics flex" style="gap: 20px">
          <div class="statistic-item">
            <div class="chart-title">
              <div class="chart-title-shape" style="background: #FFE7BA"/>
              Thị phần doanh thu các sàn TMĐT
            </div>
            <div :class="{'blurred-4': true}">
              <highchart :options="charts[0]"/>
            </div>
          </div>
          <div class="flex-1">
            <a-table
                :columns="columns"
                :data-source="tableData"
                :pagination="false"
            >
              <template #platform="{ _ }">
                <img
                    :src="platformLogos[_.platform]"
                    :alt="platformNames[_.platform]"
                    style="height: 20px; margin: auto"
                />
              </template>
              <template #revenue="{ text }">
                <span>{{ formatSortTextCurrencyFunc(text) }}</span>
              </template>
              <template #sale="{ text }">
                <span>{{ formatNumber(text) }}</span>
              </template>
              <template #shop="{ text }">
                <span>{{ formatNumber(text) }}</span>
              </template>
            </a-table>
          </div>
        </div>
        <div class="statistics flex items-center">
          <div class="statistic-item relative">
            <div>
              <div class="chart-title">
                <div class="chart-title-shape" style="background: #FFCCC7"/>
                Doanh số sản phẩm {{ data.name }} trên các TMĐT
              </div>
              <div :class="{'blurred-4': isCovered}">
                <highchart :options="charts[1]"/>
              </div>
            </div>
          </div>
          <div class="descriptions">
            <ul>
              <li>Trung bình mỗi tháng, sản phẩm “{{ data.name }}” đạt doanh thu
                <BlurContent :is-blurred="isCovered" style="font-weight: 700">
                  {{ formatSortTextCurrencyFunc(averageMonthRevenue) }} đồng
                </BlurContent>
                .
              </li>
              <li>Doanh số tháng {{ formatDateFunc(lastMonthRevenue.begin, 'MM/YYYY') }} đạt
                <BlurContent :is-blurred="isCovered" style="font-weight: 700">{{
                    formatSortTextCurrencyFunc(lastMonthRevenue.revenue)
                  }} đồng
                </BlurContent>
                .
              </li>
              <li>Trong 12 tháng gần nhất, tháng {{ formatDateFunc(highestMonthRevenue.begin, 'MM/YYYY') }} đạt doanh số
                cao nhất với
                <BlurContent :is-blurred="isCovered" style="font-weight: 700">{{
                    formatSortTextCurrencyFunc(highestMonthRevenue.revenue)
                  }} đồng
                </BlurContent>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import moment from 'moment';
import Highcharts from 'highcharts';
import { formatSortTextCurrencyWithMinValue } from '@/services/utils';
import { formatNumber } from '~/helpers/FormatHelper.js';

const platformNames = {
  1: "Shopee",
  2: "Lazada",
  3: "Tiki",
  4: "Sendo"
};

const platformLogos = {
  1: '/shopee-logo.svg',
  2: '/lazada-logo.svg',
  3: '/tiki-logo.svg',
};

const platformColors = {
  Shopee: "#F15D24",
  Lazada: "#241E46",
  Tiki: "#1990FF"
};

// Utility Functions
function formatDateFunc(value, format) {
  return moment(value, "YYYYMMDD").format(format);
}

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  isHideContent: {
    type: Boolean,
    default: false
  },
  slide: {
    type: String,
    default: '0'
  }
});

// Columns Configuration
const columns = [
  {
    title: 'Sàn TMĐT',
    dataIndex: 'platform',
    align: 'center',
    key: 'platform',
    scopedSlots: { customRender: 'platform' },
    width: '26%'
  },
  {
    title: 'Doanh số',
    dataIndex: 'revenue',
    key: 'revenue',
    scopedSlots: { customRender: 'revenue' },
    align: 'center',
    width: '23%'
  },
  {
    title: 'Sản lượng',
    dataIndex: 'sale',
    key: 'sale',
    scopedSlots: { customRender: 'sale' },
    align: 'center',
    width: '23%'
  },
  {
    title: 'Shop có lượt bán',
    dataIndex: 'shop',
    key: 'shop',
    scopedSlots: { customRender: 'shop' },
    align: 'center',
    width: '23%'
  }
];

// Computed Properties
const isCovered = computed(() => true);

const tableData = computed(() => {
  const marketplaceData = props.data.data_analytic?.by_marketplace?.lst_marketplace || [];
  return marketplaceData.map(p => {
    const y = props.isHideContent ? p.ratio_revenue * 100 : p.revenue;
    return {
      key: p.name,
      platform: p.platform_id,
      revenue: isCovered.value ? 'Đã ẩn' : y || 0,
      sale: isCovered.value ? 'Đã ẩn' : p.sale || 0,
      shop: isCovered.value ? 'Đã ẩn' : p.shop || 0,
    };
  });
});

const charts = computed(() => {
  const marketplaceData = props.data.data_analytic?.by_marketplace?.lst_marketplace || [];
  const revenueSaleMonthly = props.data.data_analytic?.by_overview?.lst_revenue_sale_monthly || [];

  return [
    {
      chart: {
        type: "pie",
        width: 330,
        height: 210,
        style: {
          fontFamily: "Inter",
        },
      },
      title: {
        text: "",
      },
      plotOptions: {
        pie: {
          size: 130,
          cursor: "pointer",
          showInLegend: true,
          distance: 15,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return '<b>' + Highcharts.numberFormat(this.percentage, 1, ',') + ' %';
            },
            itemStyle: {
              fontSize: "16px",
              color: "white",
            }
          }
        }
      },
      legend: {
        itemStyle: { fontSize: "8px", fontFamily: "Inter", fontWeight: 400 },
        symbolRadius: 1,
      },
      series: [
        {
          name: "Doanh số",
          innerSize: "65%",
          colorByPoint: true,
          data: marketplaceData.map(p => {
            const y = props.isHideContent ? p.ratio_revenue * 100 : p.ratio_revenue * 100;
            return {
              name: platformNames[p.platform_id] || p.name,  // Ensure name mapping
              y,
              color: platformColors[platformNames[p.platform_id]] || '#000000'  // Default color if not found
            };
          })
        }
      ]
    },
    {
      title: {
        text: "",
      },
      chart: {
        width: 480,
        height: 220,
        type: 'column',
      },
      legend: {
        itemStyle: { fontSize: "8px", fontFamily: "Inter", fontWeight: 400 },
        reversed: true,
        symbolRadius: 1,
      },
      yAxis: [
        {
          title: {
            text: "Doanh số (VNĐ)",
            style: {
              fontSize: "8px",
              fontFamily: "Inter",
              fontWeight: 400
            },
          },
          labels: {
            style: {
              fontSize: "8px",
              fontFamily: "Inter",
              fontWeight: 400
            },
          },
        },
        {
          title: {
            text: "Số sản phẩm đã bán",
            style: {
              fontSize: "8px",
              fontFamily: "Inter",
              fontWeight: 400
            },
          },
          labels: {
            style: {
              fontSize: "8px",
              fontFamily: "Inter",
              fontWeight: 400
            },
          },
          opposite: true
        }
      ],
      xAxis: {
        categories: revenueSaleMonthly.map(({ begin }) => formatDateFunc(begin, "MM/YYYY")),
        labels: {
          style: {
            fontSize: "8px",
            fontFamily: "Inter",
            fontWeight: 400
          }
        }
      },
      series: [
        {
          name: 'Doanh số',
          type: 'column',
          yAxis: 1,
          color: '#f15c26',
          data: revenueSaleMonthly.map(({ score }) => score),
          tooltip: {
            valueSuffix: ' đ',
          },
        },
        {
          name: 'Số sản phẩm đã bán',
          type: 'spline',
          color: '#002060',
          data: revenueSaleMonthly.map(({ score }) => score),
        },
      ]
    }
  ];
});



const highestMonthRevenue = computed(() => {
  const revenueSaleMonthly = props.data.data_analytic?.by_overview?.lst_revenue_sale_monthly || [];
  return revenueSaleMonthly.reduce((acc, item) => item.revenue > acc.revenue ? item : acc, revenueSaleMonthly[0] || {});
});

const lastMonthRevenue = computed(() => {
  const revenueSaleMonthly = props.data.data_analytic?.by_overview?.lst_revenue_sale_monthly || [];
  return revenueSaleMonthly.slice(-1)[0] || {};
});

const averageMonthRevenue = computed(() => {
  const revenueSaleMonthly = props.data.data_analytic?.by_overview?.lst_revenue_sale_monthly || [];
  const revenue = revenueSaleMonthly.reduce((acc, item) => acc + item.revenue, 0);
  return revenue / revenueSaleMonthly.length || 0;
});

function formatSortTextCurrencyFunc(value) {
  return `${formatSortTextCurrencyWithMinValue(value, false, 1000)}`;
}
</script>


<style lang="scss">
.chart-title {
  font-size: 12px;
  font-weight: 600;

  display: flex;
  align-items: center;

  margin-left: 20px;
  margin-bottom: 10px;

  color: #000;

  .chart-title-shape {
    width: 10px;
    height: 20px;
    border-radius: 3px;
    display: inline-block;
    margin-right: 5px;
  }
}

#thi-phan-cac-san-tmdt-keyword {
  table {
    tr {
      th {
        background-color: #241E46 !important;
        color: #fff !important;
        font-weight: 600 !important;

        &:not(:last-child) {
          border-right: 1px solid #fff;
        }
      }

      td {
        border-right: 1px solid #f0f1f2;
        font-weight: 500;

        &:first-child {
          border-left: 1px solid #f0f1f2;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
#thi-phan-cac-san-tmdt-keyword {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;

  .main-slide {
    width: 100%;
    height: 600px;

    padding: 20px;

    background-color: #fff;

    .title {
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;

      letter-spacing: -0.02em;

      color: #F15D25;

      margin-bottom: 36px;

      span {
        font-weight: 700;
      }
    }

    .statistics {
      display: flex;
      gap: 10px;

      width: 100%;

      .descriptions {
        display: flex;
        align-items: center;
        ul {
          padding-left: 24px;
          list-style: disc;

          li {
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;

            letter-spacing: -0.02em;

            color: #241E46;

            margin-bottom: 16px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
.blurred-4 {
  filter: blur(4px);
}

</style>
