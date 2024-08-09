<script setup lang="ts">
import CheckOut from "~/components/payment-service/CheckOut.vue";
import OptionPayment from "~/components/payment-service/OptionPayment.vue";
import PackService from "~/components/payment-service/PackService.vue";
import { ref, onMounted, watch, computed } from "vue";
import TotalPayment from "~/components/payment-service/TotalPayment.vue";
import { usePayment } from "#imports";
import QRCode from "qrcode.vue";
import { message } from 'ant-design-vue';
import { PLANS } from "~/constant/constains";
const currentUserStore = useCurrentUser();
const { userInfo } = storeToRefs(currentUserStore);
const redirectUrl = ref('');
const discountValue = ref<any>({});
const { createPaymentTransaction, verifyTransaction } = usePayment()
const selectedWalletOption = ref('');
const qrCodeData = ref('');
const statusApplyCode = ref<boolean>(false);
const openModal = ref<boolean>(false);
const openModalWaiting = ref<boolean>(false);
const planCode = ref('');

interface ErrorResponse {
  response: {
    data: {
      detail: string;
      status_code: number;
    };
  };
}

interface DiscountInfo {
  discount_code: string;
  [key: string]: any;
}

const handleSelectedOption = (selectedOption: string) => {
  selectedWalletOption.value = selectedOption
};

const handlePayment = async ({ finalPrice, discountInfo }: { finalPrice: string; discountInfo: DiscountInfo }) => {
  discountValue.value = discountInfo;
  const now = new Date();
  let isExpired = false;

  if (discountInfo.discount) {
    const discount = discountInfo.discount;

    isExpired = now > new Date(discount.end_date);

    if (isExpired) {
      statusApplyCode.value = false;
    } else {
      const currentPlan = plan.value;

      if (!currentPlan) {
        statusApplyCode.value = false;
      } else if (discount.minimum_order_value !== null && currentPlan?.priceDiscount !== undefined && currentPlan.priceDiscount < discount.minimum_order_value) {
        statusApplyCode.value = false;
      } else if (discount.usage_count >= discount.max_usage) {
        statusApplyCode.value = false;
      } else {
        statusApplyCode.value = true;
      }
    }
  } else {
    statusApplyCode.value = false;
  }

  if (!userInfo.value.id) {
    message.error('Vui lòng đăng nhập trước khi thanh toán');
  } else {
    if (selectedWalletOption.value) {
      const paymentMethod = selectedWalletOption.value;
      const currentPlan = plan.value; // Lấy giá trị của plan.value vào một biến tạm

      if (currentPlan) {
        const itemCode = `${currentPlan.plan_code}__12m`; // Sử dụng giá trị của currentPlan
        try {
          const transactionResult = await createPaymentTransaction(paymentMethod, itemCode, redirectUrl.value, finalPrice, discountInfo.discount?.code || null);
          if (transactionResult?.response?.payment_url) {
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
            message.error('Đã xảy ra lỗi khi tạo giao dịch. Vui lòng thử lại.');
          }
        }
      } else {
        message.error('Kế hoạch không tồn tại');
      }
    } else {
      message.error('Vui lòng chọn phương thức thanh toán trước khi thanh toán');
    }
  }
};


const checkTransactionStatus = async (transactionId: string) => {
  try {
    const response = await verifyTransaction(transactionId);
    return response;
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
      console.log("Transaction completed");
      openModal.value = false;
      isCompleted.value = true;
      if (intervalId) clearInterval(intervalId);
      window.location.href = `/?transaction_id=${transactionId}`;
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

const plan = computed(() => PLANS.find(p => p.plan_code === planCode.value));

onMounted(() => {
  const route = useRoute();
  planCode.value = route.query.plan_code as string || '';
  redirectUrl.value = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/payment`;

  const orderId = route.query.orderId as string;
  if (orderId) {
    openModalWaiting.value = true;
    useCheckTransactionCompletion(orderId);
  }
});

const handleOk = (_e: MouseEvent) => {
  openModal.value = false;
};
</script>

<template>
  <div id="payment" class="payment_service">
    <div class="default_section" style="display: flex; padding: 40px 0; gap: 24px;">
      <div class="payment_service_option">
        <pack-service v-if="plan" :plan="plan" />
      </div>
      <div class="check-out">
        <option-payment @selected-option="handleSelectedOption" />
        <check-out v-if="plan" :plan="plan" @payment="handlePayment"/>
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
          <total-payment v-if="plan" :plan="plan" :status-apply-code="statusApplyCode" :discount-info="discountValue"/>
        </div>
      </div>
    </a-modal>
    <a-modal v-model:open="openModalWaiting" width="400px" destroy-on-close :footer="null" @ok="handleOk">
      <div style="display: flex; flex-direction: column; align-items: center; padding-top: 16px">
        <a-spin size="large" />
        <div class="title_content" style="font-size: 24px; font-weight: 700; line-height: 38px; padding-top: 24px">Vui lòng chờ giây lát</div>
        <div class="payment_info">
          <p style="font-size: 16px; font-weight: 400; text-align: center">Đang kiểm tra trạng thái giao dịch. Vui lòng không đóng trang này.</p>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
.payment_service{
  background-color: #FBFAFC;

  .payment_service_option{
    flex: 0.7;
  }

  .check-out{
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 0.3;
  }
}

.payment_info{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 16px;
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