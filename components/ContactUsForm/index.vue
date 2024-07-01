<template>
  <div class="wrapperLeadForm">
    <div class="information">
      <CustomInput v-model:input="formValues.name" label="Họ và tên" :error-message="errors.name" :is-required="true" :input-props="{ placeholder: 'Nhập họ và tên' }" class="infoBlock" />
      <div class="infoBlock contactInfo">
        <CustomInput v-model:input="formValues.email" class="contactItem" :error-message="errors.email" label="Email" :input-props="{ placeholder: 'example@gmail.com', type: 'email' }" />
        <CustomInput v-model:input="formValues.phone" class="contactItem" :error-message="errors.phone" label="Số điện thoại" :is-required="true" :input-props="{ placeholder: 'Nhập SĐT' }" />
      </div>
      <CustomSelect v-model:select="formValues.category" :error-message="errors.category" label="Ngành hàng quan tâm" :is-required="true"
        :select-props="{ placeholder: 'Chọn ngành hàng', showSearch: true, options: CATEGORIES, filterOption: filterSelectOption as any }" class="infoBlock" />
      <CustomSelect v-model:select="formValues.companyType" label="Mô hình doanh nghiệp" :error-message="errors.companyType"
        :select-props="{ placeholder: 'Chọn mô hình doanh nghiệp', showSearch: true, options: COMPANY_TYPES, filterOption: filterSelectOption as any }" class="infoBlock" />
      <CustomSelect v-model:select="formValues.socialMediaType" label="Bạn biết tới Metric từ kênh nào?" :error-message="errors.socialMediaType"
        :select-props="{ placeholder: 'Chọn kênh', showSearch: true, options: SOCIAL_MEDIA_TYPES, filterOption: filterSelectOption as any }" class="infoBlock" />
    </div>
    <AButton type="primary" :class="submitClass" @click="validateForm">{{ submitLabel || "Gửi" }}</AButton>
  </div>

  <ModalStatus :is-open="isOpenModal" :on-close="toggleModal" :type="typeModal.type" :header="typeModal.header" :description="typeModal.description" class-name-modal="statusModal" />
</template>

<script setup lang="ts">
import { CATEGORIES, COMPANY_TYPES, SOCIAL_MEDIA_TYPES } from "../../constant/constains";
import { filterSelectOption } from "../../helpers/supporter";
import { ERRORS } from "~/constant/errors";
import { EMAIL_REGEX, PHONE_REGEX } from "~/helpers/regexs";
import type { TypeModal } from "../modal/status/index.vue";

defineProps<{
  submitLabel?: string;
  submitClass?: string;
}>();

interface IFormValue {
  name: string;
  email?: string;
  phone: string;
  category: string;
  companyType?: string;
  socialMediaType?: string;
}

const formValues = useState<IFormValue>(() => ({ name: "", phone: "", category: "" }));
const errors = useState<Partial<IFormValue>>(() => ({}));

const isOpenModal = useState<boolean>(() => false);
const typeModal = useState<{ type: TypeModal; header: string; description: string }>(() => ({ type: "success" as TypeModal, header: "Đã gửi thành công", description: "Chúng tôi đã nhận được thông tin và sẽ phản hồi sớm nhất tới quý khách!" }));
const toggleModal = () => (isOpenModal.value = !isOpenModal.value);

const validateForm = () => {
  // reset errors
  errors.value = {};

  const information = formValues.value;
  const errorValues = errors.value;

  if (!information.name) {
    errorValues.name = ERRORS.NOT_EMPTY("họ và tên");
  }

  if (information.email) {
    if (!information.email.match(EMAIL_REGEX)) errorValues.email = ERRORS.WRONG_TYPE_INPUT("email");
  }

  if (!information.phone) {
    errorValues.phone = ERRORS.NOT_EMPTY("số điện thoại");
  } else {
    if (!information.phone.match(PHONE_REGEX)) errorValues.phone = ERRORS.WRONG_TYPE_INPUT("số điện thoại");
  }

  if (!information.category) {
    errorValues.category = ERRORS.NEED_CHOOSE_ONE("ngành hàng");
  }

  if (Object.keys(errorValues).length > 0) return;

  // push info here
  const result = true;

  // show modal
  if (!result) {
    // typeModal.value = "failure";
    typeModal.value.header = "...";
    typeModal.value.description = "...";
  }
  toggleModal();
};
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
