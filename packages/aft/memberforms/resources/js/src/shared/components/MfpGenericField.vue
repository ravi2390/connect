<template>
    <div class="form-designer-col">
        <component
            v-if="!designer && field.type == 'markup'"
            :is="$MfpMapFieldTypeToComponent(field.type)"
            v-model="field.value"
            :item-key="itemKey"
            :field="field"
            :label="field.label"
            :required="field.required"
            :fixed="field.fixed"
            :designer="designer"
            :disabled="designer"
        />
        <v-card v-else-if="field.type !== 'hidden'" variant="elevated" class="mb-2 elevation-4">
            <template #append>
                <v-btn
                    v-if="!field.fixed && designer"
                    @click="remove(itemKey)"
                    icon="mdi:mdi-close"
                    variant="tonal"
                    density="compact"
                >
                </v-btn>
            </template>
            <v-card-title
                class="genericTitle"
                color="aft-dark-blue"
            >
                <div class="d-flex ga-2">
                    <v-icon
                        v-if="designer"
                        class="handle"
                        icon="mdi:mdi-arrow-up-down"
                        size="small"
                    ></v-icon>
                    <div class="w-25">
                        <MfpTextField
                            v-if="designer"
                            v-model="field.label"
                            :field="{}"
                            :designer="designer"
                            solo
                            class="mr-4"
                            @update:model-value="handleLabelChange"
                        />
                        <span v-else-if="field.type !== 'markup'">
                            {{ field.label }}
                        </span>
                        <span
                            v-if="designer"
                            class="d-flex justify-end pt-4 pr-4 text-caption"
                            :class="{ 'text-error': textLengthError }"
                        >
                            {{ field.label.length }}/100
                        </span>
                    </div>
                    <div class="d-flex">
                        <v-checkbox
                            v-if="designer && field.type !== 'markup'"
                            v-model="field.required"
                            :disabled="field.fixed"
                            :designer="designer"
                            label="Required"
                            class="mr-4"
                            @update:model-value="handleRequiredChange"
                        />
                        <v-checkbox
                            v-if="designer && field.type === 'markup'"
                            v-model="field.orderAbove"
                            :designer="designer"
                            label="Display Above"
                            class="mr-4"
                        />
                        <v-checkbox
                            v-if="designer && field.type === 'markup'"
                            v-model="field.orderBelow"
                            :designer="designer"
                            label="Display Below"
                            class="mr-4"
                        />
                    </div>
                </div>
            </v-card-title>
            <v-card-text>
                <component
                    :is="$MfpMapFieldTypeToComponent(field.type)"
                    v-model="field.value"
                    :item-key="itemKey"
                    :field="field"
                    :label="field.label"
                    :required="field.required"
                    :fixed="field.fixed"
                    :designer="designer"
                    :disabled="isDisabled(designer && field.type)"
                />
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import MfpTextField from './MfpTextField.vue';
export default {
    name: 'MfpGenericField',
    components: { MfpTextField },
    props: {
        itemKey: { type: Number, required: true },
        field: { type: Object, required: true },
        designer: { type: Boolean, default: false },
    },
    emits: ['remove'],
    mounted() {
        if (this.field.fieldName === 'phoneHomeGroup') {
            this.field.fields = {
                phoneHomeCountry: this.getCountryCallingCodeObject(),
                ...this.field.fields,
            };
        } else if (this.field.fieldName === 'phoneWorkGroup') {
            this.field.fields = {
                phoneWorkCountry: this.getCountryCallingCodeObject(),
                ...this.field.fields,
            };
        } else if (this.field.fieldName === 'phoneMobile') {
            this.field.fields.phoneMobileGroup.fields = {
                phoneMobileCountry: this.getCountryCallingCodeObject(),
                ...this.field.fields.phoneMobileGroup.fields,
            };
        }
    },
    computed: {
        textLengthError() {
            return this.field.label.length > 100;
        },
    },
    methods: {
        remove(index) {
            this.$emit('remove', index);
        },
        isDisabled(designer, type) {
            return designer && !['markup', 'textarea'].includes(type);
        },
        getCountryCallingCodeObject() {
            return {
                order: 0,
                type: 'countryCallingCodes',
                label: 'Country',
                required: true,
                default: 4,
            };
        },
        handleLabelChange() {
            const fieldLabels = {
                phoneHomeGroup: 'phoneHome',
                phoneWorkGroup: 'phoneWork',
                emailPersonalGroup: 'email',
                emailWorkGroup: 'emailWork',
            };
            if (Object.keys(fieldLabels).includes(this.field.fieldName)) {
                this.field.fields[fieldLabels[this.field.fieldName]].label = this.field.label;
            }
            if (this.field.fieldName === 'phoneMobile') {
                this.field.fields.phoneMobileGroup.fields.phoneMobile.label = this.field.label;
            }
        },
        handleRequiredChange() {
            if (this.field.type !== 'group') {
                return;
            }
            if (this.field.fieldsAsRows) {
                if (this.field.fields[this.field.fieldName] != null) {
                    this.field.fields[this.field.fieldName].required = this.field.required;
                }
                // @todo: what is this meant to do?
                const mobileGroup = { ...this.field.fields.phoneMobileGroup };
                const { fields } = mobileGroup;
                const fieldsArr = { ...fields };
                if (fieldsArr.phoneMobile) {
                    fieldsArr.phoneMobile.required = this.fieldRequired;
                }
            }
            if (this.field.fields.phoneHome) {
                this.field.fields.phoneHome.required = this.field.required;
            }
            if (this.field.fields.phoneWork) {
                this.field.fields.phoneWork.required = this.field.required;
            }
            if (this.field.fields.emailWork) {
                this.field.fields.emailWork.required = this.field.required;
            }
        }
    },
};
</script>

<style lang="scss">
.closeIcon {
    background-color: #e2e8f3;
    border: 1px dotted #0A2A5C;
    border-radius: 15px;
    margin-left: -15px;
    margin-top: -25px;
    .v-icon {
        color: #1f5dbdad;
    }
}
.mx-2 .v-input__slot {
    top: 15px;
}
#memberforms .v-card__text .v-input,
#memberforms .v-card__text .canvas-pad {
    pointer-events: none;
}
#memberforms .v-card__text .v-input.dues-check,
#memberforms .v-card__text .select-payment .v-input,
#memberforms .v-card__text .editable-comp .v-input {
    pointer-events: auto;
}
#memberforms .v-card__text label {
    color: rgba( 0, 0, 0, .38);
}
.text-error {
    color: #F44336;
}
</style>
