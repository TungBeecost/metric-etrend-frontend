<template>
  <div :style="{ width: parentWidth, height: `${parentHeight}px`, position: 'relative' }">
    <div
        class="report-preview-slide"
        :style="{ scale: `${scale}` }"
        style="overflow: hidden;"
    >
      <div
          class="slide-components"
          :style="{ width: `100%`}"
      >
        <component
            :is="slideComponents[index]"
            v-for="(Component, idx) in slideComponents"
            :key="idx"
            :data="data"
            class="slide-component"
        />
      </div>
      <div v-if="index > 0" class="prev-btn" @click="index--">
        <svg
            width="51" height="42" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="transform: rotate(180deg);"
        >
          <path
              fill-rule="evenodd" clip-rule="evenodd"
              d="M18.6167 0.61752C18.851 0.383436 19.1687 0.251953 19.5 0.251953C19.8313 0.251953 20.149 0.383436 20.3833 0.61752L32.8833 13.1175C33.1174 13.3519 33.2489 13.6696 33.2489 14.0009C33.2489 14.3321 33.1174 14.6498 32.8833 14.8842L20.3833 27.3842C20.2689 27.507 20.1309 27.6055 19.9776 27.6738C19.8242 27.7421 19.6587 27.7789 19.4909 27.7818C19.323 27.7848 19.1563 27.7539 19.0007 27.6911C18.845 27.6282 18.7036 27.5346 18.5849 27.4159C18.4662 27.2972 18.3727 27.1558 18.3098 27.0002C18.2469 26.8445 18.2161 26.6778 18.219 26.51C18.222 26.3421 18.2587 26.1766 18.327 26.0233C18.3954 25.87 18.4939 25.732 18.6167 25.6175L28.9833 15.2509H2C1.66848 15.2509 1.35054 15.1192 1.11612 14.8847C0.881696 14.6503 0.75 14.3324 0.75 14.0009C0.75 13.6693 0.881696 13.3514 1.11612 13.117C1.35054 12.8826 1.66848 12.7509 2 12.7509H28.9833L18.6167 2.38419C18.3826 2.14981 18.2511 1.8321 18.2511 1.50085C18.2511 1.1696 18.3826 0.851896 18.6167 0.61752Z"
              fill="#E85912"
          />
        </svg>
      </div>
      <div v-if="index < slideComponents.length - 1" class="next-btn" @click="index++">
        <svg width="51" height="42" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              fill-rule="evenodd" clip-rule="evenodd"
              d="M18.6167 0.61752C18.851 0.383436 19.1687 0.251953 19.5 0.251953C19.8313 0.251953 20.149 0.383436 20.3833 0.61752L32.8833 13.1175C33.1174 13.3519 33.2489 13.6696 33.2489 14.0009C33.2489 14.3321 33.1174 14.6498 32.8833 14.8842L20.3833 27.3842C20.2689 27.507 20.1309 27.6055 19.9776 27.6738C19.8242 27.7421 19.6587 27.7789 19.4909 27.7818C19.323 27.7848 19.1563 27.7539 19.0007 27.6911C18.845 27.6282 18.7036 27.5346 18.5849 27.4159C18.4662 27.2972 18.3727 27.1558 18.3098 27.0002C18.2469 26.8445 18.2161 26.6778 18.219 26.51C18.222 26.3421 18.2587 26.1766 18.327 26.0233C18.3954 25.87 18.4939 25.732 18.6167 25.6175L28.9833 15.2509H2C1.66848 15.2509 1.35054 15.1192 1.11612 14.8847C0.881696 14.6503 0.75 14.3324 0.75 14.0009C0.75 13.6693 0.881696 13.3514 1.11612 13.117C1.35054 12.8826 1.66848 12.7509 2 12.7509H28.9833L18.6167 2.38419C18.3826 2.14981 18.2511 1.8321 18.2511 1.50085C18.2511 1.1696 18.3826 0.851896 18.6167 0.61752Z"
              fill="#E85912"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import TrangBia from '/components/PreviewSlide/TrangBia.vue';
import NoiDungChinh from '/components/PreviewSlide/NoiDungChinh.vue';
import ThiPhanCacSanTMDT from '/components/PreviewSlide/ThiPhanCacSanTMDT.vue';
import ThongKeThuongHieu from '/components/PreviewSlide/ThongKeThuongHieu.vue';
import ThongKeVungMien from '/components/PreviewSlide/ThongKeVungMien.vue';
import PhanTichShopBanChay from '/components/PreviewSlide/PhanTichShopBanChay.vue';
import TinTuongBoiHangNganDoanhNghiep from '/components/PreviewSlide/TinTuongBoiHangNganDoanhNghiep.vue';

const slideComponents = [
  TrangBia,
  NoiDungChinh,
  ThiPhanCacSanTMDT,
  ThongKeThuongHieu,
  ThongKeVungMien,
  PhanTichShopBanChay,
  TinTuongBoiHangNganDoanhNghiep,
];

const props = defineProps({
  data: Object,
  dynamicScale: Boolean,
});

const index = ref(0);
const scale = ref(0);
const parentWidth = ref('100%');
const parentHeight = ref(380);

const handleResize = () => {
  const isMobile = window.innerWidth < 768;
  const width = isMobile ? 320 : 540;
  const height = isMobile ? 230 : 380;

  parentWidth.value = `${width}px`;
  parentHeight.value = (parseInt(parentWidth.value) * height) / width;
  scale.value = parseInt(parentWidth.value) / 850;
};

const autoNext = () => {
  if (index.value < slideComponents.length - 1) {
    index.value++;
  } else {
    index.value = 0;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();

  const intervalId = setInterval(autoNext, 5000);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    clearInterval(intervalId);
  });
});

watch(() => props.dynamicScale, handleResize);
</script>

<style scoped>
.report-preview-slide {
  position: relative;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;

  width: 850px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  transform-origin: top left;

  top: 0;
  left: 0;
}

.slide-components {
  display: flex;
  transition: transform 0.5s ease;
}

.slide-component {
  flex: 0 0 100%;
}

.prev-btn, .next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.prev-btn {
  left: 10px;
}

.next-btn {
  right: 10px;
}
</style>
