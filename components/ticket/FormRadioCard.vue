<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    default: undefined
  },
  description: {
    type: String,
    default: ''
  },
  currentSelected: {
    type: [String, Number],
    default: undefined
  }
})
</script>

<template>
  <a-card style="width: 100%" class="metric-radio-card" :class="{'metric-radio-card-selected': props.currentSelected === props.value}">
    <template #title>
      <a-radio :value="props.value">{{ props.label }}</a-radio>
    </template>
    <p v-html="props.description"></p>
  </a-card>
</template>

<style scoped lang="scss">

</style>

<style lang="scss">
.metric-radio-card {
  border: 1px solid #9D97BF;
  .ant-card-head {
    border-bottom: 1px solid #EEEBFF;
    .ant-radio-wrapper {
      margin: 0;
    }
  }
  &.metric-radio-card-selected {
    border-color: #E85912;
  }
}
</style>
