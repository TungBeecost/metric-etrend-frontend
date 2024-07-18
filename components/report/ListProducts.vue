<script setup>
import {defineProps, ref} from 'vue';
import {useCurrentUser} from "~/stores/current-user.js";

const props = defineProps({
  isHideContent: {
    type: Boolean,
    default: true,
  },
  isHide:{
    type: Boolean,
    default: true,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);
const isHideContentBasic = ref(true);
if (userInfo.current_plan?.plan_code === 'e_pro' && !props.isHide) {
  isHideContentBasic.value = false;
}
</script>

<template>
  <div
      v-if="
      props.data.data_analytic &&
      props.data.data_analytic.by_product &&
      props.data.data_analytic.by_product.lst_product_revenue_30d &&
      props.data.data_analytic.by_product.lst_product_revenue_30d.length > 0
    "
      id="list-products"
      class="border statistic-block"
      style="margin-bottom: 16px;"
  >
    <div class="statistic-item__title" style="margin-bottom: 16px;">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
      </svg>
      <div>
        <div class="statistic-item__title">Sản phẩm bán chạy</div>
        <div
            v-if="
            props.data.data_analytic &&
            props.data.data_analytic.by_product &&
            props.data.data_analytic.by_product.lst_product_revenue_30d &&
            props.data.data_analytic.by_product.lst_product_revenue_30d.length > 0
          "
            class="statistic-item__subtitle"
        >Top sản phẩm doanh số cao nhất 365 ngày qua
        </div>
      </div>
    </div>
    <div class="products-grid">
      <ProductItem
          v-for="product in props.data.data_analytic.by_product.lst_product_revenue_30d.slice(0, isHideContent ? 6 : 12)"
          :key="product.product_base_id"
          :product-item="product"
          :product="product"
          :is-hide-content="isHideContent"
      />
      <ChartMask v-if="isHideContent" :subtitle="!props.isHide ? 'Nâng cấp để xem chi tiết' :'Bạn cần mở khoá để xem số liệu đầy đủ'" :ok-button="!props.isHideContent ? 'Nâng cấp ngay' :'Xem báo cáo'" :report="data"/>
    </div>
  </div>
</template>

<style lang="scss">
.highcharts-credits {
  display: none !important;
}

//.highcharts-container {
//  width: 100% !important;
//  height: 100% !important;
//}

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

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  position: relative;

  overflow: hidden;
}


#list-products {
  padding: 24px 24px 0 24px;
  border-radius: 8px;
  border: 1px solid #EEEBFF;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .line {
    border: 1px solid #EEEBFF;
  }

  .page {
    display: flex;
    justify-content: center;
    padding: 24px;


  }
}

.statistic-item__title {
  display: flex;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: #241E46;
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
          width: calc(20% - 13px);
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
  .products-grid {
    grid-template-columns: repeat(1, 1fr);

    .product-item{
      display: flex;
    }
  }
  #list-products{
    padding: 16px;
    border: none;
  }
}
</style>
<style lang="scss">
#list-products {
  .page {
    .ant-pagination {
      .ant-pagination-options {
        display: none;
      }

      li {
        background-color: #F5F5F5;
        align-items: center;

        a {
          text-align: center;
          font-size: 16px;
        }
      }

      .ant-pagination-item-active {
        background-color: #E85912;

        a {
          color: #FFF;
        }

      }
    }

    .ant-input-search {
      .ant-input-group {
        .ant-input-group-addon {
          .ant-btn {
            background-color: #FFF;
          }
        }
      }
    }
  }
}
</style>
