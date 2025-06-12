<template>
    <v-expansion-panel id="Details" value="Details" v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Affiliate Summary
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-card>
                <template #loader>
                    <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
                </template>
                <v-card-text>
                    <div class="data-container">
                        <div class="data-tag">Affiliate Name:</div>
                        <div class="data-value" v-if="affiliate">
                            {{affiliate.AffiliateName}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Affiliate Number:</div>
                        <div class="data-value" v-if="affiliate">
                            {{affiliate.AffiliateNumber}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Abbreviated Name:</div>
                        <div class="data-value" v-if="affiliate">
                            {{affiliate.AffiliateAbbreviatedName}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Acronym:</div>
                        <div class="data-value" v-if="affiliate">
                            {{affiliate.AffiliateAcronym}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">EIN:</div>
                        <div class="data-value" v-if="affiliate">
                            {{affiliate.AffiliateEIN}}
                        </div>
                    </div>
                    <div v-if="affiliate.AffiliatePerCapitaPIN" class="data-container">
                        <div class="data-tag">PIN:</div>
                        <div class="data-value" v-if="affiliate">
                            {{affiliate.AffiliatePerCapitaPIN}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">BillHighway Group ID:</div>
                        <div class="data-value" v-if="affiliate">
                            {{affiliate.BillHighwayGroupId}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Affiliate Type:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliateType">
                            {{affiliate.AffiliateType.AffiliateTypeName}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Affiliate Designation:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliateDesignation">
                            {{affiliate.AffiliateDesignation.AffiliateDesignationName}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Notes:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliateNotes">
                            {{affiliate.AffiliateNotes.AffiliateNotes}}<br>
                            Notes Date: {{affiliate.AffiliateNotes.AffiliateNotesDate}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Affiliate Status:</div>
                        <div class="data-value" v-if="affiliate && affiliate.IsAffiliateActive">
                            Active
                        </div>
                        <div class="data-value" v-else>
                            Inactive
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Permitted Membership Types:</div>
                        <div class="data-value" v-if="affiliate" >
                            N/A
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Geographical Jurisdiction:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliateGeoReach">
                            {{affiliate.AffiliateGeoReach.AffiliateGeoReachName}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Sectors Represented:</div>
                        <div class="data-value" v-for="(affSector,index) in affiliate.AffiliateSector" :key="index">
                            {{ affSector.Sector.SectorName }}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Is chartered:</div>
                        <div class="data-value" v-if="affiliate && affiliate.IsChartered">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Charter date:</div>
                        <div class="data-value" v-if="affiliate && affiliate.IsChartered">
                            {{ $filters.formatDate(affiliate.CharterDate) }}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Affiliate Relationship:</div>
                        <div class="data-value" v-if="affiliate">

                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Local:</div>
                        <div class="data-value" v-if="affiliate">
                            {{affiliate.AffiliateNumber}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Region:</div>
                        <div class="data-value" v-if="affiliate && affiliate.Region">
                            {{affiliate.Region.RegionName}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">State Federation:</div>
                        <div class="data-value" v-if="affiliate && parentAffiliate">
                            {{parentAffiliate.AffiliateName}} - {{parentAffiliate.AffiliateNumber}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Merged Organizations:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliateMergedOrganization && affiliate.AffiliateMergedOrganization.MergedOrganization">
                            {{affiliate.AffiliateMergedOrganization.MergedOrganization.MergedOrganizationName}} - {{affiliate.AffiliateMergedOrganization.MergedOrganization.MergedOrganizationCode}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Fiscal year end (mm/dd):</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita">
                            {{affiliate.AffiliatePerCapita.FiscalYearEndMonth}}/{{affiliate.AffiliatePerCapita.FiscalYearEndDay}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Does affiliate pay per-caps to AFT:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita && affiliate.AffiliatePerCapita.PayPerCapitaToAFT">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Is the affiliate invoiced by AFT:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita && affiliate.AffiliatePerCapita.InvoicedByAFT">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Are State Federation per-caps included:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita && affiliate.AffiliatePerCapita.IncludeStatePerCapita">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Include AFL-CIO per-caps:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita && affiliate.AffiliatePerCapita.IncludeAFLCIOPerCapita">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Invoice frequency:</div>
                        <div class="data-value" v-if="affiliate">

                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">AFT insurance eligible?:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita && affiliate.AffiliatePerCapita.HasOccupationalLiabilityInsurance">
                            Does the affiliate have liability insurance?: Yes
                        </div>
                        <div class="data-value" v-else>
                            Does the affiliate have liability insurance?: No
                        </div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita">
                            Number of AD&D units: {{affiliate.AffiliatePerCapita.AccidentInsuranceUnits}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Fiduciary Bond Coverage:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita && affiliate.AffiliatePerCapita.FiduciaryBondCoverage">
                            {{affiliate.AffiliatePerCapita.FiduciaryBondCoverage.FiduciaryBondCoverageName}}
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Has COPE Program:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita && affiliate.AffiliatePerCapita.HasCope">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Include in AFT member counts:</div>
                        <div class="data-value" v-if="affiliate && affiliate.IsAffiliateActive && !affiliate.IsDeleted &&
                                                                  (affiliate.AffiliateType && affiliate.AffiliateType.AffiliateTypeName == 'Local' ||
                                                                   affiliate.AffiliateType && affiliate.AffiliateType.AffiliateTypeName == 'Federated Local' ||
                                                                   affiliate.AffiliateType && affiliate.AffiliateType.AffiliateTypeName == 'State Federation')">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">AFT member card eligible:</div>
                        <div class="data-value" v-if="affiliate && affiliate.IsAffiliateActive && !affiliate.IsDeleted &&
                                                                  (affiliate.AffiliateType && affiliate.AffiliateType.AffiliateTypeName == 'Local' ||
                                                                   affiliate.AffiliateType && affiliate.AffiliateType.AffiliateTypeName == 'Federated Local' ||
                                                                   affiliate.AffiliateType && affiliate.AffiliateType.AffiliateTypeName == 'State Federation')">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Directly engages in bargaining:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita && affiliate.AffiliatePerCapita.IsDirectBargaining">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Eligible for AFT convention delegates:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita && affiliate.AffiliatePerCapita.ConventionDelegationEligibility">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">AFT member ID assigned:</div>
                        <div class="data-value" v-if="affiliate && affiliate.UsesAftMemberId">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Stateweb access?:</div>
                        <div class="data-value" v-if="affiliate && affiliate.AffiliatePerCapita && affiliate.AffiliatePerCapita.HasStateWebAccess">
                            Yes
                        </div>
                        <div class="data-value" v-else>
                            No
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Retiree Options:</div>
                        <div class="data-value" v-if="affiliate && affiliate.RetireeEntityType">
                            Move Retirees to {{affiliate.RetireeEntityType.EntityTypeName}} {{this.retireeDestinationName}}
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "AffiliateSummaryComponent",

        data() {
            return {
                affiliate: [],
                parentAffiliate: [],
                retireeDestinationName: '',
                loading: false,
            }
        },

        props: {
            affiliateId: {
                type: Number,
                required: true
            },
        },

        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },

            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/aggregate/affiliate/summary/' + this.affiliateId + '?scope=global';

                return axios.get(url)
                    .then(response => {
                        this.affiliate = response.data.data;
                        if (this.affiliate.ParentAffiliateId && this.affiliate.ParentAffiliateId !== this.affiliateId) {
                            axios.get('/api/v2/aggregate/affiliate/summary/' + this.affiliate.ParentAffiliateId + '?scope=global')
                            .then(parentResponse => {
                                this.parentAffiliate = parentResponse.data.data;
                            });
                        }

                        if (this.affiliate.RetireeEntityType && this.affiliate.RetireeEntityType.EntityTypeName === 'Unit')
                        {
                            axios.get('/api/v2/unit/' + this.affiliate.RetireeDestinationId + '?include=LocalAgreement.Employer.Chapter.Affiliate&scope=global')
                                .then(retireeUnitResponse => {
                                    this.retireeDestinationName = retireeUnitResponse.data.data
                                        ? retireeUnitResponse.data.data.UnitName +
                                            ' (Affiliate: ' + retireeUnitResponse.data.data.LocalAgreement.Employer.Chapter.Affiliate.AffiliateName +
                                            ' - ' + retireeUnitResponse.data.data.LocalAgreement.Employer.Chapter.Affiliate.AffiliateNumber + ')'
                                        : '';
                                });
                        }
                        else if (this.affiliate.RetireeEntityType && this.affiliate.RetireeEntityType.EntityTypeName === 'Affiliate')
                        {
                            axios.get('/api/v2/affiliate/' + this.affiliate.RetireeDestinationId + '?scope=global&include=affiliateCommittee')
                                .then(retireeAffiliateResponse => {
                                    this.retireeDestinationName = retireeAffiliateResponse.data.data
                                        ? retireeAffiliateResponse.data.data.AffiliateName + ' (' + retireeAffiliateResponse.data.data.AffiliateNumber + ')'
                                        : '';
                                });
                        }
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
