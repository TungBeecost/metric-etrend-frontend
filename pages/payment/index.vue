<script setup lang="ts">
import CheckOut from "~/components/payment-service/CheckOut.vue";
import OptionPayment from "~/components/payment-service/OptionPayment.vue";
import PackService from "~/components/payment-service/PackService.vue";
import {ref} from "vue";
import TotalPayment from "~/components/payment-service/TotalPayment.vue";
import {usePayment} from "#imports";
import QRCode from "qrcode.vue";
import { message } from 'ant-design-vue';
const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);

const { createPaymentTransaction, verifyTransaction } = usePayment()
const selectedWalletOption = ref('')
const qrCodeData = ref('');
const openModal = ref<boolean>(false);

interface ErrorResponse {
  response: {
    data: {
      detail: string;
      status_code: number;
    };
  };
}

const handleSelectedOption = (selectedOption: string) => {
  selectedWalletOption.value = selectedOption
};

const handlePayment = async () => {
  if(!userInfo.value.id)
    message.error('Vui lòng đăng nhập trước khi thanh toán');
  else{
    if (selectedWalletOption.value) {
      const paymentMethod = selectedWalletOption.value;
      const itemCode = "e_pro__12m";
      const redirectUrl = `https://ereport.staging.muadee.vn/`;
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
        const typedError = error as ErrorResponse;
        if (typedError.response && typedError.response.data && typedError.response.data.detail === "User already has a subscription" && typedError.response.data.status_code === 400) {
          message.error('Bạn đã có một đăng ký. Không thể thực hiện thêm.');
        } else {
          // Handle other errors
          message.error('Đã xảy ra lỗi khi tạo giao dịch. Vui lòng thử lại.');
        }
      }
    } else {
      message.error('Vui lòng chọn phương thức thanh toán trước khi thanh toán');
    }
  }
};

const checkTransactionStatus = async (transactionId: string) => {
  try {
    const response = await verifyTransaction(transactionId)
    return  response;
  } catch (error) {
    console.error("Error checking transaction status:", error);
    return null;
  }
};

const useCheckTransactionCompletion = (transactionId: string) => {
  const isCompleted = ref(false);
  let intervalId: number | undefined = undefined;

  const checkCompletion = async () => {
    const result = await checkTransactionStatus(transactionId);
    if (result && result.is_completed) {
      console.log("Transaction", isCompleted.value);
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

const handleOk = (_e: MouseEvent) => { // Prefix unused parameter with an underscore or remove it if not needed
  openModal.value = false;
};
</script>

<template>
  <div id="payment" class="payment_service">
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
            <div class="title_content">Quét mã QR để thanh toán</div>
          </div>
        </div>
      </template>
      <div class="payment_info">
        <div class="qr_code">
          <QRCode :value="qrCodeData" :size="250" />
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
  padding-top: 16px
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
<style lang="scss">
@media (max-width: 768px) {

  .payment_info {
    flex-direction: column;
  }

}
</style>