<script setup lang="ts">
import {useCurrentUser} from "~/stores/current-user.js";
const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);
import {getGlobalVariable} from "~/services/GlobalVariableService";
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";

const emit = defineEmits(['submitStatus'])

const formData = reactive({
  fullName: '',
  email: '',
  phone: '',
  company: '',
  mktLeadSource: '',
  mktUserDemand: '',
  mktCompanyType: '',
})

const mktLeadSourceOptions = [
  {label: 'Chưa từng biết', value: 'Chưa từng biết'},
  {label: 'Báo cáo thị trường', value: 'Báo cáo thị trường'},
  {label: 'Sự kiện event', value: 'Sự kiện event'},
  {label: 'Social media, MXH', value: 'Social media, MXH'},
  {label: 'Báo chí', value: 'Báo chí'},
  {label: 'Google', value: 'Google'},
]

const mktUserDemandOptions = [
  {label: 'Nền tảng Phân tích Số liệu Ecommerce', value: 'Nền tảng Phân tích Số liệu Ecommerce'},
  {label: 'Báo cáo thị trường ngành hàng', value: 'Báo cáo thị trường ngành hàng'},
  {label: 'Dữ liệu thị trường theo yêu cầu', value: 'Dữ liệu thị trường theo yêu cầu'},
  {label: 'Hợp tác khác', value: 'Hợp tác khác'},
]

const mktCompanyTypeOptions = [
  {label: 'Doanh nghiệp', value: 'Doanh nghiệp'},
  {label: 'Cá nhân', value: 'Cá nhân'},
  {label: 'Không kinh doanh, chỉ tham khảo thông tin thị trường', value: 'Không kinh doanh, chỉ tham khảo thông tin thị trường'},
]

const rules = {
  fullName: [{required: true, message: 'Vui lòng nhập họ và tên', trigger: ['blur', 'change']}],
  email: [
    {required: true, message: 'Vui lòng nhập email', trigger: 'blur'},
    {type: 'email', message: 'Email không hợp lệ', trigger: ['blur', 'change']},
  ],
  phone: [
    {required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur'},
    {pattern: /^0[0-9]{9}$/, message: 'Số điện thoại không hợp lệ', trigger: ['blur', 'change']},
  ],
  mktLeadSource: [{required: true, message: 'Vui lòng chọn nguồn tìm kiếm', trigger: 'blur'}],
}

const loading = ref(false)
const createLead = async (data: any) => {
  try {
    const runtimeConfig = useRuntimeConfig()
    const url = `${runtimeConfig.public.URL_CRM_BACKEND_API}/crm/create/lead_form`
    return await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
  } catch (error) {
    console.error(error)
  }
}

const submitForm = async (values: any) => {
  trackEventCommon(EVENT_TYPE.SUBMIT_FORM_ANY_REPORT, 'submit_form_any_report', '');
  loading.value = true
  try {
    let note = `From: ${window.location.href}\n`
    const variables = await getGlobalVariable()
    const utm_source = variables?.utmSource || ''
    const utm_medium = variables?.utmMedium || ''
    const utm_campaign = variables?.utmCampaign || ''
    const utm_term = variables?.utmTerm || ''
    const utm_content = variables?.utmContent || ''
    const url_referrer = variables?.urlReferrer || ''
    const pub = variables?.pub || ''
    const emailProfile = userInfo?.value?.email || ''
    const first_visit = variables?.firstVisit || ''
    const mkLeadSource = values.mktLeadSource || ''
    const mkUserDemand = values.mktUserDemand || ''
    const mkCompanyType = values.mktCompanyType || ''

    note += `\nfirst_visit: ${first_visit}\npub: ${pub}\nutm_source: ${utm_source} utm_medium: ${utm_medium} utm_campaign: ${utm_campaign} utm_term: ${utm_term} utm_content: ${utm_content}\nurl_referrer: ${url_referrer}\nemailProfile: ${emailProfile}\n`
    note += `lead_source: ${mkLeadSource}\nuser_demand: ${mkUserDemand}\ncompany_type: ${mkCompanyType}`

    const payload = {
      name: values.fullName,
      phone: values.phone,
      email: values.email,
      organization_name: values.company,
      note,
      label_init: 'Nóng',
      // source_name: 'eReport - Mua gói',
      source_name: 'Website eReport',
      campaign: 'Đăng ký dùng thử',
      mkLeadSource,
      mkUserDemand,
      mkCompanyType,
      additional_info: {
        ...variables,
        mkLeadSource,
        mkUserDemand,
        mkCompanyType,
      },
    }

    const resp = await createLead(payload)
    console.log('resp', resp)
    emit('submitStatus', 'success')
  } catch (e) {
    console.log("Has error:", e)
    console.error(e)
    emit('submitStatus', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <a-form ref="leadForm"
          :model="formData"
          layout="vertical"
          :rules="rules"
          @finish="submitForm"
          class="FormTrialRegister">
    <a-form-item label="Họ và tên" name="fullName">
      <a-input placeholder="Họ và tên"
               v-model:value="formData.fullName"/>
    </a-form-item>
    <a-row :gutter="16">
      <a-col span="12">
        <a-form-item label="Email" name="email">
          <a-input placeholder="Email" v-model:value="formData.email"/>
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="Số điện thoại" name="phone">
          <a-input placeholder="Số điện thoại" v-model:value="formData.phone"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="Tên công ty" name="company">
      <a-input placeholder="Tên công ty" v-model:value="formData.company"/>
    </a-form-item>
    <a-form-item label="Bạn biết tới Metric từ kênh nào?" name="mktLeadSource">
      <a-select :max-tag-count="3"
                :max-tag-text-length="6"
                :options="mktLeadSourceOptions"
                v-model:value="formData.mktLeadSource"
                placeholder="Bạn biết tới Metric từ kênh nào?"></a-select>
    </a-form-item>
    <a-form-item label="Nhu cầu quan tâm" name="mktUserDemand">
      <a-select :options="mktUserDemandOptions"
                v-model:value="formData.mktUserDemand"
                placeholder="Nhu cầu quan tâm"></a-select>
    </a-form-item>
    <a-form-item label="Mô hình kinh doanh (Không bắt buộc)" name="mktCompanyType">
      <a-select :options="mktCompanyTypeOptions"
                v-model:value="formData.mktCompanyType"
                placeholder="Mô hình kinh doanh (Không bắt buộc)"></a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" style="height: 40px" block :loading="loading" html-type="submit">
        Đăng ký
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="scss">

</style>
