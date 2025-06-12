<template>
    <v-checkbox
        v-model="checked"
        :disabled="disabled"
        :label="label + (required ? ' (required)' : '')"
        :required="required"
    />
</template>

<script>
import { debounce } from 'lodash-es';

export default {
    name: 'MfpCheckboxField',
    props: {
        modelValue: { type: Boolean, default: false },
        label: { type: String, default: 'MFP Checkbox Field' },
        required: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    data: () => ({
        checked: false,
    }),
    watch: {
        checked() {
            this.$emit('update:modelValue', this.checked);
        },
    },
    mounted() {
        this.checked = this.modelValue;
    },
};
</script>
