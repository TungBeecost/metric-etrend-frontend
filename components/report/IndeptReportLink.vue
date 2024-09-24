<script setup lang="ts">
import ModalDownloadPdf from "~/components/ModalDownloadPdf.vue";
import { defineProps, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
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
</script>

<template>
  <div class="dept_report_link">
   <div class="container">
     <div class="border_slide_thumbnail">
       <div class="slide_thumbnail">
         <ReportPreviewSlide :data="props.data" :is-slug-page="true"/>
       </div>
     </div>
     <div class="content_container">
       <div class="content_item">
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
           <g clip-path="url(#clip0_5773_296068)">
             <path d="M2.5 9L6 12.5L14 4.5" stroke="#35A855" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
           </g>
           <defs>
             <clipPath id="clip0_5773_296068">
               <rect width="16" height="16" fill="white"/>
             </clipPath>
           </defs>
         </svg>
         <span>Thống kê chi tiết từng sàn Shopee, Tiktok, Lazada, Tiki</span>
       </div>
       <div class="content_item">
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
           <g clip-path="url(#clip0_5773_296068)">
             <path d="M2.5 9L6 12.5L14 4.5" stroke="#35A855" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
           </g>
           <defs>
             <clipPath id="clip0_5773_296068">
               <rect width="16" height="16" fill="white"/>
             </clipPath>
           </defs>
         </svg>
         <span>Chi tiết số liệu top 10 thương hiệu hàng đầu</span>
       </div>
       <div class="content_item">
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
           <g clip-path="url(#clip0_5773_296068)">
             <path d="M2.5 9L6 12.5L14 4.5" stroke="#35A855" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
           </g>
           <defs>
             <clipPath id="clip0_5773_296068">
               <rect width="16" height="16" fill="white"/>
             </clipPath>
           </defs>
         </svg>
         <span>Thống kê chi tiết 20 gian hàng và 60 sản phẩm bán chạy</span>
       </div>
       <div class="content_item">
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
           <g clip-path="url(#clip0_5773_296068)">
             <path d="M2.5 9L6 12.5L14 4.5" stroke="#35A855" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
           </g>
           <defs>
             <clipPath id="clip0_5773_296068">
               <rect width="16" height="16" fill="white"/>
             </clipPath>
           </defs>
         </svg>
         <span>Báo cáo chi tiết 56 trang</span>
       </div>

     </div>
   </div>
    <a-button style="width: 100%; height: 40px" type="primary" class="btn" @click="handleClick">Xem báo cáo chi tiết</a-button>
  </div>
  <modal-download-pdf v-model:open="open" :data="props.data"/>
</template>

<style scoped lang="scss">
.dept_report_link {
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .container{
    display: flex;
    flex-direction: column;
    gap: 24px;

    .border_slide_thumbnail{
      padding: 10px;
      background: var(--Gradient-2, linear-gradient(90deg, #FF6931 1.09%, #FF9839 99.23%));
      border-radius: 8px;

      .slide_thumbnail{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .content_container{
      display: flex;
      flex-direction: column;
      gap: 8px;
      .content_item{
        display: flex;
        gap: 8px;

        span{
          font-weight: 500;
          color: #241E46;
        }
      }
    }

  }
}
</style>