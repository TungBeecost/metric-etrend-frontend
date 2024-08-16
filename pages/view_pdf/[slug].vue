<script setup>
import {onMounted, ref} from 'vue';
import {createLoadingTask, VuePdf} from 'vue3-pdfjs';
import axios from 'axios';
import HeaderDeptReport from '~/components/report/HeaderDeptReport.vue';
import {useCurrentUser} from '~/stores/current-user.js';

const config = useRuntimeConfig();
const url_download = ref({});
const route = useRoute();
const router = useRouter();

const isScrolled = ref(false);
const isLoading = ref(false);
const loadingPercentage = ref(0);
const pdfSrc = ref('');
const numOfPages = ref(0);
const currentPage = ref(1);
const isMobile = ref(false);
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

const handleResize = () => {
  isMobile.value = window.innerWidth <= 1380;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const scrollToPage = (pageIndex) => {
  currentPage.value = pageIndex;
};

const updateCurrentPageOnScroll = () => {
  const mainContent = document.querySelector('.main_content');
  const pageElements = mainContent.querySelectorAll('.container_content > div');
  pageElements.forEach((pageElement, index) => {
    const rect = pageElement.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      currentPage.value = index + 1;
    }
  });
};

// watch(currentPage, (newPage) => {
//   const miniMapPages = document.querySelectorAll('.mini_map_page');
//   miniMapPages.forEach((page, index) => {
//     if (index + 1 === newPage) {
//       page.classList.add('active');
//     } else {
//       page.classList.remove('active');
//     }
//   });
// });

const downloading = ref(false);

const getReportPdfUrl = async (slug) => {
  const url = `${config.public.API_ENDPOINT}/api/report/get_download_pdf_url?slug=${slug}`;

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : '';
  try {
    downloading.value = true;
    const response = await $fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
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

// observe when mini map pages are in view
watch(numOfPages, () => {
  setTimeout(() => {
    observeMiniMapPages();
  }, 100);
});

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
  <div v-if="url_download" class="view_pdf">
    <div class="header_pdf">
      <HeaderDeptReport v-if="remainingTime" :num-of-pages="numOfPages" :current-page="currentPage"
                        :remaining-time="calculateTargetDate(remainingTime)" :report-name="reportName"/>
    </div>
    <div class="container default_section">
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
</template>


<style scoped lang="scss">
.view_pdf {
  .header_pdf {
    position: fixed;
    top: 120px;
    z-index: 20;
    transition: top 0.3s;
    border-bottom: 1px solid #EEEBFF;
    width: 100%;
  }

  .container {
    margin-top: 94px;
    //background: #EEEBFF;
    display: flex;

    .mini_map {
      width: 200px;
      max-height: calc(100vh - 80px);
      height: fit-content;
      overflow-y: auto;
      background: #FFF;
      padding-right: 24px;
      padding-top: 24px;

      //display: flex;
      //flex-direction: column;
      //gap: 16px;

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
      max-height: calc(100vh - 80px);
      //overflow-y: auto;
      height: fit-content;

    }
  }

  .container_content {
    background: #EEEBFF;

    div {
      background: #EEEBFF;
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

}
</style>