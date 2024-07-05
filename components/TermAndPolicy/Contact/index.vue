<script setup lang="ts">
import { CONTACTS } from '~/constant/constains';
</script>

<template>
  <div class="contactBlockWrapper">
    <div class="divider" />

    <p class="title">Mọi vướng mắc, bạn vui lòng liên hệ với chúng tôi để được giải đáp:</p>

    <div class="addressBlock">
      <div v-for="(item, index) in CONTACTS" :key="index" class="contactItem">
        <CustomIcon :type="item.icon as any" />
        <p>{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("./index.scss");
</style>