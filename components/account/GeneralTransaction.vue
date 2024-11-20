<script setup lang="ts">
import {formatCurrency, formatNumber} from "../../helpers/FormatHelper";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <a-skeleton v-if="loading" class="default_section" :paragraph="{ rows: 2 }"/>
  <div v-else class="general_transaction">
    <div class="item bdr">
      <div class="label">Số giao dịch</div>
      <div class="value">{{props.data.number_of_transactions}}</div>
    </div>
    <div class="item bdr">
      <div class="label">Tổng giá trị giao dịch</div>
      <div class="value">{{formatCurrency(props.data.total_transaction_value)}}</div>
    </div>
    <div class="item">
      <div class="label">Tổng hoa hồng</div>
      <div class="value">{{formatCurrency(props.data.total_commission_amount)}}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.general_transaction{
  display: flex;
  border: 1px solid var(--Dark-blue-dark-blue-2, #EEEBFF);
  border-radius: 16px;
  background-color: var(--Dark-blue-dark-blue-1, #FFF);
  .item{
    display: flex;
    padding: 24px 20px 24px 18.5px;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 0;

    .label{
      color: var(--Dark-blue-dark-blue-5, #716B95);
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }

    .value{
      color: var(--Dark-blue-dark-blue-8, #241E46);
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
    }
  }
  .bdr{
    border-right: 1px solid var(--Dark-blue-dark-blue-2, #EEEBFF);
  }
}
</style>