<script setup>
import { onMounted, ref, computed } from 'vue';
import { createLoadingTask, VuePdf } from 'vue3-pdfjs';
import axios from 'axios';
import HeaderDeptReport from '~/components/report/HeaderDeptReport.vue';
import { useCurrentUser } from '~/stores/current-user.js';
import {getIndexedDB} from "~/helpers/IndexedDBHelper.js";

const config = useRuntimeConfig();
const url_download = ref({});
const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
const loadingPercentage = ref(0);
const pdfSrc = ref('');
const numOfPages = ref(0);
const currentPage = ref(1);
const remainingTime = ref(0);
const reportName = ref('');
const currentUserStore = useCurrentUser();
const miniMapPagesInView = ref(new Set());

const fetchPdf = async (newValue) => {
  isLoading.value = true;
  loadingPercentage.value = 0;

  const response = await axios({
    url: newValue,
    method: 'get',
    responseType: 'arraybuffer',
    onDownloadProgress: function (progressEvent) {
      loadingPercentage.value = Math.floor(progressEvent.loaded / progressEvent.total * 100);
    }
  });

  const pdf = await createLoadingTask(response.data).promise;
  pdfSrc.value = response.data;
  numOfPages.value = pdf.numPages;
  isLoading.value = false;
};

const scrollToPage = (pageIndex) => {
  currentPage.value = pageIndex;
};

const downloading = ref(false);

const getReportPdfUrl = async (slug) => {
  const url = `${config.public.API_ENDPOINT}/api/report/get_download_pdf_url?slug=${slug}&type=view`;
  const accessToken = await getIndexedDB("access_token");
  const visitorId = await getIndexedDB("__visitor");
  try {
    downloading.value = true;
    const response = await $fetch(url, {
      headers: {
        'Authorization': `${accessToken}`,
        'Visitorid': visitorId.visitor_id,
      }
    });
    remainingTime.value = response.remaining_time;
    url_download.value = response.url_download;
    reportName.value = response.name;
    downloading.value = false;
    if (url_download.value) {
      await fetchPdf(url_download.value);
    }
  } catch (e) {
    const status = e.response?.status;
    if (status === 404) {
      router.push(`/${slug}`).then();
    }
  }
};

const calculateTargetDate = (seconds) => {
  const now = new Date();
  const targetDate = new Date(now.getTime() + seconds * 1000);
  return targetDate.toISOString();
};

const observeMiniMapPages = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        miniMapPagesInView.value.add(entry.target.dataset.index);
      } else {
        miniMapPagesInView.value.delete(entry.target.dataset.index);
      }
    });
  });
  const miniMapPages = document.querySelectorAll('.mini_map_page');
  miniMapPages.forEach((page, index) => {
    page.dataset.index = index + 1;
    observer.observe(page);
  });
};

watch(numOfPages, () => {
  setTimeout(() => {
    observeMiniMapPages();
  }, 100);
});

const marginTopValue = computed(() => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    return '125px';
  } else if (screenWidth <= 1380) {
    return '190px';
  }
  return '0px';
});

let lastScrollTop = 0;

const isMobileDevice = computed(() => window.innerWidth <= 1380);

const onChangePage = (direction) => {
  const newPage = currentPage.value + direction;
  if (newPage > 0 && newPage <= numOfPages.value) {
    currentPage.value = newPage;
  }
};

onMounted(() => {
  if (!currentUserStore.authenticated) {
    currentUserStore.setShowPopupLogin(true);
    return;
  }
  const slug = route.params.slug;
  getReportPdfUrl(slug);
});
</script>

<template>
  <div v-if="url_download">
    <div v-if="isMobileDevice">
      <div class="header_pdf">
        <HeaderDeptReport v-if="remainingTime" :num-of-pages="numOfPages" :current-page="currentPage"
                          :remaining-time="calculateTargetDate(remainingTime)" :report-name="reportName"/>
      </div>
      <div v-if="isLoading" :style="{ marginTop: marginTopValue, display: 'flex', justifyContent: 'center' }">
        <a-spin size="large"/>
      </div>
      <div v-else style="width: 100%; margin-top: 125px">
        <div style="width:100%;" class="pdf-wrapper">
          <div v-for="index in numOfPages" style="width: 100%;position: relative;">
            <VuePdf
                v-if="currentPage === index"
                :src="pdfSrc"
                :page="currentPage"
                :num-pages="numOfPages"
                style="width: 100%;"
            />
            <ChartMask
                v-if="isHideContent && currentPage === index && index >= 9"
                subtitle="Vui lòng đăng ký để nhận và xem bản đầy đủ của báo cáo"
                ok-button="Đăng ký nhận báo cáo"
                :handle-unlock-report="handleUnlockReport"
            />
            <div
                v-if="currentPage === index"
                class="btn-control btn-prev"
                :class="{disabled: currentPage === 1}"
                @click="onChangePage(-1)"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.4102 8.35254L12.4102 15.8525L19.4102 23.3525" stroke="#241E46" stroke-width="1.3"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div
                v-if="currentPage === index"
                class="btn-control btn-next"
                :class="{disabled: currentPage === numOfPages}"
                @click="onChangePage(1)"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5898 8.35254L19.5898 15.8525L12.5898 23.3525" stroke="#241E46" stroke-width="1.3"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;justify-content: center; margin-top: 8px;">
            <div
                v-for="index in numOfPages"
                style="width: 12px; height: 12px; background: #fff; border: 2px solid #fff; cursor: pointer;"
                :style="{background: currentPage === index ? '#FF6931' : '#fff'}"
                @click="currentPage = index"
            />
          </div>
          <div
              style="color: #fff;line-height: 1; margin-top: 12px; user-select: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
            {{ currentPage }} / {{ numOfPages }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="view_pdf">
      <div class="header_pdf">
        <HeaderDeptReport v-if="remainingTime" :num-of-pages="numOfPages" :current-page="currentPage"
                          :remaining-time="calculateTargetDate(remainingTime)" :report-name="reportName"/>
      </div>
      <div class="container-metric default_section">
        <div class="mini_map">
          <div
              v-for="index in numOfPages"
              :key="index"
              class="mini_map_page"
              style="width: 100%; height: 150px;"
              @click="scrollToPage(index)"
          >
            <VuePdf
                v-if="miniMapPagesInView.has(`${index}`)"
                :src="pdfSrc"
                :page="index"
                :num-pages="numOfPages"
                :enable-text-selection="false"
                :enable-annotations="false"
            />
          </div>
        </div>
        <div class="main_content">
          <div v-if="isLoading"
               style="width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center">
            <a-spin size="large"/>
          </div>
          <div v-else class="container_content" style="background: #525659">
            <div
                v-for="index in numOfPages"
                :key="index"
            >
              <div
                  v-if="index === currentPage"
                  style="width: 100%; position: relative; padding: 24px;box-shadow: 0 0 10px rgba(0,0,0,0.1);"
              >
                <VuePdf
                    :src="pdfSrc"
                    :page="currentPage"
                    :num-pages="numOfPages"
                    :enable-text-selection="true"
                    :enable-annotations="true"
                    style="width: 100%;"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view_pdf {
  .header_pdf {
    position: fixed;
    background: #FFF;
    padding-top: 8px;
    z-index: 20;
    transition: top 0.3s;
    border-bottom: 1px solid #EEEBFF;
    width: 100%;
  }

  .container-metric {
    display: flex;

    .mini_map {
      width: 200px;
      max-height: calc(100vh - 80px);
      height: fit-content;
      overflow-y: auto;
      background: #FFF;
      padding-right: 24px;
      padding-top: 100px;

      .mini_map_page {
        position: relative;
        border: 1px solid #FFF;
        cursor: pointer;
        padding: 0;

        &.active {
          border: 2px solid #E85912;
        }
      }

      div {
        cursor: pointer;
        padding: 8px 0;
      }
    }

    .main_content {
      flex: 1;
      height: fit-content;
      padding-top: 100px;
    }
  }

  .container_content {
    background: #EEEBFF;

    div {
      background: #EEEBFF;
    }
  }
}

.pdf-wrapper {

  position: relative;

  padding: 16px;

  border-radius: var(--radius-2xl, 16px);
  background: var(--Gradient-2, linear-gradient(90deg, #FF6931 1.09%, #FF9839 99.23%));

  .btn-control {
    position: absolute;

    top: 50%;

    display: flex;
    padding: 4px;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border-radius: 10000px;
    background: rgba(255, 255, 255, 0.20);
    box-shadow: 10px 10px 40px 0px rgba(0, 0, 0, 0.15);
    border: 1px solid #EEEBFF;
    backdrop-filter: blur(2px);

    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.90);
    }

    //&.disabled {
    //  display: none;
    //}
  }

  .btn-prev {
    left: -15px;
    transform: translateY(-50%);
  }

  .btn-next {
    right: -15px;
    transform: translateY(-50%);
  }
}
.header_pdf {
  position: fixed;
  background: #FFF;
  padding-top: 8px;
  z-index: 20;
  transition: top 0.3s;
  border-bottom: 1px solid #EEEBFF;
  width: 100%;
}
@media (max-width: 768px) {
  .view_pdf {
    .container-metric {
      flex-direction: column;

      .mini_map {
        width: 100%;
        height: 100%;
        padding-right: 0;

        .mini_map_page{
          height: 100% !important;
        }
      }

      .main_content {
        display: none;
      }
    }
  }
}
</style>

<style>
.vue-pdf__wrapper {
  border: 1px solid #EEEBFF;
  border-radius: 4px;

  canvas {
    width: 100% !important;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .vue-pdf__wrapper {
      border: 1px solid #EEEBFF;
      border-radius: 4px;

      canvas {
        height: auto !important; /* Change height to auto to prevent overlapping */
        border-radius: 4px;
      }
    }
  }
}
</style>
