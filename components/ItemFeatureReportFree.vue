<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { VIDEO } from '~/constant/constains';
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";

const handleItemClick = (report: any) => {
  trackEventCommon(EVENT_TYPE.VIDEO_START, 'video_start', '');
};

const windowWidth = ref(1024);

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
  }
});

const itemsToShow = computed(() => {
  if (windowWidth.value < 768) {
    return 1;
  } else if (windowWidth.value <= 1380) {
    return 2;
  } else {
    return 3;
  }
});

</script>

<template>
  <div class="report-slide">
    <Carousel :items-to-show="itemsToShow" :items-to-scroll="itemsToShow" :wrap-around="true" style="width: 100%;" :snap-align="'start'">
      <Slide v-for="report in VIDEO" v-bind="report" :key="report.title">
        <div class="slide-item">
          <div @click="handleItemClick(report)" class="thumbnail">
            <iframe width="200" height="200" :src="'https://www.youtube.com/embed/' + report.url.split('v=')[1] + '?modestbranding=1&rel=0&controls=0'"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
            </iframe>
          </div>
          <div class="content" style="text-align: left;">
            <div class="title line-clamp__2" style="text-align: left;">
              {{ report.title }}
            </div>
          </div>
        </div>
      </Slide>
      <template #addons>
        <navigation/>
        <pagination/>
      </template>
    </Carousel>
  </div>
</template>



<style scoped lang="scss">
.report-slide {
  .carousel__slide {
    .slide-item {
      .thumbnail {
        height: 230px;
        display: flex;
        align-items: center;
        overflow: hidden;
        iframe {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}

.title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: calc(2 * 1.5em);
  line-height: 1.5em;
  min-height: calc(2 * 1.5em);
}

@media (max-width: 767px) {
  .report-slide {
    .carousel__slide {
      .slide-item {
        .thumbnail {
          height: 200px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

@media (max-width: 1380px) {
  .report-slide {
    .carousel__slide {
      .slide-item {
        .thumbnail {
          height: 350px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
