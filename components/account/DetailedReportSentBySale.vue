<script setup lang="ts">
import EmptyReport from "~/components/account/EmptyReport.vue";
import type {ListClaimed} from "~/services/reports";
import {ref} from "vue";
import ListReportDetail from "~/components/report/ListReportDetail.vue";
import ListReportDetailPdf from "~/components/report/ListReportDetailPdf.vue";
import ListReportDetailPdfSentBySale from "~/components/report/ListReportDetailPdfSentBySale.vue";

const props = defineProps({
  data: {
    type: Array as () => ListClaimed[] | null,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
  title:{
    type: String,
    default: 'Báo cáo đã gửi'
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Number,
    default: 4,
  },
});

const emit = defineEmits(["change"]);

const current = ref(1);
const onChange = async (page: number) => {
  current.value = page;
  emit("change", page);
};
</script>

<template>

  <div id="detailed_reports_viewed">
    <div class="detailed_reports_viewed_header default_section">
      <svg data-v-ebf597eb="" width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg"
           style="margin-right: 10px;">
        <rect data-v-ebf597eb="" width="16" height="32" rx="4" fill="#EEEBFF"></rect>
      </svg>
      <div class="detailed_reports_viewed_header_title">{{title}}</div>
    </div>
    <a-skeleton v-if="loading" class="default_section" :paragraph="{ rows: 10 }"/>
    <div v-else class="detailed_reports_viewed_content default_section">
      <div v-if="props.data?.length" style="display: flex; flex-direction: column; gap: 24px; margin: 24px">
        <list-report-detail-pdf-sent-by-sale :data="props.data"/>
        <div class="page">
          <a-pagination v-model:current="current" :total="props.total" :page-size="pageSizes" show-less-items @change="onChange" />
        </div>
      </div>
      <div v-else>
        <empty-report/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#detailed_reports_viewed {
  .detailed_reports_viewed_header {
    display: flex;
    padding: 24px;
    gap: 8px;
    border-radius: 8px 8px 0 0;
    border: 1px solid #EEEBFF;
    background: #FFF;

    .detailed_reports_viewed_header_title {
      font-size: 20px;
      color: #241E46;
      font-weight: 700;
      line-height: 28px;
    }

  }

  .detailed_reports_viewed_content {
    border-radius: 0 0 16px 16px;
    border: 1px solid #EEEBFF;
    background-color: #FFF;
  }
}

.page {
  display: flex;
  justify-content: center;
  padding-bottom: 24px   ;
}

@media (max-width: 767px) {
  .detailed_reports_viewed_header{
    flex-direction: row;
  }

  .page{
    padding-bottom: 0;
  }
}

</style>

<style lang="scss">
#detailed_reports_viewed{
  .ant-pagination {
    .ant-pagination-item {
      background-color: #F5F5F5;
      border-radius: 8px;

      a {
        background-color: #F5F5F5;
        border-radius: 8px;
      }
    }

    .ant-pagination-item-active {
      background-color: #E85912;
      color: #FFFFFF;

      a {
        background-color: #E85912;
        color: #FFFFFF;
      }
    }

    .ant-pagination-options {
      display: none;
    }
  }
}
</style>