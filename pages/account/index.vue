<script setup lang="ts">
import AccountInfomation from "~/components/account/AccountInfomation.vue";
import DetailedReportsViewed from "~/components/account/DetailedReportsViewed.vue";
import {onMounted, ref} from "vue";
import {useSearchReport} from "#imports";
import { PAGE_TITLES } from "~/constant/constains";
import type {ListClaimed} from "~/services/reports";
const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);
const data = ref<{ total: number; reports: ListClaimed[] } | null>(null);
const dataPdf = ref<{ total: number; reports: ListClaimed[] } | null>(null);
const loading = ref(true);
const loadingpdf = ref(true);
const loadingUser = ref(true);
const {fetchClaimedList, fetchClaimedPDFList} = useSearchReport()

const fetchTableData = async (page: number = 0, limit: number = 5) => {
  try {
    const response = await fetchClaimedList(page, limit);
    if (response) {
      data.value = response;
    } else {
      console.error("No data received from fetchClaimedList");
    }
  } catch (error) {
    console.error("Error fetching claimed list:", error);
  } finally {
    loading.value = false;
  }
};

const fetchTableDataPDF = async (page: number = 0, limit: number = 5) => {
  try {
    const response = await fetchClaimedPDFList(page, limit);
    if (response) {
      dataPdf.value = response;
    } else {
      console.error("No dataPdf received from fetchClaimedList");
    }
  } catch (error) {
    console.error("Error fetching claimed list:", error);
  } finally {
    loadingpdf.value = false;
  }
};

useSeoMeta({
  title: PAGE_TITLES.account
})

const handlePage = (page: number) => {
  loading.value = true;
  fetchTableData(page - 1);
};

const handlePagePDF = (page: number) => {
  loading.value = true;
  fetchTableDataPDF(page - 1);
};

onMounted(async () => {
  await fetchTableData();
  await fetchTableDataPDF();
  loadingUser.value = false;
});

</script>

<template>
  <div class="account_container">
    <account-infomation :loading=loadingUser :user-info="userInfo" class="info" />
    <div class="list_container">
      <detailed-reports-viewed
          :loading="loading"
          title="Báo cáo chi tiết đã xem"
          :data="data?.reports"
          :total='data?.total'
          class="detail-report"
          @change="handlePage"
      />
      <detailed-reports-viewed
          :loading="loadingpdf"
          title="Báo cáo PDF đã mua"
          :data="dataPdf?.reports"
          :total='dataPdf?.total'
          class="detail-report"
          @change="handlePagePDF"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.info {
  background-color: #FBFAFC;
  padding-top: 40px;
}

.detail-report {
  background-color: #FBFAFC;
  padding-top: 24px;
  padding-bottom: 40px;
  flex: 1;
}

.list_container{
  width: 100%;
  display: flex;
  flex-direction: column;
}

@media (max-width: 767px) {
  .info {
    background-color: #FFF;
  }

  .detail-report {
    background-color: #FFF;
  }
}
</style>