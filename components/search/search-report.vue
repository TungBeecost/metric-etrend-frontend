<script lang="ts" setup>
import type { Search } from '#components';
import { NAVIGATIONS } from '~/constant/constains';

const props = defineProps<{
  handleSearch?: (searchValue: string) => Promise<void>,
}>()

const route = useRoute();

const {fetchSuggest} = useSearchReport();


const onSearch = async (searchValue: string) => {
  if (!route.path.includes("/search")) {
    navigateTo(`${NAVIGATIONS.search}?search=${searchValue}`);
    return;
  } else {
    navigateTo(`${NAVIGATIONS.search}?search=${searchValue}`);
  }
  if (props.handleSearch) await props.handleSearch(searchValue);

};


</script>

<template>
  <Search :handle-search="onSearch" :handle-change="fetchSuggest" />
</template>