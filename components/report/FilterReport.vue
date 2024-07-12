<script setup lang="ts">
import type {DefaultOptionType} from "ant-design-vue/es/vc-cascader";
import type {SelectValue} from "ant-design-vue/es/select";
import allReports from '@/public/file_json/list_category.json';
import {defineProps} from "vue";
import { TreeSelect } from 'ant-design-vue';
const selectedOption = ref('');
const showSelectIndustry = ref(true);
const emit = defineEmits(['listcheckbox', 'categoryselect']);
const route = useRoute();



const props = defineProps({
  selectedCategory: {
    type: String,
    default: '',
  },
});
if(props.selectedCategory == ''){
  selectedOption.value = "c0000000000";
}
else{
  selectedOption.value = props.selectedCategory;
}


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
      if (parent && item.value) {
        const child = map.get(item.value);
        if (child) {
          parent.children.push(child);
        }
      }
    } else if (item.value) {
      const child = map.get(item.value);
      if (child) {
        treeData.push(child);
      }
    }
  });

  return treeData;
};

const treeData = transformToTreeData(allReports);

const toggleSelectIndustry = () => {
  showSelectIndustry.value = !showSelectIndustry.value;
};


const handleChange = (value: SelectValue, option: DefaultOptionType | DefaultOptionType[]) => {
  if (typeof value === "string") {
    selectedOption.value = value;
  }
  if(selectedOption.value == "c0000000000")
    emit('categoryselect', '');
  else{
    emit('categoryselect', selectedOption.value);
  }
};

onMounted(() => {
  if(route.query.category_report_id && typeof route.query.category_report_id === 'string') {
    selectedOption.value = route.query.category_report_id;
  }
});
</script>

<template>
  <div class="filter_report">
    <div class="title">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="16" fill="#FDEEE7"/>
        <g clip-path="url(#clip0_1_132574)">
          <path d="M16.625 16L9.125 16" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22.875 16L19.125 16" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.375 21.625L9.125 21.625" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22.875 21.625L12.875 21.625" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.875 23.5L12.875 19.75" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.875 10.375L9.125 10.375" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22.875 10.375L15.375 10.375" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.375 8.5L15.375 12.25" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19.125 17.875L19.125 14.125" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
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
    <div class="container">
      <div class="filter_industry">
        <div class="title_industry">
          <div @click="toggleSelectIndustry">
            <svg v-if="!showSelectIndustry" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.26465 6.30762L14.5146 11.9326L9.26465 17.5576" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17.6924 9.26416L12.0674 14.5142L6.44238 9.26416" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>Ngành hàng</div>
        </div>
        <TreeSelect
            v-if="showSelectIndustry"
            v-model:value="selectedOption"
            :tree-data="treeData"
            style="width: 100%"
            @change="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter_report{
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 16px;
  border: 1px solid #EEEBFF;
  background-color: #FFF;

  .title{
    display: flex;
    align-items: center;
    gap: 16px;

    .title_word{
      font-size: 20px;
      font-weight: bold;
      color: #241E46;
      line-height: 24px;
    }
  }
  .container{
    width: 100%;
    .filter_industry{
      .title_industry{
        display: flex;
        margin-bottom: 8px;
      }
      .ant-select{
        width: 100%;
      }
    }
    .line{
      width: 100%;
      height: 1px;
      background-color: #EEEBFF;
      margin-top: 16px;
      margin-bottom: 16px;
    }
    .filter_time{
      .title_time{
        display: flex;
        margin-bottom: 8px;
      }
      .ant-row{
        margin-top: 8px;
      }
      .ant-checkbox-group{
        display: flex;
        flex-direction: column;
      }
    }
  }

}
</style>