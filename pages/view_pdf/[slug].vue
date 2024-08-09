<script setup>
import axios from "axios";
import { createLoadingTask, VuePdf } from "vue3-pdfjs";
import { ref, onMounted, onUnmounted } from "vue";
import HeaderDeptReport from "~/components/report/HeaderDeptReport.vue";

const isScrolled = ref(false);
const isLoading = ref(false);
const loadingPercentage = ref(0);
const pdfSrc = ref('');
const numOfPages = ref(0);

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

const scrollToPage = (pageIndex) => {
  const mainContent = document.querySelector('.main_content');
  const pageElement = mainContent.querySelectorAll('.container_content > div')[pageIndex - 1];
  if (pageElement) {
    mainContent.scrollTop = pageElement.offsetTop - mainContent.offsetTop;
  }
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 1380;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      if (scrollTop > lastScrollTop && scrollTop > 64) {
        if (header) header.style.top = '0';
      } else {
        if (header) header.style.top = '64px';
      }
    } else if (screenWidth <= 1380) {
      if (scrollTop > lastScrollTop && scrollTop > 40) {
        if (header) header.style.top = '0';
      } else {
        if (header) header.style.top = '40px';
      }
    } else {
      if (scrollTop > lastScrollTop && scrollTop > 32) {
        if (header) header.style.top = '0';
      } else {
        if (header) header.style.top = '32px';
      }
    }

    lastScrollTop = scrollTop;
  };
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
  handleScroll();
  fetchPdf('https://static.metric.vn/report/pdf/3962/ao-thun/ao-thun-655cdef60513f443e12fd0156ae5d022.pdf');
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="view_pdf default_section">
    <header>
      <HeaderDeptReport />
    </header>
    <div class="container">
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
        <div class="container_content" style="background: #525659">
          <div
              v-for="index in numOfPages"
              style="width: 100%; position: relative; padding: 0 24px 24px;"
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
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view_pdf {
  header{
    position: fixed;
    top: 120px;
    z-index: 20;
  }

  .container {
    margin-top: 80px;
    background: #EEEBFF;
    display: flex;

    .mini_map {
      flex: 0.2;
      max-height: 100vh;
      overflow-y: auto;
      background: #FFF;
      div{
        cursor: pointer;
        padding: 8px 0;
        border-bottom: 1px solid #E5E5E5;
      }
    }

    .main_content {
      flex: 0.8;
      max-height: 100vh;
      overflow-y: auto;
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