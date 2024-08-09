<script setup>
import axios from "axios";
import {createLoadingTask, VuePdf} from "vue3-pdfjs";

definePageMeta({
  layout: 'auth-layout'
})

const isLoading = ref(false);
const loadingPercentage = ref(0);
const pdfSrc = ref('');
const numOfPages = ref(0);


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

onMounted(() => {
  fetchPdf('https://static.metric.vn/report/pdf/3962/ao-thun/ao-thun-655cdef60513f443e12fd0156ae5d022.pdf')
})
</script>

<template>
  <div>
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
        <div style="box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
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
</template>

<style scoped lang="scss">

</style>
