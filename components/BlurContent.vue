<script setup>
import { useReportAccess } from '~/composables/useReportAccess';
import { computed, onMounted } from 'vue';

const { isHideContent: globalHideContent } = useReportAccess();
const props = defineProps({
  isBlurred: {
    type: Boolean,
    default: false
  },
  isHideContent: {
    type: Boolean,
    default: undefined
  },
  useGlobalHide: {
    type: Boolean,
    default: true
  }
});

// Add debug logs
// onMounted(() => {
//   console.log('BlurContent mounted with props:', {
//     isBlurred: props.isBlurred,
//     isHideContent: props.isHideContent,
//     useGlobalHide: props.useGlobalHide,
//     globalHideContent: globalHideContent.value
//   });
// });

const shouldHide = computed(() => {
  const hide = typeof props.isHideContent !== 'undefined'
    ? props.isHideContent
    : (props.useGlobalHide ? globalHideContent.value : false);

  // console.log('shouldHide calculated:', {
  //   isHideContent: props.isHideContent,
  //   useGlobalHide: props.useGlobalHide,
  //   globalHideContent: globalHideContent.value,
  //   result: hide
  // });

  return hide;
});
</script>

<template>
  <span v-if="isBlurred || shouldHide" class="text-blurred">
    <slot name="blurred">
      Nội dung ẩn
    </slot>
  </span>
  <span v-else>
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
.text-blurred {
  filter: blur(6px);
  user-select: none;
  display: inline-block;

  /* Make it obvious when blur is applied */
  background-color: rgba(255, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 3px;
}
</style>