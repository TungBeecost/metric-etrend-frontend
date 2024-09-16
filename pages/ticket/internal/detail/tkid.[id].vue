<script setup>
import {SwapOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import AppTag from "~/components/ticket/AppTag.vue";
import {getTicketDetail, updateTicket} from "~/utils/ticket.js";
import {addNewInternalComment, editComment, getCommentsByTicketIdInternal, removeComment} from "~/utils/comment.js";
import {
  priorityOptions,
  resolveAsOptions,
  statusOptions,
  supportDepartmentOptions
} from "~/constant/general/common_ticket.js";
import AppDrawer from "~/components/ticket/AppDrawer.vue";
import AppSection from "~/components/ticket/AppSection.vue";
import AppTitle from "~/components/ticket/AppTitle.vue";
import AppTicketList from "~/components/ticket/AppTicketList.vue";
import IconEdit from "~/components/ticket/IconEdit.vue";
import IconSend from "~/components/ticket/IconSend.vue";
import AppListComment from "~/components/ticket/AppListComment.vue";
import AppAddComment from "~/components/ticket/AppAddComment.vue";

import {getListCCOptions, getListUserStaffOptions} from "~/utils/user.js";
import dayjs from "dayjs";

const route = useRoute();

const {
  pending: ticketLoading,
  data: ticket = undefined,
  refresh: refreshTicketDetail
} = await useAsyncData("ticket.internal", async () => {
  return await getTicketDetail(route.params.id, true);
});

if (!ticket.value) {
  showError({
    statusCode: 404,
    statusMessage: "Ticket not found",
  });
}

const formatDateTime = (date) => {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};

const setupPreviewImage = () => {
  document.querySelectorAll('.ticket-detail-section > .content > .description img').forEach((imgElement) => {
    imgElement.style.cursor = 'pointer';
    imgElement.addEventListener('click', (e) => {
      window.open(e.target.src, '_blank');
    });
  });
};

onMounted(() => {
  setupPreviewImage();
});

const {
  pending: commentsLoading,
  data: comments = [],
  refresh: refreshInternalComments
} = await useAsyncData("comments.internal", async () => {
  return await getCommentsByTicketIdInternal(route.params.id);
});

const newCommentInternalContent = useState('newCommentInternalContent', () => '');

const sendComment = async () => {
  await addNewInternalComment(route.params.id, newCommentInternalContent.value);
  newCommentInternalContent.value = '<p></p>';
  console.log('sendComment', newCommentInternalContent.value);
  await refreshInternalComments();
};

const handleEditComment = async (event) => {
  commentsLoading.value = true;
  await editComment(event.commentId, event.content)
  await refreshInternalComments();
  commentsLoading.value = false;
};

const handleDeleteComment = async (event) => {
  commentsLoading.value = true;
  await removeComment(event.commentId);
  await refreshInternalComments();
  commentsLoading.value = false;
};

const isOpenDrawer = useState('isOpenDrawer', () => false);

const handleClickEditButton = () => {
  isOpenDrawer.value = true;
};

const handleCloseDrawer = () => {
  isOpenDrawer.value = false;
};

const statusOpts = useState('detail.ticket.internal.statusOptions', () => [...statusOptions])
const supportDepartmentOpts = useState('detail.ticket.internal.supportDepartmentOptions', () => [...supportDepartmentOptions])
const priorityOpts = useState('detail.ticket.internal.priorityOptions', () => [...priorityOptions])
const resolveAsOpts = useState('detail.ticket.internal.resolveAsOptions', () => [...resolveAsOptions])

const {pending: staffOptionsLoading, data: staffOptions} = useAsyncData('userOptions', async () => {
  const listUserStaffOptions = await getListUserStaffOptions();
  return listUserStaffOptions.map((user) => ({
    label: user.email,
    value: user.id
  }))
});

const formEditState = reactive({
  status: ticket?.value?.data.status,
  supportDepartment: ticket?.value?.data.support_department,
  owner: ticket?.value?.data.owner,
  personIncharge: ticket?.value?.data.person_incharge,
  priority: ticket?.value?.data.priority,
  dueDate: ticket?.value?.data.due_date ? dayjs(ticket?.value?.data.due_date) : null, // Ensure dueDate is set correctly
  mktTagline: ticket?.value?.data.mkt_tagline,
  cc: [],
  resolveAs: null,
});

const {data: ccOptions} = useAsyncData('ccOptions', async () => {
  const options = await getListCCOptions();
  formEditState.cc = ticket.value?.data.cc?.map((item) => {
    return options.data.find(o => {
      if (item.includes('@')) return o.label === item
      else if (item.startsWith('group:')) return o.label === item.split(':')[1]
    })
  }).map(oCC => oCC.value) ?? [];
  return options.data.map((option) => ({
    label: option.label,
    value: option.value
  }))
});

const handleSubmitAction = async () => {
  const filteredFormEditState = Object.entries(formEditState)
      .filter(([key, value]) => {
        if (key === 'status' && value === ticket?.value?.data.status) return false;
        if (key === 'supportDepartment' && value === ticket?.value?.data.support_department) return false;
        if (key === 'owner' && value === ticket?.value?.data.owner_id) return false;
        if (key === 'personIncharge' && value === ticket?.value?.data.person_incharge) return false; // Kiểm tra giá trị personIncharge
        if (key === 'priority' && value === ticket?.value?.data.priority) return false;
        if (key === 'dueDate') {
          if (value === null && ticket?.value?.data.due_date === null) return false;
          if (value === null && ticket?.value?.data.due_date !== null) return true;
          if (value !== null && ticket?.value?.data.due_date === null) return true;
          return !(dayjs(value).format('DD/MM/YYYY') === dayjs(ticket?.value?.data.due_date).format('DD/MM/YYYY'));
        }
        if (key === 'mktTagline' && value === ticket?.value?.data.mkt_tagline) return false;
        if (key === 'cc') {
          if (!value && !ticket?.value?.data.cc) return false;
          if (!value && ticket?.value?.data.cc) return true;
          if (value && !ticket?.value?.data.cc) return true;
          const isSame = JSON.stringify(value) === JSON.stringify(ticket?.value?.data.cc.map(ccI => ccOptions.value.find(ccO => ccO.label === ccI)?.value));
          if (isSame) return false;
        }
        if (key === 'resolveAs') {
          return formEditState.status === 'done' && ticket?.value?.data.status !== 'done' && value !== undefined;
        }
        return true;
      })
      .map(([mapKey, mapValue]) => {
        if (mapKey === 'status') return { action_type: 'change_status', subject: mapValue };
        if (mapKey === 'supportDepartment') return { action_type: 'change_support_department', subject: mapValue };
        if (mapKey === 'owner') return { action_type: 'reassign', subject: mapValue };
        if (mapKey === 'personIncharge') return { action_type: 'change_incharge', subject: mapValue }; // Thêm action_type cho personIncharge
        if (mapKey === 'priority') return { action_type: 'change_priority', subject: mapValue };
        if (mapKey === 'dueDate') return { action_type: 'change_due_date', subject: mapValue };
        if (mapKey === 'mktTagline') return { action_type: 'change_mkt_tagline', subject: mapValue };
        if (mapKey === 'cc') return { action_type: 'change_cc', subject: mapValue };
        if (mapKey === 'resolveAs') return { action_type: 'resolve', subject: mapValue };
      });

  const updatedTicket = await updateTicket(route.params.id, filteredFormEditState);
  if (updatedTicket) {
    isOpenDrawer.value = false;
    await Promise.all([
      refreshTicketDetail(),
      refreshInternalComments(),
    ]);
    message.success('Cập nhật thành công');
  } else {
    message.error('Cập nhật thất bại');
  }
};

const filterEmailOptions = (input, option) => {
  return option.label.toLowerCase().startsWith(input.toLowerCase());
}

const filterCCOptions = (input, option) => {
  return option.label.toLowerCase().startsWith(input.toLowerCase());
}

const filterDepartmentOptions = (input, option) => {
  return option.label.toLowerCase().startsWith(input.toLowerCase());
}
</script>

<template>
  <div class="main-content default_section">
    <div class="title-segment">
      <a-button type="link" @click="navigateTo('/ticket/internal')">
        <template #icon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6924 17.5144L9.44238 11.8894L14.6924 6.2644" stroke="#241E46" stroke-width="1.3"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </a-button>
      <h2 class="title">Chi tiết yêu cầu</h2>
    </div>
    <a-spin :spinning="ticketLoading">
      <app-section class="ticket-detail-section">
        <div class="header">
          <app-title :text="`[Ticket #${ticket.data?.id}] ${ticket.data?.title}`"/>
          <a-button class="modified-button" size="large" @click="handleClickEditButton">
            <template #icon>
              <icon-edit class="icon-edit"/>
            </template>
            Chỉnh sửa
          </a-button>
        </div>
        <div class="content">
          <table class="ticket-metadata">
            <tr class="ticket-metadata__item">
              <td class="ticket-metadata__item__label">Ngày gửi yêu cầu</td>
              <td class="ticket-metadata__item__value">{{ formatDateTime(ticket.data?.created_at) }}</td>
            </tr>
            <tr class="ticket-metadata__item">
              <td class="ticket-metadata__item__label">Trạng thái</td>
              <td class="ticket-metadata__item__value">
                <app-tag :type="getStatusColor(ticket.data?.status)">{{ getStatusText(ticket.data?.status) }}</app-tag>
              </td>
            </tr>
            <tr class="ticket-metadata__item">
              <td class="ticket-metadata__item__label">Phân loại hỗ trợ</td>
              <td class="ticket-metadata__item__value">{{ getSupportDepartmentName(ticket.data?.support_department) }}</td>
            </tr>
            <tr class="ticket-metadata__item">
              <td class="ticket-metadata__item__label">Link báo cáo</td>
              <td class="ticket-metadata__item__value">{{ ticket.data?.report_link }}</td>
            </tr>
          </table>
          <a-divider/>
          <a-flex gap="middle">
            <table class="ticket-metadata">
              <tr class="ticket-metadata__item">
                <td class="ticket-metadata__item__label">Ưu tiên</td>
                <td class="ticket-metadata__item__value">
                  <app-tag :type="getPriorityColor(ticket.data?.priority)">{{ getPriorityText(ticket.data?.priority) }}</app-tag>
                </td>
              </tr>
              <tr class="ticket-metadata__item">
                <td class="ticket-metadata__item__label">Người báo cáo</td>
                <td class="ticket-metadata__item__value">{{ ticket.data?.reporter }}</td>
              </tr>
              <tr class="ticket-metadata__item">
                <td class="ticket-metadata__item__label">Khách hàng</td>
                <td class="ticket-metadata__item__value">{{ ticket.data?.customer_email }}</td>
              </tr>
              <tr class="ticket-metadata__item">
                <td class="ticket-metadata__item__label">Người sở hữu</td>
                <td class="ticket-metadata__item__value">{{ ticket.data?.owner }}</td>
              </tr>
            </table>
            <table class="ticket-metadata">
              <tr class="ticket-metadata__item">
                <td class="ticket-metadata__item__label">Phụ trách</td>
                <td class="ticket-metadata__item__value">{{ ticket.data?.person_incharge }}</td>
              </tr>
              <tr class="ticket-metadata__item">
                <td class="ticket-metadata__item__label">Ngày đến hạn</td>
                <td class="ticket-metadata__item__value">{{ formatDateTime(ticket.data?.due_date) }}</td>
              </tr>
              <tr class="ticket-metadata__item">
                <td class="ticket-metadata__item__label">MKT Giới thiệu</td>
                <td class="ticket-metadata__item__value">{{ ticket.data?.mkt_tagline }}</td>
              </tr>
              <tr class="ticket-metadata__item">
                <td class="ticket-metadata__item__label">Cc</td>
                <td class="ticket-metadata__item__value">{{ ticket.data?.cc?.join(', ') }}</td>
              </tr>
            </table>
          </a-flex>
          <a-divider/>
          <div class="description" v-html="ticket.data?.description"></div>
        </div>
      </app-section>
      <app-section v-if="true" class="child-tickets-section">
        <div class="header">
          <app-title text="Child Tickets"/>
        </div>
        <app-ticket-list :tickets="ticket.data.child_tickets"
                         :loading="ticketLoading"
                         :pagination="{
                           pageSize: ticket.data.child_tickets.length,
                           current: 1,
                           total: ticket.data.child_tickets.length
                         }"
        />
      </app-section>
    </a-spin>
    <app-drawer :open="isOpenDrawer" @close="handleCloseDrawer">
      <a-form :model="formEditState" name="form-edit" layout="vertical" @finish="handleSubmitAction">
        <a-form-item label="Chuyển trạng thái thành" name="status">
          <a-select v-model:value="formEditState.status" :options="statusOpts">
          </a-select>
        </a-form-item>
        <a-form-item v-if="formEditState.status === 'done'" label="Resolve as" name="resolveAs">
          <a-select v-model:value="formEditState.resolveAs" :options="resolveAsOpts">
          </a-select>
        </a-form-item>
        <a-form-item label="Phân loại hỗ trợ" name="supportDepartment">
          <a-select v-model:value="formEditState.supportDepartment"
                    :filter-option="filterDepartmentOptions"
                    :options="supportDepartmentOpts">
          </a-select>
        </a-form-item>
        <a-form-item label="Reassign to" name="owner">
          <a-select v-model:value="formEditState.owner"
                    :options="staffOptions"
                    :show-search="true"
                    :show-arrow="false"
                    :filter-option="filterEmailOptions"
                    :loading="staffOptionsLoading">
          </a-select>
        </a-form-item>
        <a-form-item label="Change In Charge to" name="personIncharge">
          <a-select v-model:value="formEditState.personIncharge"
                    :options="staffOptions"
                    :show-arrow="false"
                    :show-search="true"
                    :filter-option="filterEmailOptions"
                    :loading="staffOptionsLoading">

          </a-select>
        </a-form-item>
        <a-form-item label="Thay đổi độ ưu tiên" name="priority">
          <a-select v-model:value="formEditState.priority" :options="priorityOpts">

          </a-select>
        </a-form-item>
        <a-form-item label="Hạn hoàn thành" name="dueDate">
          <a-date-picker v-model:value="formEditState.dueDate"
                         style="width: 100%"
                         format="DD/MM/YYYY"
                         placeholder="Chọn hạn xử lý"/>
        </a-form-item>
        <a-form-item label="CC" name="cc">
          <a-select v-model:value="formEditState.cc"
                    :options="ccOptions"
                    :show-arrow="false"
                    :show-search="true"
                    :filter-option="filterCCOptions"
                    :loading="staffOptionsLoading"
                    mode="multiple"></a-select>
        </a-form-item>
        <a-form-item label="MKT Tagline" name="mktTagline">
          <a-input v-model:value="formEditState.mktTagline"/>
        </a-form-item>
        <a-form-item :wrapper-col="{span: 24, offset: 20}">
          <a-button type="primary" style="display: flex; gap: 0.25rem" html-type="submit">
            <template #icon>
              <icon-send/>
            </template>
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </app-drawer>
    <div class="comment-section">
      <a-flex align="center" justify="space-between" class="comment-section__header">
        <app-title :text="'Phản hồi [Nội bộ]'"/>
        <a-button type="primary"
                  @click="navigateTo(`/ticket/detail/${ticket.data.ticket_code}`)">
          <template #icon>
            <swap-outlined/>
          </template>
          Chat với khách hàng
        </a-button>
      </a-flex>
      <a-spin :spinning="commentsLoading">
        <app-list-comment :comments="comments" @edit="handleEditComment" @delete="handleDeleteComment"/>
      </a-spin>
      <app-add-comment
          v-model:content="newCommentInternalContent"
          @send="sendComment"
      />
    </div>
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

  .ticket-detail-section {
    .header {
      padding: 1.5rem;
      border-bottom: 1px solid #eeebff;
      display: flex;
      justify-content: space-between;

      .modified-button {
        display: flex;
        gap: 0.25rem;
        border: 1px solid #9D97BF;
        color: #241E46;

        .icon-edit {
          transform: translateY(0.1rem);
        }

        &:hover {
          border: 1px solid #241E46;
          background-color: #f5f3fd;
        }
      }
    }

    .content {
      padding: 1.5rem;

      .ticket-metadata {
        &__item {
          height: 2.5rem;

          &__label {
            width: 10rem;
            color: #716B95;
            font-family: Inter, Montserrat, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
          }

          &__value {
            width: 20rem;
            text-align: left;
            color: #241E46;
            font-family: Inter, Montserrat, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
          }
        }
      }

      .description {
        text-align: left;
        color: #241E46;
        font-family: Inter, Montserrat, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
      }
    }
  }

  .child-tickets-section {
    margin-top: 1rem;

    .header {
      padding: 1.5rem;
      border-bottom: 1px solid #eeebff;
      display: flex;
      justify-content: space-between;
    }
  }

  .comment-section {
    border: 1px solid #eeebff;
    margin-top: 1rem;
    background-color: #ffffff;
    border-radius: 0.5rem;

    &__header {
      padding: 1.5rem;
      border-bottom: 1px solid #eeebff;
    }
  }

}
</style>
