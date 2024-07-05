<script setup lang="ts">
import BannerReport from "~/components/report/BannerReport.vue";
import {onMounted, ref, watchEffect, onUnmounted} from 'vue';
import axios from 'axios';
import SortReport from "~/components/report/SortReport.vue";
import ListReport from "~/components/report/ListReport.vue";
import FilterReport from "~/components/report/FilterReport.vue";
import PopularRelateKeywords from "~/components/report/PopularRelateKeywords.vue";
import MaybeInterested from "~/components/report/MaybeInterested.vue";

interface Report {
  id: string;
  name: string;
  slug: string;
  url_thumbnail: string;
  revenue_monthly: number;
  gr_quarter: number;
  shop: string;
  lst_category: { name: string }[];
  lst_brand: string[];
}

interface Data {
  total: number;
  lst_report: Report[];
}

const data = ref<Data | null>(null);
const current = ref(1);
const displaySortReport = ref(false);
const isModalVisible = ref(false);

if (typeof window !== 'undefined') {
  displaySortReport.value = window.matchMedia('(min-width: 768px)').matches; // change the value directly

  watchEffect(() => {
    const mediaQueryList = window.matchMedia('(min-width: 768px)');
    const listener = (event: MediaQueryListEvent) => {
      displaySortReport.value = event.matches;
    };
    mediaQueryList.addEventListener('change', listener);
    onUnmounted(() => {
      mediaQueryList.removeEventListener('change', listener);
    });
  });
}

const fetchTableData = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api-web.metric.vn/api/report/search',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        'lst_category_report_id': ['c1513215936'],
        'lst_query': [],
        'lst_field': ['name', 'slug', 'url_thumbnail', 'revenue_monthly', 'gr_quarter', 'shop'],
        'offset': 0,
        'limit': 12,
        'sort': 'popularity'
      }
    });
    data.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const clickButtonFilter = () => {
  isModalVisible.value = true;
};

const handleOk = () => {
  isModalVisible.value = false;
};

const handleCancel = () => {
  isModalVisible.value = false;
};

onMounted(() => {
  fetchTableData();
});
</script>

<template>
  <banner-report title="Giày dép nam"/>
  <div id="search_report">
    <div class="search" style="display: flex; justify-content: center">THANH SEARCH</div>
    <div class="container default_section">
      <div class="list_report_industry">
        <div class="general">
          <div class="count_result">
            {{ data?.total.toLocaleString() }} kết quả
          </div>
          <sort-report v-if="displaySortReport" class="sort_report"/>
          <a-button v-else @click="clickButtonFilter">
            <div style="display: flex; gap: 8px; justify-content: center; align-items: center">
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4202_14089)">
                  <path d="M8 4.375C8 5.41053 8.83947 6.25 9.875 6.25C10.9105 6.25 11.75 5.41053 11.75 4.375C11.75 3.33947 10.9105 2.5 9.875 2.5C8.83947 2.5 8 3.33947 8 4.375Z" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.75 10C11.75 11.0355 12.5895 11.875 13.625 11.875C14.6605 11.875 15.5 11.0355 15.5 10C15.5 8.96447 14.6605 8.125 13.625 8.125C12.5895 8.125 11.75 8.96447 11.75 10Z" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5.5 15.625C5.5 16.6605 6.33947 17.5 7.375 17.5C8.41053 17.5 9.25 16.6605 9.25 15.625C9.25 14.5895 8.41053 13.75 7.375 13.75C6.33947 13.75 5.5 14.5895 5.5 15.625Z" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17.375 4.375L11.75 4.375" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17.375 15.625L9.25 15.625" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17.375 10L15.5 10" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 4.375L3.625 4.375" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5.5 15.625L3.625 15.625" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.75 10L3.625 10" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_4202_14089">
                    <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                </defs>
              </svg>
              Bộ lọc
            </div>
          </a-button>
          <a-modal v-model:visible="isModalVisible" title="Filter and Sort" @ok="handleOk" @cancel="handleCancel">
            <sort-report class="sort_report"/>
            <filter-report class="filter_report"/>
          </a-modal>
        </div>
<!--        <list-report :data="data?.lst_report"/>-->
        <div class="page">
          <a-pagination v-model:current="current" :total="1000" show-less-items />
        </div>
      </div>
      <div class="relate_functions">
        <filter-report v-if="displaySortReport" class="filter_report"/>
        <popular-relate-keywords/>
        <maybe-interested/>
      </div>
    </div>
    <div class="poster">
      <div class="info">
        <div class="content">Truy cập kho dữ liệu với hàng trăm báo cáo và xu hướng mới nhất</div>
        <a-button>Xem báo giá</a-button>
      </div>
      <div class="big_logo_metric">
        <img src="/images/big_logo_metric.svg" alt="">
      </div>
      <div class="chart_image">
        <img src="/images/chart_image.svg" alt="">
      </div>
      <div class="line_styling_image">
        <img src="/images/line_styling_image.svg" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#search_report{
  background-color: #FBFAFC;
  overflow: auto;
  .container{
    display: flex;
    gap: 32px;
    padding-top: 40px;
    padding-bottom: 100px;
    .list_report_industry{
      display: flex;
      flex-direction: column;
      gap: 24px;
      flex: 0.8;

      .general{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .count_result{
          font-size: 16px;
          font-weight: 500;
          color: #716B95;
        }
      }

      .page{
        display: flex;
        justify-content: center;

      }
    }
    .relate_functions{
      flex: 0.2;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    @media (max-width: 767px) {
      padding-top: 20px;
      padding-bottom: 40px;
    }
  }
  .poster{
    display: flex;
    height: 335px;
    padding: 40px 120px;
    align-items: center;
    gap: 64px;
    background: linear-gradient(90deg, #FF6931 1.09%, #FF9839 49.34%);
    position: relative;
    .info{
      display: flex;
      width: 500px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 24px;
      .content{
        font-size: 40px;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 56px;
      }
    }
    .big_logo_metric{
      position: absolute;
      img{
        opacity: 0.5;
      }
    }
    .chart_image{
      position: absolute;
      right: 0;
      top: 0;
    }
    .line_styling_image{
      position: absolute;
      right: 500px;
      top: 70px;
    }

    @media (max-width: 1023px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
      .info{
        width: 100%;
        .content{
          font-size: 24px;
        }
      }
    }

    @media (max-width: 767px) {
      height: 384px;
      padding: 32px 16px;
      .info{
        align-items: center;
        .content{
          line-height: 38px;
          font-size: 24px;
        }
      }
      .chart_image{
        top: 225px;
        right: 0;
        img{
          width: 300px;
        }

      }
      .line_styling_image{
        top: 250px;
        right: 220px;
        img{
          width: 150px;
        }
      }
    }
  }
}

@media (min-width: 1919px) {
  .default_section {
    width: calc(100% - 200px);
    margin: 0 auto;
  }
}

@media (max-width: 1919px) {
  .default_section {
    width: calc(100% - 100px);
    margin: 0 auto;
  }
}

@media (max-width: 1439px) {
  .default_section {
    width: calc(100% - 50px);
    margin: 0 auto;
  }
}

@media (max-width: 1023px) {
  .default_section {
    width: calc(100% - 20px);
    margin: 0 auto;
  }

}

@media (max-width: 767px) {
  .default_section {
    flex-direction: column;
    width: calc(100% - 20px);
    margin: 0 auto;
  }
}

@media (max-width: 424px) {
  .default_section {
    flex-direction: column;
    width: calc(100% - 20px);
    margin: 0 auto;
  }
}

</style>
<style lang="scss">
#search_report{
  .ant-modal {
    @media (max-width: 767px) {
      width: 90% !important;
      margin: 0 auto;
    }
    @media (min-width: 768px) {
      width: 70% !important;
    }
    @media (min-width: 1024px) {
      width: 50% !important;
    }
    @media (min-width: 1200px) {
      width: 30% !important;
    }
  }
  .ant-pagination{
    .ant-pagination-item{
      background-color: #F5F5F5;
      border-radius: 8px;
      a{
        background-color: #F5F5F5;
        border-radius: 8px;
      }
    }
    .ant-pagination-item-active{
      background-color: #E85912;
      color: #FFFFFF;
      a{
        background-color: #E85912;
        color: #FFFFFF;
      }
    }
    .ant-pagination-options{
      display: none;
    }
  }
  .ant-btn.ant-btn-default{
    display: flex;
    padding: 9px 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    color: #FFFFFF;
    font-weight: 500;
    font-size: 14px;
    background: #241E46;
    border: 1px solid #241E46;
  }
  .ant-modal-footer{
    display:flex;
    align-items: center;
    justify-content: flex-end;
  }
  @media (max-width: 767px) {
    .ant-btn.ant-btn-default{
      background: #FFF;
      border: 1px solid #FFF;
      color: #241E46;
    }
  }
}

</style>