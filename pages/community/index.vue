<script setup lang="ts">
import { type SearchReportPayload } from "~/services/reports";
import { PAGE_TITLES } from "~/constant/constains";
import { REPORT_ENDPOINTS } from "~/constant/endpoints";
import {onMounted} from "vue";
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";
import ItemNewReportCommunity from "~/components/report/ItemNewReportCommunity.vue";
import DiscoverCommunity from "~/components/report/DiscoverCommunity.vue";
import ContactUsCommunity from "~/components/report/ContactUsCommunity.vue";
import CtaComunity from "~/components/report/CtaComunity.vue";
import SuccessNotification from "~/components/ContactUs/SuccessNotification.vue";
import {getCookie} from "~/helpers/CookieHelper";

const config = useRuntimeConfig();
const isLoading = ref(true);
const openCta = ref(false);
const openSuccess = ref(false);
const currentUserStore = useCurrentUser();
const {userInfo}: any = storeToRefs(currentUserStore);

const lstYearlyReports = ref([]);
const lstQuarterlyReports = ref([]);
const lstOtherReports = ref([]);

const fetchReport = async () => {
  try {
    const { lst_report }: any = await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.search_community.endpoint}`, {
      method: 'GET',
    });

    lstYearlyReports.value = lst_report.filter((report: any) => report.report_type === 'Báo cáo Năm');
    lstQuarterlyReports.value = lst_report.filter((report: any) => report.report_type === 'Báo cáo Quý');
    lstOtherReports.value = lst_report.filter((report: any) => report.report_type === 'Báo cáo khác');
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

const handleClick = () => {
  const formSubmitted = getCookie('fill_in_the_form') === 'true';
  if (formSubmitted && !userInfo.value?.current_plan.plan_code) {
    openSuccess.value = true;
  }
  else{
    openCta.value = true;
  }
};

fetchReport();

onMounted(() => {
  trackEventCommon(EVENT_TYPE.VIEW_REPORT_REPORTS, 'view_report_reports', '');
});

useSeoMeta({
  title: PAGE_TITLES.reports
});
</script>

<template>
  <div class="title_report">
    <div class="image-metric">
      <div class="default_section">
        <div class="title">
          <div class="content">
            <div class="report_title">Tổng hợp báo cáo thị trường sàn E-commerce 2022,2023 và 2024</div>
            <div class="description">
              Tổng hợp các báo cáo sàn TMĐT đã phát hành bởi Metric kể từ năm 2022, dữ liệu được trích xuất từ phần mềm
              phân tích dữ liệu Metric Analytics.
            </div>
            <a-button v-if="userInfo.current_plan.plan_code === 'e_free' || !userInfo.current_plan.plan_code" type="primary" @click="handleClick" class="btn_report">
              Nhận tổng hợp báo cáo
            </a-button>
            <div class="text_consumer_community" v-else>
              <a href='https://metric.vn/analytics/pricing' style="color: #42A4FF">Trở thành khách hàng của Metric</a> để truy cập hơn 1 triệu báo cáo E-commerce.
            </div>
          </div>
          <div class="new_report">
            <div class="title_new_report">
              Báo cáo các năm
            </div>
            <div v-if="isLoading">
              <a-skeleton />
            </div>
            <item-new-report-community v-else class="item_new_report_tran" :reports="lstYearlyReports" />
          </div>
        </div>
      </div>
    </div>
    <div class="new_report new_report_1 default_section" >
      <div class="title_new_report_black">
        Báo cáo E-commerce hàng quý
      </div>
      <div v-if="isLoading">
        <a-skeleton />
      </div>
      <item-new-report-community v-else class="item_new_report_tran" :reports="lstQuarterlyReports" />
    </div>
    <div class="new_report new_report_2 default_section">
      <div class="title_new_report_black">
        Báo cáo khác
      </div>
      <div v-if="isLoading">
        <a-skeleton />
      </div>
      <item-new-report-community v-else class="item_new_report_tran" :reports="lstOtherReports" />
    </div>
    <discover-community />
    <contact-us-community/>
    <cta-comunity v-model:open="openCta"/>
    <success-notification v-model:visible="openSuccess" class-name="submit-form-marketing-success"/>
  </div>
</template>

<style scoped lang="scss">
.title_report {
  width: 100%;
  height: 100%;

  .image-metric {
    display: flex;
    padding-top: 60px;
    flex-direction: column;
    gap: 40px;
    background: url('/images/Hero_banner.png') no-repeat;
    background-size: cover;
    height: 434px;

    .title {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 60px;

      .content {
        display: flex;
        flex-direction: column;

        .report_title {
          font-size: 44px;
          font-weight: bold;
          color: #FFF;
          line-height: 56px;
          margin-bottom: 16px;
          width: 60%;
        }

        .description {
          font-size: 16px;
          max-width: 650px;
          color: #FFF;
        }
      }
    }
  }
}

.hidden-report {
  opacity: 0;
  transition: opacity 0.9s ease;
}

.visible-report {
  opacity: 1;
  transition: opacity 0.9s ease;
}

.new_report {
  .title_new_report {
    margin-bottom: 16px;
    color: #FFF;
    font-size: 24px;
    font-weight: bold;
  }
  .title_new_report_black {
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
  }
}

.new_report_1 {
  padding-top: 130px;
}

.item_new_report_tran{
  animation: fadeIn 0.5s ease-out forwards;
}

.btn_report{
  margin-top: 12px;
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 200px;
  height: 40px;
}

.text_consumer_community{
  color: #FFFFFF;
  font-size: 14px;
  padding-top: 24px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


@media (max-width: 1023px) {
  .new_report {
    gap: 16px;

    .title_new_report {
      font-size: 20px;
    }

    .title_new_report_black {
      font-size: 20px;
    }
  }
}

@media (min-width: 1919px) {
  .title_report {
    .image-metric {
      .title {
        .content {
          .report_title {
            font-size: 48px;
          }

          .description {
            font-size: 16px;
          }
        }
      }
    }
  }
}

@media (max-width: 1919px) {
  .title_report {
    .image-metric {
      .title {
        .content {
          .report_title {
            font-size: 36px;
          }

          .description {
            font-size: 14px;
            width: 650px;
          }
        }
      }
    }
  }
}

@media (max-width: 1380px) {
  .title_report {
    .image-metric {
      .title {
        .content {
          .report_title {
            font-size: 34px;
          }

          .description {
            font-size: 13px;
            width: 600px;
          }
        }
      }
    }
  }
}
@media (max-width: 1023px) {
  .title_report {
    .image-metric {
      padding-top: 0;
      .title {
        .content {
          .report_title {
            font-size: 24px;
            line-height: 38px;
            width: 100%;
          }

          .description {
            font-size: 12px;
            width: 550px;
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .title_report {
    .image-metric {
      height: 400px;
      .title {
        gap: 40px;

        .content {
          .report_title {
            font-size: 24px;
          }

          .description {
            font-size: 14px;
            width: 100%;
          }
        }
      }
    }
    .new_report_1 {
      padding-top: 100px;
    }
    .new_report_2 {
      padding-top: 50px;
    }
  }
}

@media (max-width: 460px) {
  .title_report {
    .image-metric {
      .title {
        padding-top: 20px;
        gap: 40px;

        .content {
          .report_title {
            font-size: 24px;
          }

          .description {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
