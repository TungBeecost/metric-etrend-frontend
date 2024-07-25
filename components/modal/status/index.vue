<template>
  <Modal :is-open="isOpen" :on-close="onClose" :class="classNameModal">
    <template #content>
      <div class="contentModal submit-form-marketing-success">
        <CustomIcon :type="type === 'success' ? 'SuccessTick' : 'SuccessTick'" :is-custom-size="true" class="statusIcon" />
        <div class="content">
          <p class="header">{{ header }}</p>
          <p class="description"> {{ description }}</p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="footerModal">
        <AButton size="large" type="primary" @click="handleCloseAndRedirect">Tôi đã hiểu</AButton>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import {NAVIGATIONS} from "~/constant/constains";

export type TypeModal = "success";

const props = defineProps<{
  isOpen: boolean,
  onClose: () => void,
  type: TypeModal,
  header?: string,
  description?: string,
  classNameModal?: string,
}>();

const handleCloseAndRedirect = () => {
  if (props.onClose) {
    props.onClose();
  }
  navigateTo(`${NAVIGATIONS.home}`);
};
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>