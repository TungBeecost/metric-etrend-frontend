<script setup lang="ts">

import ListReportType from "~/components/report/ListReportType.vue";
</script>

<template>
  <div class="report_type default_section">
    <div class="title_report_type">
      <div class="title">Khám phá theo loại báo cáo</div>
      <div class="content">Cập nhật ngay những báo cáo xu hướng mới nhất giúp bạn nắm bắt kịp thời biến động thị trường
        và đưa ra quyết định đầu tư chính xác.</div>
    </div>
    <div class="lst_report_type">
      <list-report-type/>
    </div>

  </div>
</template>

<style scoped lang="scss">
.report_type{
  padding-top: 200px;
  padding-bottom: 100px;
}
</style>