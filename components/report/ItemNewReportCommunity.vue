<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import 'vue3-carousel/dist/carousel.css';
import {getUrlImageThumbnail} from "~/services/ecommerce/EcomUtils";
import CtaComunity from "~/components/report/CtaComunity.vue";
import {useRouter} from "#vue-router";
import {getCookie} from "~/helpers/CookieHelper";
import SuccessNotification from "~/components/ContactUs/SuccessNotification.vue";
const currentUserStore = useCurrentUser();
const {userInfo}: any = storeToRefs(currentUserStore);

const {reports, loading} = defineProps({
  reports: {
    type: Array<any>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const openCta = ref(false);
const openSuccess = ref(false);
const router = useRouter();

const handleClickViewOnMetric = (report: any) => {
  const formSubmitted = getCookie('fill_in_the_form') === 'true';
  if (userInfo.value?.current_plan.plan_code === 'e_free' || !userInfo.value?.current_plan.plan_code) {
    if (formSubmitted) {
      openSuccess.value = true;
    }
    else{
      openCta.value = true;
    }
  }
  else{
    router.push(`/insight/${report.slug}`);
  }
};

const windowWidth = ref(1024);

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
  }
});

const itemsToShow = computed(() => {
  return windowWidth.value < 1380 ? 2 : 3 ;
});
</script>

<template>
  <div class="new-report-slide">
    <Carousel v-if="loading" :items-to-show="itemsToShow" :items-to-scroll="itemsToShow" :wrap-around="true"
              style="width: 100%;"
              :snap-align="'start'">
      <Slide v-for="item in [1,2,3,4]" :key="item">
        <div class="slide-item_community" style="padding: 16px; gap: 16px;">
          <a-skeleton-image/>
          <a-skeleton/>
        </div>
      </Slide>
    </Carousel>
    <Carousel v-else :items-to-show="itemsToShow" :items-to-scroll="itemsToShow" :wrap-around="true"
              style="width: 100%;" :snap-align="'start'">
      <Slide v-for="report in reports" v-bind="report" :key="report.name">
        <div class="slide-item_community" @click="handleClickViewOnMetric(report)">
          <div class="thumbnail">
            <img v-if="report.url_thumbnail" :src="getUrlImageThumbnail(report.url_thumbnail)" alt=""/>
            <img v-else src="/images/default_thumbnail_report.png" class="default_thumbnail"/>
          </div>
          <div class="content" style="text-align: left;">
            <div
                v-if="report.source === 'marketing'"
                class="title" style="text-align: left;text-decoration: none;"
            >
              {{ report.name }}
            </div>
            <div class="report_type" style="font-size: 14px">
              Báo cáo Community
            </div>
          </div>
        </div>
      </Slide>
      <template #addons>
        <navigation/>
        <pagination/>
      </template>
    </Carousel>
    <cta-comunity v-model:open="openCta"/>
    <success-notification v-model:visible="openSuccess" class-name="submit-form-marketing-success"/>
  </div>
</template>

<style lang="scss">
.new-report-slide {
  .ant-skeleton-image {
    width: 170px !important;
    height: 170px !important;
  }
}
</style>

<style lang="scss">
.carousel__pagination {
  display: none;
}

.carousel__pagination-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__pagination-button {
  width: 10px;
  margin: 0 2px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel__pagination-button:after {
  display: none;
}

.carousel__pagination-button:hover,
.carousel__pagination-button--active {
  background-color: #ccc;
  color: #fff;
}

.new-report-slide {
  .carousel__slide {
    padding: 8px;

    .slide-item_community {
      width: 100%;
      border-radius: 16px;
      height: 220px;
      background: var(--Neutral-neutral-1, #FFF);
      cursor: pointer;
      border: 1px solid #f0f0f0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      align-items: center;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      padding: 0 16px;

      .thumbnail {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #f0f0f0;
        width: 180px;

        img {
          width: 180px;
          object-fit: contain;
        }
      }

      .content {
        display: flex;
        flex-direction: column;
        padding: 16px;
        flex: 1;

        .summary-info {
          margin-bottom: 8px;

          .info_item {
            align-items: center;
            color: #716b95;
            display: flex;
            gap: 4px;
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            span {
              font-weight: bold;
              color: #241e46;
              font-size: 16px;
            }

            .gr_quarter {
              .gr_quarter_item {
                display: flex;
                gap: 4px;

                span {
                  display: flex;
                  align-items: center;
                  gap: 6px;
                }
              }
            }
          }
        }

        .category_date {
          color: var(--Dark-blue-dark-blue-6, #716B95);
          font-size: 17px;
          font-weight: 400;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 4px;
        }

        .title {
          color: var(--Dark-blue-dark-blue-8, #241E46);
          font-size: 16px;
          font-weight: 700;
          line-height: 28px;
          margin-bottom: 8px;
          text-transform: capitalize;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .carousel__prev {
    left: -25px;
  }

  .carousel__next {
    right: -25px;
  }

  .carousel__prev, .carousel__next {
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
}

@media (max-width: 767px) {
  .new-report-slide {
    .carousel__slide {
      .slide-item_community {
        display: flex;
        align-items: center;
        flex-direction: row;
        overflow: hidden;
        height: 120px;
        padding: 0;

        .thumbnail {
          width: 90px;
          height: 90px;
          border-bottom: none;
          padding-left: 8px;


          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .content {
          padding: 8px;
          flex: 1;
          overflow: hidden;

          .category_date {
            text-align: left;
            font-size: 14px;
            margin-bottom: 8px;
          }

          .title {
            //display: none;
            font-size: 12px;
            //margin-bottom: 8px;
            //white-space: nowrap;
            //overflow: hidden;
            //text-overflow: ellipsis;
          }

          .report_type{
            display: none;
          }

          //.summary-info {
          //  .info_item {
          //    font-size: 14px;
          //
          //    span {
          //      font-size: 14px;
          //    }
          //  }
          //}
          //
          //.description {
          //  font-size: 14px;
          //}
        }
      }
    }

    .carousel__prev, .carousel__next {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #EEEBFF;
      background-color: #FFF;
      cursor: pointer;
      position: absolute;
      top: auto;
      bottom: -40px;
    }

    .carousel__prev {
      left: 45%;
      transform: translateX(-60px);
    }

    .carousel__next {
      left: 50%;
      transform: translateX(20px);
    }

    .carousel__pagination {
      display: none;
    }
  }
}
</style>

