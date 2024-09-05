<script setup>
import { message } from "ant-design-vue";
import { createNewTicket } from "~/utils/ticket.js";
import FormRadioCard from "~/components/ticket/FormRadioCard.vue";
import IconSend from "~/components/ticket/IconSend.vue";
import FormRichTextEditor from "~/components/ticket/FormRichTextEditor.vue";

const currentUserStore = useCurrentUser();
const { userInfo } = storeToRefs(currentUserStore);
const supportDepartmentOptions = [
  {
    label: 'Hỗ trợ dịch vụ',
    value: 'service_support',
    description: 'Nơi tiếp nhận các yêu cầu hỗ trợ về thanh toán, hợp đồng và dịch vụ.<br/>' +
        'Quý khách có thể liên hệ hotline 0338062221.'
  },
  {
    label: 'Hỗ trợ kỹ thuật',
    value: 'technical_support',
    description: 'Nơi tiếp nhận các yêu cầu hỗ trợ về kỹ thuật, lỗi và góp ý.<br/>' +
        'Khuyến khích đính kèm ảnh mô tả.'
  }
];

const formTitle = useState('ticketForm.title', () => '');
const formCustomerEmail = useState('ticketForm.customerEmail', () => userInfo.value?.email || '');
const formAssignedEmails = useState('ticketForm.formAssignedEmails', () => '');
const formContent = useState('ticketForm.content', () => '');
const formSupportDepartment = useState('ticketForm.supportDepartment', () => {
  if (userInfo.value?.email?.includes('@metric.vn')) return 'technical_support';
  return 'service_support';
});
const sendLoading = useState('ticketForm.sendLoading', () => false);

const getTicketType = () => {
  const url = window.location.href;
  if (url.includes('http://localhost:3000')) {
    return 'metric';
  } else if (url.includes('https://ereport.vn')) {
    return 'ereport';
  }
  return 'unknown';
};

const submitForm = async () => {
  if (!formTitle.value || !formContent.value || !formContent.value === '<p></p>' || !formSupportDepartment.value) {
    message.error('Vui lòng điền đầy đủ thông tin trước khi gửi.');
    return;
  }
  sendLoading.value = true;
  const ticketType = getTicketType();
  const ticket = await createNewTicket({
    title: formTitle.value,
    customerEmail: formCustomerEmail.value,
    description: formContent.value,
    supportDepartment: formSupportDepartment.value,
    assignedEmails: assignedEmails.value,
    ticketType: ticketType
  });
  if (ticket) {
    navigateTo('/ticket/my-ticket');
  } else {
    message.error('Có lỗi xảy ra khi tạo yêu cầu mới.');
  }
  message.success('Tạo yêu cầu mới thành công!');
  formTitle.value = '';
  formContent.value = '<p></p>';
  formSupportDepartment.value = 'service_support';
  sendLoading.value = false;
};

const isStaff = computed(() => {
  return userInfo.value?.email?.includes('@metric.vn');
});

const assignedEmails = computed(() => {
  return formAssignedEmails.value.split(',').map(email => email.trim());
});
</script>

<template>
  <div class="main-content default_section">
    <div class="title-segment">
      <a-button type="link" @click="navigateTo('/ticket/my-ticket')">
        <template #icon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6924 17.5144L9.44238 11.8894L14.6924 6.2644" stroke="#241E46" stroke-width="1.3"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </a-button>
      <h2 class="title">Tạo yêu cầu mới</h2>
    </div>
    <a-form :layout="'vertical'" class="submit-form">
      <a-form-item label="Tiêu đề" name="title">
        <a-input v-model:value="formTitle"
                 placeholder="Tiêu đề"
                 size="large"/>
      </a-form-item>
      <a-form-item label="Email khách hàng" name="customerEmail">
        <a-input v-model:value="formCustomerEmail"
                 placeholder="example@gmail.com"
                 :disabled="!isStaff"
                 size="large"/>
      </a-form-item>
      <a-form-item label="Bộ phận hỗ trợ" name="supportDepartment">
        <a-radio-group v-model:value="formSupportDepartment" style="display: flex; gap: 16px">
          <form-radio-card v-for="option in supportDepartmentOptions"
                           :key="option.value"
                           :label="option.label"
                           :value="option.value"
                           :current-selected="formSupportDepartment"
                           :description="option.description"/>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="isStaff" label="Email người phụ trách" name="assignedEmails">
        <a-input v-model:value="formAssignedEmails"
                 placeholder="example@metric.vn,example1@metric.vn,..."
                 :disabled="!isStaff"
                 size="large"/>
      </a-form-item>
      <a-form-item>
        <client-only>
          <template #fallback>
            Loading Editor...
          </template>
          <form-rich-text-editor v-model:content="formContent"/>
        </client-only>
      </a-form-item>
      <a-flex align="center" justify="flex-end">
        <a-form-item>
          <a-button type="primary" class="submit-button" @click="submitForm" :loading="sendLoading">
            <template #icon>
              <icon-send />
            </template>
            <div class="button-label">Gửi</div>
          </a-button>
        </a-form-item>
      </a-flex>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  .title-segment {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    h2.title {
      font-weight: 700;
      color: #241E46;
      font-size: 1.25rem;
      margin-bottom: 0;
      margin-left: 0.5rem;
    }
  }

  .submit-form {
    background-color: #ffffff;
    padding: 1.5rem;
    border: 1px solid #eeebff;
    border-radius: 1rem;

    .submit-button {
      display: flex;
      align-items: center;
      gap: 8px;
      .button-label {
        color: #FFF;
        text-align: center;
        font-family: Inter, Montserrat, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
      }
    }
  }
}
</style>
