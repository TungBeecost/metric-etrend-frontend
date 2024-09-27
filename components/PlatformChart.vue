<script setup>
import {computed, ref} from 'vue';
import {getPlatformById} from "~/helpers/PermissionPlatformHelper";
import {formatSortTextCurrency} from "~/helpers/utils.js";
import Highcharts from "highcharts";


const {data, isHideContent} = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  isHideContent: {
    type: Boolean,
    default: () => true
  }
});

const renderChart = ref(false)

// Initialize windowWidth with a default value
const windowWidth = ref(1024);

onMounted(() => {
  windowWidth.value = window.innerWidth;
  renderChart.value = true
});


const platformColors = {
  Shopee: ['#FCA14E', '#FF733F'],
  Lazada: ['#4745A5', '#241E46'],
  Tiki: ['#5BAFFE', '#366998'],
  Sendo: ['#FF6060', '#993A3A'],
  Tiktok: ['#7E7E7E', '#0C0C0C'],
};


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
    title: 'Doanh số (Đồng)',
    dataIndex: 'revenue',
    scopedSlots: {customRender: 'revenue'},
    key: 'revenue',
    width: 200,
    align: 'right',
  },
]);

const $t = (text) => text;

const chartWidth = computed(() => {
  if (windowWidth.value < 1200) {
    return 300;
  } else if (windowWidth.value < 1500) {
    return 400;
  } else {
    return 900;
  }
});

const chartOptions = computed(() => ({
    chart: {
      type: "pie",
      width: chartWidth.value || 500,
      style: {
        fontFamily: "Inter",
      },
    },
    title: {
      text: "Tỷ trọng doanh số theo sàn",
      style: {
        fontSize: '14px',
        color: '#241E46',
        fontWeight: 700,
        fontFamily: 'Inter'
      }
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
    },
    plotOptions: {
      pie: {
        cursor: "pointer",
        showInLegend: true,
        innerSize: '60%',
        borderWidth: 1,
        borderColor: null,
        dataLabels: {
          enabled: true,
          connectorShape: 'crookedLine',
          style: {
            fontSize: '12px',
            color: '#241E46',
            fontWeight: 400,
            fontFamily: 'Inter'
          },
          formatter: function () {
            if (isHideContent && this.point.name !== 'Shopee') {
              return '<span style="font-weight: 500">' + this.point.name + '</span>: ' + '<span style="color: #9D97BF; filter: blur(4px)">' + 'đã ẩn</span>';
            }

            return '<span style="font-weight: 500">' + this.point.name + '</span>: ' + '<span style="color: #E85912">' + Highcharts.numberFormat(this.percentage, 1, ',') + '%</span>';
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
        data: data.data_analytic.by_marketplace.lst_marketplace.map(({platform_id, revenue, ratio_revenue}) => ({
          name: getPlatformById(platform_id).name,
          y: revenue || ratio_revenue,
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, platformColors[getPlatformById(platform_id).name][0]],
              [1, platformColors[getPlatformById(platform_id).name][1]]
            ]
          }
        })).sort((a, b) => b.y - a.y),
      }
    ]
}));

const dataSource = computed(() => {
  return data.data_analytic.by_marketplace.lst_marketplace.map(({platform_id, revenue, ratio_revenue} = {}) => ({
    platform: getPlatformById(platform_id).name,
    platformIcon: getPlatformById(platform_id).urlLogo,
    revenue: isHideContent ? ratio_revenue.toFixed(2) : formatSortTextCurrency(revenue),
  })).sort((a, b) => b.revenue - a.revenue);
});

</script>

<template>
  <div id="platform_chart" class="PlatformChart">
    <div>
      <div style="position: relative; pointer-events: none">
        <highchart v-if="renderChart" :options="chartOptions"/>
      </div>
    </div>
    <div style="width: 100%">
      <a-table
          :columns="columns"
          :data-source="dataSource"
          :pagination="false"
          :row-key="record => record.platform"
          class="platform-table"
          size="large"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'platform'">
            <div class="platform-column">
              <img :src="record.platformIcon" class="platform-icon"/>
              <span>{{ record.platform }}</span>
            </div>
          </template>
          <template v-if="column.key === 'revenue'">
            <BlurContent :is-hide-content="isHideContent">
              {{ record.revenue }}
            </BlurContent>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>


<style lang="scss">
.platform_chart {

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
#platform_chart {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;


  .platform-chart-inner-box {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 10px;
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
      display: flex;
      align-items: center;
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

@media (max-width: 768px) {
  #platform_chart {
    .platform-table {
      margin-bottom: 16px;
    }
  }
}
</style>
