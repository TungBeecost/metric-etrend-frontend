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
        Tổng quan
      </div>
      <ul>
        <li>Quy mô thị trường</li>
        <li>Doanh số, sản phẩm đã bán theo tháng</li>
        <li>Tỷ trọng doanh số theo sàn</li>
      </ul>
      <div class="title">
        Phân khúc giá
      </div>
      <ul>
        <li>Doanh số, sản phẩm đã bán theo phân khúc giá</li>
      </ul>
      <div class="title">
        Thương hiệu
      </div>
      <ul>
        <li>Top thương hiệu theo doanh số</li>
        <li>Top thương hiệu theo sản lượng bán</li>
      </ul>
      <div class="title">
        Gian hàng hàng đầu
      </div>
      <ul>
        <li>Tỷ trọng doanh số theo loại gian hàng</li>
        <li>Thống kê top gian hàng hàng đầu</li>
      </ul>
      <div class="title">
        Sản phẩm bán chạy
      </div>
      <ul>
        <li>Top sản phẩm bán chạy</li>
      </ul>
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