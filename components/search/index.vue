<template>
  <div id="search_input" v-on-click-outside="setShowSuggestions" class="wrapper search-report-component">
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
        <CustomIcon type="Search" :is-custom-size="true"/>
      </template>
    </AInputSearch>

    <div v-if="suggestions && suggestions.length" class="suggestions" :class="{ active: isShowSuggestions }">
      <div v-for="(suggestion, index) in suggestions" :key="suggestion.name" class="suggestion-item"
           @click="handleSuggestionClick(suggestion.name, index)">
        <span v-if="index == 0" style="display: flex; align-items: center; gap: 8px">
          <img src="/icons/SearchOrange.svg" alt="search"/>
          Tìm báo cáo "{{ suggestion.name }}"
        </span>
        <span v-else> {{ suggestion.name }}</span>
        <span v-if="index > 0" style="color: #716B95; font-size: 14px">{{ REPORT_TYPE_DISPLAY_NAMES[suggestion.report_type] || '' }}</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {vOnClickOutside} from '@vueuse/components';
import {debounce} from "~/helpers/common";
import {NAVIGATIONS} from "~/constant/constains";
import slugify from 'slugify';

const props = defineProps<{
  handleSearch: (value: string) => Promise<any>,
  handleChange?: (value: string) => Promise<Array<any>>,
  placeholder?: string
}>()

const REPORT_TYPE_DISPLAY_NAMES: Record<string, string> = {
  report_product_line: "Nhóm hàng",
  report_brand: "Thương hiệu",
  report_category: "Ngành hàng",
};

const route = useRoute();

type Suggestion = {
  name: string;
  report_type: string;
};

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
const suggestions = useState<Array<Suggestion>>(() => []);
const setShowSuggestions = () => {
  isShowSuggestions.value = false;
}

const handleSearch = async (value: string) => {
  isShowSuggestions.value = false;
  if (props.handleSearch) {
    await props.handleSearch(value);
  }
}


const slugifyText = (text: string) => {
  return slugify(text, {
    lower: true,
    locale: 'vi'
  });
}

const handleSuggestionClick = async (suggestion: string, index: number) => {
  const slug = slugifyText(suggestion);
  searchValue.value = suggestion;
  isShowSuggestions.value = false;
  if(index > 0)
    navigateTo(`${NAVIGATIONS.home}${slug}`);
  else
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
        font-family: Inter, sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 32px; /* 160% */
        height: 56px;


      }
    }

    .ant-input-suffix{
      display: none;
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

@media screen and (max-width: 768px) {
  .search-report-component {
    .ant-input-group-wrapper {
      .ant-input-affix-wrapper {
        .ant-input {
          font-size: 16px;
          line-height: 24px;
          height: 32px;
        }
      }

      .ant-input-group-addon {
        button {
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
}
.suggestion-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>