<script setup lang="ts">
import { ref, watch} from 'vue';

export interface IFormValue {
  companyName?: string;
  taxCode?: string;
  email?: string;
  address?: string;
  discount?: string;
  name?: string;
  phone?: string;
}

const props = defineProps<{
  errors: Partial<IFormValue>;
}>();

const companyNameValue = ref<string>('');
const taxCodeValue = ref<string>('');
const emailValue = ref<string>('');
const addressValue = ref<string>('');

const emit = defineEmits<{
  (e: 'formValues', value: IFormValue): void;
  (e: 'updateErrors', value: Partial<IFormValue>): void;
}>();

watch([companyNameValue, taxCodeValue, emailValue, addressValue], () => {
  const formValues = {
    companyName: companyNameValue.value,
    taxCode: taxCodeValue.value,
    email: emailValue.value,
    address: addressValue.value,
  };
  emit('formValues', formValues);
});

const validateForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const taxCodeRegex = /^\d{10}$/;
  const newErrors: Partial<IFormValue> = {};

  if (!companyNameValue.value) newErrors.companyName = 'Bạn cần nhập tên công ty';

  if (!taxCodeValue.value) {
    newErrors.taxCode = 'Bạn cần nhập mã số thuế';
  } else if (!taxCodeRegex.test(taxCodeValue.value)) {
    newErrors.taxCode = 'Mã số thuế phải có 10 chữ số';
  }

  if (!emailValue.value) {
    newErrors.email = 'Bạn cần nhập email';
  } else if (!emailRegex.test(emailValue.value)) {
    newErrors.email = 'Email không hợp lệ';
  }

  if (!addressValue.value) newErrors.address = 'Bạn cần nhập địa chỉ';
  emit('updateErrors', newErrors);
};

watch([companyNameValue, taxCodeValue, emailValue, addressValue], validateForm);
</script>

<template>
  <div class="form_vat">
    <CustomInput
        v-model:input="companyNameValue"
        class="contactItem"
        :error-message="props.errors?.companyName || ''"
        label="Công ty"
        :is-required="true"
        :input-props="{ placeholder: 'Nhập Công ty' }"
    />
    <div style="display: flex; gap: 8px">
      <CustomInput
          v-model:input="taxCodeValue"
          class="contactItem"
          :error-message="props.errors?.taxCode || ''"
          label="Mã số thuế"
          :is-required="true"
          :input-props="{ placeholder: 'Nhập Mã số thuế' }"
      />
      <CustomInput
          v-model:input="emailValue"
          class="contactItem"
          :error-message="props.errors?.email || ''"
          label="Email nhận hóa đơn"
          :is-required="true"
          :input-props="{ placeholder: 'Nhập Email nhận hóa đơn' }"
      />
    </div>
    <CustomInput
        v-model:input="addressValue"
        class="contactItem"
        :error-message="props.errors?.address || ''"
        label="Địa chỉ"
        :is-required="true"
        :input-props="{ placeholder: 'Nhập Địa chỉ ' }"
    />
  </div>
</template>

<style scoped lang="scss">
.form_vat{
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px 0;
}
</style>
