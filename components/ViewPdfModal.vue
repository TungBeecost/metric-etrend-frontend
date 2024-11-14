<script setup>
import { onMounted, ref, computed } from 'vue';
import { NAVIGATIONS } from "~/constant/constains";
import { useCurrentUser } from "~/stores/current-user.js";
import { useRoute } from "vue-router";

const isDesktop = ref(true);
const route = useRoute();
const { showAlert } = defineProps({
  showAlert: {
    type: Boolean,
    default: false
  },
  isReportPdfValid: {
    type: Boolean,
    default: false
  }
});
onMounted(() => {
  isDesktop.value = window?.innerWidth >= 768;
});

const emits = defineEmits(["update:showAlert"]);

const currentUser = useCurrentUser();
const { userInfo } = storeToRefs(currentUser);
const loading = ref(false);
const openModalSuccess = ref(false);

message.config({
  top: '100px',
  duration: 2,
  maxCount: 3,
});

const handleView = async () => {
  try {
    loading.value = true;
    await currentUser.viewPdfReport(route.params.slug);
    loading.value = false;
    emits('update:showAlert', false);
    openModalSuccess.value = true;
    // message.success('Link báo cáo sẽ được gửi qua email trong 5 phút');
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};

const closeModalSuccess = () => {
  openModalSuccess.value = false;
};

const toggleUnlock = () => {
  emits('update:showAlert', false);
};

const isViewReportDisabled = computed(() => userInfo.value.current_plan.remain_claim_pdf === 0);

</script>

<template>
  <a-modal
      :open="showAlert"
      :footer="null"
      @cancel="toggleUnlock"
      @ok="toggleUnlock"
  >
    <div class="unlock-report-modal">
      <div v-if="currentUser.remainingUnlockPdf">
        <div style="text-align: center;">
          <NuxtImg src="/icons/DeptReportAlert.svg" class="unlock-icon"/>
        </div>
        <div class="content">
          <div class="view_count">
            Số lượt xem hiện tại: <b>{{ userInfo.current_plan.remain_claim_pdf }}</b>
          </div>
          <div class="header">Xác nhận xem báo cáo</div>
          <div class="description">
            Bạn có chắc chắn muốn sử dụng xem Báo cáo chi tiết <b>trong vòng 7 ngày </b> không?
          </div>
        </div>
      </div>
      <div class="unlock-report-modal-footer">
        <AButton style="width: 100%;" size="large" class="optionBtn" @click="toggleUnlock">Huỷ</AButton>
        <AButton
            v-if="currentUser.remainingUnlockPdf"
            :disabled="isViewReportDisabled"
            style="width: 100%;"
            size="large"
            type="primary"
            class="optionBtn"
            @click="handleView"
        >
          Xem báo cáo
        </AButton>
        <AButton v-else style="width: 100%;" size="large" type="primary" class="optionBtn"
                 @click="navigateTo(NAVIGATIONS.pricing)">
          Mua ngay
        </AButton>
      </div>
    </div>
  </a-modal>
  <a-modal v-model:open="openModalSuccess" :title=null :footer="null">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 24px;">
      <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="52" cy="52" r="52" fill="#EAF8EE"/>
        <circle cx="52" cy="52" r="35" fill="#CDEDD6"/>
        <g clip-path="url(#clip0_6602_44698)">
          <rect x="34" y="34" width="36" height="36" rx="18" fill="white"/>
          <path d="M52 34C48.4399 34 44.9598 35.0557 41.9997 37.0335C39.0397 39.0114 36.7326 41.8226 35.3702 45.1117C34.0078 48.4008 33.6513 52.02 34.3459 55.5116C35.0404 59.0033 36.7547 62.2106 39.2721 64.7279C41.7894 67.2453 44.9967 68.9596 48.4884 69.6541C51.98 70.3487 55.5992 69.9922 58.8883 68.6298C62.1774 67.2674 64.9886 64.9603 66.9665 62.0003C68.9443 59.0402 70 55.5601 70 52C69.995 47.2276 68.0969 42.6522 64.7224 39.2776C61.3478 35.9031 56.7724 34.005 52 34ZM59.9027 48.8258L50.2104 58.5181C50.0818 58.6468 49.9291 58.7489 49.761 58.8186C49.5929 58.8883 49.4127 58.9242 49.2308 58.9242C49.0488 58.9242 48.8686 58.8883 48.7005 58.8186C48.5325 58.7489 48.3798 58.6468 48.2512 58.5181L44.0973 54.3642C43.8375 54.1044 43.6915 53.752 43.6915 53.3846C43.6915 53.0172 43.8375 52.6648 44.0973 52.405C44.3571 52.1452 44.7095 51.9992 45.0769 51.9992C45.4444 51.9992 45.7967 52.1452 46.0565 52.405L49.2308 55.581L57.9435 46.8665C58.0721 46.7379 58.2248 46.6358 58.3929 46.5662C58.561 46.4966 58.7411 46.4608 58.9231 46.4608C59.105 46.4608 59.2852 46.4966 59.4532 46.5662C59.6213 46.6358 59.774 46.7379 59.9027 46.8665C60.0313 46.9952 60.1334 47.1479 60.203 47.316C60.2726 47.4841 60.3085 47.6642 60.3085 47.8462C60.3085 48.0281 60.2726 48.2082 60.203 48.3763C60.1334 48.5444 60.0313 48.6971 59.9027 48.8258Z" fill="#35A855"/>
        </g>
        <defs>
          <clipPath id="clip0_6602_44698">
            <rect x="34" y="34" width="36" height="36" rx="18" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <div style="font-size: 24px; font-weight: 700; line-height: 38px;">
        Xác nhận thành công
      </div>
      <div style="text-align: center; font-size: 16px; font-weight: 400; line-height: 24px;">
        Hệ thống đang xử lý và báo cáo sẽ được gửi qua email của bạn trong vòng 5 phút.
      </div>
      <a-button type="primary" style="height: 40px" @click="closeModalSuccess">
        Tôi đã hiểu
      </a-button>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">

.unlock-report-modal {
  font-family: Inter, Montserrat, sans-serif;

  .unlock-icon {
    width: 212px;

    margin: 0 auto 32px;
  }

  .content {
    text-align: center;

    margin-bottom: 24px;

    display: flex;
    flex-direction: column;

    gap: 12px;

    .remaining-unlock {
      color: #241E46;
      text-align: center;

      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }

    .header {
      color: var(--Dark-blue-dark-blue-8, #241E46);
      text-align: center;

      font-size: 24px;
      font-weight: 700;
      line-height: 38px;
    }

    .description {
      color: #716B95;
      text-align: center;

      font-size: 16px;
      font-weight: 400;
      line-height: 24px;

      .highlight {
        color: #E85912;

        font-weight: 500;
      }

      .report-name {
        color: var(--Dark-blue-dark-blue-8, #241E46);

        font-weight: 500;
      }
    }
  }

  .unlock-report-modal-footer {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}

@media (min-width: 768px) {
  .chart-mask {
    padding: 5% 10%;

    .chart-mask-content {
      .title {
        font-size: 24px;
        line-height: 28px;
      }
    }
  }
}
</style>
