<script setup lang="ts">

</script>

<template>
  <div class="empty_report">
    <div class="empty_report_container">
      <img loading="lazy" src="/icons/Empty-report.svg" alt="empty-report" />
      <div class="content">
        <div class="content_noti">Chưa có báo cáo đã xem</div>
        <div class="content_info">Dữ liệu hiện tại đang trống</div>
      </div>
      <a-button style="height: 40px" class="button" href="/reports">
        <span>Khám phá ngay</span>
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.empty_report{
  padding-top: 40px;
  padding-bottom: 140px;
  border-radius: 0 0 16px 16px;
  border-left: 1px solid #EEEBFF;
  border-right: 1px solid #EEEBFF;
  border-bottom: 1px solid #EEEBFF;
  background-color: #FFF;

  .empty_report_container{
    display: flex;
    padding: 0 24px;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    .content{
      .content_noti{
        text-align: center;
        font-size: 24px;
        color: #241E46;
        font-weight: 700;
        line-height: 32px;
      }

      .content_info{
        text-align: center;
        font-size: 16px;
        color: #716B95;
        line-height: 24px;
      }
    }

    .button{
      display: flex;
      padding: 9px 16px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      background-color: #E85912;
      text-decoration: none;

      span{
        color: #FAF9FF;
        text-align: center;
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
}
</style>
