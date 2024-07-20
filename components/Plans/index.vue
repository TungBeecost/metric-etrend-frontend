<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { NAVIGATIONS, PLANS } from '~/constant/constains';
import {formatSortTextCurrencyPlan} from "~/helpers/utils";

const currentUserStore = useCurrentUser();
const { userInfo } = storeToRefs(currentUserStore);

defineProps<{
  isDarkTitle?: boolean,
}>()

const navigateToPayment = (planCode: string) => {
  navigateTo(`${NAVIGATIONS.payment}?plan_code=${planCode}`);
};

const windowWidth = ref(window?.innerWidth);

const isMobile = computed(() => windowWidth?.value < 768);

const onResize = () => {
  windowWidth.value = window?.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

// const activatePlan = async (planCode: string) => {
//   try {
//     if (planCode === 'e_community') {
//       const response = await axios.get('http://127.0.0.1:8080/api/plan/enable_package_community', {
//         headers: {
//           'accept': 'application/json',
//         },
//       });
//       console.log('Activation response:', response.data);
//     } else {
//       // Handle other plan codes as needed
//     }
//     await currentUserStore.fetchCurrentUser();
//   } catch (error) {
//     console.error('Error activating plan:', error);
//   }

</script>

<template>
  <div class="wrapper">
    <p :class="{ header: true, dark: isDarkTitle }">
      Truy cập kho dữ liệu với hàng trăm báo cáo
      <template v-if="!isMobile"> <br/> </template>
      và xu hướng mới nhất
    </p>

    <div class="pricings">
      <div v-for="plan in PLANS" class="planItem">
        <div class="focusHeader"/>

        <div class="content">
          <div class="summary">
            <p class="planType">{{ plan.type }}</p>
            <p class="planDesc">{{ plan.description }}</p>
            <div class="planPrice">{{ formatSortTextCurrencyPlan(plan.price) }}<span v-if="plan.unit" class="priceUnit">/{{ plan.unit }}</span>
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
                </div>`
              </div>
            </div>
          </div>
          <div v-if="userInfo.current_plan">
            <AButton
                v-if="!(plan.plan_code === 'free' && userInfo.current_plan?.plan_code !== 'free') && !(userInfo.current_plan?.plan_code === 'e_pro' && (plan.plan_code === 'free' || plan.plan_code === 'e_basic')) && !(userInfo.current_plan?.plan_code === 'e_basic' && plan.plan_code === 'free')"
                :class="(userInfo.current_plan?.plan_code === plan.plan_code) || (plan.plan_code === 'free') ? 'user_plan' : 'not_user_plan'"
                :disabled="userInfo.current_plan?.plan_code === plan.plan_code"
                style="height: 40px"
                @click="userInfo.id ? (userInfo.current_plan?.plan_code !== plan.plan_code ? navigateToPayment(plan.plan_code) : null) : currentUserStore.setShowPopupLogin(true)"
            >
              {{ userInfo.current_plan?.plan_code === plan.plan_code ? 'Đang sử dụng' : 'Mua ngay' }}
            </AButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("./index.scss");
</style>