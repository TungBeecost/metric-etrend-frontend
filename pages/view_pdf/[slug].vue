<script setup>
import axios from "axios";
import { createLoadingTask, VuePdf } from "vue3-pdfjs";
import { ref, onMounted, onUnmounted, watch } from "vue";
import HeaderDeptReport from "~/components/report/HeaderDeptReport.vue";

const isScrolled = ref(false);
const isLoading = ref(false);
const loadingPercentage = ref(0);
const pdfSrc = ref('');
const numOfPages = ref(0);
const currentPage = ref(1);

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
  console.log(response, pdf);
  isLoading.value = false;
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 1380;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const nextPage = () => {
  if (currentPage.value < numOfPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const scrollToPage = (pageIndex) => {
  currentPage.value = pageIndex;
  const mainContent = document.querySelector('.main_content');
  const pageElement = mainContent.querySelectorAll('.container_content > div')[pageIndex - 1];
  if (pageElement) {
    mainContent.scrollTo({
      top: pageElement.offsetTop - mainContent.offsetTop,
      behavior: 'smooth'
    });
  }
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

watch(currentPage, (newPage) => {
  const miniMapPages = document.querySelectorAll('.mini_map_page');
  miniMapPages.forEach((page, index) => {
    if (index + 1 === newPage) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });
});

onMounted(() => {
  let lastScrollTop = 0;
  const header_pdf = document.querySelector('.header_pdf');
  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop && scrollTop > 32) {
      if (header_pdf) header_pdf.style.top = '88px';
    } else {
      if (header_pdf) header_pdf.style.top = '120px';
    }

    lastScrollTop = scrollTop;
  };
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
  document.querySelector('.main_content').addEventListener('scroll', updateCurrentPageOnScroll);
  handleScroll();
  fetchPdf('https://static.metric.vn/report/pdf/3962/ao-thun/ao-thun-655cdef60513f443e12fd0156ae5d022.pdf');
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
  document.querySelector('.main_content').removeEventListener('scroll', updateCurrentPageOnScroll);
});
</script>

<template>
  <div class="view_pdf">
    <div class="header_pdf">
      <HeaderDeptReport :num-of-pages="numOfPages" :current-page="currentPage" />
    </div>
    <div class="container default_section">
      <div class="mini_map">
        <div v-for="index in numOfPages" :key="index" class="mini_map_page" @click="scrollToPage(index)">
          <VuePdf
              :src="pdfSrc"
              :page="index"
              :num-pages="numOfPages"
              :enable-text-selection="false"
              :enable-annotations="false"
              style="width: 100%;"
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
              style="width: 100%; position: relative; padding: 24px;"
              :style="{'padding-top': index === 1 ? '24px' : 0}"
          >
            <div style="box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <VuePdf
                  :src="pdfSrc"
                  :page="index"
                  :num-pages="numOfPages"
                  :enable-text-selection="true"
                  :enable-annotations="true"
                  style="width: 100%;"
              />
            </div>
          </div>
        </div>
        <div class="navigation_buttons">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <button @click="nextPage" :disabled="currentPage === numOfPages">Next</button>
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
    background: #EEEBFF;
    display: flex;

    .mini_map {
      flex: 0.1;
      max-height: calc(100vh - 80px);
      overflow-y: auto;
      background: #FFF;
      padding-right: 24px;
      padding-top: 24px;

      .mini_map_page {
        position: relative;
        border: 1px solid #FFF;
        cursor: pointer;
        padding: 0;

        &.active {
          border: 2px solid #E85912;
        }
      }


      div{
        cursor: pointer;
        padding: 8px 0;
      }
    }

    .main_content {
      flex: 0.9;
      max-height: calc(100vh - 80px);
      overflow-y: auto;

    }
  }
  .container_content {
    background: #EEEBFF;

    div {
      background: #EEEBFF;
    }
  }

  .navigation_buttons {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    button {
      padding: 8px 16px;
      background: #241E46;
      color: #FFF;
      border: none;
      cursor: pointer;
      &:disabled {
        background: #CCC;
        cursor: not-allowed;
      }
    }
  }
}
</style>

<style>
.vue-pdf__wrapper{
  border: 1px solid #EEEBFF;
  border-radius: 4px;
  canvas{
    width: 100% !important;
    border-radius: 4px;
  }

}
</style>