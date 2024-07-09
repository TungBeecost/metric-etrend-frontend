<script setup lang="ts">
import AccountInfomation from "~/components/account/AccountInfomation.vue";
import DetailedReportsViewed from "~/components/account/DetailedReportsViewed.vue";
import {onMounted, ref} from "vue";
import type {ListClaimed} from "~/services/reports";
import {useSearchReport} from "#imports";
import { PAGE_TITLES } from "~/constant/constains";
const {userInfo} = useCurrentUser();
const data = ref<ListClaimed[] | null>(null);
const {fetchClaimedList} = useSearchReport()

const fetchTableData = async () => {
  try {
    const response = await fetchClaimedList();
    data.value = response;
    console.log(response);
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
    <account-infomation :user-info="userInfo" class="info" />
    <detailed-reports-viewed :data="data" :total='1000' class="detail-report" />
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