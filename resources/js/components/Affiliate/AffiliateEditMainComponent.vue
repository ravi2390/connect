<template>
    <v-container>
        <v-card class="v-card--outlined v-sheet--tile px-6">
            <v-row>
                <v-col cols="12" lg="6">
                    <v-text-field label="Affiliate Name:" :model-value="affiliate.AffiliateName"></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" class="text-right">
                    <v-btn :href="'#/affiliates/'+this.id">Cancel</v-btn>
                    <v-btn color="success" href="">Save</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>

                    <div class="data-container">
                        <v-text-field label="Affiliate Number:" :model-value="affiliate.AffiliateNumber"></v-text-field>
                    </div>

                    <div class="data-container">
                        <v-text-field label="Affiliate Level:" :model-value="affiliate.AffiliateLevel"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Affiliate Status:" :model-value="affiliate.AffiliateStatus"></v-text-field>
                    </div>

                    <div class="data-container">
                        <v-text-field label="Acronym" :model-value="affiliate.AffiliateAcronym"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Abbreviated Name:"
                                      :model-value="affiliate.AffiliateAbbreviatedName"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Dues Structure Type Code:"
                                      :model-value="affiliate.AffiliateDuesStructureTypeCode"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Affiliate Type &amp; Code:"
                                      :model-value="affiliate.AffiliateTypeAndCode"></v-text-field>
                    </div>

                    <div class="data-container">
                        <v-text-field label="Bargaining Unit:"
                                      :model-value="affiliate.AffiliateBargainingUnit"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-autocomplete multiple chips label="Divisions:"
                                  :items="[
                                  // Todo: remove this
                                  'Division 1',
                                  'Division 2',
                                  'Division 3',
                                  'Division 4'
                                  ]"
                                  :model-value="affiliate.AffiliateDivisions"></v-autocomplete>
                    </div>
                    <div class="data-container">
                        <v-text-field label="AFT Generate Member ID:"
                                      :model-value="affiliate.AffiliateAFTGenerateMemberID"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-autocomplete label="Record Created By:"
                                  :items="[
                                  // Todo: remove this
                                  'Name 1',
                                  'Name 2',
                                  'Name 3',
                                  'Name 4'
                                  ]"
                                  :model-value="affiliate.AffiliateRecordCreatedBy"></v-autocomplete>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Last Update:" :model-value="affiliate.AffiliateLastUpdate"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Last Update By:" :model-value="affiliate.AffiliateLastUpdateBy"></v-text-field>
                    </div>

                </v-col>

                <v-col>
                    <div class="data-container">
                        <v-text-field label="EIN:" :model-value="affiliate.AffiliateEIN"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Billhighway Group ID:"
                                      :model-value="affiliate.BillHighwayGroupID"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Direct Affiliation:" :model-value="affiliate.DirectAffiliation"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Geographical Region:" :model-value="affiliate.AffiliateGeoTypeId"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-switch color="accent" label="Chartered" :value="affiliate.IsChartered"></v-switch>
                    </div>
                    <div class="data-container">
                        <v-menu
                            v-model="pickerAffiliateCharterDate"
                            :close-on-content-click="false"
                            :offset="40"
                            transition="scale-transition"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ props }">
                                <v-text-field
                                    v-model="affiliate.AffiliateCharterDate"
                                    label="Charter Date:"
                                    readonly
                                    v-bind="props"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="affiliate.AffiliateCharterDate" @input="pickerAffiliateCharterDate = false"></v-date-picker>
                        </v-menu>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Merged Local:" :model-value="affiliate.AffiliateMergedLocal"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-menu
                            v-model="pickerAffiliateFiscalYearEnd"
                            :close-on-content-click="false"
                            :offset="40"
                            transition="scale-transition"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ props }">
                                <v-text-field
                                    v-model="affiliate.AffiliateFiscalYearEnd"
                                    label="Fiscal Year End:"
                                    readonly
                                    v-bind="props"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="affiliate.AffiliateFiscalYearEnd" @input="pickerAffiliateFiscalYearEnd = false"></v-date-picker>
                        </v-menu>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Mo. elections are held:"
                                      :model-value="affiliate.AffiliateElectionsHeld"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Mo. officer term starts:"
                                      :model-value="affiliate.OfficerTermStartMonth"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Election term length (# yrs):"
                                      :model-value="affiliate.ElectionTermYears"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-switch color="accent" label="Elections held even or odd years"
                                  :value="affiliate.IsElectionYearOdd"></v-switch>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Eligible for Delegates:"
                                      :model-value="affiliate.EligibleForDelegates"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Card Eligible:" :model-value="affiliate.AffiliateLastUpdateBy"></v-text-field>
                    </div>
                </v-col>

                <v-col>
                    <h5 class="h4-header mt-3">Contact Information</h5>
                    <v-autocomplete label="Google Address Autocomplete:"
                                    :model-value="affiliate.AffiliateAddress"></v-autocomplete>
                    <div class="data-container">
                        <v-text-field label="Address:" :model-value="affiliate.AffiliateAddress"></v-text-field>
                    </div>
                    <div class="data-container">
                        <v-text-field label="Source:" :model-value="affiliate.AffiliateSource"></v-text-field>
                    </div>


                    <div class="data-container data-container-icon">
                        <v-text-field label="Email:" :model-value="affiliate.AffiliateEmail"></v-text-field>
                    </div>

                    <div class="data-container data-container-icon">
                        <v-text-field label="Website:" :model-value="affiliate.AffiliateWebsite"></v-text-field>
                    </div>
                </v-col>
            </v-row>
        </v-card>

    </v-container>
</template>

<script>
    export default {
        name: "AffiliateEditMainComponent",

        data() {
            return {
                pickerAffiliateCharterDate: false,
                pickerAffiliateFiscalYearEnd: false,
                id: '',
                affiliate: {}
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.getDataFromApi();
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/affiliate/' + this.id)
                    .then(response => {
                        this.affiliate = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }
    }
</script>

<style scoped>

</style>
