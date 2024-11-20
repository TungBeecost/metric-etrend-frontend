<script setup lang="ts">
import AccountInfomation from "~/components/account/AccountInfomation.vue";
import DetailedReportsViewed from "~/components/account/DetailedReportsViewed.vue";
import { onMounted, ref } from "vue";
import { useSearchReport } from "#imports";
import { PAGE_TITLES } from "~/constant/constains";
import type { ListClaimed } from "~/services/reports";
import GeneralTransaction from "~/components/account/GeneralTransaction.vue";
import StatisticalTransaction from "~/components/account/StatisticalTransaction.vue";
import StatisticalDiscountCode from "~/components/account/StatisticalDiscountCode.vue";

const currentUserStore = useCurrentUser();
const { userInfo } = storeToRefs(currentUserStore);
const data = ref<{ total: number; reports: ListClaimed[] } | null>(null);
const dataPdf = ref<{ total: number; reports: ListClaimed[] } | null>(null);
const dataGeneral = ref<Record<string, any>>({});
const dataGeneralTransactionStatistic = ref<Record<string, any>>({});
const dataGeneralTransactionDiscountCode = ref<Record<string, any>>({});
const loading = ref(true);
const loadingpdf = ref(true);
const loadingStatisticalTransaction = ref(true);
const loadingStatisticalDiscountCode = ref(true);
const loadingUser = ref(true);
const activeKey = ref('1');
const { fetchClaimedList, fetchClaimedPDFList, fetchApiListStatisticalTransaction, fetchApiListStatisticalDiscountCode } = useSearchReport();

const fetchTableData = async (page: number = 0, limit: number = 4) => {
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

const fetchTableDataPDF = async (page: number = 0, limit: number = 4) => {
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

const fetchListStatisticalTransaction = async () => {
  try {
    const response = await fetchApiListStatisticalTransaction();
    if (response) {
      dataGeneral.value = response.general;
      dataGeneralTransactionStatistic.value = response.transaction_statistics;
    } else {
      console.error("No dataPdf received from fetchClaimedList");
    }
  } catch (error) {
    console.error("Error fetching claimed list:", error);
  } finally {
    loadingStatisticalTransaction.value = false;
  }
};

const fetchListStatisticalDiscountCode = async () => {
  try {
    const response = await fetchApiListStatisticalDiscountCode();
    if (response) {
      dataGeneral.value = response.general;
      dataGeneralTransactionDiscountCode.value = response.transaction_discount_code;
    } else {
      console.error("No dataPdf received from fetchClaimedList");
    }
  } catch (error) {
    console.error("Error fetching claimed list:", error);
  } finally {
    loadingStatisticalDiscountCode.value = false;
  }
};

useSeoMeta({
  title: PAGE_TITLES.account
});

const handlePage = (page: number) => {
  loading.value = true;
  fetchTableData(page - 1);
};

const handlePagePDF = (page: number) => {
  loading.value = true;
  fetchTableDataPDF(page - 1);
};

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('history')) {
    activeKey.value = '1';
  } else if (urlParams.has('affiliate_transaction')) {
    activeKey.value = '2';
  } else if (urlParams.has('affiliate_discount_code')) {
    activeKey.value = '3';
  }

  await fetchTableData();
  await fetchTableDataPDF();
  await fetchListStatisticalTransaction();
  await fetchListStatisticalDiscountCode();
  loadingUser.value = false;
});
</script>

<template>
  <div class="account_container">
    <account-infomation :loading=loadingUser :user-info="userInfo" class="info" />
    <div class="list_container default_section">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Lịch sử sử dụng">
          <div style="display: flex; flex-direction: column; gap: 24px; padding-bottom: 24px">
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
        </a-tab-pane>
          <a-tab-pane key="2" tab="Giao dịch tiếp thị liên kết">
            <div style="display: flex; flex-direction: column; gap: 24px; padding-bottom: 24px">
              <general-transaction :loading="loadingStatisticalTransaction" :data="dataGeneral"/>
              <statistical-transaction :loading="loadingStatisticalTransaction" :data="dataGeneralTransactionStatistic"/>
            </div>
          </a-tab-pane>
          <a-tab-pane v-if="dataGeneralTransactionDiscountCode.length > 1" key="3" tab="Thống kê mã giảm giá">
            <div style="display: flex; flex-direction: column; gap: 24px; padding-bottom: 24px">
              <general-transaction :loading="loadingStatisticalDiscountCode" :data="dataGeneral"/>
              <statistical-discount-code :loading="loadingStatisticalDiscountCode" :data="dataGeneralTransactionDiscountCode"/>
            </div>
          </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account_container{
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #FBFAFC;
}

.info {
  background-color: #FBFAFC;
  padding-top: 40px;
}

.detail-report {
  background-color: #FBFAFC;
  flex: 1;
}

.list_container{
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