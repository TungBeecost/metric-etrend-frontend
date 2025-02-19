<template>
  <div id="discount_input" class="inputWrapper">
    <label v-if="label" for="" class="label">{{ label }} <span v-if="isRequired" class="requiredDot"> * </span> </label>
    <div class="discount_content" style="display: flex; gap: 8px; align-items: center; width: 100%;">
      <AInput v-bind="inputProps"
              v-model:value="inputModel"
              style="border: 1px solid #9D97BF; border-radius: 8px; width: 100%; height: 40px; display: flex; align-items: center"
              :status="errorMessage ? 'error' : ''">
        <template v-if="errorMessage" #suffix>
          <InfoCircleOutlined class="errorIcon" :class="statusApplyCode ? 'disable_icon' : ''" />
        </template>
      </AInput>
      <a-button style="height: 40px" type="primary" @click="validateDiscount">Áp dụng</a-button>
    </div>
    <p v-if="errorMessage" class="errorMessage" :class="statusApplyCode ? 'success-message' : 'error-message'">{{ errorMessage }}</p>
    <p v-else class="errorMessage"/>
  </div>
</template>


<script lang="ts" setup>
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import type { InputProps } from "ant-design-vue";
import {getCookie} from "~/helpers/CookieHelper";
import useDiscount from "~/composables/useDiscount";
const { getVoucher } = useDiscount();

const props = defineProps<{
  label?: string,
  inputProps?: InputProps,
  isRequired?: boolean,
  errorMessage?: string,
  statusApplyCode?: boolean,
  discountValueRouter?: string,
}>();

const { discountValueRouter } = props;

const emit = defineEmits(["applyDiscount"]);

const validateDiscount = () => {
  emit("applyDiscount", inputModel.value);
};

onMounted(async () => {
  const discountValue = getCookie('affiliate_code');
  if (discountValue) {
    const response = await getVoucher(discountValue);
    if (response && !response.error) {
      inputModel.value = discountValue;
      validateDiscount();
    }
  }
});

const inputModel = defineModel<string>("input");
</script>
<style scoped lang="scss">
.inputWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  width: 100%;

  .label {
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;

    .requiredDot {
      color: red;
    }
  }

  .errorIcon {
    color: red;
  }

  .errorMessage {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    min-height: 20px;
  }

  .error-message{
    color: red;
  }

  .success-message {
    color: green;
  }

  .disable_icon{
    display: none;
  }
}
</style>

<style lang="scss">
#discount_input{
  .discount_content{
    .ant-input-affix-wrapper{
      .ant-input{
        height: 30px;
      }
    }
  }
}

</style>
