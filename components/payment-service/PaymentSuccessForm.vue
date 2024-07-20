<script setup lang="ts">
import {ERRORS} from "~/constant/errors";
import {EMAIL_REGEX, PHONE_REGEX} from "~/helpers/regexs";
const { submitLeadInformation } = usePayment()

const props = defineProps({
  transactionId: {
    type: String,
    required: true,
  },
});

interface IFormPaymentValue {
  name: string;
  email: string;
  phone: string;
  companyName: string;
}

const formValues = reactive<IFormPaymentValue>({
  name: '',
  email: '',
  phone: '',
  companyName: '',
});

const errors = useState<Partial<IFormPaymentValue>>(() => ({}));

const emit = defineEmits(['formSubmitted']);


const validateForm = async () => {
  errors.value = {};

  const information = formValues;
  const errorValues = errors.value;

  if (!information.name) {
    errorValues.name = ERRORS.NOT_EMPTY("họ và tên");
  }

  if (!information.email) {
    errorValues.email = ERRORS.NOT_EMPTY("email");
  } else if (information.email && !information.email.match(EMAIL_REGEX)) {
    errorValues.email = ERRORS.WRONG_TYPE_INPUT("email");
  }

  if (!information.phone) {
    errorValues.phone = ERRORS.NOT_EMPTY("số điện thoại");
  } else if (!PHONE_REGEX.test(information.phone)) {
    errorValues.phone = ERRORS.WRONG_TYPE_INPUT("số điện thoại");
  }

  if (!information.companyName) {
    errorValues.companyName = ERRORS.NOT_EMPTY("tên công ty");
  }

  if (Object.keys(errorValues).length === 0) {
    try {
      const response = await submitLeadInformation(information.name, information.email, information.phone, information.companyName, props.transactionId);
      console.log('response', response);
      // Emit formSubmitted event only if submission is successful
      emit('formSubmitted', "formSubmitted");
    } catch (error) {
      console.error('error', error);
    }
  }
};

</script>

<template>
  <div class="wrapperLeadForm">
    <div class="information">
      <CustomInput v-model:input="formValues.name" label="Họ và tên" :error-message="errors.name" :is-required="true"
                   :input-props="{ placeholder: 'Nhập họ và tên' }" class="contactItem"/>
      <CustomInput v-model:input="formValues.email" class="contactItem" :error-message="errors.email" label="Email"
                   :input-props="{ placeholder: 'example@gmail.com', type: 'email' }"/>
      <CustomInput v-model:input="formValues.phone" class="contactItem" :error-message="errors.phone"
                   label="Số điện thoại" :is-required="true" :input-props="{ placeholder: 'Nhập SĐT' }"/>
      <CustomInput v-model:input="formValues.companyName" class="contactItem" :error-message="errors.companyName"
                   label="Tên công ty" :is-required="true" :input-props="{ placeholder: 'Tên công ty' }"/>
    </div>
    <div class="btn_payment_success">
      <AButton style="height: 40px; width: 200px" type="primary" @click="validateForm">{{
          "Cập nhật"
        }}
      </AButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapperLeadForm {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 36px;

  .information {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;

    .contactInfo {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 16px;
      flex-wrap: wrap;

      @media (max-width: 767px) {
        flex-direction: column;

      }

      .contactItem {
        flex: 1 0 0;
      }
    }
  }
}

</style>