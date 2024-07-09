<script setup lang="ts">
import dayjs from "dayjs";
import {NAVIGATIONS} from "~/constant/constains";

const {reports} = defineProps({
  reports: {
    type: Array<any>,
    default: () => []
  }
})

const handleItemClick = (report: any) => {
  // Navigate to report detail page
  navigateTo(`${NAVIGATIONS.home}${report.slug}`);
}

const windowWidth = ref(window.innerWidth);

const onResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

const itemsToShow = computed(() => {
  return windowWidth.value < 768 ? 1 : 2; // 768px is a common breakpoint for mobile devices
});

const getDisplayedCategories = (report: any) => {
  if (windowWidth.value < 768) {
    return report.lst_category?.length ? report.lst_category[report.lst_category.length - 1].name : '';
  } else {
    return report.lst_category?.map((item: any) => item.name).join(' > ') || '';
  }
};
</script>

<template>
  <div class="new-report-slide">
    <Carousel :items-to-show="itemsToShow" :items-to-scroll="1" :wrap-around="true" style="width: 100%;" :snap-align="'start'">
      <Slide v-for="report in reports" v-bind="report" :key="report.name">
        <div class="slide-item" @click="handleItemClick(report)">
          <div class="thumbnail">
            <img :src="report.url_thumbnail" alt="" style="width: 100%; object-fit: cover">
          </div>
          <div class="content" style="text-align: left;">
            <div class="category_date line-clamp__2" style="text-align: left;">
              {{ getDisplayedCategories(report) }} <span style="color: #EEEBFF">|</span> {{ dayjs(report.created_at).format('DD/MM/YYYY') }}
            </div>
            <div class="title line-clamp__2" style="text-align: left;">
              Báo cáo nhóm hàng {{ report.name }}
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
.new-report-slide {
  .carousel__slide {
    padding: 8px;

    .slide-item {
      border-radius: 16px;
      background: var(--Neutral-neutral-1, #FFF);
      cursor: pointer;
      border: 1px solid #f0f0f0;

      display: flex;
      flex-direction: row;

      overflow: hidden;

      .thumbnail {
        width: 170px;
        height: 170px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #f0f0f0;
      }

      .content {
        padding: 16px;
        flex: 1;

        .category_date {
          color: var(--Dark-blue-dark-blue-6, #716B95);

          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 16px;
        }

        .title {
          color: var(--Dark-blue-dark-blue-8, #241E46);
          font-size: 20px;
          font-weight: 700;
          line-height: 28px; /* 140% */

          margin-bottom: 8px;

          text-transform: capitalize;
        }

        .description {
          overflow: hidden;
          color: var(--Dark-blue-dark-blue-6, #716B95);
          text-overflow: ellipsis;

          font-size: 16px;
          font-weight: 400;
          line-height: 24px; /* 150% */
        }
      }
    }
  }

  .carousel__prev {
    left: -25px;
  }

  .carousel__next {
    right: -25px;
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
  .new-report-slide {
    .carousel__slide {
      .slide-item {
        .thumbnail {
          padding-left: 12px;
          height: auto;
          border-bottom: none;
        }

        .content {
          padding: 8px;

          .category_date{
            text-align: center;
          }

          .title {
            font-size: 16px;
            margin-bottom: 4px;
          }

          .description {
            font-size: 14px;
          }
        }
      }
    }

    .carousel__prev, .carousel__next {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #EEEBFF;
      background-color: #FFF;
      cursor: pointer;
      position: absolute;
      top: auto;
      bottom: -20px;
    }

    .carousel__prev {
      bottom: auto;
      left: 40%;
      transform: translateX(-60px);
    }

    .carousel__next {
      bottom: auto;
      left: 50%;
      transform: translateX(20px);
    }

    .carousel__pagination{
      display: none;
    }
  }
}
</style>
