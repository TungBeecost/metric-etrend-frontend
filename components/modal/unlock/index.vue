<template>
  <Modal :is-open="isOpen" :on-close="onClose" :class="classNameModal" modal-class="wrapperSpec">
    <template #content>
      <div v-if="currentUser.remainingUnlock" class="contentModal">
        <NuxtImg v-if="currentUser.remainingUnlock" src="/images/Unlock-Document.png" class="statusIcon" />

        <div class="content">
          <p class="header">Xác nhận xem báo cáo</p>
          <p class="description">Bạn có chắc chắn muốn sử dụng <span class="highlight">01 lượt xem</span> trong vòng 24 giờ cho <span class="textBold">{{ reportTitle }}</span> không?
          </p>
        </div>
      </div>

      <div v-else class="contentModal">
        <CustomIcon v-if="!currentUser.remainingUnlock" type="UnlockDocumentFailure" :is-custom-size="true" class="statusIcon" />

        <div class="content">
          <p class="header">Hết lượt xem báo cáo</p>
          <p class="description">Mua thêm gói dịch vụ để tiếp tục xem báo cáo chi tiết</p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="footerModal">
        <AButton size="large" class="optionBtn" @click="onClose">Huỷ</AButton>

        <AButton v-if="currentUser.remainingUnlock" size="large" type="primary" class="optionBtn">Xem báo cáo</AButton>
        <AButton v-else size="large" type="primary" class="optionBtn" @click="navigateTo(NAVIGATIONS.pricing)">Mua ngay</AButton>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useCurrentUser } from "~/stores/current-user"
import { NAVIGATIONS } from "../../../constant/constains";

export type TypeModal = "success"

defineProps<{
  isOpen: boolean,
  onClose: () => void,
  reportTitle: string,
  classNameModal?: string,
}>()

const currentUser = useCurrentUser();
</script>

<style lang="scss">
@import url("./index.scss");
</style>