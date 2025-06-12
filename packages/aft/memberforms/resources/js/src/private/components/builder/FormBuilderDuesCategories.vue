<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <h2>Select Dues Category to display on Form</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-table>
                    <thead>
                        <tr>
                            <th>
                                <v-checkbox
                                    v-model="selectAll"
                                />
                            </th>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in items"
                            :key="item.LocalDuesCategoryId"
                        >
                            <td>
                                <v-checkbox
                                    v-model="selected"
                                    :value="item.LocalDuesCategoryId"
                                />
                            </td>
                            <td v-if="isPaymentProcessingDuesTemplate()">
                                {{ item.LocalDuesCategoryName + ' (' + item.InvoiceDescription + ')' }}
                            </td>
                            <td v-else>
                                {{ item.LocalDuesCategoryName }}
                            </td>
                            <td v-if="item.LocalDuesAmount && item.LocalDuesPercentage">
                                {{ '$' + item.LocalDuesAmount }} or {{ item.LocalDuesPercentage + '%' }}
                            </td>
                            <td v-else>
                                {{ item.LocalDuesAmount ? '$' + item.LocalDuesAmount : '' }}
                                {{ item.LocalDuesPercentage ? item.LocalDuesPercentage + '%' : '' }}
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
        <v-row v-if="isPaymentProcessingDuesTemplate() && isDataLoaded && items && items.length === 0">
            <v-col>
                <h4 style="color: red">
                    Thank you for using the Membership Forms Portal. Prior to continuing, you must map
                    your local dues categories (billing types) to the appropriate AFT national per capita
                    category and/or State per capita category. <br>
                    Please go to the Dues Mapping section to map the local dues categories to the appropriate
                    AFT national per capita category and/or State per capita category.
                    For assistance or questions, please contact MD&A at edues@aft.org.
                </h4>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex justify-space-between ga-2">
                <v-btn
                    @click="doPrev()"
                >
                    Back
                </v-btn>
                <v-btn
                    :disabled="!valid"
                    color="#0A2A5C"
                    @click="doNext()"
                >
                    Continue
                </v-btn>
            </v-col>
        </v-row>
        <v-overlay
            :model-value="loading"
            opacity=".5"
            scrim="#FFF"
        />
    </v-container>
</template>

<script>
import api from '../../../../api/private';

export default {
    name: 'FormBuilderDuesCategories',
    options: {
        label: 'Form Dues Categories',
    },
    props: {
        store: { type: Object, required: true },
    },
    emits: ['next', 'prev', 'save'],
    data: () => ({
        loading: false,
        valid: false,
        items: [],
        selected: [],
        selectAll: false,
        paymentProcessingDuesTemplateIds: [4, 5, 7, 9],
        isDataLoaded: false,
    }),
    watch: {
        selected() {
            this.$emit('save', { key: 'duesCategories', value: this.selected });
            this.valid = this.selected && this.selected.length > 0;
            if (this.selected && this.selected.length !== this.items.length) {
                this.selectAll = false;
            }
        },
        selectAll() {
            this.toggleSelectAll();
        },
    },
    created() {
        this.doListDuesCategories();
        this.selected = this.store.duesCategories || [];
    },
    mounted() {

    },
    methods: {
        isPaymentProcessingDuesTemplate() {
            return this.paymentProcessingDuesTemplateIds.includes(parseInt(this.store.templateId, 10));
        },
        doListDuesCategories() {
            this.loading = true;
            api.search('duescategory', '', {
                affiliateId: this.store.affiliateId,
                from: this.isPaymentProcessingDuesTemplate() ? 'form' : '',
                templateId: parseInt(this.store.templateId),
            })
                .then((response) => {
                    this.items = response.data;
                    this.isDataLoaded = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        doPrev() {
            this.$emit('prev');
        },
        doNext() {
            if (this.valid) {
                this.$emit('next');
            }
        },
        toggleSelectAll() {
            if (this.selectAll) {
                this.selected = [];
                Object.keys(this.items).forEach((key) => {
                    const item = this.items[key];
                    this.selected.push(item.LocalDuesCategoryId);
                });
            } else if (this.selected && this.selected.length === this.items.length) {
                this.selected = [];
            }
        },
    },
};
</script>

<style lang="scss">
.Continue-Button .v-btn__content {
    color: white;
}
</style>
