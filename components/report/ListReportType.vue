<script setup lang="ts">
import {LIST_REPORT_TYPES, NAVIGATIONS} from '~/constant/constains';
import type { TypeIcon } from "~/components/CustomIcon/index.vue";

function handleClick(report: any) {
  navigateTo(`${NAVIGATIONS.search}?report_type=${report.value}`);
}
</script>

<template>
  <div class="report-list">
    <div v-for="(report, index) in LIST_REPORT_TYPES" :key="index" class="report-item" @click="handleClick(report)">
      <div class="image">
        <CustomIcon :type="report.icon as TypeIcon" :is-custom-size="false"/>
      </div>
      <div style="display: flex; gap: 8px; flex-direction: column">
        <div class="title">{{ report.title }}</div>
        <div class="content">{{ report.content }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.report-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0;

  .report-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #EEEBFF;
    background: #FFF;
    gap: 20px;
    cursor: pointer;
    width: 100%;

    .title {
      font-size: 18px;
      font-weight: 700;
      color: #241E46;
    }

    .content {
      font-size: 12px;
      color: #716B95;
    }

    .image {
      width: 40px;
      height: 40px;
    }
  }
}

@media (max-width: 768px) {
  .report-list {
    gap: 16px;
    padding: 16px 0;
  }

  .report-item {
    flex-direction: column;
    padding: 12px;
    border-radius: 8px;
  }

  .title {
    font-size: 16px;
  }

  .content {
    font-size: 12px;
  }

  .image {
    width: 32px;
    height: 32px;
  }
}
</style>
