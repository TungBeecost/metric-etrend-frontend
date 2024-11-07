<script setup lang="ts">
import ModalDownloadPdf from "~/components/ModalDownloadPdf.vue";
import {defineProps, ref, onMounted, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import ReportPreviewSlide from "~/components/PreviewSlide/ReportPreviewSlide.vue";

const open = ref(false);
const route = useRoute();
const router = useRouter();
const handleClick = () => {
  open.value = true;
};

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  showModalDownloadPdf: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: true,
  },
});

onMounted(() => {
  if (route.query.download === "1") {
    open.value = true;

    router.replace({
      query: {
        ...route.query,
        download: undefined,
      },
    });
  }
});

watch(() => props.showModalDownloadPdf, (newVal) => {
  if (newVal) {
    open.value = true;
  }
});
</script>

<template>
  <div  class="dept_report_link">
    <a-skeleton-image v-if="loading"/>
    <a-skeleton style="padding: 16px" v-if="loading" size="large" :paragraph="{ rows: 10 }"/>
    <div v-else class="container">
      <div class="border_slide_thumbnail">
        <ReportPreviewSlide :data="props.data" :is-slug-page="true"/>
      </div>
      <div class="content_container">
        <div class="content_item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_5773_296068)">
              <path d="M2.5 9L6 12.5L14 4.5" stroke="#35A855" stroke-width="1.3" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_5773_296068">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Số liệu chính xác, khách quan, cập nhật bằng công nghệ Big Data</span>
        </div>
        <div class="content_item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_5773_296068)">
              <path d="M2.5 9L6 12.5L14 4.5" stroke="#35A855" stroke-width="1.3" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_5773_296068">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Thông tin trực quan, dễ theo dõi</span>
        </div>
        <div class="content_item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_5773_296068)">
              <path d="M2.5 9L6 12.5L14 4.5" stroke="#35A855" stroke-width="1.3" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_5773_296068">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Dễ dàng lưu trữ</span>
        </div>
        <div class="content_item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_5773_296068)">
              <path d="M2.5 9L6 12.5L14 4.5" stroke="#35A855" stroke-width="1.3" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_5773_296068">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Số liệu cập nhật đến tháng mới nhất</span>
        </div>
        <a-button
            style="width: 100%; height: 50px; font-family: Montserrat,sans-serif; font-weight: 500;"
            type="primary" class="btn"
            @click="handleClick"
            size="large"
        >
          <i aria-label="icon: download" class="anticon anticon-download">
            <svg viewBox="64 64 896 896" data-icon="download" width="1em" height="1em" fill="currentColor"
                 aria-hidden="true" focusable="false" class="">
              <path
                  d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </i>
          Tải báo cáo PDF chi tiết
        </a-button>
        <div
            style="text-align: center;font-family: Montserrat,sans-serif; font-weight: 500; color: #666;font-size: 14px;">
          (Nhận báo cáo qua Email trong 5 - 30 phút)
        </div>
      </div>
    </div>
  </div>
  <modal-download-pdf v-model:open="open" :data="props.data"/>
</template>

<style scoped lang="scss">
.dept_report_link {
  display: flex;
  //padding: 24px;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  overflow: hidden;

  .container {
    display: flex;
    flex-direction: column;
    //gap: 24px;

    .border_slide_thumbnail {
      padding: 24px;
      background: var(--Gradient-2, linear-gradient(90deg, #FF6931 1.09%, #FF9839 99.23%));
      display: flex;
      justify-content: center;

      .slide_thumbnail {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .content_container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 24px;

      .content_item {
        display: flex;
        gap: 8px;

        margin-bottom: 10px;

        font-size: 14px;

        span {
          font-weight: 500;
          color: #241E46;
        }
      }
    }

  }
}
</style>

<style lang="scss">
.ant-skeleton-image{
  width: 100% !important;
  height: 400px !important;
}
</style>