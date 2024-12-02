<script setup lang="ts">
const redirectToGoogleDoc = () => {
  window.location.href = 'https://kiem1ty.metric.vn/';
};
</script>

<template>
  <div class="affiliate">
    <div class="container default_section">
      <div class="title">Tăng thu nhập 1 tỷ ngay trong Tháng 12</div>
      <div class="content">Chương trình mừng ra mắt Metric eReport dịp cuối năm 2024</div>
    </div>
    <div class="button">
      <a-button style="width: 386px; height: 64px; background: #241E46; border-radius: 8px; font-size: 20px;
                color: #FFF; font-weight: 600; line-height: 28px; border: 1px #241E46"
                @click="redirectToGoogleDoc"
      >
        Đăng ký ngay
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.affiliate{
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  background: linear-gradient(90deg, #FF6931 1.09%, #FF9839 49.34%);

  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .title{
      color: var(--Neutral-neutral-1, #FFF);
      text-align: center;
      font-size: 40px;
      font-weight: 700;
      line-height: 56px;
    }

    .content{
      color: var(--Neutral-neutral-2, #F5F5F5);
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
  }
}

@media (max-width: 767px) {
  .affiliate{
    padding: 40px 20px;
  }
  .content{
    text-align: center;
  }
}
</style>