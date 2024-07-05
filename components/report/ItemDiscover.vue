<script setup lang="ts">
import {computed} from "vue";
import type {ListCategory} from "~/services/reports";

const props = defineProps({
  showMore:{
    type: Boolean,
    default: false
  },
  reports: {
    type: Array as () => ListCategory[],
    required: true
  }
});

const displayedReports = computed(() => {
  return props.showMore ? props.reports : props.reports.slice(0, 12);
});
</script>

<template>
  <div>
    <router-link
        v-for="(report, index) in displayedReports"
        :key="index"
        :to="{ path: '/search', query: { category_report_id: report.value }}"
        class="item_discover"
    >
      <!-- There is no 'image' property in your ListCategory interface, so you might need to replace it with an appropriate property -->
      <div class="image">
        <!-- Placeholder image -->
        <img src="" alt="icon">
      </div>
      <div class="title">{{ report.label }}</div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.item_discover{
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: #241E46;
  text-decoration: none;
  padding: 24px;

  border: 1px solid #EEEBFF;
  border-radius: 8px;
  background: #FFF;

  cursor: pointer;

  .image {
    width: 40px;
    height: 40px;

    img {
      width: 100%;
    }
  }

  .title {
    font-size: 20px;
  }
}
</style>