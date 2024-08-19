<template>
  <div v-if="props.size === 'lg'" class="cover-background">
    <div class="cover-popup" :style="{height: props.height}">
      <!--      <div class="w-full mb-4">-->
      <!--        <BeeMetricLogoSmall width="120"/>-->
      <!--      </div>-->
      <div class="text">Bạn cần thanh toán để xem số liệu đầy đủ</div>
<!--      <a :href="`https://metric.vn/${props.data.slug}?utm_content=report-preview&download=1`" target="_blank">-->
        <a-button type="primary" size="large">
          Tiếp tục thanh toán
        </a-button>
<!--      </a>-->
    </div>
  </div>
  <div v-else class="cover-background">
    <div class="cover-popup">
      <div class="text">Bạn cần thanh toán để xem số liệu đầy đủ</div>
<!--      <a :href="`https://metric.vn/${props.data.slug}?utm_content=report-preview&download=1`" target="_blank">-->
        <a-button type="primary">
          Tiếp tục thanh toán
        </a-button>
<!--      </a>-->
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: ""
  },
  data: {
    type: Object,
    default: () => ({})
  },
  height: {
    type: String,
    default: "30%"
  }
});
</script>

<style lang="scss" scoped>
.cover-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  .cover-popup {
    padding: 10px;
    background: #fff;
    border-radius: 10px;

    width: 360px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid #CCCCCC;

    .text {
      font-weight: 700;
      font-size: 15px;

      color: #191945;

      margin-bottom: 12px;
    }

    &-lg {
      width: 80%;
      max-height: 200px;

      justify-content: space-between;
      padding-bottom: 40px;

      .text {
        font-size: 20px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
