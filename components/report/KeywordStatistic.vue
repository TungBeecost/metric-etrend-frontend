<script setup>
import PieChart from "~/components/report/PieChart.vue";

const {data, isHideContent} = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isHideContent: {
    type: Boolean,
    default: true,
  },
});

const top5KeywordsByRevenue = computed(() => {
  if (!data?.data_analytic?.by_keyword || !data.data_analytic?.by_keyword?.lst_keyword) {
    return [];
  }

  return [
    ...data.data_analytic.by_keyword.lst_keyword
  ].sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map(({name, ...rest}) => ({
        // upper case first letter
        name: name.charAt(0).toUpperCase() + name.slice(1),
        ...rest,
      }));
});

const top5KeywordsBySale = computed(() => {
  if (!data.data_analytic?.by_keyword || !data.data_analytic?.by_keyword?.lst_keyword) {
    return [];
  }

  return [
    ...data.data_analytic.by_keyword.lst_keyword
  ].sort((a, b) => b.sale - a.sale)
      .slice(0, 5)
      .map(({name, ...rest}) => ({
        // upper case first letter
        name: name.charAt(0).toUpperCase() + name.slice(1),
        ...rest,
      }));
});

const totalRevenue = computed(() => {
  if (!top5KeywordsByRevenue.value.length) {
    return 0;
  }

  return top5KeywordsByRevenue.value.reduce((acc, item) => acc + item.revenue, 0);
});

const totalSale = computed(() => {
  if (!top5KeywordsBySale.value.length) {
    return 0;
  }

  return top5KeywordsBySale.value.reduce((acc, item) => acc + item.sale, 0);
});
</script>

<template>
  <div
      v-if="top5KeywordsByRevenue.length > 0 && data?.report_type === 'report_category'"
      id="thong-ke-thuong-hieu"
      class="border statistic-block"
  >
    <div class="statistic-item__title">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
      </svg>
      <div>
        <div class="statistic-item__title">Nhóm hàng</div>
        <div class="statistic-item__subtitle">Top 5 nhóm hàng bán chạy trong 365 ngày qua</div>
      </div>
    </div>
    <div class="pie_chart" style="position: relative;">
      <div class="pie_chart_item">
        <PieChart
            title="Tỷ trọng doanh số theo top 5 nhóm hàng"

            :series="[
            {
              name: 'Doanh số',
              data: top5KeywordsByRevenue.map(({ name, revenue = 0 } = {}) => ({name, y: revenue})),
            },
          ]"
        />
      </div>
      <div class="pie_chart_item">
        <PieChart
            title="Tỷ trọng sản lượng theo top 5 nhóm hàng"

            :series="[
            {
              name: 'Sản lượng',
              data: top5KeywordsBySale.map(({ name, sale = 0 } = {}) => ({name, y: sale})),
            },
          ]"
        />
      </div>
      <ChartMask v-if="isHideContent" :report="data"/>
    </div>
    <InsightBlock v-if="top5KeywordsByRevenue.length > 0">
      <li>
        Trong {{ data.name }},
        nhóm hàng đạt doanh số cao nhất là
        <BlurContent :is-blurred="isHideContent">
          {{ top5KeywordsByRevenue[0].name }}
        </BlurContent>
        với thị phần trong top 5 là
        <BlurContent :is-blurred="isHideContent">
          {{ ((top5KeywordsByRevenue[0].revenue / totalRevenue) * 100).toFixed(2) }}%
        </BlurContent>
        ,
        nhóm hàng
        <BlurContent :is-blurred="isHideContent">
          {{ top5KeywordsByRevenue[1].name }}
        </BlurContent>
        đứng vị trí thứ 2 với
        <BlurContent :is-blurred="isHideContent">
          {{ ((top5KeywordsByRevenue[1].revenue / totalRevenue) * 100).toFixed(2) }}%
        </BlurContent>
        ,
        theo sau lần lượt là các nhóm hàng
        <BlurContent :is-blurred="isHideContent">
          {{ top5KeywordsByRevenue[2].name }}
        </BlurContent>
        ,
        <BlurContent :is-blurred="isHideContent">
          {{ top5KeywordsByRevenue[3].name }}
        </BlurContent>
        và
        <BlurContent :is-blurred="isHideContent">
          {{ top5KeywordsByRevenue[4].name }}
        </BlurContent>
        .
      </li>
      <li>
        Về sản lượng bán, nhóm hàng bán chạy nhất là
        <BlurContent :is-blurred="isHideContent">
          {{ top5KeywordsBySale[0].name }}
        </BlurContent>
        với
        <BlurContent :is-blurred="isHideContent">
          {{ ((top5KeywordsBySale[0].sale / totalSale) * 100).toFixed(2) }}%
        </BlurContent>
        thị phần trong top 5,
        các nhóm hàng bán chạy tiếp theo lần lượt là
        <BlurContent :is-blurred="isHideContent">
          {{ top5KeywordsBySale[1].name }}
        </BlurContent>
        ,
        <BlurContent :is-blurred="isHideContent">
          {{ top5KeywordsBySale[2].name }}
        </BlurContent>
        ,
        <BlurContent :is-blurred="isHideContent">
          {{ top5KeywordsBySale[3].name }}
        </BlurContent>
        và
        <BlurContent :is-blurred="isHideContent">
          {{ top5KeywordsBySale[4].name }}
        </BlurContent>
        .
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
    display: flex;
    justify-content: center;

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
  line-height: 32px;
  color: #241E46;
}

#thong-ke-thuong-hieu {
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #EEEBFF;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 768px) {
  #thong-ke-thuong-hieu {
    padding: 16px;
    border: none;
  }

  .pie_chart {
    flex-direction: column;
  }
}
</style>
