<script setup lang="ts">
import {formatSortTextCurrency} from "~/helpers/utils";
import {computed} from "vue";
import dayjs from "dayjs";
import {formatCurrency} from "~/helpers/FormatHelper";
import {useHead} from "unhead";

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

useHead({
  title: `Báo cáo chi tiết thị trường ${props.data.name} - Báo cáo xu hướng thị trường sàn TMĐT`,
  meta: [
    {charset: "utf-8"},
    {name: "viewport", content: "width=device-width, initial-scale=1"},
    {
      key: "description",
      name: "description",
      content: `Báo cáo chi tiết thị trường ${props.data.name} - Báo cáo xu hướng thị trường sàn TMĐT`
    },
    {key: "og:title", property: "og:title", content: `${props.data.name} - Báo cáo xu hướng thị trường sàn TMĐT`},
    {
      key: "og:description",
      property: "og:description",
      content: `Báo cáo chi tiết thị trường ${props.data.name} - Báo cáo xu hướng thị trường sàn TMĐT`
    },
    {key: "og:image", property: "og:image", content: props.data?.url_cover || props.data?.url_thumbnail},
    {
      key: "og:image:alt",
      property: "og:image:alt",
      content: `${props.data.name} - Báo cáo xu hướng thị trường sàn TMĐT`
    },
  ],
  link: [
    {key: "canonical", rel: "canonical", href: `${config.public.BASE_URL}${route.fullPath}`},
  ],
});


const diffMonths = computed(() => {
  const filterCustom = props.data.filter_custom;
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
  const dataAnalytic = props.data.data_analytic;
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
  const dataAnalytic = props.data.data_analytic;
  if (!dataAnalytic || !dataAnalytic.by_brand) return [];
  const shops: Shop[] = dataAnalytic.by_brand.lst_top_brand_revenue;
  return shops.slice(0, 5).map(brand => brand.name);
};

interface RevenueItem {
  revenue: number;
}

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
</script>

<template>
  <div class="overview">
    <div class="content">
      <div>
        Báo cáo nghiên cứu thị trường <b>{{ props.data.name }}</b> trên sàn Thương mại điện tử
        {{
          props.data.data_analytic && props.data.data_analytic.by_marketplace
              ? props.data.data_analytic.by_marketplace.lst_marketplace.map((platform: Platform) => platform.name).join(', ')
              : 'N/A'
        }}
        dành cho nhà bán hàng <b> từ tháng
        {{
          props.data.filter_custom
              ? props.data.filter_custom.start_date.slice(4, 6) + '/' + props.data.filter_custom.start_date.slice(0, 4)
              : 'N/A'
        }}
        đến tháng {{
          props.data.filter_custom
              ? props.data.filter_custom.end_date.slice(4, 6) + '/' + props.data.filter_custom.end_date.slice(0, 4)
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
          Báo cáo doanh thu {{ props.data.name }} trên sàn TMĐT đạt
          <BlurContent :is-hide-content="isHideContent">
            <b>{{ props.data.data_analytic && props.data.data_analytic.by_overview ? formatSortTextCurrency(props.data.data_analytic.by_overview.revenue) : 'N/A' }} đồng</b>
          </BlurContent>
        </span>
        trong {{ diffMonths }} và so với quý gần nhất
        {{
          !isNaN(diffRevenueLatestQuarterPercent) && diffRevenueLatestQuarterPercent > 0 ? "tăng trưởng hơn" : "giảm"
        }}
        {{ !isNaN(diffRevenueLatestQuarterPercent) ? Math.abs(diffRevenueLatestQuarterPercent) : 'N/A' }}%
        Đánh giá thị trường {{ props.data.name }}, phân khúc giá có doanh số cao nhất là từ
        {{
          priceRangesSortBy("revenue")[0]
              ? formatCurrency(priceRangesSortBy("revenue")[0].begin)
              : 'N/A'
        }} -
        {{
          priceRangesSortBy("revenue")[0]
              ? formatCurrency(priceRangesSortBy("revenue")[0].end)
              : 'N/A'
        }}
        . Những thương hiệu {{ props.data.name }} được phân phối và
        bán chạy nhất là
        <b>{{ top5Shops().join(', ') }}</b>
        v.v...
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