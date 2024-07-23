<script setup lang="ts">
import {defineProps, onMounted, ref} from 'vue'
import {NAVIGATIONS} from "~/constant/constains";
import BlurContent from "~/components/BlurContent.vue";
import {formatAndRoundSortTextCurrencyWithMinValue} from "~/helpers/FormatHelper";
import moment from "moment";

const props = defineProps({
  data: {
    type: Array as () => any[],
    default: () => [],
  },
});


const formatDate = (value: string | Date, format: string = 'DD/MM/YYYY', inputFormat: string = "YYYY-MM-DD[T]HH:mm:ss"): string => {
  return moment(value, inputFormat).format(format);
}

const windowWidth = ref(window.innerWidth);

onMounted(() => {
  windowWidth.value = window.innerWidth;
});

const getDisplayedCategories = (item: any) => {
  if (windowWidth.value < 768) {
    return item.lst_category?.length ? item.lst_category[item.lst_category.length - 1].name : '';
  } else {
    return item.lst_category?.map((item: any) => item.name).join(' > ') || '';
  }
};
</script>

<template>
  <div id="lst_report_id">
    <nuxt-link v-for="item in props.data" :key="item.id" class="lst_item" :to="`${NAVIGATIONS.home}${item.source ==='marketing' ? 'insight/' + item.slug : item.slug}`">
      <div class="item">
        <div class="image">
          <img :src="item.url_thumbnail" alt="">
        </div>
        <div class="info">
          <div class="breadcrumb">
            <span v-if="item.lst_category">
              {{ getDisplayedCategories(item) }}
            </span>
            <span v-else>
              {{ item.report_type }}
            </span>
            <span style="color: #EEEBFF"> | </span>
            {{ formatDate(item.start_date) }}
          </div>
          <div class="name">{{ item.slug.startsWith('bao-cao') ? item.name : 'Báo cáo ' + item.name }}</div>
          <div v-if="item.revenue_monthly" class="summary-info">
            <div class="info_item">
              <svg data-v-f4382b3b="" width="16" height="22" viewBox="0 0 16 22" fill="none"
                   xmlns="http://www.w3.org/2000/svg" style="transform: translateY(0px); margin-right: 4px;">
                <g clip-path="url(#clip0_1518_34097)" data-v-f4382b3b="">
                  <path d="M14 16H2V6" stroke="#716B95" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round" data-v-f4382b3b=""></path>
                  <path d="M12.5 7.5L8 12L6 10L2 14" stroke="#716B95" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round" data-v-f4382b3b=""></path>
                  <path d="M12.5 10V7.5H10" stroke="#716B95" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round" data-v-f4382b3b=""></path>
                </g>
                <defs data-v-f4382b3b="">
                  <clipPath id="clip0_1518_34097" data-v-f4382b3b="">
                    <rect width="16" height="16" fill="white" transform="translate(0 3)" data-v-f4382b3b=""></rect>
                  </clipPath>
                </defs>
              </svg>
              <span>
                <BlurContent>
                  {{ formatAndRoundSortTextCurrencyWithMinValue(item.revenue_monthly) }}
                </BlurContent>
              </span> - doanh số trung bình tháng
            </div>
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
                  {{ formatAndRoundSortTextCurrencyWithMinValue(item.shop) }}
                </BlurContent>
              </span> - nhà bán
            </div>
          </div>
          <div v-if="item?.lst_brand?.length" class="description">Báo cáo thị phần thương hiệu hàng đầu như
            {{ item.lst_brand ? item.lst_brand.join(', ') : '' }} v.v
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<style scoped lang="scss">

#lst_report_id {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .lst_item {
    display: flex;
    text-decoration: none;

    .item {
      display: flex;
      gap: 24px;
      padding: 24px;
      align-items: center;
      border: 1px solid #EEEBFF;
      background-color: #FFF;
      border-radius: 16px;
      width: 100%;
      cursor: pointer;

      .image {
        img {
          width: 180px;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .breadcrumb {
          font-size: 14px;
          color: #716B95;
          line-height: 22px;
        }

        .name {
          overflow: hidden;
          color: #241E46;
          font-size: 20px;
          font-weight: bold;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          align-self: stretch;
        }

        .summary-info {
          margin-bottom: 8px;

          .info_item {
            align-items: center;
            color: #716b95;
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            font-size: 16px;

            span {
              font-weight: bold;
              font-size: 16px;
              color: #241e46;
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

        .description {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          color: #716B95;
          text-overflow: ellipsis;
          font-size: 16px;
          line-height: 24px;
          overflow: hidden;

        }
      }
    }
  }

  .page {
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
  }

  @media (max-width: 767px) {
    .lst_item {
      .item {
        padding: 12px;

        .image {
          img {
            width: 120px;
            height: 120px;
          }
        }

        .info {
          gap: 4px;

          .breadcrumb {
            font-size: 10px;
            span{
              font-size: 10px;
            }
          }

          .name {
            font-size: 14px;
            -webkit-line-clamp: 1;
          }

          .summary-info {
            margin-bottom: 0;
            .info_item {
              font-size: 10px;

              span{
                span{
                  font-size: 10px;
                }
              }
            }

            .gr_quarter {
              display: none;
            }
          }

          .description {
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
#lst_report_id {
  .ant-pagination {
    .ant-pagination-prev {
      background-color: #F5F5F5;
    }

    .ant-pagination-next {
      background-color: #F5F5F5;
    }

    .ant-pagination-item {
      background-color: #F5F5F5;
      border-radius: 8px;

      a {
        background-color: #F5F5F5;
        border-radius: 8px;
      }
    }

    .ant-pagination-item-active {
      background-color: #E85912;
      color: #FFFFFF;

      a {
        background-color: #E85912;
        color: #FFFFFF;
      }
    }

    .ant-pagination-options {
      display: none;
    }
  }
}
</style>