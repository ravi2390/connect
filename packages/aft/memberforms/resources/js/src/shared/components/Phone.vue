<template>
    <v-text-field
        v-model="phoneNumber"
        :label="label + (required ? ' (required)' : '')"
        :required="required"
        :rules="rules"
        variant="underlined"
        v-maska:phnumber.unmasked="phoneMask"
        @maska="onPhoneUpdate"
    />
</template>

<script>
import { vMaska } from "maska/vue";

export default {
    name: 'Phone',
    directives: { maska: vMaska },
    props: {
        required: {
            type: [Boolean, String],
            default: false,
        },
        modelValue: {
            type: [String, Number],
            default: '',
        },
        country: {
            type: [String],
            default: 'US',
        },
        label: {
            type: [String],
            default: 'Phone Number',
        },
        field: {
            type: Object
        },
        parent: {
            type: Object,
        }
    },
    emits: ['update:modelValue'],
    data: () => ({
        phoneNumber: null,
    }),
    computed: {
        isPhoneFormatApplicable() {
            const countryFields = {
                home: 'phoneHomeCountry',
                mobile: 'phoneMobileCountry',
                work: 'phoneWorkCountry',
            };
            const countryField = this.field.type in countryFields ? countryFields[this.field.type] : null;
            const countryCode =  countryField ? this?.parent?.fields[countryField]?.value : null;
            // USA and Canada.
            return [4, 2].includes(countryCode);
        },
        phoneMask() {
            return this.isPhoneFormatApplicable ? '(###) ###-####' : null;
        },
        rules() {
            const rules = [];
            if (this.required) {
                rules.push((v) => !!v || 'Phone number is required');
            }
            if (this.isPhoneFormatApplicable) {
                rules.push((v) => (!v || /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v)) || 'Please enter a valid 10 digit phone number.');
            }
            return rules;
        }
    },
    methods: {
        onPhoneUpdate(event) {
            this.$emit('update:modelValue', event.detail.unmasked);
        },
    },
    mounted() {
        if (this.modelValue) {
            this.phoneNumber = this.modelValue;
        }
        if (this.required) {
            this.rules.push();
        }
    },
};
</script>
