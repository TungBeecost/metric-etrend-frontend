<script setup lang="ts">
import {defineProps} from 'vue';
import PieChart from "~/components/report/PieChart.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isFreeUser: {
    type: Boolean,
    default: false,
  },
});

const formatNumber = (value: number = 0) => {
  const formatWithLocale = (val: number) => val.toLocaleString("vi-VN");
  return formatWithLocale(value);
};
</script>

<template>
  <div
      v-if="
      props.data.data_analytic.by_brand &&
      props.data.data_analytic.by_brand.lst_top_brand_revenue &&
      props.data.data_analytic.by_brand.lst_top_brand_revenue.length > 1
    "
      class="border statistic-block"
      id="thong-ke-thuong-hieu"
  >
    <div class="statistic-item__title">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
      </svg>
      <div>
        <div class="statistic-item__title">Thương hiệu</div>
      </div>
    </div>
    <div class="pie_chart">
      <div class="pie_chart_item">
        <PieChart
            title="Top thương hiệu theo Doanh số"
            :is-hide-content="isFreeUser"
            :series="[
            {
              name: 'Doanh thu',
              data: props.data.data_analytic.by_brand.lst_top_brand_revenue.map(
                ({ name = '', revenue = 0, ratio_revenue = 0 } = {}) => ({
                  name,
                  y: revenue || ratio_revenue,
                  categoryName: 'Thương hiệu',
                })
              ),
            },
          ]"
        />
      </div>
      <div class="pie_chart_item">
        <PieChart
            title="Top thương hiệu theo Sản lượng"
            :is-hide-content="props.isFreeUser"
            :series="[
            {
              name: 'Sản phẩm đã bán',
              data: props.data.data_analytic.by_brand.lst_top_brand_sale.map(
                ({ name = '', sale = 0, ratio_sale = 0 } = {}) => ({
                  name,
                  y: sale || ratio_sale,
                  categoryName: 'Thương hiệu',
                })
              ),
            },
          ]"
        />
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
        Phân tích thị trường {{ props.data.name }} có hơn
        <BlurContent :is-hide-content="props.isFreeUser">
          <span>
            {{
              formatNumber(props.data.data_analytic.by_brand.ratio?.brand.brand || 0)
            }}
          </span>
        </BlurContent>
        thương hiệu chiếm
        {{
          Number(
              props.data.data_analytic.by_brand.ratio?.brand.ratio_revenue * 100 || 0
          ).toFixed(1)
        }}% tổng doanh thu. So sánh giữa 10 thương hiệu hàng đầu,
        <span class="text-bold">{{
            props.data.data_analytic.by_brand.lst_top_brand_revenue[0].name
          }}</span>
        đang chiếm
        <BlurContent :is-hide-content="props.isFreeUser">
          <span>
            {{
              Number(
                  props.data.data_analytic.by_brand.lst_top_brand_revenue[0]
                      .ratio_revenue * 100
              ).toFixed(2)
            }}
          </span>
        </BlurContent>
        % thị phần về doanh thu{{
          props.data.data_analytic.by_brand.lst_top_brand_revenue[0].ratio_sale
              ? " và " +
              Number(
                  props.data.data_analytic.by_brand.lst_top_brand_revenue[0].ratio_sale
              ).toFixed(2) +
              "% thị phần về sản lượng"
              : ""
        }}.
        <template
            v-if="
            props.data.data_analytic.by_brand &&
            props.data.data_analytic.by_brand.lst_top_brand_revenue &&
            props.data.data_analytic.by_brand.lst_top_brand_revenue.length > 2
          "
        >Tiếp theo đó là
          <span class="text-bold">
            {{ props.data.data_analytic.by_brand.lst_top_brand_revenue[1].name }}
          </span>
          và
          <span class="text-bold">{{
              props.data.data_analytic.by_brand.lst_top_brand_revenue[2].name
            }}</span>
          tương ứng thị phần {{ props.data.name }} với doanh thu là
          <BlurContent :is-hide-content="props.isFreeUser">
            <span>
              {{
                Number(
                    props.data.data_analytic.by_brand.lst_top_brand_revenue[1]
                        .ratio_revenue * 100
                ).toFixed(2)
              }}
            </span>
          </BlurContent>
          % và
          <BlurContent :is-hide-content="props.isFreeUser">
            <span>
              {{
                Number(
                    props.data.data_analytic.by_brand.lst_top_brand_revenue[2]
                        .ratio_revenue * 100
                ).toFixed(2)
              }}
            </span>
          </BlurContent>
          %.
        </template>
      </li>
    </InsightBlock>
  </div>
</template>

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
  gap: 16px;
  justify-content: center;
  width: 100%;

  .pie_chart_item {
    width: 100%;
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
</style>
