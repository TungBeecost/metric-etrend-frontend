<script setup lang="ts">
import TotalPayment from "~/components/payment-service/TotalPayment.vue";
import CustomInputDiscount from "~/components/CustomInputDiscount.vue";
import useDiscount from "~/composables/useDiscount";
import { ref, watch } from 'vue';
import {formatCurrency} from "~/helpers/FormatHelper";

const discountValue = ref<string>('');
const errors = useState<Partial<IFormValue>>(() => ({}));
const discountInfo = ref<any>({});
const finalPrice = ref<number>(0);
const emit = defineEmits(['payment']);
const { getVoucher } = useDiscount();
const statusApplyCode= ref<boolean>(false)
interface IFormValue {
  discount: string;
}

const { plan } = defineProps({
  plan: {
    type: Object,
    required: true
  }
});

watch(plan, (newPlan) => {
  if (newPlan && newPlan.price) {
    finalPrice.value = newPlan.price;
  }
}, { immediate: true });

const handleFinalPrice = (price: number) => {
  finalPrice.value = price;
};

const handlePayment = () => {
  if (!finalPrice.value) {
    finalPrice.value = plan.price;
  }
  emit('payment', { finalPrice: finalPrice.value, discountInfo: discountInfo.value });
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
      else if (discount.minimum_order_value !== null && plan.price < discount.minimum_order_value) {
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
    errors.value.discount = 'Lỗi khi kiểm tra mã giảm giá';
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
        <div class="title_content">Thành tiền đơn hàng</div>
      </div>
    </div>
    <div class="statistic-item__content">
      <div class="discount_code">
        <div class="input_discount">
          <CustomInputDiscount v-model:input="discountValue" :status-apply-code="statusApplyCode" style="display: flex" :error-message="errors.discount"
                               label="Nhập mã giảm giá" :is-required="true" :input-props="{ placeholder: 'Nhập mã giảm giá' }" @apply-discount="handleDiscount"/>
        </div>
      </div>
      <div class="total">
        <total-payment v-if="plan" :plan="plan" :status-apply-code="statusApplyCode" :discount-info="discountInfo" @final-price="handleFinalPrice"/>
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
        align-items: flex-end;
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