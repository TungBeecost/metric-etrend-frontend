<script setup>
import {SwapOutlined} from "@ant-design/icons-vue";
import {useCurrentUser} from "~/stores/current-user.js";
import {getTicketDetailByCode} from "~/utils/ticket.js";
import AppTitle from "~/components/ticket/AppTitle.vue";
import dayjs from "dayjs";
import AppTag from "~/components/ticket/AppTag.vue";
import AppListComment from "~/components/ticket/AppListComment.vue";
import AppAddComment from "~/components/ticket/AppAddComment.vue";
import AppSection from "~/components/ticket/AppSection.vue";
import {addNewComment, editComment, getCommentsByTicketId, removeComment} from "~/utils/comment.js";

definePageMeta({
  title: "Metric Feedback",
  validate({params}) {
    return typeof params.code === 'string'
  }
});

const route = useRoute();
const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);
const {
  pending: ticketLoading,
  data: ticket = undefined,
} = await useAsyncData("ticket", async () => {
  return await getTicketDetailByCode(route.params.code);
});


if (!ticket.value) {
  showError({
    statusCode: 404,
    statusMessage: "Ticket not found",
  });
}

if ((ticket.value.customer_email !== userInfo.email &&
        !userInfo.email.endsWith('@metric.vn')) ||
    (ticket.value.reporter !== userInfo.email &&
        !userInfo.email.endsWith('@metric.vn'))) {
  showError({
    statusCode: 404,
    statusMessage: "Ticket Not Found",
  });
}

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
  refresh: refreshComments
} = await useAsyncData("comments", async () => {
  return await getCommentsByTicketId(ticket.value.data.id);
});

const formatDateTime = (date) => {
  if (!date) return ''
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
};

const newCommentContent = useState('newCommentContent', () => '');

const sendComment = async () => {
  await addNewComment(ticket.value.data.id, newCommentContent.value);
  newCommentContent.value = '<p></p>';
  await refreshComments();
};

const handleEditComment = async ({commentId, content}) => {
  commentsLoading.value = true;
  await editComment(commentId, content);
  await refreshComments();
  commentsLoading.value = false;
};

const handleDeleteComment = async ({commentId}) => {
  commentsLoading.value = true;
  await removeComment(commentId);
  await refreshComments();
  commentsLoading.value = false;
};
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
      <h2 class="title">Chi tiết yêu cầu</h2>
    </div>
    <app-section class="ticket-detail-section">
      <div class="header">
        <app-title :text="`[#${ticket.data?.id}] ${ticket.data?.title}`"/>
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
        <div class="description" v-html="ticket.data?.description"></div>
      </div>
    </app-section>
    <div class="comment-section">
      <a-flex align="center" justify="space-between" class="comment-section__header">
        <app-title :text="'Phản hồi từ eReport'"/>
        <a-button
            v-if="userInfo.email.endsWith('@metric.vn')"
            type="primary"
            @click="() => navigateTo(`/ticket/internal/detail/tkid.${ticket.data.id}`)">
          <template #icon>
            <swap-outlined/>
          </template>
          Kênh chat nội bộ
        </a-button>
      </a-flex>
      <a-spin :spinning="commentsLoading">
        <app-list-comment :comments="comments" @edit="handleEditComment" @delete="handleDeleteComment"/>
      </a-spin>
      <app-add-comment
        v-model:content="newCommentContent"
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
    flex: 1;
    background-color: #ffffff;

    .header {
      padding: 1.5rem;
      border-bottom: 1px solid #eeebff;
    }

    .content {
      padding: 1.5rem;

      .ticket-metadata {
        margin-bottom: 4rem; // Add margin to ensure space between metadata and other elements

        &__item {
          height: 2.5rem;
          display: flex;
          justify-content: space-between;

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

        img {
          cursor: pointer;
        }
      }
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

@media (max-width: 768px) {
  .title-segment {
    margin-top: 30px;
  }

  .ticket-detail-section {
    .header, .content {
      padding: 1rem;
    }

    .ticket-metadata {
      margin-bottom: 4rem !important;

      &__item {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 1rem;

        &__label, &__value {
          width: 100%;
          text-align: left;
        }

        &__label {
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  .comment-section {
    &__header {
      padding: 1rem;
    }
  }
}
</style>