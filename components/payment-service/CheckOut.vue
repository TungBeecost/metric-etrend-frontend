<script setup lang="ts">
import TotalPayment from "~/components/payment-service/TotalPayment.vue";
import CustomInputDiscount from "~/components/CustomInputDiscount.vue";
import useDiscount from "~/composables/useDiscount";
import { defineEmits, ref, watch, defineProps } from 'vue';
import { formatCurrency } from "~/helpers/FormatHelper";
import FormVat from "~/components/payment-service/FormVat.vue";

export interface IFormValue {
  companyName?: string;
  taxCode?: string;
  email?: string;
  address?: string;
  discount?: string;
  name?: string;
  phone?: string;
}

const discountValue = ref<string>('');
const nameValue = ref<string>('');
const phoneValue = ref<string>('');
const errors = ref<Partial<IFormValue>>({});
const discountInfo = ref<any>({});
const finalPrice = ref<number>(0);
const checked = ref(false);
const emit = defineEmits(['payment', 'updateContact']);
const { getVoucher } = useDiscount();
const statusApplyCode = ref<boolean>(false);

const { plan } = defineProps({
  plan: {
    type: Object,
    required: true
  }
});

const formVatValues = ref<IFormValue>({});

watch(plan, (newPlan) => {
  if (newPlan && newPlan.price) {
    finalPrice.value = newPlan.price;
  }
}, { immediate: true });

const handleFinalPrice = (price: number) => {
  finalPrice.value = price;
};

const handlePayment = () => {
  if (!nameValue.value) {
    errors.value.name = 'Bạn cần nhập tên của mình để thanh toán';
  } else {
    errors.value.name = '';
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneValue.value) {
    errors.value.phone = 'Bạn cần nhập số điện thoại của mình để thanh toán';
  } else if (!phoneRegex.test(phoneValue.value)) {
    errors.value.phone = 'Số điện thoại phải có 10 chữ số';
  } else {
    errors.value.phone = '';
  }


  emit('updateContact', {
    name: nameValue.value,
    phone: phoneValue.value,
    companyName: formVatValues.value.companyName,
    taxCode: formVatValues.value.taxCode,
    email: formVatValues.value.email,
    address: formVatValues.value.address
  });

  if (checked.value && !isFormVatValid()) {
    return;
  }

  if (!nameValue.value || !phoneValue.value || errors.value.name || errors.value.phone) {
    return;
  }

  if (!finalPrice.value) {
    finalPrice.value = plan.price;
  }
  emit('payment', { finalPrice: finalPrice.value, discountInfo: discountInfo.value });
};

const isFormVatValid = () => {
  let isValid = true;
  if (!formVatValues.value.companyName) {
    errors.value.companyName = 'Bạn cần nhập tên công ty';
    isValid = false;
  } else {
    errors.value.companyName = '';
  }
  if (!formVatValues.value.taxCode) {
    errors.value.taxCode = 'Bạn cần nhập mã số thuế';
    isValid = false;
  } else {
    errors.value.taxCode = '';
  }
  if (!formVatValues.value.email) {
    errors.value.email = 'Bạn cần nhập email';
    isValid = false;
  } else {
    errors.value.email = '';
  }
  if (!formVatValues.value.address) {
    errors.value.address = 'Bạn cần nhập địa chỉ';
    isValid = false;
  } else {
    errors.value.address = '';
  }
  return isValid;
};

const handleDiscount = () => {
  fetchDiscount();
};

const fetchDiscount = async () => {
  try {
    const response = await getVoucher(discountValue.value);

    if (response) {
      const { discount } = response;
      console.log(discount);
      console.log(plan.price);

      discountInfo.value = response;

      const now = new Date();
      const isExpired = now > new Date(discount.end_date);

      if (isExpired) {
        statusApplyCode.value = false;
        errors.value.discount = 'Mã giảm giá đã hết hạn';
      }
      else if (discount.applicable_to != 'subscription_package') {
        statusApplyCode.value = false;
        errors.value.discount = 'Mã giảm giá không áp dụng cho sản phẩm này';
      }
      else if (discount.minimum_order_value !== null && plan.priceDiscount < discount.minimum_order_value) {
        statusApplyCode.value = false;
        errors.value.discount = `Mã giảm giá chỉ áp dụng với đơn hàng từ ${formatCurrency(discount.minimum_order_value)}`;
      }
      else if (discount.usage_count >= discount.max_usage) {
        statusApplyCode.value = false;
        errors.value.discount = 'Mã giảm giá đã hết lượt sử dụng';
      }
      else {
        statusApplyCode.value = true;
        errors.value.discount = 'Đã áp dụng mã giảm giá';
      }
    } else {
      statusApplyCode.value = false;
      errors.value.discount = 'Mã giảm giá không tồn tại';
    }
  } catch (error) {
    console.error(error);
    statusApplyCode.value = false;
    errors.value.discount = 'Mã giảm giá không tồn tại';
  }
};

const handleFormVatUpdate = (formValues: IFormValue) => {
  formVatValues.value = formValues;
  console.log('Received form values from FormVat:', formValues);
};

</script>

<template>
  <div id="option_payment" class="border statistic-block">
    <div class="statistic-item__title">
      <div class="title">
        <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="32" rx="4" fill="#EEEBFF"/>
        </svg>
        <div class="title_content">Thông tin thanh toán</div>
      </div>
    </div>
    <div class="statistic-item__content">
      <div class="discount_code">
        <div class="input_discount">
          <CustomInput
              v-model:input="nameValue"
              label="Họ và tên"
              :error-message="errors.name"
              :is-required="true"
              :input-props="{ placeholder: 'Nhập họ và tên' }"
              class="infoBlock"
          />
          <CustomInput
              v-model:input="phoneValue"
              class="contactItem"
              :error-message="errors.phone"
              label="Số điện thoại"
              :is-required="true"
              :input-props="{ placeholder: 'Nhập SĐT' }"
          />
          <CustomInputDiscount v-model:input="discountValue" :status-apply-code="statusApplyCode" style="display: flex" :error-message="errors.discount"
                               label="Nhập mã giảm giá" :is-required="true" :input-props="{ placeholder: 'Nhập mã giảm giá' }" @apply-discount="handleDiscount"/>
        </div>
      </div>
      <div class="total">
        <total-payment v-if="plan" :plan="plan" :status-apply-code="statusApplyCode" :discount-info="discountInfo" @final-price="handleFinalPrice"/>
        <a-checkbox v-model:checked="checked" style="padding-top: 16px">Yêu cầu xuất VAT</a-checkbox>
        <form-vat v-if="checked" :errors="errors" @form-values="handleFormVatUpdate"/>
        <a-button style="width: 100%; height: 40px; margin-top: 16px" type="primary" @click="handlePayment">Thanh toán</a-button>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
#option_payment{
  //height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  background-color: #FFF;

  .statistic-item__title{
    padding: 24px;
    border: 1px solid #EEEBFF;
    border-radius: 16px 16px 0 0;

    .title{
      display: flex;
      gap: 16px;
      align-items: center;

      .title_content{
        font-size: 24px;
        line-height: 38px;
        font-weight: bold;
      }
    }
  }
  .statistic-item__content{
    padding: 24px;
    border: 1px solid #EEEBFF;
    border-radius: 0 0 16px 16px;
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    justify-content: space-between;

    .content{
      font-size: 14px;
      line-height: 22px;
      color: #716B95;

    }

    .discount_code{
      align-items: flex-start;

      .content{
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        color: #241E46;
      }

      .input_discount{
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
      }
    }
  }
}

.total{
  border-top: 1px solid #EEEBFF;
}
</style>