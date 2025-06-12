<template>
    <v-container>
        <v-card>
            <v-card-title>Create Affiliate</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field label="Affiliate Name:" :model-value="affiliate.AffiliateName" variant="underlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Affiliate Number:" :model-value="affiliate.AffiliateNumber" variant="underlined"></v-text-field>
                        <v-text-field label="Affiliate Level:" :model-value="affiliate.AffiliateLevel" variant="underlined"></v-text-field>
                        <v-text-field label="Affiliate Status:" :model-value="affiliate.AffiliateStatus" variant="underlined"></v-text-field>
                        <v-text-field label="Acronym" :model-value="affiliate.AffiliateAcronym" variant="underlined"></v-text-field>
                        <v-text-field label="Abbreviated Name:"
                                      :model-value="affiliate.AffiliateAbbreviatedName" variant="underlined"></v-text-field>
                        <v-text-field label="Dues Structure Type Code:"
                                      :model-value="affiliate.AffiliateDuesStructureTypeCode" variant="underlined"></v-text-field>
                        <v-text-field label="Affiliate Type &amp; Code:"
                                      :model-value="affiliate.AffiliateTypeAndCode" variant="underlined"></v-text-field>
                        <v-text-field label="Bargaining Unit:"
                                      :model-value="affiliate.AffiliateBargainingUnit" variant="underlined"></v-text-field>
                        <v-autocomplete multiple chips label="Divisions:"
                            :items="[
                              // Todo: remove this
                              'Division 1',
                              'Division 2',
                              'Division 3',
                              'Division 4'
                            ]"
                            :model-value="affiliate.AffiliateDivisions"
                            variant="underlined"
                        ></v-autocomplete>
                        <v-text-field label="AFT Generate Member ID:"
                                      :model-value="affiliate.AffiliateAFTGenerateMemberID" variant="underlined"></v-text-field>
                        <v-autocomplete label="Record Created By:"
                            :items="[
                                // Todo: remove this
                                'Name 1',
                                'Name 2',
                                'Name 3',
                                'Name 4'
                            ]"
                            :model-value="affiliate.AffiliateRecordCreatedBy"
                            variant="underlined"
                        ></v-autocomplete>
                        <v-text-field label="Last Update:" :model-value="affiliate.AffiliateLastUpdate" variant="underlined"></v-text-field>
                        <v-text-field label="Last Update By:" :model-value="affiliate.AffiliateLastUpdateBy" variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="EIN:" :model-value="affiliate.AffiliateEIN" variant="underlined"></v-text-field>
                        <v-text-field label="Billhighway Group ID:"
                                      :model-value="affiliate.BillHighwayGroupID" variant="underlined"></v-text-field>
                        <v-text-field label="Direct Affiliation:" :model-value="affiliate.DirectAffiliation" variant="underlined"></v-text-field>
                        <v-text-field label="Geographical Region:" :model-value="affiliate.AffiliateGeoTypeId" variant="underlined"></v-text-field>
                        <v-switch color="accent" label="Chartered" :value="affiliate.IsChartered"></v-switch>
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
                                    variant="underlined"
                                ></v-text-field>
                            </template>
                            <v-date-picker @update:model-value="updateCharterDate"></v-date-picker>
                        </v-menu>
                        <v-text-field label="Merged Local:" :model-value="affiliate.AffiliateMergedLocal" variant="underlined"></v-text-field>
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
                                    variant="underlined"
                                ></v-text-field>
                            </template>
                            <v-date-picker @update:model-value="updateFiscalYearEnd"></v-date-picker>
                        </v-menu>
                        <v-text-field label="Mo. elections are held:"
                                      :model-value="affiliate.AffiliateElectionsHeld" variant="underlined"></v-text-field>
                        <v-text-field label="Mo. officer term starts:"
                                      :model-value="affiliate.OfficerTermStartMonth" variant="underlined"></v-text-field>
                        <v-text-field label="Election term length (# yrs):"
                                      :model-value="affiliate.ElectionTermYears" variant="underlined"></v-text-field>
                        <v-switch color="accent" label="Elections held even or odd years"
                                  :value="affiliate.IsElectionYearOdd" variant="underlined"></v-switch>
                        <v-text-field label="Eligible for Delegates:"
                                      :model-value="affiliate.EligibleForDelegates" variant="underlined"></v-text-field>
                        <v-text-field label="Card Eligible:" :model-value="affiliate.AffiliateLastUpdateBy" variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <h5 class="h4-header mt-3">Contact Information</h5>
                        <v-autocomplete label="Google Address Autocomplete:"
                                        :model-value="affiliate.AffiliateAddress" variant="underlined"></v-autocomplete>
                        <v-text-field label="Address:" :model-value="affiliate.AffiliateAddress" variant="underlined"></v-text-field>
                        <v-text-field label="Source:" :model-value="affiliate.AffiliateSource" variant="underlined"></v-text-field>
                        <v-text-field label="Email:" :model-value="affiliate.AffiliateEmail" variant="underlined"></v-text-field>
                        <v-text-field label="Website:" :model-value="affiliate.AffiliateWebsite" variant="underlined"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn href="#/affiliates/" variant="elevated">Cancel</v-btn>
                <v-btn color="success" variant="elevated">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import { format } from "date-fns";

    export default {
        name: "AffiliateCreateComponent",

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
        },
        methods: {
            updateCharterDate(date) {
                this.affiliate.AffiliateCharterDate = format(date, 'yyyy-MM-dd');
                this.pickerAffiliateCharterDate = false;
            },
            updateFiscalYearEnd(date) {
                this.affiliate.AffiliateFiscalYearEnd = format(date, 'yyyy-MM-dd');
                this.pickerAffiliateFiscalYearEnd = false
            }
        }
    }
</script>

<style scoped>

</style>
