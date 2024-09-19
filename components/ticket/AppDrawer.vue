<script setup>
import {CloseOutlined} from "@ant-design/icons-vue";
const props = defineProps({
  open: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:open', 'close'])

const isOpen = computed({
  get: () => props.open,
  set: (value) => {
    emit('update:open', value)
  }
})

const onClose = () => {
  emit('close')
}
</script>

<template>
  <a-drawer class="metric-drawer" v-model:open="isOpen" :closable="false" :width="650" @close="onClose">
    <template #title>
      <div class="drawer-header">
        <app-title text="Action"/>
        <close-outlined @click="onClose" />
      </div>
    </template>
    <div class="drawer-content">
      <slot />
    </div>
  </a-drawer>
</template>

<style lang="scss" scoped>
.metric-drawer {
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
