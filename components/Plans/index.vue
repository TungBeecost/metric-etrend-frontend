<script setup lang="ts">
import {NAVIGATIONS, PLANS} from '~/constant/constains';

const {userInfo} = useCurrentUser();

defineProps<{
  isDarkTitle?: boolean,
}>()
</script>

<template>
  <div class="wrapper">
    <p :class="{ header: true, dark: isDarkTitle }">Truy cập kho dữ liệu với hàng trăm báo cáo <br/>và xu hướng mới nhất
    </p>

    <div class="pricings">
      <div v-for="plan in PLANS" :class="{ planItem: true, highlight: plan.isHighlight }">
        <div class="focusHeader"/>

        <div class="content">
          <div class="summary">
            <p class="planType">{{ plan.type }}</p>
            <p class="planDesc">{{ plan.description }}</p>
            <div class="planPrice">{{ plan.price }}<span v-if="plan.unit" class="priceUnit">/{{ plan.unit }}</span></div>
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

          <!-- <AButton type="primary">Mua gói {{ plan.type }}</AButton> -->
          <div v-if="userInfo.current_plan">
            <AButton v-if="plan.plan_code === 'free'" class="user_plan" @click="navigateTo(NAVIGATIONS.contactUs)"> Đang
              sử dụng
            </AButton>
            <AButton v-else :class="userInfo.current_plan.plan_code === plan.plan_code ? 'user_plan' : 'not_user_plan'"
                     @click="navigateTo(NAVIGATIONS.contactUs)">
              {{ userInfo.current_plan.plan_code === plan.plan_code ? 'Đang sử dụng' : 'Liên hệ để mua gói Pro' }}
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