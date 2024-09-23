<script setup>
import {CloseOutlined} from "@ant-design/icons-vue";
import AppTitle from "~/components/ticket/AppTitle.vue";
import {ref, computed, onMounted} from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(["update:open", "close"]);

const isOpen = computed({
  get: () => props.open,
  set: (value) => {
    emit("update:open", value);
  }
});

const onClose = () => {
  emit("close");
};

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
});
</script>

<template>
  <a-drawer
      v-model:open="isOpen"
      class="metric-drawer"
      :closable="false"
      :width="isMobile ? '100%' : 650"
      @close="onClose"
  >
    <template #title>
      <div class="drawer-header">
        <app-title text="Bộ lọc"/>
        <close-outlined @click="onClose"/>
      </div>
    </template>
    <div class="drawer-content">
      <slot/>
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