<template>
  <div class="wrapperLeadForm">
    <div class="information">
      <CustomInput
          v-model:input="formValues.name"
          label="Họ và tên"
          :error-message="errors.name"
          :is-required="true"
          :input-props="{ placeholder: 'Nhập họ và tên' }"
          class="infoBlock"
      />
      <div class="infoBlock contactInfo">
        <CustomInput
            v-model:input="formValues.email"
            class="contactItem"
            :error-message="errors.email"
            label="Email"
            :is-required="true"
            :input-props="{ placeholder: 'example@gmail.com', type: 'email' }"
        />
        <CustomInput
            v-model:input="formValues.phone"
            class="contactItem"
            :error-message="errors.phone"
            label="Số điện thoại"
            :is-required="true"
            :input-props="{ placeholder: 'Nhập SĐT' }"
        />
      </div>
      <CustomSelect
          v-model:select="formValues.category"
          :error-message="errors.category"
          label="Ngành hàng quan tâm"
          :select-props="{ placeholder: 'Chọn ngành hàng', showSearch: true, options: CATEGORIES, filterOption: filterSelectOption as any }"
          class="infoBlock"
      />
      <CustomSelect
          v-model:select="formValues.companyType"
          label="Mô hình doanh nghiệp"
          :error-message="errors.companyType"
          :select-props="{ placeholder: 'Chọn mô hình doanh nghiệp', showSearch: true, options: COMPANY_TYPES, filterOption: filterSelectOption as any }"
          class="infoBlock"
      />
      <CustomSelect
          v-model:select="formValues.socialMediaType"
          label="Bạn biết tới Metric từ kênh nào?"
          :error-message="errors.socialMediaType"
          :select-props="{ placeholder: 'Chọn kênh', showSearch: true, options: SOCIAL_MEDIA_TYPES, filterOption: filterSelectOption as any }"
          class="infoBlock"
      />
    </div>
    <AButton style="height: 40px" type="primary" :class="submitClass" @click="validateForm" :loading="loading">{{
        submitLabel || "Gửi"
      }}
    </AButton>
  </div>

  <ModalStatus :is-open="isOpenModal" :on-close="toggleModal" :type="typeModal.type" :header="typeModal.header"
               :description="typeModal.description" class-name-modal="statusModal"/>
</template>

<script setup lang="ts">
import {CATEGORIES, COMPANY_TYPES, SOCIAL_MEDIA_TYPES} from "~/constant/constains";
import {filterSelectOption} from "~/helpers/supporter";
import {ERRORS} from "~/constant/errors";
import {EMAIL_REGEX, PHONE_REGEX} from "~/helpers/regexs";
import type {TypeModal} from "~/components/modal/status/index.vue";
import axios from "axios";
import {getGlobalVariable} from "~/services/GlobalVariableService";
import {useCurrentUser} from "~/stores/current-user";

const currentUserStore = useCurrentUser();

const {userInfo}: any = storeToRefs(currentUserStore);

const {handleSubmitSuccess} = defineProps<{
  submitLabel?: string;
  submitClass?: string;
  handleSubmitSuccess?: any;
}>();

interface IAdditionalInfo {
  urlReferrer: string;
  url: string;
  routeName: string;
  utmMedium: string;
  utmCampaign: string;
  isMobile: boolean;
  firstVisit: string;
}

interface IFormValue {
  name: string;
  email?: string;
  phone: string;
  companyType: string;
  organization_name: string;
  category: string;
  note: string;
  label_init?: string;
  source_name?: string;
  socialMediaType: string;
  campaign: string;
  additional_info: IAdditionalInfo;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    console.warn('getCookie was called server-side. Cookies can only be accessed in a browser environment.');
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() ?? null;
  }
  return null;
}

const getCurrentURL = () => {
  if (typeof window !== 'undefined') {
    const baseUrl = new URL(window.location.href);
    return `${baseUrl.protocol}//${baseUrl.host}/`;
  } else {
    return process.env.BASE_URL || 'http://localhost:3000/';
  }
};

const route = useRoute();
const routeName = String(route.name) || "";
const utm_medium = getCookie('utm_campaign');
console.log('utm_medium', utm_medium);

const formValues = reactive<IFormValue>({
  name: "",
  email: "",
  phone: "",
  organization_name: "metric",
  category: "",
  note: "",
  label_init: "nóng",
  source_name: "e-report",
  campaign: 'Đăng ký dùng thử',
  companyType: "",
  socialMediaType: "",
  additional_info: {
    urlReferrer: getCookie('urlReferrer') || "",
    url: getCurrentURL(),
    routeName: routeName || "",
    utmMedium: getCookie('utm_medium') || "",
    utmCampaign: getCookie('utm_campaign') || "",
    isMobile: getCookie('is_mobile') === 'true',
    firstVisit: getCookie('first_visit') || "",
  },
});
const errors = useState<Partial<IFormValue>>(() => ({}));

const isOpenModal = useState<boolean>(() => false);
const loading = useState<boolean>(() => false);
const typeModal = useState<{
  type: TypeModal;
  header: string;
  description: string
}>(() => ({
  type: "success" as TypeModal,
  header: "Đã gửi thành công",
  description: "Chúng tôi đã nhận được thông tin và sẽ phản hồi sớm nhất tới quý khách!"
}));
const toggleModal = () => {
  isOpenModal.value = !isOpenModal.value
};

const validateForm = async () => {
  errors.value = {};

  const formData = formValues;
  const errorValues = errors.value;

  if (!formData.name) {
    errorValues.name = ERRORS.NOT_EMPTY("họ và tên");
  }

  if (!formData.email) {
    errorValues.email = ERRORS.NOT_EMPTY("email");
  } else if (formData.email && !formData.email.match(EMAIL_REGEX)) {
    errorValues.email = ERRORS.WRONG_TYPE_INPUT("email");
  }

  if (!formData.phone) {
    errorValues.phone = ERRORS.NOT_EMPTY("số điện thoại");
  } else if (!PHONE_REGEX.test(formData.phone)) {
    errorValues.phone = ERRORS.WRONG_TYPE_INPUT("số điện thoại");
  }

  if (Object.keys(errorValues).length > 0) return;
  const variables: any = await getGlobalVariable();

  const utm_source = variables?.utm_source || ''
  const utm_medium = variables?.utm_medium || ''
  const utm_campaign = variables?.utm_campaign || ''
  const utm_term = variables?.utm_term || ''
  const utm_content = variables?.utm_content || ''
  const url_referrer = variables?.url_referrer || ''
  const is_mobile = !!variables?.is_mobile
  const pub = variables?.pub || ''
  const emailProfile = formData.email || userInfo.value?.email || ''
  const first_visit = localStorage.getItem('first_visit') || ''
  const mkLeadSource = [formData.socialMediaType]
  const mkUserDemand = formData.category || ''
  const mkCompanyType = formData.companyType || ''
  let note = `From: ${window.location.href}\n`
  note += `\nfirst_visit: ${first_visit}\npub: ${pub}\nutm_source: ${utm_source} utm_medium: ${utm_medium} utm_campaign: ${utm_campaign} utm_term: ${utm_term} utm_content: ${utm_content} url_referrer: ${url_referrer}\nemailProfile: ${emailProfile}\n`
  note += `lead_source: ${mkLeadSource.join(',')}\nuser_demand: ${mkUserDemand}\ncompany_type: ${mkCompanyType}\ndevice: ${is_mobile ? 'mobile' : 'desktop'}`
  console.log('note', formData.name)

  const payload = {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    organization_name: formData.organization_name,
    note,
    label_init: 'Nóng',
    source_name: 'Report Free',
    campaign: 'Đăng ký dùng thử',
    additional_info: {
      ...variables,
      mkLeadSource,
      mkUserDemand,
      mkCompanyType
    },
  }
  try {
    loading.value = true
    const response = await axios.post(
        "https://api-crm.metric.vn/crm/create/lead_form",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );
    loading.value = false
    if (handleSubmitSuccess) {
      return handleSubmitSuccess()
    }

    console.log("Response from server:", response.data);
    isOpenModal.value = true;
  } catch (error) {
    loading.value = false
    console.error("Error submitting form:", error);
  }
};
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
