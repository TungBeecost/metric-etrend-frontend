<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ImageUploader from 'quill-image-uploader';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import DOMPurify from "dompurify";
import FileModule from '~/utils/file';

const customConfig = {
  ADD_TAGS: ['p', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'span'],
  ADD_ATTR: ['alt', 'height', 'width', 'style'],
};

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
});

const quillToolbar = [
  [{'size': ['small', false, 'large', 'huge']}, {'header': [1, 2, 3, 4, 5, 6, false]}],
  ['bold', 'italic', 'underline', 'strike'],
  [{'align': []}],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],
  ['clean']
];

const emit = defineEmits(['update:content']);

const editorContent = computed({
  get: () => DOMPurify.sanitize(props.content, customConfig),
  set: (value) => emit('update:content', DOMPurify.sanitize(value, customConfig))
});

const modules = [
  {
    name: 'imageUploader',
    module: ImageUploader,
    options: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          if (!file) {
            reject('File is empty');
          }
          if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
            reject('File is not an image');
          }
          const fileModule = new FileModule();
          fileModule.uploadFile(file)
              .then((url) => {
                console.log('Uploaded file URL:', url); // Add this line
                resolve(url);
              })
              .catch((error) => {
                reject(error);
              });
        });
      }
    }
  },
  {
    name: 'blotFormatter',
    module: BlotFormatter,
    options: {}
  }
];
</script>

<template>
  <div class="metric-editor">
    <quill-editor
        v-model:content="editorContent"
        content-type="html"
        placeholder="Nội dung yêu cầu"
        :toolbar="quillToolbar"
        :modules="modules"
        style="height: 16rem"
    />
  </div>
</template>

<style scoped lang="scss">
</style>