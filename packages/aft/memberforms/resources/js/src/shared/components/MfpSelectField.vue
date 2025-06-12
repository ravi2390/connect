<template>
    <v-select
        v-model="select"
        :disabled="disabled"
        :label="label + (required ? ' (required)' : '')"
        :required="required"
        :items="items"
        autocomplete="new-password"
    />
</template>

<script>
export default {
    name: 'MfpSelectField',
    props: {
        value: { type: String, default: '' },
        field: { type: Object, default: () => {} },
        label: { type: String, default: 'MFP Select Field' },
        required: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    data: () => ({
        select: null,
        items: [],
    }),
    watch: {
        field() {
            console.log('SELECT ITEMS', this.field);
            this.items = this.field.source;
        },
        select() {
            this.change();
        },
    },
    mounted() {
        console.log('SELECT MOUNTED', this.field);
        if (!this.disabled) {
            this.items = this.field.source;
        }
    },
    methods: {
        change() {
            this.$emit('update:modelValue', this.select);
        },
    },
};
</script>
