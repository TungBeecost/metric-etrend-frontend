<template>
  <div class="selectWrapper">
    <label v-if="label" for="" class="label">{{ label }} <span v-if="isRequired" class="requiredDot"> * </span> </label>
    <ASelect v-model:value="selectModel" :status="errorMessage ? 'error' : ''" v-bind="selectProps" style="border: 1px solid #9D97BF; border-radius: 8px;" class="select" />
    <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { SelectProps } from "ant-design-vue"

defineProps<{
  label?: string,
  selectProps?: SelectProps,
  isRequired?: boolean,
  errorMessage?: string
}>()

const selectModel = defineModel<string>("select");

</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>

<style lang="scss">
.selectWrapper{
  .ant-select{
    .ant-select-selector{
      display: flex;
      align-items: center;
      height: 40px;
    }
  }
}

</style>