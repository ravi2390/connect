<template>
    <div class="d-flex flex-row align-start">
        <v-checkbox-btn
            v-model="checked"
            :disabled="disabled"
            :required="required"
            hide-details
        />
        <p class="opt-text">
            {{ field.default }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'MfpChecktextField',
    props: {
        modelValue: { type: String, default: '1' },
        label: { type: String, default: 'MFP Checkbox Field' },
        required: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        field: { type: Object, default: () => {} },
    },
    emits: ['update:modelValue'],
    data: () => ({
        checked: true,
    }),
    watch: {
        checked() {
            this.$emit('update:modelValue', this.checked ? '1' : '0');
        },
    },
    mounted() {
        this.checked = !!parseInt(this.modelValue);
    }
};
</script>

<style lang="scss" scoped>
    .opt-text {
        color: #0C1F42;
    }
</style>
