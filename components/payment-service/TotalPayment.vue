<script setup lang="ts">
import {formatCurrency} from "../../helpers/FormatHelper";

const {plan} = defineProps({
  plan: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="calculate">
    <div class="calculate_item">
      <div class="money">Số tiền</div>
      <div class="money">{{formatCurrency(plan.priceDiscount)}}</div>
    </div>
    <div class="calculate_item">
      <div class="money">Chiết khấu</div>
      <div class="money">-{{formatCurrency(plan.priceDiscount - plan.price)}}</div>
    </div>
    <div class="calculate_item">
      <div class="promotional_program">Chương trình khuyến mại</div>
      <div class="promotional_program">-{{formatCurrency(plan.priceDiscount - plan.price)}}</div>
    </div>
    <div class="calculate_item">
      <div class="promotional_program">Áp dụng mã giảm giá</div>
      <div class="promotional_program">0₫</div>
    </div>
    <div class="calculate_item">
      <div class="total">Thành tiền</div>
      <div class="total_price">{{formatCurrency(plan.price)}}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calculate{
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  width: 100%;

  .calculate_item{
    display: flex;
    justify-content: space-between;
    line-height: 22px;
  }

  .money{
    font-weight: bold;
    font-size: 16px;
  }

  .promotional_program{
    font-size: 12px;
    line-height: 22px;

  }

  .total{
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #241E46;
  }

  .total_price{
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #FF4D4F;
  }
}
</style>