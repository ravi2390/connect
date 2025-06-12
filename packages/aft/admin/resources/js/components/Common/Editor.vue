<template>
    <ckeditor v-model="model" :editor="ClassicEditor" :config="config" />
</template>
<script setup>
import { computed, defineModel, defineProps } from 'vue';
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  FontSize,
  FontColor,
  FontBackgroundColor,
  Alignment,
  List,
  AutoLink,
  Link,
  CodeBlock,
  Image,
  ImageInsert,
  ImageResize,
  SimpleUploadAdapter,
} from 'ckeditor5';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';

import 'ckeditor5/ckeditor5.css';

const model = defineModel();
const props = defineProps({
  uploadUrl: { type: String },
});
const colors = {
  colors: [
    {
      color: 'black',
      label: 'Black',
    },
    {
      color: 'gray',
      label: 'Gray',
    },
    {
      color: 'silver',
      label: 'Silver',
    },
    {
      color: 'white',
      label: 'White',
    },
    {
      color: 'red',
      label: 'Red',
    },
    {
      color: 'green',
      label: 'Green',
    },
    {
      color: 'blue',
      label: 'Blue',
    },
    {
      color: 'yellow',
      label: 'Yellow',
    },
    {
      color: 'orange',
      label: 'Orange',
    },
    {
      color: 'purple',
      label: 'Purple',
    },
    {
      color: 'brown',
      label: 'Brown',
    },
  ],
  columns: 7,
};
const config = computed(() => {
  return {
    licenseKey: 'GPL',
    codeBlock: {
      languages: [
        { language: 'plaintext', label: 'Plain text' },
        { language: 'html', label: 'HTML' },
        { language: 'css', label: 'CSS' },
        { language: 'javascript', label: 'JavaScript' },
        { language: 'php', label: 'PHP' },
      ],
    },
    fontColor: colors,
    fontBackgroundColor: colors,
    image: {
      insert: {
        integrations: ['upload']
      }
    },
    plugins: [
      Essentials,
      Paragraph,
      Bold,
      Italic,
      Underline,
      FontSize,
      FontColor,
      FontBackgroundColor,
      Alignment,
      List,
      Link,
      AutoLink,
      CodeBlock,
      Image,
      ImageInsert,
      ImageResize,
      SimpleUploadAdapter,
    ],
    simpleUpload: {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      uploadUrl: props.uploadUrl,
      withCredentials: true,
    },
    toolbar: [
      'undo',
      'redo',
      '|',
      'fontSize',
      'alignment',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'link',
      '|',
      'codeBlock',
      'insertImage',
    ]
  };
});
</script>
<style>
.ck-editor__editable_inline {
  min-height: 200px;
}
</style>
