<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import dayjs from "dayjs";
import { formatAndRoundSortTextCurrencyWithMinValue } from "~/helpers/FormatHelper";
import BlurContent from "~/components/BlurContent.vue";
import { useRouter } from 'vue-router';

const { reports, loading } = defineProps({
  reports: {
    type: Array<any>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const handleItemClick = (report: any) => {
  router.push(`/insight/${report.slug}`);
};

const windowWidth = ref(1024);

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
  }
});

const itemsToShow = computed(() => {
  if (windowWidth.value < 768) {
    return 1;
  } else if (windowWidth.value <= 1380) {
    return 2;
  } else {
    return 4;
  }
});

</script>

<template>
  <div class="report-slide">
    <Carousel v-if="loading" :items-to-show="itemsToShow" :items-to-scroll="itemsToShow" :wrap-around="true" style="width: 100%;" :snap-align="'start'">
      <Slide v-for="item in [1,2,3,4]" :key="item">
        <div style="width: 100%; display: flex; flex-direction: column; padding: 16px;">
          <a-skeleton-image style="margin-bottom: 24px;"/>
          <a-skeleton/>
        </div>
      </Slide>
    </Carousel>
    <Carousel v-else :items-to-show="itemsToShow" :items-to-scroll="itemsToShow" :wrap-around="true" style="width: 100%;" :snap-align="'start'">
      <Slide v-for="report in reports" v-bind="report" :key="report.name">
        <div class="slide-item" @click="handleItemClick(report)">
          <div class="thumbnail">
            <img :src="report.url_thumbnail" alt="" style="width: 100%; object-fit: contain;">
          </div>
          <div class="content" style="text-align: left;">
            <div class="category_date" style="text-align: left; display: flex; align-items: center; gap: 4px">
              Báo cáo khác
              <svg width="65" height="25" viewBox="0 0 65 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.5" width="65" height="24" rx="4" fill="#EAF8EE"/>
                <path d="M9.48065 7.77273H10.742L13.7079 15.017H13.8102L16.7761 7.77273H18.0375V16.5H17.0488V9.86932H16.9636L14.2363 16.5H13.2818L10.5545 9.86932H10.4693V16.5H9.48065V7.77273ZM20.0201 16.5V9.95455H21.0257V16.5H20.0201ZM20.5314 8.86364C20.3354 8.86364 20.1664 8.79688 20.0243 8.66335C19.8851 8.52983 19.8155 8.36932 19.8155 8.18182C19.8155 7.99432 19.8851 7.83381 20.0243 7.70028C20.1664 7.56676 20.3354 7.5 20.5314 7.5C20.7275 7.5 20.8951 7.56676 21.0343 7.70028C21.1763 7.83381 21.2473 7.99432 21.2473 8.18182C21.2473 8.36932 21.1763 8.52983 21.0343 8.66335C20.8951 8.79688 20.7275 8.86364 20.5314 8.86364ZM25.612 16.6364C24.9814 16.6364 24.4373 16.4972 23.9799 16.2188C23.5254 15.9375 23.1745 15.5455 22.9274 15.0426C22.6831 14.5369 22.5609 13.9489 22.5609 13.2784C22.5609 12.608 22.6831 12.017 22.9274 11.5057C23.1745 10.9915 23.5183 10.5909 23.9586 10.304C24.4018 10.0142 24.9189 9.86932 25.5098 9.86932C25.8507 9.86932 26.1873 9.92614 26.5197 10.0398C26.8521 10.1534 27.1547 10.3381 27.4274 10.5938C27.7001 10.8466 27.9174 11.1818 28.0794 11.5994C28.2413 12.017 28.3223 12.5312 28.3223 13.142V13.5682H23.2768V12.6989H27.2995C27.2995 12.3295 27.2257 12 27.0779 11.7102C26.9331 11.4205 26.7257 11.1918 26.4558 11.0241C26.1887 10.8565 25.8734 10.7727 25.5098 10.7727C25.1092 10.7727 24.7626 10.8722 24.47 11.071C24.1802 11.267 23.9572 11.5227 23.801 11.8381C23.6447 12.1534 23.5666 12.4915 23.5666 12.8523V13.4318C23.5666 13.9261 23.6518 14.3452 23.8223 14.6889C23.9956 15.0298 24.2356 15.2898 24.5424 15.4688C24.8493 15.6449 25.2058 15.733 25.612 15.733C25.8762 15.733 26.1149 15.696 26.3279 15.6222C26.5439 15.5455 26.7299 15.4318 26.8862 15.2812C27.0424 15.1278 27.1632 14.9375 27.2484 14.7102L28.22 14.983C28.1177 15.3125 27.9458 15.6023 27.7044 15.8523C27.4629 16.0994 27.1646 16.2926 26.8095 16.4318C26.4544 16.5682 26.0552 16.6364 25.612 16.6364ZM25.8507 7.94318L27.6404 9.375H26.5836L25.4416 8.47159L24.2995 9.375H23.2427L25.0325 7.94318H25.8507ZM26.4984 6.44318L26.9757 6.57955C26.9757 6.80966 26.8819 7.02131 26.6944 7.21449C26.5069 7.40483 26.2768 7.5 26.0041 7.5C25.8592 7.5 25.737 7.48011 25.6376 7.44034C25.5382 7.39773 25.4487 7.34943 25.3691 7.29545C25.2924 7.24148 25.2115 7.1946 25.1262 7.15483C25.0439 7.11222 24.9444 7.09091 24.8279 7.09091C24.7086 7.09091 24.5964 7.13636 24.4913 7.22727C24.3862 7.31818 24.3336 7.41477 24.3336 7.51705L23.8734 7.39773C23.8734 7.16761 23.9643 6.95455 24.1461 6.75852C24.3279 6.55966 24.5552 6.46023 24.8279 6.46023C24.9473 6.46023 25.0552 6.48011 25.1518 6.51989C25.2484 6.55966 25.3407 6.60511 25.4288 6.65625C25.5169 6.70739 25.6064 6.75284 25.6973 6.79261C25.791 6.83239 25.8933 6.85227 26.0041 6.85227C26.1234 6.85227 26.2356 6.80966 26.3407 6.72443C26.4458 6.6392 26.4984 6.54545 26.4984 6.44318ZM30.8578 12.5625V16.5H29.8521V9.95455H30.8237V10.9773H30.9089C31.0623 10.6449 31.2953 10.3778 31.6078 10.1761C31.9203 9.97159 32.3237 9.86932 32.818 9.86932C33.2612 9.86932 33.649 9.96023 33.9814 10.142C34.3137 10.321 34.5723 10.5938 34.7569 10.9602C34.9416 11.3239 35.0339 11.7841 35.0339 12.3409V16.5H34.0282V12.4091C34.0282 11.8949 33.8947 11.4943 33.6277 11.2074C33.3606 10.9176 32.9941 10.7727 32.5282 10.7727C32.2072 10.7727 31.9203 10.8423 31.6674 10.9815C31.4174 11.1207 31.22 11.3239 31.0751 11.5909C30.9302 11.858 30.8578 12.1818 30.8578 12.5625ZM40.2466 18.9545V9.95455H41.2182V10.9943H41.3375C41.4114 10.8807 41.5137 10.7358 41.6444 10.5597C41.7779 10.3807 41.9682 10.2216 42.2154 10.0824C42.4654 9.94034 42.8034 9.86932 43.2296 9.86932C43.7807 9.86932 44.2665 10.0071 44.687 10.2827C45.1074 10.5582 45.4355 10.9489 45.6713 11.4545C45.9071 11.9602 46.025 12.5568 46.025 13.2443C46.025 13.9375 45.9071 14.5384 45.6713 15.0469C45.4355 15.5526 45.1088 15.9446 44.6912 16.223C44.2736 16.4986 43.7921 16.6364 43.2466 16.6364C42.8262 16.6364 42.4895 16.5668 42.2367 16.4276C41.9838 16.2855 41.7892 16.125 41.6529 15.946C41.5165 15.7642 41.4114 15.6136 41.3375 15.4943H41.2523V18.9545H40.2466ZM41.2353 13.2273C41.2353 13.7216 41.3077 14.1577 41.4526 14.5355C41.5975 14.9105 41.8091 15.2045 42.0875 15.4176C42.3659 15.6278 42.7069 15.733 43.1103 15.733C43.5307 15.733 43.8816 15.6222 44.1628 15.4006C44.4469 15.1761 44.66 14.875 44.802 14.4972C44.9469 14.1165 45.0194 13.6932 45.0194 13.2273C45.0194 12.767 44.9483 12.3523 44.8063 11.983C44.6671 11.6108 44.4554 11.3168 44.1713 11.1009C43.8901 10.8821 43.5364 10.7727 43.1103 10.7727C42.7012 10.7727 42.3574 10.8764 42.079 11.0838C41.8006 11.2884 41.5904 11.5753 41.4483 11.9446C41.3063 12.3111 41.2353 12.7386 41.2353 13.2273ZM48.5648 12.5625V16.5H47.5591V7.77273H48.5648V10.9773H48.65C48.8034 10.6392 49.0336 10.3707 49.3404 10.1719C49.65 9.97017 50.062 9.86932 50.5762 9.86932C51.0222 9.86932 51.4128 9.95881 51.748 10.1378C52.0833 10.3139 52.3432 10.5852 52.5279 10.9517C52.7154 11.3153 52.8091 11.7784 52.8091 12.3409V16.5H51.8034V12.4091C51.8034 11.8892 51.6685 11.4872 51.3986 11.2031C51.1316 10.9162 50.7608 10.7727 50.2864 10.7727C49.9569 10.7727 49.6614 10.8423 49.4 10.9815C49.1415 11.1207 48.937 11.3239 48.7864 11.5909C48.6387 11.858 48.5648 12.1818 48.5648 12.5625ZM54.649 16.5V9.95455H55.6547V16.5H54.649ZM54.7001 9.06818L55.7399 7.09091H56.916L55.5865 9.06818H54.7001Z" fill="#35A855"/>
              </svg>
            </div>
            <div class="title line-clamp__2" style="text-align: left;">
             Báo cáo {{ report.name.replace('báo cáo', '') }}
            </div>
            <div v-if="report.revenue_monthly" class="summary-info">
              <div class="info_item">
                <svg data-v-f4382b3b="" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateY(0px); margin-right: 4px;">
                  <g clip-path="url(#clip0_1518_34097)" data-v-f4382b3b="">
                    <path d="M14 16H2V6" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path>
                    <path d="M12.5 7.5L8 12L6 10L2 14" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path>
                    <path d="M12.5 10V7.5H10" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path>
                  </g>
                  <defs data-v-f4382b3b="">
                    <clipPath id="clip0_1518_34097" data-v-f4382b3b="">
                      <rect width="16" height="16" fill="white" transform="translate(0 3)" data-v-f4382b3b=""></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span>
                  <BlurContent>
                    {{ formatAndRoundSortTextCurrencyWithMinValue(report.revenue_monthly) }}
                  </BlurContent>
                </span> - doanh số trung bình tháng
              </div>
              <div class="info_item">
                <svg data-v-f4382b3b="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateY(0px); margin-right: 4px;">
                  <g clip-path="url(#clip0_1518_34114)" data-v-f4382b3b="">
                    <path d="M3 8.72437V13C3 13.1326 3.05268 13.2598 3.14645 13.3535C3.24021 13.4473 3.36739 13.5 3.5 13.5H12.5C12.6326 13.5 12.7598 13.4473 12.8536 13.3535C12.9473 13.2598 13 13.1326 13 13V8.72437" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path>
                    <path d="M3.375 2.5H12.625C12.7336 2.50002 12.8393 2.53541 12.926 2.60081C13.0127 2.66621 13.0758 2.75807 13.1056 2.8625L14 6H2L2.89625 2.8625C2.92603 2.75838 2.98881 2.66675 3.07514 2.60137C3.16148 2.536 3.26671 2.50043 3.375 2.5Z" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path>
                    <path d="M6 6V7C6 7.53043 5.78929 8.03914 5.41421 8.41421C5.03914 8.78929 4.53043 9 4 9C3.46957 9 2.96086 8.78929 2.58579 8.41421C2.21071 8.03914 2 7.53043 2 7V6" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path>
                    <path d="M10 6V7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7V6" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path>
                    <path d="M14 6V7C14 7.53043 13.7893 8.03914 13.4142 8.41421C13.0391 8.78929 12.5304 9 12 9C11.4696 9 10.9609 8.78929 10.5858 8.41421C10.2107 8.03914 10 7.53043 10 7V6" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path>
                  </g>
                  <defs data-v-f4382b3b="">
                    <clipPath id="clip0_1518_34114" data-v-f4382b3b="">
                      <rect width="16" height="16" fill="white" data-v-f4382b3b=""></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span>
                  <BlurContent>
                    {{ formatAndRoundSortTextCurrencyWithMinValue(report.shop) }}
                  </BlurContent>
                </span> - nhà bán
              </div>
            </div>
            <div class="description line-clamp__4" style="text-align: left;">
              {{ report.introduction }}
            </div>
          </div>
        </div>
      </Slide>
      <template #addons>
        <navigation/>
        <pagination/>
      </template>
    </Carousel>
  </div>
</template>


<style scoped lang="scss">
.report-slide {
  .carousel__slide {
    .slide-item {
      height: 500px;
      .thumbnail {
        height: 230px;
        display: flex;
        align-items: center;
      }
    }
  }
}

@media (max-width: 767px) {
  .report-slide {
    .carousel__slide {
      .slide-item {
        height:450px;
        .thumbnail {
          height: 230px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

@media (max-width: 1380px) {
  .report-slide {
    .carousel__slide {
      .slide-item {
        height: 600px;
        .thumbnail {
          height: 350px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>

