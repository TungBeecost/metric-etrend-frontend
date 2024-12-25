<script setup>
import { CalendarOutlined, EditFilled, DeleteFilled } from "@ant-design/icons-vue";
import FormRichTextEditor from "~/components/ticket/FormRichTextEditor.vue";
import IconSend from "~/components/ticket/IconSend.vue";
import { useCurrentUser } from "~/stores/current-user.js";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi'; // Import Vietnamese locale
import { ref } from 'vue';

dayjs.extend(relativeTime);
dayjs.locale('vi'); // Set Vietnamese locale

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const currentUserStore = useCurrentUser();
const { userInfo } = storeToRefs(currentUserStore);
const emit = defineEmits(['edit', 'delete', 'submitEdit']);

const handleClickEdit = () => {
  emit('edit', props.comment.id);
};

const handleClickCancelEdit = () => {
  emit('edit', null);
};

const handleClickDelete = () => {
  emit('delete', props.comment.id);
};

const handleSubmitEdit = () => {
  emit('submitEdit', { ...props.comment, content: localContent.value });
};

const formatDateTime = (date) => {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};

const localContent = ref(props.comment.content);
</script>


<template>
  <template v-if="props.isEditing">
    <div class="comment-item">
      <div class="comment-item__header">
        <div class="metadata">
          <span class="author-email">{{ props.comment.author }}</span>&nbsp;&nbsp;
          <span class="created-at"><calendar-outlined /> {{
              dayjs(props.comment.created_at).fromNow()
            }}&nbsp;({{ formatDateTime(props.comment.created_at) }})</span>
        </div>
        <div
            v-if="props.comment.comment_type !== 'system_log' && props.comment.author === userInfo.email && !props.isEditing"
            class="action">
          <span class="action-button edit-button" @click="handleClickEdit"><edit-filled /> Chỉnh sửa</span>
          <span class="action-button delete-button" @click="handleClickDelete"><delete-filled /> Xoá</span>
        </div>
      </div>
      <div class="comment-item__content--editing">
        <form-rich-text-editor v-model:content="localContent" style="background-color: #ffffff" />
        <a-flex align="center" justify="flex-end" style="margin-top: 1rem" gap="small">
          <a-button @click="handleClickCancelEdit">
            <div class="button-text">Hủy</div>
          </a-button>
          <a-button class="send-button" type="primary" @click="handleSubmitEdit">
            <template #icon>
              <icon-send />
            </template>
            <div class="button-text">Gửi chỉnh sửa</div>
          </a-button>
        </a-flex>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="comment-item">
      <div class="comment-item__header">
        <div class="metadata">
          <span class="author-email">{{ props.comment.author }}</span>&nbsp;&nbsp;
          <span class="created-at"><calendar-outlined /> {{
              dayjs(props.comment.created_at).fromNow()
            }}&nbsp;({{ formatDateTime(props.comment.created_at) }})</span>
        </div>
        <div v-if="props.comment.comment_type !== 'system_log' && props.comment.author === userInfo.email"
             class="action">
          <span class="action-button edit-button" @click="handleClickEdit"><edit-filled /> Chỉnh sửa</span>
          <span class="action-button delete-button" @click="handleClickDelete"><delete-filled /> Xoá</span>
        </div>
      </div>
      <div id="comment-item__content_style" class="comment-item__content" v-html="props.comment.content"></div>
    </div>
  </template>
</template>

<style scoped lang="scss">
.comment-item {
  padding: 1rem;

  .comment-item__header {
    display: flex;
    justify-content: space-between;

    .metadata {
      color: #716B95;
      font-family: Inter, Montserrat, sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }

    .action {
      display: none;

      .action-button {
        cursor: pointer;
        margin-left: 1rem;
        display: inline-block;
        font-size: 0.75rem;
        color: #716B95;
      }

      .edit-button {
        &:hover {
          color: #1890ff;
        }
      }

      .delete-button {
        &:hover {
          color: #ff4d4f;
        }
      }
    }
  }

  .comment-item__content {
    margin-top: 0.25rem;
    color: #241E46;
    font-family: Inter, Montserrat, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;

    &--editing {
      margin-top: 1rem;

      .send-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        .button-text {
          font-weight: 400;
        }
      }
    }
  }

  &:hover {
    background-color: #f7f7ff;

    .action {
      display: flex;
    }
  }
}
</style>
<style lang="scss">
#comment-item__content_style {
  ul {
    list-style-type: disc;
    margin-left: 20px;
  }
  ol {
    list-style-type: decimal;
    margin-left: 20px;
  }
}
</style>