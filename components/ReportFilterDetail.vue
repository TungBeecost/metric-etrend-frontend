<script setup lang="ts">
import {defineProps, computed} from 'vue';
import moment from "moment/moment";
import allReports from "public/file_json/list_category.json";

type Breadcrumb = {
  name: string;
  value: string | null;
};

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  breadcrumbs: {
    type: Array as () => Breadcrumb[],
    default: () => [],
  },
});

const showDetailPopup = ref(false);

const reportFilterDisplayFields = computed(() => {
  if (!props.data) {
    return [];
  }

  if (props.data.report_type === 'report_category') {
    return [
      'lst_platform_id',
      'date_range',
      'lst_bee_category_base_id',
      'is_remove_fake_sale',
    ];
  }

  return [
    'lst_platform_id',
    'date_range',
    'category',
    'lst_keyword',
    'lst_keyword_required',
    'lst_keyword_exclude',
    'is_remove_fake_sale',
  ];
});

type FieldLabels = {
  [key: string]: string;
};

type FieldValueParsers = {
  [key: string]: (value: any) => string;
};

const fieldLabel: FieldLabels = {
  lst_platform_id: 'Kênh bán hàng',
  category: 'Ngành hàng',
  lst_bee_category_base_id: 'Ngành hàng',
  lst_category_base_id: 'Ngành hàng',
  lst_keyword: 'Từ khóa',
  lst_keyword_required: 'Từ khóa bắt buộc',
  lst_keyword_exclude: 'Từ khóa loại trừ',
  is_remove_fake_sale: 'Lọc bỏ sản phẩm ảo/bất thường',
  date_range: 'Dữ liệu phân tích trong khoảng',
};

const PLATFORMS: Record<number, string> = {
  1: 'Shopee',
  2: 'Lazada',
  3: 'Tiki',
  4: 'Sendo',
};

const formatDate = (value: string | Date, format: string, inputFormat: string = "YYYYMMDD"): string => {
  return moment(value, inputFormat).format(format);
};

const fieldValueParse: FieldValueParsers = {
  lst_platform_id: (value: number[]) => {
    if (!value || value.length === 4) {
      return 'Shopee, Tiktok, Lazada, Tiki';
    }
    return value.map((platformId: number) => PLATFORMS[platformId]).join(', ');
  },
  lst_bee_category_base_id: (lst_bee_category: string[]) => lst_bee_category ? (lst_bee_category.map(bee_category => allReports.find(cat => cat.value === bee_category)?.label)).join(', ') : '',
  lst_keyword: (value: string[]) => value ? value.length > 10 ? `${value.slice(0, 10).join(', ')}...` : value.join(', ') : '',
  lst_keyword_required: (value: string[]) => value ? value.length > 10 ? `${value.slice(0, 10).join(', ')}...` : value.join(', ') : '',
  lst_keyword_exclude: (value: string[]) => value ? value.length > 10 ? `${value.slice(0, 10).join(', ')}, ...` : value.join(', ') : '',
  // lst_keyword_exclude: (value: string[]) => value ? (value).join(', ') : '',
  is_smart_queries: (value: boolean) => value ? 'Có' : 'Không',
  is_remove_fake_sale: (value: boolean) => value ? 'Loại trừ sản phẩm có tỉ lệ đánh giá / lượt bán thấp hơn 5%' : 'Không',
  date_range: () => {
    const {start_date, end_date} = props.data.filter_custom;
    return `${formatDate(start_date, 'DD/MM/YYYY')} - ${formatDate(end_date, 'DD/MM/YYYY')}`;
  },
  category: () => {
    const breadcrumbs = props.breadcrumbs.slice(1, -1);
    return breadcrumbs.map((breadcrumb: Breadcrumb) => breadcrumb.name).join(' / ');
  },
};
</script>

<template>
  <div class="report-filter">
    <div class="report-filter-title">
      <!--      <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>-->
      <!--      </svg>-->
      <h2 class="title">
        Phạm vi báo cáo
      </h2>
    </div>
    <div class="report-filter-content">
      <div v-for="field in reportFilterDisplayFields" :key="field">
        <div class="report-filter-field">
          <div class="report-filter-field-title">
            {{ fieldLabel[field] }}
          </div>
          <div class="report-filter-field-value">
            {{ fieldValueParse[field] ? fieldValueParse[field](props.data.data_filter_report[field]) : 'N/A' }}
          </div>
        </div>
      </div>
<!--      <a-button type="link" @click="showDetailPopup = true">-->
<!--        Xem chi tiết-->
<!--      </a-button>-->
    </div>

    <a-modal v-model:visible="showDetailPopup" title="Chi tiết báo cáo" width="800px">
      <pre>{{ props.data.data_filter_report }}</pre>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
.report-filter {
  padding: 24px;

  border: 1px solid #EEEBFF;
  background: #fff;

  border-radius: 16px;


  .report-filter-title {
    //display: flex;
    gap: 16px;
    margin-bottom: 16px;


    .title {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
    }
  }

  .report-filter-content {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .report-filter-field {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .report-filter-field-title {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;

        color: #716B95;
      }

      .report-filter-field-value {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;

        color: #241E46;
      }
    }
  }
}

@media (max-width: 768px) {
  .report-filter {
    padding: 16px;
    //border: none;
  }
}
</style>
