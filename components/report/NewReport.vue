<script setup lang="ts">
import ItemNewReport from './ItemNewReport.vue';
</script>

<template>
  <div class="new_report">
    <div class="title_new_report">
      Báo cáo mới nhất
    </div>
    <item-new-report />
  </div>
</template>

<style scoped lang="scss">
.new_report {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;

  .title_new_report {
    margin-bottom: 16px;
    color: #FFF;
    font-size: 24px;
    font-weight: bold;
  }
}

@media (max-width: 1023px) {
  .new_report {
    gap: 16px;

    .title_new_report {
      font-size: 20px;
    }
  }
}
</style>

