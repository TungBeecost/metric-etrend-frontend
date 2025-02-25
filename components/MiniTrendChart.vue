<template>
  <highchart :options="chartOptions" class="mini-chart"></highchart>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Highcharts from 'highcharts';
import { defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const chartOptions = computed(() => {
  const revenueData = props.data.revenue_by_month
      ? props.data.revenue_by_month.map(item => item.revenue)
      : props.data.by_overview.map(item => item.revenue);

  return {
    chart: {
      type: 'areaspline',
      height: 50,
      backgroundColor: 'transparent',
      margin: [0, 0, 0, 0], // Remove padding
    },
    title: { text: null },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    series: [
      {
        data: revenueData,
        color: '#e85912',
        fillOpacity: 0.15,
        marker: { enabled: false },
        lineWidth: 2.5,
      },
    ],
    legend: { enabled: false },
    credits: { enabled: false },
    tooltip: { enabled: false },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            legend: {
              enabled: false,
            },
          },
        },
      ],
    },
  };
});
</script>

<style scoped>
.mini-chart {
  width: 250px;
  height: 50px;
}
</style>