<script setup lang="ts">
import EmptyReport from "~/components/account/EmptyReport.vue";
import ListReport from "~/components/report/ListReport.vue";
import type {ListClaimed} from "~/services/reports";
import {ref} from "vue";

const props = defineProps({
  data: {
    type: Array as () => ListClaimed[] | null,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
});

const current = ref(1);
const onChange = async (page: number) => {
  current.value = page;
};
</script>

<template>

  <div id="detailed_reports_viewed">
    <div class="detailed_reports_viewed_header default_section">
      <svg data-v-ebf597eb="" width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg"
           style="margin-right: 10px;">
        <rect data-v-ebf597eb="" width="16" height="32" rx="4" fill="#EEEBFF"></rect>
      </svg>
      <div class="detailed_reports_viewed_header_title">Báo cáo chi tiết đã xem</div>
    </div>
    <div class="detailed_reports_viewed_content default_section">
      <div v-if="props.data" style="display: flex; flex-direction: column; gap: 24px">
        <list-report :data="props.data"/>
        <div class="page">
          <a-pagination v-model:current="current" :total="props.total" show-less-items @change="onChange" />
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
    align-items: center;
    gap: 16px;
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
  .detailed_reports_viewed_content {
    padding-top: 40px;
  }

}

@media (max-width: 424px) {
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