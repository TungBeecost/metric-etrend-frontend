<script setup>
const {isBlurred, isHideContent} = defineProps({
  isBlurred: {
    type: Boolean,
    default: false
  },
  isHideContent: {
    type: Boolean,
    default: false
  }
});

</script>

<template>
  <span v-if="isBlurred || isHideContent" class="text-blurred">
    Nội dung ẩn
  </span>
  <span v-else>
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
.text-blurred {
  filter: blur(6px);
  //filter: blur(4px);
  user-select: none;
}
</style>
