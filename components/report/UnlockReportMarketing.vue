<script setup lang="ts">
import {useCurrentUser} from "~/stores/current-user"
import {ref} from "vue";

const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);

const showUnlock = ref(false);

const emit = defineEmits(['handle-unlock-report'])

</script>

<template>
  <div class="unlock-report">
    <div class="unlock-report-title">
      Đăng ký thông tin để nhận ngay báo cáo miễn phí
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
        Truy cập tìm kiếm kho báo cáo không giới hạn
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
        Khám phá toàn bộ báo cáo thị trường miễn phí
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
        Dữ liệu đầy đủ và trực quan
      </div>
    </div>
    <div class="action-btns">
      <a-button style="width: 100%;" type="primary" size="large" @click="emit('handle-unlock-report')">Đăng ký nhận báo cáo</a-button>
      <div v-if="!userInfo">
        Đã có tài khoản?
        <a style="cursor: pointer" @click="currentUserStore.setShowPopupLogin(true)">
          Đăng nhập ngay
        </a>
      </div>
    </div>
  </div>

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
</style>
