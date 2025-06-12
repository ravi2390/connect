<template>
    <v-text-field
        v-show="false"
        id="mfpHiddenField"
        v-model="text"
        :disabled="field.disabled"
        :label="field.label + (field.required ? ' (required)' : '')"
        :required="field.required"
        :outlined="outlined"
        :solo="solo"
        :rules="[v => (!field.required || !!v) || (field.label + ' is required')]"
        autocomplete="new-password"
    />
</template>

<script>
import { debounce } from 'lodash-es';

export default {
    name: 'MfpHiddenField',
    props: {
        field: { type: Object, required: true },
        value: { type: String, default: null },
        outlined: { type: Boolean, default: false },
        solo: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    data: () => ({
        text: null,
    }),
    watch: {
        text() {
            this.change();
        },
        field: {
            deep: true,
            handler() {
                this.text = this.field.value;
            },
        },
    },
    mounted() {
        this.text = this.value;
        this.change = debounce(() => {
            this.$emit('update:modelValue', this.text);
        }, 500);
    },
};
</script>
