<script lang="ts" setup>
// import type { Search } from '../../.nuxt/components';
import { NAVIGATIONS } from '~/constant/constains';

const props = defineProps<{
  handleSearch?: (searchValue: string) => Promise<void>
}>()

const route = useRoute();

const { fetchSuggest } = useSearchReport();

const onSearch = async (searchValue: string) => {
  // for case delete search value
  if (searchValue === "") return;

  if (!route.path.includes("/search")) {
    navigateTo(`${NAVIGATIONS.search}?search=${searchValue}`);
    return;
  }

  // handle search action here
  if (props.handleSearch) await props.handleSearch(searchValue);
};

</script>

<template>
  <Search :handle-search="onSearch" :handle-change="fetchSuggest" />
</template>
