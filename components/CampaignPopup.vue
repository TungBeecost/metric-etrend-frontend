<!-- components/CampaignPopup.vue -->
<template>
  <div v-if="showPopup" class="campaign-popup-overlay" @click="closePopup">
    <div class="campaign-popup" @click.stop>
      <img loading="lazy" :src="CAMPAIGN_IMG" alt="Campaign Image" @click="openCampaignUrl"/>
      <a-button class="close-button" @click="closePopup">
        Đóng
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import {useRoute} from 'vue-router';
import {storeToRefs} from 'pinia';
import {PLANS} from '~/constant/constains';

const {userInfo, showPopupCampaign} = storeToRefs(useCurrentUser());

const route = useRoute();

// Constants
const CAMPAIGN_CODE = 'campaign_t92024';
const CAMPAIGN_IMG = 'https://storage.googleapis.com/ereport-static/%5Bereport%5D%20campaign-q3-2024-fullhd-2.png';
const CAMPAIGN_URL = 'https://dangky.metric.vn/ereportoffer_300/?utm_source=website&utm_medium=ereport_t9&pub=popup';
const CAMPAIGN_END_DATE = '2024-09-31';

const showPopup = ref(false);

const closePopup = () => {
  showPopupCampaign.value = false;
  showPopup.value = false;
};

const openCampaignUrl = () => {
  window.open(CAMPAIGN_URL, '_blank');

  showPopupCampaign.value = false;
  showPopup.value = false;
};

const checkPopupVisibility = () => {
  const userPlan = PLANS.find(plan => plan.plan_code === userInfo.value?.current_plan?.plan_code);
  const isPaidUser = !!userPlan?.plan_code;

  if (!isPaidUser) {
    // get from session storage
    const isPopupClosed = !showPopupCampaign.value;
    const currentDate = new Date();
    const campaignEndDate = new Date(CAMPAIGN_END_DATE);
    if (!isPopupClosed && currentDate <= campaignEndDate) {
      showPopup.value = true;
    }
  }
};

onMounted(() => {
  setTimeout(() => {
    checkPopupVisibility();
  }, 1000);
});

watch(() => route.path, () => {
  checkPopupVisibility();
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
  cursor: pointer;
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
