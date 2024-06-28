<template>
  <div v-if="isOpen" class="modalWrapper">
    <div class="modal">
      <div class="header">
        <div>
          <slot name="header" />
        </div>
        <CloseOutlined class="closeBtn" @click="onClose" />
      </div>

      <slot name="content" />
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloseOutlined } from "@ant-design/icons-vue";

defineProps<{
  isOpen: boolean,
  onClose: () => void,
}>()

</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
