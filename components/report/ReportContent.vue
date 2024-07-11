<script setup>

const {tableOfContent} = defineProps({
  tableOfContent: {
    type: Array[Object],
    default: () => [
      {
        title: 'Tổng quan chung',
        children: [
          {title: 'Quy mô thị trường'},
          {title: 'Thống kê doanh thu theo tháng'},
          {title: 'Thị phần các sàn TMĐT'},
        ],
      },
      {
        title: 'Phân khúc giá',
        children: [
          {title: 'Doanh thu theo phân khúc giá và sàn'}
        ],
      },
      {
        title: 'Thương hiệu',
        children: [
          {title: 'Top thương hiệu theo doanh số'},
          {title: 'Top thương hiệu theo số sản phẩm đã bán'},
        ],
      },
      {
        title: 'Gian hàng hàng đầu',
        children: [
          {title: 'Thống kê top gian hàng'},
          {title: 'Tỉ trọng doanh số theo loại gian hàng'},
        ],
      },
      {
        title: 'Sản phẩm bán chạy',
        children: [
          {title: 'Top sản phẩm doanh thu cao nhất'},
        ],
      },
      {
        title: 'Top sản phẩm mới đang bán chạy',
        children: []
      },
    ]
  }
});

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
      <div v-for="(item, index) in tableOfContent">

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
  border-radius: 8px;
  border: 1px solid #EEEBFF;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.statistic-item__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 700;
  color: #241E46;
}

.content {
  font-size: 14px;
  line-height: 24px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: #241E46;
}

ul {
  padding-left: 16px;
}

li {
  margin-top: 8px;
}
</style>