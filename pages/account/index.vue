<script setup lang="ts">
import AccountInfomation from "~/components/account/AccountInfomation.vue";
import DetailedReportsViewed from "~/components/account/DetailedReportsViewed.vue";


</script>

<template>
  <div class="account_container">
    <account-infomation class="info" />
    <detailed-reports-viewed class="detail-report" />
  </div>

</template>

<style scoped lang="scss">
.info{
  background-color: #FBFAFC;
  padding-top: 40px;
}
.detail-report{
  background-color: #FBFAFC;
  padding-top: 24px;
  padding-bottom: 40px;
}
</style>