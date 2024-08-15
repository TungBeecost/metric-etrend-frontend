<script setup lang="ts">
import ModalDownloadPdf from "~/components/ModalDownloadPdf.vue";
import { defineProps, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

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
    <div class="title_container">
      <p style="text-align: center; color: #E85812; font-size: 24px; font-weight: 700; line-height: 32px">Báo cáo chuyên sâu</p>
      <p style="text-align: center; color: #050038; font-size: 14px; font-weight: 600; line-height: 20px">Nhóm hàng Dép Nam</p>
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
         <span>Số liệu chi tiết về thị trường Dép Nam trên Shopee, Lazada, Tiki</span>
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
         <span>Xu hướng tăng trưởng doanh số và sản lượng bán trong 12 tháng qua</span>
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
         <span>Thống kê thương hiệu và phân tích chi tiết số liệu gian hàng bán chạy</span>
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
         <span>Thống kê đánh giá người tiêu dùng về gian hàng và bản phẩm bán chạy</span>
       </div>

     </div>
   </div>
    <a-button style="width: 100%; height: 40px" type="primary" class="btn" @click="handleClick">Xem chi tiết</a-button>
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
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .container{
    display: flex;
    flex-direction: column;
    gap: 24px;

    .title_container{
      display: flex;
      flex-direction: column;
      gap: 8px;
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