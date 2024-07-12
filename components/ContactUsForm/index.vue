<template>
  <div class="wrapperLeadForm">
    <div class="information">
      <CustomInput v-model:input="formValues.name" label="Họ và tên" :error-message="errors.name" :is-required="true"
                   :input-props="{ placeholder: 'Nhập họ và tên' }" class="infoBlock"/>
      <div class="infoBlock contactInfo">
        <CustomInput v-model:input="formValues.email" class="contactItem" :error-message="errors.email" label="Email"
                     :input-props="{ placeholder: 'example@gmail.com', type: 'email' }"/>
        <CustomInput v-model:input="formValues.phone" class="contactItem" :error-message="errors.phone"
                     label="Số điện thoại" :is-required="true" :input-props="{ placeholder: 'Nhập SĐT' }"/>
      </div>
      <CustomSelect v-model:select="formValues.category" :error-message="errors.category" label="Ngành hàng quan tâm"
                    :is-required="true"
                    :select-props="{ placeholder: 'Chọn ngành hàng', showSearch: true, options: CATEGORIES, filterOption: filterSelectOption as any }"
                    class="infoBlock"/>
      <CustomSelect v-model:select="formValues.companyType" label="Mô hình doanh nghiệp"
                    :error-message="errors.companyType"
                    :select-props="{ placeholder: 'Chọn mô hình doanh nghiệp', showSearch: true, options: COMPANY_TYPES, filterOption: filterSelectOption as any }"
                    class="infoBlock"/>
      <CustomSelect v-model:select="formValues.socialMediaType" label="Bạn biết tới Metric từ kênh nào?"
                    :error-message="errors.socialMediaType"
                    :select-props="{ placeholder: 'Chọn kênh', showSearch: true, options: SOCIAL_MEDIA_TYPES, filterOption: filterSelectOption as any }"
                    class="infoBlock"/>
    </div>
    <AButton style="height: 40px" type="primary" :class="submitClass" @click="validateForm">{{ submitLabel || "Gửi" }}</AButton>
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

defineProps<{
  submitLabel?: string;
  submitClass?: string;
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

const emit = defineEmits(['handle-submit-success']);

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

  emit('handle-submit-success');
};

const validateForm = async () => {
  errors.value = {};

  const information = formValues;
  const errorValues = errors.value;

  if (!information.name) {
    errorValues.name = ERRORS.NOT_EMPTY("họ và tên");
  }

  if (information.email && !information.email.match(EMAIL_REGEX)) {
    errorValues.email = ERRORS.WRONG_TYPE_INPUT("email");
  }

  if (!information.phone) {
    errorValues.phone = ERRORS.NOT_EMPTY("số điện thoại");
  } else if (!PHONE_REGEX.test(information.phone)) {
    errorValues.phone = ERRORS.WRONG_TYPE_INPUT("số điện thoại");
  }

  if (!information.category) {
    errorValues.category = ERRORS.NEED_CHOOSE_ONE("ngành hàng");
  }

  if (Object.keys(errorValues).length > 0) return;

  try {
    const response = await axios.post(
        "https://api-crm.metric.vn/crm/create/lead_form",
        {
          name: information.name,
          email: information.email,
          phone: information.phone,
          organization_name: information.organization_name,
          note: `from: ${information.additional_info.url}\nfirst_visit: ${information.additional_info.firstVisit}\npub: ${information.additional_info.routeName}\nutm_medium: ${information.additional_info.utmMedium}\nutm_campaign: ${information.additional_info.utmCampaign}\nurl_referrer: ${information.additional_info.urlReferrer}\nnlead_source: ${information.socialMediaType}\nuser_demand: ${information.category}\ncompany_type: ${information.companyType}`,
          label_init: information.label_init,
          source_name: information.source_name,
          campaign: information.campaign,
          additional_info: {
            urlReferrer: information.additional_info.urlReferrer,
            url: information.additional_info.url,
            routeName: information.additional_info.routeName,
            utmMedium: information.additional_info.utmMedium,
            utmCampaign: information.additional_info.utmCampaign,
            isMobile: information.additional_info.isMobile,
            firstVisit: information.additional_info.firstVisit,
            mkLeadSource: [
              information.socialMediaType,
            ],
            mkUserDemand: information.category,
            mkUserDemandmkUserDemand: information.companyType,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );

    console.log("Response from server:", response.data);
    isOpenModal.value = true;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
