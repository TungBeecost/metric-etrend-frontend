<script setup lang="ts">

import CheckOut from "~/components/payment-service/CheckOut.vue";
import OptionPayment from "~/components/payment-service/OptionPayment.vue";
import PackService from "~/components/payment-service/PackService.vue";
</script>

<template>
  <div class="payment_service">
    <div class="default_section" style=" display: flex; padding: 40px 0; gap: 24px;">
      <div class="payment_service_option">
        <pack-service />
        <option-payment />
      </div>
      <div class="check-out">
        <check-out />
      </div>
    </div>
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
</style>