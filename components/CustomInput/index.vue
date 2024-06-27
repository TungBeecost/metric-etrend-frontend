<template>
  <div class="inputWrapper">
    <label v-if="label" for="" class="label">{{ label }} <span v-if="isRequired" class="requiredDot"> * </span> </label>
    <AInput v-bind="inputProps">
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
  errorMessage?: string
}>()
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>