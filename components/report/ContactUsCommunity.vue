<script setup>

import SuccessNotification from "~/components/ContactUs/SuccessNotification.vue";
import ErrorNotification from "~/components/ContactUs/ErrorNotification.vue";
import axios from "axios";
import {generateHash, getGlobalVariable} from "~/services/GlobalVariableService.js";
import {useCurrentUser} from "~/stores/current-user";
import SuccessNotificationPopup from "~/components/ContactUs/SuccessNotificationPopup.vue";
import {trackEventCommon} from "~/services/tracking/TrackingEventService.js";
import {EVENT_TYPE} from "~/constant/general/EventConstant.js";

const currentUserStore = useCurrentUser();

const {userInfo} = storeToRefs(currentUserStore);


const rules = {
  fullName: [{required: true, message: 'Vui lòng nhập họ và tên', trigger: ['blur', 'change']}],
  email: [
    {required: true, message: 'Vui lòng nhập email', trigger: 'blur'},
    {type: 'email', message: 'Email không hợp lệ', trigger: ['blur', 'change']},
  ],
  phone: [
    {required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur'},
    {pattern: /^0[0-9]{9}$/, message: 'Số điện thoại không hợp lệ', trigger: ['blur', 'change']},
  ],
  mktLeadSource: [{required: true, message: 'Vui lòng chọn nguồn tìm kiếm', trigger: 'blur'}],
}


const mktLeadSourceOptions = [
  {
    label: "Chưa từng biết",
    value: "Chưa từng biết"
  },
  {
    label: "Báo cáo thị trường",
    value: "Báo cáo thị trường"
  },
  {
    label: "Sự kiện event",
    value: "Sự kiện event"
  },
  {
    label: "Social media, MXH",
    value: "Social media, MXH"
  },
  {
    label: "Báo chí",
    value: "Báo chí"
  },
  {
    label: "Google",
    value: "Google"
  }
]

const mktUserDemandOptions = [
  {label: 'Nền tảng Phân tích Số liệu Ecommerce', value: 'Nền tảng Phân tích Số liệu Ecommerce'},
  {label: 'Báo cáo thị trường ngành hàng', value: 'Báo cáo thị trường ngành hàng'},
  {label: 'Dữ liệu thị trường theo yêu cầu', value: 'Dữ liệu thị trường theo yêu cầu'},
  {label: 'Hợp tác khác', value: 'Hợp tác khác'},
]

const mktCompanyTypeOptions = [
  {label: 'Doanh nghiệp', value: 'Doanh nghiệp'},
  {label: 'Cá nhân', value: 'Cá nhân'},
  {
    label: 'Không kinh doanh, chỉ tham khảo thông tin thị trường',
    value: 'Không kinh doanh, chỉ tham khảo thông tin thị trường'
  },
]

const formData = useState('LandingPage.formData', () => ({
  fullName: '',
  email: '',
  phone: undefined,
  company: '',
  mktLeadSource: undefined,
  mktUserDemand: undefined,
  mktCompanyType: undefined
}))

const isShowSuccessNotification = useState('LandingPage.isShowSuccessNotification', () => false)
const isShowSuccessNotificationPopup = useState('LandingPage.isShowSuccessNotificationPopup', () => false)
const isShowErrorNotification = useState('LandingPage.isShowErrorNotification', () => false)
const isSubmitFormLoading = useState('LandingPage.isSubmitFormLoading', () => false)

const handleSubmitLeadForm = async () => {
  isSubmitFormLoading.value = true
  const variables = await getGlobalVariable();
  const utm_source = variables?.utm_source || ''
  const utm_medium = variables?.utm_medium || ''
  const utm_campaign = variables?.utm_campaign || ''
  const utm_term = variables?.utm_term || ''
  const utm_content = variables?.utm_content || ''
  const url_referrer = variables?.url_referrer || ''
  const is_mobile = !!variables?.is_mobile
  const pub = variables?.pub || ''
  const _fbc = variables?._fbc || ''
  const _fbp = variables?._fbp || ''
  const emailProfile = formData.value.email || userInfo.value?.email || ''
  const first_visit = localStorage.getItem('first_visit') || ''
  const mktLeadSource = formData.value.mktLeadSource || ''
  const mkUserDemand = formData.value.mktUserDemand || ''
  const mkCompanyType = formData.value.mktCompanyType || ''
  let note = `From: ${window.location.href}\n`
  note += `\nfirst_visit: ${first_visit}\npub: ${pub}\nutm_source: ${utm_source} utm_medium: ${utm_medium} utm_campaign: ${utm_campaign} utm_term: ${utm_term} utm_content: ${utm_content} url_referrer: ${url_referrer}\nemailProfile: ${emailProfile}\n`
  note += `lead_source: ${mktLeadSource}\nuser_demand: ${mkUserDemand}\ncompany_type: ${mkCompanyType}\ndevice: ${is_mobile ? 'mobile' : 'desktop'}`
  console.log('note', formData.value.name)

  console.log('fbq', fbq)

  if (fbq && typeof fbq === 'function') {
    fbq('track', 'Lead', {
      em: await generateHash(emailProfile),
      fn: await generateHash(formData.value.fullName),
      ph: await generateHash(formData.value.phone),
      fbc: _fbc,
      fbp: _fbp
    });
  }

  const payload = {
    name: formData.value.fullName,
    phone: formData.value.phone,
    email: formData.value.email,
    organization_name: formData.value.company,
    note,
    label_init: 'Nóng',
    source_name: 'eReport - Mua gói',
    campaign: 'eReport_Community',
    additional_info: {
      ...variables,
      mkLeadSource: mktLeadSource,
      mktLeadSource,
      mkUserDemand,
      mkCompanyType
    },
  }

  try {
    const urlCreateLead = `https://api-crm.metric.vn/crm/create/lead_form`
    await axios.post(urlCreateLead, payload)
    trackEventCommon(EVENT_TYPE.SUBMIT_FORM_HOMEPAGE, 'submit_form_homepage', '');
    isShowErrorNotification.value = false
    isShowSuccessNotification.value = true

    formData.value = {
      fullName: '',
      email: '',
      phone: undefined,
      company: '',
      mktLeadSource: [],
      mktUserDemand: undefined,
      mktCompanyType: undefined
    }
  } catch (e) {
    isShowSuccessNotification.value = false
    isShowErrorNotification.value = true
    isSubmitFormLoading.value = false
  } finally {
    isSubmitFormLoading.value = false
  }
}
</script>

<template>
  <div class="wrapper contact-us">
    <NuxtImg loading='lazy' format="webp" src="/images/orange-banner-wave.png" class="background"
    />

    <div class="content default_section">
      <div class="info">
        <h2 class="header">Nhận tổng hợp báo cáo E-commerce các năm 2022, 2023, 2024</h2>
        <p class="desc">Đăng ký thông tin hoặc trở thành khách hàng của Metric để truy cập không giới hạn tổng hợp báo cáo E-commerce.</p>
      </div>

      <a-form ref="leadForm" style="flex: 1; max-width: 450px; margin: auto;" :model="formData" :rules="rules"
              @finish="handleSubmitLeadForm">
        <div class="name-and-company-group">
          <a-form-item name="fullName">
            <a-input
                v-model:value="formData.fullName"
                class="input-form"
                size="large"
                placeholder="Họ và tên"
            />
          </a-form-item>
          <a-form-item name="fullNameCompany">
            <a-input
                v-model:value="formData.company"
                class="input-form"
                size="large"
                placeholder="Tên công ty"
            />
          </a-form-item>
        </div>
        <div class="email-and-phone-group">
          <a-form-item name="email">
            <a-input
                v-model:value="formData.email"
                class="input-form"
                size="large"
                placeholder="Email"
            />
          </a-form-item>
          <a-form-item name="phone">
            <a-input
                v-model:value="formData.phone"
                class="input-form"
                size="large"
                placeholder="Số điện thoại"
            />
          </a-form-item>
        </div>
        <a-form-item name="mktLeadSource">
          <a-select
              v-model:value="formData.mktLeadSource"
              class="multiple-select-form"
              size="large"
              :max-tag-count="3"
              :max-tag-text-length="6"
              :options="mktLeadSourceOptions"
              placeholder="Bạn biết tới Metric từ kênh nào?"
          />
        </a-form-item>
        <a-form-item name="mktUserDemand">
          <a-select
              v-model:value="formData.mktUserDemand"
              class="single-select-form"
              size="large"
              :options="mktUserDemandOptions"
              placeholder="Nhu cầu quan tâm"
          />
        </a-form-item>
        <a-form-item name="mktCompanyType">
          <a-select
              v-model:value="formData.mktCompanyType"
              class="single-select-form"
              size="large"
              :options="mktCompanyTypeOptions"
              placeholder="Mô hinh kinh doanh"
          />
        </a-form-item>
        <a-form-item>
          <a-button
              :loading="isSubmitFormLoading"
              class="submit-button"
              size="large" block
              html-type="submit">Đăng ký
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>

  <SuccessNotification v-model:visible="isShowSuccessNotification" class-name="submit-form-marketing-success"/>
  <SuccessNotificationPopup v-model:visible="isShowSuccessNotificationPopup"
                            class-name="submit-form-marketing-success"/>
  <ErrorNotification v-model:visible="isShowErrorNotification" class-name="submit-form-marketing-success"/>
</template>


<style lang="scss">
.contact-us {
  .ant-form-item {
    flex: 1;
    width: 100%;
  }

  .ant-input {
    border-radius: var(--radius-md, 8px);
  }

  .submit-button {
    display: flex;
    height: 64px;
    padding: 9px var(----spacing-4xl, 32px);
    justify-content: center;
    align-items: center;
    gap: var(----spacing-lg, 12px);
    flex: 1 0 0;

    border-radius: var(--radius-md, 8px);
    border-color: var(--Dark-blue-dark-blue-8, #241E46);
    background: var(--Dark-blue-dark-blue-8, #241E46);

    color: var(--Neutral-neutral-1, #FFF);
    text-align: center;

    span {
      font-size: 20px;
      font-weight: 700;
      line-height: 28px; /* 140% */
    }

    &:hover, &:active {
      background: var(--Dark-blue-dark-blue-9, #3A2E6E);
      border-color: var(--Dark-blue-dark-blue-9, #3A2E6E);

      color: var(--Neutral-neutral-1, #FFF);
    }

    &:focus {
      background: var(--Dark-blue-dark-blue-9, #4A3D7C);
      border-color: var(--Dark-blue-dark-blue-9, #4A3D7C);

      color: var(--Neutral-neutral-1, #FFF);
    }
  }
}
</style>


<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  padding: 40px 0;
  background: linear-gradient(90deg, #ff6931 1.09%, #ff9839 49.34%);
  overflow: hidden;
  // color: white;

  justify-content: space-between;
  align-items: center;

  @include mobile {
    padding: 24px 16px;
  }

  @include tablet {
    padding: 24px 60px;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(15deg);
  }

  .content {
    z-index: 1;
    //width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    margin: auto;

    @include mobile {
      flex-direction: column;
      width: 100%;
    }

    @include tablet {
      width: 100%;
    }

    .info {
      flex: 1 0 0;
      gap: 24px;
      max-width: 550px;

      .header {
        color: white;
        font-size: 40px;
        font-weight: 700;
        line-height: 56px;

        @include mobile {
          font-size: 24px;
          line-height: 38px;
        }
      }

      .desc {
        color: #f5f5f5;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;

        @include mobile {
          font-size: 14px;
          line-height: 22px;
        }
      }
    }
  }

  .submitBtnLead {
    background: #241E46 !important;
  }
}


.background {
  top: unset !important;
  height: unset !important;
}

.name-and-company-group {
  display: flex;
  gap: 16px;
}

.email-and-phone-group {
  display: flex;
  gap: 16px;
}

.contact-us .ant-input {
  font-size: 14px;
}

.wrapper {
  .background-image {
    display: none;

    img {
      transform: scaleX(-1);
      object-position: -180px 0;
    }
  }
}


</style>
