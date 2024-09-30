<script setup>
import {computed} from 'vue';
import InsightBlock from "@/components/InsightBlock";
import {formatSortTextCurrency, formatSortTextCurrencyWithMinValue} from "~/helpers/utils.js";
import {formatCurrency} from "~/helpers/FormatHelper.js";
import moment from 'moment';
import {ALL_PLATFORM_BASE_OBJECT} from "~/constant/general/GeneralConstant.js";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isHideContent: {
    type: Boolean,
    default: () => true,
  },
});

const formatPriceRange = (priceRange, prefix = ['trên', 'dưới']) => {
  if (!priceRange.begin) {
    return `${prefix[0]} ${formatCurrency(priceRange.end)}`;
  }
  if (!priceRange.end) {
    return `${prefix[1]} ${formatCurrency(priceRange.begin)}`;
  }
  return `${formatCurrency(priceRange.begin)} - ${formatCurrency(priceRange.end)}`;
};

const priceRangesSortBy = (field = 'revenue') => {
  const {lst_price_range} = props.data.data_analytic.by_price_range;
  return lst_price_range.slice().sort((a, b) => b[field] - a[field]) || [];
};

const diffMonths = computed(() => {
  const {start_date, end_date} = props.data.filter_custom;
  const startDate = moment(start_date);
  const endDate = moment(end_date);
  return endDate.diff(startDate, "months") + 1 + " tháng";
});

// Define the getPlatformById function
const getPlatformById = (platformId) => {
  for (const platformKey in ALL_PLATFORM_BASE_OBJECT) {
    const platform = ALL_PLATFORM_BASE_OBJECT[platformKey];
    if (platform.platform_id === Number(platformId)) {
      return platform;
    }
  }
  return null;
};

// Define the platformColors object
const platformColors = {
  Shopee: "#EE672D",
  Lazada: "#122689",
  Tiki: "#0060FF",
  Sendo: "#E12A00",
  Tiktok: "#000",
};

const chartOptions = computed(() => {
  const BY__PRICE_RANGE = [...props.data.data_analytic.by_price_range.lst_price_range].sort((a, b) => {
    if (!a.begin) {
      return -1;
    }
    return a.begin - b.end;
  });

  const lstPlatform = BY__PRICE_RANGE[0].lst_platform.map((item) => item.platform_id).reverse();

  return {
    chart: {
      type: "column",
      style: {
        fontFamily: "Inter",
      },
    },
    title: {
      text: null,
    },
    legend: {
      enabled: true,
      reversed: true,
      symbolHeight: 10,
      symbolWidth: 10,
      itemStyle: {
        fontSize: '12px',
        color: '#241E46',
        fontWeight: 400,
        fontFamily: 'Inter'
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            color: '#241E46',
            fontWeight: 400,
            fontFamily: 'Inter'
          },
          formatter: function () {
            const y = Number(parseFloat(this.y).toFixed(1));
            if (y * 10 % 10 === 0) {
              return formatSortTextCurrencyWithMinValue(parseInt(`${y}`, 10));
            }
            return y.toLocaleString("vi-VN");
          },
        }
      },
      series: {
        stacking: 'normal',
      },
    },
    xAxis: {
      categories: BY__PRICE_RANGE.map(({begin, end} = {}) => {
        return formatPriceRange({begin, end}, ['<', '>']);
      }),
      title: {
        text: 'Mức giá (Đồng)',
        align: 'high',
        style: {
          fontSize: '12px',
          color: '#241E46',
          fontWeight: 400,
          fontFamily: 'Inter'
        }
      },
      labels: {
        style: {
          fontSize: '12px',
          color: '#241E46',
          fontWeight: 400,
          fontFamily: 'Inter'
        },
      }
    },
    yAxis: [
      {
        title: {
          text: 'Doanh số (Đồng)',
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
          },
          formatter: function () {
            return formatSortTextCurrency(this.value);
          }
        }
      },
      {
        title: {
          text: 'Số sản phẩm đã bán (Sản phẩm)',
          style: {
            fontSize: '12px',
            color: '#241E46',
            fontWeight: 400,
            fontFamily: 'Inter'
          },
          opposite: true,
          labels: {
            style: {
              fontSize: '12px',
              color: '#241E46',
              fontWeight: 400,
              fontFamily: 'Inter'
            },
            formatter: function () {
              return formatSortTextCurrency(this.value);
            }
          }
        }
      },
    ],
    series: [
      {
        name: 'Số sản phẩm đã bán cả 3 sàn',
        color: '#1A1A46',
        type: 'spline',
        zIndex: 10,
        data: props.data.data_analytic.by_price_range.lst_price_range
            .slice()
            .map((item) => item.sale),
      },
      ...lstPlatform.map((platformId) => {
        const platform = getPlatformById(platformId);
        return {
          name: platform.name,
          color: platformColors[platform.name],
          borderRadius: 4,
          yAxis: 1,
          data: BY__PRICE_RANGE.map(
              ({lst_platform}) => lst_platform.find(
                  ({platform_id}) => platform_id === platformId
              )?.revenue || 0
          ),
          tooltip: {
            valueSuffix: " đ"
          },
        };
      })
    ]
  };
});

</script>

<template>
  <div id="thong-ke-phan-khuc-gia" class="border statistic-block mb-6">
    <div class="statistic-item__title">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
      </svg>
      <div>
        <h3 class="statistic-item__title">Phân khúc giá</h3>
      </div>
    </div>
    <h4 style="text-align: center; font-weight: bold; font-size: 16px">Doanh số và số sản phẩm {{ props.data.name }} đã bán theo phân khúc giá</h4>
    <div class="my-4 w-full text-center relative" style="position: relative">
      <highchart :options="chartOptions"/>
      <ChartMask v-if="props.isHideContent" :report="props.data"/>
    </div>
    <InsightBlock
        v-if="priceRangesSortBy('revenue') && priceRangesSortBy('revenue').length"
    >
      <li>
        Trong {{ diffMonths }} qua, phân khúc khách hàng thị trường Áo thun nam thường mua chủ yếu ở mức giá khoảng
          {{ formatCurrency(priceRangesSortBy("revenue")[0].begin) }} -
          {{ formatCurrency(priceRangesSortBy("revenue")[0].end) }}.
      </li>
      <li
          v-if="priceRangesSortBy('revenue') &&priceRangesSortBy('revenue').length > 1"
      >
        Phân khúc giá phổ biến của Áo thun nam là
          {{ priceRangesSortBy("sale")[0].begin ? formatCurrency(priceRangesSortBy("sale")[0].begin) + ' - ' : '< ' }}
          {{ formatCurrency(priceRangesSortBy("sale")[0].end) }}
        ,
          {{ formatCurrency(priceRangesSortBy("revenue")[1].begin) }} -
          {{ formatCurrency(priceRangesSortBy("revenue")[1].end) }}.
      </li>
    </InsightBlock>
  </div>
</template>

<style lang="scss">
.highcharts-credits {
  display: none !important;
}

.ant-collapse > .ant-collapse-item {
  border: none;

  .ant-collapse-header {
    font-weight: 500;

    .ant-collapse-arrow {
      top: 36%;
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

.statistic-item__title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  color: #241E46;

}

#thong-ke-phan-khuc-gia {
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #EEEBFF;
  display: flex;
  flex-direction: column;
  gap: 16px;
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

@media (max-width: 768px) {
  #thong-ke-phan-khuc-gia{
    border: none;
    padding: 16px;
  }
}
</style>
