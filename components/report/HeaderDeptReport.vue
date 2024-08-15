<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue';

// Props
const props = defineProps({
  numOfPages: Number,
  currentPage: Number,
  remainingTime: String
});

// State
const remainingTimeState = ref('');

// Helper function to format remaining time
const formatRemainingTime = (diff: number) => {
  if (diff <= 0) {
    return '00 ngày 00:00:00';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${String(days).padStart(2, '0')} ngày ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Helper function to calculate remaining time
const calculateRemainingTime = () => {
  const targetDate = new Date(props.remainingTime as string);
  if (isNaN(targetDate.getTime())) {
    console.error('Invalid date format:', props.remainingTime);
    return 'Invalid date';
  }
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  return formatRemainingTime(diff);
};
// Lifecycle hooks
onMounted(() => {
  remainingTimeState.value = calculateRemainingTime();
  const interval = setInterval(() => {
    remainingTimeState.value = calculateRemainingTime();
  }, 1000);
  onUnmounted(() => clearInterval(interval));
});
</script>

<template>
  <div class="header-dept-report default_section">
    <div class="category">
      Báo cáo chuyên sâu
    </div>
    <div class="container">
      <div class="title">Áo khoác nam</div>
      <div class="page_content"><b>Trang</b>: {{ currentPage }}/{{ numOfPages }}</div>
      <div class="time">
        <div class="time_title">
          Thời gian truy cập còn lại
        </div>
        <div class="countdown_time">
          {{ remainingTimeState }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-dept-report{
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #FFF;
  padding-bottom: 24px;

  .category{
    display: flex;
    align-items: flex-start;
    color: #716B95;
  }

  .container{
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: space-between;

    .title{
      font-size: 36px;
      font-weight: 700;
      line-height: 38px;
      color: #241E46;
    }

    .time{
      display: flex;
      gap: 8px;
      align-items: center;
      width: 400px;

      .time_title{
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        color: #716B95;
      }

      .countdown_time{
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
        color: #E85912;
      }
    }
  }

}
</style>