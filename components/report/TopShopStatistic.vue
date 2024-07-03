<script setup>
import { computed, defineProps} from 'vue';
import PieChart from "~/components/report/PieChart.vue";
import {getUrlImageOption, goToUrl} from "~/helpers/utils.js";

const platformNames = {
  1: "Shopee",
  2: "Lazada",
  3: "Tiki",
  4: "Sendo",
};

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

const formatNumber = (value = "") => value.toLocaleString("vi-VN");

const isHideContent = computed(() => props.isFreeUser);
const isClient = computed(() => !import.meta.env.SSR);
const reportType = computed(() => props.data?.report_type);
</script>

<template>
  <div
    v-if="
      props.data.data_analytic.by_shop &&
      props.data.data_analytic.by_shop.lst_top_shop &&
      props.data.data_analytic.by_shop.lst_top_shop.length > 1
    "
    id="top-shop"
    class="border statistic-block mb-6"
  >
    <div class="statistic-item__title">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
      </svg>
      <div>
        <div class="statistic-item__title">Shop hàng đầu</div>
      </div>
    </div>
    <div class="pie_chart">
      <div
        v-if="props.data.data_analytic.by_shop.lst_top_shop.length > 1"
        class="pie_chart_item"
      >
        <PieChart
          title="Thống kê Top Shop"
          subtitle="trong 12 tháng theo doanh số"
          :is-hide-content="isHideContent"
          :series="[
            {
              name: 'Doanh thu',
              data: props.data.data_analytic.by_shop.lst_top_shop.map(
                ({ name, revenue, ratio_revenue, platform_id } = {}) => {
                  return {
                    name: name + ' - ' + platformNames[platform_id],
                    y: revenue || ratio_revenue,
                    categoryName: 'Shop',
                  };
                }
              ),
            },
          ]"
        />
      </div>
      <div
        v-if="
          (props.data.data_analytic.by_shop.ratio.mall?.revenue > 0 &&
          props.data.data_analytic.by_shop.ratio.normal?.revenue) ||
          (props.data.data_analytic.by_shop.ratio.mall?.ratio_revenue > 0 &&
          props.data.data_analytic.by_shop.ratio.normal?.ratio_revenue)
        "
        class="pie_chart_item"
      >
        <PieChart
          title="Tỉ trọng doanh số"
          subtitle="Shop Mall và Shop thường"
          :is-hide-content="isHideContent"
          :series="[
            {
              name: 'Sản phẩm đã bán',
              data: [
                {
                  name: 'Shop chính hãng',
                  y: props.data.data_analytic.by_shop.ratio.mall?.revenue || props.data.data_analytic.by_shop.ratio.mall?.ratio_revenue,
                  color: '#D82618',
                },
                {
                  name: 'Shop thường',
                  y: props.data.data_analytic.by_shop.ratio.normal?.revenue || props.data.data_analytic.by_shop.ratio.normal?.ratio_revenue,
                  color: '#838EA5',
                },
              ],
            },
          ]"
        />
      </div>
    </div>
    <div class="line"></div>
    <div
      v-if="
        props.data.data_analytic.by_shop &&
        props.data.data_analytic.by_shop.lst_shop &&
        props.data.data_analytic.by_shop.lst_shop.length > 1
      "
      class="list-shop-block mb-8"
    >
      <div class="list-shop-description text-center my-6">
        <template v-if="isClient && reportType === 'report_product_line'">
          Các shop phổ biến theo từ khoá {{ props.data.name }}
        </template>
        <template v-else>
          Các shop phổ biến trong nhóm hàng {{ props.data.name }}
        </template>
      </div>
      <div class="list-shop">
        <div
          v-for="shop in props.data.data_analytic.by_shop.lst_shop
            .filter((shop) => shop.url_image && shop.url_image.length > 0)
            .slice(0, 12)"
          :key="shop.shop_base_id"
          class="shop-item"
        >
          <div class="shop-img">
            <div
              class="cursor-pointer"
              @click="goToUrl(getUrlAnalyticShop(shop.url_shop), '_blank')"
            >
              <img :src="getUrlImageOption(shop.url_image, 'thumbnail')"/>
            </div>
          </div>
          <div
            class="shop-name cursor-pointer"
            @click="goToUrl(shop.url_shop, '_blank')"
          >
            {{ shop.name }}
          </div>
        </div>
      </div>
    </div>
    <InsightBlock
      v-if="
        props.data.data_analytic.by_shop.ratio.mall &&
        props.data.data_analytic.by_shop.ratio.normal
      "
    >
      <li>
        Doanh thu của {{ props.data.name }} đến từ
        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{ formatNumber(props.data.data_analytic.by_shop.ratio.mall.shop) }}
          </span>
        </BlurContent>
        shop mall chiếm
        {{
          Number(
              props.data.data_analytic.by_shop.ratio.mall.ratio_revenue * 100
          ).toFixed(1)
        }}% và hơn
        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{ formatNumber(props.data.data_analytic.by_shop.ratio.normal.shop) }}
          </span>
        </BlurContent>
        shop thường chiếm
        {{
          Number(
              props.data.data_analytic.by_shop.ratio.normal.ratio_revenue * 100
          ).toFixed(1)
        }}% doanh số. Báo cáo về {{ data.name }} của 10 shop bán chạy hàng đầu,
        Shop
        <span class="text-bold">{{
            props.data.data_analytic.by_shop.lst_top_shop[0].name
          }}</span>
        có tỉ trọng doanh thu cao nhất chiếm

        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{
              Number(
                  props.data.data_analytic.by_shop.lst_top_shop[0].ratio_revenue * 100
              ).toFixed(2)
            }}
          </span>
        </BlurContent>
        % doanh số. Tiếp theo đó là các shop
        <template
          v-if="
            props.data.data_analytic &&
            props.data.data_analytic.by_shop.lst_top_shop &&
            props.data.data_analytic.by_shop.lst_top_shop.length >= 2
          "
        >
          <span class="text-bold">{{
              props.data.data_analytic.by_shop.lst_top_shop[1].name
            }}</span
          >,
        </template>
        <template
          v-if="
            props.data.data_analytic &&
            props.data.data_analytic.by_shop.lst_top_shop &&
            props.data.data_analytic.by_shop.lst_top_shop.length >= 3
          "
        >
          <span class="text-bold">{{
              props.data.data_analytic.by_shop.lst_top_shop[2].name
            }}</span>
          tương ứng thị phần doanh thu là
          <BlurContent :is-hide-content="isHideContent">
            <span>
              {{
                Number(
                    props.data.data_analytic.by_shop.lst_top_shop[1].ratio_revenue * 100
                ).toFixed(2)
              }}
            </span>
          </BlurContent>
          %
        </template>
        và
        <template
          v-if="
            props.data.data_analytic &&
            props.data.data_analytic.by_shop.lst_top_shop &&
            props.data.data_analytic.by_shop.lst_top_shop.length >= 3
          "
        >
          <BlurContent :is-hide-content="isHideContent">
            <span>
              {{
                Number(
                    props.data.data_analytic.by_shop.lst_top_shop[2].ratio_revenue * 100
                ).toFixed(2)
              }}
            </span>
          </BlurContent>
        </template>
        %.
      </li>
    </InsightBlock>
  </div>
</template>

<style scoped lang="scss">
.statistic-block {
  border-radius: 16px;
  padding: 24px;

  background: #fff;

  .list-shop-block {
    .list-shop-description {
      font-family: 'Inter', sans-serif;

      font-size: 20px;
      font-weight: 700;
      line-height: 28px;
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
  }
}
.statistic-item__title{
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: #241E46;
  gap: 16px;
}

.pie_chart {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: stretch;
  margin-top: 16px;
  margin-bottom: 16px;

  .pie_chart_item {
    height: 100%;
  }
}

#top-shop{
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #EEEBFF;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.line{
  border: 1px solid #EEEBFF;
}

.list-shop-description{
  text-align: center;
}

.list-shop-block{
  display: flex;
  flex-direction: column;
  gap: 40px;
}

@media (min-width: 768px) {
  .statistic-block {
    .list-shop-block {
      .list-shop {
        justify-content: center;

        .shop-item {
          width: calc(100% / 4 - 32px);
        }
      }
    }
  }
}
</style>
