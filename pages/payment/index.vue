<script setup lang="ts">
import CheckOut from "~/components/payment-service/CheckOut.vue";
import OptionPayment from "~/components/payment-service/OptionPayment.vue";
import PackService from "~/components/payment-service/PackService.vue";
import {ref} from "vue";
import TotalPayment from "~/components/payment-service/TotalPayment.vue";
import {usePayment} from "#imports";
import QrcodeVue3 from "qrcode-vue3"
import { message } from 'ant-design-vue';

const { createPaymentTransaction, verifyTransaction } = usePayment()
const selectedWalletOption = ref('')
const qrCodeData = ref('');
const openModal = ref<boolean>(false);


const handleSelectedOption = (selectedOption: string) => {
  selectedWalletOption.value = selectedOption
};

const handlePayment = async () => {
  if (selectedWalletOption.value) {
    const paymentMethod = selectedWalletOption.value;
    const itemCode = "e_pro__12m";
    const redirectUrl = "http://localhost:3000/";

    try {
      const transactionResult = await createPaymentTransaction(paymentMethod, itemCode, redirectUrl);
      if (transactionResult.response.payment_url) {
        window.location.href = transactionResult.response.payment_url;
      } else {
        qrCodeData.value = transactionResult.response.qrcode;
        openModal.value = true;

        const { isCompleted } = useCheckTransactionCompletion(transactionResult.response.transaction_id);
        isCompleted.value && (window.location.href = '/');
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  } else {
    message.error('Vui lòng chọn phương thức thanh toán trước khi thanh toán');
  }
};

// const checkTransactionStatus = async (transactionId: string) => {
//   try {
//     const response = await verifyTransaction(transactionId)
//     return response.data;
//   } catch (error) {
//     console.error("Error checking transaction status:", error);
//     return null;
//   }
// };

const useCheckTransactionCompletion = (transactionId: string) => {
  const isCompleted = ref(false);
  let intervalId: number | undefined = undefined;

  const checkCompletion = async () => {
    // const result = await checkTransactionStatus(transactionId);
    const result = { is_completed: true };
    if (result && result.is_completed) {
      isCompleted.value = true;
      if (intervalId) clearInterval(intervalId);
      window.location.href = '/?payment=success';
    }
  };

  intervalId = window.setInterval(checkCompletion, 2000);

  watch(openModal, (newValue) => {
    if (!newValue && intervalId) {
      clearInterval(intervalId);
    }
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
  });

  return { isCompleted };
};

const handleOk = (e: MouseEvent) => {
  openModal.value = false;
};
</script>

<template>
  <div class="payment_service">
    <div class="default_section" style=" display: flex; padding: 40px 0; gap: 24px;">
      <div class="payment_service_option">
        <pack-service />
        <option-payment @selected-option="handleSelectedOption" />
      </div>
      <div class="check-out">
        <check-out @payment="handlePayment"/>
      </div>
    </div>
    <a-modal v-model:open="openModal" width="800px" destroy-on-close :footer="null" @ok="handleOk">
      <template #title>
        <div class="statistic-item__title">
          <div class="title">
            <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="32" rx="4" fill="#EEEBFF"/>
            </svg>
            <div class="title_content">Hình thức thanh toán</div>
          </div>
        </div>
      </template>
      <div class="payment_info">
        <div class="qr_code">
          <QrcodeVue3 :value="qrCodeData" :size="200" color="black" />
        </div>
        <div style="padding: 16px; width: 100%">
          <total-payment />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
.payment_service{
  background-color: #FBFAFC;

  .payment_service_option{
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 0.7;
  }

  .check-out{
    flex: 0.3;
  }
}

.payment_info{
  display: flex;
  justify-content: flex-start;
  align-items: center;

}

.statistic-item__title{
  display: flex;
  border-bottom: 1px solid #EEEBFF;
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
</style>