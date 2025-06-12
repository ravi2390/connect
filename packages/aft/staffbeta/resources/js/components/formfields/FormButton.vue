<template>
    <form-field
        type="button"
        :name="name"
        :label="label"
        :icon-style="iconStyle"
        :prefix-icon="prefixIcon"
        :prefix-text="prefixText"
        :classes="classes"
        :loading="loading"
        :callback="callback"
        :submit="submit"
        :tabindex="tabindex"
    />
</template>

<script>
import FormField from './FormField.vue';

export default {
    name: 'FormButton',
    components: { FormField },
    props: {
        callback: { type: Function, default: () => undefined },
        name: { type: String, required: true },
        label: { type: String, required: true },
        submit: { type: Boolean, default: false },
        classes: { type: String, default: 'btn-primary' },
        loading: { type: Boolean, default: false },
        iconStyle: { type: String, default: null },
        prefixIcon: { type: String, default: null },
        prefixText: { type: String, default: null },
        tabindex: { type: Number, default: null },
    },
};
</script>
