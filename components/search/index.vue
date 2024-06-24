<template>
  <div v-on-click-outside="setShowSuggestions" class="wrapper">
    <!-- input -->
    <AInputSearch v-model:value="searchValue" class="" placeholder="Tìm kiếm báo cáo" :size="device.isDesktop ? 'large' as any : 'default' as any" allow-clear @change="onChange" @search="onSearch"
      @press-enter="onSearch" @focus="isShowSuggestions = true">
      <template #enterButton>
        <SearchSearchIcon />
      </template>
    </AInputSearch>

    <!-- suggestion -->
    <div v-if="suggestions?.length" class="suggestions" :class="{ active: isShowSuggestions }">
      <div v-for="suggestion in suggestions" :key="suggestion" class="suggestion-item" @click="handleSuggestionClick(suggestion)">
        {{ suggestion }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { NAVIGATIONS } from "~/helpers/constains.js"

const props = defineProps<{
  handleSearch: (value: string) => Promise<any>
}>()

const device = useDevice();
const route = useRoute();

const suggestions = useState(() => ["asd", "asddfg", "asddfg"]);

const searchValue = useState(() => route.query.search as string || "");
const isShowSuggestions = useState(() => false);

const setShowSuggestions = () => {
  isShowSuggestions.value = false;
}

const { handleSuggest } = useSearchReport();

const onSearch = async () => {
  if (!route.path.includes("/search")) {
    navigateTo(`${NAVIGATIONS.search}?search=${searchValue}`);
    return;
  }

  await props.handleSearch(searchValue.value);
};

const onChange = async () => {
  const result = await handleSuggest(searchValue.value);
  if (result?.length) {
    suggestions.value = result;
  }
};

const handleSuggestionClick = async (suggestion: string) => {
  searchValue.value = suggestion;
  isShowSuggestions.value = false;

  // call click action
  onSearch();
}

</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>