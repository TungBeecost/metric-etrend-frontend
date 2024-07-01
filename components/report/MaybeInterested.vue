<script setup lang="ts">
const lst_maybe_interested = ref([
  {
    id: 1,
    name: 'Báo cáo Ngành hàng Giày nam',
    thumbnail: 'https://streetstyleshop.vn/wp-content/uploads/2022/04/the-thao-nam-moi-nhat-5.jpg',
    category: 'Giày dép nam',
    date: '24/05/2024',
  },
  {
    id: 2,
    name: 'Báo cáo Ngành hàng Điện thoại',
    thumbnail: 'https://streetstyleshop.vn/wp-content/uploads/2022/04/the-thao-nam-moi-nhat-5.jpg',
    category: 'Điện thoại & Máy tính bảng',
    date: '24/05/2024',
  },
  {
    id: 3,
    name: 'Báo cáo Ngành hàng Đồng hồ',
    thumbnail: 'https://streetstyleshop.vn/wp-content/uploads/2022/04/the-thao-nam-moi-nhat-5.jpg',
    category: 'Đồng hồ & Trang sức',
    date: '24/05/2024',
  },
  {
    id: 4,
    name: 'Báo cáo Ngành hàng Máy ảnh',
    thumbnail: 'https://streetstyleshop.vn/wp-content/uploads/2022/04/the-thao-nam-moi-nhat-5.jpg',
    category: 'Máy ảnh & Máy quay phim',
    date: '24/05/2024',
  },
  {
    id: 5,
    name: 'Báo cáo Ngành hàng Sách',
    thumbnail: 'https://streetstyleshop.vn/wp-content/uploads/2022/04/the-thao-nam-moi-nhat-5.jpg',
    category: 'Sách & Tạp chí',
    date: '24/05/2024',
  }
]);
</script>

<template>
  <div class="maybe_interested">
    <div class="title">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="16" fill="#FDEEE7"/>
        <g clip-path="url(#clip0_4170_23086)">
          <path opacity="0.2" d="M12.5336 19.9066C11.8649 19.379 11.3233 18.7052 10.9495 17.9359C10.5756 17.1666 10.3792 16.3217 10.3751 15.4647C10.3582 12.3855 12.8162 9.82268 15.8641 9.75167C17.0453 9.72277 18.2055 10.0703 19.1801 10.745C20.1547 11.4196 20.8942 12.3871 21.2937 13.5102C21.6932 14.6333 21.7324 15.855 21.4057 17.0018C21.079 18.1487 20.4031 19.1625 19.4737 19.8995C19.2688 20.06 19.1027 20.2655 18.988 20.5006C18.8734 20.7356 18.8132 20.9938 18.8121 21.2558V21.6819C18.8121 21.8326 18.7529 21.9771 18.6474 22.0836C18.5419 22.1901 18.3988 22.25 18.2497 22.25H13.7499C13.6007 22.25 13.4577 22.1901 13.3522 22.0836C13.2467 21.9771 13.1874 21.8326 13.1874 21.6819V21.2558C13.1872 20.9955 13.1281 20.7387 13.0148 20.5049C12.9015 20.2711 12.7369 20.0665 12.5336 19.9066Z" fill="#E85912"/>
          <path d="M12.875 24.75H19.125" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.5336 19.9066C11.8649 19.379 11.3233 18.7052 10.9495 17.9359C10.5756 17.1666 10.3792 16.3217 10.3751 15.4647C10.3582 12.3855 12.8162 9.82268 15.8641 9.75167C17.0453 9.72277 18.2055 10.0703 19.1801 10.745C20.1547 11.4196 20.8942 12.3871 21.2937 13.5102C21.6932 14.6333 21.7324 15.855 21.4057 17.0018C21.079 18.1487 20.4031 19.1625 19.4737 19.8995C19.2688 20.06 19.1027 20.2655 18.988 20.5006C18.8734 20.7356 18.8132 20.9938 18.8121 21.2558V21.6819C18.8121 21.8326 18.7529 21.9771 18.6474 22.0836C18.5419 22.1901 18.3988 22.25 18.2497 22.25H13.7499C13.6007 22.25 13.4577 22.1901 13.3522 22.0836C13.2467 21.9771 13.1874 21.8326 13.1874 21.6819V21.2558C13.1872 20.9955 13.1281 20.7387 13.0148 20.5049C12.9015 20.2711 12.7369 20.0665 12.5336 19.9066Z" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 7.875V7.25" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21.625 9.75L22.5625 8.8125" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.375 9.75L9.4375 8.8125" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 21.625V18.5" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.125 16.625L16 18.5L17.875 16.625" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_4170_23086">
            <rect width="20" height="20" fill="white" transform="translate(6 6)"/>
          </clipPath>
        </defs>
      </svg>
      <div class="title_content">
        Có thể bạn quan tâm
      </div>
    </div>
    <div v-for="item in lst_maybe_interested" :key="item.id" class="item">
      <div class="image">
        <img :src="item.thumbnail" alt="">
      </div>
      <div class="info">
        <div class="breadcrumb">{{ item.category }} | {{ item.date }}</div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.maybe_interested{
  display: flex;
  flex-direction: column;
  padding: 24px;
  align-items: flex-start;
  border-radius: 16px;
  border: 1px solid #EEEBFF;
  background: #FFF;
  gap: 24px;
  .title{
    display: flex;
    align-items: center;
    gap: 16px;
    .title_content{
      font-size: 16px;
      font-weight: bold;
      color: #241E46;
      line-height: 24px;
    }
  }
  .item {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 16px;
    flex-wrap: wrap;

    .image {
      img {
        width: 45px;
        height: 45px;
        border-radius: 8px;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1 0 0;

      .breadcrumb {
        font-size: 10px;
        color: #716B95;
        font-weight: 400;
        line-height: 14px;
      }

      .name {
        font-size: 14px;
        font-weight: bold;
        color: #241E46;
        line-height: 24px;
    }
  }
}
}
</style>