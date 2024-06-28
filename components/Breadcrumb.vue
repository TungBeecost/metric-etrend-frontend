<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
});
console.log(props.breadcrumbs);
</script>

<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item
          v-for="breadcrumb in breadcrumbs"
          :key="breadcrumb.value"
          itemprop="name"
      >
        <nuxt-link
            v-if="breadcrumb.value"
            :to="`/${breadcrumb.value}`"
            itemprop="url"
        >
          {{ breadcrumb.name }}
        </nuxt-link>
        <span v-else>{{ breadcrumb.name }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<style>
</style>

<style>
</style>