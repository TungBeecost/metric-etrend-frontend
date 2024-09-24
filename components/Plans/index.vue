<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {NAVIGATIONS, PLANS} from '~/constant/constains';
import {formatSortTextCurrencyPlan} from "~/helpers/utils";

const currentUserStore = useCurrentUser();
const {userInfo}: any = storeToRefs(currentUserStore);

defineProps<{
  isDarkTitle?: boolean,
}>()

const navigateToPayment = (planCode: string) => {
  console.log('Navigate to payment:', planCode);
  navigateTo(`${NAVIGATIONS.payment}?plan_code=${planCode}`);
};

const isMobile = computed(() => windowWidth?.value < 768);

const windowWidth = ref(window.innerWidth);

onMounted(() => {
  windowWidth.value = window.innerWidth;
});

const getIsShowActiveButton = (user_plan_code: string, plan_code: string) => {
  if (plan_code === 'e_community' && (user_plan_code === 'e_community' || user_plan_code === 'e_trial')) {
    return '';
  }

  if (user_plan_code === plan_code) {
    return 'Đang sử dụng';
  }

  if (user_plan_code === 'e_community' || user_plan_code === 'e_trial' || user_plan_code === 'e_starter' ||
      !user_plan_code || user_plan_code === 'e_basic_lite' || user_plan_code === 'e_pro_lite') {
    return 'Mua ngay';
  }

  return '';
};

const lstDisplayPlans = computed(() => {
  return PLANS.filter((plan) => !plan.isHide);
});
</script>

<template>
  <div class="wrapper">
    <p :class="{ header: true, dark: isDarkTitle }">
      Truy cập kho dữ liệu với hàng trăm báo cáo
      <template v-if="!isMobile"><br/></template>
      và xu hướng mới nhất
    </p>

    <div class="pricings">
      <div v-for="plan in lstDisplayPlans" class="planItem">
        <div class="focusHeader"/>

        <div class="content">
          <div class="summary">
            <p class="planType">{{ plan.type }}</p>
            <p class="planDesc">{{ plan.description }}</p>
            <div class="planDiscountPrice">{{ formatSortTextCurrencyPlan(plan.priceDiscount) }}</div>
            <div class="planPrice">{{ formatSortTextCurrencyPlan(plan.price) }}<span v-if="plan.unit" class="priceUnit">/{{
                plan.unit
              }}</span>
            </div>
          </div>

          <div class="divider"/>

          <div class="permission">
            <p class="includeLabel">Bao gồm:</p>
            <div class="permissionList">
              <div v-for="permission in plan.permissions" class="permissionItem">
                <div class="perm">
                  <CustomIcon :type="permission.icon as any" :is-custom-size="true" class="permissionIcon"/>
                  <div>{{ permission.label }}</div>
                </div>
                <div v-for="subPerm in permission.sub" class="perm subPerm">
                  <CustomIcon type="Tick" :is-custom-size="true" class="permissionIcon"/>
                  <div>{{ subPerm }}</div>
                </div>
              </div>
            </div>
          </div>
          <AButton
              v-if="getIsShowActiveButton(userInfo.current_plan?.plan_code, plan.plan_code)"
              :class="getIsShowActiveButton(userInfo.current_plan?.plan_code, plan.plan_code) === 'Đang sử dụng' ? 'user_plan' : 'not_user_plan'"
              :disabled="getIsShowActiveButton(userInfo.current_plan?.plan_code, plan.plan_code) !== 'Mua ngay'"
              style="height: 40px"
              @click="userInfo.id ? (userInfo.current_plan?.plan_code !== plan.plan_code ? navigateToPayment(plan.plan_code) : null) : currentUserStore.setShowPopupLogin(true)"
          >
            {{ getIsShowActiveButton(userInfo.current_plan?.plan_code, plan.plan_code) }}
          </AButton>
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
</style>