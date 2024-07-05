<script setup>
import {computed, defineProps} from 'vue';
import PieChart from "~/components/report/PieChart.vue";
import {getUrlImageOption, goToUrl} from "~/helpers/utils.js";
import {getPlatformById} from "~/helpers/PermissionPlatformHelper.js";

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
  isHideContent: {
    type: Boolean,
    default: false,
  },
});

const formatNumber = (value = "") => value.toLocaleString("vi-VN");

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
        <a-table
          :columns="[
            {
              title: 'Loại shop',
              dataIndex: 'shop_type',
              key: 'shop_type',
              align: 'center',
              width: 180,
              slots: {customRender: 'shop_type'}
            },
            {
              title: 'Số lượng shop',
              dataIndex: 'shop_count',
              key: 'shop_count',
              align: 'right',
              width: 180,
              slots: {customRender: 'shop_count'}
            },
          ]"
          :pagination="false"
          :data-source="[
            {
              shop_type: 'Shop Mall',
              shop_count: props.data.data_analytic.by_shop.ratio.mall.shop
            },
            {
              shop_type: 'Shop thường',
              shop_count: props.data.data_analytic.by_shop.ratio.normal.shop
            }
          ]"
        >
          <template #shop_count="{text}">
            <BlurContent :is-blurred="isHideContent">
              {{ text }}
            </BlurContent>
          </template>
        </a-table>
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
            :is-hide-content="props.isHideContent"
            :series="[
            {
              name: 'Sản phẩm đã bán',
              data: [
                {
                  name: 'Shop Mall',
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
    <div style="width: 100%;max-width: 800px; margin: auto; position: relative;">
      <a-table
          :columns="[
        {
          title: 'STT',
          dataIndex: 'stt',
          key: 'stt',
          width: 100,
          align: 'center',
        },
        {
          title: 'Kênh bán',
          dataIndex: 'platform',
          key: 'platform',
          align: 'center',
          slots: {customRender: 'platform'}
        },
        {
          title: 'Tên shop',
          dataIndex: 'shop',
          key: 'shop',
          align: 'center',
          width: '50%',
          slots: {customRender: 'shop'}
        },
      ]"
          :pagination="false"
          :data-source="props.data.data_analytic.by_shop.lst_shop.slice(10).map((shop, index) => ({...shop, stt: index + 1}))"
      >
        <template #platform="{record}">
          <div class="platform-column">
            <img :src="getPlatformById(record.platform_id).urlLogo" class="platform-icon"/>
            <!--          <span>{{ getPlatformById(record.platform_id).name }}</span>-->
          </div>
        </template>
        <template #shop="{record}">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div
                style="width: 32px; height: 32px;"
                @click="goToUrl(getUrlAnalyticShop(record.url_shop), '_blank')"
            >
              <img :src="getUrlImageOption(record.url_image, 'thumbnail')" style="width: 100%; background-size: cover;">
            </div>
            <div @click="goToUrl(record.url_shop, '_blank')" style="cursor: pointer">
              {{ record.name }}
              <img v-if="record.official_type === 1" src="/icons/mall_flag.svg"
                   style="width: 30px; transform: translateY(2px); margin-left: 4px;"/>
            </div>
          </div>
        </template>
      </a-table>
      <ChartMask v-if="props.isHideContent"/>
    </div>
    <InsightBlock
        v-if="
        props.data.data_analytic.by_shop.ratio.mall &&
        props.data.data_analytic.by_shop.ratio.normal
      "
    >
      <li>
        Doanh thu của {{ props.data.name }} đến từ
        <BlurContent :is-hide-content="props.isHideContent">
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
        <BlurContent :is-hide-content="props.isHideContent">
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

        <BlurContent :is-hide-content="props.isHideContent">
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
          <BlurContent :is-hide-content="props.isHideContent">
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
          <BlurContent :is-hide-content="props.isHideContent">
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

<style lang="scss">
#top-shop {
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

.statistic-item__title {
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

  .pie_chart_item {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}

#top-shop {
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #EEEBFF;
  display: flex;
  flex-direction: column;
  gap: 16px;
}


.platform-column {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  color: #241E46;

  .platform-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    margin-right: 10px;
  }
}

.line {
  border: 1px solid #EEEBFF;
}

.list-shop-description {
  text-align: center;
}

.list-shop-block {
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
