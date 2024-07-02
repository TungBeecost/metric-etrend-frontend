<script setup lang="ts">
const reports = [
  {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    title: 'Báo cáo Ngành hàng Giày sneaker nam 1',
    date: '20/10/2021',
    description: 'Báo cáo thị phần thương hiệu hàng đầu như yadou, elly, floralpunk, hapas, yuumy, mx luxury, lesac, i.t - zooler i fashion, nallcheer, naha, v.v 1',
    category: ['Thể thao', 'Kinh tế']
  },
  {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    title: 'Báo cáo Ngành hàng Giày sneaker nam 2',
    date: '21/10/2021',
    description: 'Báo cáo thị phần thương hiệu hàng đầu như yadou, elly, floralpunk, hapas, yuumy, mx luxury, lesac, i.t - zooler i fashion, nallcheer, naha, v.v 2',
    category: ['Thể thao', 'Kinh tế']
  },
  {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    title: 'Báo cáo Ngành hàng Giày sneaker nam 3',
    date: '22/10/2021',
    description: 'Báo cáo thị phần thương hiệu hàng đầu như yadou, elly, floralpunk, hapas, yuumy, mx luxury, lesac, i.t - zooler i fashion, nallcheer, naha, v.v 3',
    category: ['Thể thao', 'Kinh tế']
  },
  {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    title: 'Báo cáo Ngành hàng Giày sneaker nam 4',
    date: '23/10/2021',
    description: 'Báo cáo thị phần thương hiệu hàng đầu như yadou, elly, floralpunk, hapas, yuumy, mx luxury, lesac, i.t - zooler i fashion, nallcheer, naha, v.v 4',
    category: ['Thể thao', 'Kinh tế']
  },
  {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    title: 'Báo cáo Ngành hàng Giày sneaker nam 5',
    date: '24/10/2021',
    description: 'Báo cáo thị phần thương hiệu hàng đầu như yadou, elly, floralpunk, hapas, yuumy, mx luxury, lesac, i.t - zooler i fashion, nallcheer, naha, v.v 5',
    category: ['Thể thao', 'Kinh tế']
  },
  {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    title: 'Báo cáo Ngành hàng Giày sneaker nam 6',
    date: '25/10/2021',
    description: 'Báo cáo thị phần thương hiệu hàng đầu như yadou, elly, floralpunk, hapas, yuumy, mx luxury, lesac, i.t - zooler i fashion, nallcheer, naha, v.v 6',
    category: ['Thể thao', 'Kinh tế']
  },
  {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    title: 'Báo cáo Ngành hàng Giày sneaker nam 7',
    date: '26/10/2021',
    description: 'Báo cáo thị phần thương hiệu hàng đầu như yadou, elly, floralpunk, hapas, yuumy, mx luxury, lesac, i.t - zooler i fashion, nallcheer, naha, v.v 7',
    category: ['Thể thao', 'Kinh tế']
  },
  {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    title: 'Báo cáo Ngành hàng Giày sneaker nam 8',
    date: '24/10/2021',
    description: 'Báo cáo thị phần thương hiệu hàng đầu như yadou, elly, floralpunk, hapas, yuumy, mx luxury, lesac, i.t - zooler i fashion, nallcheer, naha, v.v 5',
    category: ['Thể thao', 'Kinh tế']
  },
  {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    title: 'Báo cáo Ngành hàng Giày sneaker nam 9',
    date: '25/10/2021',
    description: 'Báo cáo thị phần thương hiệu hàng đầu như yadou, elly, floralpunk, hapas, yuumy, mx luxury, lesac, i.t - zooler i fashion, nallcheer, naha, v.v 6',
    category: ['Thể thao', 'Kinh tế']
  },
  {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    title: 'Báo cáo Ngành hàng Giày sneaker nam 10',
    date: '26/10/2021',
    description: 'Báo cáo thị phần thương hiệu hàng đầu như yadou, elly, floralpunk, hapas, yuumy, mx luxury, lesac, i.t - zooler i fashion, nallcheer, naha, v.v 7',
    category: ['Thể thao', 'Kinh tế']
  },
];

const sliceInfoRef: Ref<HTMLElement | null> = ref(null);

const scrollReports = (direction: string) => {
  const scrollAmount = 450;
  const scrollOptions: ScrollToOptions = {
    behavior: 'smooth',
    left: direction === 'left' ? -scrollAmount : scrollAmount
  };
  if (sliceInfoRef.value) {
    sliceInfoRef.value.scrollBy(scrollOptions);
  }
};
</script>

<template>
  <div class="slice">
    <button class="button_slice button_slice_left" @click="scrollReports('left')">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5898 23.3525L12.5898 15.8525L19.5898 8.35254" stroke="#241E46" stroke-width="1.3"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="slice_info" ref="sliceInfoRef">
      <div v-for="report in reports" v-bind="report" :key="report.title">
        <div class="item_feature_report">
          <div class="image">'
            <img :src="report.image" alt="">
          </div>
          <div class="content">
            <div class="category_date">
              {{ report.category }} | {{ report.date }}
            </div>
            <div class="title">{{ report.title }}</div>
            <div class="description">{{ report.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <button class="button_slice button_slice_right" @click="scrollReports('right')">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5898 8.35254L19.5898 15.8525L12.5898 23.3525" stroke="#241E46" stroke-width="1.3"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
.slice{
  background: #FBFAFC;
  display: flex;
  justify-content: center;
  width: calc(100% - 200px);
  position: relative;

  .button_slice {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #EEEBFF;
    background-color: #FFF;
    cursor: pointer;
    position: absolute;
  }

  .button_slice_left {
    left: -30px;
    top: 300px;
  }

  .button_slice_right {
    right: -30px;
    top: 300px;
  }

  .slice_info {
    display: flex;
    gap: 40px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: pointer;

    .item_feature_report {
      width: 400px;
      border-radius: 16px;
      background: #FFF;

      .image {
        display: flex;
        justify-content: start;
        align-items: start;

        img {
          width: 100%;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }
      }

      .content {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .category_date {
          font-size: 14px;
          color: #716B95;
          font-weight: 400;
          line-height: 22px;
        }

        .title {
          font-size: 20px;
          color: #241E46;
          font-weight: bold;
          line-height: 28px;
          overflow: hidden;
        }

        .description {
          overflow: hidden;
          color: #716B95;
          text-overflow: ellipsis;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
  }

  .slice_info::-webkit-scrollbar {
    display: none;
  }
}

@media (max-width: 1023px) {
  .slice{
    width: 100%;;
    .slice_info {
      gap: 16px;
      padding: 8px;

      .item_feature_report {
        width: 300px;

        .content {
          padding: 16px;

          .category_date {
            font-size: 12px;
            line-height: 18px;
          }

          .title {
            font-size: 16px;
            line-height: 24px;
          }

          .description {
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }

    .button_slice {
      display: none;
    }

  }
}
</style>
