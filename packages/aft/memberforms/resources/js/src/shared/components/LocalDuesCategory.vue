<template>
    <v-row>
        <v-col>
            <v-row v-if="field.templateId !== 3 && field.templateId !== 6 && field.templateId !== 8">
                <v-col>
                    <v-checkbox
                        v-if="designer"
                        v-model="field.showPrice"
                        :designer="designer"
                        label="Dues Amount"
                        class="mr-4 dues-check"
                    />
                </v-col>
            </v-row>

            <v-row v-if="field.templateId !== 3 && field.templateId !== 6 && field.templateId !== 8">
                <v-col>
                    <v-select
                        v-model="selectedLocalDuesCategory"
                        :items="localDuesCategories"
                        :rules="[v => !!v || `${localDuesCategoriesLabel + ' is required'}`]"
                        item-value="LocalDuesCategoryId"
                        item-title="LocalDuesCategoryName"
                        variant="underlined"
                    >
                        <template #label>
                            <span v-if="field.required">
                                <strong class="text-red">
                                    *
                                </strong>
                            </span>
                            {{ localDuesCategoriesLabel + (field.required ? ' (required)' : '') }}
                        </template>
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    v-if="field.showPrice &&
                        (field.templateId !== 3 && field.templateId !== 6 && field.templateId !== 8)"
                    class="text-center dues-highlight"
                >
                    <div>
                        <h3>Dues Amount</h3>
                    </div>
                    <span
                        v-if="!isPercentage"
                        class="text-h5"
                    >
                        $ {{ selectedLocalDuesCategoryPrice }}
                    </span>
                    <span
                        v-if="isPercentage"
                        class="text-h5"
                    >
                        {{ selectedLocalDuesCategoryPrice }} %
                    </span>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'LocalDuesCategory',
    props: {
        modelValue: { type: String, default: '' },
        field: { type: Object, default: () => {} },
        label: { type: String, default: 'MFP Select Field' },
        required: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        designer: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    data: () => ({
        localDues: [],
        localDuesCategories: [],
        selectedLocalDuesCategory: null,
        selectedLocalDuesCategoryPrice: 0.00,
        // copeAmount: 0,
        draftAmount: 0,
        // other: '',
        localDuesCategoriesLabel: '',
        isPercentage: false,
    }),
    watch: {
        localDuesCategoriesLabel() {
            this.field.label = this.localDuesCategoriesLabel;
            if (this.field.fieldName === 'LocalDuesCategory') {
                this.field.source[0].label = this.field.label;
                // console.log(this.field.source[0].label);
            }
        },
        field: {
            deep: true,
            handler() {
                this.localDuesCategories = this.field.source;
                /*
                if (this.copeAmount !== 'other') {
                    this.copeAmount = this.field.copeAmount;
                }
                */
            },
        },
        selectedLocalDuesCategory: {
            handler() {
                const localDuesCategoryObj = this.getLocalDuesCategory(this.selectedLocalDuesCategory);
                if (localDuesCategoryObj) {
                    if (localDuesCategoryObj.LocalDuesPercentage) {
                        this.selectedLocalDuesCategoryPrice = parseFloat(localDuesCategoryObj.LocalDuesPercentage, 10);
                        this.isPercentage = true;
                    } else {
                        this.selectedLocalDuesCategoryPrice = parseFloat(localDuesCategoryObj.LocalDuesAmount, 10);
                        this.isPercentage = false;
                    }
                    if (this.selectedLocalDuesCategoryPrice > 0) {
                        /*
                        if (this.field.copeAmount) {
                            if (localDuesCategoryObj.LocalDuesPercentage) {
                                this.draftAmount = this.field.copeAmount;
                            } else {
                                this.draftAmount = this.selectedLocalDuesCategoryPrice + this.field.copeAmount;
                            }
                        } else
                        */
                        if (localDuesCategoryObj.LocalDuesPercentage) {
                            this.draftAmount = 0;
                        } else {
                            this.draftAmount = this.selectedLocalDuesCategoryPrice;
                        }
                    }
                }
                this.change();
            },
            deep: true,
        },
    },
    created() {
        this.localDuesCategoriesLabel = this.field.label;
    },
    mounted() {
        this.localDuesCategories = this.field.source;
        // this.copeAmount = this.field.copeAmount;
    },
    methods: {
        getLocalDuesCategory(ldc) {
            return this.localDuesCategories.filter((localDues) => localDues.LocalDuesCategoryId === ldc)[0];
        },
        change() {
            this.$emit('update:modelValue', `${this.selectedLocalDuesCategory}`);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
