<script setup lang="ts">
import { PLANS } from '../../constant/constains';

defineProps<{
  isDarkTitle?: boolean,
}>()
</script>

<template>
  <div class="wrapper">
    <p :class="{ header: true, dark: isDarkTitle }">Mở khoá và truy cập kho dữ liệu với hàng trăm báo cáo và xu hướng mới nhất</p>

    <div class="pricings">
      <div v-for="plan in PLANS" :class="{ planItem: true, highlight: plan.isHighlight }">
        <div class="focusHeader" />

        <div class="content">
          <div class="summary">
            <p class="planType">{{ plan.type }}</p>
            <p class="planDesc">{{ plan.description }}</p>
            <p class="planPrice">{{ plan.price }}<span v-if="plan.unit" class="priceUnit">/{{ plan.unit }}</span></p>
          </div>

          <div class="divider" />

          <div class="permission">
            <p class="includeLabel">Bao gồm:</p>
            <div class="permissionList">
              <div v-for="permission in plan.permissions" class="permissionItem">
                <div class="perm">
                  <CustomIcon :type="permission.icon as any" :is-custom-size="true" class="permissionIcon" />
                  <p>{{ permission.label }}</p>
                </div>
                <div v-for="subPerm in permission.sub" class="perm subPerm">
                  <CustomIcon type="Tick" :is-custom-size="true" class="permissionIcon" />
                  <p>{{ subPerm }}</p>
                </div>
              </div>
            </div>
          </div>

          <AButton type="primary">Mua gói {{ plan.type }}</AButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("./index.scss");
</style>