<template>
    <form-field
        v-model="textString"
        type="text"
        :label="label"
        :icon-style="iconStyle"
        :prefix-icon="prefixIcon"
        :prefix-text="prefixText"
        :tabindex="tabindex"
    />
</template>

<script>
import FormField from './FormField.vue';

export default {
    name: 'FormText',
    components: { FormField },
    props: {
        value: { type: String },
        callback: { type: Function, default: () => undefined },
        label: { type: String, required: true },
        iconStyle: { type: String, default: 'fas' },
        prefixIcon: String,
        prefixText: String,
        tabindex: { type: Number, default: null },
    },
    data: () => ({
        textString: '',
    }),
    watch: {
        value: function (value) {
            this.textString = value;
        },
        textString: function (value, prev) {
            this.$emit('input', value, prev);
        },
    },
};
</script>

<style scoped>
    .fa-ignore {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
</style>
