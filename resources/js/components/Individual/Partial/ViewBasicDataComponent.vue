<template>
    <v-card v-if="shouldDisplayDataComponent">
        <v-card-title class="details-header d-flex justify-space-between">
            {{ individual.Prefix && individual.Prefix.PrefixName}} {{individual.FirstName}} {{ individual.MiddleName }} {{individual.LastName}}{{individual.Suffix && individual.Suffix.SuffixName ? ', '+individual.Suffix.SuffixName:''}}
            <v-btn class="hidden-md-and-down" @click="$emit('edit-individual')">Edit</v-btn>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" lg="6">
                        <div class="data-container">
                            <div class="data-tag">Preferred Name:</div>
                            <div class="data-value">
                                {{ individual.PreferredName }}
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Original Last Name:</div>
                            <div class="data-value">
                                {{ individual.PreviousName }}
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Affiliate Number:</div>
                            <div class="data-value">
                        <span>
                            {{ getUniqueAffiliates(individual.individualAffiliates, 'AffiliateNumber') }}
                        </span>
                            </div>
                        </div>

                        <div class="data-container">
                            <div class="data-tag">Affiliate Name:</div>
                            <div class="data-value">
                        <span>
                            {{ getUniqueAffiliates(individual.individualAffiliates, 'AffiliateName') }}
                        </span>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Union Relationship:</div>
                            <div class="data-value">
                                <div
                                    v-for="affiliate in individual.activeIndividualAffiliates"
                                    v-bind="affiliate"
                                    :key="affiliate.IndividualAffiliateId"
                                >
                            <span v-if="affiliate.UnionRelationshipType">
                                {{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                            </span>
                                </div>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Local Dues/Fee Category:</div>
                            <div class="data-value">
                                <div
                                    v-for="affiliate in individual.activeIndividualAffiliates"
                                    v-bind="affiliate"
                                    :key="affiliate.IndividualAffiliateId"
                                >
                                <span v-if="affiliate.LocalDuesCategory">
                                    {{ affiliate.LocalDuesCategory.LocalDuesCategoryName }}
                                </span>
                                </div>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Relationship Start Date:</div>
                            <div class="data-value">
                                <div
                                    v-for="affiliate in individual.activeIndividualAffiliates"
                                    v-bind="affiliate"
                                    :key="affiliate.IndividualAffiliateId">
                                    {{ $filters.formatDate(affiliate.StartDate) }}
                                </div>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Member ID:</div>
                            <div class="data-value">
                                <div
                                    v-for="member in individual.individualMembers"
                                    v-bind="member"
                                    :key="member.MemberIdMappingId">
                                    <div v-if="isActiveMember(individual.activeIndividualAffiliates, member.AffiliateId)">
                                        {{ member.MemberId }} ({{ getUniqueAffiliatesById(individual.individualAffiliates, 'AffiliateName', member.AffiliateId) }} - {{ getUniqueAffiliatesById(individual.individualAffiliates, 'AffiliateNumber', member.AffiliateId) }})
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <div class="data-container">
                            <div class="data-tag">Employer:</div>
                            <div class="data-value">
                                <div
                                    v-for="(employer, index) in employerStructural(individual.activeIndividualEmployers)"
                                    v-bind="employer"
                                    :key="employer.IndividualEmployerId"
                                >
                                    <span v-if="index>0">, </span>
                                    {{ employer.Employer.EmployerName }}
                                </div>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Employee ID:</div>
                            <div class="data-value">
                                <div
                                    v-for="employer in individual.activeIndividualEmployers"
                                    v-bind="employer"
                                    :key="employer.IndividualEmployerId"
                                >
                                    {{ employer.EmployeeId }}
                                </div>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Is Working:</div>
                            <div class="data-value">
                        <span v-for="(affiliate,index) in individual.activeIndividualAffiliates"
                              v-bind="affiliate"
                              :key="affiliate.IndividualAffiliateId">
                            <span v-if="affiliate.IsCurrent == true">
                                Yes
                            </span>
                            <span v-if="affiliate.IsCurrent == false">
                                No
                            </span>
                            <span v-if="index != individual.activeIndividualAffiliates.length - 1">, </span>
                        </span>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Last Assessment Rating:</div>
                            <div class="data-value">
                        <span v-if="individual.individualQuickComments && individual.individualQuickComments.length > 0">
                            <span v-if="individual.individualQuickComments[individual.individualQuickComments.length - 1].IndividualAssessment">
                                {{ individual.individualQuickComments[individual.individualQuickComments.length - 1].IndividualAssessment.Rating }}
                            </span>
                            <span v-if="!individual.individualQuickComments[individual.individualQuickComments.length - 1].IndividualAssessment">
                            </span>
                        </span>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Address:</div>
                            <div class="data-value">
                        <span v-if="individual && individual.individualAddressesOrdered && individual.individualAddressesOrdered.length > 0">
                            {{ individual.individualAddressesOrdered[0].AddressLine1 }},
                            {{ individual.individualAddressesOrdered[0].AddressLine2 && individual.individualAddressesOrdered[0].AddressLine2.trim().length > 0 ? individual.individualAddressesOrdered[0].AddressLine2 + ', ' : ''}}
                            {{ individual.individualAddressesOrdered[0].City }},
                            {{ individual.individualAddressesOrdered[0].StateTerritory ? individual.individualAddressesOrdered[0].StateTerritory.StateTerritoryCode : '' }},
                            {{ individual.individualAddressesOrdered[0].PostalCode }}
                        </span>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Email:</div>
                            <div class="data-value">
                        <span v-if="individual && individual.individualEmailsOrdered && individual.individualEmailsOrdered.length > 0">
                            {{ individual.individualEmailsOrdered[0].Email }}
                        </span>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Phone:</div>
                            <div class="data-value">
                        <span v-if="individual && individual.individualPhonesOrdered && individual.individualPhonesOrdered.length > 0">
                            {{ individual.individualPhonesOrdered[0].PhoneNumber }}
                        </span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
            <!-- MOBILE Breakpoint -->
            <v-container class="hidden-lg-and-up" v-if="!shouldDisplayDataComponent">
                <v-row v-touch="{right: () => swipe('right'),}">
                    <v-col>
                        <h3 class="mobile-link-style">
                            <router-link
                            :to="{ name: 'IndividualDetails', params: { id:individual.IndividualId }}"
                            >
                                {{ individual.FirstName }} {{ individual.LastName }}
                            </router-link>
                        </h3>
                        <div class="mobile-link-note-container">
                            <div class="data-value">
                                <span>Click on the name to view and edit the individual record.</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container" v-if="individual.PreferredName">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Preferred Name: </span>
                                <span>{{ individual.PreferredName }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container" v-if="individual.FirstName">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">First Name: </span>
                                <span>{{ individual.FirstName }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container" v-if="individual.MiddleName">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Middle Name: </span>
                                <span>{{ individual.MiddleName }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container" v-if="individual.LastName">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Last Name: </span>
                                <span>{{ individual.LastName }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container" v-if="individual.YearOfBirth">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Date of Birth: </span>
                                <span>{{individual.MonthOfBirth}}/{{individual.DayOfBirth}}/{{individual.YearOfBirth}}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Union Relationship: </span>
                                <span
                                    v-for="(unionRelationshipTypeName,index) in getUniqueAffiliateUnionRelationshipNames(individual.individualAffiliates)"
                                    :key="index"
                                >
                                    <span>{{ unionRelationshipTypeName }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Affiliates: </span>
                                <span>{{ getUniqueAffiliates(individual.activeIndividualAffiliates, 'AffiliateName') }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                            <div class="mobile-detail-column-name">Member ID: </div>
                                <div
                                    v-for="member in individual.individualMembers"
                                    v-bind="member"
                                    :key="member.MemberIdMappingId">
                                        {{ member.MemberId }}
                                </div>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Local Dues/Fee Category: </span>
                                <span
                                    v-for="affiliate in itemsWithProperty(individual.activeIndividualAffiliates, 'LocalDuesCategory')"
                                    v-bind="affiliate"
                                    :key="affiliate.IndividualAffiliateId"
                                >{{ affiliate.LocalDuesCategory.LocalDuesCategoryName }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value" v-if="individual.individualEmployers">
                                <span class="mobile-detail-column-name">Employee ID: </span>
                                <span
                                    v-for="employer in itemsWithProperty(individual.individualEmployers, 'EmployeeId')"
                                    v-bind="employer"
                                    :key="employer.EmployerId"
                                >{{ employer.EmployeeId }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Employer: </span>
                                <span
                                    v-for="employer in individual.individualEmployers"
                                    v-bind="employer"
                                    :key="employer.IndividualEmployerId"
                                >{{ employer.Employer.EmployerName }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Employer Start Date Range: </span>
                                <span
                                    v-for="employer in individual.individualEmployers"
                                    v-bind="employer"
                                    :key="employer.EmployerId"
                                >{{ $filters.formatDate(employer.StartDate) }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Employer End Date Range: </span>
                                <span
                                    v-for="employer in individual.individualEmployers"
                                    v-bind="employer"
                                    :key="employer.IndividualEmployerId"
                                >{{ $filters.formatDate(employer.EndDate) }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value" v-if="individual.individualEmployers">
                                <span class="mobile-detail-column-name">Job Category: </span>
                                <span
                                    v-for="employer in itemsWithProperty(individual.individualEmployers, 'LocalJobClass')"
                                    v-bind="employer"
                                    :key="employer.IndividualEmployerId"
                                >{{ employer.LocalJobClass.LocalJobClassName }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Staff Roles: </span>
                                <span
                                    v-for="affiliate in individual.activeIndividualAffiliates"
                                    v-bind="affiliate"
                                    :key="affiliate.IndividualAffiliateId"
                                >
                                    <span
                                    v-for="staff in affiliate.individualStaff"
                                    v-bind="staff"
                                    :key="staff.AffiliateStaffId"
                                    >
                                        {{ staff.StaffTitle }}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Officer Roles: </span>
                                <span
                                    v-for="officerRole in officerRoles"
                                    v-bind="officerRole"
                                    :key="officerRole.AffiliateOfficerRoleId"
                                >{{ officerRole.AffiliateOfficerRoleName }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Last Assessment Rating: </span>
                                <span
                                    v-if="individual.individualQuickComments && individual.individualQuickComments.length > 0"
                                >{{ individual.individualQuickComments[individual.individualQuickComments.length - 1].IndividualAssessment.Rating }}</span>
                            </div>
                        </div>
                        <div class="data-container mobile-data-container">
                            <div class="data-value">
                                <span class="mobile-detail-column-name">Last Assessment Date: </span>
                                <span
                                    v-if="individual.individualQuickComments && individual.individualQuickComments.length > 0"
                                >{{ $filters.formatDate(individual.individualQuickComments[individual.individualQuickComments.length - 1].CommentDate) }}</span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Mobile Edit button -->
            <v-btn class="hidden-lg-and-up" variant="elevated" @click="$emit('edit-individual')">Edit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "ViewBasicDataComponent",
        props: {
            individual: {
                type: Object,
                required: true
            },
            officerRoles: {
                type: Array,
                required: false
            },
            shouldDisplayDataComponent: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            swipe (direction) {
                this.$emit('swipeToClose');
            },
            getUniqueAffiliates(individualAffiliates, fieldName) {
                const affiliates = [];

                if (!individualAffiliates) {
                    return affiliates;
                }

                for (const individualAffiliate of individualAffiliates) {
                    if (individualAffiliate.Affiliate && affiliates.indexOf(individualAffiliate.Affiliate[fieldName]) === -1) {
                        affiliates.push(individualAffiliate.Affiliate[fieldName]);
                    }
                }

                return affiliates.join(',');
            },
            getUniqueAffiliatesById(individualAffiliates, fieldName, AffiliateId) {
                const affiliates = [];

                if (!individualAffiliates) {
                    return affiliates;
                }

                for (const individualAffiliate of individualAffiliates) {

                    if (individualAffiliate.Affiliate && individualAffiliate.Affiliate.AffiliateId == AffiliateId && affiliates.indexOf(individualAffiliate.Affiliate[fieldName]) === -1) {
                        affiliates.push(individualAffiliate.Affiliate[fieldName]);
                    }
                }

                return affiliates.join(',');
            },
            isActiveMember(individualAffiliates, AffiliateId) {
                const isActive = false;

                if (!individualAffiliates) {
                    return isActive;
                }

                const activeIndividualAffiliates = individualAffiliates.map(affiliate=>affiliate.Affiliate.AffiliateId);

                if(activeIndividualAffiliates.indexOf(AffiliateId)==-1){
                    return isActive
                }
                return true;
            },
            getUniqueAffiliateUnionRelationshipNames(individualAffiliates) {
                const affiliates = [];

                if (!individualAffiliates) {
                    return affiliates;
                }

                for (const individualAffiliate of individualAffiliates) {
                    if (individualAffiliate.UnionRelationshipType && affiliates.indexOf(individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName) === -1) {
                        affiliates.push(individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName);
                    }
                }

                return affiliates;
            },
            employerStructural(employers) {
                return employers ? employers.filter(employer => employer.Employer && employer.Employer.IsStructural == 0) : [];
            },
            itemsWithProperty(items, property) {
                return items.filter(item => item[property]);
            },
            individualWithEmployer(individuals) {
                return individuals.filter(individual => individual.individualEmployers[0].Employer);
            }
        }
    }
</script>

<style scoped>

</style>
