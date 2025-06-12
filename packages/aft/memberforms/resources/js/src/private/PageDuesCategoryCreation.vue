<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <h2>Please select mapping to create:</h2>
            </v-col>
        </v-row>
        <v-row class="pl-3">
            <v-col cols="12" sm="3">
                <v-alert
                    v-model="duesAlert"
                    variant="outlined"
                    type="success"
                    class="mb-0"
                >
                    Created Dues Mapping successfully
                </v-alert>
                <v-alert
                    v-model="duesError"
                    variant="outlined"
                    type="error"
                    class="mb-0"
                >
                    {{ errorMessage }}
                </v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6">
                <v-select
                    v-model="selectedBillingType"
                    :items="billingTypes"
                    item-title="LocalDuesCategoryName"
                    item-value="LocalDuesCategoryId"
                    label="Select Billhighway Billing Type"
                    return-object
                    hide-details
                    variant="outlined"
                    required
                />
                <v-row
                    v-if="selectedBillingType != null"
                    class="ml-1 mt-0"
                >
                    <v-col cols="12" sm="4">
                        <span class="font-weight-light">
                            Dues Amount:&#32;
                        </span>
                        <span>${{ selectedBillingType.LocalDuesAmount }}</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span class="font-weight-light">
                            Frequency:&#32;
                        </span>
                        <span>{{ selectedBillingType.FrequencyDescription }}</span>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="6">
                <v-select
                    v-model="nationalPerCapitaCategory"
                    :items="nationalPerCapitaList"
                    item-title="NationalPerCapitaName"
                    item-value="NationalPerCapitaId"
                    label="National Per Capita Category"
                    return-object
                    variant="outlined"
                    required
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="2">
                <v-btn
                    v-if="nationalPerCapitaCategory && selectedBillingType"
                    color="#0A2A5C"
                    :disabled="isButtonDisabled"
                    @click="saveDuesCategory"
                >
                    Create
                </v-btn>
            </v-col>
            <v-col cols="12" sm="2">
                <v-btn
                    v-if="nationalPerCapitaCategory && selectedBillingType && isButtonDisabled"
                    color="#0A2A5C"
                    href="/app/memberforms/admin/dues-create"
                >
                    Create new dues category
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import api from '../../api/private';

export default {
    name: 'PageDuesCategoryCreation',
    data: () => ({
        affiliateId: null,
        billHighwayGroupId: null,
        nationalPerCapitaCategory: null,
        billingTypes: [],
        selectedBillingType: null,
        nationalPerCapitaList: [],
        duesAlert: false,
        duesError: false,
        errorMessage: '',
        isButtonDisabled: false,
    }),
    created() {
        this.affiliateId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
        this.billHighwayGroupId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].BillHighwayGroupId : null;
    },
    mounted() {
        this.getNationalPerCapita();
        this.billHighwayCategories();
    },
    methods: {
        getNationalPerCapita() {
            if (!this.affiliateId) { return; }
            this.loading = true;
            api.search('nationalPerCapita')
                .then((response) => {
                    this.nationalPerCapitaList = response.data;
                })
                .finally(() => {
                    // this.loading = false;
                });
        },
        billHighwayCategories() {
            if (!this.affiliateId) { return; }
            this.loading = true;
            api.search('recurringBillingTypes', '', { affiliateId: this.affiliateId, groupId: this.billHighwayGroupId, from: 'form' })
                .then((response) => {
                    this.billingTypes = response.data;
                    this.billingTypes = this.billingTypes ? this.billingTypes.filter((i) => i.IsActive) : [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async saveDuesCategory() {
            if (!this.affiliateId) { return; }
            this.loading = true;
            this.duesError = false;
            this.isButtonDisabled = true;
            await api.createDuesCategory({
                affiliateId: this.affiliateId,
                NationalPerCapitaId: this.nationalPerCapitaCategory.NationalPerCapitaId,
                StatePerCapitaId: null,
                LocalDuesCategoryName: this.selectedBillingType.LocalDuesCategoryName,
                billingTypeId: this.selectedBillingType.LocalDuesCategoryId,
                LocalDuesAmount: this.selectedBillingType.LocalDuesAmount,
                LocalDuesPercentage: this.selectedBillingType.LocalDuesPercentage,
                PaymentFrequency: this.selectedBillingType.FrequencyDescription,
                StartDate: this.selectedBillingType.EffectiveDate,
                EndDate: this.selectedBillingType.EndDate,
            }).then(() => {
                this.duesAlert = true;
            }).catch((e) => {
                let errorMessage = 'somthing went wrong';
                if (e.response) {
                    const LocalDuesCategoryNameMessage = e.response.data.errors.billingTypeId[0];
                    if (LocalDuesCategoryNameMessage) {
                        errorMessage = LocalDuesCategoryNameMessage;
                    }
                }
                this.errorMessage = errorMessage;
                this.duesError = true;
                this.isButtonDisabled = false;
                console.log('Error', e);
            }).finally(() => {
                this.loading = false;
            });
        },
    },
};
</script>

<style scoped lang="scss">
.v-btn--is-elevated {
    color: white !important;
}
</style>
