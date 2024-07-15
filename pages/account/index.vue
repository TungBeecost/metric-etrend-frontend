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
const {fetchClaimedList} = useSearchReport()

const fetchTableData = async (page: number = 0, limit: number = 10) => {
  try {
    const response = await fetchClaimedList(page, limit);
    if (response) {
      data.value = response;
    } else {
      console.error("No data received from fetchClaimedList");
    }
  } catch (error) {
    console.error("Error fetching claimed list:", error);
  }
};

useSeoMeta({
  title: PAGE_TITLES.account
})

const handlePage = (page: number) => {
  fetchTableData(page - 1);
};

onMounted(async () => {
  await fetchTableData();
});

</script>

<template>
  <div class="account_container">
    <account-infomation v-if="userInfo.id" :user-info="userInfo" class="info" />
    <detailed-reports-viewed v-if="data" :data="data.reports" :total='data.total' class="detail-report" @change="handlePage" />
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