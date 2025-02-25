<script setup lang="ts">
import {formatAndRoundSortTextCurrencyWithMinValue} from "~/helpers/FormatHelper";
const config = useRuntimeConfig();
const currentPage = ref(1);
const pageSize = 8;

const { reports } = defineProps({
  reports: {
    type: Array<any>,
    default: () => []
  }
});

const handleClickReport = (slug: string) => {
  window.location.href = `${config.public.BASE_URL}/${slug}`;
};

const handleClickProductLine = () => {
  window.location.href = '/search?report_type=report_product_line';
};

const paginatedReports = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return reports.slice(start, end);
});
</script>

<template>
  <div class="item_metric_release grid-container">
    <div @click="handleClickReport(report.slug)" class="column" v-for="(report, index) in paginatedReports" :key="index">
      <div @click="handleClickProductLine" class="image">
        <img v-if="report.url_thumbnail" loading="lazy" :src="report.url_thumbnail" alt="url_thumbnail" />
        <img v-else src="/images/default_thumbnail_report.png" alt="placeholder" />
      </div>
      <div class="content">
        <div class="title">Báo cáo {{ report.name }}</div>
        <div class="report_info">
          <img src="/icons/ShopIcon.svg" alt="shop" >
          <p>{{formatAndRoundSortTextCurrencyWithMinValue(report.shop)}}</p>
          <p style="color: #716B95"> - nhà bán</p>
        </div>
        <div class="report_info">
          <img src="/icons/ProductIcon.svg" alt="product" >
          <p>{{formatAndRoundSortTextCurrencyWithMinValue(report.product)}}</p>
          <p style="color: #716B95"> - sản phẩm</p>
        </div>
        <div class="report_info">
          <img src="/icons/GrowthIcon.svg" alt="product" >
          <p style="color: #E85912">Xem chi tiết</p>
          <p style="color: #716B95"> doanh số</p>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 100%; display: flex; justify-content: end; margin-top: 24px;">
    <a-pagination v-model:current="currentPage" :total="reports.length" :page-size="pageSize" show-less-items />
  </div>
</template>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px; /* Adjust the gap between columns as needed */
}

.column {
  display: flex;
  align-items: flex-start;
  border-radius: 16px;
  border: 1px solid var(--Dark-blue-dark-blue-2, #EEEBFF);
  cursor: pointer;
}

.image{
  display: flex;
  align-items: center;
  img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 16px;
  }
}


.content {
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;

  .title {
    overflow: hidden;
    color: var(--Dark-blue-dark-blue-8, #241E46);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    align-self: stretch;
    text-overflow: ellipsis;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
  }

  .report_info{
    display: flex;
    align-items: center;
    gap: 4px;

    img{
      width: 16px;
      height: 16px;
    }
  }
}
@media (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }

  .image{
    img {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 16px;
    }
  }

  .content {
    padding: 4px;
    gap: 4px;
    .title {
      font-size: 16px;
      line-height: 24px;
    }

    .report_info{
      gap: 8px;
      font-size: 12px;
      .title {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}

</style>