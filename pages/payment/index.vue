<script setup lang="ts">
import CheckOut from "~/components/payment-service/CheckOut.vue";
import OptionPayment from "~/components/payment-service/OptionPayment.vue";
import PackService from "~/components/payment-service/PackService.vue";
import { ref, onMounted, watch, computed } from "vue";
import { usePayment } from "#imports";
import QRCode from "qrcode.vue";
import { message } from 'ant-design-vue';
import {PAGE_TITLES, PLANS} from "~/constant/constains";
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
const information = ref({ name: '', phone: '', companyName: '', taxCode: '', email: '', address: '' });

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

message.config({
  top: '100px',
  duration: 2,
  maxCount: 3,
});

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
      const currentPlan = plan.value;

      if (currentPlan) {
        const itemCode = `${currentPlan.plan_code}__12m`;
        try {
          const transactionResult = await createPaymentTransaction(paymentMethod, itemCode, redirectUrl.value, finalPrice, discountInfo.discount?.code || null, information.value.name, information.value.phone, information.value.companyName, information.value.taxCode, information.value.email, information.value.address);
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

const useCheckTransactionCompletion = (transactionId: string, timeout: number = 300000) => {
  const isCompleted = ref(false);
  let intervalId: number | undefined = undefined;
  let timeoutId: number | undefined = undefined;

  const checkCompletion = async () => {
    const result = await checkTransactionStatus(transactionId);
    if (result && result.is_completed) {
      console.log("Transaction completed");
      openModal.value = false;
      isCompleted.value = true;
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      window.location.href = `/?transaction_id=${transactionId}`;
    }
  };

  intervalId = window.setInterval(checkCompletion, 2000);

  timeoutId = window.setTimeout(() => {
    if (!isCompleted.value) {
      console.log("Transaction not completed within the timeout period, redirecting to payment page");
      if (intervalId) clearInterval(intervalId);
      window.location.href = `/payment/${planCode.value}`;
    }
  }, timeout);

  watch(openModal, (newValue) => {
    if (!newValue && intervalId) {
      clearInterval(intervalId);
    }
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
    if (timeoutId) clearTimeout(timeoutId);
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
    useCheckTransactionCompletion(orderId, 3000); // 5 seconds timeout
  }
});

const handleUpdateContact = (contact: { name: string, phone: string, companyName: string, taxCode: string, email: string, address: string }) => {
  information.value.name = contact.name;
  information.value.phone = contact.phone;
  information.value.companyName = contact.companyName;
  information.value.taxCode = contact.taxCode;
  information.value.email = contact.email;
  information.value.address = contact.address;
};

const handleOk = (_e: MouseEvent) => {
  openModal.value = false;
};

useSeoMeta({
  title: PAGE_TITLES.payment,
})
</script>

<template>
  <div id="payment" class="payment_service">
    <div class="default_section" style="display: flex; padding: 40px 0; gap: 24px;">
      <div class="payment_service_option">
        <pack-service v-if="plan" :plan="plan" />
        <option-payment @selected-option="handleSelectedOption" />
      </div>
      <div class="check-out">
        <check-out v-if="plan" :plan="plan" @payment="handlePayment" @update-contact="handleUpdateContact"/>
      </div>
    </div>
    <a-modal v-model:open="openModal" width="500px" destroy-on-close :footer="null" @ok="handleOk">
      <div class="payment_info" style="flex-direction: column; gap: 32px">
        <div style="text-align: center; font-size: 20px; font-weight: 700; color: #241E46">Quét mã VNPAYQR để thanh toán</div>
        <div class="qr_code">
          <QRCode :value="qrCodeData" :size="250" />
          <svg class="corner-icon top-left" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M0.565778 1.75996L0.874973 21.0639C0.877846 21.2433 0.916018 21.4203 0.987307 21.5849C1.0586 21.7495 1.16161 21.8985 1.29046 22.0233C1.41932 22.1481 1.57149 22.2463 1.73829 22.3122C1.90509 22.3782 2.08325 22.4107 2.26261 22.4078C2.44196 22.405 2.61899 22.3668 2.78359 22.2955C2.9482 22.2242 3.09714 22.1212 3.22194 21.9923C3.34673 21.8635 3.44492 21.7113 3.5109 21.5445C3.57688 21.3777 3.60936 21.1995 3.60649 21.0202L3.31794 3.08077L21.2574 2.79464C21.6196 2.78884 21.9647 2.63939 22.2167 2.37915C22.4688 2.11892 22.6071 1.76923 22.6013 1.40701C22.5955 1.04479 22.446 0.699708 22.1858 0.447682C21.9256 0.195655 21.5759 0.0573267 21.2136 0.0631285L1.90966 0.372322C1.73028 0.375096 1.5532 0.4132 1.38855 0.484455C1.2239 0.55571 1.07492 0.658721 0.950106 0.787595C0.825295 0.916469 0.727108 1.06868 0.661163 1.23552C0.595218 1.40237 0.562805 1.58058 0.565778 1.75996Z" fill="#E85912"/>
          </svg>
          <svg class="corner-icon top-right" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M22.4342 2.28339L22.125 21.5874C22.1222 21.7667 22.084 21.9438 22.0127 22.1084C21.9414 22.273 21.8384 22.4219 21.7095 22.5467C21.5807 22.6715 21.4285 22.7697 21.2617 22.8357C21.0949 22.9017 20.9167 22.9341 20.7374 22.9313C20.558 22.9284 20.381 22.8902 20.2164 22.8189C20.0518 22.7476 19.9029 22.6446 19.7781 22.5158C19.6533 22.3869 19.5551 22.2347 19.4891 22.0679C19.4231 21.9011 19.3906 21.723 19.3935 21.5436L19.6821 3.60421L1.7426 3.31808C1.38038 3.31228 1.0353 3.16282 0.783275 2.90259C0.531249 2.64236 0.39292 2.29267 0.398722 1.93045C0.404524 1.56823 0.553981 1.22315 0.814212 0.971119C1.07444 0.719093 1.42413 0.580764 1.78636 0.586566L21.0903 0.89576C21.2697 0.898534 21.4468 0.936637 21.6114 1.00789C21.7761 1.07915 21.9251 1.18216 22.0499 1.31103C22.1747 1.43991 22.2729 1.59211 22.3388 1.75896C22.4048 1.9258 22.4372 2.10401 22.4342 2.28339Z" fill="#E85912"/>
          </svg>
          <svg class="corner-icon bottom-left" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M0.565778 21.2117L0.874973 1.90774C0.877846 1.72838 0.916018 1.55135 0.987307 1.38675C1.0586 1.22215 1.16161 1.0732 1.29046 0.948408C1.41932 0.823617 1.57149 0.725429 1.73829 0.659447C1.90509 0.593466 2.08325 0.560983 2.26261 0.563856C2.44196 0.566728 2.61899 0.6049 2.78359 0.676189C2.9482 0.747479 3.09714 0.850493 3.22194 0.979346C3.34673 1.1082 3.44492 1.26037 3.5109 1.42717C3.57688 1.59397 3.60936 1.77214 3.60649 1.95149L3.31794 19.8909L21.2574 20.177C21.6196 20.1828 21.9647 20.3323 22.2167 20.5925C22.4688 20.8528 22.6071 21.2024 22.6013 21.5647C22.5955 21.9269 22.446 22.272 22.1858 22.524C21.9256 22.776 21.5759 22.9144 21.2136 22.9086L1.90966 22.5994C1.73028 22.5966 1.5532 22.5585 1.38855 22.4872C1.2239 22.416 1.07492 22.313 0.950106 22.1841C0.825295 22.0552 0.727108 21.903 0.661163 21.7362C0.595218 21.5693 0.562805 21.3911 0.565778 21.2117Z" fill="#E85912"/>
          </svg>
          <svg class="corner-icon bottom-right" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M22.1041 21.2117L21.7949 1.90774C21.7921 1.72838 21.7539 1.55135 21.6826 1.38675C21.6113 1.22215 21.5083 1.0732 21.3795 0.948408C21.2506 0.823617 21.0984 0.725429 20.9316 0.659447C20.7648 0.593466 20.5867 0.560983 20.4073 0.563856C20.228 0.566728 20.0509 0.6049 19.8863 0.676189C19.7217 0.747479 19.5728 0.850493 19.448 0.979346C19.3232 1.1082 19.225 1.26037 19.159 1.42717C19.093 1.59397 19.0606 1.77214 19.0634 1.95149L19.352 19.8909L1.41253 20.177C1.0503 20.1828 0.705224 20.3323 0.453197 20.5925C0.201171 20.8528 0.0628423 21.2024 0.0686441 21.5647C0.0744459 21.9269 0.223902 22.272 0.484134 22.524C0.744366 22.776 1.09406 22.9144 1.45628 22.9086L20.7603 22.5994C20.9396 22.5966 21.1167 22.5585 21.2814 22.4872C21.446 22.416 21.595 22.313 21.7198 22.1841C21.8446 22.0552 21.9428 21.903 22.0088 21.7362C22.0747 21.5693 22.1071 21.3911 22.1041 21.2117Z" fill="#E85912"/>
          </svg>
        </div>
        <div style="font-size: 16px; font-weight: 400; color: #241E46; text-align: center">Sử dụng ứng dụng ngân hàng để quét mã QR và tiến hành thanh toán</div>
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
    display: flex;
    flex-direction: column;
    flex: 0.7;
    gap: 24px;
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
  justify-content: center;
  align-items: center;
  padding-top: 16px;
  position: relative;

  .qr_code{
    position: relative;
    width: 250px;
    height: 250px;

    .corner-icon{
      position: absolute;
      width: 23px;
      height: 23px;
    }

    .top-left{
      top: -12px;
      left: -12px;
    }

    .top-right{
      top: -12px;
      right: -12px;
    }

    .bottom-left{
      bottom: -12px;
      left: -12px;
    }

    .bottom-right{
      bottom: -12px;
      right: -12px;
    }
  }
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