<script setup>
import Highcharts from 'highcharts';
import { ref, defineProps, watchEffect } from 'vue';

const props = defineProps({
  series: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  isHideContent: {default: false}
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
];


const isMobile = ref(window?.innerWidth < 768);
const chartWidth = ref(!isMobile.value ? 450 : 250);

const tooltip = ref({});
const dataLabels = ref({});

watchEffect(() => {
  tooltip.value = props.isHideContent
      ? {
        enabled: true,
        formatter: function () {
          const name = ![4, 6, 8].includes(this.point.index) && this.point.categoryName?.length > 0 ? `${this.point.categoryName} ${this.point.index + 1}` : this.point.name;
          return `${name}<br/>
            <svg width="10" height="10">
              <rect width="10" height="10" style="fill:${this.point.color};stroke-width:3;stroke:rgb(0,0,0)" />
              </svg> ${this.series.name}: <strong>Đã bị ẩn</strong>`;
        },
      }
      : {
        enabled: true,
      };

  dataLabels.value = props.isHideContent
      ? {
        enabled: !isMobile.value,
        formatter: function () {
          return ![4, 6, 8].includes(this.point.index) && this.point.categoryName?.length > 0 ? `<span style="color: #8c8c8c">Đã ẩn</span>` : '<span>' + this.point.name + '</span>: ' + '<span style="color: #E85912">' + Highcharts.numberFormat(this.percentage, 1, ',') + '%</span>';
        },
      }
      : {
        enabled: !isMobile.value,
        formatter: function () {
          return '<span>' + this.point.name + '</span>: ' + '<span style="color: #E85912">' + Highcharts.numberFormat(this.percentage, 1, ',') + '%</span>';
        },
      };
});

const chartOptions = ref({});

watchEffect(() => {
  const seriesWithColors = props.series.map(series => ({
    ...series,
    color: colors[series.name],
  }));

  chartOptions.value = {
    chart: {
      type: "pie",
      width: chartWidth.value,
      // height: chartWidth.value,
      style: {
        fontFamily: "Montserrat, Inter, sans-serif",
      },
    },
    tooltip: tooltip.value,
    plotOptions: {
      pie: {
        colors: colors,
        dataLabels: {
          ...dataLabels.value,
          style: {
            fontFamily: "Inter",
            fontSize: '12px',
            fontWeight: 'normal',
            textOutline: '0px',
          },
        },
        showInLegend: isMobile.value,
        size: '50%',
        innerSize: '50%',
      },
    },
    title: {
      text: props.title,
      style: {
        fontFamily: "Montserrat, Inter, sans-serif",
        fontWeight: '700',
        fontSize: '16px',
        colr: '#241E46'
      },
    },
    subtitle: {
      text: props.subtitle,
      style: {
        fontFamily: "Inter",
      },
    },
    series: seriesWithColors.length ? seriesWithColors : [],
    accessibility: {
      enabled: false
    }
  };
});
</script>

<template>
  <highchart :options="chartOptions"/>
</template>