<script setup lang="ts">

import ListReportType from "~/components/report/ListReportType.vue";
</script>

<template>
  <div class="report_type default_section">
    <div class="title_report_type">
      <div class="title">Khám phá nền tảng 1 triệu báo cáo thị trường bán lẻ TMĐT</div>
      <div class="content">Tìm kiếm báo cáo theo nhu cầu của bạn để hiểu sâu hơn thị trường và hành vi mua hàng của người tiêu dùng.</div>
    </div>
    <div class="lst_report_type">
      <list-report-type/>
    </div>

  </div>
</template>

<style scoped lang="scss">
.report_type {
  padding-top: 200px;
  padding-bottom: 100px;

  .title_report_type {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
    padding-bottom: 40px;

    .title {
      font-size: 36px;
      font-weight: 700;
      line-height: 48px;
      color: #241E46;
    }

    .content {
      font-size: 20px;
      color: #716B95;
    }
  }
}

@media (max-width: 768px) {
  .report_type {
    padding-top: 100px;
    padding-bottom: 50px;

    .title_report_type {
      padding-bottom: 20px;

      .title {
        font-size: 24px;
        line-height: 32px;
      }

      .content {
        font-size: 16px;
      }
    }
  }
}
@media (max-width: 1380px) {
  .report_type {
    padding-top: 150px;
    padding-bottom: 75px;

    .title_report_type {
      padding-bottom: 30px;

      .title {
        font-size: 30px;
        line-height: 40px;
      }

      .content {
        font-size: 18px;
      }
    }
  }
}
</style>
