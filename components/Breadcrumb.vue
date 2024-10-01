<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="breadcrumb.value"
          itemprop="name"
      >
        <nuxt-link
            v-if="index < breadcrumbs.length - 1"
            :to="`/${breadcrumb.value}`"
            itemprop="url"
        >
          {{ breadcrumb.name }}
        </nuxt-link>
        <span v-else
              :style="{'color': '#E85912'}"
        >{{ breadcrumb.name }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<style>
</style>

<style>
</style>