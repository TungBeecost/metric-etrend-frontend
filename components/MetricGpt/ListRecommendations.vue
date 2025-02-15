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

const formatReportName = (name) => {
  return name.startsWith('Báo cáo') ? name : `Báo cáo ${name}`;
};

const getUniqueRecommendations = (recommendations) => {
  const uniqueRecommendations = {};
  recommendations.forEach(recommendation => {
    if (!uniqueRecommendations[recommendation.name_report] ||
        new Date(recommendation.end_date) > new Date(uniqueRecommendations[recommendation.name_report].end_date)) {
      uniqueRecommendations[recommendation.name_report] = recommendation;
    }
  });
  return Object.values(uniqueRecommendations);
};

const uniqueRecommendations = getUniqueRecommendations(props.recommendations);
</script>

<template>
  <div class="recommendations">
    <div v-for="recommendation in uniqueRecommendations" :key="recommendation.slug" class="recommendation-item" @click="handleClick(recommendation)">
      <img loading="lazy" v-if="recommendation.url_thumbnail" :src="recommendation.url_thumbnail" :alt="recommendation.name_report" class="thumbnail"/>
      <img loading="lazy" v-else src="/images/default_thumbnail_report.png" class="thumbnail" />
      <div>
        <p class="name">{{ formatReportName(recommendation.name_report) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommendations {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  font-size: 18px;
}
</style>