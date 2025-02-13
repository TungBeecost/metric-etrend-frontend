<script setup lang="ts">
import {ALL_PLATFORM_BASE_OBJECT, PLATFORM_ID_OBJECT} from "~/constant/general/GeneralConstant";
import {formatSortTextCurrency} from "../helpers/utils";
import {computed} from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isHideContent: {
    type: Boolean,
    default: false
  },
});
interface RevenueItem {
  revenue: number;
}
type PlatformName = keyof typeof ALL_PLATFORM_BASE_OBJECT;

const diffRevenueLatestQuarterPercent = computed(() => {
  const dataAnalytic = props.data.data_analytic;
  if (!dataAnalytic || !dataAnalytic.by_overview) return NaN;
  const {lst_revenue_sale_monthly} = dataAnalytic.by_overview;
  const latestQuarter = lst_revenue_sale_monthly.slice(-3);
  const previousQuarter = lst_revenue_sale_monthly.slice(-6, -3);
  const revenueLatestQuarter = latestQuarter.reduce(
      (acc: number, item: RevenueItem) => acc + item.revenue,
      0
  );
  const revenuePreviousQuarter = previousQuarter.reduce(
      (acc: number, item: RevenueItem) => acc + item.revenue,
      0
  );
  const diff = revenueLatestQuarter - revenuePreviousQuarter;
  return parseFloat(((diff / revenuePreviousQuarter) * 100).toFixed(2));
});

// Create a reverse mapping from platform_id to platform name
const platformIdToNameMap: Record<number | string, PlatformName> = Object.fromEntries(
    Object.entries(PLATFORM_ID_OBJECT).map(([key, value]) => [value, key as PlatformName])
);

const platform_id = props.data.data_filter_report?.lst_shop_base_id[0]?.split('__')[0];
const platformName = platformIdToNameMap[platform_id];
const platformLogo = platformName ? ALL_PLATFORM_BASE_OBJECT[platformName]?.urlLogo : undefined;

const backgroundColor = computed(() => {
  if (isNaN(diffRevenueLatestQuarterPercent.value)) return '';
  return diffRevenueLatestQuarterPercent.value >= 0 ? 'background-color: #EAF8EE; color: #35A855;' : 'background-color: #FDEBE9; color: #EE3324;';
});
</script>

<template>
  <div class="top_shop_info">
    <img :src="props.data.url_thumbnail" alt="">
    <div class="top_shop_info_content">
      <div class="title">
        <img :src="platformLogo" alt="Platform Logo" v-if="platformLogo" style="width: 28px; height: 28px; border-radius: 8px;">
        <b style="font-weight: bold; font-size: 20px; line-height: 28px;">{{props.data.name}}</b>
        <img src="../public/icons/MallIcon.svg" alt="Mall Logo" v-if="props.data.data_analytic.by_shop.lst_top_shop[0].official_type === 0" style="width: 28px; height: 28px; border: none; border-radius: 0">
      </div>
      <div class="content_container">
        <div class="content_container_info">
          <div class="content_container_info_title">Số sản phẩm: </div>
          <div class="content_container_info_title">Tăng trưởng </div>
        </div>
        <div class="content_container_info">
          <div class="content_container_info_value">{{props.data.data_analytic?.by_overview.product}}</div>
          <div class="content_container_info_value">
            <div :style="[backgroundColor, {display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', height: '24px', padding: '0px 4px', textAlign: 'center', borderRadius: '4px' }]">
              <svg v-if="diffRevenueLatestQuarterPercent >= 0" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10.875 2.625L6.375 7.125L4.5 5.25L1.125 8.625" stroke="#35A855" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.875 5.625V2.625H7.875" stroke="#35A855" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10.875 9.375L6.375 4.875L4.5 6.75L1.125 3.375" stroke="#EE3324" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.875 6.375V9.375H7.875" stroke="#EE3324" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ !isNaN(diffRevenueLatestQuarterPercent) ? formatSortTextCurrency(Math.abs(diffRevenueLatestQuarterPercent)) : 'N/A' }}%
            </div>
            <span> so với quý gần </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top_shop_info{
  display: flex;
  padding: 24px;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  border-radius: 16px;
  background: var(--Neutral-neutral-1, #FFF);
  border: 1px solid var(--Dark-blue-dark-blue-2, #EEEBFF);

  img{
    width: 100px;
    height: 100px;
    border-radius: 16px;
    border: 1px solid var(--Dark-blue-dark-blue-2, #EEEBFF);
  }

  .top_shop_info_content{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex: 1 0 0;

    .title{
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .content_container{
      display: flex;
      align-items: flex-start;
      gap: 40px;
      .content_container_info{
        display: flex;
        flex-direction: column;
        gap: 8px;

        .content_container_info_title{
          color: var(--Dark-blue-dark-blue-6, #716B95);
          line-height: 22px;
        }

        .content_container_info_value{
          display: flex;
          gap: 4px;
        }
      }
    }
  }
}
</style>