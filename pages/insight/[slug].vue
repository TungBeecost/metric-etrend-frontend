<script setup>
import axios from "~/services/axios-wrapper";
import UnlockReport from "~/components/report/UnlockReport.vue";
// import ReportContent from "~/components/report/ReportContent.vue";
import MaybeInterested from "~/components/report/MaybeInterested.vue";
import {useSearchReport} from "#imports";
import UnlockReportMarketing from "~/components/report/UnlockReportMarketing.vue";

const route = useRoute()
const {fetchListRecomendMarketing} = useSearchReport()

const data = ref({})

const slug = route.params.slug;

const loading = ref(true)
const isHideContent = ref(true)
const listRecomend = ref([])


const fetchDataRecommend = async () => {
  try {
    const result = await fetchListRecomendMarketing();
    if (result !== null) {
      listRecomend.value = result;
    } else {
      listRecomend.value = [];
    }
  } catch (e) {
    console.error(e);
  }
}


const fetchReportData = async () => {
  try {
    loading.value = true;
    const response = await axios.get(
        `https://api-ereport.staging.muadee.vn/api/report/report_insight_detail`,
        {
          params: {
            slug,
          }
        },
    );
    console.log(response.data);
    const {tier_report} = response.data;
    if (tier_report !== 'free') {
      isHideContent.value = false;
    }
    data.value = response.data;
    loading.value = false;
    if (data.value) {
      // await fetchTagSuggest(data.value.name);
      // console.log(data.value.lst_category[0].id);
      await fetchDataRecommend();
    }
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
};

onMounted(() => {
  fetchReportData();
});

</script>

<template>
  <div v-if="loading" class="container_content">
    <div class="title default_section">
      <div class="loading-skeleton">
        <div>
          <a-skeleton-input size="large" active style="width: max(50%, 300px); margin-bottom: 24px;"/>
        </div>
        <div style="display: flex; justify-content: space-between;width: 100%; margin-bottom: 24px;">
          <a-skeleton-input size="small" active style="width: max(30%, 300px); "/>
        </div>
        <div class="container">
          <div class="general_overview_container" style="display: flex; width: 100%; gap: 24px">
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px; border-radius: 16px 0 0 16px">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
          </div>
          <div class="different_info">
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
              <a-skeleton-avatar active size="large"/>
              <a-skeleton active size="large"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container_content">
    <div class="title default_section">
      <div v-if="data" class="breadcrumbs">
        <Breadcrumb :breadcrumbs="[{name: 'Báo cáo miễn phí', value: 'free'}, {name: 'Báo cáo thị trường'}]"/>
      </div>
      <h1 v-if="data" class="report-title">
        {{ data.name }} - Báo cáo xu hướng thị trường sàn TMĐT
      </h1>
    </div>
    <div class="container default_section" style="padding-bottom: 120px;">
      <div class="general_overview_container">
        <client-only v-if="data">
          <PDFViewer :data="data"/>
          <!--          <template #fallback>-->
          <!--            &lt;!&ndash; this will be rendered on server side &ndash;&gt;-->
          <!--            <p>Loading comments...</p>-->
          <!--          </template>-->
        </client-only>
        <div class="introduction" v-if="data.introduction && data.introduction !== 'Không có'">
          <div class="statistic-item__title">
            <svg width="16" height="32" viewBox="0 0 16 32" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="32" rx="4" fill="#F9D7C6"/>
            </svg>
            <div>
              <div class="statistic-item__title">Lời mở đầu</div>
            </div>
          </div>
          <div class="introduction-content">
            <!--            <p v-for="paragraph in data.introduction.split('\n')">-->
            <!--              {{ paragraph }}-->
            <!--            </p>-->
            <p>
              {{ data.introduction }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="data" class="different_info">
        <unlock-report-marketing/>
        <report-content
            v-if="data?.data_analytic?.table_of_content.filter(item => item !== 'Không có').length"
            :table-of-content="data?.data_analytic?.table_of_content.filter(item => item !== 'Không có')"
        />
        <maybe-interested v-if="listRecomend" :recomends="listRecomend"/>
      </div>
    </div>
    <ReportFeaturedReport />
  </div>
</template>

<style scoped lang="scss">
.container_content {
  padding-top: 40px;
  padding-bottom: 40px;

  .title {
    display: flex;
    flex-direction: column;

    .breadcrumbs {
      display: flex;
      gap: 10px;
    }

    .report-title {
      font-size: 36px;
      font-weight: 700;
      line-height: 48px;
      color: #101828;
    }
  }

  .container {
    display: flex;
    gap: 20px;

    .general_overview_container {
      flex: 0.7;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .different_info {
      flex: 0.3;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }


  .statistic-item__title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 24px;
    font-weight: 700;
    color: #241E46;
  }

  .introduction {
    display: flex;
    padding: var(----spacing-3xl, 24px);
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    border-radius: var(--radius-2xl, 16px);
    border: 1px solid var(--Dark-blue-dark-blue-2, #EEEBFF);
    background: var(--Neutral-neutral-1, #FFF);

    .introduction-content {
      text-align: justify;
    }
  }
}
</style>