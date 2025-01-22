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
      <div
          v-for="(suggestion, index) in suggestions" :key="suggestion.name" class="suggestion-item"
          @click="handleSuggestionClick(suggestion, index)"
          :style="{ display: index == 0 && !searchKeyWord ? 'none' : 'flex' }"
      >
        <span v-if="index == 0 && searchKeyWord" style="display: flex; align-items: center; gap: 8px">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Icon/Outline/Search">
                  <path id="Vector"
                        d="M14 24C19.5228 24 24 19.5228 24 14C24 8.47715 19.5228 4 14 4C8.47715 4 4 8.47715 4 14C4 19.5228 8.47715 24 14 24Z"
                        stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path id="Vector_2" d="M21.0713 21.0713L28 28" stroke="#E85912" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"/>
              </g>
          </svg>
          Tìm báo cáo "{{ searchKeyWord }}"
        </span>
        <span v-else> {{ suggestion.report_type === 'report_brand' ? `Thương hiệu ${upperFirst(suggestion.name)}` : upperFirst(suggestion.name) }}</span>
        <span v-if="index > 0" style="color: #716B95; font-size: 14px">{{
            REPORT_TYPE_DISPLAY_NAMES[suggestion.report_type] || ''
          }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {vOnClickOutside} from '@vueuse/components';
import {debounce} from "~/helpers/common";
import {NAVIGATIONS} from "~/constant/constains";
import slugify from 'slugify';
import {upperFirst} from "scule";
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";

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
const searchKeyWord = ref<string>('');
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
  trackEventCommon(EVENT_TYPE.CLICK_RELATED_REPORT, 'related_report', '');
  const {name, report_type} = suggestion;
  const slug = report_type === 'report_brand' ? `thuong-hieu-${slugifyText(name)}` : slugifyText(name);
  searchValue.value = name;
  isShowSuggestions.value = false;
  const path = ['report_product_line', 'report_category', 'report_brand', 'report_shop', 'report_brand_keyword'].includes(report_type) ? slug : `insight/${slug}`;
  if (index > 0)
    navigateTo(`${NAVIGATIONS.home}${path}`);
  else
    await props.handleSearch(name);
}

watch(searchValue, async (newValue) => {
  searchKeyWord.value = newValue;
});

const onChange = debounce(async (showSuggestions = true) => {
  if (!props.handleChange) return;
  const result = await props.handleChange(searchValue.value);
  isShowSuggestions.value = showSuggestions;
  if (result) {
    suggestions.value = [{name: searchKeyWord.value, report_type: '', source: ''}, ...result];
  }
}, 300);

onMounted(() => {
  onChange(false);
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

    .ant-input-suffix {
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

.suggestion-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>