<script setup lang="ts">
import { ref } from 'vue'

const selectedOption = ref('popularity');
const emit = defineEmits(['sortSelect']);
const handleChange = (value: any, _option: any) => {
  emit('sortSelect', value);
};
</script>

<template>
  <div class="sort-report">
    <div class="title">Sắp xếp theo</div>
    <a-select v-model:value="selectedOption" @change="handleChange">
      <a-select-option value="popularity">Phổ biến nhất</a-select-option>
      <a-select-option value="revenue">Doanh số cao nhất</a-select-option>
    </a-select>
  </div>
</template>

<style scoped lang="scss">
.sort-report{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  //margin-top: 20px;
  //margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  .title{
    font-size: 16px;
    font-weight: 500;
    color: #716B95;
    line-height: 24px;
  }
  .ant-select{
    width: 150px;

    .ant-select-selector{
      display: flex;
      padding: 9px;
      align-items: center;
      border-radius: 8px;
      border: 1px solid #9D97BF;
      background: #FFF;
    }
  }
}
</style>
<style lang="scss">
.sort_report{
  .ant-select{
    .ant-select-selector{
      display: flex;
      align-items: center;
      height: 40px;
    }
  }
}
</style>