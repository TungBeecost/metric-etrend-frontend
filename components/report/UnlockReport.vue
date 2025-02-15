<script setup lang="ts">
import {useCurrentUser} from "~/stores/current-user"
import {onMounted, ref} from "vue";
import ModalDownloadPdf from "~/components/ModalDownloadPdf.vue";
import {useRoute} from "#vue-router";
import {NAVIGATIONS} from "~/constant/constains";

const currentUserStore = useCurrentUser();
const open = ref(false);
const showUnlock = ref(false);
const openModal = ref(false);
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

onMounted(() => {
  if (route.query.download === "1") {
    open.value = true;
  }
});
const currentUser = useCurrentUser();

const toggleUnlock = () => {
  openModal.value = !openModal.value;
};
const loading = ref(false);

const unlockReport = async () => {
  try {
    loading.value = true;
    await currentUser.unlockReport(props.data.slug);
    loading.value = false;
    reloadNuxtApp();
  } catch (e) {
    loading.value = false;
    console.log(e)
  }
}

const handlePricing = () => {
  navigateTo(NAVIGATIONS.pricing);
};

const openModalHandle = () => {
  open.value = true;
};
</script>

<template>
  <div class="unlock-report">
    <div class="unlock-report-title">
      Truy cập kho dữ liệu với hơn 1.000.000 báo cáo thị trường
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
        Đa dạng ngành hàng, nhóm hàng
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
    </div>
    <div class="action-btns">
      <div class="button" style="display: flex; gap: 12px; width: 100%">
        <div style="width: 100%;" @click="openModalHandle">
          <a-button style="width: 100%;" type="primary" size="large">Xem báo cáo</a-button>
        </div>
        <a-button v-if="!checkLevelCategory" style="width: 100%;" size="large" @click="openModalHandle">Báo cáo chi tiết</a-button>
      </div>
      <div v-if="!currentUserStore.authenticated">
        Đã có tài khoản?
        <a @click="currentUserStore.setShowPopupLogin(true)">
          Đăng nhập ngay
        </a>
      </div>
    </div>
  </div>
  <a-modal
      v-model:open="openModal"
      :footer="null"
      @cancel="toggleUnlock"
      @ok="toggleUnlock"
  >
    <div class="unlock-report-modal">
      <div v-if="currentUser.remainingUnlock">
        <div style="text-align: center;">
          <img loading="lazy" src="/images/Unlock-Document.png" class="unlock-icon"/>
        </div>

        <div class="content">
          <div class="remaining-unlock">
            Số lượt xem hiện tại: {{ currentUser.remainingUnlock }}
          </div>
          <div class="header">Xác nhận xem báo cáo</div>
          <div class="description">
            Bạn có chắc chắn muốn sử dụng
            <span class="highlight" style="font-size: 16px">01 lượt xem</span>
            trong vòng 24 giờ cho
            <span class="report-name" style="font-size: 16px">
             {{props.data.name}} - Báo cáo xu hướng thị trường sàn TMĐT
            </span>
            không?
          </div>
        </div>
      </div>
      <div v-else>
        <div style="text-align: center;">
          <img loading="lazy" src="/images/Unlock-Document-faded.svg" class="unlock-icon"/>
        </div>

        <div class="content">
          <div class="remaining-unlock">
            Số lượt xem hiện tại: {{ currentUser.remainingUnlock }}
          </div>
          <div class="header">Hết lượt xem báo cáo</div>
          <div class="description">
            Mua thêm gói dịch vụ để tiếp tục xem báo cáo chi tiết
          </div>
        </div>
      </div>

      <div class="unlock-report-modal-footer">
        <AButton style="width: 100%;" size="large" class="optionBtn" @click="toggleUnlock">Huỷ</AButton>
        <AButton v-if="currentUser.remainingUnlock" style="width: 100%;" size="large" type="primary" class="optionBtn"
                 @click="unlockReport">
          Xem báo cáo
        </AButton>
        <AButton v-else style="width: 100%;" size="large" type="primary" class="optionBtn"
                 @click="handlePricing">
          Mua ngay
        </AButton>
      </div>
    </div>
  </a-modal>
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
    text-align: center;
    font-family: Inter, sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 38px;
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
