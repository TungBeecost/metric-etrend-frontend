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
  const scrollAmount = 750;
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
        <path d="M19.5898 23.3525L12.5898 15.8525L19.5898 8.35254" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="slice_info" ref="sliceInfoRef">
      <div v-for="report in reports" v-bind="report" :key="report.title">
        <div class="item_new_report">
          <div class="image">
            <img :src="report.image" alt="">
          </div>
          <div class="content">
            <div class="block_category">
              <div class="category">{{ report.category.join(', ') }} | {{ report.date }}</div>
            </div>
            <div class="title">{{ report.title }}</div>
            <div class="description">{{ report.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <button class="button_slice button_slice_right" @click="scrollReports('right')">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5898 8.35254L19.5898 15.8525L12.5898 23.3525" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">

.slice{
  display: flex;
  justify-content: center;
  position: relative;

  .slice_info {
    display: flex;
    justify-content: flex-start;
    overflow-x: hidden;
    gap: 36px;
    padding: 16px;
    scrollbar-width: thin;
    scrollbar-color: #888 #f5f5f5;

    .item_new_report {
      display: flex;
      gap: 16px;

      width: 700px;

      padding: 16px;

      border: 1px solid #EEEBFF;
      border-radius: 8px;
      background: #FFF;

      .image {
        width: 168px;

        img {
          width: 100%;
          border-radius: 8px;
        }
      }

      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .block_category {
          display: flex;
          gap: 8px;

          .category {
            font-size: 14px;
            color: #9e9e9e;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        .title {
          margin: 8px 0;

          font-size: 20px;
          font-weight: bold;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .description {
          font-size: 16px;
          line-height: 24px;
          color: #9e9e9e;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }

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
    left: -20px;
    top: 100px;
  }

  .button_slice_right {
    right: -20px;
    top: 100px;
  }
}

@media (max-width: 1023px) {
  .slice{
    .slice_info {
      gap: 16px;
      padding: 8px;

      .item_new_report {
        width: 300px;

        .image {
          width: 120px;
        }

        .content {
          gap: 8px;
          .block_category {
            .category {
              font-size: 10px;
            }

            .space {
              font-size: 10px;
            }

            .date {
              font-size: 10px;
            }
          }

          .title {
            font-size: 14px;
          }

          .description {
            font-size: 12px;
          }
        }
      }
    }

    .button_slice {
      width: 40px;
      height: 40px;
    }

    .button_slice_left {
      left: 90px;
      top: 180px;
    }

    .button_slice_right {
      right: 90px;
      top: 180px;
    }
  }
}
</style>
