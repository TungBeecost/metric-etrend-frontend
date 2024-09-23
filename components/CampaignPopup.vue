<!-- components/CampaignPopup.vue -->
<template>
  <div v-if="showPopup" class="campaign-popup-overlay" @click="closePopup">
    <div class="campaign-popup" @click.stop>
      <img :src="CAMPAIGN_IMG" alt="Campaign Image"/>
      <a-button class="close-button" @click="closePopup">
        Đóng
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Constants
const CAMPAIGN_CODE = 'campaign_t92024';
const CAMPAIGN_IMG = 'https://storage.googleapis.com/ereport-static/%5Bereport%5D%20campaign-q3-2024-fullhd.png';
const CAMPAIGN_END_DATE = '2024-09-31';

const showPopup = ref(false);

const closePopup = () => {
  localStorage.setItem(CAMPAIGN_CODE, 'true');
  showPopup.value = false;
};

onMounted(() => {
  const isPopupClosed = localStorage.getItem(CAMPAIGN_CODE) === 'true';
  const currentDate = new Date();
  const campaignEndDate = new Date(CAMPAIGN_END_DATE);

  if (!isPopupClosed && currentDate <= campaignEndDate) {
    showPopup.value = true;
  }
});
</script>

<style scoped>
.campaign-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.campaign-popup {
  position: relative;
  width: 90%;
  max-height: 90%;
  max-width: 750px;
}

.campaign-popup img {
  width: 100%;
  border-radius: 10px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>