<script setup>
import axios from "~/services/axios-wrapper";
// import ReportContent from "~/components/report/ReportContent.vue";
import MaybeInterested from "~/components/report/MaybeInterested.vue";
import {useSearchReport} from "#imports";
import UnlockReportMarketing from "~/components/report/UnlockReportMarketing.vue";

const route = useRoute()
const {fetchListRecommendMarketing} = useSearchReport()

const data = ref({})

const slug = route.params.slug;

const openContactForm = ref(false)

const loading = ref(true)
const isHideContent = ref(true)
const listRecommend = ref([])


const fetchDataRecommend = async (report_type) => {
  try {
    const result = await fetchListRecommendMarketing(5, report_type);
    if (result !== null) {
      listRecommend.value = result;
    } else {
      listRecommend.value = [];
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
      await fetchDataRecommend(response.data.report_type);
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
          <PDFViewer v-model:openContactForm="openContactForm" :data="data" :is-hide-content="isHideContent"/>
        </client-only>
        <div v-if="data.introduction && data.introduction !== 'Không có'" class="introduction">
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
            <p>
              {{ data.introduction }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="data" class="different_info">
        <unlock-report-marketing @handle-unlock-report="openContactForm = true"/>
        <report-content
            v-if="data?.data_analytic?.table_of_content.filter(item => item !== 'Không có').length"
            :table-of-content="data?.data_analytic?.table_of_content.filter(item => item !== 'Không có')"
        />
        <maybe-interested v-if="listRecommend" :recomends="listRecommend"/>
      </div>
    </div>
    <ReportFeaturedReport/>

    <a-modal
        :visible="openContactForm"
        :footer="false"
        @cancel="openContactForm = false"
    >
      <div class="modal-contact-us">
        <div class="title">Đăng ký nhận báo cáo</div>
        <div class="description" style="font-size: 16px">
          Vui lòng điền biểu mẫu bên dưới để nhận ngay báo cáo chi tiết
          <span>“Dép nam - Báo cáo xu hướng thị trường sàn TMĐT”</span>
        </div>
      </div>
      <ContactUsForm/>
    </a-modal>
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

.modal-contact-us {
  .title {
    color: var(--Dark-blue-dark-blue-7, #332D59);
    text-align: center;

    /* Headline/Headline 4 */
    font-family: Inter, sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 38px; /* 158.333% */

    margin-bottom: 24px;
  }

  .description {
    color: #475467;

    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: -0.48px;

    margin-bottom: 24px;

    span {
      color: var(--Dark-blue-dark-blue-8, #241E46);
    }
  }
}
</style>