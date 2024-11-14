<template>
  <div v-if="plan" class="plan-card" :style="planCardStyle">
    <div class="plan-card-info">
      <div class="plan-info">
        <div v-html="plan.svg"></div>
        <div>
          <div class="plan_info_name">{{ plan.name }}</div>
          <div class="plan_info_description">{{ plan.description }}</div>
        </div>
      </div>
      <div class="button" :style="buttonStyle" @click="navigateToPricing">
        <span :style="textColor">{{ plan.textButton }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Plan {
  code: string;
  name: string;
  description: string;
  background: string;
  backgroundButton: string;
  textColor: string;
  textButton: string;
  textColorButton: string;
  svg: string;
}

const router = useRouter();

const props = defineProps<{
  plan: Plan;
}>();

const planCardStyle = computed(() => ({
  background: props.plan.background,
  color: props.plan.textColor
}));

const buttonStyle = computed(() => ({
  background: props.plan.backgroundButton,
}));

const textColor = computed(() => ({
  color: props.plan.textColorButton
}));

const navigateToPricing = () => {
  router.push('/pricing');
};
</script>

<style scoped>
.plan-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  align-items: flex-start;
  border-radius: 16px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.07);
}

.plan-card-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.plan-info {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: 16px;
}

.plan_info_name {
  font-size: 20px;
  font-weight: bold;
  line-height: 28px;
}

.plan_info_description {
  font-size: 16px;
  line-height: 24px;
}

.button {
  display: flex;
  padding: 9px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 40px;
  border-radius: 8px;
  width: 100%;
}

.button span {
  text-align: center;
  color: #FFF;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
}
</style>
