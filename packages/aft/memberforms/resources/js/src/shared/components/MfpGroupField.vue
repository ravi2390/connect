<template>
    <component :is="field.fieldsAsRows ? 'v-container' : 'v-row'">
        <component
            :is="field.fieldsAsRows ? 'v-row' : 'v-col'"
            v-for="subField in field.fields"
            :key="subField.order"
            class="m-col"
        >
            <component :is="field.fieldsAsRows ? 'v-col' : 'div'">
                <component
                    :is="$MfpMapFieldTypeToComponent(subField.type)"
                    v-model="subField.value"
                    :label="subField.label"
                    :fixed="subField.fixed"
                    :required="subField.required"
                    :field="subField"
                    :designer="designer"
                    :disabled="isDisabled(designer, subField.type)"
                    :item-key="itemKey"
                    :class-name="field.fieldName"
                    :parent="field"
                />
            </component>
        </component>
    </component>
</template>

<script>
export default {
    name: 'MfpGroupField',
    props: {
        itemKey: { type: Number, required: true },
        field: { type: Object, required: true },
        designer: { type: Boolean, default: false },
    },
    emits: ['remove'],
    methods: {
        remove(index) {
            this.$emit('remove', index);
        },
        isDisabled(designer, type) {
            return designer && !['markup', 'textarea'].includes(type);
        },
    },
};
</script>

<style lang="scss" scoped>
    @media only screen and (max-width: 960px) {
        .v-card__text {
            div[label='Mobile Phone'] {
                .row:nth-of-type(2) .col {
                    div {
                        font-size: 0.75rem !important;
                        line-height: 1.125rem !important;
                    }
                }
            }
        }
        .m-col {
            flex: 0 0 100% !important;
        }
    }
</style>
