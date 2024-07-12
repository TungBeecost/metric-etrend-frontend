<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import dayjs from "dayjs";
import { NAVIGATIONS } from "~/constant/constains";
import { formatAndRoundSortTextCurrencyWithMinValue } from "~/helpers/FormatHelper";
import BlurContent from "~/components/BlurContent.vue";

const { reports } = defineProps({
  reports: {
    type: Array<any>,
    default: () => []
  }
});

const handleItemClick = (report: any) => {
  navigateTo(`${NAVIGATIONS.home}${report.slug}`);
};

const windowWidth = ref(1024);

const onResize = () => {
  windowWidth.value = window?.innerWidth;
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window?.innerWidth;
    window.addEventListener('resize', onResize);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', onResize);
  }
});

const itemsToShow = computed(() => {
  return windowWidth.value < 768 ? 1 : 4;
});
</script>

<template>
  <div class="report-slide">
    <Carousel :items-to-show="itemsToShow" :items-to-scroll="3" :wrap-around="true" style="width: 100%;" :snap-align="'start'">
      <Slide v-for="report in reports" v-bind="report" :key="report.name">
        <div class="slide-item" @click="handleItemClick(report)">
          <div class="thumbnail">
            <img :src="report.url_thumbnail" alt="" style="width: 100%; object-fit: cover">
          </div>
          <div class="content" style="text-align: left;">
            <div class="category_date" style="text-align: left;">
              {{ report.lst_category?.[0]?.name }} <span style="color: #EEEBFF">|</span> {{ dayjs(report.created_at).format('DD/MM/YYYY') }}
            </div>
            <div class="title" style="text-align: left;">
              Báo cáo nhóm hàng {{ report.name }}
            </div>
            <div v-if="report.revenue_monthly" class="summary-info">
              <div class="info_item">
                <svg data-v-f4382b3b="" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateY(0px); margin-right: 4px;"><g clip-path="url(#clip0_1518_34097)" data-v-f4382b3b=""><path d="M14 16H2V6" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path><path d="M12.5 7.5L8 12L6 10L2 14" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path><path d="M12.5 10V7.5H10" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path></g><defs data-v-f4382b3b=""><clipPath id="clip0_1518_34097" data-v-f4382b3b=""><rect width="16" height="16" fill="white" transform="translate(0 3)" data-v-f4382b3b=""></rect></clipPath></defs></svg>
                <span>
                <BlurContent>
                  {{ formatAndRoundSortTextCurrencyWithMinValue(report.revenue_monthly) }}
                </BlurContent>
              </span> - doanh số trung bình tháng
              </div>
              <div class="info_item">
                <svg data-v-f4382b3b="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateY(0px); margin-right: 4px;"><g clip-path="url(#clip0_1518_34114)" data-v-f4382b3b=""><path d="M3 8.72437V13C3 13.1326 3.05268 13.2598 3.14645 13.3535C3.24021 13.4473 3.36739 13.5 3.5 13.5H12.5C12.6326 13.5 12.7598 13.4473 12.8536 13.3535C12.9473 13.2598 13 13.1326 13 13V8.72437" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path><path d="M3.375 2.5H12.625C12.7336 2.50002 12.8393 2.53541 12.926 2.60081C13.0127 2.66621 13.0758 2.75807 13.1056 2.8625L14 6H2L2.89625 2.8625C2.92603 2.75838 2.98881 2.66675 3.07514 2.60137C3.16148 2.536 3.26671 2.50043 3.375 2.5Z" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path><path d="M6 6V7C6 7.53043 5.78929 8.03914 5.41421 8.41421C5.03914 8.78929 4.53043 9 4 9C3.46957 9 2.96086 8.78929 2.58579 8.41421C2.21071 8.03914 2 7.53043 2 7V6" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path><path d="M10 6V7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7V6" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path><path d="M14 6V7C14 7.53043 13.7893 8.03914 13.4142 8.41421C13.0391 8.78929 12.5304 9 12 9C11.4696 9 10.9609 8.78929 10.5858 8.41421C10.2107 8.03914 10 7.53043 10 7V6" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" data-v-f4382b3b=""></path></g><defs data-v-f4382b3b=""><clipPath id="clip0_1518_34114" data-v-f4382b3b=""><rect width="16" height="16" fill="white" data-v-f4382b3b=""></rect></clipPath></defs></svg>
                <span>
                <BlurContent>
                  {{ formatAndRoundSortTextCurrencyWithMinValue(report.shop) }}
                </BlurContent>
              </span> - nhà bán
              </div>
            </div>
            <div class="description line-clamp__2" style="text-align: left;">
              Thương hiệu bán chạy:
              {{ report.lst_brand?.slice(5)?.join(', ') }}.
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

<style lang="scss">
.report-slide {
  .carousel__slide {
    padding: 8px;

    .slide-item {
      border-radius: 16px;
      background: var(--Neutral-neutral-1, #FFF);
      cursor: pointer;
      border: 1px solid #f0f0f0;

      height: 600px;
      overflow: hidden;

      .thumbnail {
        border-bottom: 1px solid #f0f0f0;
      }

      .content {
        padding: 16px;
        display: flex;
        flex-direction: column;

        .category_date {
          color: var(--Dark-blue-dark-blue-6, #716B95);
          font-size: 14px;
          font-weight: 400;
          line-height: 22px; /* 157.143% */
          margin-bottom: 16px;
          flex: 1;
        }

        .title {
          color: var(--Dark-blue-dark-blue-8, #241E46);
          font-size: 20px;
          font-weight: 700;
          line-height: 28px; /* 140% */
          margin-bottom: 8px;
          text-transform: capitalize;
          flex: 1;
        }

        .summary-info{
          margin-bottom: 8px;
          flex : 1;

          .info_item{
            align-items: center;
            color: #716b95;
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            font-size: 16px;

            span{
              font-weight: bold;
              color: #241e46;
              font-size: 16px;
            }

            .gr_quarter{
              .gr_quarter_item{
                display: flex;
                gap: 4px;
                span{
                  display: flex;
                  align-items: center;
                  gap: 6px;
                }
              }
            }
          }
        }

        .description {
          overflow: hidden;
          color: var(--Dark-blue-dark-blue-6, #716B95);
          text-overflow: ellipsis;
          flex: 1;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px; /* 150% */
        }
      }
    }
  }

  .carousel__prev {
    left: -80px;
  }

  .carousel__next {
    right: -80px;
  }

  .carousel__prev, .carousel__next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #EEEBFF;
    background-color: #FFF;
    cursor: pointer;
    position: absolute;
  }
}

@media (max-width: 767px) {
  .report-slide {
    .carousel__slide {
      .slide-item {
        height: auto;
        flex-direction: column;

        .thumbnail {
          width: 100%;
          height: auto;
          border-bottom: none;
        }

        .content {
          padding: 8px;

          .category_date, .title, .description {
            text-align: center;
          }

          .title {
            font-size: 18px;
            margin-bottom: 4px;
          }

          .description {
            font-size: 14px;
          }
        }
      }
    }

    .carousel__prev {
      left: 40%;
      top: 100%;
      transform: translateX(-60px);
    }

    .carousel__next {
      left: 50%;
      top: 100%;
      transform: translateX(20px);
    }

    .carousel__pagination{
      display: none;
    }
  }
}
</style>
