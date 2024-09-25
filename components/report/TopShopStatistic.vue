<script setup>
import {defineProps, computed, ref, onMounted} from 'vue';
import PieChart from "~/components/report/PieChart.vue";
import {formatSortTextCurrency, getUrlImageOption} from "~/helpers/utils.js";

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
});

const windowWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
  });
  renderChartSales.value = true;
  renderChartOutput.value = true;
});
const isHideContentBasic = computed(() => {
  console.log('isHideContentBasic', config.public.SSR);
  if (config.public.SSR === 'true') {
    return false;
  }
  return !(props.data?.tier_report === 'e_pro' || props.data?.tier_report === 'e_pro_lite' || props.data?.tier_report === 'e_trial');
});

const formatNumber = (value = "") => value.toLocaleString("vi-VN");

const chartWidth = computed(() => {
  if (windowWidth.value < 1200) {
    return 300;
  } else if (windowWidth.value < 1500) {
    return 400;
  } else {
    return 700;
  }
});

const colors = [
  '#8B54D9', '#F1584B', '#8BA87C', '#E85912', '#42A4FF',
  '#241E46', '#FBE13E', '#FBA140', '#5473EF', '#3DCDCD'
];

const top12Shops = computed(() => props.data.data_analytic.by_shop.lst_shop.slice(0, 12));


const truncateName = (name) => {
  return name.length > 10 ? name.substring(0, 10) + '...' : name;
};

const chartOptionsSales = computed(() => ({
  chart: {
    type: "pie",
    width: chartWidth.value || 500,
    style: {
      fontFamily: "Inter",
    },
  },
  title: {
    text: "Tỷ trọng top 10 gian hàng theo doanh số",
    style: {
      fontSize: '14px',
      color: '#241E46',
      fontWeight: 700,
      fontFamily: 'Inter'
    }
  },
  legend: {
    enabled: !isHideContentBasic.value,
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
      borderWidth: 1,
      borderColor: null,
      dataLabels: {
        enabled: true,
        connectorShape: 'crookedLine',
        formatter: function() {
          if (isHideContentBasic.value) {
            return `<span style="color: #9D97BF; filter: blur(4px)">đã ẩn</span>`;
          }
          return `<span style="font-weight: 500">${truncateName(this.point.name)}</span>: <span style="color: #E85912">${this.point.percentage.toFixed(1)}%</span>`;
        },
        style: {
          fontSize: '12px',
          color: '#241E46',
          fontWeight: 400,
          fontFamily: 'Inter'
        },
      }
    },
    series: {
      enableMouseTracking: false
    }
  },
  series: [
    {
      name: 'Doanh số (Đồng)',
      data: props.data.data_analytic.by_shop.lst_top_shop.map(({ name, revenue, ratio_revenue }, index) => ({
        name: name,
        y: revenue || ratio_revenue,
        color: colors[index % colors.length]
      })).sort((a, b) => b.y - a.y),
    }
  ]
}));

const sortedTopShops = computed(() => {
  return props.data.data_analytic.by_shop.lst_shop
      .slice()
      .sort((a, b) => b.sale - a.sale)
      .slice(0, 10)
      .map(({ name, sale }, index) => ({
        name: name,
        y: sale,
        color: colors[index % colors.length]
      }))
      .sort((a, b) => b.y - a.y);
});


const chartOptionsOutput = computed(() => ({
  chart: {
    type: "pie",
    width: chartWidth.value || 500,
    style: {
      fontFamily: "Inter",
    },
  },
  title: {
    text: "Tỷ trọng top 10 thương hiệu theo sản lượng *",
    style: {
      fontSize: '14px',
      color: '#241E46',
      fontWeight: 700,
      fontFamily: 'Inter'
    }
  },
  legend: {
    enabled: !isHideContentBasic.value,
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
      borderWidth: 1,
      borderColor: null,
      dataLabels: {
        enabled: true,
        connectorShape: 'crookedLine',
        formatter: function() {
          if (isHideContentBasic.value) {
            return `<span style="color: #9D97BF; filter: blur(4px)">đã ẩn</span>`;
          }
          return `<span style="font-weight: 500">${truncateName(this.point.name)}</span>: <span style="color: #E85912">${this.point.percentage.toFixed(1)}%</span>`;
        },
        style: {
          fontSize: '12px',
          color: '#241E46',
          fontWeight: 400,
          fontFamily: 'Inter'
        },
      }
    },
    series: {
      enableMouseTracking: false
    }
  },
  series: [
    {
      name: 'Doanh số (Đồng)',
      data: sortedTopShops.value,
    }
  ]
}));
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
        <div style="font-size: 16px; font-weight: bold; line-height: 22px; text-align: center; color: #241E46">Số lượng
          gian hàng
        </div>
        <div>
          <a-table
              :columns="[
            {
              title: 'Loại gian hàng',
              dataIndex: 'shop_type',
              key: 'shop_type',
              align: 'center',
              width: 180,
              slots: {customRender: 'shop_type'}
            },
            {
              title: 'Số gian hàng',
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
    <div>
      <div style="display: flex; justify-content: space-between">
        <div style="pointer-events: none">
          <highchart v-if="renderChartSales" :options="chartOptionsSales"/>
        </div>
        <div style="pointer-events: none">
          <highchart v-if="renderChartOutput" :options="chartOptionsOutput"/>
        </div>
      </div>
    </div>
    <div style="color: #241E46; font-weight: 700; line-height: 22px; text-align: center">
      Danh sách gian bán chạy theo doanh số trong nhóm hàng {{props.data.name}}
    </div>
    <div class="logo-grid">
      <div v-for="(record, index) in top12Shops" :key="index" class="logo-item">
        <img :class="{ 'blurred': isHideContentBasic }"  :src="getUrlImageOption(record.url_image, 'thumbnail')" style="width: 64px; height: 64px; border-radius: 8px; background-size: cover;">
        <BlurContent :is-hide-content="isHideContentBasic">
          <p style="font-size: 12px;font-weight: 500;line-height: 24px;overflow: hidden; text-align: center">
            {{record.name}}
          </p>
        </BlurContent>

      </div>
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
        </BlurContent>
        .
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
        </BlurContent>
        .
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

.logo-grid{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  overflow: hidden;


  .logo-item{
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}

.blurred {
  filter: blur(4px);
}

@media (max-width: 768px) {
  .pie_chart {
    flex-direction: column;
  }
  #top-shop {
    padding: 16px;
    border: none;
  }
}
</style>
