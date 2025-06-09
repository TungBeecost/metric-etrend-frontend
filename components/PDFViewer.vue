<script setup>
import {createLoadingTask, VuePdf} from 'vue3-pdfjs';
import axios from "axios";
import ChartMask from '~/components/ChartMask.vue';
import { useReportAccess } from '~/composables/useReportAccess';

const { isHideContent } = useReportAccess();

const {data} = defineProps({
  data: {
    type: Object,
    required: true,
  },
  openContactForm: {
    type: Boolean,
    required: true,
  }
})

const isLoading = ref(false)
const loadingPercentage = ref(0)

const pdfSrc = ref('')
const numOfPages = ref(0)
const currentPage = ref(1)

const emit = defineEmits(['update:openContactForm'])

const onChangePage = (change) => {
  const page = currentPage.value + change
  if (page < 1) {
    currentPage.value = numOfPages.value
  } else if (page > numOfPages.value) {
    currentPage.value = 1
  } else {
    currentPage.value = page
  }
}

const fetchPdf = async (newValue) => {
  isLoading.value = true
  loadingPercentage.value = 0

  const response = await axios({
    url: newValue,
    method: 'get',
    responseType: 'arraybuffer',
    onDownloadProgress: function (progressEvent) {
      loadingPercentage.value = Math.floor(progressEvent.loaded / progressEvent.total * 100)
    }
  })

  const pdf = await createLoadingTask(response.data).promise
  pdfSrc.value = response.data
  numOfPages.value = pdf.numPages
  console.log(response, pdf)
  isLoading.value = false
}

const handleUnlockReport = () => {
  console.log('handleUnlockReport')

  emit('update:openContactForm', true)
}

onMounted(() => {
  fetchPdf(data.url_report_pdf)
})
</script>

<template>
  <div style="width: 100%;">
    <div v-if="isLoading">

    </div>

    <div v-else style="width: 100%;">
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
              :report="data"
              :title="'Số liệu bị ẩn'"
              :subtitle="'Vui lòng đăng ký để nhận và xem bản đầy đủ của báo cáo'"
              :ok-button="'Đăng ký nhận báo cáo'"
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
</template>

<style scoped lang="scss">
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
    background: rgba(255, 255, 255, 0.80);
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
    left: 5px;
    transform: translateY(-50%);
  }

  .btn-next {
    right: 5px;
    transform: translateY(-50%);
  }
}
</style>