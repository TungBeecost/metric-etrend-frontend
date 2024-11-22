<script setup lang="ts">
import {ref, h} from 'vue';
import {onBeforeRouteLeave} from 'vue-router';

const emit = defineEmits(['showNotification']);

// const isMobile = computed(() => window.innerWidth <= 768);

const showChatBox = ref(true);
const showButton = ref(false);
const closeNotification = () => {
  showChatBox.value = false;
  showButton.value = true;
};

const openChatBox = () => {
  showChatBox.value = true;
  showButton.value = false;
};

onBeforeRouteLeave(() => {
  closeNotification();
});
</script>

<template>
  <div class="button_box">
    <div v-if="showChatBox" class="custom-notification">
      <div class="notification-content">
        <div class="notification-header">
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
        <metric-gpt-box-chat/>
      </div>
    </div>
  </div>
  <div v-if="showButton" @click="openChatBox" class="button-notification">
    <div class="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white ring ring-orange-100">
      <div class="absolute z-10 top-0 left-0 w-full h-full rounded-full bg-orange-100 animate-[ping_2s_ease-in-out_infinite]"></div>
      <div class="relative z-20">
        <NuxtImg src="/icons/LogoFloat.svg" alt="MetricGPT" class="rounded-full"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.custom-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 480px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  z-index: 999;
  font-family: 'Inter', sans-serif;

}

.button-notification {
  position: fixed;
  cursor: pointer;
  z-index: 999;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  padding: 12px;
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

  p {
    font-size: 14px;
  }
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
    margin: 10px;
    bottom: 0;
  }

  .button_box{
    display: flex;
    justify-content: center;
  }
}
</style>
