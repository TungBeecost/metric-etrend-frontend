<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const redirectToSearch = () => {
  const hash = route.hash;
  const params = new URLSearchParams(hash.replace('#', ''));
  const categoryReportId = params.get('id');

  if (categoryReportId) {
    router.replace(`/search?category_report_id=${categoryReportId}`);
  }
};

onMounted(() => {
  redirectToSearch();
});
</script>

<template>

</template>

<style scoped lang="scss">

</style>