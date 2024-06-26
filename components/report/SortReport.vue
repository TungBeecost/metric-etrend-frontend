<script setup lang="ts">
const selectedOption = ref('newest');
const handleChange = (value: string) => {
  console.log(value);
};
</script>

<template>
  <div class="sort-report">
    <div class="title">Sắp xếp theo</div>
    <a-select v-model:value="selectedOption" @change="handleChange">
      <a-select-option value="price">Giá</a-select-option>
      <a-select-option value="popularity">Phổ biến</a-select-option>
      <a-select-option value="newest">Mới nhất</a-select-option>
    </a-select>
  </div>
</template>

<style scoped lang="scss">
.sort-report{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
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