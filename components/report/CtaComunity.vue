<script setup lang="ts">

import TrialRegister from "~/components/report/TrialRegister.vue";
import LeadFormBackground from "~/components/report/LeadFormBackground.vue";
import SuccessNotification from "~/components/ContactUs/SuccessNotification.vue";
import TrialRegisterCommunity from "~/components/report/TrialRegisterCommunity.vue";

const POPUP_STATES = {
  FORM: 'form',
  SUCCESSFULLY: 'successfully',
  FAILURE: 'failure',
  TELEPHONE_CONFIRMATION: 'telephone_confirmation',
  CONFIRMATION_FAILURE: 'confirmation_failure',
  OTP: 'otp',
  VERIFICATION_SUCCESS: 'verification_success',
}

const POPUP_STATES_WIDTH = {
  form: '950px',
  successfully: '629px',
  failure: '528px',
  confirmation_failure: '528px',
  telephone_confirmation: '528px',
  otp: '528px',
  verification_success: '629px',
};

const popupState = ref(POPUP_STATES.FORM)
const openSuccess = ref(false)

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
});

const handleSubmitStatus = (status: any) => {
  console.log('status', status)
  if (status === 'success') {
    popupState.value = POPUP_STATES.SUCCESSFULLY
    openSuccess.value = true
    emits('update:open', false)
  } else if (status === 'error') {
    popupState.value = POPUP_STATES.FAILURE
  } else {
    popupState.value = POPUP_STATES.FORM
  }
}
const emits = defineEmits(["update:open"]);
const toggleUnlock = () => {
  emits('update:open', false);
};

</script>

<template>
  <a-modal
      :open="open"
      :bodyStyle="{ padding: 0 }"
      :style="{ width: POPUP_STATES_WIDTH[popupState] }"
      :footer="null"
      @cancel="toggleUnlock"
      class="popup-lead-form-container">
    <lead-form-background :POPUP_STATES="POPUP_STATES" :current-state="popupState"/>
    <div class="popup-lead-form">
      <div class="lead-form">
        <div class="form-wrapper">
          <div class="form-container">
            <trial-register-community @submit-status="handleSubmitStatus"/>
          </div>
        </div>
      </div>
      <div class="container_content">
        <div class="additional-information">
          <h2 class="title">Nhận tổng hợp báo cáo E-commerce các năm 2022, 2023, 2024</h2>
          <p class="subtitle">
            Đăng ký thông tin hoặc
            <a style="color: #1890FF" href='https://metric.vn/analytics/pricing'>trở thành khách hàng của Metric</a>
            để truy cập không giới hạn tổng hợp báo cáo E-commerce.
          </p>
        </div>
        <img class="image" src="/icons/FormImageCommunity.svg" alt="form_image" />
      </div>
    </div>
  </a-modal>
  <success-notification v-model:visible="openSuccess" class-name="submit-form-marketing-success"/>
</template>

<style scoped lang="scss">
.popup-lead-form-container {
  font-family: "Inter", sans-serif;

  svg#background {
    position: absolute;
    bottom: 0;
    border-radius: 0 0 16px 16px;
  }

  .additional-information.small {
    padding: 32px 0 32px 32px;
    display: none;

    h2.title {
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      color: #241E46;
    }

    p.subtitle {
      margin-top: 12px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
    }

    .image {
      margin-top: 60px;
      max-width: 100%;
    }
  }

  .popup-lead-form {
    position: relative;
    width: 950px;
    display: flex;
    padding: 24px;

    .lead-form {
      .form-container {
        width: 402px;
        padding: 24px;
        border: 1px solid #eeebff;
        border-radius: 16px;
        background-color: #ffffff;
      }
    }

    .additional-information {

      h2.title {
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 48px;
        color: #241E46;
      }

      p.subtitle {
        margin-top: 12px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        }

      .image {
        margin-top: 40px;
        max-width: 100%;
      }
    }
  }

  .submitted {
    width: 100%;
    position: relative;
    padding: 40px 12px;

    border-radius: 16px;

    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 20;

    .block-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;

      color: #050038;
    }

    h2 {
      font-weight: 700;
      font-size: 36px;
      line-height: 39px;
      color: #241E46;
    }

    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 32px;
      text-align: center;

      color: #716B95;

      margin-bottom: 40px
    }

    &.failure {
      button {
        border-radius: 8px;

        &.messenger-button {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 48px;
          margin: auto;
          box-shadow: 2px 3px 5px rgba(78, 78, 78, 0.08);
          border-radius: 4px;
          border: 1px solid #eeebff;
          color: #241e46;
          font-weight: bold;
        }
      }
    }

    .trial-button {
      padding: 9px 16px;
      align-items: center;
      border-radius: 8px;
      border: 1px solid #E85912;
      color: #FFFFFF;
      background: #E85912;
      margin-bottom: 40px;
    }
  }

  .confirmation_failure {
    h2 {
      color: #241E46;
      text-align: center;

      font-size: 36px;
      font-weight: 700;
      line-height: 48px;
    }

    p {
      color: #716B95;
      text-align: center;

      font-size: 20px;
      font-weight: 400;
      line-height: 32px;

      margin: 0 20px;
    }
  }

  .telephone-confirmation {
    width: 100%;
    position: relative;
    padding: 20px 12px 30px 12px;

    border-radius: 16px;

    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 20;

    h2 {
      font-weight: 700;
      font-size: 32px;
      line-height: 39px;

      color: #050038;
    }

    p {
      text-align: center;

      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;

      color: #716B95;

      margin-bottom: 32px;
      padding: 0 40px;
    }

    .tel-verification {
      padding: 30px;
      width: 460px;
      border-radius: 20px;
      border: 1px solid #EEEBFF;
      background: #FFF;

      input {
        height: 40px;
        border-radius: 8px;
        border: 1px solid #9D97BF;

        &::placeholder {
          color: #9D97BF;
        }
      }

      .request-otp-btn {
        width: 100%;
        margin-bottom: 0;
      }
    }
  }

  .otp-verification {
    width: 100%;
    position: relative;
    padding: 20px 12px 30px 12px;

    border-radius: 16px;

    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 20;

    h2 {
      font-weight: 700;
      font-size: 32px;
      line-height: 39px;

      color: #050038;
    }

    p {
      font-size: 16px;
      font-weight: 400;
      text-align: center;

      color: #716B95;

      margin-bottom: 32px;
    }

    .otp-input {
      padding: 30px;
      width: 460px;
      border-radius: 20px;
      border: 1px solid #EEEBFF;
      background: #FFF;

      .otp-wrapper {
        margin-bottom: 32px;
        width: 100%;

        input {
          height: 40px;
          border-radius: 8px;
          border: 1px solid #9D97BF;
          margin-bottom: 20px;

          &::placeholder {
            color: #9D97BF;
          }
        }
      }

      .request-otp-btn {
        width: 100%;
        margin-bottom: 12px;
      }

      .resend-text {
        color: #716B95;
      }
    }
  }

  .free-search {
    color: #E85912;
    font-weight: 700;
  }
}

@media screen and (max-width: 1200px) {
  .popup-lead-form-container {
    svg#background {
      width: 100%;
      bottom: -94px;
    }

    .additional-information {
      padding: 32px 32px 0 32px;
      display: block;

      h2.title {
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        color: #241E46;
      }

      p.subtitle {
        margin-top: 12px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #E85912;
      }

      .image {
        margin-top: 40px;
        max-width: 100%;
        display: none;
      }
    }

    .popup-lead-form {
      width: 100%;
      flex-direction: column-reverse;

      padding: 24px;

      .lead-form {
        width: 100%;

        .form-container {
          width: 100%;
          padding: 16px;
        }
      }

      .additional-information {
        padding: 32px 0 32px 0;

        h2.title {
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 32px;
          color: #241E46;
        }

        p.subtitle {
          margin-top: 12px;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #E85912;
        }

        .image {
          margin-top: 40px;
          max-width: 100%;
          display: none;
        }
      }
    }
  }
}

.container_content{
  padding: 30px 0 32px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
}

@media screen and (max-width: 600px) {
  .popup-lead-form-container {
    svg#background {
      width: 100%;
      height: 100%;
      display: none;
    }

    .additional-information {
      padding: 32px 32px 0 32px;
      display: block;

      h2.title {
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        color: #241E46;
      }

      p.subtitle {
        margin-top: 12px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #E85912;
      }

      .image {
        margin-top: 40px;
        max-width: 100%;
        display: none;
      }
    }

    .popup-lead-form {
      .lead-form {
        .form-container {
          padding: 16px;
        }
      }

      .additional-information {
        padding: 32px 0 12px 0;

        h2.title {
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 32px;
          color: #241E46;
        }

        p.subtitle {
          margin-top: 12px;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #E85912;
        }

        .image {
          margin-top: 40px;
          max-width: 100%;
          display: none;
        }
      }
    }
  }
}
</style>
