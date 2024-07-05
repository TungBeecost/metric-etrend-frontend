<script setup lang="ts">
import {ref} from 'vue';
import ItemDiscover from './ItemDiscover.vue';
import C1704246187Icon from '~/public/icons/categories/Điện Thoại & Máy Tính Bảng.svg';
import C1919231407Icon from '~/public/icons/categories/Máy Tính, Laptop & Thiết bị văn phòng.svg';
import C1513215936Icon from '~/public/icons/categories/Nhà cửa & Đời sống.svg';
import C1144728673Icon from '~/public/icons/categories/Bách Hoá - Thực Phẩm.svg';
import C950887968Icon from '~/public/icons/categories/Làm Đẹp.svg';
import C2035652732Icon from '~/public/icons/categories/Sức Khoẻ.svg';
import C937408522Icon from '~/public/icons/categories/Thời Trang Nam.svg';
import C1000062491Icon from '~/public/icons/categories/Thời Trang Nữ.svg';
import C1890857051Icon from '~/public/icons/categories/Giày Dép Nữ.svg';
import C890463890Icon from '~/public/icons/categories/Túi Ví Nam.svg';
import C109830509Icon from '~/public/icons/categories/Túi Ví Nữ.svg';
import C1478997685Icon from '~/public/icons/categories/Mẹ & Bé.svg';
import C1189843250Icon from '~/public/icons/categories/Chăm Sóc Thú Cưng.svg';
import C997967148Icon from '~/public/icons/categories/Máy Ảnh & Máy Quay Phim.svg';
import C349363110Icon from '~/public/icons/categories/Nhạc & Phim.svg';
import C1776859460Icon from '~/public/icons/categories/Phụ Kiện Thời Trang.svg';
import C2146627932Icon from '~/public/icons/categories/Sách & Tạp Chí.svg';
import C984920598Icon from '~/public/icons/categories/Thiết Bị Số & Gaming.svg';
import C952389459Icon from '~/public/icons/categories/Thiết Bị Âm Thanh.svg';
import C1149754732Icon from '~/public/icons/categories/Thể Thao & Du Lịch.svg';
import C41293969Icon from '~/public/icons/categories/Thời Trang Trẻ Em.svg';
import C1049283522Icon from '~/public/icons/categories/Voucher - Dịch Vụ.svg';
import C1278655688Icon from '~/public/icons/categories/Văn Phòng Phẩm.svg';
import C796145721Icon from '~/public/icons/categories/Ô Tô - Xe Máy.svg';
import C945324293Icon from '~/public/icons/categories/Điện Gia Dụng.svg';
import C806141846Icon from '~/public/icons/categories/Đồ Chơi.svg';

const reports = [
  {
    category_report_id: 'c1704246187',
    // image: 'icons/categories/Điện Thoại & Máy Tính Bảng.svg',
    image: C1704246187Icon,
    title: 'Điện Thoại & Máy Tính Bảng',
    url: '/dien-thoai-may-tinh-bang'
  },
  {
    category_report_id: 'c1919231407',
    // image: 'icons/categories/Máy Tính, Laptop & Thiết bị văn phòng.svg',
    image: C1919231407Icon,
    title: 'Máy Tính, Laptop & Thiết bị văn phòng',
    url: '/may-tinh-laptop-thiet-bi-van-phong'
  },
  {
    category_report_id: 'c1513215936',
    // image: 'icons/categories/Nhà cửa & Đời sống.svg',
    image: C1513215936Icon,
    title: 'Nhà cửa & Đời sống',
    url: '/nha-cua-doi-song'
  },
  {
    category_report_id: 'c1144728673',
    // image: 'icons/categories/Bách Hoá - Thực Phẩm.svg',
    image: C1144728673Icon,
    title: 'Bách Hoá - Thực Phẩm',
    url: '/bach-hoa-thuc-pham'
  },
  {
    category_report_id: 'c950887968',
    // image: 'icons/categories/Làm Đẹp.svg',
    image: C950887968Icon,
    title: 'Làm Đẹp',
    url: '/lam-dep'
  },
  {
    category_report_id: 'c2035652732',
    // image: 'icons/categories/Sức Khoẻ.svg',
    image: C2035652732Icon,
    title: 'Sức Khoẻ',
    url: '/suc-khoe'
  },
  {
    category_report_id: 'c937408522',
    // image: 'icons/categories/Thời Trang Nam.svg',
    image: C937408522Icon,
    title: 'Thời Trang Nam',
    url: '/thoi-trang-nam'
  },
  {
    category_report_id: 'c1000062491',
    // image: 'icons/categories/Thời Trang Nữ.svg',
    image: C1000062491Icon,
    title: 'Thời Trang Nữ',
    url: '/thoi-trang-nu'
  },
  {
    category_report_id: 'c1513215936',
    // image: 'icons/categories/Giày Dép Nam.svg',
    image: C1513215936Icon,
    title: 'Giày Dép Nam',
    url: '/giay-dep-nam'
  },
  {
    category_report_id: 'c1890857051',
    // image: 'icons/categories/Giày Dép Nữ.svg',
    image: C1890857051Icon,
    title: 'Giày Dép Nữ',
    url: '/giay-dep-nu'
  },
  {
    category_report_id: 'c890463890',
    // image: 'icons/categories/Túi Ví Nam.svg',
    image: C890463890Icon,
    title: 'Túi Ví Nam',
    url: '/thiet-bi-so-phu-kien-so'
  },
  {
    category_report_id: 'c109830509',
    // image: 'icons/categories/Túi Ví Nữ.svg',
    image: C109830509Icon,
    title: 'Túi Ví Nữ',
    url: '/thiet-bi-so-phu-kien-so'
  },
  {
    category_report_id: 'c1478997685',
    // image: 'icons/categories/Mẹ & Bé.svg',
    image: C1478997685Icon,
    title: 'Mẹ & Bé',
    url: '/me-be'
  },
  {
    category_report_id: 'c1189843250',
    // image: 'icons/categories/Chăm Sóc Thú Cưng.svg',
    image: C1189843250Icon,
    title: 'Chăm Sóc Thú Cưng',
    url: '/cham-soc-thu-cung'
  },
  {
    category_report_id: 'c997967148',
    // image: 'icons/categories/Máy Ảnh & Máy Quay Phim.svg',
    image: C997967148Icon,
    title: 'Máy Ảnh & Máy Quay Phim',
    url: '/may-anh-may-quay-phim'
  },
  {
    category_report_id: 'c349363110',
    // image: 'icons/categories/Nhạc & Phim.svg',
    image: C349363110Icon,
    title: 'Nhạc & Phim',
    url: '/nhac-phim'
  },
  {
    category_report_id: 'c1776859460',
    // image: 'icons/categories/Phụ Kiện Thời Trang.svg',
    image: C1776859460Icon,
    title: 'Phụ Kiện Thời Trang',
    url: '/phu-kien-thoi-trang'
  },
  {
    category_report_id: 'c2146627932',
    // image: 'icons/categories/Sách & Tạp Chí.svg',
    image: C2146627932Icon,
    title: 'Sách & Tạp Chí',
    url: '/sach-tap-chi'
  },
  {
    category_report_id: 'c984920598',
    // image: 'icons/categories/Thiết Bị Số & Gaming.svg',
    image: C984920598Icon,
    title: 'Thiết Bị Số & Gaming',
    url: '/thiet-bi-am-thanh'
  },
  {
    category_report_id: 'c952389459',
    // image: 'icons/categories/Thiết Bị Âm Thanh.svg',
    image: C952389459Icon,
    title: 'Thiết Bị Âm Thanh',
    url: '/thiet-bi-am-thanh'
  },
  {
    category_report_id: 'c1149754732',
    // image: 'icons/categories/Thể Thao & Du Lịch.svg',
    image: C1149754732Icon,
    title: 'Thể Thao & Du Lịch',
    url: '/the-thao-du-lich'
  },
  {
    category_report_id: 'c41293969',
    // image: 'icons/categories/Thời Trang Trẻ Em.svg',
    image: C41293969Icon,
    title: 'Thời Trang Trẻ Em',
    url: '/thoi-trang-tre-em'
  },
  {
    category_report_id: 'c1049283522',
    // image: 'icons/categories/Voucher - Dịch Vụ.svg',
    image: C1049283522Icon,
    title: 'Voucher - Dịch Vụ',
    url: '/voucher-dich-vu'
  },
  {
    category_report_id: 'c1278655688',
    // image: 'icons/categories/Văn Phòng Phẩm.svg',
    image: C1278655688Icon,
    title: 'Văn Phòng Phẩm',
    url: '/thiet-bi-van-phong-khac'
  },
  {
    category_report_id: 'c796145721',
    // image: 'icons/categories/Ô Tô - Xe Máy.svg',
    image: C796145721Icon,
    title: 'Ô Tô - Xe Máy',
    url: '/o-to-xe-may'
  },
  {
    category_report_id: 'c945324293',
    // image: 'icons/categories/Điện Gia Dụng.svg',
    image: C945324293Icon,
    title: 'Điện Gia Dụng',
    url: '/dien-gia-dung'
  },
  {
    category_report_id: 'c806141846',
    // image: 'icons/categories/Đồ Chơi.svg',
    image: C806141846Icon,
    title: 'Đồ Chơi',
    url: '/do-choi'
  },
  {
    category_report_id: 'c230833630',
    // image: 'icons/categories/Đồng Hò & Trang Sức.svg',
    image: C806141846Icon,
    title: 'Đồng Hồ & Trang Sức',
    url: '/dong-ho-trang-suc'
  },
];

const showMore = ref(false);

const toggleSeeMore = () => {
  showMore.value = !showMore.value;
}
</script>

<template>
  <div class="discover default_section">
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
  //width: calc(100% - 200px);
}

.title {
  display: flex;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  color: #241E46;
}

.discover {
  background-color: #FFF;
  padding-top: 200px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.see_more {
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
  .title {
    font-size: 24px;
  }
}
</style>
