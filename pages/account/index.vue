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

const fetchTableData = async () => {
  try {
    const response = await fetchClaimedList();
    data.value = response;
  } catch (error) {
    console.log(error);
  }
};

useSeoMeta({
  title: PAGE_TITLES.account
})

onMounted(async () => {
  await fetchTableData();
});

</script>

<template>
  <div class="account_container">
    <account-infomation v-if="userInfo.id" :user-info="userInfo" class="info" />
    <detailed-reports-viewed v-if="data" :data="data.reports" :total='data.total' class="detail-report" />
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