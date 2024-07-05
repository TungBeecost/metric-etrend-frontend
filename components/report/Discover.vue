<script setup lang="ts">
import { ref } from 'vue';
import ItemDiscover from './ItemDiscover.vue';
import allReports from '@/public/file_json/list_category.json';

const reports = allReports.filter(report => report.level === 1);

const showMore = ref(false);

const toggleSeeMore = () => {
  showMore.value = !showMore.value;
}
</script>

<template>
  <div class="discover">
    <div class="title">Khám phá theo ngành hàng</div>
    <item-discover :show-more="showMore" :reports="reports" class="lst_item"/>
    <div class="see_more">
      <button class="button_see_more" @click="toggleSeeMore">{{ showMore ? 'Ẩn bớt' : 'Xem thêm' }}</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lst_item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 16px;
  width: calc(100% - 200px);
}

.title{
  display: flex;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  color: #241E46;
}

.discover{
  background-color: #FFF;
  padding-top: 200px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.see_more{
  display: flex;
  justify-content: center;

  .button_see_more {
    width: 160px;
    height: 50px;
    border-radius: 8px;
    padding: 9px 16px;
    background: #E85912;
    color: #FFF;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #E85912;
  }
}

@media (max-width: 430px) {
  .lst_item {
    width: calc(100% - 50px);
    grid-template-columns: repeat(2, 1fr);
  }
  .title{
    font-size: 24px;
  }
}
</style>
