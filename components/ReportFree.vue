<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { SearchReportPayload } from '~/services/reports';
import { REPORT_ENDPOINTS } from '~/constant/endpoints';
import ItemFeatureReportFree from '~/components/ItemFeatureReportFree.vue';
import { NAVIGATIONS } from '~/constant/constains';

const config = useRuntimeConfig();
const isLoading = ref(true);
const lstReport = ref([]);

const fetchReport = async () => {
  try {
    const body: SearchReportPayload = {
      limit: 10,
      lst_field: ["name", "slug", "url_thumbnail", "revenue_monthly", "gr_quarter", "shop", "created_at"],
      lst_query: [],
      lst_category_report_id: [],
      offset: 0,
      sort: "popularity",
      source: ["marketing"],
    };
    const { lst_report }: any = await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.search.endpoint}`, {
      method: 'POST',
      body
    });
    lstReport.value = lst_report;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchReport();
});

const handleButtonFree = () => {
  navigateTo(`${NAVIGATIONS.search}?price_type=marketing`);
};
</script>

<template>
  <div class="report_free">
    <div class="tile_report_free default_section">
      <div class="title">Báo Cáo Miễn Phí</div>
      <div class="content">Truy cập ngay lập tức và không giới hạn kho báo cáo thị trường Thương mại điện tử.</div>
    </div>
    <div v-if="isLoading" class="detail_report_free default_section">
      <a-skeleton />
    </div>
    <div v-else class="detail_report_free default_section">
      <item-feature-report-free :reports="lstReport.slice(0, 10)" />
    </div>
    <img src="/images/background-search.png" class="background">
    <a-button style="height: 40px; z-index: 2; padding: 9px 16px; font-weight: 500; margin-top: 24px" @click="handleButtonFree">Xem thêm</a-button>
  </div>
</template>

<style scoped lang="scss">
.report_free {
  display: flex;
  padding: 60px 0;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  background: var(--Gradient, linear-gradient(270deg, #4745A5 0%, #241E46 98.36%));
  position: relative;

  .tile_report_free {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    z-index: 2;

    .title {
      text-align: center;
      line-height: 48px;
      font-size: 36px;
      font-weight: 700;
      color: #FFFFFF;
    }

    .content {
      text-align: center;
      line-height: 32px;
      font-size: 20px;
      font-weight: 400;
      color: #FFFFFF;
    }
  }

  .detail_report_free {
    padding: 40px 0;
    z-index: 2;
    animation: fadeIn 0.5s ease-out forwards;
  }

  .background {
    width: 100%;
    opacity: 0.2;
    position: absolute;
    object-fit: fill;
    top: 0;
    left: 0;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .report_free {
    padding: 40px 0;
    gap: 24px;

    .tile_report_free {
      .title {
        font-size: 24px;
        line-height: 36px;
      }

      .content {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
}
</style>
