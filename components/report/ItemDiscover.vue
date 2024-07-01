<script setup lang="ts">
const {image, title} = defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="item_discover">
    <div class="image">
      <img :src="image" alt="">
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<style scoped lang="scss">
.item_discover{
  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 24px;

  border: 1px solid #EEEBFF;
  border-radius: 8px;
  background: #FFF;

  cursor: pointer;

  .image {
    width: 40px;
    height: 40px;

    img {
      width: 100%;
    }
  }

  .title {
    font-size: 20px;
  }
}
</style>
