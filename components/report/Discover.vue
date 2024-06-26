<script setup lang="ts">
import { ref, computed } from 'vue';
import ItemDiscover from './ItemDiscover.vue';

const reports = [
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Điện thoại & Máy tính ...',
    url: '/dien-thoai-may-tinh-bang'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Máy tính, Laptop & Thiết...',
    url: '/may-tinh-laptop-thiet-bi-van-phong'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Nhà cửa & Đời sống',
    url: '/nha-cua-doi-song'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Bách hoá thực phẩm',
    url: '/bach-hoa-thuc-pham'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Làm đẹp',
    url: '/lam-dep'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Sức khoẻ',
    url: '/suc-khoe'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thời trang nam',
    url: '/thoi-trang-nam'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thời trang nữ',
    url: '/thoi-trang-nu'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thể thao',
    url: '/the-thao'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Phụ kiện thời trang',
    url: '/phu-kien-thoi-trang'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Đồ chơi, mẹ & bé',
    url: '/do-choi-me-be'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thú cưng',
    url: '/thu-cung'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Xe máy, ô tô & xe đạp',
    url: '/xe-may-o-to-xe-dap'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị điện gia dụng',
    url: '/thiet-bi-dien-gia-dung'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị âm thanh',
    url: '/thiet-bi-am-thanh'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Đồng hồ',
    url: '/dong-ho'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Máy ảnh & máy quay phim',
    url: '/may-anh-may-quay-phim'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Điện tử - Điện lạnh',
    url: '/dien-tu-dien-lanh'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Điện thoại & Phụ kiện',
    url: '/dien-thoai-phu-kien'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Đồng hồ thông minh',
    url: '/dong-ho-thong-minh'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Phụ kiện',
    url: '/phu-kien'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị số - Phụ kiện số',
    url: '/thiet-bi-so-phu-kien-so'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng phầm mềm',
    url: '/thiet-bi-van-phong-pham-mem'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng phần cứng',
    url: '/thiet-bi-van-phong-phan-cung'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác',
    url: '/thiet-bi-van-phong-khac'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác',
    url: '/thiet-bi-van-phong-khac'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác',
    url: '/thiet-bi-van-phong-khac'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác',
    url: '/thiet-bi-van-phong-khac'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác',
    url: '/thiet-bi-van-phong-khac'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác',
    url: '/thiet-bi-van-phong-khac'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác',
    url: '/thiet-bi-van-phong-khac'
  },
  {
    category_report_id: 'c1513215936',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác',
    url: '/thiet-bi-van-phong-khac'
  },
];

const showMore = ref(false);

const displayedReports = computed(() => {
  return showMore.value ? reports : reports.slice(0, 12);
});

const toggleSeeMore = () => {
  showMore.value = !showMore.value;
}
</script>

<template>
  <div class="discover">
    <div class="title">Khám phá theo ngành hàng</div>
    <div class="lst_item">
      <item-discover v-for="report in displayedReports" :image="report.image" :title="report.title" class="item"/>
    </div>
    <div class="see_more">
      <button class="button_see_more" @click="toggleSeeMore">{{ showMore ? 'Ẩn bớt' : 'Xem thêm' }}</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lst_item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 16px;
  width: calc(100% - 200px);
}

.title{
  display: flex;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  color: #241E46;
}

.discover{
  background-color: #FAF9FF;
  padding-top: 200px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.see_more{
  display: flex;
  justify-content: center;

  .button_see_more {
    width: 160px;
    height: 50px;
    border-radius: 8px;
    padding: 9px 16px;
    background: #E85912;
    color: #FFF;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #E85912;
  }
}

@media (max-width: 430px) {
  .lst_item {
    width: calc(100% - 50px);
    grid-template-columns: repeat(2, 1fr);
  }
  .title{
    font-size: 24px;
  }
}
</style>
