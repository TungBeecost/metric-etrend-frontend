<template>
  <div v-on-click-outside="setShowSuggestions" class="wrapper">
    <!-- input -->
    <AInputSearch v-model:value="searchValue" :placeholder="placeholder || 'Tìm kiếm báo cáo'" size="large" allow-clear @change="onChange" @search="handleSearch(searchValue)"
      @press-enter="handleSearch(searchValue)" @focus="isShowSuggestions = true">
      <template #enterButton>
        <CustomIcon type="Search" />
      </template>
    </AInputSearch>

    <!-- suggestion -->
    <div v-if="suggestions" class="suggestions" :class="{ active: isShowSuggestions }">
      <div v-for="suggestion in suggestions" :key="suggestion" class="suggestion-item" @click="handleSuggestionClick(suggestion)">
        {{ suggestion }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { debounce } from "~/helpers/common";

const props = defineProps<{
  handleSearch: (value: string) => Promise<any>,
  handleChange?: (value: string) => Promise<Array<any>>,
  placeholder?: string
}>()

const route = useRoute();


const searchValue = useState<string>(() => route.query.search as string || "");
const isShowSuggestions = useState<boolean>(() => false);

const suggestions = useState<Array<string>>(() => []);
const setShowSuggestions = () => {
  isShowSuggestions.value = false;
}

const handleSuggestionClick = async (suggestion: string) => {
  searchValue.value = suggestion;
  isShowSuggestions.value = false;

  // call click action
  await props.handleSearch(suggestion);
}

const onChange = debounce(async () => {
  if (!props.handleChange) return;

  const result = await props.handleChange(searchValue.value);

  if (result) {
    suggestions.value = result;
  }
});

onMounted(() => {
  if (searchValue.value) {
    searchValue.value = "";
  }
})

</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>