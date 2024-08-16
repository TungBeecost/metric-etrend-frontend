<template>
  <div class="sidebar">
    <div v-for="item in TERM_AND_POLICIES" class="menuItem" :class="{ active: path.includes(item.link) }" @click="navigateTo(item.link)">
      <CustomIcon type="Docs" class="menuIcon" :is-custom-size="true" />
      <p class="menuLabel">{{ item.label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TERM_AND_POLICIES } from '~/constant/constains';
import { useRouter, useRoute } from 'vue-router';

const { path } = useRoute();
const router = useRouter();

function navigateTo(link: string) {
  router.push(link);
}
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>