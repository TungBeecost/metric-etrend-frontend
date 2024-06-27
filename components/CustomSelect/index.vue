<template>
  <div class="selectWrapper">
    <label v-if="label" for="" class="label">{{ label }} <span v-if="isRequired" class="requiredDot"> * </span> </label>
    <ASelect v-bind="selectProps" class="select" />
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


</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>