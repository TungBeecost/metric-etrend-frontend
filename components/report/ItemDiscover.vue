<script setup lang="ts">
import {computed} from "vue";

interface Report {
  category_report_id: string;
  image: string;
  title: string;
  url: string;
}

const props = defineProps({
  showMore: {
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
        <!--        <img :src="report.image" alt="icon"/>-->
        <component :is="report.image"/>
      </div>
      <div class="title">{{ report.title }}</div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.item_discover {
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

  transition: all 0.3s;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    border-radius: var(--radius-2xl, 16px);
    border: 1px solid var(--Volcano-volcano-3, #F5B899);
    background: var(--Volcano-volcano-1, #FDEEE7);

    color: var(--Volcano-volcano-6, #E85912);
  }

  .image {
    width: 40px;
    height: 40px;

    svg {
      width: 40px;
      height: 40px;

      * {
        fill: none;
      }
    }
  }

  .title {
    font-size: 20px;
  }
}
</style>

<!--<style lang="scss">-->
<!--.item_discover {-->
<!--  .image {-->
<!--    svg {-->
<!--      fill: none;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->