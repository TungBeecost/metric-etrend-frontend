<template>
  <div v-if="props.productItem" class="flex flex-col product-item">
    <div class="relative flex flex-grow-0 justify-between items-start px-2 product-img">
      <img
          v-if="props.productItem.url_thumbnail"
          :src="getUrlImageOption(props.productItem.url_thumbnail, 'thumbnail')"
          class="absolute object-cover"
          onerror="this.style.display='none'"
          style="border-radius: 8px; width: calc(100% - 8px); height: calc(100% - 8px); top: 4px; left: 4px;"
      />
    </div>
    <div class="border-t border-gray-200 pt-0.5 px-1 flex-grow-0">
      <div
          class="line-clamp-2"
          style="word-break: break-word; color: #2e2e2e"
          :style="{ height: `${props.productNameLines * 14}px` }"
      >
        <div class="flex">
          <p
              class="product_name"
              style="font-size: 10px; line-height: 14px"
              :class="`line-clamp-${props.productNameLines}`"
          >
            <a :href="getUrlProductDirect(props.productItem.product_base_id, props.productItem.product_name)">
              <span v-if="props.productItem.official_type === 1" class="icon-mall-wrap">
                <mall-flag class="icon-mall inline" width="24" height="12" />
              </span>
              <span>{{ props.productItem.product_name }}</span>
            </a>
          </p>
        </div>
      </div>
      <div
          class="flex justify-between text-gray-400 flex-col"
          style="font-size: 8px"
      >
        <span class="text-black font-medium">{{ formatCurrency(props.productItem?.price) }}</span>
      </div>
      <div
          v-if="props.productItem.shop_platform_name"
          class="flex justify-between items-center text-gray-400"
          style="font-size: 10px"
      >
        <div class="flex items-center">
          <template v-if="props.productItem.shop_platform_name">
            <img v-if="platform_logo_url" :src="platform_logo_url" class="img-platform mr-1" />
            <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- SVG paths -->
            </svg>
            <a
                class="cursor-pointer hover:text-primary-900 line-clamp-2"
                :class="{ 'cursor-pointer hover:text-primary-900 line-clamp-2': props.productItem.shop_url }"
                :href="props.productItem.shop_url"
                style="font-size: 8px; text-overflow: ellipsis; overflow: hidden"
                :style="{ maxWidth: '60px' }"
            >
              {{ props.productItem.shop_platform_name }}
            </a>
          </template>
        </div>
      </div>
    </div>
    <div class="flex-grow pb-0.5 px-1 flex-grow-1">
      <div v-if="props.productItem.revenue" class="flex justify-start items-start product-info-item">
        <div class="mb-0">
          Doanh số:
          <span class="bold-text">{{ formatCurrency(props.productItem.revenue) }}</span>
        </div>
      </div>
      <div v-if="props.productItem.order_count" class="flex justify-start items-start product-info-item mb-0.5">
        <div>
          Đã bán:
          <span class="text-primary-500">{{ formatNumber(props.productItem.order_count) }}</span>
        </div>
      </div>
      <div v-if="props.productItem.review_count_custom" class="flex justify-start items-start product-info-item">
        <div class="mb-0">
          Lượt đánh giá:
          <span class="text-primary-500">{{ formatNumber(props.productItem.review_count_custom) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getUrlImageOption } from '~/helpers/utils.js';
import {formatCurrency, formatNumber} from '~/helpers/FormatHelper.js';

// Utility Functions
const toSeoName = (name, defaultValue = "product", maxLength = 100) => {
  if (!name) return encodeURIComponent(defaultValue);

  name = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9A-Za-z-\s])/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace("%", "")
      .replace("+", "")
      .replace(/\(+/g, "")
      .replace(/\)+/g, "");

  return encodeURIComponent(name.length > maxLength ? name.substring(0, maxLength) : name);
};

const extractProductBaseId = (product_base_id) => {
  if (!product_base_id || product_base_id.length === 0) return { platform_id: null, product_id: null, product_seller_id: null };

  const splits = product_base_id.split("__");
  const platform_id = splits[0];
  const product_id = splits[1];
  const product_seller_id = splits.length >= 3 ? splits[2] : null;

  return { platform_id: String(platform_id), product_id, product_seller_id };
};

const getUrlProductDirect = (productBaseId, productName = "san-pham") => {
  const { platform_id, product_id, product_seller_id } = extractProductBaseId(productBaseId);
  let urlDirect = null;

  switch (platform_id) {
    case "1":
      urlDirect = `https://shopee.vn/${toSeoName(productName)}-i.${product_seller_id}.${product_id}`;
      break;
    case "2":
      urlDirect = `https://lazada.vn/${toSeoName(productName)}-i${product_id}${product_seller_id ? `-s${product_seller_id}` : ""}.html`;
      break;
    case "3":
      urlDirect = `https://tiki.vn/${toSeoName(productName)}-p${product_id}.html?spid=${product_seller_id}`;
      break;
    case "4":
      urlDirect = `https://sendo.vn/${toSeoName(productName)}-${product_id}.html`;
      break;
    case "5":
      urlDirect = `https://detail.1688.com/offer/${product_id}.html`;
      break;
    case "6":
      urlDirect = `https://item.taobao.com/item.htm?id=${product_id}`;
      break;
    case "7":
      urlDirect = `https://detail.tmall.com/item.htm?id=${product_id}`;
      break;
    default:
      break;
  }

  return urlDirect;
};

// Props
const props = defineProps({
  productItem: {
    required: true,
    type: Object
  },
  productNameLines: {
    type: Number,
    default: 2
  }
});

// Reactive state
const isMobile = ref(false);

// Lifecycle Hooks
onMounted(() => {
  isMobile.value = window.innerWidth < 768;
});
</script>



<style lang="scss" scoped>
.product-item {
  border: 1px solid #F3F3F3;
  border-radius: 12px;

  .product-img {
    padding-top: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .product_name {
    font-weight: 500;
    margin-bottom: 0;

    &:hover {
      cursor: pointer;
    }

    a {
      color: #000;
    }

    &.line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .img-platform {
    border-radius: 100%;
    width: 12px;
    height: 12px;
  }

  .product-info-item {
    font-weight: 400;
    font-size: 8px;
    line-height: 12px;

    color: #535353;

    span.bold-text {
      font-weight: 500;

      color: #e85912;
    }

    span:not(.bold-text) {
      color: #000;
    }

    p {
      margin-bottom: 12px;
    }

    .product-redirect {
      a {
        font-weight: 400;
        font-size: 10px;
        line-height: 14px;

        color: #4961f6;
      }
    }
  }
}
</style>
