<script setup lang="ts">
import {formatSortTextCurrency} from "~/helpers/utils";
import {computed} from "vue";
import dayjs from "dayjs";
import {formatCurrency} from "~/helpers/FormatHelper";
import {useHead} from "unhead";
import moment from "moment";

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

const config = useRuntimeConfig();
const route = useRoute();
const platformId = ref(0);

const promptPlatformById = (platformId: number) => {
  switch (platformId) {
    case 1:
      return 'Shopee';
    case 2:
      return 'Lazada';
    case 3:
      return 'Tiki';
    case 4: 
      return 'Tiktok';
    default:
      return 'Khác';
  }
}

onMounted(() => {
  try {
    platformId.value = props.data?.data_filter_report?.lst_platform_id?.[0];
  } catch (e) {}
});

const diffMonths = computed(() => {
  const filterCustom = props.data?.filter_custom;
  if (!filterCustom) return "N/A";
  const {start_date, end_date} = filterCustom;
  const startDate = dayjs(start_date);
  const endDate = dayjs(end_date);
  return endDate.diff(startDate, "months") + 1 + " tháng";
});

interface PriceRange {
  revenue: number;

  [key: string]: number;
}

const priceRangesSortBy = (field: keyof PriceRange = 'revenue') => {
  const dataAnalytic = props.data?.data_analytic;
  if (!dataAnalytic || !dataAnalytic.by_price_range) return [];
  const {lst_price_range} = dataAnalytic.by_price_range;
  return lst_price_range.slice().sort((a: PriceRange, b: PriceRange) => b[field] - a[field]) || [];
};

interface Platform {
  name: string;
}

interface Shop {
  name: string;
}

const top5Shops = (): string[] => {
  const dataAnalytic = props.data?.data_analytic;
  if (!dataAnalytic || !dataAnalytic.by_brand) return [];
  const shops: Shop[] = dataAnalytic.by_brand.lst_top_brand_revenue;
  return shops.filter(brand => brand.name.toLowerCase() !== 'no brand')
      .slice(0, 5).map(brand => brand.name);
};

interface RevenueItem {
  revenue: number;
}

const diffRevenueLatestQuarterPercent = computed(() => {
  const dataAnalytic = props.data?.data_analytic;
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


const listTopBrandNames = top5Shops().join(', ');
let description = `Thị trường ${props.data?.name} trên TMĐT đạt quy mô ${formatSortTextCurrency(props.data?.data_analytic?.by_overview.revenue)} đồng và tăng trưởng ${diffRevenueLatestQuarterPercent.value}% so với quý trước`;
if (props.data?.report_type !== 'report_brand') {
  description += `với thương hiệu nổi bật gồm ${listTopBrandNames}`;
}

useHead({
  title: `Báo cáo thị trường ${props.data?.name} sàn TMĐT cập nhật tháng ${moment().format("MM/YYYY")}`,
  meta: [
    {charset: "utf-8"},
    {name: "viewport", content: "width=device-width, initial-scale=1"},
    {
      key: "description",
      name: "description",
      content: description
    },
    {
      key: "og:title",
      property: "og:title",
      content: `Báo cáo nghiên cứu thị trường ${props.data?.name} TMĐT, cập nhật tháng ${moment().format("MM/YYYY")}`
    },
    {
      key: "og:description",
      property: "og:description",
      content: description
    },
    {key: "og:image", property: "og:image", content: props.data?.url_cover || props.data?.url_thumbnail},
    {
      key: "og:image:alt",
      property: "og:image:alt",
      content: `${props.data?.name} - Báo cáo tổng quan thị trường sàn TMĐT`
    },
  ],
  link: [
    {key: "canonical", rel: "canonical", href: `${config.public.BASE_URL}${route.fullPath}`},
  ],
});

</script>

<template>
  <div class="overview">
    <div class="content">
      <div>
        Báo cáo nghiên cứu thị trường {{ props.data?.report_type === 'report_top_shop' ? 'shop ' : '' }}<b style="font-weight: bold">{{ props.data?.name }}</b> trên sàn Thương mại điện tử
        <b style="font-weight: bold">{{
            props.data?.data_analytic?.by_marketplace
                ? props.data?.data_analytic.by_marketplace.lst_marketplace.map((platform: Platform) => platform.name).join(', ')
                : 'N/A'
          }}</b>
        dành cho nhà bán hàng <b style="font-weight: bold"> từ tháng
        {{
          props.data?.filter_custom
              ? props.data?.start_date.slice(4, 6) + '/' + props.data?.start_date.slice(0, 4)
              : 'N/A'
        }}
        đến tháng {{
          props.data?.filter_custom
              ? props.data?.end_date.slice(4, 6) + '/' + props.data?.end_date.slice(0, 4)
              : 'N/A'
        }}</b>,
        được thực hiện bởi
        <a style="color: #E85912; font-weight: 500" href="https://metric.vn/" target="_blank">Metric.vn - Nền tảng phân
          tích số liệu thị
          trường</a>.
      </div>
      <br>
      <div>
        <span class="text-bold">
          Báo cáo doanh thu {{ props.data?.report_type === 'report_top_shop' ? 'gian hàng ' : '' }} {{ props.data?.name }} trên sàn {{ data?.report_type == 'report_top_shop' ?  promptPlatformById(platformId) : "TMĐT" }} đạt
          <BlurContent :is-hide-content="isHideContent">
            <b style="font-weight: bold">{{
                props.data?.data_analytic?.by_overview ? formatSortTextCurrency(props.data?.data_analytic.by_overview.revenue) : 'N/A'
              }} đồng</b>
          </BlurContent>
        </span>
        trong {{ diffMonths }} và so với quý gần nhất
        {{
          !isNaN(diffRevenueLatestQuarterPercent) && diffRevenueLatestQuarterPercent > 0 ? "tăng trưởng hơn" : "giảm"
        }}
        {{ !isNaN(diffRevenueLatestQuarterPercent) ? formatSortTextCurrency(Math.abs(diffRevenueLatestQuarterPercent)) : 'N/A' }}%
        <div v-if="props.data?.report_type !== 'report_top_shop'">
          Đánh giá thị trường {{ props.data?.name }}, phân khúc giá có doanh số cao nhất là từ
          {{
            priceRangesSortBy("revenue")?.[0]
                ? formatCurrency(priceRangesSortBy("revenue")?.[0].begin)
                : 'N/A'
          }} -
          {{
            priceRangesSortBy("revenue")?.[0]
                ? formatCurrency(priceRangesSortBy("revenue")?.[0].end)
                : 'N/A'
          }}.
          <span v-if="props.data?.report_type !== 'report_brand'">
            Những thương hiệu {{ props.data?.name }} được phân phối và
            bán chạy nhất là
            <b>{{ top5Shops().join(', ') }}</b>
            v.v...
          </span>
        </div>
        <div v-else>
          {{ props.data?.name }} kinh doanh ngành hàng {{props.data?.lst_category?.[0]?.name}} với nhóm hàng phổ biến là {{ top5Shops().join(', ') }}... Phân khúc giá sản phẩm {{ props.data?.name }} được bán phổ biến từ {{
            priceRangesSortBy("revenue")?.[0]
                ? formatCurrency(priceRangesSortBy("revenue")?.[0].begin)
                : 'N/A'
          }} - {{
            priceRangesSortBy("revenue")?.[0]
                ? formatCurrency(priceRangesSortBy("revenue")?.[0].end)
                : 'N/A'
          }}.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overview {
  //padding: 24px;
  //border-radius: 16px;
  //border: 1px solid #EEEBFF;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .content {
    color: #2e2e2e;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.4;
  }
}

.statistic-item__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: #101828;
}

.text-bold {
  //color: var(--Dark-blue-dark-blue-7, #332D59);
  font-family: Inter, sans-serif;
  //font-size: 14px;
  //font-style: normal;
  font-weight: 700;
  //line-height: 24px;
}

@media (max-width: 768px) {
  .overview {
    padding: 16px;
  }
}
</style>
