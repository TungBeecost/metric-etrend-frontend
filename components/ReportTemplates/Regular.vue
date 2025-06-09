<template>
    <!-- Container Report Detail Structure -->
    <div class="container_report_detail">
      <div class="container_report_detail_left">
        <p>Regular template content</p>
        <overview :data="data?.reportDetail"/>
        <top-shop-info v-if="data?.reportDetail?.report_type === 'report_top_shop'" :data="data?.reportDetail"/>
        <report-content :data="data?.reportDetail"/>
      </div>
      <div class="container_report_detail_right">
        <div v-if="props.isStaff" style="display: flex; justify-content: flex-end">
            <a-button class="hover-button" style="display: flex; gap: 8px" @click="handleExportPdf">
                <img class="download-icon" src="/icons/Download.svg" alt="pdf"/>
                <span>Xuất báo cáo Tháng 1/2024</span>
            </a-button>
        </div>
        <indept-report-link :slug="$route.params.slug"
                           :data="data.reportDetail"
                           :show-modal-download-pdf="props.showModalDownloadPdf"
        />
        <report-filter-detail :data="data?.reportDetail"
                             :breadcrumbs="data?.breadcrumbs" class="report-filter-detail"/>
      </div>
    </div>

    <!-- Container Metric Structure -->
    <div class="container-metric default_section">
      <div class="general_overview_container">
        <relate-report class="relate_report" :recomends="recomends"/>
        <h2 class="title_main">
          {{ reportTitle }}
        </h2>
        <div class="">
          Từ tháng
          <b>{{
              data?.reportDetail?.filter_custom
                  ? data.reportDetail.start_date.slice(4, 6) + '/' + data.reportDetail.start_date.slice(0, 4)
                  : 'N/A'
            }}</b>
          đến tháng <b>{{
            data?.reportDetail?.filter_custom
                ? data.reportDetail.end_date.slice(4, 6) + '/' + data.reportDetail.end_date.slice(0, 4)
                : 'N/A'
          }}</b>
        </div>
        <general-overview :data="data?.reportDetail"/>
        <keyword-statistic v-if="data?.reportDetail?.report_type === 'report_category'" :data="data?.reportDetail"/>
        <price-range-statistic :data="data?.reportDetail"/>
        <brand-statistic v-if="data?.reportDetail?.report_type !== 'report_brand'" :data="data?.reportDetail"/>
        <top-shop-statistic :data="data?.reportDetail"/>
        <list-products :data="data?.reportDetail"/>
      </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Overview from '~/components/report/Overview.vue';
import TopShopStatistic from '~/components/report/TopShopStatistic.vue';
import ReportContent from '~/components/report/ReportContent.vue';
import IndeptReportLink from '~/components/report/IndeptReportLink.vue';
// Using global component registration for report-filter-detail
import RelateReport from '~/components/RelateReport.vue';
import GeneralOverview from '~/components/report/GeneralOverview.vue';
import KeywordStatistic from '~/components/report/KeywordStatistic.vue';
import PriceRangeStatistic from '~/components/report/PriceRangeStatistic.vue';
import BrandStatistic from '~/components/report/BrandStatistic.vue';
import ListProducts from '~/components/report/ListProducts.vue';

const route = useRoute();

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  recomends: {
    type: Array,
    default: () => []
  },
  showModalDownloadPdf: {
    type: Boolean,
    default: false
  },
  isStaff: {
    type: Boolean,
    default: false
  },
  openFormExportPdf: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:openFormExportPdf']);

const handleExportPdf = () => {
  emit('update:openFormExportPdf', true);
};

const reportTitle = computed(() => {
  return `Báo cáo tổng quan ${props.data?.reportDetail?.name || ''} - Nghiên cứu thị trường TMĐT`;
});
</script>

<!-- <style scoped>
.regular-report-template {
  width: 100%;
}

.container_report_detail {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}

.container_report_detail_left {
  flex: 0.7;
}

.container_report_detail_right {
  flex: 0.3;
}

.container-metric {
  margin-top: 48px;
}

.general_overview_container {
  width: 100%;
}

.title_main {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #241E46;
}
</style> -->