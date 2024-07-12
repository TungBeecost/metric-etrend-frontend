<script setup lang="ts">
import { WALLET } from "~/constant/constains";
import { ref } from 'vue';

const value = ref('');
const emit = defineEmits(['selectedOption']);

watch(value, (newValue) => {
  console.log('newValue', newValue);
  emit('selectedOption', newValue);
});
</script>

<template>
  <div id="option_payment" class="border statistic-block">
    <div class="statistic-item__title">
      <div class="title">
        <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="32" rx="4" fill="#EEEBFF"/>
        </svg>
        <div class="title_content">Hình thức thanh toán</div>
      </div>
    </div>
    <div class="statistic-item__content">
      <div class="content">
        Lựa chọn một trong những cổng thanh toán dưới đây để nhận mã QR
      </div>
      <div class="option">
        <a-radio-group v-model:value="value" style="display: flex; gap: 64px" name="radioGroup">
          <a-radio v-for="wallet in WALLET" :key="wallet.code" :style="{ border: wallet.code === value ? '1px solid #E85912' : '1px solid #EEEBFF', borderRadius: '12px', padding: '0 12px', alignItems: 'center', display: 'flex' }" :value="wallet.code">
            <img style="width: 100px; height: 100px" :src="wallet.thumbnail" alt="icon" />
          </a-radio>
        </a-radio-group>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#option_payment{
  display: flex;
  flex-direction: column;
  background-color: #FFF;
  .statistic-item__title{
    display: flex;
    border-radius: 16px 16px 0 0;
    border: 1px solid #EEEBFF;
    padding: 24px;

    .title{
      display: flex;
      gap: 16px;
      align-items: center;

      .title_content{
        font-size: 24px;
        line-height: 38px;
        font-weight: bold;
      }
    }
  }

  .statistic-item__content{
    display: flex;
    flex-direction: column;
    border-radius: 0 0 16px 16px;
    border: 1px solid #EEEBFF;
    padding: 24px;

    .content{
      font-size: 14px;
      line-height: 22px;
      color: #716B95;
    }

    .option{
      display: flex;
      align-items: flex-start;
      padding: 16px 0;
    }
  }
}
</style>
<style lang="scss">
#option_payment{
  .ant-radio-inner{
    background-color: #FFF;
  }

  .ant-radio-inner::after{
    background-color: #e85912;
  }
}
</style>