<script setup>
import {onMounted, ref} from 'vue';
import { NAVIGATIONS } from "~/constant/constains";

const isDesktop = ref(true);
const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);

const {report, title, subtitle, okButton, handleUnlockReport} = defineProps({
  report: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: 'Số liệu bị khoá'
  },
  subtitle: {
    type: String,
    default: 'Bạn cần mở khoá để xem số liệu đầy đủ'
  },
  okButton: {
    type: String,
    default: 'Xem báo cáo'
  },
  handleUnlockReport: {
    type: Function,
    default: null
  }
});

onMounted(() => {
  isDesktop.value = window?.innerWidth >= 768;
});


const showUnlock = ref(false);

const handleButtonClick = () => {
  if (handleUnlockReport) {
    return handleUnlockReport();
  }
  if (userInfo.value.id) {
    if(okButton === 'Nâng cấp ngay'){
      navigateTo(`${NAVIGATIONS.pricing}`);
    }
    else{
      toggleUnlock();
    }
  } else {
    currentUserStore.setShowPopupLogin(true);
  }
};

const toggleUnlock = () => {
  console.log('toggleUnlock');
  if (handleUnlockReport) {
    return handleUnlockReport();
  }
  showUnlock.value = !showUnlock.value;
}

</script>

<template>
  <div class="chart-mask">
    <div class="chart-mask-content">
      <div style="margin-bottom: 24px;">
        <div class="lock-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2521_141262)">
              <path opacity="0.2"
                    d="M6 11.65H26C26.0928 11.65 26.1819 11.6869 26.2475 11.7525C26.3131 11.8181 26.35 11.9072 26.35 12V26C26.35 26.0928 26.3131 26.1819 26.2475 26.2475C26.1819 26.3131 26.0928 26.35 26 26.35H6C5.90717 26.35 5.81815 26.3131 5.75251 26.2475C5.68688 26.1819 5.65 26.0928 5.65 26V12C5.65 11.9072 5.68687 11.8182 5.75251 11.7525C5.81815 11.6869 5.90717 11.65 6 11.65ZM14.25 20.1191C14.768 20.4653 15.377 20.65 16 20.65C16.8354 20.65 17.6366 20.3181 18.2274 19.7274C18.8181 19.1366 19.15 18.3354 19.15 17.5C19.15 16.877 18.9653 16.268 18.6191 15.75C18.273 15.2319 17.781 14.8282 17.2055 14.5898C16.6299 14.3514 15.9965 14.289 15.3855 14.4105C14.7744 14.5321 14.2131 14.8321 13.7726 15.2726C13.3321 15.7131 13.0321 16.2744 12.9105 16.8855C12.789 17.4965 12.8514 18.1299 13.0898 18.7055C13.3282 19.281 13.7319 19.773 14.25 20.1191Z"
                    fill="#E85912" stroke="#E85912" stroke-width="1.3"/>
              <path
                  d="M26 11H6C5.44772 11 5 11.4477 5 12V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V12C27 11.4477 26.5523 11 26 11Z"
                  stroke="#E85912" stroke-width="1.3"
                  stroke-linecap="round" stroke-linejoin="round"/>
              <path
                  d="M11 11V7C11 5.67392 11.5268 4.40215 12.4645 3.46447C13.4021 2.52678 14.6739 2 16 2C17.3261 2 18.5979 2.52678 19.5355 3.46447C20.4732 4.40215 21 5.67392 21 7V11"
                  stroke="#E85912"
                  stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path
                  d="M16 20C17.3807 20 18.5 18.8807 18.5 17.5C18.5 16.1193 17.3807 15 16 15C14.6193 15 13.5 16.1193 13.5 17.5C13.5 18.8807 14.6193 20 16 20Z"
                  stroke="#E85912" stroke-width="1.3"
                  stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 20V23" stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2521_141262">
                <rect width="32" height="32" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
      <div v-if="okButton">
        <a-button class="register-btn" :size="isDesktop ? 'large' : 'default'" type="primary" @click="handleButtonClick">
          {{ okButton }}
        </a-button>
      </div>
    </div>
  </div>

  <ModalUnlock v-model:showUnlock="showUnlock" :report="report"/>
</template>

<style lang="scss" scoped>
.chart-mask {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  position: absolute;

  font-family: 'Inter', sans-serif;

  top: 0;
  left: 0;


  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);

  .chart-mask-content {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 16px;
    border: 1px solid var(--dark-blue-dark-blue-2, #EEEBFF);
    background: var(--neutral-neutral-1, #FFF);
    box-shadow: 24px 24px 40px 0px rgba(0, 0, 0, 0.08);

    width: 100%;
    height: 100%;

    padding: 40px 16px;
    max-height: 450px;

    .logo {
      position: absolute;
      top: 30px;
      left: 30px;

      width: 100%;
    }

    .lock-icon {
      padding: 14px;

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 10px;

      border-radius: 60px;
      background: var(--volcano-volcano-1, #FDEEE7);
    }

    .title {
      margin-bottom: 12px;

      font-weight: 700;
      font-size: 16px;
      line-height: 20px;

      color: #1a1a46;

      text-align: center;
    }

    .subtitle {
      color: var(--dark-blue-dark-blue-5, #716B95);
      text-align: center;
      /* Body/Body Text 2 */
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;

      margin-bottom: 40px;
    }

    .register-btn {
      background: #e85912;
      color: #fff;

      &:hover {
        background: #fa541c;
        box-shadow: 0px 4px 8px rgba(196, 196, 196, 0.25);
      }
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
<style lang="scss">
@media (max-width: 767px) {
  .ant-modal {
    margin: 15px;
  }
}

</style>