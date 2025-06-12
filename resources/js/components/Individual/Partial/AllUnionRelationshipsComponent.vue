<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            All Union Relationships
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
            <v-row class="hidden-md-and-down">
                <v-col class="text-center">
                    <p v-if="individualAffiliates.length > 0 && activeIndividualAffiliates.length === 0 && endedIndividualAffiliates.length === 0">  No relationships.</p>
                </v-col>
            </v-row>
            <v-row v-for="affiliate in activeIndividualAffiliates" :key="affiliate.AffiliateId">
                <v-col>
                    <v-expansion-panels :model-value="currentPanel">
                        <v-expansion-panel>
                            <v-expansion-panel-text class="current-relationship">
                                <v-row>
                                    <v-col>
                                        <div class="data-container">
                                            <div class="data-tag">Relationship:</div>
                                            <div class="data-value" v-if="affiliate.UnionRelationshipType">
                                                {{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col>
                                        <div class="data-container">
                                            <div class="data-tag">Affiliate Name:</div>
                                            <div class="data-value" v-if="affiliate.Affiliate">
                                                {{ affiliate.Affiliate.AffiliateName }}
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col>
                                        <div class="data-container">
                                            <div class="data-tag">Affiliate Number:</div>
                                            <div class="data-value" v-if="affiliate.Affiliate">
                                                {{ affiliate.Affiliate.AffiliateNumber }}
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <div class="data-container">
                                            <div class="data-tag">Start Date:</div>
                                            <div class="data-value">
                                                {{ $filters.formatDate(affiliate.StartDate) }}
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col v-if="affiliate.EndDate">
                                        <div class="data-container">
                                            <div class="data-tag">Stop date:</div>
                                            <div class="data-value">
                                                {{ $filters.formatDate(affiliate.EndDate) }}
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
            <v-row v-for="affiliate in endedIndividualAffiliates" :key="affiliate.AffiliateId">
                <v-col>
                    <v-expansion-panels :model-value="currentPanel">
                        <v-expansion-panel>
                            <v-expansion-panel-text class="past-relationship">
                                <v-row>
                                    <v-col>
                                        <div class="data-container">
                                            <div class="data-tag">Relationship:</div>
                                            <div class="data-value" v-if="affiliate.UnionRelationshipType">
                                                {{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col>
                                        <div class="data-container">
                                            <div class="data-tag">Affiliate Name:</div>
                                            <div class="data-value" v-if="affiliate.Affiliate">
                                                {{ affiliate.Affiliate.AffiliateName }}
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col>
                                        <div class="data-container">
                                            <div class="data-tag">Affiliate Number:</div>
                                            <div class="data-value" v-if="affiliate.Affiliate">
                                                {{ affiliate.Affiliate.AffiliateNumber }}
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <div class="data-container">
                                            <div class="data-tag">Union initiation date:</div>
                                            <div class="data-value">
                                                {{ $filters.formatDate(affiliate.StartDate) }}
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col v-if="affiliate.EndDate">
                                        <div class="data-container">
                                            <div class="data-tag">Stop date:</div>
                                            <div class="data-value">
                                                {{ $filters.formatDate(affiliate.EndDate) }}
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col>
                                        <div class="data-container">
                                            <div class="data-tag">Stop Reason:</div>
                                            <div class="data-value" v-if="affiliate.IndividualDeactivationReason">
                                                {{ affiliate.IndividualDeactivationReason.IndividualDeactivationReasonName }}
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import { compareAsc } from 'date-fns';
    export default {
        name: "AllUnionRelationshipsComponent",
        data() {
            return {
                individualAffiliates: [],
                currentPanel: 0,
                loading: false,
            }
        },
        computed: {
            activeIndividualAffiliates() {
                return this.individualAffiliates.filter((individualAffiliate) =>
                    !individualAffiliate.EndDate || compareAsc(individualAffiliate.EndDate, new Date()) > 0
                ); // now is before EndDate
            },
            endedIndividualAffiliates() {
                return this.individualAffiliates.filter((individualAffiliate) =>
                    individualAffiliate.EndDate && compareAsc(new Date(), individualAffiliate.EndDate) > 0
                ); // now is after EndDate
            }
        },
        mounted() {
            this.id = this.$route.params.id;
        },
        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },
            getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/individual/' + this.id + '?include=individualAffiliates.Affiliate,individualAffiliates.UnionRelationshipType,individualAffiliates.IndividualDeactivationReason&scope=global')
                    .then(response => {
                        this.individualAffiliates = response.data.data.individualAffiliates;
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
