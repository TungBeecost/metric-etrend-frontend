<template>
  <div class="inputWrapper" id="inputCustom">
    <label v-if="label" for="" class="label">{{ label }} <span v-if="isRequired" class="requiredDot"> * </span> </label>
    <AInput v-bind="inputProps"
            v-model:value="inputModel"
            style="border: 1px solid #9D97BF; border-radius: 8px;"
            :status="errorMessage ? 'error' : ''">
      <template v-if="errorMessage" #suffix>
        <InfoCircleOutlined class="errorIcon" />
      </template>
    </AInput>
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

const inputModel = defineModel<string>("input");
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>

<style lang="scss">
#inputCustom{
  .ant-input{
    height: 40px;
  }
}
</style>