<script setup>

const {tableOfContent, data} = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  tableOfContent: {
    type: Array,
    default: () => []
  }
});

const displayTableOfContent = computed(() => {
  if (!data) {
    return []
  }

  if (data?.report_type === 'report_category') {
    return [
      {
        title: 'Tổng quan',
        children: [
          {title: 'Quy mô thị trường'},
          {title: 'Doanh số, sản phẩm đã bán theo tháng'},
          {title: 'Tỷ trọng doanh số theo sàn'},
        ],
      },
      {
        title: 'Nhóm hàng',
        children: [
          {title: 'Tỷ trọng doanh số theo top 5 nhóm hàng'},
          {title: 'Tỷ trọng sản lượng bán theo top 5 nhóm hàng'}
        ],
      },
      {
        title: 'Phân khúc giá',
        children: [
          {title: 'Doanh số, sản phẩm đã bán theo phân khúc giá'}
        ],
      },
      {
        title: 'Thương hiệu',
        children: [
          {title: 'Top thương hiệu theo doanh số'},
          {title: 'Top thương hiệu theo sản lượng bán'},
        ],
      },
      {
        title: 'Gian hàng hàng đầu',
        children: [
          {title: 'Tỷ trọng doanh số theo loại gian hàng'},
          {title: 'Thống kê top gian hàng hàng đầu'},
        ],
      },
      {
        title: 'Sản phẩm bán chạy',
        children: [
          {title: 'Top sản phẩm bán chạy'},
        ],
      },
    ]

  }

  if (data.report_type !== 'report_category' && data.report_type !== 'report_product_line') {
    return data?.data_analytic?.table_of_content || [];
  }

  return [
    {
      title: 'Tổng quan',
      children: [
        {title: 'Quy mô thị trường'},
        {title: 'Doanh số, sản phẩm đã bán theo tháng'},
        {title: 'Tỷ trọng doanh số theo sàn'},
        {title: 'Thống kê doanh số theo sàn'},
      ],
    },
    {
      title: 'Phân khúc giá',
      children: [
        {title: 'Doanh số, sản phẩm đã bán theo phân khúc giá'}
      ],
    },
    {
      title: 'Thương hiệu',
      children: [
        {title: 'Top thương hiệu theo doanh số'},
        {title: 'Top thương hiệu theo sản lượng bán'},
      ],
    },
    {
      title: 'Gian hàng hàng đầu',
      children: [
        {title: 'Tỷ trọng doanh số theo loại gian hàng'},
        {title: 'Tỷ trọng doanh số top gian hàng bán chạy'},
        {title: 'Tỷ trọng sản lượng top gian hàng bán chạy'},
        {title: 'Thống kê top gian hàng hàng đầu'},
      ],
    },
    {
      title: 'Sản phẩm bán chạy',
      children: [
        {title: 'Top sản phẩm bán chạy'},
        {title: 'Top sản phẩm mới bán chạy'},
      ],
    },
  ]

})

</script>

<template>
  <div class="report_content">
    <div class="statistic-item__title">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
      </svg>
      <div>
        <div class="statistic-item__title">Nội dung báo cáo</div>
      </div>
    </div>
    <div class="content">
      <div v-for="(item, index) in displayTableOfContent">
        <div class="title">
          {{ item?.title || item }}
        </div>
        <ul v-if="item?.children?.length">
          <li v-for="child in item.children">{{ child.title }}</li>
        </ul>
        <br v-else-if="index !== tableOfContent.length - 1">
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
  padding-left: 36px;
  padding-top: 8px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  color: #241E46;
}

ul {
  padding-left: 16px;
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