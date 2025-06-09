<template>
  <highchart :options="chartOptions" class="trend-line-chart"></highchart>
</template>

<script setup>
import { computed } from 'vue';
import Highcharts from 'highcharts';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  categories: {
    type: Array,
    default: () => [],
  },
  yAxisTitle: {
    type: String,
    default: '',
  },
  seriesName: {
    type: String,
    default: 'Trend',
  }
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'line',
      height: 400,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    title: {
      text: props.title || null,
      style: {
        fontFamily: "Inter, sans-serif",
        fontWeight: '700',
        fontSize: '16px',
        color: '#241E46'
      },
    },
    xAxis: {
      categories: props.categories,
      labels: {
        style: {
          fontFamily: "Inter",
          fontSize: '12px',
        },
        rotation: -45,
        align: 'right'
      },
      lineColor: '#E5E7EB',
      tickColor: '#E5E7EB',
    },
    yAxis: {
      title: {
        text: props.yAxisTitle,
        style: {
          fontFamily: "Inter",
          fontSize: '12px',
        }
      },
      labels: {
        style: {
          fontFamily: "Inter",
          fontSize: '12px',
        },
        formatter: function() {
          if (this.value >= 1000) {
            return this.value/1000 + ' tỷ';
          } else if (this.value >= 750) {
            return this.value + ' triệu';
          } else if (this.value >= 500) {
            return this.value + ' triệu';
          } else if (this.value >= 250) {
            return this.value + ' triệu';
          } else {
            return this.value;
          }
        }
      },
      gridLineColor: '#E5E7EB',
      min: 0,
      tickPositions: [0, 250, 500, 750, 1000]
    },
    series: [{
      name: props.seriesName,
      data: props.data,
      color: '#E85912',
      marker: {
        enabled: true,
        radius: 5,
        symbol: 'circle'
      },
      lineWidth: 2,
    }],
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: {
        fontFamily: "Inter",
        color: '#6B7280',
        fontWeight: 'normal'
      }
    },
    credits: { enabled: false },
    tooltip: {
      formatter: function() {
        return `<b>${this.x}</b><br/>${props.seriesName}: ${this.y} triệu`;
      }
    },
    plotOptions: {
      line: {
        marker: {
          enabled: true
        }
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 768,
        },
        chartOptions: {
          chart: {
            height: 300,
          },
          xAxis: {
            labels: {
              rotation: -90
            }
          }
        }
      }]
    },
  };
});
</script>

<style scoped>
.trend-line-chart {
  width: 100%;
  margin: 0;
}
</style>