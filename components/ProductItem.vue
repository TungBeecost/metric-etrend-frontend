<script setup lang="ts">
import {formatCurrency, formatNumberHuman} from "~/helpers/FormatHelper";
import moment from "moment/moment";
import {openProductUrl, openShopProductUrl} from "~/helpers/DataNormalize";
import {getPlatformById} from "~/helpers/PermissionPlatformHelper";
import {getUrlImageThumbnail} from "~/services/ecommerce/EcomUtils";


const formatDate = (value: string | Date, format: string, inputFormat: string = "YYYYMMDD"): string => {
  return moment(value, inputFormat).format(format);
}

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
  isHideContent: {
    type: Boolean,
    default: () => true
  },
  loading: {
    type: Boolean,
    default: () => true
  }
});

const getPlatformIdFromProductBaseId = (productBaseId: string) => {
  return parseInt(productBaseId.split('__')[0], 10);
}

const displayPrice = computed(() => {
  if (props.product.price_min === null && props.product.price_max === null) {
    return formatCurrency(props.product.price);
  }
  return `${formatCurrency(props.product.price_min)} - ${formatCurrency(props.product.price_max)}`;
});

const $t = (text: string) => text;
const timestampToDate = (timestamp: number, format: string = 'DD/MM/YYYY') => {
  return formatDate(new Date(timestamp), format)
};
</script>

<template>
  <div class="product-item" :class="{'hide-content': isHideContent}">
    <div class="product-thumbnail">
      <img
          v-if="props.product.url_thumbnail"
          :src="getUrlImageThumbnail(props.product.url_thumbnail)"
          :alt="props.product.product_name"
          @click="openProductUrl(props.product)"
      />
      <div v-else class="product-thumbnail__no-image"/>
    </div>
    <div class="product-info">
      <div class="product-main-info">
        <div class="title_icon" style="display: flex">
          <div class="product-name line-clamp__2" @click="openProductUrl(props.product)">
            {{ props.product.product_name }}
          </div>
          <a-tooltip>
            <template #title>
              <div>
                <div>
                  {{ props.product.product_name }}
                </div>
                <hr style="border: 1px solid #fff; margin: 4px 0"/>
                <div>
                  {{ $t('Ngày cập nhật') }}: {{ timestampToDate(props.product.price_updated_at) }}
                </div>
              </div>
            </template>
            <div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7 0.5C5.71442 0.5 4.45772 0.881218 3.3888 1.59545C2.31988 2.30968 1.48676 3.32484 0.994786 4.51256C0.502816 5.70028 0.374095 7.00721 0.624899 8.26809C0.875703 9.52896 1.49477 10.6872 2.40381 11.5962C3.31285 12.5052 4.47104 13.1243 5.73192 13.3751C6.99279 13.6259 8.29973 13.4972 9.48744 13.0052C10.6752 12.5132 11.6903 11.6801 12.4046 10.6112C13.1188 9.54229 13.5 8.28558 13.5 7C13.4982 5.27665 12.8128 3.62441 11.5942 2.40582C10.3756 1.18722 8.72335 0.50182 7 0.5ZM6.75 3.5C6.89834 3.5 7.04334 3.54399 7.16668 3.6264C7.29002 3.70881 7.38615 3.82594 7.44291 3.96299C7.49968 4.10003 7.51453 4.25083 7.48559 4.39632C7.45665 4.5418 7.38522 4.67544 7.28033 4.78033C7.17544 4.88522 7.04181 4.95665 6.89632 4.98559C6.75083 5.01453 6.60003 4.99968 6.46299 4.94291C6.32595 4.88614 6.20881 4.79001 6.1264 4.66668C6.04399 4.54334 6 4.39834 6 4.25C6 4.05109 6.07902 3.86032 6.21967 3.71967C6.36032 3.57902 6.55109 3.5 6.75 3.5ZM7.5 10.5C7.23479 10.5 6.98043 10.3946 6.7929 10.2071C6.60536 10.0196 6.5 9.76522 6.5 9.5V7C6.36739 7 6.24022 6.94732 6.14645 6.85355C6.05268 6.75979 6 6.63261 6 6.5C6 6.36739 6.05268 6.24021 6.14645 6.14645C6.24022 6.05268 6.36739 6 6.5 6C6.76522 6 7.01957 6.10536 7.20711 6.29289C7.39465 6.48043 7.5 6.73478 7.5 7V9.5C7.63261 9.5 7.75979 9.55268 7.85356 9.64645C7.94732 9.74021 8 9.86739 8 10C8 10.1326 7.94732 10.2598 7.85356 10.3536C7.75979 10.4473 7.63261 10.5 7.5 10.5Z"
                    fill="#9D97BF"/>
              </svg>
            </div>
          </a-tooltip>
        </div>
        <div class="product-price-rating">
          <div class="product-price">
            {{ formatCurrency(props.product.price) || '0₫' }}
          </div>
          <div class="product-rating">
            {{ parseFloat(props.product.rating_avg).toFixed(1) }}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M2.83337 9.71528C2.41221 9.90087 1.92034 9.7099 1.73475 9.28875C1.67663 9.15686 1.65371 9.01215 1.66823 8.86876L1.90675 6.51303L0.329119 4.7474C0.0224672 4.4042 0.0520912 3.8774 0.395286 3.57075C0.502759 3.47472 0.633301 3.4082 0.774161 3.3777L3.0883 2.87658L4.28 0.830557C4.51164 0.432861 5.02181 0.298243 5.41951 0.52988C5.54405 0.602418 5.64765 0.706017 5.72019 0.830557L6.91189 2.87658L9.22603 3.3777C9.67584 3.4751 9.96152 3.91871 9.86412 4.36852C9.83361 4.50938 9.7671 4.63992 9.67107 4.7474L8.09344 6.51303L8.33196 8.86876C8.37832 9.32666 8.0447 9.73544 7.58681 9.7818C7.44342 9.79632 7.29871 9.7734 7.16682 9.71528L5.00009 8.76048L2.83337 9.71528Z"
                    fill="#FDB022"/>
            </svg>

            <span class="product-rating-count">
              {{ formatNumberHuman(props.product.rating_count) }} {{ $t('đánh giá') }}
            </span>
          </div>
        </div>
        <div class="product-info-item shop-info">
          <div class="shop-icon">
            <img
                :src="getPlatformById(getPlatformIdFromProductBaseId(props.product.product_base_id))?.urlLogo"
                class="img-platform"
                alt=""
            />
          </div>
          <span class="shop-name" @click="openShopProductUrl(props.product)">
            {{ product.shop_platform_name }}
          </span>
        </div>
        <div v-if="product.platform_created_at" class="product-info-item">
          {{ $t('Ngày tạo') }}: {{ timestampToDate(product.platform_created_at) }}
        </div>
      </div>
      <div class="product-statistic-info">
        <div class="product-statistic-info-item">
          <div class="product-statistic-info-item-icon">
            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1223_35821)">
                <path
                    d="M2.64625 11.6462C2.55266 11.5526 2.50006 11.4256 2.5 11.2931V5.5H8.29313C8.42556 5.50006 8.55255 5.55266 8.64625 5.64625L14.8538 11.8538C14.9474 11.9475 15.0001 12.0746 15.0001 12.2072C15.0001 12.3397 14.9474 12.4669 14.8538 12.5606L9.5625 17.8538C9.46874 17.9474 9.34161 18.0001 9.20906 18.0001C9.07651 18.0001 8.94938 17.9474 8.85563 17.8538L2.64625 11.6462Z"
                    stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M5.25 8.875C5.59518 8.875 5.875 8.59518 5.875 8.25C5.875 7.90482 5.59518 7.625 5.25 7.625C4.90482 7.625 4.625 7.90482 4.625 8.25C4.625 8.59518 4.90482 8.875 5.25 8.875Z"
                    fill="#716B95"/>
              </g>
              <defs>
                <clipPath id="clip0_1223_35821">
                  <rect width="16" height="16" fill="white" transform="translate(0 3)"/>
                </clipPath>
              </defs>
            </svg>
          </div>

          <div>
            <span class="statistic-name">{{ $t('Giá trong phân loại hàng') }}: </span>
            <span class="value">{{ displayPrice }}</span>
          </div>
        </div>
        <div class="product-statistic-info-item">
          <div class="product-statistic-info-item-icon">
            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1223_35846)">
                <path
                    d="M8 13C9.10457 13 10 12.1046 10 11C10 9.89543 9.10457 9 8 9C6.89543 9 6 9.89543 6 11C6 12.1046 6.89543 13 8 13Z"
                    stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 7H1V15H15V7Z" stroke="#716B95" stroke-width="1.3" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M15 9.5C14.3754 9.39414 13.7992 9.09663 13.3513 8.64869C12.9034 8.20075 12.6059 7.62457 12.5 7"
                      stroke="#716B95"
                      stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M12.5 15C12.6059 14.3754 12.9034 13.7992 13.3513 13.3513C13.7992 12.9034 14.3754 12.6059 15 12.5"
                    stroke="#716B95"
                    stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 12.5C1.62457 12.6059 2.20075 12.9034 2.64869 13.3513C3.09663 13.7992 3.39414 14.3754 3.5 15"
                      stroke="#716B95"
                      stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.5 7C3.39414 7.62457 3.09663 8.20075 2.64869 8.64869C2.20075 9.09663 1.62457 9.39414 1 9.5"
                      stroke="#716B95"
                      stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1223_35846">
                  <rect width="16" height="16" fill="white" transform="translate(0 3)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>
            <span class="statistic-name">{{ $t('Doanh số đã bán') }}:</span> <span
              class="value">{{ formatCurrency(product.revenue) }}</span>
          </div>
        </div>
        <div class="product-statistic-info-item">
          <div class="product-statistic-info-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
                 style="transform: translateY(3px)">
              <g clip-path="url(#clip0_4446_35033)">
                <path d="M2.0437 4.80762L7.99995 8.06762L13.9562 4.80762" stroke="#716B95" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M8 8.06836V14.4984" stroke="#716B95" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M13.74 11.4273L8.24 14.4386C8.16641 14.4789 8.08388 14.5 8 14.5C7.91612 14.5 7.83359 14.4789 7.76 14.4386L2.26 11.4273C2.18147 11.3844 2.11591 11.3211 2.07017 11.2441C2.02444 11.1672 2.0002 11.0794 2 10.9898V5.01109C2.0002 4.92157 2.02444 4.83375 2.07017 4.75679C2.11591 4.67983 2.18147 4.61656 2.26 4.57359L7.76 1.56234C7.83359 1.52208 7.91612 1.50098 8 1.50098C8.08388 1.50098 8.16641 1.52208 8.24 1.56234L13.74 4.57359C13.8185 4.61656 13.8841 4.67983 13.9298 4.75679C13.9756 4.83375 13.9998 4.92157 14 5.01109V10.9886C14 11.0783 13.9759 11.1664 13.9301 11.2436C13.8844 11.3208 13.8187 11.3843 13.74 11.4273Z"
                    stroke="#716B95" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.09741 3.01953L10.9999 6.25016V9.50016" stroke="#716B95" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_4446_35033">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>
            <span class="statistic-name">{{ $t('Số sản phẩm đã bán') }}:</span> <span
              class="value">{{ formatNumberHuman(props.product.order_count) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-item {
  border: 1px solid #EEEBFF;
  border-radius: 16px;

  position: relative;

  &.hide-content {
    filter: blur(6px);
  }

  .product-mall-flag {
    position: absolute;
    left: -6px;
    top: 10px;

    z-index: 10;
  }

  .product-thumbnail {
    width: 100%;
    position: relative;

    cursor: pointer;

    border-bottom: 1px solid #EEEBFF;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      border-radius: 16px;
    }

    .product-thumbnail__no-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 16px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }


    .product-history-buttons {
      display: flex;
      gap: 8px;

      background: #fff;

      padding: 4px 8px;

      border-radius: 999px;

      position: absolute;
      left: 30%;
      bottom: 10px;

      z-index: 10;

      box-shadow: 4px 4px 40px rgba(17, 17, 17, 0.35);


      .price-history-btn,
      .sale-history-btn,
      .info-history-btn {
        width: 24px;
        height: 24px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 400px;

        cursor: pointer;

        &.disabled {
          filter: grayscale(1);
        }
      }

      .price-history-btn {
        background-color: #EAF8EE;

        &:hover {
          box-shadow: 0 0 0 1px #D5F0D9;
        }
      }

      .sale-history-btn {
        background-color: #FDEEE7;

        &:hover {
          box-shadow: 0 0 0 1px #FBD3C9;
        }
      }

      .info-history-btn {
        background-color: #E8F1FE;

        &:hover {
          box-shadow: 0 0 0 1px #C9DFFB;
        }
      }

    }
  }

  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 0 16px;

    .product-main-info {
      color: #716B95;

      border-bottom: 1px solid #EEEBFF;

      padding: 16px 0 8px;

      .product-name {
        color: var(--Dark-blue-dark-blue-8, #241E46);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */

        margin-bottom: 8px;

        cursor: pointer;

        word-wrap: break-word;
        word-break: break-word;

        &:hover {
          text-decoration: underline;
        }
      }

      .product-price-rating {
        font-size: 10px;
        line-height: 12px;

        margin-bottom: 8px;

        .product-price {
          color: var(--Dark-blue-dark-blue-8, #241E46);
          font-family: Inter, sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 22px; /* 157.143% */

          margin-bottom: 8px;
        }

        .product-rating {
          display: flex;
          align-items: center;

          color: var(--Dark-blue-dark-blue-5, #716B95);
          font-size: 12px;
          font-weight: 400;
          line-height: 14px;
          gap: 4px;

          svg {
            transform: translateY(-1px);
          }

          .product-rating-count {
            color: var(--Dark-blue-dark-blue-5, #716B95);
            font-size: 12px;
            font-weight: 400;
            line-height: 14px;
          }
        }
      }

      .product-info-item {
        color: var(--Dark-blue-dark-blue-5, #716B95);
        font-family: 'Inter', sans-serif;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px; /* 140% */
      }

      .shop-info {
        display: flex;
        gap: 4px;

        margin-bottom: 8px;

        .shop-name {
          cursor: pointer;

          color: var(--dark-blue-dark-blue-5, #716B95);

          font-size: 10px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 14px;


          &:hover {
            text-decoration: underline;
          }
        }


        .shop-icon {
          display: flex;
          justify-content: center;
          align-items: center;


          .img-platform {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }
        }
      }
    }

    .product-statistic-info {
      display: flex;
      flex-direction: column;

      gap: 8px;

      padding: 16px 0;

      .product-statistic-info-item {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;

        display: flex;
        gap: 4px;

        .product-statistic-info-item-icon {
        }

        .statistic-name {
          color: #716B95;
        }

        .value {
          color: #E85912;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .product-thumbnail {
      height: 100%;
      width: 120px;
      flex: 0.3;
      padding: 16px;

      .product-history-buttons {
        bottom: 10px;
        transition: bottom 0.3s ease-in-out;

        left: 10%;
      }
    }

    .product-info {
      padding: 0 8px;
      flex: 0.7;

      .product-main-info {
        padding: 8px 0;

        .product-name {
          font-size: 14px;
          line-height: 22px;
        }

        .product-price-rating {
          font-size: 8px;
          line-height: 10px;


          .product-price {
            font-size: 12px;
            line-height: 18px;
          }
        }

        .product-info-item {
          font-size: 8px;
          line-height: 10px;
        }

        .shop-info {
          font-size: 8px;
          line-height: 10px;
        }
      }

      .product-statistic-info {
        padding: 8px 0;

        .product-statistic-info-item {
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .product-price-rating {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    .product-rating {
      font-size: 10px;
    }

    span {
      font-size: 10px;
    }
  }

  .product-info-item {
    display: none;
  }
}


</style>
