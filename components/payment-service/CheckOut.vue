<script setup lang="ts">
import TotalPayment from "~/components/payment-service/TotalPayment.vue";
import CustomInputDiscount from "~/components/CustomInputDiscount.vue";
const discountValue = ref<string>('');
const errors = useState<Partial<IFormValue>>(() => ({}));
const emit = defineEmits(['payment']);
interface IFormValue {
  discount: string;
}
const handlePayment = () => {
  emit('payment', "payment");
};

const handleDiscount = () => {
  if (!discountValue.value) {
    errors.value.discount = 'Vui lòng nhập mã giảm giá';
  } else {
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
        <div class="title_content">Thành tiền đơn hàng</div>
      </div>
    </div>
    <div class="statistic-item__content">
      <div class="discount_code">
        <div class="input_discount">
          <CustomInputDiscount v-model:input="discountValue" style="display: flex" :error-message="errors.discount"
                       label="Nhập mã giảm giá" :is-required="true" :input-props="{ placeholder: 'Nhập mã giảm giá' }" @apply-discount="handleDiscount"/>
        </div>

      </div>
      <div class="total">
        <total-payment/>
        <a-button style="width: 100%; height: 40px; margin-top: 16px" type="primary" @click="handlePayment">Thanh toán</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#option_payment{
  height: 100%;
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
      }
    }
  }
}

.total{
  border-top: 1px solid #EEEBFF;
}
</style>