<script setup lang="ts">
import type SearchReport from "~/components/search/search-report.vue";
import {NAVIGATIONS} from "~/constant/constains";

const recommendSearch = ["Ngành hàng Mẹ & Bé", "Ngành hàng Điện tử", "Thời trang Nam", "Điện Máy"]

const onClickSuggestion = (suggestion: string) => {
  navigateTo(`${NAVIGATIONS.search}?search=${suggestion}`);
}
</script>

<template>
  <div class="poster_detail_report">
    <div class="title">
      Truy cập kho dữ liệu với hàng trăm <br/> báo cáo và xu hướng mới nhất
    </div>
    <div class="searchContent">
      <SearchReport class="searchBox" />
      <div class="recommendSearch">
        <div class="content_key">Từ khoá liên quan nổi bật</div>
        <AButton ghost v-for="(item, index) in recommendSearch" :key="index" class="recommendItem" @click="onClickSuggestion(item)">
          {{ item }}
        </AButton>
      </div>
    </div>
<!--    <div class="big_logo_metric">-->
<!--      <img src="/images/big_logo_metric.svg" alt="">-->
<!--    </div>-->
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

  .searchContent{
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: 0 200px;

    .recommendSearch{
      display: flex;
      gap: 16px;
      justify-content: center;
      align-items: center;

      .content_key{
        font-size: 16px;
        font-weight: 700;
        color: #FFF;
        margin-right: 16px;
      }
    }
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