<script setup lang="ts">
import {useCurrentUser} from "~/stores/current-user"
import {onMounted, ref} from "vue";
import ModalDownloadPdf from "~/components/ModalDownloadPdf.vue";
import {useRoute} from "#vue-router";

const currentUserStore = useCurrentUser();
const open = ref(false);
const showUnlock = ref(false);
const route = useRoute();
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  checkLevelCategory: {
    type: Boolean,
    default: false,
  },
});

const openModal = () => {
  open.value = true;
};

onMounted(() => {
  if (route.query.download === "1") {
    open.value = true;
  }
});

</script>

<template>
  <div class="unlock-report">
    <div class="unlock-report-title">
      Truy cập kho dữ liệu với hàng trăm báo cáo mới nhất
    </div>
    <div class="advantages">
      <div class="advantage-item">
        <div class="icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g id="Icon/Outline" clip-path="url(#clip0_2078_225208)">
              <path id="Vector" d="M2.5 9L6 12.5L14 4.5" stroke="#2EB553" stroke-width="1.3"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2078_225208">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        Số liệu chính xác, khách quan, cập nhật bằng công nghệ Big Data
      </div>
      <div class="advantage-item">
        <div class="icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g id="Icon/Outline" clip-path="url(#clip0_2078_225208)">
              <path id="Vector" d="M2.5 9L6 12.5L14 4.5" stroke="#2EB553" stroke-width="1.3"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2078_225208">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        Thông tin trực quan, dễ theo dõi
      </div>
      <div class="advantage-item">
        <div class="icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g id="Icon/Outline" clip-path="url(#clip0_2078_225208)">
              <path id="Vector" d="M2.5 9L6 12.5L14 4.5" stroke="#2EB553" stroke-width="1.3"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2078_225208">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        Dễ dàng lưu trữ
      </div>
    </div>
    <div class="action-btns">
      <div class="button" style="display: flex; gap: 12px; width: 100%">
        <NuxtLink to="/pricing" style="width: 100%;">
          <a-button style="width: 100%;" type="primary" size="large">Xem báo cáo</a-button>
        </NuxtLink>
        <a-button v-if="!checkLevelCategory" style="width: 100%;" size="large" @click="openModal">Báo cáo chuyên sâu</a-button>
      </div>
      <div v-if="!currentUserStore.authenticated">
        Đã có tài khoản?
        <a @click="currentUserStore.setShowPopupLogin(true)">
          Đăng nhập ngay
        </a>
      </div>
    </div>
  </div>
  <modal-download-pdf v-model:open="open" slug="" :data="data"/>

  <ModalUnlock v-model:showUnlock="showUnlock"/>
</template>

<style scoped lang="scss">
.unlock-report {
  display: flex;
  padding: var(----spacing-3xl, 24px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(----spacing-3xl, 24px);
  align-self: stretch;

  border-radius: 16px;
  background: var(--Neutral-neutral-1, #FFF);

  box-shadow: 0px 4px 24px 0px rgba(157, 151, 191, 0.35);

  .unlock-report-title {
    color: var(--Dark-blue-dark-blue-8, #241E46);

    font-family: Inter, sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
  }

  .advantages {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(----spacing-lg, 12px);

    .advantage-item {
      display: flex;
      padding: var(----spacing-xxs, 2px) 0px 8px 0px;
      align-items: flex-start;
      gap: 8px;
    }
  }

  .action-btns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(----spacing-lg, 12px);
    align-self: stretch;


    font-family: Inter, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;

    a {
      color: var(--Volcano-volcano-6, #E85912);
    }
  }
}

@media (max-width: 768px) {
  .unlock-report {
    .unlock-report-title {
      font-size: 20px;
    }
  }
}
</style>
