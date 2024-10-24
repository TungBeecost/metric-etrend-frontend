<template>
  <div class="" style="background: #fbfafc;">
    <banner-report content="Phân tích thông minh"/>
    <div class="title default_section" style="padding: 24px 0;">
      <div
          style="padding: 24px; background: #fff; margin-bottom: 40px;border-radius: 8px; box-shadow: 10px 10px 40px #0000000d;border: 1px solid #eeebff;">
        <div style="margin-bottom: 8px; font-size: 18px; font-weight: bold;">Từ khoá</div>
        <div
            style="width: 100%; margin: 0 auto 16px; display: flex; justify-content: center; align-items:center; gap: 16px;">
          <a-input v-model:value="data.keyword" placeholder="Nhập từ khóa cần phân tích" style="flex: 1;" size="large"/>
          <a-button
              type="primary"
              size="large"
              :loading="loading"
              :disabled="!data.keyword || data.keyword === data.analyticResult.keyword"
              @click="handleAnalyticKeyword"
          >
            <template #icon>
              <svg width="21" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                   style="transform: translateY(3px); margin-right: 6px;">
                <path
                    d="M9.25 15C12.7018 15 15.5 12.2018 15.5 8.75C15.5 5.29822 12.7018 2.5 9.25 2.5C5.79822 2.5 3 5.29822 3 8.75C3 12.2018 5.79822 15 9.25 15Z"
                    stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.668 13.1696L17.9984 17.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </template>
            Phân tích
          </a-button>
        </div>
        <div style="color: #575F71;">
          <svg style="transform: translateY(2px)" width="14" height="14" viewBox="0 0 14 14" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_7885_227398)">
              <path
                  d="M7 12.25C9.8995 12.25 12.25 9.8995 12.25 7C12.25 4.10051 9.8995 1.75 7 1.75C4.10051 1.75 1.75 4.10051 1.75 7C1.75 9.8995 4.10051 12.25 7 12.25Z"
                  stroke="#575F71" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path
                  d="M6.5625 6.5625C6.67853 6.5625 6.78981 6.60859 6.87186 6.69064C6.95391 6.77269 7 6.88397 7 7V9.1875C7 9.30353 7.04609 9.41481 7.12814 9.49686C7.21019 9.57891 7.32147 9.625 7.4375 9.625"
                  stroke="#575F71" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path
                  d="M6.78125 5.25C7.14369 5.25 7.4375 4.95619 7.4375 4.59375C7.4375 4.23131 7.14369 3.9375 6.78125 3.9375C6.41881 3.9375 6.125 4.23131 6.125 4.59375C6.125 4.95619 6.41881 5.25 6.78125 5.25Z"
                  fill="#575F71"/>
            </g>
            <defs>
              <clipPath id="clip0_7885_227398">
                <rect width="14" height="14" fill="white"/>
              </clipPath>
            </defs>
          </svg>

          Lưu ý: 1 lượt phân tích được tính là
          <span style="font-weight: bold">1 lượt xem</span> báo cáo,
          bạn còn lại <span style="font-weight: bold">{{ userInfo.current_plan.remain_claim }}</span> lượt
        </div>
      </div>
      <div v-if="loading" class="loading-skeleton" style="padding: 24px 0;">
        <div style="display: flex;justify-content: center; margin-bottom: 24px;">
          <metric-loading-icon subTitle="Có thể lâu hơn 1 phút"/>
        </div>
        <div style="display: flex; width: 100%; gap: 24px">
          <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px; border-radius: 16px 0 0 16px">
            <a-skeleton-avatar active size="large"/>
            <a-skeleton active size="large"/>
          </div>
          <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;">
            <a-skeleton-avatar active size="large"/>
            <a-skeleton active size="large"/>
          </div>
          <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
            <a-skeleton-avatar active size="large"/>
            <a-skeleton active size="large"/>
          </div>
          <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px; border-radius: 0 16px 16px 0"
               class="hide-on-mobile">
            <a-skeleton-avatar active size="large"/>
            <a-skeleton active size="large"/>
          </div>
        </div>
      </div>
      <div v-else-if="data.analyticResult.response" class="general_overview_container">
        <div style="margin-bottom: 24px;">
          <h2 class="title_main" style="margin-bottom: 8px;">
            Kết quả phân tích từ khóa "{{ data.analyticResult.keyword }}"
          </h2>
          <div>Từ {{ formatDate(data.analyticResult.response.filter_custom.start_date) }} đến
            {{ formatDate(data.analyticResult.response.filter_custom.end_date) }}
          </div>
        </div>
        <div style="margin-bottom: 16px;">
          <general-overview :data="data.analyticResult.response" :is-hide-content="false"/>
        </div>
        <div style="margin-bottom: 16px;">
          <price-range-statistic :data="data.analyticResult.response" :is-hide-content="false"/>
        </div>
        <div style="margin-bottom: 16px;">
          <brand-statistic :data="data.analyticResult.response" :is-hide-content="false"/>
        </div>
        <div style="margin-bottom: 16px;">
          <top-shop-statistic :data="data.analyticResult.response" :is-hide-content="false"/>
        </div>
        <div style="margin-bottom: 16px;">
          <list-products :data="data.analyticResult.response" :is-hide-content="false"/>
        </div>
      </div>
    </div>

    <ModalUnlock v-model:showUnlock="showUnlock" :report="null"/>
  </div>
</template>

<script setup>
import PriceRangeStatistic from "~/components/report/PriceRangeStatistic.vue";
import TopShopStatistic from "~/components/report/TopShopStatistic.vue";
import ListProducts from "~/components/report/ListProducts.vue";
import BrandStatistic from "~/components/report/BrandStatistic.vue";
import GeneralOverview from "~/components/report/GeneralOverview.vue";
import {getIndexedDB, setIndexedDB} from "~/helpers/IndexedDBHelper";
import BannerReport from "~/components/report/BannerReport.vue";
import MetricLoadingIcon from "~/components/MetricLoadingIcon.vue";

const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);

const data = reactive({
  keyword: '',
  analyticResult: {
    keyword: '',
    response: null
  },
});

const loading = ref(false);
const showUnlock = ref(false);

function formatDate(dateStr) {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${day}-${month}-${year}`;
}

async function handleAnalyticKeyword() {
  console.log(data)
  const keyword = data.keyword;

  if (!keyword) {
    return;
  }

  try {
    loading.value = true

    const accessToken = await getIndexedDB("access_token");
    const visitorId = await getIndexedDB("__visitor");
    const url = `http://localhost:8000/api/analytic/?keyword=${keyword}`;
    // const url = `https://api-ereport.staging.muadee.vn/api/analytic/?keyword=${keyword}`;
    const data_analytic = await $fetch(
        url,
        {
          headers: {
            'Authorization': `${accessToken}`,
            'Visitorid': visitorId.visitor_id,
          }
        }
    );

    console.log(1111, data_analytic)

    data.analyticResult = {
      keyword,
      response: {
        filter_custom: {
          "lst_platform_id": [
            1,
            2,
            3,
            8
          ],
          "start_date": "20231001",
          "end_date": "20240930"
        },
        tier_report: 'e_pro',
        data_analytic,
        ...data_analytic,
      }
    }
    await currentUserStore.fetchCurrentUser();
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    const statusCode = error.response?.status;
    console.log('statusCode', statusCode)

    if (statusCode === 401) {
      await setIndexedDB('access_token', '');
      await setIndexedDB('__visitor', '');

      currentUserStore.setShowPopupLogin(true);
    } else if (statusCode === 403) {
      showUnlock.value = true;
    }
  }
}

</script>


<style scoped lang="scss">
.container_content {
  padding-top: 40px;
  padding-bottom: 40px;

  .title {
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;

    .breadcrumbs {
      display: flex;
      gap: 10px;
    }

    .container_report_detail {
      display: flex;
      gap: 24px;

      .container_report_detail_left {
        flex: 0.7;
        display: flex;
        flex-direction: column;
        gap: 16px
      }

      .container_report_detail_right {
        flex: 0.3;
        display: flex;
        flex-direction: column;
        gap: 16px
      }

    }
  }

  .container {
    display: flex;
    gap: 20px;

    .general_overview_container {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .report-title {
        font-size: 36px;
        font-weight: 700;
        line-height: 48px;
        color: #101828;
      }
    }

  }
}

.modal_content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  animation: fadeIn 0.5s ease-out forwards;

  .alert_success {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    .icon_success {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 105px;
      height: 104px;
    }

    .title_content_sucess {
      text-align: center;

      .title_success {
        font-size: 24px;
        line-height: 38px;
        font-weight: bold;
        color: #000;
      }
    }
  }
}

.title_main {
  font-size: 36px;
  font-weight: 700;
  line-height: 48px;
  color: #101828;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.relate_report {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .container_report_detail {
    flex-direction: column;
    gap: 16px;
  }

  .container_report_detail_right {
    order: -1;
  }

  .different_info {
    order: -1;
  }

  .different_info .maybe-interested-component {
    order: 2;
  }

  .title_main {
    font-size: 24px;
    line-height: 32px;
  }

  .title {
    padding-bottom: 16px !important;
  }
}
</style>