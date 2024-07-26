<script setup lang="ts">
import { LIST_REPORT_TYPES } from '~/constant/constains';
</script>

<template>
  <div class="report-list">
    <div v-for="(report, index) in LIST_REPORT_TYPES" :key="index" class="report-item">
      <div>
        <div class="image">
          <image :src="report.icon" />
        </div>
        <div class="title">{{ report.title }}</div>
        <div class="content">{{ report.content }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.report-list{
  display: flex;
  gap: 40px;
  padding: 40px 0;
}
</style>