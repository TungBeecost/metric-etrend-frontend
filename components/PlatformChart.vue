<script setup>
import { ref, computed, watch } from 'vue';
import { getPlatformById } from "~/helpers/PermissionPlatformHelper";
import {formatCurrency, formatNumberHuman} from "~/helpers/FormatHelper.js";

const chartOptions = ref(null);
const platformColors = {
  Shopee: "#FF9264",
  Lazada: "#47538F",
  Tiki: "#5BAFFE",
  Sendo: "#FF6060",
  Tiktok: "#000",
};

const props = defineProps({
  classifiedAnalyticResponse: {
    type: Object,
    default: () => ({})
  },
  analyticType: {
    type: String,
    default: () => 'revenue'
  },
  isHideContent: {
    type: Boolean,
    default: () => true
  }
});

const PLATFORM_TOTAL = computed(() => props.analyticType === 'revenue' ? props.classifiedAnalyticResponse.REVENUE_TOTAL : props.classifiedAnalyticResponse.ORDER_TOTAL);
const total = computed(() => PLATFORM_TOTAL.value.platforms.reduce((acc, item) => acc + item.revenue, 0));

const innerName = ref(PLATFORM_TOTAL.value.platforms[0] ? getPlatformById(PLATFORM_TOTAL.value.platforms[0].platform_id).name : '');
const innerPercent = ref(PLATFORM_TOTAL.value.platforms[0] ? parseFloat(PLATFORM_TOTAL.value.platforms[0].revenue / total.value * 100).toFixed(1) + '%' : '');
const innerValue = ref(PLATFORM_TOTAL.value.platforms[0] ? PLATFORM_TOTAL.value.platforms[0].revenue : '');
const innerColor = ref(PLATFORM_TOTAL.value.platforms[0] ? platformColors[getPlatformById(PLATFORM_TOTAL.value.platforms[0].platform_id).name] : '');

const columns = computed(() => [
  {
    title: $t('Nền tảng'),
    dataIndex: 'platform',
    key: 'platform',
    width: 100,
    align: 'left',
    scopedSlots: {customRender: 'platform'},
  },
  {
    title: props.analyticType === 'revenue' ? $t('Doanh số (Đồng)') : $t('Số sản phẩm đã bán (Sản phẩm)'),
    dataIndex: 'revenue',
    scopedSlots: {customRender: 'revenue'},
    key: 'revenue',
    width: 200,
    align: 'right',
  },
]);

const $t = (text) => text;

chartOptions.value = {
  chart: {
    type: "pie",
    style: {
      fontFamily: "Inter",
    },
    width: 300
  },
  title: {
    text: "",
  },
  legend: {
    enabled: true,
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
    enabled: true,
    formatter: function () {
      if (props.isHideContent) {
        const name = ![4, 6, 8].includes(this.point.index) && this.point.categoryName?.length > 0 ? `${this.point.categoryName} ${this.point.index + 1}` : this.point.name;
        return `${name}<br/>
        <svg width="10" height="10">
          <rect width="10" height="10" style="fill:${this.point.color};stroke-width:3;stroke:rgb(0,0,0)" />
          </svg> ${this.series.name}: <strong>Đã bị ẩn</strong>`;
      }

      return `${this.point.name}: <strong>${formatCurrency(this.point.y)}</strong> (${this.point.percentage.toFixed(1)}%)`;
    },
  },
  plotOptions: {
    pie: {
      cursor: "pointer",
      showInLegend: true,
      innerSize: '70%',
      borderWidth: 1,
      borderColor: null,
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
          color: '#241E46',
          fontWeight: 400,
          fontFamily: 'Inter'
        }
      }
    },
    series: {
      point: {
        events: {
          mouseOver: (event) => {
            innerName.value = event.target.name;
            innerPercent.value = `${Number(event.target.percentage).toFixed(1)}%`;
            innerValue.value = event.target.y;
            innerColor.value = event.target.color;
          }
        }
      },
      events: {
        mouseOut: (_event) => { // Prefix the event parameter with an underscore
          const PLATFORM_TOTAL = props.analyticType === 'revenue' ? props.classifiedAnalyticResponse.REVENUE_TOTAL : props.classifiedAnalyticResponse.ORDER_TOTAL;
          const total = PLATFORM_TOTAL.platforms.reduce((acc, item) => acc + item.revenue, 0);
          innerName.value = PLATFORM_TOTAL.platforms[0] ? getPlatformById(PLATFORM_TOTAL.platforms[0].platform_id).name : '';
          innerPercent.value = PLATFORM_TOTAL.platforms[0] ? parseFloat(PLATFORM_TOTAL.platforms[0].revenue / total * 100).toFixed(1) + '%' : '';
          innerValue.value = PLATFORM_TOTAL.platforms[0] ? PLATFORM_TOTAL.platforms[0].revenue : '';
          innerColor.value = PLATFORM_TOTAL.platforms[0] ? platformColors[getPlatformById(PLATFORM_TOTAL.platforms[0].platform_id).name] : '';
        }
      }
    }
  },
  series: [
    {
      name: props.analyticType === 'revenue' ? $t('Doanh số (Đồng)') : $t('Số sản phẩm đã bán (Sản phẩm)'),
      data: PLATFORM_TOTAL.value.platforms.map(({platform_id, revenue}) => ({
        name: getPlatformById(platform_id).name,
        y: revenue,
        color: platformColors[getPlatformById(platform_id).name]
      })).sort((a, b) => b.y - a.y),
    }
  ]
};

const dataSource = computed(() => {
  const PLATFORM_TOTAL = props.analyticType === 'revenue' ? props.classifiedAnalyticResponse.REVENUE_TOTAL : props.classifiedAnalyticResponse.ORDER_TOTAL;
  return PLATFORM_TOTAL.platforms.map(({platform_id, revenue} = {}) => ({
    platform: getPlatformById(platform_id).name,
    platformIcon: getPlatformById(platform_id).urlLogo,
    revenue: props.analyticType === 'revenue' ? formatCurrency(revenue) : formatNumberHuman(revenue),
  })).sort((a, b) => b.revenue - a.revenue);
});

watch(() => props.analyticType, () => {
  const PLATFORM_TOTAL = props.analyticType === 'revenue' ? props.classifiedAnalyticResponse.REVENUE_TOTAL : props.classifiedAnalyticResponse.ORDER_TOTAL;
  const total = PLATFORM_TOTAL.platforms.reduce((acc, item) => acc + item.revenue, 0);
  innerName.value = PLATFORM_TOTAL.platforms[0] ? getPlatformById(PLATFORM_TOTAL.platforms[0].platform_id).name : '';
  innerPercent.value = PLATFORM_TOTAL.platforms[0] ? parseFloat(PLATFORM_TOTAL.platforms[0].revenue / total * 100).toFixed(1) + '%' : '';
  innerValue.value = PLATFORM_TOTAL.platforms[0] ? PLATFORM_TOTAL.platforms[0].revenue : '';
  innerColor.value = PLATFORM_TOTAL.platforms[0] ? platformColors[getPlatformById(PLATFORM_TOTAL.platforms[0].platform_id).name] : '';
});

</script>

<template>
  <div class="PlatformChart">
    <div style="flex: 1">
      <div style="position: relative">
        <highchart :options="chartOptions"/>
        <div class="platform-chart-inner-box">
          <div class="platform-chart-inner-value">
            <div class="percent" style="color: #241E46; font-size: 24px;font-weight: bold; line-height: 32px; ">{{ innerPercent }}</div>
            <div class="name" style="color: #241E46; font-size: 12px;line-height: 20px;">{{ innerName }}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="flex: 1;  max-width: 500px;">
      <a-table
          :columns="columns"
          :data-source="dataSource"
          :pagination="false"
          :row-key="record => record.platform"
          class="platform-table"
          size="large"
      >
        <div style="flex: 1;  max-width: 500px;">
          <a-table
              :columns="columns"
              :data-source="dataSource"
              :pagination="false"
              :row-key="record => record.platform"
              class="platform-table"
              size="large"
          >
            <template #platform="{ record }">
              <div style="display: flex;">
                <img :src="record.platformIcon" class="platform-icon"
                     style="width: 32px;height: 32px;border-radius: 8px;margin-right: 10px;"/>
                <span style="font-weight: 400;">{{ record.platform }}</span>
              </div>
            </template>
            <template #revenue="{ record }">
          <span style="font-weight: 400;">
            <BlurContent :is-hide-content="isHideContent">
              {{ record.revenue }}
            </BlurContent>
          </span>
            </template>
          </a-table>
        </div>
      </a-table>
    </div>
  </div>
</template>


<style lang="scss">
.PlatformChart {
  width: 100%;

  .platform-table {
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
.PlatformChart {
  display: flex;
  align-items: center;

  .platform-chart-inner-box {
    width: 100%;
    height: 100%;

    position: absolute;
    top: -5px;
    left: 0px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    pointer-events: none;

    .platform-chart-inner-value {
      width: 120px;
      height: 120px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      border-radius: 50%;

      box-shadow: 0 0 40px 4px rgba(15, 18, 63, 0.1);

      text-align: center;
      margin-bottom: 30px;
      color: #241E46;

      .name {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
      }

      .value {
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
      }
    }
  }

  .platform-table {
    border: 1px solid #EEEBFF;
    border-radius: 16px;

    overflow: hidden;


    .platform-column {
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
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
}
</style>
