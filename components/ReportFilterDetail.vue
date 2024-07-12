<script setup lang="ts">
import {defineProps} from 'vue'
import moment from "moment/moment";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
})

const reportFilterDisplayFields = [
  'lst_platform_id',
  'lst_keyword',
  'is_smart_queries',
  'is_remove_fake_sale',
  'date_range',
  'lst_keyword_exclude',
]

type FieldLabels = {
  [key: string]: string;
}

type FieldValueParsers = {
  [key: string]: (value: any) => string;
}

const fieldLabel: FieldLabels = {
  lst_platform_id: 'Kênh bán hàng',
  lst_bee_category_base_id: 'Ngành hàng',
  lst_category_base_id: 'Ngành hàng',
  lst_keyword: 'Từ khóa',
  is_smart_queries: 'Tìm thông minh',
  is_remove_fake_sale: 'Lọc bỏ sản phẩm ảo/bất thường',
  date_range: 'Dữ liệu phân tích trong khoảng',
  lst_keyword_exclude: 'Từ khóa loại trừ',
}


const PLATFORMS: Record<number, string> = {
  1: 'Shopee',
  2: 'Lazada',
  3: 'Tiki',
  4: 'Sendo',
}

const formatDate = (value: string | Date, format: string, inputFormat: string = "YYYYMMDD"): string => {
  return moment(value, inputFormat).format(format);
}

const isExpanded = ref(false);

const fieldValueParse: FieldValueParsers = {
  lst_platform_id: (value: number[]) => {
    if (!value || value.length === 4) {
      return 'Tất cả'
    }
    return value.map((platformId: number) => PLATFORMS[platformId]).join(', ')
  },
  lst_keyword: (value: string[]) => value ? value.join(', ') : '',
  is_smart_queries: (value: boolean) => value ? 'Có' : 'Không',
  is_remove_fake_sale: (value: boolean) => value ? 'Loại trừ sản phẩm có tỉ lệ đánh giá / lượt bán thấp hơn 5%' : 'Không',
  date_range: () => {
    const {start_date, end_date} = props.data.filter_custom;
    return `${formatDate(start_date, 'DD/MM/YYYY')} - ${formatDate(end_date, 'DD/MM/YYYY')}`
  },
  lst_keyword_exclude: (value: string[]) => value ? (!isExpanded.value ? value.slice(0, 3) : value).join(', ') : '',
}

</script>

<template>
  <div class="report-filter">
    <div class="report-filter-title">
      Chi tiết bộ lọc nhóm hàng
    </div>
    <div class="report-filter-content">
      <div
          v-for="field in reportFilterDisplayFields"
          :key="field"
      >
        <div class="report-filter-field">
          <div class="report-filter-field-title">
            {{ fieldLabel[field] }}
          </div>
          <div class="report-filter-field-value">
            {{ fieldValueParse[field](props.data.data_filter_report[field]) }}
          </div>
        </div>
      </div>
      <div>
        <a-button type="link" size="small" @click="isExpanded = !isExpanded">
          {{ isExpanded ? 'Thu gọn' : 'Xem thêm' }}
          <svg
              xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
              style="margin-left: 4px;"
              :style="{ transform: isExpanded ? 'rotate(180deg) translateY(-3px)' : 'rotate(0deg) translateY(3px)' }"
          >
            <path d="M11.7949 6.17627L8.04492 9.67627L4.29492 6.17627" stroke="#E85912" stroke-width="1.3"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.report-filter {
  padding: 24px;

  border: 1px solid #EEEBFF;
  background: #fff;

  border-radius: 16px;


  .report-filter-title {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;

    margin-bottom: 16px;
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
    border: none;
  }
}
</style>
