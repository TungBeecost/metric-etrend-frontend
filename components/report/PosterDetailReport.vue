<script setup lang="ts">

</script>

<template>
  <div class="poster_detail_report">
    <div class="title">
      Truy cập kho dữ liệu với hàng trăm <br/> báo cáo và xu hướng mới nhất
    </div>
    <div class="search"></div>
    <div class="big_logo_metric">
      <img src="/images/big_logo_metric.svg" alt="">
    </div>
    <div class="featured_related_keywords">
      <div class="content">Từ khoá liên quan nổi bật</div>
      <div class="lst_keyword"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.poster_detail_report{
  background: linear-gradient(270deg, #4745A5 -67.05%, #241E46 98.36%);
  padding: 60px 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  position: relative;

  .title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #FFF;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    line-height: 56px;
  }

  .featured_related_keywords{
    color: #FFF;
    font-size: 16px;
    line-height: 24px;

  }

  .big_logo_metric{
    opacity: 0.5;
    mix-blend-mode: luminosity;
    position: absolute;
    top: 0;
    right: 400px;
  }
}
</style>