<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  tableOfContent: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
});

const displayTableOfContent = computed(() => {
  if (!props.data) {
    return []
  }

  if (props.data?.report_type === 'report_category') {
    return [
      {
        title: `I. Tổng quan thị trường`,
        children: [
          {title: `Quy mô thị trường`},
          {title: 'Thống kê theo sàn'},
          {title: 'Thống kê theo tháng'},
          {title: 'Thống kê theo phân khúc giá'},
          {title: 'Doanh số, sản phẩm đã bán theo phân khúc giá'},

        ],
      },
      {
        title: 'II. Thống kê thương hiệu',
        children: [
          {title: 'Thống kê thương hiệu toàn thị trường'},
          {title: 'Top thương hiệu sàn Shopee, Tiktok, Lazada, Tiki'},
        ],
      },
      {
        title: 'III. Thống kê shop',
        children: [
          {title: 'Thị phần doanh số theo loại shop'},
          {title: 'Thị phần doanh số theo khu vực của shop'},
          {title: 'Thống kê shop bán chạy toàn thị trường'},
          {title: 'Thống kê shop bán chạy từng sàn Shopee, Tiktok. Lazada, Tiki'},
          {title: 'Chi tiết 20 shop bán chạy'},
        ],
      },
      {
        title: 'IV. Thống kê sản phẩm bán chạy',
        children: [
          {title: 'Sản phẩm bán chạy toàn thị trường'},
          {title: 'Sản phẩm bán chạy từng sàn Shopee, Tiktok, Lazada, Tiki'},
          {title: 'Sản phẩm trending bán chạy'},
        ],
      },
      {
        title: 'V. Thống kê đánh giá',
        children: [
          {title: 'Thống kê shop có đánh giá tốt'},
          {title: 'Thống kê sản phẩm có đánh giá tốt'},
        ],
      },
    ]

  }

  if (props.data.report_type !== 'report_category' && props.data.report_type !== 'report_product_line') {
    return props.data?.data_analytic?.table_of_content || [];
  }

  return [
    {
      title: `I. Tổng quan thị trường`,
      children: [
        {title: `Quy mô thị trường`},
        {title: 'Thống kê theo sàn'},
        {title: 'Thống kê theo tháng'},
        {title: 'Thống kê theo phân khúc giá'},
        {title: 'Doanh số, sản phẩm đã bán theo phân khúc giá'},

      ],
    },
    {
      title: 'II. Thống kê thương hiệu',
      children: [
        {title: 'Thống kê thương hiệu toàn thị trường'},
        {title: 'Top thương hiệu sàn Shopee, Tiktok, Lazada, Tiki'},
      ],
    },
    {
      title: 'III. Thống kê shop',
      children: [
        {title: 'Thị phần doanh số theo loại shop'},
        {title: 'Thị phần doanh số theo khu vực của shop'},
        {title: 'Thống kê shop bán chạy toàn thị trường'},
        {title: 'Thống kê shop bán chạy từng sàn Shopee, Tiktok. Lazada, Tiki'},
        {title: 'Chi tiết 20 shop bán chạy'},
      ],
    },
    {
      title: 'IV. Thống kê sản phẩm bán chạy',
      children: [
        {title: 'Sản phẩm bán chạy toàn thị trường'},
        {title: 'Sản phẩm bán chạy từng sàn Shopee, Tiktok, Lazada, Tiki'},
        {title: 'Sản phẩm trending bán chạy'},
      ],
    },
    {
      title: 'V. Thống kê đánh giá',
      children: [
        {title: 'Thống kê shop có đánh giá tốt'},
        {title: 'Thống kê sản phẩm có đánh giá tốt'},
      ],
    },
  ]
})
</script>

<template>
  <div class="report_content">
    <div class="statistic-item__title">
      <div>
        <h2 class="statistic-item__title">Nội dung báo cáo</h2>
      </div>
    </div>
    <a-skeleton style="padding-top: 8px" v-if="props.loading" :paragraph="{ rows: 23 }"/>
    <div v-else class="content">
      <div v-for="(item, index) in displayTableOfContent">
        <div class="title">
          {{ item?.title || item }}
        </div>
        <ul v-if="item?.children?.length">
          <li v-for="child in item.children">{{ child.title }}</li>
        </ul>
        <br v-else-if="index !== props.tableOfContent.length - 1">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.report_content {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #EEEBFF;
  display: flex;
  flex-direction: column;

  background: #fff;
}

.statistic-item__title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-weight: 700;
  color: #241E46;
}

.content {
  font-size: 14px;
  line-height: 24px;
  //padding-left: 24px;
  padding-top: 8px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  color: #241E46;
}

ul {
  padding-left: 2em;
  list-style-type: decimal;
}

li {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .report_content {
    padding: 16px;
    //border: none;
  }
}
</style>