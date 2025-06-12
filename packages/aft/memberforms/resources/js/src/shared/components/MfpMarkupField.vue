<template>
    <div>
        <template v-if="field.fixed || !designer">
            <!-- eslint-disable vue/no-v-html -->
            <p v-html="displayText" />
            <!--eslint-enable-->
        </template>
        <v-sheet v-else>
            <ckeditor v-model="model" :editor="ClassicEditor" :config="config" :disabled="disabled" />
        </v-sheet>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Underline,
    FontSize,
    Alignment,
    List,
    AutoLink,
    Link,
} from 'ckeditor5';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import 'ckeditor5/ckeditor5.css';
import { reviseLinkUrls } from "../../../../../../../../resources/js/helpers/index.js";

const props = defineProps({
    field: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
    designer: { type: Boolean, default: false },
});
const model = defineModel();
const config = computed(() => {
  return {
    licenseKey: 'GPL',
    plugins: [
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Underline,
        FontSize,
        Alignment,
        List,
        Link,
        AutoLink,
    ],
    toolbar: [
        'undo',
        'redo',
        '|',
        'fontSize',
        'alignment',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'link',
    ],
  };
});

onMounted(() => {
    if (!model.value) {
        model.value = props.field.default;
    }
});
const displayText = computed(() => {
    return reviseLinkUrls(props.field.value || props.field.default);
});
</script>
<style>
.ck-editor__editable_inline {
    min-height: 200px;
}
</style>
