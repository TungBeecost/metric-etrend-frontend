<script setup lang="ts">

</script>

<template>
  <div class="banner">
      <div class="title">
        <div class="content default_section">Danh sách báo cáo</div>
      </div>
  </div>
</template>

<style scoped lang="scss">
.banner{
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 217px;
    .title{
      padding: 80px 0;
      background: linear-gradient(90deg, #241E46 0%, rgba(36, 30, 70, 0.00) 100%), url(/images/ecommerce_1.png) no-repeat;
      background-size: cover;

      .content{
        font-size: 44px;
        color: white;
        font-weight: bold;
      }
    }
}

@media (max-width: 767px) {
  .banner{
    height: 112px;
    .title{
      height: 108px;
      padding: 40px 16px;
      .content{
        font-size: 30px;
      }
    }
  }
}
</style>