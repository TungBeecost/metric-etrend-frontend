<script setup lang="ts">
import dayjs from "dayjs";

const {reports} = defineProps({
  reports: {
    type: Array<any>,
    default: () => []
  }
})
</script>

<template>
  <div class="new-report-slide">
    <Carousel :items-to-show="2" :items-to-scroll="1" :wrap-around="true" style="width: 100%;" :snap-align="'start'">
      <Slide v-for="report in reports" v-bind="report" :key="report.name">
        <div class="slide-item">
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

<style lang="scss">
.new-report-slide {
  .carousel__slide {
    padding: 8px;

    .slide-item {
      border-radius: 16px;
      background: var(--Neutral-neutral-1, #FFF);
      //box-shadow: 10px 10px 40px 0px rgba(0, 0, 0, 0.05);
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


  //.carousel__slide {
  //  //border-radius: 16px;
  //  //background: var(--Neutral-neutral-1, #FFF);
  //  //box-shadow: 10px 10px 40px 0px rgba(0, 0, 0, 0.05);
  //}
  //
  //.carousel__viewport {
  //  perspective: 2000px;
  //}
  //
  //.carousel__track {
  //  transform-style: preserve-3d;
  //}
  //
  //.carousel__slide--sliding {
  //  transition: 0.5s;
  //}
  //
  //.carousel__slide {
  //  opacity: 0.9;
  //  transform: rotateY(-20deg) scale(0.95);
  //}
  //
  //.carousel__slide--active ~ .carousel__slide {
  //  transform: rotateY(20deg) scale(0.95);
  //}
  //
  //.carousel__slide--prev {
  //  opacity: 1;
  //  transform: rotateY(-10deg) scale(0.95);
  //}
  //
  //.carousel__slide--next {
  //  opacity: 1;
  //  transform: rotateY(10deg) scale(0.95);
  //}
  //
  //.carousel__slide--active {
  //  opacity: 1;
  //  transform: rotateY(0) scale(1.05);
  //}
}
</style>
