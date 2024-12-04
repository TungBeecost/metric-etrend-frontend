<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import moment from "moment/moment";
import {NAVIGATIONS} from "~/constant/constains";

const { reports } = defineProps({
  reports: {
    type: Array<any>,
    default: () => []
  }
});
const router = useRouter();
const showMore = ref(false);

const windowWidth = ref(0);
const isMobile = ref(false);

onMounted(() => {
  windowWidth.value = window.innerWidth;
  isMobile.value = window.innerWidth < 768;
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    isMobile.value = window.innerWidth < 768;
  });
});

const displayedReports = computed(() => {
  return isMobile.value && !showMore.value ? reports.slice(0, 3) : reports;
});

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

const splitReports = computed(() => {
  const mid = Math.ceil(displayedReports.value.length / 2);
  return [displayedReports.value.slice(0, mid), displayedReports.value.slice(mid)];
});

const formatDate = (value: string | Date, format: string = 'DD/MM/YYYY', inputFormat: string = "YYYY-MM-DD HH:mm:ss"): string => {
  return moment(value, inputFormat).format(format);
}

const navigateToReport = (report: any) => {
  router.push(`${NAVIGATIONS.home}insight/${report.slug}`);
};
</script>

<template>
  <div class="item_metric_release">
    <div class="column" v-for="(columnReports, index) in splitReports" :key="index">
      <div v-for="report in columnReports" :key="report.id" class="item" @click="navigateToReport(report)">
        <div class="image">
          <img :src="report.url_thumbnail" alt="url_thumbnail" />
        </div>
        <div class="content">
          <div class="title">{{ report.name }}</div>
          <div class="description">Báo cáo Community | {{formatDate(report.created_at)}}</div>
        </div>
      </div>
    </div>
    <button v-if="isMobile" @click="toggleShowMore" class="show-more-btn">
      {{ showMore ? 'Ẩn bớt' : 'Xem thêm' }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.item_metric_release {
  display: flex;
  gap: 24px;
  flex-wrap: wrap; /* Allow wrapping for responsiveness */
}

.item {
  display: flex;
  border-radius: 12px;
  border: 1px solid #EEEBFF;
  cursor: pointer;
  .image {
    height: 124px;
    width: 180px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    img {
      width: 180px;
      height: 124px;
      object-fit: cover;
      border-radius: 12px 0 0 12px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 16px;
    .title {
      color: var(--Dark-blue-dark-blue-8, #241E46);
      font-size: 20px;
      font-weight: 700;
      line-height: 28px;
    }

    .description {
      color: var(--Dark-blue-dark-blue-5, #716B95);
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
  }
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.show-more-btn {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  color: #1890FF;
}

@media (max-width: 768px) {
  .item_metric_release {
    flex-direction: column; /* Stack columns vertically */
  }

  .item {
    flex-direction: row; /* Place image next to content */
    .image {
      width: 50%;
      height: auto;
      img {
        width: 100%;
        height: auto;
        border-radius: 12px 0 0 12px;
      }
    }
    .content {
      width: 50%;
      padding: 16px;
      .title {
        font-size: 18px;
        line-height: 24px;
      }
      .description {
        display: none; /* Hide description on mobile */
      }
    }
  }
}
</style>