<template>
  <div class="inputWrapper">
    <label v-if="label" for="" class="label">{{ label }} <span v-if="isRequired" class="requiredDot"> * </span> </label>
    <div style="display: flex; gap: 8px">
      <AInput v-bind="inputProps"
              v-model:value="inputModel"
              style="border: 1px solid #9D97BF; border-radius: 8px;"
              :status="errorMessage ? 'error' : ''">
        <template v-if="errorMessage" #suffix>
          <InfoCircleOutlined class="errorIcon" />
        </template>
      </AInput>
      <a-button type="primary" @click="validateDiscount">Áp dụng</a-button>
    </div>
    <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import type { InputProps } from "ant-design-vue"

defineProps<{
  label?: string,
  inputProps?: InputProps,
  isRequired?: boolean,
  errorMessage?: string,
}>()

const emit = defineEmits(["applyDiscount"]);

const validateDiscount = () => {
  emit("applyDiscount", inputModel.value);
};

const inputModel = defineModel<string>("input");
</script>
<style scoped lang="scss">
.inputWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;

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
    color: red;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }
}

</style>