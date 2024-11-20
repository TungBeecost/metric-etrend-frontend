<script setup lang="ts">
import CustomInputDiscount from "~/components/CustomInputDiscount.vue";
import useDiscount from "~/composables/useDiscount";
import { formatCurrency } from "~/helpers/FormatHelper";
import TotalPaymentPdf from "~/components/payment-service/TotalPaymentPdf.vue";
import FormVat from "~/components/payment-service/FormVat.vue";
const currentUserStore = useCurrentUser();
const { userInfo } = storeToRefs(currentUserStore);
const discountValue = ref<string>('');
const nameValue = ref<string>('');
const phoneValue = ref<string>('');
const emailAccount = ref<string>('');
const errors = useState<Partial<IFormValue>>(() => ({}));
const discountInfo = ref<any>({});
const finalPrice = ref<number>(0);
const checked = ref(false);
const formVatValues = ref<IFormValue>({});
const emit = defineEmits(['payment', 'updateContact']);
const { getVoucher } = useDiscount();
const statusApplyCode = ref<boolean>(false);

interface IFormValue {
  discount?: string;
  name?: string;
  phone?: string;
  companyName?: string;
  taxCode?: string;
  email?: string;
  address?: string;
  emailAccount?: string;
}

const { report } = defineProps({
  report: {
    type: Object,
    required: true
  }
});

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!userInfo.value.id && !emailAccount.value) {
    errors.value.emailAccount = 'Bạn cần nhập email tài khoản mua hàng';
  } else if (!emailRegex.test(emailAccount.value)) {
    errors.value.emailAccount = 'Email không hợp lệ';
  } else {
    errors.value.emailAccount = '';
  }

  emit('updateContact', {
    name: nameValue.value,
    phone: phoneValue.value,
    emailAccount: emailAccount.value,
    companyName: formVatValues.value.companyName,
    taxCode: formVatValues.value.taxCode,
    email: formVatValues.value.email,
    address: formVatValues.value.address
  });

  if (checked.value && !isFormVatValid()) {
    return;
  }

  if (!nameValue.value || !phoneValue.value || errors.value.name || errors.value.phone ) {
    if(!userInfo.value.email && errors.value.emailAccount){
      return;
    }
    return;
  }

  if (finalPrice.value === 0 && statusApplyCode.value) {
    finalPrice.value = 0;
  } else if (!finalPrice.value) {
    finalPrice.value = report.price;
  }

  emit('payment', { finalPrice: finalPrice.value, discountInfo: discountInfo.value });
};

const isFormVatValid = () => {
  let isValid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const taxCodeRegex = /^\d{10}$/;
  if (!formVatValues.value.companyName) {
    errors.value.companyName = 'Bạn cần nhập tên công ty';
    isValid = false;
  } else {
    errors.value.companyName = '';
  }
  if (!formVatValues.value.taxCode) {
    errors.value.taxCode = 'Bạn cần nhập mã số thuế';
    isValid = false;
  } else if (!taxCodeRegex.test(formVatValues.value.taxCode)) {
    errors.value.taxCode = 'Mã số thuế phải có 10 chữ số';
    isValid = false;
  } else {
    errors.value.taxCode = '';
  }
  if (!formVatValues.value.email) {
    errors.value.email = 'Bạn cần nhập email';
    isValid = false;
  } else if (!emailRegex.test(formVatValues.value.email)) {
    errors.value.email = 'Email không hợp lệ';
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

onMounted(() => {
  const fields = ['name_payment', 'phone_payment', 'emailAccount_payment', 'companyName_payment', 'taxCode_payment', 'email_payment', 'address_payment'];
  fields.forEach(field => {
    const value = sessionStorage.getItem(field);
    if (value) {
      switch (field) {
        case 'name_payment':
          nameValue.value = value;
          break;
        case 'phone_payment':
          phoneValue.value = value;
          break;
        case 'emailAccount_payment':
          emailAccount.value = value;
          break;
        case 'companyName_payment':
          formVatValues.value.companyName = value;
          break;
        case 'taxCode_payment':
          formVatValues.value.taxCode = value;
          break;
        case 'email_payment':
          formVatValues.value.email = value;
          break;
        case 'address_payment':
          formVatValues.value.address = value;
          break;
      }
    }
  });
});

const handleFormVatUpdate = (formValues: IFormValue) => {
  formVatValues.value = formValues;
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

      discountInfo.value = response;
      console.log('discountInfo', discountInfo.value);

      const now = new Date();
      const isExpired = now > new Date(discount.end_date);

      if (isExpired) {
        statusApplyCode.value = false;
        errors.value.discount = 'Mã giảm giá đã hết hạn';
      }
      else if (discount.applicable_to != 'pdf_report') {
        statusApplyCode.value = false;
        errors.value.discount = 'Mã giảm giá không áp dụng cho sản phẩm này';
      }
      else if (discount.minimum_order_value !== null && report.price < discount.minimum_order_value) {
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
          <CustomInput
              v-if="!userInfo.id"
              v-model:input="emailAccount"
              class="emailAccount"
              :error-message="errors.emailAccount"
              label="Email tài khoản mua hàng"
              :is-required="true"
              :input-props="{ placeholder: 'Nhập email' }"
          />
          <CustomInputDiscount
              v-model:input="discountValue"
              :status-apply-code="statusApplyCode"
              style="display: flex"
              :error-message="errors.discount"
              label="Nhập mã giảm giá"
              :is-required="true"
              :input-props="{ placeholder: 'Nhập mã giảm giá' }"
              @apply-discount="handleDiscount"
          />
        </div>
      </div>
      <div class="total">
        <total-payment-pdf v-if="report" :report="report" :status-apply-code="statusApplyCode" :discount-info="discountInfo" @final-price="handleFinalPrice"/>
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
    border-top: none;
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
