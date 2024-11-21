<script setup lang="ts">
import BannerReport from "~/components/report/BannerReport.vue";
import {onUnmounted, ref, watchEffect} from 'vue';
import SortReport from "~/components/report/SortReport.vue";
import ListReport from "~/components/report/ListReport.vue";
import FilterReport from "~/components/report/FilterReport.vue";
import PopularRelateKeywords from "~/components/report/PopularRelateKeywords.vue";
import MaybeInterested from "~/components/report/MaybeInterested.vue";
import type SearchReport from "~/components/search/search-report.vue";
import type {LstRecommed, SearchReportRes} from "~/services/reports";
import {NAVIGATIONS, PAGE_TITLES} from "~/constant/constains";
import allReports from '@/public/file_json/list_category.json';
import {useSearchReport} from "#imports";

interface TagSuggestion {
  name: string;
  report_type: string;
}

const {fetchSearch, fetchListRecommend, fetchSuggest} = useSearchReport()
const route = useRoute();
const router = useRouter();
const data = ref<SearchReportRes | null>(null);
const listRecommend = ref<LstRecommed[] | null>(null);
const listTagSuggestions = ref<TagSuggestion[]>([]);
const displaySortReport = ref(false);
const isModalVisible = ref(false);
const selectedCategory = ref<string>();
const selectedCategoryName = ref<string>();
const searchValueSearch = ref<string>();
const selecteReportType = ref<string[]>([]);
const selecteReportTypeBuy = ref<string[]>([]);
const page = ref(1);
const isLoading = ref(true);
const sortSelect = ref('popularity');
const mostFrequentCategoryReportId = ref<string>();

watchEffect(async () => {
  selectedCategory.value = '';
  if (searchValueSearch.value) {
    await handleSearch(searchValueSearch.value);
  }
  if (mostFrequentCategoryReportId.value) {
    await fetchDataRecommend(mostFrequentCategoryReportId.value);
  }
  if (searchValueSearch.value) {
    await fetchTagSuggest(searchValueSearch.value);
  }
});

const handleCategorySelect = (newSelectedCategory: string) => {
  selectedCategory.value = newSelectedCategory;
  searchValueSearch.value = '';
  listTagSuggestions.value = [];
  const category = allReports.find(cat => cat.value === newSelectedCategory);
  selectedCategoryName.value = category ? category.label : '';
  const slugNameCategory = generateSlug(selectedCategoryName.value);
  const lstCategoryReportId = selectedCategory.value ? [selectedCategory.value] : [];
  navigateTo(`${NAVIGATIONS.category}/${slugNameCategory}#id=${newSelectedCategory}`);
  handleSearch(searchValueSearch.value, lstCategoryReportId);
};

const handleSortSelect = async (sortChange: string) => {
  sortSelect.value = sortChange;
  console.log(selectedCategory.value);
  if (route.query.category_report_id && typeof route.query.category_report_id === 'string') {
    await fetchData(searchValueSearch.value, [route.query.category_report_id], sortChange, page.value);
  } else {
    await fetchData(searchValueSearch.value, [], sortChange, page.value);
  }
};

const handleTagClick = async (tag: string) => {
  searchValueSearch.value = tag;
  await handleSearch(tag);
  navigateTo(`${NAVIGATIONS.search}?search=${tag}`);
};

if (typeof window !== 'undefined') {
  displaySortReport.value = window.matchMedia('(min-width: 768px)').matches; // change the value directly

  watchEffect(() => {
    const mediaQueryList = window.matchMedia('(min-width: 768px)');
    const listener = (event: MediaQueryListEvent) => {
      displaySortReport.value = event.matches;
    };
    mediaQueryList.addEventListener('change', listener);
    onUnmounted(() => {
      mediaQueryList.removeEventListener('change', listener);
    });
  });
}

const fetchTagSuggest = async (value: string) => {
  console.log('fetchTagSuggest', value);
  try {
    const result = await fetchSuggest(value);
    if (result.length) {
      listTagSuggestions.value = result;
    } else {
      listTagSuggestions.value = [];
    }
  } catch (e) {
    console.error(e);
  }
};

const fetchData = async (searchValue: string = '', list_category_report_id: Array<string> = [], sortSelect: string, newpage: number = 1) => {
  try {
    current.value = newpage;
    isLoading.value = true;
    const result = await fetchSearch(searchValue, {
      'lst_year': [],
      'lst_category_report_id': list_category_report_id,
      'lst_field': ["name", "slug", "url_thumbnail", "revenue_monthly", "gr_quarter", "shop"],
      'offset': ((newpage - 1) * 10 >= 200) ? 199 : (newpage - 1) * 10,
      'limit': 10,
      'sort': sortSelect,
      'source': selecteReportTypeBuy.value.length > 0 ? selecteReportTypeBuy.value : [],
      'lst_report_type': selecteReportType.value.length > 0 ? selecteReportType.value : []
    });

    if (Array.isArray(result) && result.length === 0) {
      data.value = null;
    } else if (result) { // Add null check here
      data.value = result;
      isLoading.value = false;

      const count: Record<string, number> = {};

      result.lst_report.forEach(report => {
        if (report.category_report_id in count) {
          count[report.category_report_id]++;
        } else {
          count[report.category_report_id] = 1;
        }
      });
      mostFrequentCategoryReportId.value = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
    }
  } catch (e) {
    isLoading.value = false;
    console.error(e);
  }
};

const fetchDataRecommend = async (category_report_id: string) => {
  try {
    if (category_report_id == 'null') {
      category_report_id = 'c1191689230';
    }
    console.log('fetchDataRecommend', category_report_id);
    const result = await fetchListRecommend(category_report_id);
    if (result !== null) {
      listRecommend.value = result;
    } else {
      listRecommend.value = [];
    }
  } catch (e) {
    console.error(e);
  }
}

const clickButtonFilter = () => {
  isModalVisible.value = true;
};

const handleOk = () => {
  isModalVisible.value = false;
};

const handleCancel = () => {
  isModalVisible.value = false;
};

const handleSearch = async (searchValue: string, lstCategoryReportId: string[] = []) => {
  searchValueSearch.value = searchValue;
  selectedCategory.value = '';
  current.value = 1;
  await fetchData(searchValueSearch.value, lstCategoryReportId, sortSelect.value, page.value);
};

const current = ref(1);
const onChange = async (page: number) => {
  console.log('onChange', page);
  current.value = page
  if (route.query.category_report_id && typeof route.query.category_report_id === 'string') {
    selectedCategory.value = route.query.category_report_id;
  }
  const lstCategoryReportId = selectedCategory.value ? [selectedCategory.value] : [];
  await fetchData(searchValueSearch.value, lstCategoryReportId, sortSelect.value, page);
};

onMounted(() => {
  const list_category_report_id = [];
  if (route.query.category_report_id && typeof route.query.category_report_id === 'string') {
    list_category_report_id.push(route.query.category_report_id);
    selectedCategory.value = route.query.category_report_id;
  }
  if (route.query.search && typeof route.query.search === 'string') {
    searchValueSearch.value = route.query.search;
  } else {
    searchValueSearch.value = '';
  }
  if (route.query.report_type && typeof route.query.report_type === 'string') {
    selecteReportType.value = [route.query.report_type];
  }
  if (route.query.price_type && typeof route.query.price_type === 'string') {
    selecteReportTypeBuy.value = [route.query.price_type];
  }
  fetchData(searchValueSearch.value, list_category_report_id, sortSelect.value, page.value);
});

const onClickViewPrice = () => {
  navigateTo(NAVIGATIONS.pricing);
};

function generateSlug(categoryName: string): string {
  const vietnameseMap: { [key: string]: string } = {
    'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a', 'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
    'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a', 'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
    'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e', 'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
    'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o', 'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
    'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o', 'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
    'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u', 'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
    'đ': 'd'
  };

  return categoryName
      .toLowerCase()
      .trim()
      .replace(/[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/g, match => vietnameseMap[match])
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
}

const handleReportTypeChange = async (selectedReportType: string[]) => {
  selecteReportType.value = selectedReportType;
  const list_category_report_id = [];
  if (route.query.category_report_id && typeof route.query.category_report_id === 'string') {
    list_category_report_id.push(route.query.category_report_id);
    selectedCategory.value = route.query.category_report_id;
  }
  await fetchData(searchValueSearch.value, list_category_report_id, sortSelect.value, page.value);
};

const handleReportTypeBuyChange = async (selectedReportTypeBuy: string[]) => {
  if (selectedReportTypeBuy.includes('other')) {
    selectedReportTypeBuy = [];
  }
  const index = selectedReportTypeBuy.indexOf('other');
  if (index !== -1) {
    selectedReportTypeBuy.splice(index, 1);
    selectedReportTypeBuy.push('marketing');
  }
  const list_category_report_id = [];
  if (route.query.category_report_id && typeof route.query.category_report_id === 'string') {
    list_category_report_id.push(route.query.category_report_id);
    selectedCategory.value = route.query.category_report_id;
  }
  selecteReportTypeBuy.value = selectedReportTypeBuy;
  await fetchData(searchValueSearch.value, list_category_report_id, sortSelect.value, page.value);
};
useSeoMeta({
  title: PAGE_TITLES.search
})
</script>

<template>
  <banner-report/>
  <div id="search_report">
    <div class="sectionTitle default_section">
      <div class="sectionContent searchContent">
        <SearchReport class="default_section" :handle-search="handleSearch"/>
      </div>
    </div>
    <div class="container-metric default_section">
      <div class="list_report_industry">
        <div class="general">
          <div v-if="route.query.category_report_id && selectedCategoryName" class="sectionTitle_content">
            Kết quả tìm kiếm cho ngành hàng <b>"{{ selectedCategoryName }}"</b>
          </div>
          <div v-if="route.query.search && searchValueSearch" class="sectionTitle_content">
            Kết quả tìm kiếm cho từ khoá <b>"{{ searchValueSearch }}"</b>
          </div>
          <sort-report v-if="displaySortReport" class="sort_report" @sort-select="handleSortSelect"/>
          <a-button v-else style="border: 1px solid #9D97BF" @click="clickButtonFilter">
            <div style="display: flex; gap: 8px; justify-content: center; align-items: center">
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4202_14089)">
                  <path
                      d="M8 4.375C8 5.41053 8.83947 6.25 9.875 6.25C10.9105 6.25 11.75 5.41053 11.75 4.375C11.75 3.33947 10.9105 2.5 9.875 2.5C8.83947 2.5 8 3.33947 8 4.375Z"
                      stroke="#241E46"
                      stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path
                      d="M11.75 10C11.75 11.0355 12.5895 11.875 13.625 11.875C14.6605 11.875 15.5 11.0355 15.5 10C15.5 8.96447 14.6605 8.125 13.625 8.125C12.5895 8.125 11.75 8.96447 11.75 10Z"
                      stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path
                      d="M5.5 15.625C5.5 16.6605 6.33947 17.5 7.375 17.5C8.41053 17.5 9.25 16.6605 9.25 15.625C9.25 14.5895 8.41053 13.75 7.375 13.75C6.33947 13.75 5.5 14.5895 5.5 15.625Z"
                      stroke="#241E46" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17.375 4.375L11.75 4.375" stroke="#241E46" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M17.375 15.625L9.25 15.625" stroke="#241E46" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M17.375 10L15.5 10" stroke="#241E46" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M8 4.375L3.625 4.375" stroke="#241E46" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M5.5 15.625L3.625 15.625" stroke="#241E46" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M11.75 10L3.625 10" stroke="#241E46" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_4202_14089">
                    <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                </defs>
              </svg>
              Bộ lọc
            </div>
          </a-button>
        </div>
        <template v-if="isLoading">
          <a-card v-for="i in Array.from({ length: 6 })" style="margin-bottom: 24px;">
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
              <div style="width: 180px; height: 160px; background: #efefef; border-radius: 8px;"/>
              <a-skeleton :paragraph="{ rows: 2 }" active style="flex: 1;"/>
            </div>
          </a-card>
        </template>
        <div v-else-if="!data?.lst_report.length">
          <div style="text-align: center; padding-top: 40px;">
            <svg style="margin-bottom: 24px;" width="176" height="167" viewBox="0 0 176 167" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M0.679222 117.19C4.04664 133.158 13.4044 138.068 20.9491 136.254C35.5394 132.746 71.8187 132.485 104.947 154.781C148.823 184.312 164.715 154.791 155.309 120.262C145.903 85.7336 146.623 52.6896 167.406 38.2178C188.188 23.746 170.296 -8.12391 124.251 13.2076C94.4954 26.9928 75.9174 19.3078 66.4972 12.1457C57.619 5.39466 47.6848 -1.78173 36.7468 0.397909C23.4745 3.04337 16.6498 12.7989 31.1181 40.034C51.621 78.6288 -6.86871 81.3966 0.679222 117.19Z"
                  fill="#FDEBE9"/>
              <mask id="mask0_7857_5359" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="49" y="84" width="91"
                    height="70">
                <path
                    d="M72.9488 85.6851L71.4821 84.4482L60.0266 84.8201L49.9637 135.046C49.8891 135.417 49.8882 135.798 49.9612 136.169C50.0341 136.54 50.1794 136.893 50.3887 137.208C50.5981 137.522 50.8674 137.793 51.1813 138.003C51.4951 138.214 51.8474 138.361 52.218 138.435L125.55 153.127C125.92 153.202 126.301 153.203 126.672 153.13C127.043 153.057 127.395 152.912 127.71 152.702C128.024 152.493 128.294 152.223 128.503 151.909C128.713 151.595 128.859 151.242 128.932 150.872L139.657 97.3735L131.499 99.715C131.499 99.715 123.425 95.4336 122.115 94.605L105.088 98.5418L93.5745 86.9142L78.8073 90.6016L72.9488 85.6851Z"
                    fill="#F1584B"/>
              </mask>
              <g mask="url(#mask0_7857_5359)">
                <path
                    d="M72.9488 85.6851L71.4821 84.4482L60.0266 84.8201L49.9637 135.046C49.8891 135.417 49.8882 135.798 49.9612 136.169C50.0341 136.54 50.1794 136.893 50.3887 137.208C50.5981 137.522 50.8674 137.793 51.1813 138.003C51.4951 138.214 51.8474 138.361 52.218 138.435L125.55 153.127C125.92 153.202 126.301 153.203 126.672 153.13C127.043 153.057 127.395 152.912 127.71 152.702C128.024 152.493 128.294 152.223 128.503 151.909C128.713 151.595 128.859 151.242 128.932 150.872L139.657 97.3735L131.499 99.715C131.499 99.715 123.425 95.4336 122.115 94.605L105.088 98.5418L93.5745 86.9142L78.8073 90.6016L72.9488 85.6851Z"
                    fill="#F8A7A1"/>
              </g>
              <mask id="mask1_7857_5359" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="64" y="0" width="93"
                    height="81">
                <path
                    d="M138.58 0.811866L66.3387 20.1399C65.6024 20.3388 64.9748 20.8209 64.5928 21.481C64.2109 22.1411 64.1057 22.9256 64.3003 23.663L79.5674 80.7228L88.9916 74.6016L91.4038 75.2908L98.922 77.4419L98.929 77.4402L110.152 67.3232L126.632 72.9417L139.581 61.8246L151.393 62.3264L156.365 56.1353L142.108 2.84168C141.908 2.10523 141.425 1.47798 140.763 1.09748C140.102 0.716976 139.317 0.614269 138.58 0.811866V0.811866Z"
                    fill="#F1584B"/>
              </mask>
              <g mask="url(#mask1_7857_5359)">
                <path
                    d="M138.926 0.931985L85.9311 15.6834C82.6843 16.5872 79.9422 18.7594 78.3219 21.7146C76.3397 25.3299 73.5985 30.328 71.6348 33.9033C70.0666 36.7583 69.6306 40.1181 70.4281 43.2763L79.9141 80.8429L89.3383 74.7217L91.7505 75.4109L99.2687 77.5621L99.2757 77.5603L110.498 67.4433L126.979 73.0618L139.928 61.9447L151.74 62.4465L156.712 56.2554L142.454 2.9618C142.255 2.22534 141.771 1.5981 141.11 1.2176C140.449 0.837094 139.663 0.734388 138.926 0.931985Z"
                    fill="#F8A7A1"/>
                <rect x="92.5215" y="40.8783" width="49.5413" height="5.56251"
                      transform="rotate(-16.7018 92.5215 40.8783)" fill="white"/>
                <rect x="117.686" y="45.6041" width="27.2876" height="5.56251"
                      transform="rotate(-16.7018 117.686 45.6041)" fill="white"/>
                <rect x="96.4724" y="27.6482" width="42.8792" height="5.56251"
                      transform="rotate(-15.9895 96.4724 27.6482)" fill="white"/>
              </g>
              <path
                  d="M62.1361 61.2764C61.8395 61.5485 61.4489 61.695 61.0465 61.6849C60.6441 61.6749 60.2613 61.5092 59.9786 61.2226L49.119 50.6405C48.4703 50.0083 48.4549 48.9811 49.0853 48.3808L49.9638 47.544C50.5939 46.9438 51.6164 47.0119 52.2125 47.6941L62.1936 59.113C62.4645 59.4116 62.6097 59.8032 62.599 60.2063C62.5883 60.6093 62.4225 60.9926 62.1361 61.2764V61.2764Z"
                  fill="#FBCECA"/>
              <path
                  d="M58.4117 67.5263C58.3574 67.6441 58.2804 67.75 58.1852 67.8381C58.09 67.9261 57.9783 67.9945 57.8566 68.0394C57.7349 68.0843 57.6056 68.1048 57.476 68.0997C57.3464 68.0946 57.2191 68.064 57.1013 68.0097L48.0602 64.0448C47.8017 63.9337 47.598 63.7244 47.4936 63.4631C47.3893 63.2018 47.393 62.9097 47.5038 62.6511L47.8338 61.9216C47.8914 61.7973 47.9741 61.6863 48.0768 61.5956C48.1794 61.5049 48.2998 61.4365 48.4302 61.3946C48.5606 61.3528 48.6983 61.3384 48.8346 61.3524C48.9708 61.3665 49.1027 61.4086 49.2218 61.4762L57.9334 66.1703C58.1689 66.2949 58.3489 66.5036 58.4375 66.7548C58.5262 67.0061 58.5169 67.2815 58.4117 67.5263V67.5263Z"
                  fill="#FBCECA"/>
              <path
                  d="M59.876 74.1075C60.0222 74.9393 59.3148 75.7377 58.2723 75.9174L39.7621 79.1085C38.6563 79.299 37.6056 78.7226 37.4505 77.8404L37.2345 76.6106C37.0795 75.7285 37.8827 74.8953 39.0013 74.7786L57.7275 72.8172C58.7822 72.7063 59.7299 73.2758 59.876 74.1075Z"
                  fill="#FBCECA"/>
            </svg>
            <div>
              <div style="font-size: 24px; font-weight: bold; margin-bottom: 40px;">Không có kết quả</div>
              <div v-if="searchValueSearch">
                <div style="margin-bottom: 16px; color: #716B95;">Phân tích thông minh với từ khoá <span
                    style="color: #241E46">"{{ searchValueSearch }}"</span></div>
                <a-button
                    type="primary"
                    size="large"
                    @click="router.push(`${NAVIGATIONS.smart_analytic}?keyword=${searchValueSearch}`)"
                >
                  Phân tích ngay
                </a-button>
              </div>
            </div>
          </div>
        </div>
        <template v-else>
          <list-report :class="{ 'hidden-list': isLoading, 'visible-list': !isLoading }" :data="data?.lst_report"/>
          <div v-if="searchValueSearch">
            Không có báo cáo bạn cần? Phân tích thông minh với từ khóa
            "<nuxt-link
                :to="`${NAVIGATIONS.smart_analytic}?keyword=${searchValueSearch}`"
                style="color: #e85912;">
              {{ searchValueSearch }}
            </nuxt-link>"

          </div>
          <div class="page">
            <a-pagination v-if="data?.total" v-model:current="current" :total="data?.total > 200 ? 199 : data?.total"
                          show-less-items @change="onChange"/>
          </div>
        </template>
      </div>
      <div class="relate_functions">
        <filter-report
            v-if="displaySortReport"
            class="filter_report"
            :select-category="selectedCategory"
            @category-select="handleCategorySelect"
            @selected-report-type-change="handleReportTypeChange"
            @selected-report-type-buy-change="handleReportTypeBuyChange"
        />
        <popular-relate-keywords
            v-if="listTagSuggestions?.length"
            :tags="listTagSuggestions"
            @tag-clicked="handleTagClick"
        />
        <maybe-interested
            v-if="listRecommend"
            :recomends="listRecommend"
        />
      </div>
    </div>
    <div class="background_poster">
      <div class="poster default_section">
        <div class="info">
          <div class="content">Truy cập kho dữ liệu với hàng trăm báo cáo và xu hướng mới nhất</div>
          <a-button style="height: 40px" @click="onClickViewPrice">Xem báo giá</a-button>
        </div>
        <div class="big_logo_metric">
          <NuxtImg src="/images/big_logo_metric.svg" alt=""/>
        </div>
        <div class="chart_image">
          <NuxtImg src="/images/chart_image.svg" alt=""/>
        </div>
        <div class="line_styling_image">
          <NuxtImg src="/images/line_styling_image.svg" alt=""/>
        </div>
      </div>
    </div>
    <a-modal v-model:open="isModalVisible" style="position: absolute;" title="Filter and Sort" @ok="handleOk"
             @cancel="handleCancel">
      <sort-report class="sort_report"
                   style="margin-bottom: 16px"
                   @sort-select="handleSortSelect"/>
      <filter-report class="filter_report"
                     :select-category="selectedCategory"
                     @category-select="handleCategorySelect"
                     @selected-report-type-change="handleReportTypeChange"
                     @selected-report-type-buy-change="handleReportTypeBuyChange"
      />
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
#search_report {
  background-color: #FBFAFC;
  //overflow: auto;

  .sectionTitle {
    display: flex;
    flex-direction: column;
    gap: 36px;
    padding-top: 36px;

    .sectionTitle_content {
      color: #241E46;
      font-size: 20px;
    }

    .searchContent {
      gap: 32px;
      width: 100%;
      align-self: center;
      display: flex;
      justify-content: center;

    }
  }

  .container-metric {
    display: flex;
    gap: 32px;
    padding-top: 40px;
    padding-bottom: 100px;

    .list_report_industry {
      display: flex;
      flex-direction: column;
      gap: 24px;
      flex: 0.7;

      .general {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .count_result {
          font-size: 16px;
          font-weight: 500;
          color: #716B95;
        }
      }

      .page {
        display: flex;
        justify-content: center;
      }
    }

    .relate_functions {
      flex: 0.3;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    @media (max-width: 1380px) {
      padding-top: 20px;
      padding-bottom: 40px;
    }
  }

  .background_poster {
    background: linear-gradient(90deg, #FF6931 1.09%, #FF9839 49.34%);

    .poster {
      display: flex;
      height: 335px;
      padding: 40px 0;
      align-items: center;
      gap: 64px;
      position: relative;

      .info {
        display: flex;
        width: 500px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 24px;
        z-index: 999;
        position: absolute;

        .content {
          font-size: 40px;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 56px;
        }
      }

      .big_logo_metric {
        width: inherit;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
      }

      .chart_image {
        position: absolute;
        right: 0;
        top: 0;
      }

      .line_styling_image {
        position: absolute;
        right: 500px;
        top: 70px;
      }

      @media (max-width: 1380px) {
        .info {
          width: 400px;

          .content {
            font-size: 32px;
            line-height: 48px;
          }
        }

        .big_logo_metric {
          top: 0;
          left: 0;
          width: 300px;

          img {
            width: 300px;
          }
        }

        .chart_image {
          top: 70px;
          right: -130px;

          img {
            width: 500px;
          }

        }

        .line_styling_image {
          top: 120px;
          right: 220px;

          img {
            width: 250px;
          }
        }
      }

      @media (max-width: 1380px) {
        height: 384px;
        padding: 32px 16px;

        .info {
          align-items: center;

          .content {
            line-height: 38px;
            font-size: 24px;
          }
        }

        .chart_image {
          top: 225px;
          right: 0;

          img {
            width: 300px;
          }

        }

        .line_styling_image {
          top: 250px;
          right: 220px;

          img {
            width: 150px;
          }
        }
      }
    }
  }


}

@media (max-width: 1380px) {
  #search_report {
    .sectionTitle {
      padding-top: 16px;

      .sectionTitle_content {
        font-size: 14px;
      }
    }
  }
}
</style>

<style lang="scss">
#search_report {
  .ant-modal {
    @media (max-width: 767px) {
      width: 90% !important;
      margin: 0 auto;
    }

    @media (min-width: 768px) {
      width: 70% !important;
    }

    @media (min-width: 1024px) {
      width: 50% !important;
    }

    @media (min-width: 1200px) {
      width: 30% !important;
    }
  }

  .ant-pagination {
    .ant-pagination-item {
      background-color: #F5F5F5;
      border-radius: 8px;

      a {
        background-color: #F5F5F5;
        border-radius: 8px;
      }
    }

    .ant-pagination-item-active {
      background-color: #E85912;
      color: #FFFFFF;

      a {
        background-color: #E85912;
        color: #FFFFFF;
      }
    }

    .ant-pagination-options {
      display: none;
    }
  }

  .ant-btn.ant-btn-default {
    display: flex;
    padding: 9px 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    color: #FFFFFF;
    font-weight: 500;
    font-size: 14px;
    background: #241E46;
    border: 1px solid #241E46;
  }

  .ant-modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  @media (max-width: 767px) {
    .ant-btn.ant-btn-default {
      background: #FFF;
      border: 1px solid #FFF;
      color: #241E46;
    }
  }
}
</style>
