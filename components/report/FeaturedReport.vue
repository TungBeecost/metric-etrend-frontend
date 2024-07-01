<script setup lang="ts">
import ItemFeatureReport from './ItemFeatureReport.vue';
</script>

<template>
  <div class="featured_report">
    <div class="title_content">
      <div class="tilte">Báo cáo nổi bật</div>
      <div class="content">
        <div>Cập nhật ngay những báo cáo xu hướng mới nhất giúp bạn</div>
        <div>nắm bắt kịp thời biến động thị trường và đưa ra quyết định đầu tư chính xác.</div>
      </div>
    </div>
    <item-feature-report />
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
}

.title_content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tilte {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #241E46;
}

.content {
  text-align: center;
  font-size: 20px;
  color: #716B95;
  line-height: 32px;
}
</style>
