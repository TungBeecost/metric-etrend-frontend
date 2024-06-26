<script lang="ts" setup>
import type { Search } from '../../.nuxt/components';
import { NAVIGATIONS } from '../../helpers/constains';

const route = useRoute();

const { fetchSearch, fetchSuggest } = useSearchReport();

const onSearch = async (searchValue: string) => {
  // for case delete search value
  if (searchValue === "") return;

  if (!route.path.includes("/search")) {
    navigateTo(`${NAVIGATIONS.search}?search=${searchValue}`);
    return;
  }

  const result = await fetchSearch(searchValue);
  console.log(result);


  // action show result here
};

</script>

<template>
  <Search :handle-search="onSearch" :handle-change="fetchSuggest" />
</template>
