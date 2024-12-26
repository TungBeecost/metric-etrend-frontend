<script setup lang="ts">
import {ref, h} from 'vue';
import {onBeforeRouteLeave} from 'vue-router';
const props = defineProps({
  name: {
    type: String,
  },
  id: {
    type: Number,
  },
  period: {
    type: String,
  },
});

const showChatBox = ref(false);
const fullScreen = ref(false);
const closeNotification = () => {
  showChatBox.value = false;
};

const openChatBox = () => {
  showChatBox.value = true;
};

const handleFullScreen = () => {
  fullScreen.value = !fullScreen.value;
};

onBeforeRouteLeave(() => {
  closeNotification();
});
</script>

<template>
  <div v-show="showChatBox" :class="fullScreen ? 'custom-chat-box-full-screen' : 'custom-chat-box'">
    <div class="chat-box-content">
      <div class="chat-box-header">
        <img src="/images/logo-gpt.svg" alt="MetricGPT" class="w-32 ml-3"/>
        <div class="icon_chat_box flex space-x-2">
          <div class="mobile-icon-hover bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-400 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center sm:hover:bg">
            <UIcon
                :name="fullScreen ? 'mdi-arrow-collapse' : 'i-material-symbols-pan-zoom'"
                @click="handleFullScreen"
                class="w-5 h-5"
                aria-label="Toggle Full Screen"
            />
          </div>
          <div class="mobile-icon-hover bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-400 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center">
            <UIcon
                name="ic-outline-minus"
                class="w-5 h-5"
                @click="closeNotification"
                aria-label="Close Chat Box"
            />
          </div>
        </div>
      </div>
      <metric-gpt-box-chat
        :name="props?.name"
        :id="props?.id"
        :period="props?.period"
        :fullScreen="fullScreen"
      />
    </div>
  </div>
  <div v-if="!showChatBox" @click="openChatBox" class="button-notification">
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

.custom-chat-box,
.custom-chat-box-full-screen {
  transition: all 0.3s ease;
}

.custom-chat-box {
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

.custom-chat-box-full-screen {
  position: fixed;
  bottom: 0;
  right: 0;
  width: min(100%, 1000px);
  height: calc(100vh - 90px);
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  z-index: 999;
  font-family: 'Inter', sans-serif;
  /* Ensure it's always on top */
}


.chat-box-content{
  height: calc(100%);
  overflow-y: auto;

}

.button-notification {
  position: fixed;
  cursor: pointer;
  z-index: 999;
}

.chat-box-header {
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

  .custom-chat-box{
    right: 0;
    width: 95%;
    margin: 10px;
    bottom: 0;
  }

  .mobile-icon-hover {
    background-color: #f0f0f0 !important;
    color: #666666 !important;
  }
}
</style>
