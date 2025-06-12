<template>
    <form-field
        v-model="emailString"
        type="email"
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
    name: 'FormEmail',
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
        emailString: '',
    }),
    watch: {
        value: function (value) {
            this.emailString = value;
        },
        emailString: function (value, prev) {
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
