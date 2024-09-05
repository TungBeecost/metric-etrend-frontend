<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'default'
  }
})

const stateClass = computed(() => {
  const typeMap = {
    success: 'success',
    warning: 'warning',
    danger: 'danger'
  }
  return typeMap[props.type] || 'default'
})
</script>

<template>
  <span :class="['metric-tag', stateClass]">
    <slot/>
  </span>
</template>

<style scoped lang="scss">
.metric-tag {
  display: inline-block;
  border-radius: 0.25rem;
  color: #1890FF;
  padding: 0.125rem 0.5rem;
  background-color: #E8F4FF;
  text-align: center;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  &.success {
    color: #35A855;
    background-color: #EAF8EE;
  }

  &.warning {
    color: #FA8C16;
    background-color: #FFF4E8;
  }

  &.danger {
    color: #EE3324;
    background-color: #FDEBE9;
  }
}
</style>
