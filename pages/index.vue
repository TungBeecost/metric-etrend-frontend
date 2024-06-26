<template>
  <div>
    <!-- search section -->
    <div class="section sectionSearch">
      <img src="/images/background-search.png" class="background">

      <div class="sectionHeader searchHeader">
        <p class="sectionTitle">Kho Báo Cáo <br> Ecommerce Toàn Diện</p>
        <p class="sectionDescription">Tiết kiệm thời gian nghiên cứu thị trường, giảm thiểu rủi ro đầu tư với dữ liệu chính xác nhất</p>
      </div>

      <div class="sectionContent searchContent">
        <SearchReport class="searchBox" />

        <div class="recommendSearch">
          <AButton v-for="(item, index) in recommendSearch" :key="index" class="recommendItem" @click="onClickSuggestion(item)">
            {{ item }}
          </AButton>
        </div>
      </div>

    </div>


    <!-- parter section -->
    <div class="section">
      <div class="sectionHeader">
        <p class="sectionTitle">Hơn 500+ đối tác tin cậy của Metric</p>
      </div>
      <Vue3Marquee gradient="true">
        <BrandItem v-for="(branch, index) in brands" :key="index" :src="branch" :width="device.isDesktop ? '139' : '116'" :height="device.isDesktop ? '80' : '62'" />
      </Vue3Marquee>
    </div>

    <!-- highligh section-->
    <div class="section">
      <div class="sectionHeader">
        <p class="sectionTitle">Báo cáo nổi bật</p>
        <p class="sectionDescription">Cập nhật ngay những báo cáo xu hướng mới nhất giúp bạn nắm bắt kịp thời biến động thị trường <br> <span :class="{ active: !device.isMobile }"> và đưa ra quyết
            định đầu
            tư chính xác.</span></p>
      </div>

      <div class="sectionContent">
        <div class="tmp">This is highlight block</div>
        <!-- Wait component from Bao Cao page -->
      </div>

    </div>

    <!-- testimonials section-->
    <div class="section">
      <div class="sectionHeader">
        <p class="sectionTitle">Nguồn số liệu đáng tin cậy <br> được các đơn vị truyền thông, báo chí sử dụng</p>
      </div>
      <div class="testimonialsList">
        <BrandItem v-for="(branch, index) in testimonialBrands" :key="index" :src="branch" :width="device.isDesktop ? '139' : '86'" :height="device.isDesktop ? '80' : '32'" />
      </div>
    </div>



    <!-- pricing section -->
    <div class="section">
      <!-- Wait component from Contact us page -->
      <div class="tmp">This is pricing block</div>

    </div>

    <!-- contact us section -->
    <div class="section">
      <!-- Wait component from Contact us page -->
      <div class="tmp">This is contact us block</div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type SearchReport from '../components/search/search-report.vue';
import { NAVIGATIONS } from '../helpers/constains';

const device = useDevice();

const brands = [
  "/images/branch/branch1.png",
  "/images/branch/guardian.png",
  "/images/branch/lazada.png",
  "/images/branch/shopee.png",
  "/images/branch/themobileworld.png",
  "/images/branch/tiki.png",
  "/images/branch/unilever.png"
];
const testimonialBrands = [
  "/images/branch/vietnamnet.png",
  "/images/branch/tuoitre.png",
  "/images/branch/vtv.png",
  "/images/branch/vnexpress.png",
  "/images/branch/dantri.png",
  "/images/branch/thanhnien.png",
]


const recommendSearch = ["Ngành hàng Mẹ & Bé", "Ngành hàng Điện tử", "Thời trang Nam", "Điện Máy"]

const onClickSuggestion = (suggestion: string) => {
  navigateTo(`${NAVIGATIONS.search}?search=${suggestion}`);
}

</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
