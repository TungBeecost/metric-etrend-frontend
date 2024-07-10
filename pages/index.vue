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
        <SearchReport class="searchBox" />

        <div class="recommendSearch">
          <AButton v-for="(item, index) in listTagSuggestions" :key="index" class="recommendItem" @click="onClickSuggestion(item)">
            {{ item }}
          </AButton>
        </div>
      </div>

    </div>

    <!-- parter section -->
    <div class="section">
      <Parters />
    </div>

    <!-- highligh section-->
    <!--    <div class="section">-->
    <ReportFeaturedReport />
    <!--    </div>-->

    <!-- testimonials section-->
    <div class="section">
      <Testimonials />
    </div>


    <!-- pricing section -->
    <div class="section planSection">
      <Plans :is-dark-title="true" />
    </div>

    <!-- contact us section -->
    <div class="">
      <ContactUs />

    </div>
  </div>
</template>

<script setup lang="ts">
import type SearchReport from '../components/search/search-report.vue';
import { NAVIGATIONS } from '~/constant/constains';
import {searchReport, type SearchReportPayload} from "~/services/reports";
import {ref} from "vue";

console.log(`This is gg tag:`, process.env.NUXT_PUBLIC_GTAG_ID);

const listTagSuggestions = ref<string[]>([]);

const fetchTagSuggest = async (value: string) => {
  console.log('fetchTagSuggest', value);
  try {
    const result = await fetchSuggest(value);
    if (result.length) {
      listTagSuggestions.value = result;
    } else {
      listTagSuggestions.value = [];
    }
  }
  catch (e) {
    console.error(e);
  }
};

const fetchSuggest = async (value: string | null, options?: SearchReportPayload) => {
  try {
    const body: SearchReportPayload = {
      limit: 5,
      lst_field: ["name", "slug"],
      offset: 0,
      sort: "popularity",
      lst_query: value ? [value] : [],
      ...options
    };
    const data = await searchReport(body);

    if (data && data.lst_report) {
      return data.lst_report.map((item) => item.name);
    } else {
      return [];
    }
  } catch (error) {
    console.error("fetchSuggest error: ", error);
    return [];
  }
};

onMounted(() => {
  fetchTagSuggest('');
});

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
      line-height: 80px;
      /* 125% */

      margin-bottom: 24px;
    }
  }
}

@media (max-width: 767px) {
  .section {
    .sectionHeader {
      .sectionTitle {
        font-size: 36px;
        line-height: 44px;
      }
    }
  }
}


</style>
