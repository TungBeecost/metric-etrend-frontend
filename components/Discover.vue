<script setup lang="ts">
import { ref, computed } from 'vue';
import ItemDiscover from './ItemDiscover.vue';

const reports = [
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Điện thoại & Máy tính ...'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Máy tính, Laptop & Thiết...'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Nhà cửa & Đời sống'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Bách hoá thực phẩm'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Làm đẹp'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Sức khoẻ'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thời trang nam'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thời trang nữ'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thể thao'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Phụ kiện thời trang'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Đồ chơi, mẹ & bé'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thú cưng'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Xe máy, ô tô & xe đạp'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị điện gia dụng'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị âm thanh'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Đồng hồ'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Máy ảnh & máy quay phim'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Điện tử - Điện lạnh'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Điện thoại & Phụ kiện'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Đồng hồ thông minh'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Phụ kiện'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị số - Phụ kiện số'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng phầm mềm'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng phần cứng'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác'
  },
  {
    image: 'https://thumbs.dreamstime.com/b/old-phone-icon-vector-outline-telephone-line-vintage-phone-sym-old-phone-icon-vector-outline-telephone-line-vintage-phone-symbol-114416521.jpg',
    title: 'Thiết bị văn phòng khác'
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
  <div class="discover default_section">
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
}

.title{
  display: flex;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  color: #241E46;
}

.discover{
  padding-top: 100px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
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
</style>
