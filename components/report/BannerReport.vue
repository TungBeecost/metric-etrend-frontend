<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import allReports from '@/public/file_json/list_category.json';

const route = useRoute();

const props = defineProps({
  content: {
    type: String,
    default: () => '',
  },
});

const displayContent = computed(() => {
  if (props.content) {
    return props.content;
  }
  const hash = route.hash;
  const categoryIdMatch = hash.match(/#id=([^&]*)/);
  const categoryId = categoryIdMatch ? categoryIdMatch[1] : '';
  const category = categoryId ? allReports.find(cat => cat.value === categoryId) : null;
  return category ? category.label : 'Danh sách báo cáo';
});
</script>

<template>
  <div class="banner">
    <div class="title">
      <div class="content default_section">{{ displayContent }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .title {
    padding: 80px 0;
    background: linear-gradient(90deg, #241E46 0%, rgba(36, 30, 70, 0.00) 100%), url(/images/ecommerce_1.png) no-repeat;
    background-size: cover;

    .content {
      font-size: 44px;
      color: white;
      font-weight: bold;
    }
  }
}

@media (max-width: 767px) {
  .banner {
    height: 112px;

    .title {
      height: 108px;
      padding: 40px 16px;

      .content {
        font-size: 30px;
      }
    }
  }
}
</style>