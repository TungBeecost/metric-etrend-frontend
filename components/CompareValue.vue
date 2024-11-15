<script setup lang="ts">
const props = defineProps({
  value: {
    default: 0,
  },
  valueComparison: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div
    v-if="props.value && Math.abs((props.value * 100) | 0) !== 0"
    style="display: inline; width: max-content"
    :style="props.value > 0 ? 'color: rgba(0, 194, 89, 1);' : 'color: rgba(245, 0, 0, 1);'"
  >
    <template v-if="props.value > 0">
      <a-icon type="arrow-up" style="transform: translateY(-3px)"/>
    </template>
    <template v-else>
      <a-icon type="arrow-down" style="transform: translateY(-3px)"/>
    </template>
    <span
      :style="props.value > 0 ? 'color: rgba(0, 194, 89, 1);' : 'color: rgba(245, 0, 0, 1);'"
    >
      {{ Math.abs((props.value * 100) | 0) }}%
    </span>
  </div>
</template>

