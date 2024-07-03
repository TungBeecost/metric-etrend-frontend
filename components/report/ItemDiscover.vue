<script setup lang="ts">
import {computed} from "vue";

interface Report {
  category_report_id: string;
  image: string;
  title: string;
  url: string;
}

const props = defineProps({
  showMore:{
    type: Boolean,
    default: false
  },
  reports: {
    type: Array as () => Report[],
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
        :to="{ path: '/search', query: { category_report_id: report.category_report_id }}"
        class="item_discover"
    >
      <div class="image">
        <img :src="report.image" alt="">
      </div>
      <div class="title">{{ report.title }}</div>
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