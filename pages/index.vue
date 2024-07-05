<template>
  <div>
    <!-- search section -->
    <div class="section sectionSearch">

      <div class="sectionHeader searchHeader">
        <h1 class="sectionTitle">Kho Báo Cáo <br> Ecommerce Toàn Diện</h1>
        <p class="sectionDescription">
          Tiết kiệm thời gian nghiên cứu thị trường, giảm thiểu rủi ro đầu tư với dữ liệu
          chính xác nhất
        </p>
        <img src="/images/background-search.png" class="background">
      </div>

      <div class="sectionContent searchContent">
        <SearchReport class="searchBox"/>

        <div class="recommendSearch">
          <AButton
              v-for="(item, index) in recommendSearch" :key="index" class="recommendItem"
              @click="onClickSuggestion(item)"
          >
            {{ item }}
          </AButton>
        </div>
      </div>

    </div>

    <!-- parter section -->
    <div class="section">
      <Parters/>
    </div>

    <!-- highligh section-->
    <div class="section">
      <ReportFeaturedReport/>
    </div>

    <!-- testimonials section-->
    <div class="section">
      <Testimonials/>
    </div>


    <!-- pricing section -->
    <div class="section planSection">
      <Plans :is-dark-title="true"/>
    </div>

    <!-- contact us section -->
    <div class="">
      <ContactUs/>

    </div>
  </div>
</template>

<script setup lang="ts">
import type SearchReport from '../components/search/search-report.vue';
import {NAVIGATIONS} from '~/constant/constains';

const recommendSearch = ["Ngành hàng Mẹ & Bé", "Ngành hàng Điện tử", "Thời trang Nam", "Điện Máy"]

const onClickSuggestion = (suggestion: string) => {
  navigateTo(`${NAVIGATIONS.search}?search=${suggestion}`);
}

</script>

<style lang="scss" scoped>
@import url("./index.scss");


.section {

  .sectionHeader {
    .sectionTitle {
      color: var(--Neutral-neutral-1, #FFF);
      text-align: center;
      font-size: 64px;
      font-style: normal;
      font-weight: 700;
      line-height: 80px; /* 125% */

      margin-bottom: 24px;
    }
  }
}
</style>
