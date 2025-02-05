<script setup lang="ts">
import {computed} from "vue";

interface Report {
  value: string;
  icon: any;
  label: string;
}
const router = useRouter();
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

const handleClick = (report: Report) => {
  window.open(`https://metric.vn/analytics?category=${report.value}`, '_blank');
};
const displayedReports = computed(() => {
  return props.showMore ? props.reports : props.reports.slice(0, 12);
});
</script>

<template>
  <div>
    <div
        v-for="(report, index) in displayedReports"
        :key="index"
        @click="handleClick(report)"
        class="item_discover"
    >
      <div class="image-metric">
        <component :is="report.icon"/>
      </div>
      <div class="title">{{ report.label }}</div>
    </div>
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

  .image-metric {
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
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 768px) {
  .item_discover {
    gap: 16px;
    padding: 16px;
    .image-metric {
      width: 24px;
      height: 24px;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    .title {
      font-size: 16px;
    }
  }
}
</style>
