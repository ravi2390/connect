<template>
    <v-container>
        <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
        <v-row class="hidden-md-and-down">
            <v-col>
                <v-btn-toggle v-model="showRelationship" density="compact" variant="outlined" class="d-flex justify-end">
                    <v-btn size="small" value="past">SHOW PAST and CURRENT RELATIONSHIPS</v-btn>
                    <v-btn size="small" value="current">SHOW ONLY CURRENT RELATIONSHIPS</v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
        <v-row class="hidden-md-and-down">
            <v-col class="text-center">
                <p v-if="individualAffiliates.length > 0 && showRelationship === 'current' && activeIndividualAffiliates.length === 0 && endedIndividualAffiliates.length > 0">  No current relationships. You can review if there are any past relationships.</p>
                <p v-if="individualAffiliates.length > 0 && showRelationship === 'past' && activeIndividualAffiliates.length === 0 && endedIndividualAffiliates.length === 0">  No current and past relationships.</p>
            </v-col>
        </v-row>
        <v-row v-for="affiliate in activeIndividualAffiliates" :key="affiliate.AffiliateId">
            <v-col>
                <v-expansion-panels :model-value="0">
                    <v-expansion-panel>
                        <v-expansion-panel-text class="current-relationship">
                            <v-row>
                                <v-col class="d-flex justify-end ga-2">
                                    <v-btn size="small" id="editBtn" @click="$emit('edit-individual-affiliate', affiliate)" color="primary">Edit</v-btn>
                                    <v-btn size="small" @click="createNew()" v-if="affiliate.UnionRelationshipType && fieldVisible('Establish', affiliate.UnionRelationshipType) && activeIndividualAffiliates.length <= 1">Establish new relationship</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="3">
                                    <div class="data-container">
                                        <div class="data-tag">Relationship:</div>
                                        <div class="data-value" v-if="affiliate.UnionRelationshipType">
                                            {{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="3">
                                    <div class="data-container">
                                        <div class="data-tag">Member ID:</div>
                                        <div class="data-value">
                                            <div
                                                v-for="member in individual.individualMembers"
                                                v-bind="member"
                                                :key="member.MemberIdMappingId">
                                                    {{ member.MemberId }}
                                            </div>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="3" v-if="activeEmployments.length > 0">
                                    <div class="data-container" v-if="$store.getters['user/selectedAffiliate'].hasChapters">
                                        <div class="data-tag">Chapter:</div>
                                        <div class="data-value">
                                            <span v-for="employer in hasChapter(activeEmployments)"
                                                  v-bind="employer"
                                                  :key="employer.IndividualEmployerId"
                                            >
                                                {{ employer.Employer.Chapter.ChapterName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="3" v-if="activeEmployments.length > 0">
                                    <div class="data-container">
                                        <div class="data-tag">Unit:</div>
                                        <div class="data-value">
                                            <span v-for="employer in hasUnit(activeEmployments)"
                                                  v-bind="employer"
                                                  :key="employer.IndividualEmployerId"
                                            >
                                                {{ employer.LocalJobClass.Unit.UnitName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row v-if="affiliate.UnionRelationshipType && fieldVisible('Dues category', affiliate.UnionRelationshipType)">
                                <v-col cols="12" lg="4">
                                    <div class="data-container">
                                        <div class="data-tag">Local dues Category:</div>
                                        <div class="data-value">
                                            <span v-if="affiliate.LocalDuesCategory">
                                                   {{ affiliate.LocalDuesCategory.LocalDuesCategoryName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="4">
                                    <div class="data-container">
                                        <div class="data-tag">Dues Payment Method:</div>
                                        <div class="data-value">
                                            <span v-if="affiliate.PaymentMethod">
                                                   {{ affiliate.PaymentMethod.PaymentMethodName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="4">
                                    <div class="data-container">
                                        <div class="data-tag">Dues Payment Frequency:</div>
                                        <div class="data-value">
                                            <span v-if="affiliate.PaymentFrequency">
                                                   {{ affiliate.PaymentFrequency.PaymentFrequencyName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="3">
                                    <div class="data-container">
                                        <div class="data-tag">Start date:</div>
                                        <div class="data-value">
                                            {{ $filters.formatDate(affiliate.StartDate) }}
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="3" v-if="affiliate.EndDate">
                                    <div class="data-container">
                                        <div class="data-tag">Stop date:</div>
                                        <div class="data-value">
                                            {{ $filters.formatDate(affiliate.EndDate) }}
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="3" v-if="affiliate.EndDate && affiliate.IndividualDeactivationReason">
                                    <div class="data-container">
                                        <div class="data-tag">Stop Reason:</div>
                                        <div class="data-value" v-if="affiliate.IndividualDeactivationReason">
                                            {{ affiliate.IndividualDeactivationReason.IndividualDeactivationReasonName }}
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="3">
                                    <div class="data-container">
                                        <div class="data-tag">Currently working:</div>
                                        <div class="data-value">
                                            <span v-if="affiliate.IsCurrent == true">
                                                Yes
                                            </span>
                                            <span v-if="affiliate.IsCurrent == false">
                                                No
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row v-if="affiliate.UnionRelationshipType && fieldVisible('Cope', affiliate.UnionRelationshipType)">
                                <v-col cols="12" lg="2">
                                    <div class="data-container">
                                        <div class="data-tag">Cope type:</div>
                                        <div class="data-value">
                                            <span v-if="affiliate.Affiliate.AffiliatePerCapita && !affiliate.Affiliate.AffiliatePerCapita.HasCope">None</span>
                                            <span v-if="affiliate.Affiliate.AffiliatePerCapita && affiliate.Affiliate.AffiliatePerCapita.HasCope">
                                                <span v-if="affiliate.Affiliate.AffiliatePerCapita.IsCopeVoluntary">Voluntary</span>
                                                <span v-if="!affiliate.Affiliate.AffiliatePerCapita.IsCopeVoluntary">Not Voluntary</span>
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="3">
                                    <div class="data-container">
                                        <div class="data-tag">COPE amount:</div>
                                        <div class="data-value">
                                            <span v-for="cope in individualCope"
                                                  v-bind="cope"
                                                  :key="cope.IndividualCopeId"
                                            >
                                                ${{ cope.CopeAmount }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="4">
                                    <div class="data-container">
                                        <div class="data-tag">COPE payment frequency:</div>
                                        <div class="data-value">
                                            <span v-for="cope in copeWithProperty('CopePaymentFrequency')"
                                                  v-bind="cope"
                                                  :key="cope.IndividualCopeId"
                                            >
                                                {{ cope.CopePaymentFrequency.PaymentFrequencyName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="3">
                                    <div class="data-container">
                                        <div class="data-tag">COPE payment method:</div>
                                        <div class="data-value">
                                            <span v-for="cope in copeWithProperty('CopePaymentMethod')"
                                                  v-bind="cope"
                                                  :key="cope.IndividualCopeId"
                                            >
                                                {{ cope.CopePaymentMethod.PaymentMethodName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
        <v-row v-for="(affiliate, index) in endedIndividualAffiliates" :key="affiliate.AffiliateId">
            <v-col>
                <v-expansion-panels :model-value="showPast"
                                    v-if="affiliate.EndDate">
                    <v-expansion-panel>
                        <v-expansion-panel-text class="past-relationship">
                            <v-row v-if="index === 0 && activeIndividualAffiliates.length === 0">
                                <v-col class="d-flex justify-end ga-2">
                                    <v-btn size="small" @click="createNew()">Establish new relationship</v-btn>
                                    <v-btn size="small" @click="reactivate(affiliate)">Restore</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="4">
                                    <div class="data-container">
                                        <div class="data-tag">Relationship:</div>
                                        <div class="data-value" v-if="affiliate.UnionRelationshipType">
                                            {{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                                        </div>
                                    </div>
                                    <div class="data-container">
                                        <div class="data-tag">Member ID:</div>
                                        <div class="data-value">
                                            <div
                                                v-for="member in individual.individualMembers"
                                                v-bind="member"
                                                :key="member.MemberIdMappingId">
                                                    {{ member.MemberId }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="data-container" v-if="$store.getters['user/selectedAffiliate'].hasChapters">
                                        <div class="data-tag">Chapter:</div>
                                        <div class="data-value">
                                            <span v-for="employer in hasChapter(individualEmployers)"
                                                  v-bind="employer"
                                                  :key="employer.IndividualEmployerId"
                                            >
                                                {{ employer.Employer.Chapter.ChapterName }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="data-container">
                                        <div class="data-tag">Unit:</div>
                                        <div class="data-value">
                                            <span v-for="employer in hasUnit(individualEmployers)"
                                                  v-bind="employer"
                                                  :key="employer.IndividualEmployerId"
                                            >
                                                {{ employer.LocalJobClass.Unit.UnitName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="4">
                                    <div class="data-container">
                                        <div class="data-tag">Currently working:</div>
                                        <div class="data-value">
                                            <span v-if="affiliate.IsCurrent == true">
                                                Yes
                                            </span>
                                            <span v-if="affiliate.IsCurrent == false">
                                                No
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="4">
                                    <div class="data-container">
                                        <div class="data-tag">Start date:</div>
                                        <div class="data-value">
                                            {{ $filters.formatDate(affiliate.StartDate) }}
                                        </div>
                                    </div>
                                    <div class="data-container">
                                        <div class="data-tag">Stop date:</div>
                                        <div class="data-value">
                                            {{ $filters.formatDate(affiliate.EndDate) }}
                                        </div>
                                    </div>
                                    <div class="data-container">
                                        <div class="data-tag">Stop reason:</div>
                                        <div class="data-value" v-if="affiliate.IndividualDeactivationReason">
                                            {{ affiliate.IndividualDeactivationReason.IndividualDeactivationReasonName }}
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row v-if="affiliate.UnionRelationshipType && fieldVisible('Dues category', affiliate.UnionRelationshipType)">
                                <v-col cols="12" lg="4">
                                    <div class="data-container">
                                        <div class="data-tag">Local dues Category:</div>
                                        <div class="data-value">
                                            <span v-if="affiliate.LocalDuesCategory">
                                                   {{ affiliate.LocalDuesCategory.LocalDuesCategoryName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="4">
                                    <div class="data-container">
                                        <div class="data-tag">Dues Payment Method:</div>
                                        <div class="data-value">
                                            <span v-if="affiliate.PaymentMethod">
                                                   {{ affiliate.PaymentMethod.PaymentMethodName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="4">
                                    <div class="data-container">
                                        <div class="data-tag">Dues Payment Frequency:</div>
                                        <div class="data-value">
                                            <span v-if="affiliate.PaymentFrequency">
                                                   {{ affiliate.PaymentFrequency.PaymentFrequencyName }}
                                            </span>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { compareAsc } from 'date-fns';
    export default {
        name: "ViewUnionRelationshipComponent",

        props: {
            individualCope: {
                type: Array,
                required: true
            },
            individualEmployers: {
                type: Array,
                required: true
            },
            individualAffiliates: {
                type: Array,
                required: true
            },
            individual: {
                required: true
            },
            clicked: {
                type: Boolean,
            },
        },
        data() {
            return {
                showRelationship: 'current',
                alert: false,
                alertType: 'success',
                alertText: '',
            }
        },
        computed: {
            selectedAffiliate() {
                return this.$store.getters['user/selectedAffiliate'];
            },
            activeIndividualAffiliates() {
                return this.individualAffiliates.filter((individualAffiliate) =>
                    !individualAffiliate.EndDate || compareAsc(individualAffiliate.EndDate, new Date()) > 0
                    // now before EndDate
                );
            },
            endedIndividualAffiliates() {
                return this.individualAffiliates.filter((individualAffiliate) =>
                    individualAffiliate.EndDate && compareAsc(new Date(), individualAffiliate.EndDate) > 0
                    // now after EndDate
                );
            },
            activeEmployments() {
                return this.individualEmployers.filter((individualEmployer) =>
                    !individualEmployer.EndDate || compareAsc(individualEmployer.EndDate, new Date()) > 0
                    // now before EndDate
                );
            },
            showPast() {
                return this.showRelationship === 'past' ? 0 : -1;
            }
        },
        mounted() {
            setTimeout(this.isClicked, 5000);
        },
        methods: {
            copeWithProperty(propertyName) {
                return this.individualCope.filter((cope) => cope[propertyName]);
            },
            isClicked() {
                if (!this.clicked) {
                    const button = document.getElementById("editBtn");
                    button.click(function() {
                        console.log("you are here");
                    });
                }
            },
            reactivate(individualAffiliate) {
                return axios.put('/api/v2/custom/individualaffiliate/' + individualAffiliate.IndividualAffiliateId + '/reactivate?include=Affiliate,UnionRelationshipType,LocalDuesCategory,IndividualDeactivationReason,PaymentMethod,PaymentFrequency').then(response => {
                    if (response.data.data.statusCode === 422) {
                        this.alert = true;
                        this.alertType = 'error';
                        this.alertText = response.data.data.message;
                        return;
                    }
                    this.$emit('individual-affiliate-reactivated', response.data.data);
                });
            },
            createNew() {
                this.$emit('edit-individual-affiliate', {});
            },
            fieldVisible(fieldName, unionRelationship) {
                switch (fieldName) {
                    case 'Dues category':
                        return unionRelationship.UnionRelationshipTypeName === 'Member' || unionRelationship.UnionRelationshipTypeName === 'Agency Fee Payer' || unionRelationship.UnionRelationshipTypeName === 'Retired Member';
                    case 'Cope':
                        return unionRelationship.UnionRelationshipTypeName === 'Member' && this.selectedAffiliate.hasCope;
                    case 'Establish':
                        return unionRelationship.UnionRelationshipTypeName === 'Retired Member';
                }

                return false;
            },
            hasChapter(employers) {
                return employers
                    ? employers.filter((employer) => employer?.Employer?.Chapter)
                    : []
            },
            hasUnit(employers) {
                return employers
                    ? employers.filter((employer) => employer?.LocalJobClass?.Unit)
                    : []
            }
        }
    }
</script>

<style scoped>

</style>
