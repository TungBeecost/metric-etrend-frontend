<script setup lang="ts">
// import {ref, h, defineEmits} from 'vue';
import {ref, h} from 'vue';
import {onBeforeRouteLeave} from 'vue-router';
import ModalDownloadPdf from "~/components/ModalDownloadPdf.vue";
import Cta from "~/components/report/Cta.vue";
import BackgroundScrollIcon from '~/public/icons/BackgroundScrollIcon.svg';
import {message} from "ant-design-vue";
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";

const emit = defineEmits(['showNotification']);

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  showNotification: {
    type: Boolean,
    default: false
  },
  showButton: {
    type: Boolean,
    default: false
  },
  showModalDownloadPdf: {
    type: Boolean,
    default: false
  }
});

const isMobile = computed(() => window.innerWidth <= 768);
const showModalSuccess = ref(false);
const showNotification = ref(props.showNotification);
const showButton = ref(props.showButton);
const open = ref(false);
const openCta = ref(false);

const downloadReport = () => {
  trackEventCommon(EVENT_TYPE.CLICK_DOWNLOAD_SAMPLE, 'click_download_sample', '');
  const url = 'https://storage.googleapis.com/ereport-static/bao-cao-nganh-hang-sample.pdf'; // URL file cần tải xuống
  const fileName = 'Báo cáo mẫu.pdf';
  if (url) {
    fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(
              new Blob([blob]),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
              'download',
              fileName,
          );

          document.body.appendChild(link);
          link.click();

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          link.parentNode.removeChild(link);

          showModalSuccess.value = true;
        })
        .catch(() => {
          message.error('Tải xuống báo cáo thất bại');
        });
  }
};

const closeNotification = () => {
  showNotification.value = false;
  showButton.value = true;
  emit('showNotification', false);
};

const handleOpenModal = () => {
  open.value = true;
};

const handleOpenCta = () => {
  openCta.value = true;
};

onBeforeRouteLeave(() => {
  closeNotification();
});
</script>

<template>
  <div v-if="showNotification && !isMobile" class="custom-notification">
    <div class="notification-content">
      <div class="notification-header">
        <svg width="180" height="40" viewBox="0 0 602 79" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_8588_219207)">
            <path d="M97.1191 58.2899L108.439 1.62988L128.709 46.6299L149.059 1.62988L160.379 58.2899H154.019L146.839 22.0299H146.689L128.709 60.4899L110.809 22.0299H110.659L103.479 58.2899H97.1191Z" fill="#191946" stroke="#191945" stroke-miterlimit="10"/>
            <path d="M174.15 42.7899C174.22 45.9899 175.26 48.6899 177.41 50.8199C179.56 52.8799 182.22 53.9499 185.55 53.9499C189.92 53.9499 193.47 51.6799 196.13 47.0499L201.16 49.8199C197.68 56.0799 192.28 59.1999 185.11 59.1999C180 59.1999 175.86 57.5699 172.75 54.2899C169.64 51.0199 168.09 46.8999 168.09 41.9899C168.09 36.7999 169.57 32.6099 172.46 29.2599C175.49 25.7099 179.71 23.9299 184.96 23.9299C190.21 23.9299 194.58 25.8499 197.61 29.6199C200.49 33.0999 201.75 37.5099 201.46 42.7699H174.16L174.15 42.7899ZM195.23 37.9599C194.42 33.0499 190.13 29.2199 185.02 29.2199C182.43 29.2199 180.06 30.0699 177.99 31.7799C175.99 33.4199 174.81 35.4799 174.44 37.9699H195.23V37.9599Z" fill="#191946" stroke="#191945" stroke-miterlimit="10"/>
            <path d="M219.499 30.1399V58.2899H213.579V30.1399H209.959V24.8799H213.579V12.8599H219.499V24.8799H225.709V30.1399H219.499Z" fill="#191946" stroke="#191945" stroke-miterlimit="10"/>
            <path d="M240.369 24.87V28.5H240.519C242.889 25.44 245.479 23.95 248.209 23.95C249.839 23.95 251.609 24.45 253.539 25.51L250.729 30.7C249.179 29.71 247.989 29.2099 247.179 29.2099C242.669 29.2099 240.369 33.33 240.369 41.58V58.29H234.449V24.87H240.369Z" fill="#191946" stroke="#191945" stroke-miterlimit="10"/>
            <path d="M271.508 12.29C271.508 14.56 269.658 16.34 267.288 16.34C264.918 16.34 263.068 14.56 263.068 12.29C263.068 10.02 264.988 8.23999 267.288 8.23999C269.588 8.23999 271.508 10.09 271.508 12.29ZM270.248 24.87V58.28H264.328V24.87H270.248Z" fill="#191946" stroke="#191945" stroke-miterlimit="10"/>
            <path d="M312.13 34.83H311.98C308.95 31.06 305.32 29.2099 301.18 29.2099C297.63 29.2099 294.67 30.42 292.38 32.84C290.09 35.19 288.9 38.1 288.9 41.58C288.9 45.06 290.01 47.91 292.16 50.25C294.45 52.74 297.34 53.95 300.89 53.95C305.4 53.95 309.18 52.0299 312.21 48.1899H312.36V55.7999C308.88 58.07 305.18 59.2099 301.34 59.2099C296.01 59.2099 291.57 57.5799 288.1 54.2299C284.62 50.8899 282.85 46.69 282.85 41.58C282.85 36.47 284.63 32.34 288.18 29C291.8 25.66 296.17 23.95 301.42 23.95C305.34 23.95 308.89 25.09 312.15 27.29V34.83H312.13Z" fill="#191946" stroke="#191945" stroke-miterlimit="10"/>
            <path d="M17.37 29.4702V62.0502H0.89C0.4 62.0502 0 61.6502 0 61.1602V18.2402L17.37 29.4702Z" fill="#E28225"/>
            <path d="M25.1309 23.7302V60.7402C25.1309 61.4202 25.6809 61.9702 26.3509 61.9702H41.5009C41.6909 61.9702 41.8409 61.8202 41.8409 61.6302V14.7702C41.8409 14.5102 41.5709 14.3502 41.3409 14.4802L25.3009 23.4402C25.1909 23.5002 25.1309 23.6102 25.1309 23.7302Z" fill="#EF5C25"/>
            <path d="M50.2891 9.3201V61.1101C50.2891 61.6001 50.6891 62.0001 51.1791 62.0001H67.1291V0.300097C67.1291 0.150097 66.9691 0.0600974 66.8491 0.130097L50.2991 9.3301L50.2891 9.3201Z" fill="#EC3324"/>
            <path d="M17.3704 62.0502C17.2704 62.0502 17.1704 62.0302 17.0804 61.9802C16.8604 61.8702 16.7304 61.6502 16.7304 61.4002V29.6502L0.310412 18.7802C0.080412 18.6302 -0.029588 18.3502 0.040412 18.0902C0.100412 17.8302 0.330412 17.6302 0.600412 17.6002L7.20041 16.9202C7.55041 16.8902 7.90041 16.9702 8.19041 17.1602L21.8204 26.0302C21.8904 26.0702 21.9504 26.1302 22.0104 26.2102C22.0104 26.2102 22.0204 26.2302 22.0304 26.2302C22.1004 26.3402 22.1304 26.4602 22.1304 26.5902V57.9202C22.1304 58.4102 21.9004 58.8702 21.5004 59.1602L17.7504 61.9302C17.6404 62.0102 17.5004 62.0602 17.3704 62.0602V62.0502ZM18.0204 29.6502V60.1202L20.7404 58.1102C20.8004 58.0602 20.8404 57.9902 20.8404 57.9102V27.7702L18.0204 29.6402V29.6502ZM2.52041 18.7002L17.3704 28.5302L20.3104 26.5802L7.49041 18.2402C7.49041 18.2402 7.39041 18.2002 7.33041 18.2002L2.53041 18.7002H2.52041Z" fill="#E28225"/>
            <path d="M41.7005 61.9101C41.6005 61.9101 41.5005 61.8901 41.4105 61.8401C41.1905 61.7301 41.0605 61.5101 41.0605 61.2601L41.1105 15.0201C41.1105 14.7901 41.2305 14.5801 41.4305 14.4601C41.6305 14.3501 41.8705 14.3401 42.0705 14.4601L45.9205 16.6501C46.4005 16.9201 46.7005 17.4401 46.7005 17.9901V57.6701C46.7005 58.1601 46.4605 58.6201 46.0705 58.9101L42.0805 61.7901C41.9705 61.8701 41.8405 61.9101 41.7005 61.9101ZM42.3905 16.1301L42.3405 60.0001L45.3005 57.8501C45.3605 57.8101 45.4005 57.7401 45.4005 57.6601V17.9901C45.4005 17.9001 45.3505 17.8201 45.2805 17.7801L42.3905 16.1401V16.1301Z" fill="#EF5C25"/>
            <path d="M67.1498 61.9901C67.0498 61.9901 66.9398 61.9601 66.8498 61.9101C66.6398 61.8001 66.5098 61.5801 66.5098 61.3401V0.720112C66.5098 0.460112 66.6698 0.230112 66.8998 0.130112C67.1298 0.0301123 67.4098 0.0801123 67.5998 0.260112L71.9798 4.48011C72.2798 4.77011 72.4498 5.17011 72.4498 5.59011V57.7201C72.4498 58.2301 72.1998 58.7001 71.7798 58.9901L67.5198 61.8901C67.4098 61.9601 67.2798 62.0001 67.1598 62.0001L67.1498 61.9901ZM67.7898 2.24011V60.1301L71.0398 57.9201C71.1098 57.8701 71.1498 57.8001 71.1498 57.7201V5.59011C71.1498 5.52011 71.1198 5.46011 71.0798 5.41011L67.7898 2.24011Z" fill="#EC3324"/>
            <path d="M371.919 42.26H345.469C345.519 45.38 346.509 48.08 348.429 50.36C350.359 52.64 352.849 53.78 355.909 53.78C360.109 53.78 363.569 51.53 366.279 47.02L371.909 50.21C370.279 53.18 368.029 55.51 365.189 57.19C362.339 58.87 359.209 59.72 355.789 59.72C350.589 59.72 346.399 57.97 343.229 54.46C340.209 51.1 338.699 46.77 338.699 41.48C338.699 35.89 340.109 31.44 342.929 28.13C345.899 24.57 350.139 22.79 355.639 22.79C361.139 22.79 365.049 24.57 367.969 28.12C370.599 31.43 371.909 35.79 371.909 41.22V42.26H371.919ZM345.759 37.2H365.229C364.829 34.55 363.809 32.45 362.149 30.9C360.489 29.35 358.319 28.58 355.649 28.58C352.979 28.58 350.879 29.38 349.069 30.97C347.259 32.57 346.159 34.64 345.759 37.2Z" fill="url(#paint0_linear_8588_219207)"/>
            <path d="M399.34 34.16L417.02 58.53H408.55L392.05 34.83H389.15V58.53H382.17V2.5H390.64C397.48 2.5 402.4 3.37 405.43 5.1C407.76 6.44 409.57 8.31 410.85 10.71C412.14 13.11 412.78 15.7 412.78 18.47C412.78 22.58 411.54 26.1 409.07 29.02C406.59 31.94 403.35 33.65 399.34 34.15V34.16ZM389.16 8.75V29.03H391.39C401.3 29.03 406.25 25.61 406.25 18.78C406.25 11.95 401.17 8.75 391.02 8.75H389.16Z" fill="url(#paint1_linear_8588_219207)"/>
            <path d="M454.769 42.26H428.319C428.369 45.38 429.359 48.08 431.279 50.36C433.209 52.64 435.699 53.78 438.759 53.78C442.959 53.78 446.419 51.53 449.129 47.02L454.759 50.21C453.129 53.18 450.879 55.51 448.039 57.19C445.189 58.87 442.059 59.72 438.639 59.72C433.439 59.72 429.249 57.97 426.079 54.46C423.059 51.1 421.549 46.77 421.549 41.48C421.549 35.89 422.959 31.44 425.779 28.13C428.749 24.57 432.989 22.79 438.479 22.79C443.969 22.79 447.889 24.57 450.809 28.12C453.439 31.43 454.749 35.79 454.749 41.22V42.26H454.769ZM428.609 37.2H448.079C447.679 34.55 446.659 32.45 444.999 30.9C443.339 29.35 441.169 28.58 438.499 28.58C435.829 28.58 433.729 29.38 431.919 30.97C430.109 32.57 429.009 34.64 428.609 37.2Z" fill="url(#paint2_linear_8588_219207)"/>
            <path d="M470.389 23.75V29.55C473.419 25.04 477.469 22.79 482.529 22.79C487.589 22.79 491.469 24.62 494.599 28.28C497.479 31.74 498.919 35.97 498.919 40.96C498.919 46.25 497.479 50.62 494.599 54.08C491.519 57.84 487.399 59.72 482.229 59.72C477.059 59.72 473.359 57.52 470.379 53.11V78.45H463.619V23.75H470.379H470.389ZM480.909 53.77C484.409 53.77 487.199 52.54 489.279 50.07C491.199 47.7 492.169 44.74 492.169 41.18C492.169 37.62 491.179 34.71 489.209 32.44C487.139 29.97 484.369 28.74 480.919 28.74C477.469 28.74 474.899 29.96 472.919 32.41C470.939 34.86 469.959 37.78 469.959 41.19C469.959 44.6 470.899 47.61 472.769 49.93C474.789 52.5 477.509 53.78 480.919 53.78L480.909 53.77Z" fill="url(#paint3_linear_8588_219207)"/>
            <path d="M526.189 22.79C531.439 22.79 535.849 24.56 539.419 28.09C542.989 31.63 544.769 36.01 544.769 41.25C544.769 46.49 542.989 50.88 539.419 54.41C535.849 57.94 531.439 59.71 526.189 59.71C520.939 59.71 516.529 57.94 512.959 54.41C509.389 50.88 507.609 46.49 507.609 41.25C507.609 36.01 509.389 31.62 512.959 28.09C516.529 24.56 520.929 22.79 526.189 22.79ZM526.189 29.18C522.889 29.18 520.099 30.37 517.809 32.74C515.519 35.11 514.379 37.95 514.379 41.26C514.379 44.57 515.539 47.41 517.849 49.78C520.159 52.15 522.939 53.33 526.189 53.33C529.439 53.33 532.219 52.15 534.529 49.78C536.839 47.41 537.999 44.57 537.999 41.26C537.999 37.95 536.849 35.11 534.569 32.74C532.279 30.37 529.489 29.18 526.189 29.18Z" fill="url(#paint4_linear_8588_219207)"/>
            <path d="M560.379 23.75V29.4H560.599C562.369 24.99 565.529 22.79 570.059 22.79C571.929 22.79 573.759 23.35 575.529 24.48L572.499 30.51C571.419 29.62 570.059 29.17 568.429 29.17C563.059 29.17 560.369 33.27 560.369 41.47V58.52H553.609V23.75H560.369H560.379Z" fill="url(#paint5_linear_8588_219207)"/>
            <path d="M595.08 30V58.53H588.32V30H584.68V23.76H588.32V10.46H595.08V23.76H601.54V30H595.08Z" fill="url(#paint6_linear_8588_219207)"/>
          </g>
          <defs>
            <linearGradient id="paint0_linear_8588_219207" x1="338.709" y1="40.47" x2="601.539" y2="40.47" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E28225"/>
              <stop offset="0.5" stop-color="#EF5C25"/>
              <stop offset="1" stop-color="#EC3324"/>
            </linearGradient>
            <linearGradient id="paint1_linear_8588_219207" x1="338.71" y1="40.47" x2="601.54" y2="40.47" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E28225"/>
              <stop offset="0.5" stop-color="#EF5C25"/>
              <stop offset="1" stop-color="#EC3324"/>
            </linearGradient>
            <linearGradient id="paint2_linear_8588_219207" x1="338.709" y1="40.47" x2="601.539" y2="40.47" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E28225"/>
              <stop offset="0.5" stop-color="#EF5C25"/>
              <stop offset="1" stop-color="#EC3324"/>
            </linearGradient>
            <linearGradient id="paint3_linear_8588_219207" x1="338.709" y1="40.47" x2="601.539" y2="40.47" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E28225"/>
              <stop offset="0.5" stop-color="#EF5C25"/>
              <stop offset="1" stop-color="#EC3324"/>
            </linearGradient>
            <linearGradient id="paint4_linear_8588_219207" x1="338.709" y1="40.47" x2="601.539" y2="40.47" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E28225"/>
              <stop offset="0.5" stop-color="#EF5C25"/>
              <stop offset="1" stop-color="#EC3324"/>
            </linearGradient>
            <linearGradient id="paint5_linear_8588_219207" x1="338.709" y1="40.47" x2="601.539" y2="40.47" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E28225"/>
              <stop offset="0.5" stop-color="#EF5C25"/>
              <stop offset="1" stop-color="#EC3324"/>
            </linearGradient>
            <linearGradient id="paint6_linear_8588_219207" x1="338.71" y1="40.47" x2="601.54" y2="40.47" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E28225"/>
              <stop offset="0.5" stop-color="#EF5C25"/>
              <stop offset="1" stop-color="#EC3324"/>
            </linearGradient>
            <clipPath id="clip0_8588_219207">
              <rect width="601.54" height="78.44" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
             style="cursor: pointer;" @click="closeNotification">
          <rect width="40" height="40" rx="20" fill="#FAF9FF"/>
          <g clip-path="url(#clip0_6821_308869)">
            <path d="M11.75 20H28.25" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_6821_308869">
              <rect width="24" height="24" fill="white" transform="translate(8 8)"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="notification-body">
        <div style="text-align: center; width: 100%;">
          <p style="font-size: 24px; font-weight: 700; line-height: 28px;">Bạn vẫn đang cân nhắc?</p>
        </div>
        <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 12px;">
          <p style="color: #241E46; font-weight: 400; text-align: center; width: 80%;">
            <span style="color:#716B95; line-height: 22px;">Xem trước nội dung báo cáo mẫu với dữ liệu minh hoạ trước khi mua</span>
          </p>
        </div>
        <AButton
            v-if="!data.is_unsellable"
            style="width: 60%; font-size: 14px; font-weight: 600; margin: 12px 0; font-family: Montserrat, sans-serif;"
            type="primary"
            size="large"
            @click="downloadReport"
        >
        Tải báo cáo mẫu ngay
        </AButton>
        <div style="font-size: 14px; color: #716B95">
          Bạn cần hỗ trợ thêm?
          <span style="color: #E85912; cursor: pointer" @click="handleOpenCta">
            Liên hệ tư vấn
          </span>
        </div>
      </div>
    </div>
    <img loading="lazy" src="/images/ImageOnBackgroundScroll.png" alt="ImageOnBackgroundScroll" style="position: absolute; bottom: 0; right: 0; width: 100%;"/>
    <img loading="lazy" src="/images/BackgroundScroll.png" alt="BackgroundScrollIcon" style="width: 100%"/>
  </div>
  <div v-else class="button-notification">
    <button
        style="display: flex; height: 40px; padding: 9px 16px; justify-content: center; align-items: center; border-radius: 8px; background: #FAF9FF; color: #241E46; border: none; cursor: pointer; font-size: 14px; font-weight: 400; text-align: center;"
        v-if="isMobile"
        @click="downloadReport">
      <img src="/icons/Download.svg" alt="DownloadIcon" style="width: 24px; height: 24px; margin-right: 8px;"/>
      Tải báo cáo mẫu
    </button>
    <button
        :class="{ 'full-width': !isMobile }"
        style="display: flex; height: 40px; padding: 9px 16px; justify-content: center; align-items: center; border-radius: 8px; background: linear-gradient(90deg, #FF6931 1.09%, #FF9839 99.23%); color: #fff; border: none; cursor: pointer; font-size: 14px; font-weight: 400; text-align: center;"
        @click="handleOpenModal">
      <img src="/icons/CartIconWhite.svg" alt="CartIconWhite" style="width: 24px; height: 24px; margin-right: 8px;"/>
      Mua báo cáo PDF
    </button>
  </div>
  <modal-download-pdf v-model:open="open" :data="props.data"/>
  <cta v-model:open="openCta"/>
  <a-modal v-model:visible="showModalSuccess" :footer="null" width="550px">
    <div class="success_modal">
      <div class="success_modal_container">
        <img loading="lazy" src="/images/SuccessImage.png" alt="SuccessImage" style="width: 100px; height: 100px; margin: 0 auto; display: block;"/>
        <div class="success_modal_content">
          <p class="success_modal_content_title">Cảm ơn bạn đã quan tâm!</p>
          <p>Báo cáo mẫu sẽ tự động được tải xuống trong giây lát.</p>
        </div>
      </div>
      <div class="success_modal_note">
            <a-alert type="info" show-icon>
              <template #message>
                <p><b style="font-weight: bold">Lưu ý:</b> Dữ liệu sử dụng trong báo cáo chỉ mang tính chất minh hoạ</p>
              </template>
            </a-alert>
      </div>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.full-width {
  width: 100%;
}

.custom-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  z-index: 999;
  padding: 12px;
  font-family: 'Inter', sans-serif;
}

.button-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  z-index: 999;
  gap: 8px;
  font-family: 'Inter', sans-serif;
}

.notification-content {
  padding: 16px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.notification-body {
  margin-top: 16px;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 14px;
  }
}

.success_modal{
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.success_modal_content{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px ;
}

.success_modal_content_title{
  font-size: 24px;
  font-weight: 700;
  line-height: 38px;
}

.success_modal_container{
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 768px) {
  .button-notification {
    width: 100%;
    bottom: 4px;
    right: 0;
    display: flex;
    justify-content: center;
  }

  .custom-notification{
    right: 0;
    width: 95%;
    bottom: 4px;
  }
}
</style>
