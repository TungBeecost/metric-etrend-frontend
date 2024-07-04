<script setup lang="ts">
import ItemFeatureReport from './ItemFeatureReport.vue';
</script>

<template>
  <div class="featured_report">
    <div class="title_content">
      <div class="tittle">Báo cáo nổi bật nhất</div>
      <div class="content">
        <div>
          Cập nhật ngay những báo cáo xu hướng mới nhất giúp bạn nắm bắt kịp thời biến động thị trường và đưa ra quyết
          định đầu tư chính xác.
        </div>
      </div>
    </div>
    <item-feature-report/>
  </div>
</template>

<style scoped lang="scss">
.featured_report {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  padding-top: 60px;
  width: 100%;
  height: 100%;
  background-color: #FBFAFC;
  padding-bottom: 100px;
}

.title_content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: calc(100% - 80px)
}

.tittle {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #241E46;

  margin-bottom: 16px;
}

.content {
  text-align: center;
  font-size: 20px;
  color: #716B95;
  line-height: 32px;
}

@media (max-width: 1023px) {
  .featured_report {
    padding-top: 40px;
    gap: 32px;
  }

  .title_content {
    gap: 8px;
  }

  .tittle {
    font-size: 24px;
  }

  .content {
    font-size: 16px;
    line-height: 24px;

    .desktop-break {
      display: none;
    }
  }
}

@media (min-width: 1024px) {
  .featured_report {
    .title_content {
      .content {
        .desktop-break {
          display: inline;
        }
      }
    }
  }
}
</style>
