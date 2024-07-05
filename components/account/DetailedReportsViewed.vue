<script setup lang="ts">

import EmptyReport from "~/components/account/EmptyReport.vue";
import ListReport from "~/components/report/ListReport.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import type {SearchReportRes} from "~/services/reports";

const fetchTableData = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api-web.metric.vn/api/report/search',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        'lst_category_report_id': ['c1189843250'],
        'lst_query': [],
        'lst_field': ['name', 'slug', 'url_thumbnail', 'revenue_monthly', 'gr_quarter', 'shop'],
        'offset': 0,
        'limit': 12,
        'sort': 'popularity'
      }
    });
    data.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const data = ref<SearchReportRes | null>(null);

onMounted(() => {
  fetchTableData();
});

</script>

<template>
  <div id="detailed_reports_viewed">
    <div class="detailed_reports_viewed_header default_section">
      <svg data-v-ebf597eb="" width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;"><rect data-v-ebf597eb="" width="16" height="32" rx="4" fill="#EEEBFF"></rect></svg>
      <div class="detailed_reports_viewed_header_title">Báo cáo chi tiết đã xem</div>
    </div>
    <div class="detailed_reports_viewed_content default_section">
      <div v-if="data">
        <list-report :data="data?.lst_report" :total="data.total"/>
      </div>
      <div v-else>
        <empty-report />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#detailed_reports_viewed{
  .detailed_reports_viewed_header{
    display: flex;
    padding: 24px;
    align-items: center;
    gap: 16px;
    border-radius: 8px 8px 0 0;
    border: 1px solid #EEEBFF;
    background: #FFF;

    .detailed_reports_viewed_header_title{
      font-size: 20px;
      color: #241E46;
      font-weight: 700;
      line-height: 28px;
    }

  }
  .detailed_reports_viewed_content{
    border-radius: 0 0 16px 16px;
    border: 1px solid #EEEBFF;
    background-color: #FFF;
  }
}

@media (min-width: 1919px) {
  .default_section {
    width: calc(100% - 600px);
    margin: 0 auto;
  }
}

@media (max-width: 1919px) {
  .default_section {
    width: calc(100% - 500px);
    margin: 0 auto;
  }
}

@media (max-width: 1439px) {
  .default_section {
    width: calc(100% - 300px);
    margin: 0 auto;
  }
}

@media (max-width: 1023px) {
  .default_section {
    width: calc(100% - 200px);
    margin: 0 auto;
  }
}

@media (max-width: 767px) {
  .default_section {
    width: calc(100% - 100px);
    margin: 0 auto;
  }

  #detailed_reports_viewed{
    .detailed_reports_viewed_content{
      padding-top: 40px;
    }
  }
}

@media (max-width: 424px) {
  .default_section {
    width: calc(100% - 50px);
    margin: 0 auto;
  }
}
</style>