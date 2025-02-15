<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import 'vue3-carousel/dist/carousel.css';
import {NAVIGATIONS} from "~/constant/constains";
import {formatAndRoundSortTextCurrencyWithMinValue} from "~/helpers/FormatHelper";
import BlurContent from "~/components/BlurContent.vue";
import moment from "moment/moment";
import {getUrlImageThumbnail} from "~/services/ecommerce/EcomUtils";

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

const handleItemClick = (report: any) => {
  if (report.source === 'marketing') {
    navigateTo(`${NAVIGATIONS.home}/insight/${report.slug}`);
    return
  }
  navigateTo(`${NAVIGATIONS.home}${report.slug}`);
};

const windowWidth = ref(1024);

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
  }
});

const formatDate = (value: string | Date, format: string, inputFormat: string = "YYYYMMDD"): string => {
  return moment(value, inputFormat).format(format);
}

const itemsToShow = computed(() => {
  return windowWidth.value < 1380 ? 1 : 2;
});
</script>

<template>
  <div class="new-report-slide">
    <Carousel v-if="loading" :items-to-show="itemsToShow" :items-to-scroll="itemsToShow" :wrap-around="true"
              style="width: 100%;"
              :snap-align="'start'">
      <Slide v-for="item in [1,2,3,4]" :key="item">
        <div class="slide-item" style="padding: 16px; gap: 16px;">
          <a-skeleton-image/>
          <a-skeleton/>
        </div>
      </Slide>
    </Carousel>
    <Carousel v-else :items-to-show="itemsToShow" :items-to-scroll="itemsToShow" :wrap-around="true"
              style="width: 100%;" :snap-align="'start'">
      <Slide v-for="report in reports" v-bind="report" :key="report.name">
        <div class="slide-item" @click="handleItemClick(report)">
          <div class="thumbnail">
            <NuxtImg format="webp" loading="lazy" v-if="report.url_thumbnail" :src="getUrlImageThumbnail(report.url_thumbnail)" alt=""/>
            <NuxtImg format="webp" loading="lazy" v-else src="/images/default_thumbnail_report.png" class="default_thumbnail"/>
          </div>
          <div class="content" style="text-align: left;">
            <div v-if="report.lst_category" class="category_date" style="text-align: left;">
              {{ report.lst_category?.[0]?.name }} <span style="color: #EEEBFF">|</span>
              {{ formatDate(report.end_date || report.created_at, 'DD-MM-YYYY') }}
            </div>
            <div v-else class="category_date" style="text-align: left;">
              {{
                report.report_type === 'report_category' ? 'Báo cáo ngành hàng' : report.report_type
              }} <span style="color: #EEEBFF">|</span>
              {{ formatDate(report.end_date || report.created_at, 'DD-MM-YYYY') }}
            </div>
            <nuxt-link
                v-if="report.source === 'marketing'"
                :to="`/insight/${report.slug}`"
                class="title" style="text-align: left;text-decoration: none;"
            >
              <div>{{ report.name }}</div>
            </nuxt-link>
            <nuxt-link
                v-else-if="report.report_type === 'report_category'"
                :to="`/${report.slug}`"
                class="title" style="text-align: left;text-decoration: none;"
            >
              {{ 'Báo cáo Ngành hàng ' + report.name }}
            </nuxt-link>
            <nuxt-link
                v-else
                :to="`/${report.slug}`"
                class="title" style="text-align: left;text-decoration: none;"
            >
              {{ 'Báo cáo ' + report.name[0].toUpperCase() + report.name.slice(1) }}
            </nuxt-link>
            <div v-if="report.revenue_monthly || report.revenue" class="summary-info">
              <div class="info_item">
                <svg data-v-f4382b3b="" width="16" height="16" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg" style="transform: translateY(0px); margin-right: 4px;">
                  <g clip-path="url(#clip0_1518_34114)" data-v-f4382b3b="">
                    <path
                        d="M3 8.72437V13C3 13.1326 3.05268 13.2598 3.14645 13.3535C3.24021 13.4473 3.36739 13.5 3.5 13.5H12.5C12.6326 13.5 12.7598 13.4473 12.8536 13.3535C12.9473 13.2598 13 13.1326 13 13V8.72437"
                        stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"
                        data-v-f4382b3b=""></path>
                    <path
                        d="M3.375 2.5H12.625C12.7336 2.50002 12.8393 2.53541 12.926 2.60081C13.0127 2.66621 13.0758 2.75807 13.1056 2.8625L14 6H2L2.89625 2.8625C2.92603 2.75838 2.98881 2.66675 3.07514 2.60137C3.16148 2.536 3.26671 2.50043 3.375 2.5Z"
                        stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"
                        data-v-f4382b3b=""></path>
                    <path
                        d="M6 6V7C6 7.53043 5.78929 8.03914 5.41421 8.41421C5.03914 8.78929 4.53043 9 4 9C3.46957 9 2.96086 8.78929 2.58579 8.41421C2.21071 8.03914 2 7.53043 2 7V6"
                        stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"
                        data-v-f4382b3b=""></path>
                    <path
                        d="M10 6V7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7V6"
                        stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"
                        data-v-f4382b3b=""></path>
                    <path
                        d="M14 6V7C14 7.53043 13.7893 8.03914 13.4142 8.41421C13.0391 8.78929 12.5304 9 12 9C11.4696 9 10.9609 8.78929 10.5858 8.41421C10.2107 8.03914 10 7.53043 10 7V6"
                        stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"
                        data-v-f4382b3b=""></path>
                  </g>
                  <defs data-v-f4382b3b="">
                    <clipPath id="clip0_1518_34114" data-v-f4382b3b="">
                      <rect width="16" height="16" fill="white" data-v-f4382b3b=""></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span>
                <BlurContent>
                  {{ formatAndRoundSortTextCurrencyWithMinValue(report.shop) }}
                </BlurContent>
              </span> nhà bán
              </div>
              <div class="info_item">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_5418_146435)">
                    <path d="M2.04297 5.30762L7.99922 8.56762L13.9555 5.30762" stroke="#716B95" stroke-width="1.3"
                          stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 8.56836V14.9984" stroke="#716B95" stroke-width="1.3" stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path
                        d="M13.74 11.9273L8.24 14.9386C8.16641 14.9789 8.08388 15 8 15C7.91612 15 7.83359 14.9789 7.76 14.9386L2.26 11.9273C2.18147 11.8844 2.11591 11.8211 2.07017 11.7441C2.02444 11.6672 2.0002 11.5794 2 11.4898V5.51109C2.0002 5.42157 2.02444 5.33375 2.07017 5.25679C2.11591 5.17983 2.18147 5.11656 2.26 5.07359L7.76 2.06234C7.83359 2.02208 7.91612 2.00098 8 2.00098C8.08388 2.00098 8.16641 2.02208 8.24 2.06234L13.74 5.07359C13.8185 5.11656 13.8841 5.17983 13.9298 5.25679C13.9756 5.33375 13.9998 5.42157 14 5.51109V11.4886C14 11.5783 13.9759 11.6664 13.9301 11.7436C13.8844 11.8208 13.8187 11.8843 13.74 11.9273Z"
                        stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.09766 3.51953L11.0002 6.75016V10.0002" stroke="#716B95" stroke-width="1.3"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_5418_146435">
                      <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                  </defs>
                </svg>

                <span>
                <BlurContent>
                  {{ formatAndRoundSortTextCurrencyWithMinValue(report.product) }}
                </BlurContent>
              </span> sản phẩm
              </div>
            </div>
            <div v-if="report.introduction" class="description line-clamp__2">
              {{ report.introduction }}
            </div>
            <div v-else-if="report.report_type === 'report_brand' && report?.lst_shop?.length"
                 class="description line-clamp__2">Báo cáo thị phần thương hiệu hàng đầu như
              {{ report.lst_brand ? report.lst_brand.join(', ') : '' }} v.v
            </div>
            <div v-else-if="report?.lst_brand?.length" class="description line-clamp__2">Báo cáo thị phần thương hiệu
              hàng đầu như
              {{ report.lst_brand ? report.lst_brand.join(', ') : '' }} v.v
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

    .slide-item {
      width: 100%;
      border-radius: 16px;
      background: var(--Neutral-neutral-1, #FFF);
      cursor: pointer;
      border: 1px solid #f0f0f0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      align-items: center;
      display: flex;
      flex-direction: row;
      overflow: hidden;

      .thumbnail {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #f0f0f0;
        width: 180px;
        height: 180px;

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
          font-size: 20px;
          font-weight: 700;
          line-height: 28px;
          margin-bottom: 8px;
          text-transform: capitalize;
          white-space: nowrap;
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
      .slide-item {
        display: flex;
        align-items: center;
        flex-direction: row;
        overflow: hidden;

        .thumbnail {
          padding-left: 16px;
          width: 120px;
          height: 120px;
          border-bottom: none;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .content {
          padding: 16px;
          flex: 1;
          overflow: hidden;

          .category_date {
            text-align: left;
            font-size: 14px;
            margin-bottom: 8px;
          }

          .title {
            font-size: 18px;
            margin-bottom: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .summary-info {
            .info_item {
              font-size: 14px;

              span {
                font-size: 14px;
              }
            }
          }

          .description {
            font-size: 14px;
          }
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
      bottom: -20px;
    }

    .carousel__prev {
      left: 40%;
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

