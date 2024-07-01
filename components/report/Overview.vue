<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => {
    },
  },
});

interface Platform {
  name: string;
}

console.log(props.data);
</script>

<template>
  <div class="overview">
    <div class="statistic-item__title">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
      </svg>
      <div>
        <div class="statistic-item__title">Tổng quan</div>
      </div>
    </div>
    <div class="content">
      <div>
        Báo cáo nghiên cứu thị trường {{props.data.name}} trên sàn Thương mại điện tử
        {{ props.data.data_analytic.by_marketplace.lst_marketplace.map((platform: Platform) => platform.name).join(', ') }}
        từ tháng {{ props.data.filter_custom.start_date.slice(4,6) + '/' + props.data.filter_custom.start_date.slice(0,4) }}
        đến tháng {{ props.data.filter_custom.end_date.slice(4,6) + '/' + props.data.filter_custom.end_date.slice(0,4) }},
        được thực hiện bởi
        <a style="color: #E85912" href="https://metric.vn/" target="_blank">Metric.vn - Nền tảng phân tích số liệu thị trường</a>.
      </div>
      <br/>
      <div>
        Báo cáo doanh thu {{ props.data.name }} trên sàn TMĐT FILL THEM VAO trong 12 tháng và so với quý gần nhất giảm.
        FILL THEM VAO %. Đánh giá thị trường {{ props.data.name }}, các Shop kinh doanh có thể bán với mức giá phổ biến
        từ FILL THEM VAO đến FILL THEM VAO. Thương hiệu {{ props.data.name }} được phân phối và bán chạy nhất là
        FILL THEM VAO v.v...
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overview{
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #EEEBFF;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
</style>