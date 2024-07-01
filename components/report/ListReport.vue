<script setup lang="ts">
import { defineProps } from 'vue'

interface DataItem {
  id: string; // Add this line
  name: string;
  slug: string;
  url_thumbnail: string;
  revenue_monthly: number;
  gr_quarter: number;
  shop: string;
  lst_category: { name: string }[]; // Add this line
  lst_brand: string[]; // Add this line
}

const props = defineProps({
  data: {
    type: Array as () => DataItem[],
    default: () => [],
  },
});
</script>

<template>
  <div class="lst_report">
    <div v-for="item in props.data" :key="item.id" class="lst_item">
      <div class="item">
        <div class="image">
          <img :src="item.url_thumbnail" alt="">
        </div>
        <div class="info">
          <div class="breadcrumb">{{item.lst_category[0].name}} | 24/05/2024</div>
          <div class="name">Báo cáo {{item.name}}</div>
          <div class="description">Báo cáo thị phần thương hiệu hàng đầu như {{ item.lst_brand.join(', ') }} v.v</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lst_report{
  display: flex;
  flex-direction: column;
  gap: 32px;
  .lst_item{
    display: flex;
    .item{
      display: flex;
      gap: 24px;
      padding: 24px;
      align-items: center;
      border: 1px solid #EEEBFF;
      background-color: #FFF;
      border-radius: 16px;
      width: 100%;

      .image{
        img{
          width: 170px;
          height: 130px;
          object-fit: cover;
          border-radius: 8px;
        }
      }

      .info{
        display: flex;
        flex-direction: column;
        gap: 16px;

        .breadcrumb{
          font-size: 14px;
          color: #716B95;
          line-height: 22px;
        }
        .name{
          overflow: hidden;
          color: #241E46;
          font-size: 20px;
          font-weight: bold;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          align-self: stretch;
        }
        .description{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          color: #716B95;
          text-overflow: ellipsis;
          font-size: 16px;
          line-height: 24px;
          overflow: hidden;

        }
      }
    }
  }

  @media (max-width: 767px) {
    .lst_item {
      .item {
        padding: 12px;
        .image {
          img {
            width: 120px;
            height: 120px;
          }
        }

        .info {
          .breadcrumb {
            font-size: 10px;
          }

          .name {
            font-size: 14px;
          }

          .description {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>