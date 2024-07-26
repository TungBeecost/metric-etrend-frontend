<script setup lang="ts">
import {computed, defineEmits, defineProps, onMounted, ref} from 'vue';
import allReports from '@/public/file_json/list_category.json';
import {TreeSelect} from 'ant-design-vue';
import type {SelectValue} from "ant-design-vue/es/select";
import type {CheckboxChangeEvent} from "ant-design-vue/es/checkbox/interface";

const emit = defineEmits(['categorySelect', 'selectedReportTypeChange', 'selectedReportTypeBuyChange']);
const route = useRoute();

const selectedOption = ref('');
const selectedReportType = ref<string[]>([]);
const selectedReportTypeBuy = ref<string[]>([]);
const showSelectIndustry = ref(true);

const props = defineProps({
  selectedCategory: {
    type: String,
    default: '',
  },
});

selectedOption.value = props.selectedCategory || "c0000000000";

interface ReportItem {
  value: string;
  label: string;
  level: number;
  is_leaf: string;
  parent?: string;
  parent_name?: string;
  children?: ReportItem[];
}

const transformToTreeData = (data: ReportItem[]): ReportItem[] => {
  const treeData: ReportItem[] = [];
  const map = new Map(data.map((item: ReportItem) => [item.value, {...item, children: [] as ReportItem[]}]));

  data.forEach((item: ReportItem) => {
    if (item.parent) {
      const parent = map.get(item.parent);
      if (parent) {
        parent.children.push(map.get(item.value)!);
      }
    } else {
      treeData.push(map.get(item.value)!);
    }
  });

  return treeData;
};

const state = reactive({
  checkAll: false,
  indeterminate: false,
});

const treeData = transformToTreeData(allReports);

const handleChange = (value: SelectValue) => {
  selectedOption.value = value as string;
  emit('categorySelect', selectedOption.value === "c0000000000" ? '' : selectedOption.value);
};

onMounted(() => {
  if (route.query.category_report_id && typeof route.query.category_report_id === 'string') {
    selectedOption.value = route.query.category_report_id;
  }
});

const reportTypes = ref([
  {label: 'Tất cả', value: 'all'},
  {label: 'Báo cáo ngành hàng', value: 'report_category'},
  {label: 'Báo cáo nhóm hàng', value: 'report_product_line'},
  {label: 'Báo cáo khác', value: 'other'},
]);

const checkAll = computed({
  get: () => selectedReportType.value.length === reportTypes.value.length - 1,
  set: (value: boolean) => {
    selectedReportType.value = value ? reportTypes.value.slice(1).map(type => type.value) : [];
  },
});

const indeterminate = computed(() => {
  return selectedReportType.value.length > 0 && selectedReportType.value.length < reportTypes.value.length;
});

watch(selectedReportType, (newVal) => {
  state.checkAll = newVal.length === reportTypes.value.length;
  state.indeterminate = newVal.length > 0 && newVal.length < reportTypes.value.length;
});


const onCheckAllChange = (e: CheckboxChangeEvent) => {
  const isChecked = e.target.checked;
  checkAll.value = isChecked; // This will trigger the setter of `checkAll`
};

watch(selectedReportType, (newVal) => {
  emit('selectedReportTypeChange', newVal);
});

watch(selectedReportTypeBuy, (newVal) => {
  emit('selectedReportTypeBuyChange', newVal);
});

</script>

<template>
  <div class="filter_report">
    <div class="title" style="padding: 24px 24px 8px 24px;">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="16" fill="#FDEEE7"/>
        <g clip-path="url(#clip0_1_132574)">
          <path d="M16.625 16L9.125 16" stroke="#E85912" stroke-width="1.3" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M22.875 16L19.125 16" stroke="#E85912" stroke-width="1.3" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M10.375 21.625L9.125 21.625" stroke="#E85912" stroke-width="1.3" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M22.875 21.625L12.875 21.625" stroke="#E85912" stroke-width="1.3" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M12.875 23.5L12.875 19.75" stroke="#E85912" stroke-width="1.3" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M12.875 10.375L9.125 10.375" stroke="#E85912" stroke-width="1.3" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M22.875 10.375L15.375 10.375" stroke="#E85912" stroke-width="1.3" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M15.375 8.5L15.375 12.25" stroke="#E85912" stroke-width="1.3" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M19.125 17.875L19.125 14.125" stroke="#E85912" stroke-width="1.3" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path opacity="0.2" d="M22.875 21.625L22.875 10.375L9.125 10.375L9.125 21.625L22.875 21.625Z" fill="#E85912"/>
        </g>
        <defs>
          <clipPath id="clip0_1_132574">
            <rect width="20" height="20" fill="white" transform="translate(6 6)"/>
          </clipPath>
        </defs>
      </svg>
      <div class="title_word">Bộ lọc</div>
    </div>
    <div class="container" style="padding: 8px;">
      <a-collapse :bordered="false" style="background: rgb(255, 255, 255); padding: 0;" :active-key="[1, 2, 3]">
          <a-collapse-panel :key="1" header="Loại báo cáo">
            <a-checkbox
                :checked="checkAll"
                :indeterminate="indeterminate"
                style="margin-bottom: 8px;"
                @change="onCheckAllChange"
            >
              Tất cả
            </a-checkbox>
            <a-checkbox-group v-model:value="selectedReportType">
              <a-checkbox
                  v-for="(reportType, index) in reportTypes.slice(1)"
                  :key="reportType.value"
                  :value="reportType.value"
                  style="width: 100%;"
                  :style="index < reportTypes.length - 2 ? {marginBottom: '8px'} : {}"
              >
                {{ reportType.label }}
              </a-checkbox>
            </a-checkbox-group>
          </a-collapse-panel>
        <a-collapse-panel :key="2" header="Ngành hàng">
          <TreeSelect
              v-if="showSelectIndustry"
              v-model:value="selectedOption"
              :tree-data="treeData"
              style="width: 100%"
              @change="handleChange"
          />
        </a-collapse-panel>
        <a-collapse-panel :key="3" header="Phân loại">
          <a-checkbox-group v-model:value="selectedReportTypeBuy">
            <a-checkbox
                v-for="(reportType, index) in [{label: 'Miễn phí', value: 'marketing'}, {label: 'Trả phí', value: 'auto'}]"
                :key="reportType.value"
                :value="reportType.value"
                style="width: 100%;"
                :style="index < reportTypes.length - 1 ? {marginBottom: '8px'} : {}"
            >
              {{ reportType.label }}
            </a-checkbox>
          </a-checkbox-group>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter_report {
  display: flex;

  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 16px;
  border: 1px solid #EEEBFF;
  background-color: #FFF;

  .title {
    display: flex;
    align-items: center;
    gap: 16px;

    .title_word {
      font-size: 20px;
      font-weight: bold;
      color: #241E46;
      line-height: 24px;
    }
  }

  .container {
    width: 100%;

    .filter_industry {
      .title_industry {
        display: flex;
        margin-bottom: 8px;
      }

      .ant-select {
        width: 100%;
      }
    }

    .line {
      width: 100%;
      height: 1px;
      background-color: #EEEBFF;
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .filter_time {
      .title_time {
        display: flex;
        margin-bottom: 8px;
      }

      .ant-row {
        margin-top: 8px;
      }

      .ant-checkbox-group {
        display: flex;
        flex-direction: column;
      }
    }
  }

}
</style>

<style lang="scss">
.filter_industry {
  .ant-select {
    .ant-select-selector {
      display: flex;
      align-items: center;
      height: 40px;
    }
  }
}
</style>