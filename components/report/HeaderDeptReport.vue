<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// State
const remainingTime = ref('');

// Helper function to calculate remaining time
const calculateRemainingTime = () => {
  const targetDate = new Date('2024-08-30T00:00:00');
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    remainingTime.value = '00 ngày 00:00:00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  remainingTime.value = `${String(days).padStart(2, '0')} ngày ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Lifecycle hooks
onMounted(() => {
  calculateRemainingTime();
  const interval = setInterval(calculateRemainingTime, 1000);
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
      <div class="page_content"><b>Trang</b>: 01/56</div>
      <div class="time">
        <div class="time_title">
          Thời gian truy cập còn lại
        </div>
        <div class="countdown_time">
          {{ remainingTime }}
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