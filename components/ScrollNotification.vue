<script setup lang="ts">
import { ref, h, defineEmits } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import ModalDownloadPdf from "~/components/ModalDownloadPdf.vue";

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
  }
});

const showNotification = ref(props.showNotification);
const showButton = ref(props.showButton);
const open = ref(false);

const svgIcon = () => (
    h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 16 16',
      fill: 'none',
      style: { marginRight: '8px' },
    }, [
      h('g', { 'clip-path': 'url(#clip0_5203_183660)' }, [
        h('path', {
          d: 'M2.5 9L6 12.5L14 4.5',
          stroke: '#35A855',
          'stroke-width': '1.3',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ]),
      h('defs', [
        h('clipPath', { id: 'clip0_5203_183660' }, [
          h('rect', { width: '16', height: '16', fill: 'white' }),
        ]),
      ]),
    ])
);

const closeNotification = () => {
  showNotification.value = false;
  showButton.value = true;
  emit('showNotification', false);
};

const handleOpenModal = () => {
  open.value = true;
};

onBeforeRouteLeave(() => {
  closeNotification();
});
</script>

<template>
  <div v-if="showNotification" class="custom-notification">
    <div class="notification-content">
      <div class="notification-header">
        <svg width="100" height="26" viewBox="0 0 100 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.9961 9.98108C30.1306 9.98108 29.4406 10.2798 28.926 10.8769C28.4109 11.4745 28.1078 12.3007 28.0162 13.3561H33.6515C33.6515 12.2663 33.4219 11.4309 32.9631 10.8511C32.504 10.2712 31.8483 9.98108 30.9961 9.98108ZM31.4386 20.3672C29.8454 20.3672 28.588 19.8535 27.6671 18.8254C26.7458 17.7974 26.2852 16.3706 26.2852 14.5438C26.2852 12.7037 26.7129 11.2417 27.5688 10.1585C28.4242 9.0751 29.5732 8.5334 31.0159 8.5334C32.3662 8.5334 33.4352 9.00389 34.2219 9.94508C35.0087 10.8861 35.4021 12.127 35.4021 13.6687V14.7627H27.9768C28.0093 16.1032 28.3292 17.1207 28.9356 17.8148C29.542 18.5093 30.3962 18.8565 31.4977 18.8565C32.6582 18.8565 33.8055 18.5998 34.94 18.0855V19.6273C34.3628 19.8916 33.817 20.0806 33.3022 20.1954C32.7875 20.3097 32.1665 20.3672 31.4386 20.3672Z" fill="#241E46"/>
          <path d="M40.0977 12.3057H42.3892C43.5695 12.3057 44.4348 12.0573 44.9855 11.5608C45.5363 11.0642 45.8117 10.3193 45.8117 9.32644C45.8117 8.31932 45.5315 7.59373 44.9708 7.14905C44.4104 6.70497 43.5104 6.48234 42.2712 6.48234H40.0977V12.3057ZM40.0977 13.8266V20.1602H38.4258V4.93039H42.3695C44.1332 4.93039 45.4364 5.2882 46.279 6.00304C47.1212 6.71866 47.5427 7.79484 47.5427 9.23234C47.5427 11.2468 46.5789 12.6076 44.6512 13.316L48.5558 20.1602H46.5789L43.0974 13.8266H40.0977Z" fill="#241E46"/>
          <path d="M54.7578 9.98108C53.8923 9.98108 53.2023 10.2798 52.6877 10.8769C52.1726 11.4745 51.8695 12.3007 51.7779 13.3561H57.4132C57.4132 12.2663 57.1836 11.4309 56.7249 10.8511C56.2657 10.2712 55.61 9.98108 54.7578 9.98108ZM55.2003 20.3672C53.6071 20.3672 52.3497 19.8535 51.4288 18.8254C50.5075 17.7974 50.0469 16.3706 50.0469 14.5438C50.0469 12.7037 50.4746 11.2417 51.3305 10.1585C52.1859 9.0751 53.3349 8.5334 54.7776 8.5334C56.1279 8.5334 57.1969 9.00389 57.9836 9.94508C58.7704 10.8861 59.1638 12.127 59.1638 13.6687V14.7627H51.7385C51.771 16.1032 52.0909 17.1207 52.6973 17.8148C53.3037 18.5093 54.1579 18.8565 55.2594 18.8565C56.4199 18.8565 57.5673 18.5998 58.7017 18.0855V19.6273C58.1245 19.8916 57.5787 20.0806 57.064 20.1954C56.5492 20.3097 55.9282 20.3672 55.2003 20.3672Z" fill="#241E46"/>
          <path d="M66.7251 10.003C65.6236 10.003 64.827 10.3261 64.3353 10.9719C63.8435 11.6179 63.591 12.6458 63.5781 14.0555V14.4407C63.5781 16.0449 63.8304 17.1928 64.3353 17.8838C64.8399 18.575 65.6498 18.9201 66.7645 18.9201C67.6954 18.9201 68.4249 18.5212 68.9526 17.7222C69.4803 16.9234 69.7444 15.8228 69.7444 14.4197C69.7444 12.9965 69.4803 11.9045 68.9526 11.1437C68.4249 10.3837 67.6822 10.003 66.7251 10.003ZM66.9612 20.3681C66.2595 20.3681 65.6188 20.231 65.0383 19.9565C64.4583 19.6823 63.9713 19.2605 63.5781 18.6908H63.46C63.5387 19.3575 63.5781 19.9896 63.5781 20.5867V25.2852H61.9453V8.7427H63.2731L63.4994 10.3054H63.5781C63.9975 9.68036 64.4858 9.22904 65.0435 8.95105C65.6005 8.67305 66.2399 8.53435 66.9612 8.53435C68.3904 8.53435 69.4938 9.0518 70.2704 10.0863C71.0476 11.1214 71.4361 12.5726 71.4361 14.4407C71.4361 16.3156 71.041 17.7725 70.2509 18.8107C69.4607 19.8489 68.3642 20.3681 66.9612 20.3681Z" fill="#241E46"/>
          <path d="M75.3753 14.4395C75.3753 15.898 75.6506 17.0092 76.2014 17.7729C76.7522 18.5372 77.5617 18.9189 78.6306 18.9189C79.6992 18.9189 80.5104 18.5388 81.0649 17.7786C81.6188 17.018 81.8959 15.905 81.8959 14.4395C81.8959 12.9883 81.6188 11.8861 81.0649 11.1326C80.5104 10.379 79.6928 10.0018 78.611 10.0018C77.5421 10.0018 76.7356 10.3739 76.1916 11.1167C75.6473 11.8597 75.3753 12.9674 75.3753 14.4395ZM83.5873 14.4395C83.5873 16.301 83.1448 17.7541 82.2597 18.7994C81.3745 19.8447 80.1516 20.3672 78.5912 20.3672C77.6275 20.3672 76.7718 20.1273 76.0243 19.648C75.2768 19.1689 74.6998 18.4813 74.2935 17.5855C73.8868 16.6897 73.6836 15.6413 73.6836 14.4395C73.6836 12.5787 74.1228 11.1288 75.0016 10.0908C75.88 9.05261 77.0994 8.5334 78.6601 8.5334C80.168 8.5334 81.3661 9.06434 82.2547 10.1268C83.1431 11.1895 83.5873 12.627 83.5873 14.4395Z" fill="#241E46"/>
          <path d="M91.3666 8.53472C91.8452 8.53472 92.2746 8.57639 92.6551 8.65973L92.4288 10.2639C91.9828 10.1598 91.5896 10.1074 91.2486 10.1074C90.3765 10.1074 89.6308 10.4824 89.011 11.2325C88.3917 11.9825 88.0818 12.9171 88.0818 14.0349V20.1602H86.4492V8.74306H87.7966L87.9835 10.8575H88.0622C88.4621 10.1146 88.9439 9.54183 89.5078 9.13883C90.0715 8.73602 90.6912 8.53472 91.3666 8.53472Z" fill="#241E46"/>
          <path d="M99.9991 18.7655V20.0722C99.8244 20.1606 99.566 20.2347 99.226 20.2922C98.8859 20.3519 98.581 20.3809 98.3089 20.3809C96.2518 20.3809 95.2222 19.2327 95.2222 16.9364V10.2346H93.6992V8.70221H95.2455V0.716112H96.8347V8.70221H99.9214V10.2346H96.8347V16.8644C96.8347 17.5432 96.9861 18.0638 97.2911 18.4281C97.5942 18.7902 98.0118 18.9713 98.5422 18.9713C98.8278 18.9713 99.1017 18.9508 99.3678 18.9054C99.6319 18.8602 99.8438 18.8148 99.9991 18.7655Z" fill="#241E46"/>
          <path d="M12.3375 5.55273H0V0.79011H14.1185C14.6057 0.79011 14.9227 1.31309 14.7047 1.75768L13.0704 5.09076C12.9316 5.3739 12.6479 5.55273 12.3375 5.55273Z" fill="#E48939"/>
          <path d="M15.6713 15.473H0V20.3672H17.6956C18.0572 20.3672 18.2924 19.9641 18.1307 19.6216L16.3964 15.9478C16.2591 15.6568 15.9784 15.473 15.6713 15.473Z" fill="#EF4438"/>
          <path d="M12.2058 8.13123H0V13.0254H14.2302C14.5918 13.0254 14.8269 12.6223 14.6652 12.2798L12.931 8.60596C12.7936 8.31501 12.5129 8.13123 12.2058 8.13123Z" fill="#F26539"/>
        </svg>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;" @click="closeNotification">
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
          <p style="color: #E85912; font-size: 20px; font-weight: 700; line-height: 28px;">Nhận báo cáo số liệu chi tiết</p>
        </div>
        <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 24px;">
          <p style="color: #241E46; font-weight: 400;">
            Nhóm hàng: <span style="font-weight: 700;">{{ props.data.name }}</span>
          </p>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <svgIcon />
          <p>Số liệu chi tiết về thị trường {{ props.data.name }} trên Shopee, Tiktok, Lazada, Tiki</p>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <svgIcon />
          <p>Xu hướng tăng trưởng thị trường hàng tháng, hàng quý trong 12 tháng qua</p>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <svgIcon />
          <p>Danh sách Top 10 thương hiệu từng sàn, phân tích chi tiết số liệu 20 shop bán chạy</p>
        </div>
        <div style="display: flex; align-items: center;">
          <svgIcon />
          <p>Thống kê 60 sản phẩm {{ props.data.name }} đang bán chạy trên các sàn TMĐT</p>
        </div>
        <button style="display: flex; width: 100%; height: 40px; padding: 9px 16px; flex-direction: column; justify-content: center; align-items: center; border-radius: 8px; background: linear-gradient(90deg, #FF6931 1.09%, #FF9839 99.23%); color: #fff; border: none; cursor: pointer; font-size: 14px; font-weight: 400; text-align: center; margin-top: 36px;" @click="handleOpenModal">
          Xem báo cáo chi tiết
        </button>
      </div>
    </div>
  </div>
  <div v-else class="button-notification">
    <button style="display: flex; width: 100%; height: 40px; padding: 9px 16px; flex-direction: column; justify-content: center; align-items: center; border-radius: 8px; background: linear-gradient(90deg, #FF6931 1.09%, #FF9839 99.23%); color: #fff; border: none; cursor: pointer; font-size: 14px; font-weight: 400; text-align: center;" @click="handleOpenModal">
      Xem báo cáo chi tiết
    </button>
  </div>
  <modal-download-pdf v-model:open="open" :data="props.data"/>
</template>

<style lang="scss">
.custom-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  z-index: 9999;
  padding: 12px;
}

.button-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 40px;
  //background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  z-index: 9999;

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
}
</style>