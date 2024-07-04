<script setup lang="ts">

</script>

<template>
  <div class="report_content">
    <div class="statistic-item__title">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
      </svg>
      <div>
        <div class="statistic-item__title">Nội dung báo cáo</div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        I. Tổng quan chung
      </div>
      <ul>
        <li>Quy mô thị trường</li>
        <li>Thống kê doanh thu theo tháng</li>
        <li>Thị phần các sàn TMĐT</li>
      </ul>
      <div class="title">
        II. Phân khúc giá
      </div>
      <ul>
        <li>Doanh thu theo phân khúc giá và sàn</li>
      </ul>
      <div class="title">
        III. Thương hiệu
      </div>
      <ul>
        <li>Top thương hiệu theo doanh số</li>
        <li>Top thương hiệu theo số sản phẩm đã bán</li>
      </ul>
      <div class="title">
        IV. Gian hàng hàng đầu
      </div>
      <ul>
        <li>Thống kê top gian hàng</li>
        <li>Tỉ trọng doanh số theo loại gian hàng</li>
      </ul>
      <div class="title">
        V. Sản phẩm bán chạy
      </div>
      <ul>
        <li>Top sản phẩm doanh thu cao nhất</li>
      </ul>
      <div class="title">
        VI. Top sản phẩm mới đang bán chạy
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.report_content{
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
  color: #241E46;
}
.content{
  font-size: 14px;
  line-height: 24px;
}
.title{
  font-size: 16px;
  font-weight: 600;
  color: #241E46;
}
ul{
  padding-left: 16px;
}
li{
  margin-top: 8px;
}
</style>