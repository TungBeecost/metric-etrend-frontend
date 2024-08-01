<script setup lang="ts">
import {formatCurrency} from "~/helpers/FormatHelper";
import { toRefs, computed, watch } from 'vue';

const props = defineProps({
  plan: {
    type: Object,
    required: true
  },
  discountInfo: {
    type: Object,
    default: () => ({})
  }
});

const { plan, discountInfo } = toRefs(props);
const emit = defineEmits(['finalPrice']);

const calculateDiscountAmount = (planPrice: number, discount: any) => {
  if (!discount || !discount.discount) return 0;

  const { discount_type, discount_value, maximum_discount } = discount.discount;
  let discountAmount = 0;

  if (discount_type === 'percentage') {
    discountAmount = (planPrice * discount_value) / 100;
  } else if (discount_type === 'amount') {
    discountAmount = discount_value;
  }

  if (maximum_discount && discountAmount > maximum_discount) {
    discountAmount = maximum_discount;
  }

  return discountAmount;
};

const discountAmount = computed(() => calculateDiscountAmount(plan.value.price, discountInfo.value));
const finalPrice = computed(() => plan.value.price - discountAmount.value);

watch(finalPrice, (newValue) => {
  emit('finalPrice', newValue);
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
      <div v-if="discountAmount" class="promotional_program">-{{ formatCurrency(discountAmount) }}</div>
    </div>
    <div class="calculate_item">
      <div class="total">Thành tiền</div>
      <div class="total_price">{{formatCurrency(finalPrice)}}</div>
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