<script setup>
import { formatDate } from '~/helpers/FormatHelper.js';

const props = defineProps({
  recommendations: {
    type: Array,
    required: true
  }
});

const handleClick = (recommendation) => {
  window.location.href = `https://metric.vn/ereport/${recommendation.slug}`;
};
</script>

<template>
  <div class="recommendations">
    <div v-for="recommendation in recommendations" :key="recommendation.slug" class="recommendation-item" @click="handleClick(recommendation)">
      <img :src="recommendation.url_thumbnail" :alt="recommendation.name_report" class="thumbnail"/>
      <div>
        <p class="name">{{ recommendation.name_report }}</p>
        <p>{{ formatDate(recommendation.start_date) }} - {{ formatDate(recommendation.end_date) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommendations {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 45px;
  padding-top: 10px;
}

.recommendation-item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 16px;
  width: 100%;
  cursor: pointer;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 10px;
}

.name {
  font-weight: bold;
}
</style>