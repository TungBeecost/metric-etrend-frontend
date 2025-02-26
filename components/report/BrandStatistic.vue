<script setup>
import {computed, ref, onMounted, watchEffect} from 'vue';
import Highcharts from 'highcharts';
import {formatNumber} from "~/helpers/FormatHelper.js";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isHideContent: {
    type: Boolean,
    default: true,
  },
});

const renderChartSales = ref(false);
const renderChartOutput = ref(false);
const windowWidth = ref(0);
const isMobile = ref(false);
const platformId = ref(0);

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    isMobile.value = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      windowWidth.value = window.innerWidth;
      isMobile.value = window.innerWidth < 768;
    });
  }
  renderChartSales.value = true;
  renderChartOutput.value = true;
  try {
    platformId.value = props.data?.data_filter_report?.lst_platform_id[0];
  } catch (e) {}
});

const promptPlatformById = (platformId) => {
  switch (platformId) {
    case 1:
      return 'Shopee';
    case 2:
      return 'Lazada';
    case 3:
      return 'Tiki';
    case 4: 
      return 'Tiktok';
    default:
      return 'Khác';
  }
}

const chartWidth = computed(() => {
  if (windowWidth.value < 1200) {
    return 300;
  } else if (windowWidth.value < 1500) {
    return 400;
  } else {
    return 600;
  }
});

const chartHeight = computed(() => {
  if (windowWidth.value < 1200) {
    return 300;
  } else {
    return 400;
  }
});

const colors = [
  "#9254DE",
  "#FF7A45",
  "#FF4D4F",
  "#597EF7",
  "#241E46",
  "#F15D25",
  "#1890FF",
  "#36CFC9",
  "#AEC986",
  "#FFC53D"
]

const tooltipSales = ref({});
const tooltipOutput = ref({});
const dataLabels = ref({});

watchEffect(() => {
  tooltipSales.value = props.isHideContent
      ? {
        enabled: true,
        formatter: function () {
          const name = ![5, 7, 9].includes(this.point.index)
              ? `Đã bị ẩn`
              : this.point.name;
          return `${name}<br/>
            <svg width="10" height="10">
              <rect width="10" height="10" style="fill:${this.point.color};stroke-width:3;stroke:rgb(0,0,0)" />
            </svg> ${this.series.name}: <strong>Đã bị ẩn</strong>`;
        },
      }
      : {
        enabled: true,
        formatter: function () {
          return `<b>${this.point.name}</b><br/>Doanh số: ${Highcharts.numberFormat(this.point.y, 0, ',', '.')} đ`;
        },
      };

  tooltipOutput.value = props.isHideContent
      ? {
        enabled: true,
        formatter: function () {
          const name = ![5, 7, 9].includes(this.point.index)
              ? `Đã bị ẩn`
              : this.point.name;
          return `${name}<br/>
            <svg width="10" height="10">
              <rect width="10" height="10" style="fill:${this.point.color};stroke-width:3;stroke:rgb(0,0,0)" />
            </svg> ${this.series.name}: <strong>Đã bị ẩn</strong>`;
        },
      }
      : {
        enabled: true,
        formatter: function () {
          return `<b>${this.point.name}</b><br/>Sản lượng: ${Highcharts.numberFormat(this.point.y, 0, ',', '.')}`;
        },
      };

  dataLabels.value = props.isHideContent
      ? {
        enabled: true,
        formatter: function () {
          if (isMobile.value) {
            return '<span style="color: #9D97BF; filter: blur(4px)">đã ẩn</span>';
          }
          return ![5, 7, 9].includes(this.point.index)
              ? '<span style="color: #9D97BF; filter: blur(4px)">đã ẩn</span> ' + '<span style="color: #9D97BF; filter: blur(4px)">đã ẩn</span>'
              : '<span style="font-weight: bold">' + this.point.name + '</span>: ' + '<span style="color: #E85912">' + Highcharts.numberFormat(this.percentage, 1, ',') + '%</span>';
        },
      }
      : {
        enabled: true,
        formatter: function () {
          if (isMobile.value) {
            return '<span style="color: #E85912">' + Highcharts.numberFormat(this.percentage, 1, ',') + '%</span>';
          }
          return '<span style="font-weight: bold">' + this.point.name + '</span>: ' + '<span style="color: #E85912">' + Highcharts.numberFormat(this.percentage, 1, ',') + '%</span>';
        },
      };
});

const chartOptionsSales = computed(() => ({
  chart: {
    type: "pie",
    width: chartWidth.value || 500,
    height: chartHeight.value || 400,
    style: {
      fontFamily: "Inter",
    },
  },
  title: {
    text: `<div style="text-align: center;"><h4>Top 10 thương hiệu theo doanh số</h4></div>`,    useHTML: true,
    style: {
      fontSize: '16px',
      color: '#241E46',
      fontWeight: 700,
      fontFamily: "Inter",
    }
  },
  subtitle: {
    text: `Chỉ thống kê sàn Shopee, Lazada, Tiki`,
    style: {
      fontSize: '13px',
      color: '#716B95',
      fontWeight: 400,
      fontFamily: 'Inter'
    }
  },
  legend: {
    enabled: false,
  },
  tooltip: tooltipSales.value,
  plotOptions: {
    pie: {
      cursor: "pointer",
      showInLegend: true,
      innerSize: '50%',
      dataLabels: {
        ...dataLabels.value,
        connectorShape: 'crookedLine',
        style: {
          fontSize: '12px',
          color: '#241E46',
          fontWeight: 400,
          fontFamily: "Inter",
        },
      }
    },
    series: {
      enableMouseTracking: true
    }
  },
  series: [
    {
      name: 'Doanh số (Đồng)',
      data: props.data.data_analytic.by_brand.lst_top_brand_revenue.slice(0, 10).map(({name, revenue, ratio_revenue}, index) => ({
        name: name,
        y: revenue || ratio_revenue,
        color: colors[index % colors.length]
      })).sort((a, b) => b.y - a.y),
    }
  ]
}));

const chartOptionsOutput = computed(() => ({
  chart: {
    type: "pie",
    width: chartWidth.value || 500,
    height: chartHeight.value || 400,
    style: {
      fontFamily: "Inter",
    },
  },
  title: {
    text: `<div style="text-align: center;"><h4>Top 10 thương hiệu theo sản lượng</h4></div>`,    useHTML: true,
    style: {
      fontSize: '16px',
      color: '#241E46',
      fontWeight: 700,
      fontFamily: "Inter",
    }
  },
  subtitle: {
    text: `Chỉ thống kê sàn Shopee, Lazada, Tiki`,
    style: {
      fontSize: '13px',
      color: '#716B95',
      fontWeight: 400,
      fontFamily: 'Inter'
    }
  },
  legend: {
    enabled: false, // Hide the legend
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'middle',
    symbolHeight: 10,
    symbolWidth: 10,
    itemStyle: {
      fontSize: '12px',
      color: '#241E46',
      fontWeight: 400,
      fontFamily: 'Inter'
    }
  },
  tooltip: tooltipOutput.value,
  plotOptions: {
    pie: {
      cursor: "pointer",
      showInLegend: true,
      innerSize: '50%',
      dataLabels: {
        ...dataLabels.value,
        connectorShape: 'crookedLine',
        style: {
          fontSize: '12px',
          color: '#241E46',
          fontWeight: 400,
          fontFamily: 'Inter'
        },
      }
    },
    series: {
      enableMouseTracking: true
    }
  },
  series: [
    {
      name: 'Sản lượng (Đồng)',
      data: props.data.data_analytic.by_brand.lst_top_brand_sale.slice(0, 10).map(({name, sale, ratio_sale}, index) => ({
        name: name,
        y: sale || ratio_sale,
        color: colors[index % colors.length]
      })).sort((a, b) => b.y - a.y),
    }
  ]
}));

const formattedBrandCount = computed(() => {
  return formatNumber(props.data.data_analytic.by_brand.ratio?.brand.brand || 0);
});
</script>

<template>
  <div
      v-if="
      props.data.data_analytic.by_brand &&
      props.data.data_analytic.by_brand.lst_top_brand_revenue &&
      props.data.data_analytic.by_brand.lst_top_brand_revenue.length > 1
    "
      id="thong-ke-thuong-hieu"
      class="border statistic-block"
  >
    <div class="statistic-item__title">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
      </svg>
      <div>
        <h3 class="statistic-item__title">Thương hiệu</h3>
        <!--        <div style="font-size: 14px; color: #716B95">Chỉ thống kê số liệu sàn Shopee, Lazada, Tiki</div>-->
      </div>
    </div>
    <div class="chart_item">
      <div>
        <highchart v-if="renderChartSales" :options="chartOptionsSales"/>
      </div>
      <div>
        <highchart v-if="renderChartOutput" :options="chartOptionsOutput"/>
      </div>
    </div>
    <InsightBlock
        v-if="
        props.data.data_analytic.by_brand &&
        props.data.data_analytic.by_brand.lst_top_brand_revenue &&
        props.data.data_analytic.by_brand.lst_top_brand_revenue.length > 1
      "
    >
      <li>

        Phân tích {{ data?.report_type == 'report_top_shop' ? "gian hàng" : "thị trường" }} {{ data.name }} {{ data?.report_type == 'report_top_shop' ? "trên sàn " + promptPlatformById(platformId) : "" }} có hơn
        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{ formattedBrandCount }}
          </span>
        </BlurContent>

        thương hiệu chiếm
        {{
          formatNumber(Number(
              data.data_analytic.by_brand.ratio?.brand.ratio_revenue * 100 || 0
          ).toFixed(1))
        }}% tổng doanh thu.
        So sánh giữa 10 thương hiệu hàng đầu,
        <b class="text-bold">{{
            data.data_analytic.by_brand.lst_top_brand_revenue[0].name
          }}</b>
        đang chiếm
        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{
              formatNumber(Number(
                  data.data_analytic.by_brand.lst_top_brand_revenue[0]
                      .ratio_revenue * 100
              ).toFixed(2))
            }}
          </span>
        </BlurContent>
        % thị phần về doanh thu{{
          data.data_analytic.by_brand.lst_top_brand_revenue[0].ratio_sale
              ? " và " +
              Number(
                  data.data_analytic.by_brand.lst_top_brand_revenue[0].ratio_sale
              ).toFixed(2) +
              "% thị phần về sản lượng"
              : ""
        }}.
        <template
            v-if="
            data.data_analytic.by_brand &&
            data.data_analytic.by_brand.lst_top_brand_revenue &&
            data.data_analytic.by_brand.lst_top_brand_revenue.length > 2
          "
        >Tiếp theo đó là
          <b class="text-bold">
            {{ data.data_analytic.by_brand.lst_top_brand_revenue[1].name }}
          </b>
          và
          <b class="text-bold">{{
              data.data_analytic.by_brand.lst_top_brand_revenue[2].name
            }}</b>
          tương ứng thị phần {{ data?.report_type == 'report_top_shop' ? "gian hàng" : "" }} {{ data.name }} với doanh thu là
          <BlurContent :is-hide-content="isHideContent">
            <span>
              {{
                formatNumber(Number(
                    data.data_analytic.by_brand.lst_top_brand_revenue[1]
                        .ratio_revenue * 100
                ).toFixed(2))
              }}
            </span>
          </BlurContent>
          % và
          <BlurContent :is-hide-content="isHideContent">
            <span>
              {{
                formatNumber(Number(
                    data.data_analytic.by_brand.lst_top_brand_revenue[2]
                        .ratio_revenue * 100
                ).toFixed(2))
              }}
            </span>
          </BlurContent>
          %.
        </template>
      </li>
    </InsightBlock>
  </div>
</template>

<style lang="scss">
#thong-ke-thuong-hieu {
  .ant-table {
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    overflow: hidden;

    .ant-table-thead > tr > th {
      background: #EEEBFF !important;

      font-size: 14px;
      line-height: 22px;

      color: #241E46;
    }

    .ant-table-tbody > tr > td {
      font-size: 14px;
      line-height: 22px;

      color: #241E46;
    }
  }
}
</style>

<style scoped lang="scss">
.main {
  span.text-blurred {
    filter: blur(6px);
    user-select: none;
  }

  .show-popup-lead-btn {
    margin-top: 8px;

    font-weight: 500;
    font-size: 14px;
    line-height: 16px;

    a {
      color: #3463db;
      text-decoration: underline;

      &:hover {
        color: #f47d51;
      }
    }
  }

  .container-content {
    padding: 16px;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    border-radius: 4px;

    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;

    color: #2e2e2e;

    .report-title {
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 42px;

      color: #191945;

      margin-bottom: 16px;
    }

    .report-description {
      font-weight: 400;
      font-size: 18px;
      line-height: 1.4;

      color: #2e2e2e;

      span.text-bold {
        font-weight: 700;
      }
    }

    .bestseller-products-list {
      li {
        &::marker {
          margin-right: 8px;
        }
      }
    }

    .filter-custom-info {
      ul li {
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }

        span {
          font-weight: 600;
        }
      }
    }

    .related-reports {
      display: flex;
      flex-wrap: wrap;

      gap: 8px;

      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.4;

      color: #2e2e2e;

      a.tag {
        padding: 8px 12px;
        height: fit-content;
        border: 1px solid #333;
        border-radius: 20px;

        transition: all 0.3s;

        li {
          display: flex;
          align-items: center;
        }

        // a {

        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.4;

        color: #2e2e2e;
        // }

        svg {
          width: 18px;

          margin-right: 8px;
        }

        &:hover {
          background: #333;
          color: #fff;

          svg {
            color: #fff;
          }
        }
      }
    }
  }

  .main-statistic {
    .statistic-title {
      .title {
        font-weight: 500;
        font-size: 36px;
        line-height: 42px;

        color: #2e2e2e;

        margin-bottom: 12px;
      }

      .date-range {
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;

        color: #e85912;
      }
    }

    .statistic-block {
      border-radius: 16px;
      padding: 24px;

      background: #fff;

      .statistic-block-title {
        font-weight: 500;
        font-size: 28px;
        line-height: 33px;

        color: #2e2e2e;

        margin-bottom: 16px;
        padding-left: 10px;

        border-left: 3px solid #e85912;
      }

      .statistic-block-title-secondary {
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;

        color: #3b3b3b;
        margin-bottom: 16px;
      }

      .overview-datas {
        flex: 1;

        display: flex;
        flex-direction: column;

        gap: 42px;

        margin-bottom: 32px;

        .overview-data-item {
          flex: 1;
          padding: 12px;

          background: #f4f7ff;
          border-radius: 4px;

          &:nth-child(1) {
            border-top: 8px solid #f47d51;
          }

          &:nth-child(2) {
            border-top: 8px solid #1a1a46;
          }

          &:nth-child(3) {
            border-top: 8px solid #586d96;
          }

          &:nth-child(4) {
            border-top: 8px solid #665191;
          }

          .name {
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;

            color: #2e2e2e;

            margin-bottom: 16px;
          }

          .value {
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;

            color: #2e2e2e;
          }
        }
      }

      .sumary-statistics {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: fit-content;
        flex-wrap: wrap;
        gap: 16px;
        flex: 1;

        position: relative;
        z-index: 10;

        .sumary-statistic-item {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          height: fit-content;

          width: calc(50% - 8px);

          padding: 16px;

          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #d3d9e5;
          border-radius: 8px;

          width: 100%;

          transition: all 0.3s ease;

          &.hovered,
          &:not(.is-hide-content) {
            cursor: pointer;

            &:hover {
              transform: scale(1.1);
              box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

              &.Shopee {
                border: 1px solid #f47d51;
              }

              &.Lazada {
                border: 1px solid #df317c;
              }

              &.Tiki {
                border: 1px solid #5799ff;
              }
            }
          }

          .name {
            display: flex;
            align-items: center;

            font-weight: 400;
            font-size: 16px;
            line-height: 19px;

            color: #2e2e2e;

            margin-bottom: 16px;

            svg {
              margin-right: 8px;
            }
          }

          .value {
            font-weight: 500;
            font-size: 24px;
            line-height: 28px;

            color: #2e2e2e;
          }

          .platform-img {
            img {
              border-radius: 50px;
            }
          }
        }
      }

      .list-shop {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 8px;

        width: fit-content;
        margin: auto;

        .shop-item {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;

          .shop-img {
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;

            margin-bottom: 8px;

            img {
              object-fit: contain;
              width: 100%;
              max-width: 80px;
            }
          }

          .shop-name {
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;

            color: #3b3b3b;

            text-align: center;
          }
        }
      }

      .products-list {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;

        .product-item {
          width: calc(50% - 8px);
        }
      }
    }
  }
}

.chart_item {
  display: flex;
  justify-content: space-between;
}

@media (min-width: 768px) {
  .main {
    padding: 24px;

    .container-content {
      padding: 24px;
      margin-bottom: 24px;
    }

    .main-statistic .statistic-block {
      .overview-datas {
        flex-direction: row;
      }

      .sumary-statistics {
        .sumary-statistic-item {
          width: 400px;
        }
      }

      .products-list {
        .product-item {
          width: calc(25% - 12px);
        }
      }

      .list-shop {
        justify-content: center;

        .shop-item {
          width: calc(100% / 6 - 32px);
        }
      }
    }
  }
}

.pie_chart {
  display: flex;
  gap: 24px;
  justify-content: center;
  width: 100%;

  .pie_chart_item {
    width: 100%;
    max-width: 400px;
    margin: auto;

    .chart-title {
      color: var(--Dark-blue-dark-blue-8, #241E46);
      text-align: center;

      font-family: Inter, sans-serif;
      font-size: 14px;
      font-weight: 700;
      line-height: 22px; /* 157.143% */

      margin-bottom: 16px;
    }
  }
}


.statistic-item__title {
  display: flex;
  align-items: center;

  gap: 16px;
  font-size: 20px;

  font-weight: 700;
  line-height: 28px;

  color: #241E46;
}

#thong-ke-thuong-hieu {
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #EEEBFF;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
}

@media (max-width: 768px) {
  #thong-ke-thuong-hieu {
    padding: 16px;
    border: none;
  }

  .chart_item {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .pie_chart {
    flex-direction: column;
  }
}
</style>
