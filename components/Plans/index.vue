<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {NAVIGATIONS, PLANS} from '~/constant/constains';
import {formatSortTextCurrencyPlan} from "~/helpers/utils";
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";
const currentUserStore = useCurrentUser();
const {userInfo}: any = storeToRefs(currentUserStore);

defineProps<{
  isDarkTitle?: boolean,
}>()

const value1 = ref('PDF_report');
const value2 = ref('pt50');
const value3 = ref('custom_pdf_report');

const hover1 = ref(false);
const hover2 = ref(false);
const hover3 = ref(false);

const buttonClass1 = computed(() => hover1.value ? 'hover-class' : 'default-class');
const buttonClass2 = computed(() => hover2.value ? 'hover-class' : 'default-class');
const buttonClass3 = computed(() => hover3.value ? 'hover-class' : 'default-class');

const isPricingMetric = ref(false);

const windowWidth = ref(0);
const isMobile = ref(false);

onMounted(() => {
  windowWidth.value = window.innerWidth;
  isMobile.value = window.innerWidth < 768;
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    isMobile.value = window.innerWidth < 768;
  });

  isPricingMetric.value = window.location.pathname === '/pricing/metric';

});

const getIsShowActiveButton = (user_plan_code: string, plan: any) => {
  if(user_plan_code === 'e_free' || user_plan_code === 'e_trial' || user_plan_code === 'e_community' || !user_plan_code) {
    return 'Mua ngay';
  }
  else if (user_plan_code === plan.plan_code) {
    return 'Đang sử dụng';
  }
  else{
    return 'Liên hệ tư vấn';
  }
};

const handleClickFindReport = () => {
  trackEventCommon(EVENT_TYPE.CLICK_SEARCH_REPORTS, 'click_search_reports', '');
  if(isPricingMetric.value) {
    window.open(`${NAVIGATIONS.search}`, '_blank');
  } else {
    navigateTo(`${NAVIGATIONS.search}`);
  }
};

const handleClickContactUs = () => {
  if(isPricingMetric.value) {
    window.open(`${NAVIGATIONS.contactUs}`, '_blank');
  } else {
    navigateTo(`${NAVIGATIONS.contactUs}`);
  }
};

const handleClickPayment = (plan: any) => {
  if (isPricingMetric.value) {
    window.open(`${NAVIGATIONS.payment}?plan_code=${plan.plan_code}`, '_blank');
  } else {
    navigateTo(`${NAVIGATIONS.payment}?plan_code=${plan.plan_code}`);
  }
};


const filteredPlans = computed(() => {
  const selectedPlanCodes = [value1.value, value2.value, value3.value];
  const uniquePlans = new Map();

  PLANS.forEach(plan => {
    if (selectedPlanCodes.includes(plan.plan_code) && !uniquePlans.has(plan.type_package)) {
      uniquePlans.set(plan.type_package, plan);
    }
  });

  return Array.from(uniquePlans.values());
});

const scrollToSpecificPoint = () => {
  window.scrollTo({
    top: 1400,
    left: 0,
    behavior: 'smooth'
  });
};

</script>

<template>
  <div class="wrapper">
    <div>
      <p :class="{ header: true, dark: isDarkTitle }">
        Các gói dịch vụ đa dạng với mọi nhu cầu
      </p>
      <p class = "subHeader">
        Ra quyết định nhanh chóng với dữ liệu chính xác ngay hôm nay
      </p>
    </div>
    <div class="pricings">
      <div v-for="plan in filteredPlans" class="planItem">

        <div class="content">
          <div class="container">
            <div :class="['summary', { 'incentive-background': plan.type_package === 'incentive' }]">
              <p class="planType">{{ plan.type }}</p>
              <p class="planDesc" v-html="plan.description"></p>
              <div class="select_packet">
<!--                <div v-if="plan.type_package === 'incentive'">-->
<!--                  <div class="incentive_box">-->
<!--                    Không giới hạn lượt xem báo cáo-->
<!--                  </div>-->
<!--                </div>-->
              </div>
<!--              <div v-if="plan.priceValue !== plan.priceDiscount" class="planDiscountPrice">{{ formatSortTextCurrencyPlan(plan.priceDiscount) }}</div>-->
              <div class="planPrice">
                <div v-if="plan.type_package === 'incentive'" class="incentive_text">
                  Thời hạn khuyến mãi: 31/12/2024
                </div>
                <span v-if="plan.type_package === 'pdf_report'">Từ </span>{{ formatSortTextCurrencyPlan(plan.price) }}
                <span v-if="plan.unit" class="priceUnit"> /{{ plan.unit }}</span>
              </div>
              <a-select
                  v-if="plan.type_package === 'analysis'"
                  ref="select"
                  v-model:value="value2"
                  style="width: 100%; padding-top: 12px"
              >
                <a-select-option value="pt100">100 lượt xem online</a-select-option>
                <a-select-option value="pt50">50 lượt xem online</a-select-option>
              </a-select>
            </div>

            <div class="divider"/>

            <div class="permission">
<!--              <p v-if="userInfo.current_plan?.plan_code != 'e_free'" class="includeLabel">Bao gồm:</p>-->
              <div class="permissionList">
                <div v-for="permission in plan.permissions" class="permissionItem">
                  <div class="perm">
                    <CustomIcon :type="permission.icon as any" :is-custom-size="true" class="permissionIcon"/>
                    <div v-html="permission.label"></div>
                  </div>
                  <div v-for="subPerm in permission.sub" class="perm subPerm">
                    <CustomIcon type="Tick" :is-custom-size="true" class="permissionIcon"/>
                    <div>{{ subPerm }}</div>
                  </div>
                </div>
                <div
                    v-if="plan.type_package === 'analysis' || plan.type_package === 'pdf_report'"
                    class="feature-details-button"
                    @click="scrollToSpecificPoint"
                    style="margin-top: 12px; width: 100%; font-size: 12px; display: flex; align-items: center; cursor: pointer"
                >
                  Chi tiết tính năng
                  <svg width="17" height="36" viewBox="0 0 17 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0386 16.3237L8.28857 19.8237L4.53857 16.3237" stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="button" style="padding: 24px 24px">
            <a-button
                v-if="getIsShowActiveButton(userInfo.current_plan?.plan_code, plan) === 'Mua ngay' && plan.type_package === 'analysis'"
                :class="['not_user_plan', buttonClass1]"
                style="height: 40px"
                @click="userInfo.id ? handleClickPayment(plan) : currentUserStore.setShowPopupLogin(true)"
            >
              Mua ngay
            </a-button>

            <a-button
                v-if="getIsShowActiveButton(userInfo.current_plan?.plan_code, plan) === 'Đang sử dụng' && plan.type_package === 'analysis'"
                :class="['user_plan', buttonClass1]"
                style="height: 40px"
            >
              Đang sử dụng
            </a-button>

            <a-button
                v-if="getIsShowActiveButton(userInfo.current_plan?.plan_code, plan) === 'Liên hệ tư vấn' && plan.type_package === 'analysis'"
                :class="['contact_plan', buttonClass1]"
                style="height: 40px"
                @click="userInfo.id ? handleClickContactUs() : currentUserStore.setShowPopupLogin(true)"
            >
              Liên hệ tư vấn
            </a-button>
            <a-button
                v-if="plan.type_package === 'pdf_report'"
                @click="handleClickFindReport"
                :class="buttonClass2"
                @mouseenter="hover2 = true"
                @mouseleave="hover2 = false"
            >
              Tìm báo cáo ngay
            </a-button>
            <a-button
                v-if="plan.type_package === 'custom_pdf_report'"
                @click="handleClickContactUs"
                :class="buttonClass3"
                @mouseenter="hover3 = true"
                @mouseleave="hover3 = false"
            >
              Liên hệ tư vấn
            </a-button>
          </div>
        </div>

        <div v-if="plan.discountPercent" class="discount_percent">
          <div class="text">
            {{ plan.discountPercent }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("./index.scss");

.subHeader{
  font-size: 16px;
  color: #D7D1F9;
  line-height: 24px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.incentive_box{
  width: 250px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.10);
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 0 11px;
}

.incentive_text{
  font-weight: 400;
  font-size: 14px;
}

.incentive-background {
  background: var(--gradient-1, linear-gradient(0deg, #FF6931 0.43%, #FF9839 99.57%));
  color: #FFFFFF;
}

.default-class {
  height: 40px;
  border: 1px solid #241E46;
  color: #241E46;
  width: 100%;
  border-radius: 8px;
}

.hover-class {
  height: 40px;
  border: 1px solid #FF6931;
  color: #FF6931;
  width: 100%;
  border-radius: 8px;
}

.feature-details-button:hover {
  border-color: #FF6931;
  color: #FF6931;
}
</style>