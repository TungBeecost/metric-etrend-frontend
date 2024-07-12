<template>
  <div id="search_input" v-on-click-outside="setShowSuggestions" class="wrapper search-report-component">
    <!-- input -->
    <AInputSearch
        v-model:value="searchValue" :placeholder="placeholder || 'Tìm kiếm báo cáo'"
        size="large"
        allow-clear
        style="border: 1px solid #D7D1F9; padding: 8px;"
        @change="onChange"
        @search="handleSearch(searchValue)"
        @press-enter="handleSearch(searchValue)"
        @focus="isShowSuggestions = true"
    >
      <template #enterButton>
        <CustomIcon type="Search"/>
      </template>
    </AInputSearch>

    <!-- suggestion -->
    <div v-if="suggestions" class="suggestions" :class="{ active: isShowSuggestions }">
      <div v-for="suggestion in suggestions" :key="suggestion" class="suggestion-item"
           @click="handleSuggestionClick(suggestion)">
        {{ suggestion }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {vOnClickOutside} from '@vueuse/components';
import {debounce} from "~/helpers/common";

const props = defineProps<{
  handleSearch: (value: string) => Promise<any>,
  handleChange?: (value: string) => Promise<Array<any>>,
  placeholder?: string
}>()

const route = useRoute();

watch(() => route.query, (newQuery) => {
  if (newQuery.search) {
    searchValue.value = newQuery.search as string;
  } else {
    searchValue.value = '';
  }
});

onMounted(() => {
  if (route.query.search) {
    searchValue.value = route.query.search as string;
  } else {
    searchValue.value = '';
  }
});

const searchValue = useState<string>(() => route.query.search as string || "");
const isShowSuggestions = useState<boolean>(() => false);

const suggestions = useState<Array<string>>(() => []);
const setShowSuggestions = () => {
  isShowSuggestions.value = false;
}

const handleSearch = async (value: string) => {
  isShowSuggestions.value = false;

  if (props.handleSearch) {
    await props.handleSearch(value);
  }
}

const handleSuggestionClick = async (suggestion: string) => {
  searchValue.value = suggestion;
  isShowSuggestions.value = false;

  // call click action
  await props.handleSearch(suggestion);
}

const onChange = debounce(async (showSuggestions = true) => {
  if (!props.handleChange) return;

  const result = await props.handleChange(searchValue.value);
  isShowSuggestions.value = showSuggestions;
  if (result) {
    suggestions.value = result;
  }
}, 300);

onMounted(() => {
  onChange(false); // Call onChange with false to not show suggestions
});
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>

<style lang="scss">
.search-report-component {
  .ant-input-group-wrapper {
    border-radius: var(--radius-md, 8px);
    border: 1px solid var(--Dark-blue-dark-blue-3, #D7D1F9);
    background: var(--Neutral-neutral-1, #FFF);

    .ant-input-affix-wrapper {
      border: none;
      padding-top: 0;
      padding-bottom: 0;

      &:focus, &.ant-input-affix-wrapper-focused {
        box-shadow: none;
      }

      .ant-input {
        color: var(--Dark-blue-dark-blue-8, #241E46);

        /* Body/Body Text 1 */
        font-family: Inter, sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 32px; /* 160% */

        height: 56px;

      }
    }

    .ant-input-group-addon {
      button {
        width: 56px;
        height: 56px;

        border-radius: 4px !important;
      }
    }
  }

}
</style>