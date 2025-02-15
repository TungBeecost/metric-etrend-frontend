<script setup lang="ts">
import {onMounted, ref} from "vue";
import ListDataColectionComponent from "~/components/home/ListDataColectionComponent.vue";

const windowWidth = ref(0);
const isMobile = ref(false);

onMounted(() => {
  windowWidth.value = window.innerWidth;
  isMobile.value = window.innerWidth < 768;
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    isMobile.value = window.innerWidth < 768;
  });
});
</script>

<template>
<div class="data_collection default_section">
  <p class="title">Phương pháp thu thập và xử lý dữ liệu</p>
  <img loading="lazy" v-if="!isMobile" src="/images/Data_collect.png" alt="data_collect" class="data_collect_img"/>
  <div v-else>
    <list-data-colection-component />
  </div>
</div>
</template>

<style scoped lang="scss">
.data_collection{
  display: flex;
  padding: 60px;
  flex-direction: column;
  align-items: center;
  gap: 60px;


  .title{
    color: var(--Dark-blue-dark-blue-8, #241E46);
    text-align: center;
    font-size: 44px;
    font-weight: 700;
    line-height: 56px;
  }
}

@media (max-width: 768px) {
  .data_collection{
    padding: 16px;
    gap: 30px;
    background: var(--BG, #FBFAFC);

    .title{
      font-size: 24px;
      line-height: 32px;
    }
  }
}
</style>
