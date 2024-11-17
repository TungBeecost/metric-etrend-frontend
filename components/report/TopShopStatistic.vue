<script setup>
import {computed, ref, onMounted, watchEffect} from 'vue';
import {getUrlImageOption} from '~/helpers/utils.js';
import Highcharts from "highcharts";

const config = useRuntimeConfig();
const renderChartSales = ref(false);
const renderChartOutput = ref(false);
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isHideContent: {
    type: Boolean,
    default: false,
  },
  isHide: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: true,
  },
});

const windowWidth = ref(0);
const isMobile = ref(false);

const newTabUrl = (url) => {
  window.open(url, '_blank');
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    isMobile.value = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      windowWidth.value = window.innerWidth;
      isMobile.value = window.innerWidth < 768;
    });
  }
  renderChartSales.value = true;
  renderChartOutput.value = true;
});

const isHideContentBasic = computed(() => {
  if (config.public.SSR === 'true') {
    return false;
  }
  return !(props.data?.tier_report === 'e_pro' || props.data?.tier_report === 'e_pro_lite'
      || props.data?.tier_report === 'e_trial' || props.data?.tier_report === 'pt50'
      || props.data?.tier_report === 'pt100');
});

const formatNumber = (value = "") => value.toLocaleString("vi-VN");

const chartWidth = computed(() => {
  if (windowWidth.value < 1200) {
    return 350;
  } else if (windowWidth.value < 1500) {
    return 400;
  } else {
    return 600;
  }
});

const chartHeight = computed(() => {
  if (windowWidth.value < 1200) {
    return 300;
  } else {
    return 400;
  }
});

const colors = [
  "#9254DE",
  "#FF7A45",
  "#FF4D4F",
  "#597EF7",
  "#241E46",
  "#F15D25",
  "#1890FF",
  "#36CFC9",
  "#AEC986",
  "#FFC53D"
]

const top12Shops = computed(() => props.data?.data_analytic?.by_shop?.lst_shop.slice(0, 12));

const tooltipSales = ref({});
const tooltipOutput = ref({});
const dataLabels = ref({});

watchEffect(() => {
  tooltipSales.value = props.isHideContent
      ? {
        enabled: true,
        formatter: function () {
          const name = ![5, 7, 9].includes(this.point.index)
              ? `Đã bị ẩn`
              : this.point.name;
          return `${name}<br/>
            <svg width="10" height="10">
              <rect width="10" height="10" style="fill:${this.point.color};stroke-width:3;stroke:rgb(0,0,0)" />
            </svg> ${this.series.name}: <strong>Đã bị ẩn</strong>`;
        },
      }
      : {
        enabled: true,
        formatter: function () {
          return `<b>${this.point.name}</b><br/>Doanh số: ${Highcharts.numberFormat(this.point.y, 0, ',', '.')} đ`;
        },
      };

  tooltipOutput.value = props.isHideContent
      ? {
        enabled: true,
        formatter: function () {
          const name = ![5, 7, 9].includes(this.point.index)
              ? `Đã bị ẩn`
              : this.point.name;
          return `${name}<br/>
            <svg width="10" height="10">
              <rect width="10" height="10" style="fill:${this.point.color};stroke-width:3;stroke:rgb(0,0,0)" />
            </svg> ${this.series.name}: <strong>Đã bị ẩn</strong>`;
        },
      }
      : {
        enabled: true,
        formatter: function () {
          return `<b>${this.point.name}</b><br/>Sản lượng: ${Highcharts.numberFormat(this.point.y, 0, ',', '.')}`;
        },
      };

  dataLabels.value = props.isHideContent
      ? {
        enabled: true,
        formatter: function () {
          if (isMobile.value) {
            return '<span style="color: #9D97BF; filter: blur(4px)">đã ẩn</span>';
          }
          if (![5, 7, 9].includes(this.point.index)) {
            return '<span style="color: #9D97BF; filter: blur(4px)">đã ẩn</span>: ' + '<span style="color: #9D97BF; filter: blur(4px)">đã ẩn</span>';
          }
          return '<span>' + this.point.name + '</span>: ' + '<span style="color: #E85912">' + Highcharts.numberFormat(this.percentage, 1, ',') + '%</span>';
        },
      }
      : {
        enabled: true,
        formatter: function () {
          if (isMobile.value) {
            return '<span style="color: #E85912">' + Highcharts.numberFormat(this.percentage, 1, ',') + '%</span>';
          }
          return '<span>' + this.point.name + '</span>: ' + '<span style="color: #E85912">' + Highcharts.numberFormat(this.percentage, 1, ',') + '%</span>';
        },
      };
});

const chartOptionsShopType = computed(() => ({
  chart: {
    type: "pie",
    width: chartWidth.value || 500,
    height: chartHeight.value || 400,
    style: {
      fontFamily: "Inter",
    },
  },
  title: {
    text: `<h4>Tỷ trọng doanh số theo loại shop</h4>`,
    useHTML: true,
    style: {
      fontSize: '16px',
      color: '#241E46',
      fontWeight: 700,
      fontFamily: "Inter",
    }
  },
  subtitle: {
    text: `Shop mall và shop thường (Shopee, Lazada)`,
    style: {
      fontSize: '13px',
      color: '#716B95',
      fontWeight: 400,
      fontFamily: 'Inter'
    }
  },
  legend: {
    enabled: false,
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'middle',
    symbolHeight: 10,
    symbolWidth: 10,
    itemStyle: {
      fontSize: '12px',
      color: '#241E46',
      fontWeight: 400,
      fontFamily: 'Inter'
    }
  },
  tooltip: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      cursor: "pointer",
      showInLegend: true,
      innerSize: '50%',
      dataLabels: {
        enabled: true,
        formatter: function () {
          return `<span>${this.point.name}</span>: <span style="color: #E85912">${Highcharts.numberFormat(this.percentage, 1, ',')}%</span>`;
        },
      },
    },
    series: {
      enableMouseTracking: true
    }
  },
  series: [
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
    }
  ]
}));

const chartOptionsSales = computed(() => ({
  chart: {
    type: "pie",
    width: chartWidth.value || 500,
    height: chartHeight.value || 400,
    style: {
      fontFamily: "Inter",
    },
  },
  title: {
    text: `<h4>Top 10 Shop theo doanh số</h4>`,
    useHTML: true,
    style: {
      fontSize: '16px',
      color: '#241E46',
      fontWeight: 700,
      fontFamily: "Inter",
    }
  },
  legend: {
    enabled: false,
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'middle',
    symbolHeight: 10,
    symbolWidth: 10,
    itemStyle: {
      fontSize: '12px',
      color: '#241E46',
      fontWeight: 400,
      fontFamily: 'Inter'
    }
  },
  tooltip: tooltipSales.value,
  plotOptions: {
    pie: {
      cursor: "pointer",
      showInLegend: true,
      innerSize: '50%',
      dataLabels: dataLabels.value,
    },
    series: {
      enableMouseTracking: true
    }
  },
  series: [
    {
      name: 'Doanh số (Đồng)',
      data: (props.data?.data_analytic?.by_shop?.lst_top_shop_revenue || props.data?.data_analytic?.by_shop?.lst_top_shop || []).slice(0, 10).map(({name, revenue, ratio_revenue}, index) => ({
        name: name,
        y: revenue || ratio_revenue,
        color: colors[index % colors.length]
      })).sort((a, b) => b.y - a.y),
    }
  ]
}));

const chartOptionsOutput = computed(() => ({
  chart: {
    type: "pie",
    width: chartWidth.value || 500,
    height: chartHeight.value || 400,
    style: {
      fontFamily: "Inter",
    },
  },
  title: {
    text: `<h4>Top 10 Shop theo sản lượng</h4>`,
    useHTML: true,
    style: {
      fontSize: '16px',
      color: '#241E46',
      fontWeight: 700,
      fontFamily: "Inter",
    }
  },
  legend: {
    enabled: false,
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'middle',
    symbolHeight: 10,
    symbolWidth: 10,
    itemStyle: {
      fontSize: '12px',
      color: '#241E46',
      fontWeight: 400,
      fontFamily: 'Inter'
    }
  },
  tooltip: tooltipOutput.value,
  plotOptions: {
    pie: {
      cursor: "pointer",
      showInLegend: true,
      innerSize: '50%',
      dataLabels: dataLabels.value,
    },
    series: {
      enableMouseTracking: true
    }
  },
  series: [
    {
      name: 'Sản lượng (Đơn vị)',
      data: (props.data?.data_analytic?.by_shop?.lst_top_shop_order || props.data?.data_analytic?.by_shop?.lst_shop || []).slice(0, 10).map(({name, sale, ratio_sale}, index) => ({
        name: name,
        y: sale || ratio_sale,
        color: colors[index % colors.length]
      })).sort((a, b) => b.y - a.y),
    }
  ]
}));</script>

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
        <h3 class="statistic-item__title">Shop hàng đầu</h3>
      </div>
    </div>
    <div class="pie_chart">
      <div
          v-if="props.data.data_analytic.by_shop.lst_top_shop.length > 1"
          class="pie_chart_item"
          style="flex-direction: column; gap: 24px; justify-content: flex-start"
      >
        <h4 style="font-size: 16px; font-weight: bold; line-height: 22px; text-align: center; color: #241E46">Số lượng
          shop</h4>
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
              title: 'Số shop',
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
        <highchart v-if="renderChartSales" :options="chartOptionsShopType"/>
      </div>
    </div>
    <!--        <div style="display: flex; justify-content: flex-end; font-style: italic;">* Thị phần theo loại shop chỉ thống-->
    <!--          kê số liệu sàn Shopee, Lazada-->
    <!--        </div>-->
    <hr style="border: 1px solid #EEEBFF; margin: 4px 0"/>
    <div>
      <div class="chart_item">
        <div>
          <highchart v-if="renderChartSales" :options="chartOptionsSales"/>
        </div>
        <div>
          <highchart v-if="renderChartOutput" :options="chartOptionsOutput"/>
        </div>
      </div>
    </div>
    <h4 style="color: #241E46; font-weight: 700; line-height: 22px; text-align: center">
      Danh sách shop phổ biến của {{ props.data.name }} trên sàn TMĐT
    </h4>
    <div class="logo-grid">
      <div
          v-for="(record, index) in top12Shops"
          :key="index" class="logo-item"
          @click="newTabUrl(record.url_shop)"

      >
        <img
            :src="getUrlImageOption(record.url_image, 'thumbnail')"
            :alt="record.name"
            style="width: 64px; height: 64px; border-radius: 8px; background-size: cover;"
        />
        <p style="font-size: 12px;font-weight: 500;line-height: 24px;overflow: hidden; text-align: center">
          {{ record.name }}
        </p>
      </div>
    </div>
    <InsightBlock
        v-if="
        data.data_analytic.by_shop.ratio.mall &&
        data.data_analytic.by_shop.ratio.normal
      "
    >
      <li>
        Doanh thu của {{ data.name }} đến từ
        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{ formatNumber(data.data_analytic.by_shop.ratio.mall.shop) }}
          </span>
        </BlurContent>
        shop mall chiếm
        {{
          Number(
              data.data_analytic.by_shop.ratio.mall.ratio_revenue * 100
          ).toFixed(1)
        }}% và hơn
        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{ formatNumber(data.data_analytic.by_shop.ratio.normal.shop) }}
          </span>
        </BlurContent>
        shop thường chiếm
        {{
          Number(
              data.data_analytic.by_shop.ratio.normal.ratio_revenue * 100
          ).toFixed(1)
        }}% doanh số. Báo cáo về {{ data.name }} của 10 shop bán chạy hàng đầu,
        Shop
        <span class="text-bold">{{
            data.data_analytic.by_shop.lst_top_shop[0].name
          }}</span>
        có tỉ trọng doanh thu cao nhất chiếm

        <BlurContent :is-hide-content="isHideContent">
          <span>
            {{
              Number(
                  data.data_analytic.by_shop.lst_top_shop[0].ratio_revenue * 100
              ).toFixed(2)
            }}
          </span>
        </BlurContent>
        % doanh số. Tiếp theo đó là các shop
        <template
            v-if="
            data.data_analytic &&
            data.data_analytic.by_shop.lst_top_shop &&
            data.data_analytic.by_shop.lst_top_shop.length >= 2
          "
        >
          <span class="text-bold">{{
              data.data_analytic.by_shop.lst_top_shop[1].name
            }}</span
          >,
        </template>
        <template
            v-if="
            data.data_analytic &&
            data.data_analytic.by_shop.lst_top_shop &&
            data.data_analytic.by_shop.lst_top_shop.length >= 3
          "
        >
          <span class="text-bold">{{
              data.data_analytic.by_shop.lst_top_shop[2].name
            }}</span>
          tương ứng thị phần doanh thu là
          <BlurContent :is-hide-content="isHideContent">
            <span>
              {{
                Number(
                    data.data_analytic.by_shop.lst_top_shop[1].ratio_revenue * 100
                ).toFixed(2)
              }}
            </span>
          </BlurContent>
          %
        </template>
        và
        <template
            v-if="
            data.data_analytic &&
            data.data_analytic.by_shop.lst_top_shop &&
            data.data_analytic.by_shop.lst_top_shop.length >= 3
          "
        >
          <BlurContent :is-hide-content="isHideContent">
            <span>
              {{
                Number(
                    data.data_analytic.by_shop.lst_top_shop[2].ratio_revenue * 100
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

.chart_item {
  display: flex;
  width: 100%;
  justify-content: space-between;
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
  background: #fff;
  gap: 48px;
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

.logo-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  overflow: hidden;


  .logo-item {
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    cursor: pointer;
  }
}

.blurred {
  filter: blur(4px);
}

@media (max-width: 768px) {
  .chart_item {
    flex-direction: column;
  }
  .pie_chart {
    flex-direction: column;
  }
  #top-shop {
    padding: 16px;
    border: none;
    gap: 16px;
  }

  .logo-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
