<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import dayjs from "dayjs";
import {NAVIGATIONS} from "~/constant/constains";

const {reports} = defineProps({
  reports: {
    type: Array<any>,
    default: () => []
  }
})

const handleItemClick = (report: any) => {
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
  return windowWidth.value < 768 ? 1 : 4;
});
</script>

<template>
  <div class="report-slide">
    <Carousel :items-to-show="itemsToShow" :items-to-scroll="1" :wrap-around="true" style="width: 100%;" :snap-align="'start'">      <Slide v-for="report in reports" v-bind="report" :key="report.name">
        <div class="slide-item" @click="handleItemClick(report)">
          <div class="thumbnail">
            <img :src="report.url_thumbnail" alt="" style="width: 100%; object-fit: cover">
          </div>
          <div class="content" style="text-align: left;">
            <div class="category_date" style="text-align: left;">
              {{ report.lst_category?.map((item: any) => item.name).join(' > ') }} <span style="color: #EEEBFF">|</span> {{ dayjs(report.created_at).format('DD/MM/YYYY') }}
            </div>
            <div class="title" style="text-align: left;">
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

<style lang="scss" scoped>
</style>

<style lang="scss">
.report-slide {
  .carousel__slide {
    padding: 8px;

    .slide-item {
      border-radius: 16px;
      background: var(--Neutral-neutral-1, #FFF);
      cursor: pointer;
      border: 1px solid #f0f0f0;

      height: 550px;

      overflow: hidden;

      .thumbnail {
        border-bottom: 1px solid #f0f0f0;
      }

      .content {
        padding: 16px;

        .category_date {
          color: var(--Dark-blue-dark-blue-6, #716B95);

          font-size: 14px;
          font-weight: 400;
          line-height: 22px; /* 157.143% */

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
