<template>
    <v-text-field
        v-model="text"
        :variant="fieldVariant"
        :disabled="field.disabled"
        :rules="rules"
        :prefix="prefix"
        hide-details="auto"
    >
        <template #label>
            <span v-if="field.required">
                <strong class="text-red">
                    *
                </strong>
            </span>
            {{ fieldLabel }}
        </template>
        <template #append-inner>
            <v-tooltip
                v-if="field.tooltip"
                location="right"
                color="primary-darken-2"
            >
                <template #activator="{ props }">
                    <v-icon
                        icon="mdi:mdi-information-outline"
                        class="ml-4"
                        v-bind="props"
                    >
                    </v-icon>
                </template>
                <span>{{ field.toolText }}</span>
            </v-tooltip>
        </template>
    </v-text-field>
</template>

<script>
import { debounce } from 'lodash-es';

export default {
    name: 'MfpTextField',
    props: {
        field: { type: Object, required: true },
        modelValue: { type: String, default: null },
        outlined: { type: Boolean, default: false },
        solo: { type: Boolean, default: false },
        designer: { type: Boolean, default: false },
        max: { type: Number, default: 100 },
        parent: { type: Object, required: false, default: null },
    },
    emits: ['update:modelValue'],
    data: () => ({
        text: null,
        rules: [],
        prefix: '',
    }),
    computed: {
        fieldLabel() {
            if (this.field.label) {
                return `${this.field.label}${this.field.required ? ' (required)' : ''}`;
            }
            return '';
        },
        fieldVariant() {
            return this.solo ? 'solo' : 'underlined';
        },
    },
    watch: {
        text() {
            this.change();
        },
    },
    mounted() {
        this.text = this.modelValue;
        this.rules.push((v) => (!this.field.required || !!v) || (this.field.label + ' is required'));
        if (this.field.type === 'email') {
            this.rules.push((v) => (!v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) || 'E-mail must be valid');
        }
        if (this.field.type === 'amount') {
            this.prefix = '$';
            // this.rules.push((v) => (!v || /^\d*\.?\d*$/.test(v)) || (this.field.label + ' must be valid'));
            this.rules.push((v) => (!v || /(?!0.00)(?=.*?\d)^\$?(([1-9]\d{0,2}(d{3})*)|\d+)?(\.[0-9]{2})?$/.test(v) || 'Please enter a valid amount (00.00)'));
        }
        if (this.field.label === 'Zip Code') {
            this.rules.push((v) => /^\d{5}$/.test(v) || 'Please enter a valid 5 digit zip code.');
        }

        if (this.field.label === 'Address Line 2') {
            this.field.label = 'Suite/Apt';
        }

        this.change = debounce(() => {
            this.$emit('update:modelValue', this.acceptInputText());
        }, 500);
    },
    methods: {
        acceptInputText() {
            if (this.field.type === 'amount') {
                return '$' + this.text;
            }
            return this.text;
        },
    },
};
</script>

<style lang="scss" scoped>
    .btn-tooltip {
        width: 24px;
        height: 24px;
    }
    .btn-tooltip .v-icon {
        font-size: 20px !important;
    }
</style>
