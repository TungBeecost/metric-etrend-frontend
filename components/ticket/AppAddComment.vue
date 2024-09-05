<script setup>
import {message} from "ant-design-vue";
import FormRichTextEditor from "~/components/ticket/FormRichTextEditor.vue";
import IconSend from "~/components/ticket/IconSend.vue";

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:content', 'send'])

const commentContent = computed({
  get: () => props.content,
  set: (value) => {
    emit('update:content', value)
  }
})

const sendComment = () => {
  if (!commentContent.value || commentContent.value === '<p></p>') {
    message.error('Vui lòng điền nội dung trước khi gửi.');
    return;
  }
  emit('send')
}
</script>

<template>
  <div class="new-comment">
    <client-only>
      <template #fallback>
        Editor loading...
      </template>
      <form-rich-text-editor v-model:content="commentContent" style="background-color: #ffffff"/>
    </client-only>
    <a-flex align="center" justify="flex-end" style="margin-top: 1rem">
      <a-button class="send-button" type="primary" size="large" @click="sendComment">
        <template #icon>
          <icon-send />
        </template>
        <div class="button-text">Gửi phản hồi</div>
      </a-button>
    </a-flex>
  </div>
</template>

<style scoped lang="scss">
.new-comment {
  padding: 1.5rem;
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
</style>
