<template>
    <div>
    <v-row>
        <v-col>
            <v-checkbox
                v-model="field.fields.billingSameAsHome.value"
                :label="field.fields.billingSameAsHome.label"
                :required="field.fields.billingSameAsHome.required"
                :disabled="designer"
                @update:model-value="billingAddressSameAsHome()"
            />
        </v-col>
    </v-row>
    <v-row v-if="field.fields">
        <v-col
            v-for="subField in getFieldsExceptSameAsHome"
            :key="subField.order"
        >
            <span v-if="subField.fieldName === 'billingState' && field.fields.billingSameAsHome.value">
                <v-text-field
                    v-model="subField.stateName"
                    variant="underlined"
                    :label="subField.label"
                    :disabled="designer || field.fields.billingSameAsHome.value"
                />
            </span>
            <span v-else>
                <component
                    :is="$MfpMapFieldTypeToComponent(subField.type)"
                    v-model="subField.value"
                    :label="subField.label"
                    :fixed="subField.fixed"
                    :required="subField.required"
                    :field="subField"
                    :designer="designer || field.fields.billingSameAsHome.value"
                    :disabled="designer || field.fields.billingSameAsHome.value"
                />
            </span>
        </v-col>
    </v-row>
    </div>
</template>
<script>
import { debounce } from 'lodash-es';

export default {
    name: 'MfpBillingAddress',
    props: {
        field: { type: Object, default: () => {} },
        label: { type: String, default: '' },
        required: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        designer: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    methods: {
        billingAddressSameAsHome() {
            if (!this.field.fields.billingSameAsHome.value) {
                this.field.fields.billingAddressLine1.value = '';
                this.field.fields.billingAddressLine2.value = '';
                this.field.fields.billingCity.value = '';
                this.field.fields.billingState.stateName = '';
                this.field.fields.billingZip.value = '';
            } else {
                this.field.fields.addressBillingPreferred.value = false;
            }

            this.field.fields.billingAddressLine1.disabled = this.field.fields.billingSameAsHome.value;
            this.field.fields.billingAddressLine2.disabled = this.field.fields.billingSameAsHome.value;
            this.field.fields.billingCity.disabled = this.field.fields.billingSameAsHome.value;
            this.field.fields.billingState.disabled = this.field.fields.billingSameAsHome.value;
            this.field.fields.billingZip.disabled = this.field.fields.billingSameAsHome.value;

            debounce(() => {
                this.$emit('update:modelValue', this.field);
            }, 500);
        },
    },
    computed: {
        getFieldsExceptSameAsHome() {
            return this.field.fields
                ? Object.values(this.field.fields).filter((subField) => subField.fieldName !== 'billingSameAsHome')
                : [];
        },
    }
};
</script>

<style scoped>
@media only screen and (max-width: 960px) {
    .m-col {
        flex: 0 0 100% !important;
    }
}
</style>
