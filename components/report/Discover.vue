<script setup lang="ts">
import { ref } from 'vue';
import ItemDiscover from './ItemDiscover.vue';

const reports = [
  {
    category_report_id: 'c1144728673',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Bách Hoá - Thực Phẩm',
    url: '/bach-hoa-thuc-pham'
  },
  {
    category_report_id: 'c1189843250',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Chăm Sóc Thú Cưng',
    url: '/cham-soc-thu-cung'
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
    title: 'Giày Dép Nam',
    url: '/giay-dep-nam'
  },
  {
    category_report_id: 'c1890857051',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Giày Dép Nữ',
    url: '/giay-dep-nu'
  },
  {
    category_report_id: 'c950887968',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Làm Đẹp',
    url: '/lam-dep'
  },
  {
    category_report_id: 'c1919231407',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Máy Tính, Laptop & Thiết bị văn phòng',
    url: '/may-tinh-laptop-thiet-bi-van-phong'
  },
  {
    category_report_id: 'c997967148',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Máy Ảnh & Máy Quay Phim',
    url: '/may-anh-may-quay-phim'
  },
  {
    category_report_id: 'c1478997685',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Mẹ & Bé',
    url: '/me-be'
  },
  {
    category_report_id: 'c1182326609',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Nhà Cửa - Đời Sống',
    url: '/nha-cua-doi-song'
  },
  {
    category_report_id: 'c349363110',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Nhạc & Phim',
    url: '/nhac-phim'
  },
  {
    category_report_id: 'c1776859460',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Phụ Kiện Thời Trang',
    url: '/phu-kien-thoi-trang'
  },
  {
    category_report_id: 'c2146627932',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Sách & Tạp Chí',
    url: '/sach-tap-chi'
  },
  {
    category_report_id: 'c2035652732',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Sức Khoẻ',
    url: '/suc-khoe'
  },
  {
    category_report_id: 'c984920598',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết Bị Số & Gaming',
    url: '/thiet-bi-am-thanh'
  },
  {
    category_report_id: 'c952389459',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết Bị Âm Thanh',
    url: '/thiet-bi-am-thanh'
  },
  {
    category_report_id: 'c1149754732',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thể Thao & Du Lịch',
    url: '/the-thao-du-lich'
  },
  {
    category_report_id: 'c937408522',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thời Trang Nam',
    url: '/thoi-trang-nam'
  },
  {
    category_report_id: 'c1000062491',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thời Trang Nữ',
    url: '/thoi-trang-nu'
  },
  {
    category_report_id: 'c41293969',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thời Trang Trẻ Em',
    url: '/thoi-trang-tre-em'
  },
  {
    category_report_id: 'c890463890',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Túi Ví Nam',
    url: '/thiet-bi-so-phu-kien-so'
  },
  {
    category_report_id: 'c109830509',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Túi Ví Nữ',
    url: '/thiet-bi-so-phu-kien-so'
  },
  {
    category_report_id: 'c1049283522',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Voucher - Dịch Vụ',
    url: '/voucher-dich-vu'
  },
  {
    category_report_id: 'c1278655688',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Văn Phòng Phẩm',
    url: '/thiet-bi-van-phong-khac'
  },
  {
    category_report_id: 'c796145721',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Ô Tô - Xe Máy',
    url: '/o-to-xe-may'
  },
  {
    category_report_id: 'c945324293',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Điện Gia Dụng',
    url: '/dien-gia-dung'
  },
  {
    category_report_id: 'c1704246187',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Điện Thoại & Máy Tính Bảng',
    url: '/dien-thoai-may-tinh-bang'
  },
  {
    category_report_id: 'c806141846',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Đồ Chơi',
    url: '/do-choi'
  },
  {
    category_report_id: 'c230833630',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Đồng Hò & Trang Sức',
    url: '/dong-ho-trang-suc'
  },
  {
    category_report_id: 'c1000000000',
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Chưa Phân Loại',
    url: '/chua-phan-loai'
  },
];

const showMore = ref(false);

const toggleSeeMore = () => {
  showMore.value = !showMore.value;
}
</script>

<template>
  <div class="discover">
    <div class="title">Khám phá theo ngành hàng</div>
    <item-discover :show-more="showMore" :reports="reports" class="lst_item"/>
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
  background-color: #FFF;
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
