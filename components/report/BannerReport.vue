<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    default: "",
  }
});
</script>

<template>
  <div class="banner">
      <div class="title">
        {{props.title}}
      </div>
  </div>
</template>

<style scoped lang="scss">
.banner{
    .title{
      font-size: 44px;
      color: white;
      font-weight: bold;
      padding: 80px 100px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      background: linear-gradient(90deg, #241E46 0%, rgba(36, 30, 70, 0.00) 100%), url(/images/ecommerce_1.png) no-repeat;
      background-size: cover;
      height: 217px;
    }
}

@media (max-width: 1023px) {
  .banner{
    .title{
      font-size: 36px;
      padding: 40px 16px;
      height: 108px;
    }
  }
}
</style>