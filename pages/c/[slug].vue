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

const {fetchSearch, fetchListRecommend, fetchSuggest} = useSearchReport()
const route = useRoute();
const data = ref<SearchReportRes | null>(null);
const listRecommend = ref<LstRecommed[] | null>(null);
const listTagSuggestions = ref<string[]>([]);
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
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading and trailing whitespace
      .replace(/[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/g, match => vietnameseMap[match]) // Replace Vietnamese characters
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
}

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
      'offset': ((newpage-1) * 10 >= 200) ? 199 : (newpage-1) * 10,
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
  const hash = route.hash;
  const categoryIdMatch = hash.match(/#id=([^&]*)/);
  if (categoryIdMatch && categoryIdMatch[1]) {
    const categoryId = categoryIdMatch[1];
    list_category_report_id.push(categoryId);
    selectedCategory.value = categoryId;
  }
  if (route.query.search && typeof route.query.search === 'string') {
    searchValueSearch.value = route.query.search;
  } else {
    searchValueSearch.value = '';
  }
  if(route.query.report_type && typeof route.query.report_type === 'string') {
    selecteReportType.value = [route.query.report_type];
  }
  if(route.query.price_type && typeof route.query.price_type === 'string') {
    selecteReportTypeBuy.value = [route.query.price_type];
  }
  fetchData(searchValueSearch.value, list_category_report_id, sortSelect.value, page.value);
});

const onClickViewPrice = () => {
  navigateTo(NAVIGATIONS.pricing);
};

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
  if(selectedReportTypeBuy.includes('other')) {
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
      <div v-if="route.query.category_report_id && selectedCategoryName" class="sectionTitle_content">
        Kết quả tìm kiếm cho ngành hàng <b>"{{ selectedCategoryName }}"</b>
      </div>
      <div v-if="route.query.search && searchValueSearch" class="sectionTitle_content">
        Kết quả tìm kiếm cho từ khoá <b>"{{ searchValueSearch }}"</b>
      </div>
      <div class="sectionContent searchContent">
        <SearchReport class="default_section" :handle-search="handleSearch"/>
      </div>
    </div>
    <div class="container default_section">
      <div class="list_report_industry">
        <div class="general">
          <div></div>
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
          <a-card v-for="i in Array.from({ length: 6 })">
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
              <div style="width: 180px; height: 160px; background: #efefef; border-radius: 8px;"/>
              <a-skeleton :paragraph="{ rows: 2 }" active style="flex: 1;"/>
            </div>
          </a-card>
        </template>
        <list-report v-else :class="{ 'hidden-list': isLoading, 'visible-list': !isLoading }" :data="data?.lst_report"/>
        <div class="page">
          <a-pagination v-if="data?.total" v-model:current="current" :total="data?.total > 200 ? 199 : data?.total"
                        show-less-items @change="onChange"/>
        </div>
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
          <img src="/images/big_logo_metric.svg" alt="">
        </div>
        <div class="chart_image">
          <img src="/images/chart_image.svg" alt="">
        </div>
        <div class="line_styling_image">
          <img src="/images/line_styling_image.svg" alt="">
        </div>
      </div>
    </div>
    <a-modal v-model:visible="isModalVisible" style="position: absolute;" title="Filter and Sort" @ok="handleOk"
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

  .container {
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