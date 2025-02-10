<script setup>
import axios from "~/services/axios-wrapper";
// import ReportContent from "~/components/report/ReportContent.vue";
import MaybeInterested from "~/components/report/MaybeInterested.vue";
import {useSearchReport} from "#imports";
import UnlockReportMarketing from "~/components/report/UnlockReportMarketing.vue";
import SuccessNotification from "~/components/ContactUs/SuccessNotification.vue";
import useBEEndpoint from "~/composables/useBEEndpoint";
import {trackEventCommon, trackEventConversionPixel} from "~/services/tracking/TrackingEventService.js";
import {EVENT_TYPE} from "~/constant/general/EventConstant.js";

const route = useRoute()
const {fetchListRecommendMarketing} = useSearchReport()
const currentUserStore = useCurrentUser();
const { userInfo } = storeToRefs(currentUserStore);
const data = ref({})

const slug = route.params.slug;

const openContactForm = ref(false)

const loading = ref(true)
const isHideContent = ref(true)
const listRecommend = ref([])

const isShowSuccessNotification = useState('LandingPage.isShowSuccessNotification', () => false)


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
        useBEEndpoint('/api/report/report_insight_detail'),
        {
          params: {
            slug,
          }
        },
    );
    trackEventCommon(EVENT_TYPE.VIEW_REPORT_COMMUNITY, slug, response?.name);
    trackEventCommon(EVENT_TYPE.VIEW_ANY_REPORT, slug, response?.name);
    trackEventConversionPixel(
        'ViewContent',
        response?.lst_category?.[0]?.['name'],
        [`${response?.id}-${response?.slug}`],
        `Thương hiệu ${response?.name}`,
        'product',
        [
          {
            id: response?.slug,
            quantity: 1,
          }
        ],
        'VND',
        1,
        null,
        null,
        null
    )
    const {tier_report} = response.data;
    if (tier_report !== 'e_free' && userInfo.value?.metric_info_auth.roles[0] !== 'market_default') {
      isHideContent.value = false;
    }
    data.value = response.data;
    loading.value = false;
    if (data.value) {
      await fetchDataRecommend(response.data.report_type);
    }
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
};

const handleSubmitSuccess = () => {
  localStorage.setItem('report_mkt_unlocked', 'true');

  isShowSuccessNotification.value = true;
  if(isShowSuccessNotification.value){
    trackEventCommon(EVENT_TYPE.SUBMIT_FORM_COMMUNITY_REPORT, 'submit_form_community_report', '');
  }

  openContactForm.value = false;
  isHideContent.value = false;
};

onMounted(() => {
  const unlockedMktReports = localStorage.getItem('report_mkt_unlocked');
  if (userInfo.value?.current_plan?.plan_code !== 'e_free' && userInfo.value?.current_plan?.plan_code && userInfo.value?.metric_info_auth.roles[0] !== 'market_default') {
    isHideContent.value = false;
  } else {
    if (unlockedMktReports === 'true') {
      isHideContent.value = false;
    }
  }
  fetchReportData();
});

</script>

<template>
  <Head>
    <Title>{{ data?.name }} - Báo cáo xu hướng thị trường sàn TMĐT</Title>
    <Meta hid="og:title" property="og:title" :content="`eReport - ${data?.name}`"/>
    <Meta hid="description" name="description" :content="data?.introduction"/>
    <Meta hid="og:description" name="og:description" :content="data?.introduction"/>
    <Meta hid="og:image" property="og:image" :content="data?.url_cover || data?.url_thumbnail"/>
    <Meta hid="og:image:alt" property="og:image:alt" :content="`Báo cáo thị trường ${data?.name}`"/>
  </Head>
<!--  {{userInfo.metric_info}}-->
  {{userInfo.metric_info_auth.roles}}
  <div v-if="loading" class="container_content">
    <div class="title default_section">
      <div class="loading-skeleton">
        <div>
          <a-skeleton-input size="large" active style="width: max(50%, 300px); margin-bottom: 24px;"/>
        </div>
        <div style="display: flex; justify-content: space-between;width: 100%; margin-bottom: 24px;">
          <a-skeleton-input size="small" active style="width: max(30%, 300px); "/>
        </div>
        <div class="container-metric">
          <div class="general_overview_container" style="display: flex; width: 100%; gap: 24px">
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px; border-radius: 16px 0 0 16px">
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;">
              <a-skeleton active size="large"/>
            </div>
          </div>
          <div class="different_info">
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
              <a-skeleton active size="large"/>
            </div>
            <div style="flex: 1; box-shadow: 0 0 0 1px #EEEBFF; padding: 24px;" class="hide-on-mobile">
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
        <Breadcrumb :breadcrumbs="[{name: 'Báo cáo Metric phát hành', value: ''}, {name: 'Báo cáo thị trường'}]"/>
      </div>
      <h1 v-if="data" class="report-title">
        {{ data.name }} - Báo cáo xu hướng thị trường sàn TMĐT
      </h1>
    </div>
    <div class="container-metric default_section" style="padding-bottom: 120px;">
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
        <unlock-report-marketing v-if="isHideContent" @handle-unlock-report="openContactForm = true"/>
        <div v-else class="redirect-to-normal-report">
          <div class="title">
            Truy cập kho dữ liệu với hàng trăm báo cáo và xu hướng mới nhất
          </div>
          <div style="text-align: center;width: 100%;position: relative;z-index: 2;">
            <nuxt-link to="/search" style="text-align: center;">
              <a-button type="primary" size="large" style="margin: auto;">
                Khám phá ngay
              </a-button>
            </nuxt-link>
          </div>
          <div style="text-align: right;width: 100%;height: 169px;">
            <svg class="shape-1" width="329" viewBox="0 0 329 169" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_4728_217372)">
                <g clip-path="url(#clip0_4728_217372)">
                  <rect x="25" y="25" width="276" height="168.667" rx="6.91399" fill="white"/>
                  <rect x="41.791" y="41.2979" width="57.8794" height="7.53225" rx="3.76613" fill="#F5F5F5"/>
                  <rect x="41.791" y="53.9834" width="99.1086" height="5.94652" rx="2.97326" fill="#F5F5F5"/>
                  <line x1="41.791" y1="73.7143" x2="361.81" y2="73.7143" stroke="#F5F5F5" stroke-width="0.358465"/>
                  <g clip-path="url(#clip1_4728_217372)">
                    <line x1="62.5007" y1="87.2659" x2="258.692" y2="87.2659" stroke="#D7D1F9" stroke-width="0.179232"/>
                    <line x1="62.5007" y1="101.246" x2="258.692" y2="101.246" stroke="#D7D1F9" stroke-width="0.179232"/>
                    <line x1="62.5007" y1="115.584" x2="258.692" y2="115.584" stroke="#D7D1F9" stroke-width="0.179232"/>
                    <line x1="62.5007" y1="129.923" x2="258.692" y2="129.923" stroke="#D7D1F9" stroke-width="0.179232"/>
                    <line x1="62.5007" y1="144.261" x2="258.692" y2="144.261" stroke="#D7D1F9" stroke-width="0.179232"/>
                    <line x1="62.5007" y1="158.6" x2="258.692" y2="158.6" stroke="#D7D1F9" stroke-width="0.179232"/>
                    <rect x="38.1248" y="83.7715" width="20.2481" height="4.44471" rx="2.22236" fill="#F5F5F5"/>
                    <rect x="38.1248" y="98.4395" width="20.2481" height="4.44471" rx="2.22236" fill="#F5F5F5"/>
                    <rect x="39.1125" y="113.108" width="19.2604" height="4.44471" rx="2.22236" fill="#F5F5F5"/>
                    <rect x="39.1125" y="127.776" width="19.2604" height="4.44471" rx="2.22236" fill="#F5F5F5"/>
                    <rect x="41.0879" y="142.445" width="17.285" height="4.44471" rx="2.22236" fill="#F5F5F5"/>
                    <rect x="51.9526" y="157.113" width="6.42014" height="4.44471" rx="2.22236" fill="#F5F5F5"/>
                    <rect x="66.9551" y="119.433" width="15.4354" height="11.8293" rx="0.358465" fill="#FAAD14"
                          stroke="#FAAD14" stroke-width="0.358465"/>
                    <rect x="66.7759" y="131.799" width="15.7939" height="16.8478" rx="0.537697" fill="#E85912"/>
                    <rect x="66.7759" y="149.006" width="15.7939" height="12.5463" rx="0.537697" fill="#1890FF"/>
                    <rect x="91.2998" y="112.622" width="15.4354" height="7.88622" rx="0.358465" fill="#FAAD14"
                          stroke="#FAAD14" stroke-width="0.358465"/>
                    <rect x="91.1206" y="121.045" width="15.7939" height="22.2248" rx="0.537697" fill="#E85912"/>
                    <rect x="91.1206" y="143.629" width="15.7939" height="17.9232" rx="0.537697" fill="#1890FF"/>
                    <rect x="115.646" y="106.526" width="15.4354" height="12.1878" rx="0.358465" fill="#FAAD14"
                          stroke="#FAAD14" stroke-width="0.358465"/>
                    <rect x="115.466" y="119.252" width="15.7939" height="30.4695" rx="0.537697" fill="#E85912"/>
                    <rect x="115.466" y="150.079" width="15.7939" height="11.4709" rx="0.537697" fill="#1890FF"/>
                    <rect x="139.989" y="116.203" width="15.4354" height="11.8293" rx="0.358465" fill="#FAAD14"
                          stroke="#FAAD14" stroke-width="0.358465"/>
                    <rect x="139.81" y="128.57" width="15.7939" height="13.2632" rx="0.537697" fill="#E85912"/>
                    <rect x="139.81" y="142.191" width="15.7939" height="19.3571" rx="0.537697" fill="#1890FF"/>
                    <rect x="164.335" y="100.076" width="15.4354" height="14.3386" rx="0.358465" fill="#FAAD14"
                          stroke="#FAAD14" stroke-width="0.358465"/>
                    <rect x="164.155" y="114.951" width="15.7939" height="20.791" rx="0.537697" fill="#E85912"/>
                    <rect x="164.155" y="136.102" width="15.7939" height="25.451" rx="0.537697" fill="#1890FF"/>
                    <rect x="188.678" y="97.9253" width="15.4354" height="20.074" rx="0.358465" fill="#FAAD14"
                          stroke="#FAAD14" stroke-width="0.358465"/>
                    <rect x="188.499" y="118.537" width="15.7939" height="20.791" rx="0.537697" fill="#E85912"/>
                    <rect x="188.499" y="139.686" width="15.7939" height="21.8664" rx="0.537697" fill="#1890FF"/>
                    <rect x="213.023" y="116.203" width="15.4354" height="17.9232" rx="0.358465" fill="#FAAD14"
                          stroke="#FAAD14" stroke-width="0.358465"/>
                    <rect x="212.844" y="134.663" width="15.7939" height="7.1693" rx="0.537697" fill="#E85912"/>
                    <rect x="212.844" y="142.191" width="15.7939" height="19.3571" rx="0.537697" fill="#1890FF"/>
                    <rect x="237.367" y="125.883" width="15.4354" height="7.88622" rx="0.358465" fill="#FAAD14"
                          stroke="#FAAD14" stroke-width="0.358465"/>
                    <rect x="237.188" y="134.307" width="15.7939" height="11.4709" rx="0.537697" fill="#E85912"/>
                    <rect x="237.188" y="146.137" width="15.7939" height="15.414" rx="0.537697" fill="#1890FF"/>
                    <circle cx="269.543" cy="85.7464" r="1.25463" fill="#FAAD14" stroke="#FAAD14"
                            stroke-width="0.358465"/>
                    <rect x="273.94" y="83.7705" width="12.8403" height="3.95085" rx="1.97543" fill="#F5F5F5"/>
                    <circle cx="269.543" cy="92.5647" r="1.43386" fill="#E85912"/>
                    <rect x="273.94" y="90.5889" width="10.371" height="3.95085" rx="1.97543" fill="#F5F5F5"/>
                    <circle cx="269.543" cy="99.3831" r="1.43386" fill="#1890FF"/>
                    <rect x="273.94" y="97.4072" width="14.3218" height="3.95085" rx="1.97543" fill="#F5F5F5"/>
                  </g>
                </g>
                <rect x="24.6118" y="24.6118" width="276.776" height="169.443" rx="7.30219" stroke="#F5F5F5"
                      stroke-width="0.776391"/>
              </g>
              <defs>
                <filter id="filter0_d_4728_217372" x="0.931909" y="0.931909" width="339.664" height="232.331"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                 result="hardAlpha"/>
                  <feOffset dx="7.76391" dy="7.76391"/>
                  <feGaussianBlur stdDeviation="15.5278"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4728_217372"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4728_217372" result="shape"/>
                </filter>
                <clipPath id="clip0_4728_217372">
                  <rect x="25" y="25" width="276" height="168.667" rx="6.91399" fill="white"/>
                </clipPath>
                <clipPath id="clip1_4728_217372">
                  <rect width="250.137" height="90.6916" fill="white" transform="translate(38.1248 83.7705)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <svg class="shape-2" width="178" height="150" viewBox="0 0 178 150" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_4728_217452)">
              <g clip-path="url(#clip0_4728_217452)">
                <rect x="24" y="27.9844" width="108" height="108" rx="8.03006" fill="white"/>
                <rect x="43.8228" y="47.1562" width="67.2224" height="8.74812" rx="4.37406" fill="#F5F5F5"/>
                <rect x="43.8228" y="61.8896" width="115.107" height="6.90641" rx="3.45321" fill="#F5F5F5"/>
                <path d="M34.876 59.4365L121.226 59.4365" stroke="#F5F5F5" stroke-width="0.437105"/>
                <rect x="36.6182" y="103.367" width="12.2389" height="5.16218" rx="2.58109" fill="#F5F5F5"/>
                <rect x="36.6182" y="114.839" width="12.2389" height="5.16218" rx="2.58109" fill="#F5F5F5"/>
                <rect x="36.6182" y="126.311" width="12.2389" height="5.16218" rx="2.58109" fill="#F5F5F5"/>
                <rect x="42.3016" y="70.1492" width="80.1862" height="39.8218" stroke="#F5F5F5"
                      stroke-width="0.437105"/>
                <path d="M42.083 83.1895H122.706" stroke="#F5F5F5" stroke-width="0.437105"/>
                <path d="M42.083 76.6807H122.706" stroke="#F5F5F5" stroke-width="0.437105"/>
                <path d="M42.083 89.6982H122.706" stroke="#F5F5F5" stroke-width="0.437105"/>
                <path d="M42.083 96.207H122.706" stroke="#F5F5F5" stroke-width="0.437105"/>
                <path d="M42.083 102.716H122.706" stroke="#F5F5F5" stroke-width="0.437105"/>
                <path d="M55.646 69.9307L55.646 110.19" stroke="#F5F5F5" stroke-width="0.437105"/>
                <path d="M68.9575 69.9307L68.9575 110.19" stroke="#F5F5F5" stroke-width="0.437105"/>
                <path d="M82.2688 69.9307L82.2688 110.19" stroke="#F5F5F5" stroke-width="0.437105"/>
                <path d="M95.5811 69.9307L95.5811 110.19" stroke="#F5F5F5" stroke-width="0.437105"/>
                <path d="M108.893 69.9307L108.893 110.19" stroke="#F5F5F5" stroke-width="0.437105"/>
                <path
                    d="M42.209 76.6808V89.6987H95.7067L82.1439 70.1719L68.9578 76.6808L55.6462 83.0692L42.209 76.6808Z"
                    fill="#1890FF"/>
                <path d="M108.767 96.3277L95.7068 89.6982H122.456V109.948L108.767 96.3277Z" fill="#1890FF"/>
                <ellipse cx="42.2091" cy="96.3281" rx="0.87907" ry="0.84375" fill="#FAAD14"/>
                <ellipse cx="55.7721" cy="83.3105" rx="0.87907" ry="0.84375" fill="#FAAD14"/>
                <ellipse cx="69.0837" cy="96.3281" rx="0.87907" ry="0.84375" fill="#FAAD14"/>
                <ellipse cx="82.3949" cy="102.596" rx="0.87907" ry="0.84375" fill="#FAAD14"/>
                <ellipse cx="95.7069" cy="83.3105" rx="0.87907" ry="0.84375" fill="#FAAD14"/>
                <ellipse cx="109.019" cy="76.8008" rx="0.87907" ry="0.84375" fill="#FAAD14"/>
                <ellipse cx="122.581" cy="83.3105" rx="0.87907" ry="0.84375" fill="#FAAD14"/>
                <path
                    d="M42.209 96.4485L55.7718 83.3101L69.0834 96.4485L82.395 102.596L95.8322 83.3101L109.144 76.6807L122.33 83.3101"
                    stroke="#FAAD14" stroke-width="0.874211"/>
                <path
                    d="M42.209 89.6985L55.6462 96.2074L69.3346 89.6985L82.1439 82.4664L95.2043 76.6807L108.893 83.1896L122.455 89.6985"
                    stroke="#E85912" stroke-width="0.874211" stroke-dasharray="1.75 1.75"/>
                <ellipse cx="42.2091" cy="89.8193" rx="0.87907" ry="0.84375" fill="#E85912"/>
                <ellipse cx="55.7721" cy="96.3281" rx="0.87907" ry="0.84375" fill="#E85912"/>
                <ellipse cx="69.0837" cy="89.8193" rx="0.87907" ry="0.84375" fill="#E85912"/>
                <ellipse cx="82.3949" cy="82.3457" rx="0.87907" ry="0.84375" fill="#E85912"/>
                <ellipse cx="95.7069" cy="76.8008" rx="0.87907" ry="0.84375" fill="#E85912"/>
                <ellipse cx="108.767" cy="83.3105" rx="0.87907" ry="0.84375" fill="#E85912"/>
                <ellipse cx="122.581" cy="89.8193" rx="0.87907" ry="0.84375" fill="#E85912"/>
              </g>
              <rect x="23.5491" y="27.5335" width="108.902" height="108.902" rx="8.48092" stroke="#F5F5F5"
                    stroke-width="0.901717"/>
            </g>
            <defs>
              <filter id="filter0_d_4728_217452" x="-3.95337" y="0.0314922" width="181.941" height="181.94"
                      filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                               result="hardAlpha"/>
                <feOffset dx="9.01717" dy="9.01717"/>
                <feGaussianBlur stdDeviation="18.0343"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4728_217452"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4728_217452" result="shape"/>
              </filter>
              <clipPath id="clip0_4728_217452">
                <rect x="24" y="27.9844" width="108" height="108" rx="8.03006" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <NuxtImg src="/images/orange-banner-wave.png" class="background"/>
        </div>
        <report-content
            v-if="data?.data_analytic?.table_of_content.filter(item => item !== 'Không có').length"
            :table-of-content="data?.data_analytic?.table_of_content.filter(item => item !== 'Không có')"
            :data="data"

        />
        <maybe-interested v-if="listRecommend" :recomends="listRecommend"/>
      </div>
    </div>
    <ReportFeaturedReport/>

    <a-modal
        :open="openContactForm"
        :footer="false"
        @cancel="openContactForm = false"
    >
      <div class="modal-contact-us" style="padding: 0 24px">
        <div class="title">Đăng ký nhận báo cáo</div>
        <div class="description" style="font-size: 16px">
          Vui lòng điền biểu mẫu bên dưới để nhận ngay báo cáo chi tiết
          <br>
          <span>"{{ data.name }}"</span>
        </div>
      </div>
      <ContactUsForm :source-name="'free_report'" :handle-submit-success="handleSubmitSuccess"/>
    </a-modal>
    <SuccessNotification
        v-if="isShowSuccessNotification"
        v-model:visible="isShowSuccessNotification"
        description=""
        class-name="submit-form-marketing-success"/>
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

  .container-metric {
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

      .redirect-to-normal-report {
        display: flex;
        padding: 24px 24px 0 24px;
        flex-direction: column;
        align-items: flex-start;
        gap: var(----spacing-3xl, 24px);
        align-self: stretch;

        border-radius: 16px;
        background: var(--Neutral-neutral-1, #FFF);

        box-shadow: 0px 4px 24px 0px rgba(157, 151, 191, 0.35);

        position: relative;

        overflow: hidden;

        .title {
          color: var(--Dark-blue-dark-blue-8, #241E46);
          text-align: center;

          font-family: Inter, sans-serif;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 32px; /* 133.333% */

          position: relative;
          z-index: 2;
        }

        .shape-1 {
          position: relative;
          z-index: 2;
        }

        .shape-2 {
          position: absolute;
          bottom: 0px;
          left: -10px;

          z-index: 2;
        }

        .background {
          position: absolute;
          object-fit: cover;

          width: 970.222px;
          height: 322.148px;

          left: -328.999px;
          top: 0px;

          z-index: 1;

          opacity: 0.5;

          user-select: none;
        }
      }
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
