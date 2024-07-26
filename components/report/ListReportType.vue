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
  gap: 40px;
  padding: 40px 0;

  .report-item {
    display: flex;
    padding: 32px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 16px;
    border: 1px solid #EEEBFF;
    background: #FFF;
    gap: 40px;
    cursor: pointer;

    .title {
      font-size: 24px;
      font-weight: 700;
      color: #241E46;
    }

    .content {
      font-size: 14px;
      color: #716B95;
    }
  }
}
</style>