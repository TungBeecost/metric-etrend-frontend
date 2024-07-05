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
import allReports from '@/public/file_json/list_category.json';

const reports = allReports.filter(report => report.level === 1);

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
