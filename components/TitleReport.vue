<script setup lang="ts">

import NewReport from "~/components/NewReport.vue";
import Discover from "~/components/Discover.vue";
import FeaturedReport from "~/components/FeaturedReport.vue";
</script>

<template>
  <div class="title_report">
    <div class="image">
      <img src="/Hero_banner.png" alt="">
      <div class="title">
        <div class="content default_section">
          <div class="report_title">Báo cáo</div>
          <div class="description">Cung cấp thông tin chi tiết về doanh số và sản lượng bán hàng của các sản phẩm theo từng ngành hàng trên các sàn, Cung cấp thông tin chi tiết về doanh số và sản lượng bán hàng của các sản phẩm theo từng ngành hàng trên các sàn.</div>
        </div>
        <div class="new_report default_section">
          <new-report />
        </div>
      </div>
    </div>
    <discover />
    <featured-report />
  </div>
</template>

<style scoped lang="scss">
.title_report{
  width: 100%;
  height: 100%;
  .image {
    width: 100%;
    padding-bottom: 100px;
    position: relative;
    img {
      width: 100%;
      height: auto;
    }
    .title {
      display: flex;
      flex-direction: column;
      padding-top: 60px;
      width: 100%;
      gap: 80px;
      position: absolute;
      top: 50px;

      .content {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .report_title{
          font-size: 44px;
          font-weight: bold;
          color: #FFF;
        }

        .description {
          font-size: 16px;
          width: 500px;
          color: #FFF;
        }
      }
    }
  }


}

@media (max-width: 1919px) {
  .default_section {
    flex-direction: row;
    width: calc(100% - 200px);
    margin: 0 auto;
  }
}

@media (max-width: 1439px) {
  .default_section {
    flex-direction: row;
    width: calc(100% - 200px);
    margin: 0 auto;
  }
}

@media (max-width: 1023px) {
  .default_section {
    flex-direction: row;
    width: calc(100% - 200px);
    margin: 0 auto;
  }
}

@media (max-width: 767px) {
  .default_section {
    flex-direction: row;
    width: calc(100% - 200px);
    margin: 0 auto;
  }
}

@media (max-width: 424px) {
  .default_section {
    flex-direction: row;
    width: calc(100% - 100px);
    margin: 0 auto;
  }
  .title_report{
    .image {
      .title {
        padding-top: 20px;
        gap: 40px;
        .content {
          .report_title{
            font-size: 36px;
          }
          .description {
            font-size: 14px;
            width: 300px;
          }
        }
      }
    }
  }
}

</style>
