<script setup>
import { ref } from 'vue';
import AppEmpty from "~/components/ticket/AppEmpty.vue";
import AppCommentItem from "~/components/ticket/AppCommentItem.vue";

const props = defineProps({
  comments: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);

const selectedEditComment = ref(null);

const handleClickEditButton = (comment_id) => {
  selectedEditComment.value = comment_id;
};

const handleClickDeleteButton = (comment_id) => {
  emit('delete', {
    commentId: comment_id
  });
};

const handleSubmitEditComment = (comment) => {
  emit('edit', {
    commentId: comment.id,
    content: comment.content
  });
  selectedEditComment.value = null;
};
</script>

<template>
  <div class="list-comment">
    <template v-if="props.comments.data.length === 0">
      <a-flex align="center" justify="center" vertical>
        <app-empty :text="'Chưa có phản hồi'"/>
      </a-flex>
    </template>
    <template v-else>
      <app-comment-item v-for="comment in comments.data"
                        :key="comment.id"
                        :comment="comment"
                        :is-editing="selectedEditComment === comment.id"
                        @edit="handleClickEditButton"
                        @delete="handleClickDeleteButton" @submit-edit="handleSubmitEditComment" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.list-comment {
  border-bottom: 1px solid #eeebff;
  .comment-content {
    line-height: 1.5rem;
  }

  .edit-comment-button {
    cursor: pointer;
    margin-right: 1rem;

    &:hover {
      color: #1890ff;
    }
  }

  .delete-comment-button {
    cursor: pointer;

    &:hover {
      color: #ff4d4f;
    }
  }
}
</style>