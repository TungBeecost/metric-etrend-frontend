<template>
  <div>
    <div class="section sectionSearch">
      <div class="sectionHeader searchHeader">
        <h1 class="sectionTitle">Khai thác 1 Triệu báo cáo E-commerce</h1>
        <p class="sectionDescription">
          Nắm giữ mọi xu hướng và dữ liệu hàng hóa, thương hiệu chỉ với 5 giây
        </p>
        <img loading="lazy" src="/images/background-search.png" class="background"/>
      </div>

      <div class="sectionContent searchContent">
        <SearchReport class="searchBox"/>

        <div v-if="recommendSearchLoading" class="recommendSearch">
          <div v-for="(item, index) in listTagSuggestions" :key="index" class="recommendItem">
            <a-skeleton/>
          </div>
        </div>
        <div v-else class="recommendSearch">
          <AButton v-for="(item, index) in listTagSuggestions" :key="index" class="recommendItem"
                   @click="onClickSuggestion(item)">
            {{ item }}
          </AButton>
        </div>
      </div>

    </div>

    <div class="section">
      <Parters/>
    </div>

    <!--    <Highlights/>-->

    <ReportFeaturedReport/>

    <!--    <ReportFree />-->

    <MetricRelease/>

    <DataCollection/>

    <Testimonials/>

    <!--    <PracticalApplication/>-->


    <!--    <div class="planSection">-->
    <!--      <Plans :is-dark-title="true"/>-->
    <!--    </div>-->

    <div class="">
      <ContactUs/>
      <!--    <affiliate-component/>-->
    </div>
<!--    <transition name="fade">-->
<!--      <div-->
<!--          class="chat_gpt">-->
<!--        <popup-chat-gpt/>-->
<!--      </div>-->
<!--    </transition>-->
    <a-modal v-if="showModal" v-model:open="showModal" width="600px" :footer="null" @ok="handleOk">
      <div class="modal_content">
        <div class="alert_success">
          <div class="icon_success">
            <svg width="105" height="104" viewBox="0 0 105 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="52.5" cy="52" r="52" fill="#EAF8EE"/>
              <circle cx="52.5" cy="52" r="35" fill="#CDEDD6"/>
              <g clip-path="url(#clip0_4772_93595)">
                <rect x="34.5" y="34" width="36" height="36" rx="18" fill="white"/>
                <path
                    d="M52.5 34C48.9399 34 45.4598 35.0557 42.4997 37.0335C39.5397 39.0114 37.2326 41.8226 35.8702 45.1117C34.5078 48.4008 34.1513 52.02 34.8459 55.5116C35.5404 59.0033 37.2547 62.2106 39.7721 64.7279C42.2894 67.2453 45.4967 68.9596 48.9884 69.6541C52.48 70.3487 56.0992 69.9922 59.3883 68.6298C62.6774 67.2674 65.4886 64.9603 67.4665 62.0003C69.4443 59.0402 70.5 55.5601 70.5 52C70.495 47.2276 68.5969 42.6522 65.2224 39.2776C61.8478 35.9031 57.2724 34.005 52.5 34ZM60.4027 48.8258L50.7104 58.5181C50.5818 58.6468 50.4291 58.7489 50.261 58.8186C50.0929 58.8883 49.9127 58.9242 49.7308 58.9242C49.5488 58.9242 49.3686 58.8883 49.2005 58.8186C49.0325 58.7489 48.8798 58.6468 48.7512 58.5181L44.5973 54.3642C44.3375 54.1044 44.1915 53.752 44.1915 53.3846C44.1915 53.0172 44.3375 52.6648 44.5973 52.405C44.8571 52.1452 45.2095 51.9992 45.5769 51.9992C45.9444 51.9992 46.2967 52.1452 46.5565 52.405L49.7308 55.581L58.4435 46.8665C58.5721 46.7379 58.7248 46.6358 58.8929 46.5662C59.061 46.4966 59.2411 46.4608 59.4231 46.4608C59.605 46.4608 59.7852 46.4966 59.9532 46.5662C60.1213 46.6358 60.274 46.7379 60.4027 46.8665C60.5313 46.9952 60.6334 47.1479 60.703 47.316C60.7726 47.4841 60.8085 47.6642 60.8085 47.8462C60.8085 48.0281 60.7726 48.2082 60.703 48.3763C60.6334 48.5444 60.5313 48.6971 60.4027 48.8258Z"
                    fill="#35A855"/>
              </g>
              <defs>
                <clipPath id="clip0_4772_93595">
                  <rect x="34.5" y="34" width="36" height="36" rx="18" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="title_content_sucess">
            <div class="title_success">Thanh toán thành công</div>
            <div
                style="text-align: center; padding-top: 12px; padding-bottom: 32px; font-size: 16px; font-weight: 400;">
              Cảm ơn bạn đã tin tưởng và sử dụng gói dịch vụ của eReport!
            </div>
            <a-button type="primary" style="height: 40px" @click="handdleUpdate">Tôi đã hiểu</a-button>
          </div>
        </div>
      </div>
    </a-modal>
    <a-modal
        :open="openContactForm"
        :footer="false"
        :style="modalStyle"
        @cancel="openContactForm = false"
    >
      <div class="modal-contact-us">
        <div class="title">Đăng ký nhận báo cáo</div>
        <div class="description" style="font-size: 16px">
          Vui lòng điền biểu mẫu dưới đây để khám phá ngay kho báo cáo miễn phí về thị trường thương mại điện tử:
          <br>
        </div>
      </div>
      <ContactUsForm :source-name="'eReport'" :popup="true" :handle-submit-success="handleSubmitSuccess"/>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import type SearchReport from '../components/search/search-report.vue';
import {NAVIGATIONS, PLANS} from '~/constant/constains';
import {searchReport, type SearchReportPayload} from "~/services/reports";
import {ref} from "vue";
import DataCollection from "~/components/DataCollection.vue";
import {trackEventCommon, trackEventConversionPixel} from "~/services/tracking/TrackingEventService";
import { useReportAccess } from '~/composables/useReportAccess';

const { isHideContent } = useReportAccess();

const {getInfoTransaction} = usePayment()
import {EVENT_TYPE} from "~/constant/general/EventConstant";
import PopupChatGpt from "~/components/MetricGpt/PopupChatGpt.vue";

const transactionId = ref<string | null>(null);
const isShowSuccessNotification = useState('LandingPage.isShowSuccessNotificationPopup', () => false);
const openContactForm = ref(false)
const listTagSuggestions = ref<string[]>([]);
const showModal = ref(false);
const isMobile = ref(false);
// const isHideContent = ref(true)
const recommendSearchLoading = ref(true);

const fetchTagSuggest = async (value: string) => {
  try {
    const result = await fetchSuggest(value);
    if (result.length) {
      listTagSuggestions.value = result;
    } else {
      listTagSuggestions.value = [];
    }
  } catch (e) {
    console.error(e);
  } finally {
    recommendSearchLoading.value = false;
  }
};

const fetchSuggest = async (value: string | null, options?: SearchReportPayload) => {
  console.log('fetchSuggest')
  try {
    const body: SearchReportPayload = {
      limit: 5,
      lst_field: ["name", "slug"],
      offset: 0,
      sort: "popularity",
      lst_query: value ? [value] : [],
      ...options
    };
    const data = await searchReport(body);

    if (data && data.lst_report) {
      return data.lst_report.map((item) => item.name);
    } else {
      return [];
    }
  } catch (error) {
    console.error("fetchSuggest error: ", error);
    return [];
  }
};

const fetchInfoTransaction = async (transactionId: string) => {
  try {
    const response = await getInfoTransaction(transactionId);
    return response;
  } catch (error) {
    console.error('fetchInfoTransaction error: ', error);
    return null;
  }
};

const handleSubmitSuccess = () => {
  localStorage.setItem('report_mkt_unlocked', 'true');

  isShowSuccessNotification.value = true;
  trackEventCommon(EVENT_TYPE.SUBMIT_FORM_CONTACT, 'submit_form_contact', '');

  openContactForm.value = false;
  isHideContent.value = false;

  const event = new Event('close-advertisement');
  window.dispatchEvent(event);
};

const modalStyle = computed(() => (isMobile.value ? 'padding-top: 30px' : 'padding-top: 30px'));

const handleOk = () => {
  showModal.value = false;
};

const handdleUpdate = () => {
  showModal.value = false;
  navigateTo(`${NAVIGATIONS.home}`);
};

const getPlanPrice = (planCode: string): string | null => {
  console.log('planCode', planCode);
  const plan = PLANS.find(plan => plan.plan_code === planCode);
  return plan && plan.priceValue !== undefined ? plan.priceValue : null;
};

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  transactionId.value = urlParams.get('transaction_id');
  console.log('transactionId', transactionId.value);
  if (transactionId.value) {
    const response = await fetchInfoTransaction(transactionId.value);
    console.log('response', response);
    const planPrice = getPlanPrice(response?.response?.plan_code);
    trackEventCommon(EVENT_TYPE.PAYMENT_SUCCESS_PACKAGE, 'payment_success_package', '');
    trackEventConversionPixel(
        'Purchase',
        null,
        response?.response.plan_code,
        null,
        'product',
        [
          {
            "id": response?.response?.plan_code,
            "item_price": planPrice,
            "quantity": 1,
          }
        ],
        'VND',
        null,
        null,
        null,
        Number(response?.response.value),
    );
    showModal.value = true;
  }
  const unlockedMktReports = localStorage.getItem('report_mkt_unlocked');
  if (unlockedMktReports === 'true') {
    isHideContent.value = false;
  }
  isMobile.value = window.innerWidth <= 767;
  fetchTagSuggest('');
});

const onClickSuggestion = (suggestion: string) => {
  trackEventCommon(EVENT_TYPE.CLICK_SUGGESTION_KEYWORD, 'click_suggestion_keyword', '');
  navigateTo(`${NAVIGATIONS.search}?search=${suggestion}`);
}

const handleAdvertisement = () => {
  openContactForm.value = true;
}

</script>

<style lang="scss" scoped>
@import url("./index.scss");

.section {
  .sectionHeader {
    .sectionTitle {
      color: var(--Neutral-neutral-1, #FFF);
      text-align: center;
      font-size: 64px;
      font-style: normal;
      font-weight: 700;
      line-height: 80px;
      /* 125% */

      margin-bottom: 24px;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

@media (max-width: 767px) {
  .section {
    .sectionHeader {
      .sectionTitle {
        font-size: 36px;
        line-height: 44px;
      }
    }
  }
}

.title {
  color: var(--Dark-blue-dark-blue-8, #241E46);
  text-align: center;

  font-family: Inter, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 133.333% */

  position: relative;
  z-index: 2;
}

.description {
  color: #475467;

  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.48px;
  margin: 24px 0;
}

.recommendSearch {
  animation: fadeIn 0.5s ease-out forwards;
  min-height: 100px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.recommendItem {
  height: 40px;
}

.sectionDescription {
  width: 70%;
}

</style>
