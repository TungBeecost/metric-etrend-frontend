<script setup lang="ts">
import { formatCurrency } from "~/helpers/FormatHelper";
import { toRefs, computed, watch, onMounted, ref, nextTick } from 'vue';

const props = defineProps({
  plan: {
    type: Object,
    required: true
  },
  statusApplyCode: {
    type: Boolean,
    default: false
  },
  discountInfo: {
    type: Object,
    default: () => ({})
  }
});

const { plan, discountInfo, statusApplyCode } = toRefs(props);
const emit = defineEmits(['finalPrice']);

const calculateDiscountAmount = (planPrice: number, discount: any) => {
  if (!discount || !discount.discount) {
    console.log('No discount info available.');
    return 0;
  }

  const { discount_type, discount_value, maximum_discount } = discount.discount;
  console.log('Discount Details:', { discount_type, discount_value, maximum_discount });

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

const discountAmount = ref(0);
const promotionalDiscount = ref(plan.value.priceDiscount - plan.value.price);

const updateValues = async () => {
  await nextTick();
  if (statusApplyCode.value) {
    discountAmount.value = calculateDiscountAmount(plan.value.price, discountInfo.value);
  } else {
    discountAmount.value = 0;
  }
};

const finalPrice = computed(() => plan.value.priceDiscount - (promotionalDiscount.value + discountAmount.value));

watch([discountInfo, statusApplyCode], updateValues);

watch(finalPrice, (newValue) => {
  emit('finalPrice', newValue);
});

onMounted(() => {
  updateValues();
});
</script>

<template>
  <div class="calculate">
    <div class="calculate_item">
      <div class="money">Số tiền</div>
      <div class="money">{{ formatCurrency(plan.priceDiscount) }}</div>
    </div>
    <div class="calculate_item">
      <div class="money">Chiết khấu</div>
      <div class="money">-{{ formatCurrency(promotionalDiscount + discountAmount) }}</div>
    </div>
    <div class="calculate_item">
      <div class="promotional_program">Chương trình khuyến mại</div>
      <div class="promotional_program">-{{ formatCurrency(promotionalDiscount) }}</div>
    </div>
    <div class="calculate_item">
      <div class="promotional_program">Áp dụng mã giảm giá</div>
      <div v-if="statusApplyCode" class="promotional_program">
        -{{ formatCurrency(discountAmount) }}
        <span v-if="discountInfo.discount.discount_type === 'percentage'" class="promotional_program">({{discountInfo.discount.discount_value}}%)</span>
      </div>
      <div v-else class="promotional_program">0đ</div>
    </div>
    <div class="calculate_item">
      <div class="total">Thành tiền</div>
      <div class="total_price">{{ formatCurrency(finalPrice) }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.calculate {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  width: 100%;

  .calculate_item {
    display: flex;
    justify-content: space-between;
    line-height: 22px;
  }

  .money {
    font-weight: bold;
    font-size: 16px;
  }

  .promotional_program {
    font-size: 12px;
    line-height: 22px;
  }

  .total {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #241E46;
  }

  .total_price {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #FF4D4F;
  }
}
</style>
