<script setup lang="ts">
import type {IFormValue} from "~/components/payment-service/FormVat.vue";
import {ERRORS} from "~/constant/errors";
import {EMAIL_REGEX, PHONE_REGEX} from "~/helpers/regexs";
import {useSearchReport} from "#imports";
const { fetchExportReportSendMail } = useSearchReport();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:visible'])

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const errors = useState<Partial<IFormValue>>(() => ({}));

const formValues = reactive<IFormValue>({
  name: '',
  email: '',
  phone: '',
  companyName: '',
});

const validateForm = async () => {
  errors.value = {};

  const formData = formValues;
  const errorValues = errors.value;

  if (!formData.email) {
    errorValues.email = ERRORS.NOT_EMPTY("email");
  } else if (formData.email && !formData.email.match(EMAIL_REGEX)) {
    errorValues.email = ERRORS.WRONG_TYPE_INPUT("email");
  }

  if (Object.keys(errorValues).length > 0) return;
  const response = await fetchExportReportSendMail(
      props.slug,
      formValues.email || '',
      formValues.name || '',
      formValues.phone || '',
      formValues.companyName || ''
  );

  if (response.message === "success") {
    isVisible.value = false;
    message.success("Gửi báo cáo thành công");
  }
}
</script>

<template>
  <a-modal v-model:open="isVisible" :footer="false" style="width: 663px;">
    <div class="form_export_report_pdf">
      <div class="form_title">
        <h1>Xuất báo cáo qua email</h1>
        <p>Vui lòng nhập thông tin để hệ thống gửi báo cáo demo qua email cho khách hàng</p>
      </div>
      <div class="form_content">
        <CustomInput
            v-model:input="formValues.name"
            label="Họ và tên"
            :error-message="errors.name"
            :input-props="{ placeholder: 'Nhập họ và tên' }"
            class="infoBlock"
        />
        <div class="contactInfo">
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
              :input-props="{ placeholder: 'Nhập SĐT' }"
          />
        </div>
        <CustomInput
            v-model:input="formValues.companyName"
            class="companyName"
            :error-message="errors.companyName"
            label="Tên công ty"
            :input-props="{ placeholder: 'Nhập tên công ty (nếu có)' }"
        />
      </div>
      <a-button type="primary" style="width: 100%;" @click="validateForm">
        Gửi báo cáo
      </a-button>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
.form_export_report_pdf{
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex: 1 0 0;


  .form_title{
    h1{
      text-align: center;
      padding: 14px 10px 10px 24px;
      font-size: 24px;
      font-weight: 700;
      line-height: 38px;
    }

    p{
      color: #475467;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }
  }

  .form_content{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .contactInfo{
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }
  }
}
</style>