<script setup>
import {defineProps, ref} from 'vue';
import PieChart from "~/components/report/PieChart.vue";
import {formatSortTextCurrency, getUrlImageOption, goToUrl} from "~/helpers/utils.js";
import {getPlatformById} from "~/helpers/PermissionPlatformHelper.js";
import {useCurrentUser} from "~/stores/current-user.js";

const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isHideContent: {
    type: Boolean,
    default: false,
  },
  isHide:{
    type: Boolean,
    default: true,
  },
});

const isHideContentBasic = ref(true);
if (userInfo.current_plan?.plan_code === 'e_pro' && !props.isHide) {
  isHideContentBasic.value = false;
}
const formatNumber = (value = "") => value.toLocaleString("vi-VN");
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
        <div class="statistic-item__title">Gian hàng hàng đầu</div>
        <div style="font-size: 14px; color: #716B95">Top gian hàng trong 365 ngày qua</div>
      </div>
    </div>
    <div class="pie_chart">
      <div
          v-if="props.data.data_analytic.by_shop.lst_top_shop.length > 1"
          class="pie_chart_item"
          style="flex-direction: column; gap: 24px; justify-content: flex-start"
      >
        <div style="font-size: 16px; font-weight: bold; line-height: 22px; text-align: center; color: #241E46">Số lượng gian hàng</div>
        <div>
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
              <BlurContent :is-hide-content="isHideContentBasic">
                {{ text }}
              </BlurContent>
            </template>
          </a-table>
        </div>
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
            title="Tỷ trọng doanh số theo loại gian hàng"
            subtitle="Shop Mall và Shop thường"
            :is-hide-content="isHideContentBasic"
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
      <ChartMask v-if="isHideContentBasic" :subtitle="!props.isHide ? 'Nâng cấp để xem chi tiết' :'Bạn cần mở khoá để xem số liệu đầy đủ'" :ok-button="!props.isHide ? 'Nâng cấp ngay' :'Xem báo cáo'" :report="data"/>
    </div>
    <InsightBlock
        v-if="
        props.data.data_analytic.by_shop.ratio.mall &&
        props.data.data_analytic.by_shop.ratio.normal
      "
    >
      <li>
        Thống kê về loại gian hàng, thị trường có
        <BlurContent :is-hide-content="isHideContentBasic">
          {{ formatNumber(props.data.data_analytic.by_shop.ratio.mall.shop) }}
        </BlurContent>
        shop Mall chiếm
        <BlurContent :is-hide-content="isHideContentBasic">
          {{
            Number(
                props.data.data_analytic.by_shop.ratio.mall.ratio_revenue * 100
            ).toFixed(1)
          }}%
        </BlurContent>
        thị phần doanh số với
        <BlurContent :is-hide-content="isHideContentBasic">
          {{ formatSortTextCurrency(props.data.data_analytic.by_shop.ratio.mall.revenue) }} đồng
        </BlurContent>
        và
        <BlurContent :is-hide-content="isHideContentBasic">
          {{ formatNumber(props.data.data_analytic.by_shop.ratio.normal.shop) }}
        </BlurContent>
        shop thường chiếm
        <BlurContent :is-hide-content="isHideContentBasic">
          {{
            Number(
                props.data.data_analytic.by_shop.ratio.normal.ratio_revenue * 100
            ).toFixed(1)
          }}%
        </BlurContent>
        doanh số tương ứng
        <BlurContent :is-hide-content="isHideContentBasic">
          {{ formatSortTextCurrency(props.data.data_analytic.by_shop.ratio.normal.revenue) }} đồng
        </BlurContent>.
      </li>
      <li>
        Trong top 10 gian hàng bán chạy, Shop
        <BlurContent :is-hide-content="isHideContentBasic">
          {{ props.data.data_analytic.by_shop.lst_top_shop[0].name }}
        </BlurContent>
        có tỷ trọng doanh số cao nhất, tiếp theo đó là
        <BlurContent :is-hide-content="isHideContentBasic">
          {{ props.data.data_analytic.by_shop.lst_top_shop[1].name }}
        </BlurContent>
        và
        <BlurContent :is-hide-content="isHideContentBasic">
          {{ props.data.data_analytic.by_shop.lst_top_shop[2].name }}
        </BlurContent>.
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
  padding-top: 16px;

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

@media (max-width: 768px) {
  .pie_chart {
    flex-direction: column;
  }
  #top-shop{
    padding: 16px;
    border: none;
  }
}
</style>
