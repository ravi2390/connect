<template>
    <v-card class="mb-4">
        <v-card-title>Search for Committees</v-card-title>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-text-field key="text-first-name" label="First Name" v-model="filter.firstName" variant="underlined" />
                </v-col>
                <v-col>
                    <v-text-field key="text-last-name" label="Last Name" v-model="filter.lastName" variant="underlined" />
                </v-col>
                <v-col>
                    <v-select
                        key="text-department"
                        label="Committee Name"
                        v-model="filter.committeeName"
                        :items="committees"
                        item-title="AffiliateCommitteeName"
                        item-value="AffiliateCommitteeId"
                        variant="underlined"
                    />
                </v-col>
            </v-row>
            <div class="d-flex justify-center ga-2">
                <v-btn color="primary" variant="elevated" v-on:click="search()" class="flex-1-0">Search</v-btn>
                <v-btn color="default" variant="elevated" v-on:click="clear()" class="flex-1-0">Reset</v-btn>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="elevated" density="comfortable" v-on:click="addNewCommittee()">Add Committee Member</v-btn>
        </v-card-actions>
        <AffiliateCommitteesEditorComponent
            v-if="showAddIndividualCommittee"
            :committees="committees"
            :affiliateId="affiliateId"
            @canceled="showAddIndividualCommittee=false"
            @saved="addedNewCommittee"
        />
    </v-card>
    <CommitteesNameTableComponent
        v-for="committee in committees"
        :key="'committeetype-table-'+committee.AffiliateCommitteeName"
        :committee="committee.AffiliateCommitteeName"
        :committeeId="committee.AffiliateCommitteeId"
        :individuals="filteredIndividuals[committee.AffiliateCommitteeName]"
        :noDataText="noDataText"
        :committees="committees"
        :affiliateId="affiliateId"
        @committeeDeleted="$emit('savedCommittee')"
        @savedCommittee="$emit('savedCommittee')"
    />
</template>

<script>
    import { clone } from "lodash-es";
    import CommitteesNameTableComponent from "./CommitteesNameTableComponent";
    import AffiliateCommitteesEditorComponent from "./AffiliateCommitteesEditorComponent";

    export default {
        name: "CommitteesEditorComponent",
        components: {CommitteesNameTableComponent, AffiliateCommitteesEditorComponent},
        props: {
            affiliateCommittee: {
                required: true,
                type: Array
            },
            affiliateId: {
                required: true,
                type: Number
            }
        },
        data: ()=> ({
            noDataText: '',
            committees: [],
            filter: {
                firstName: '',
                lastName: '',
                committeeName: null,
            },
            individuals: {},
            filteredIndividuals: {},
            showAddIndividualCommittee: false,
        }),
        watch: {
            affiliateCommittee: {
                handler(data) {
                    if (this.affiliateCommittee) {
                        let committeeCount = this.affiliateCommittee.length;
                        for (let i = 0; i < committeeCount; i++) {
                            let committee = this.affiliateCommittee[i];
                            let committeeMemberCount = committee.affiliateCommitteeMember.length;
                            this.individuals[committee.AffiliateCommitteeName] = [];
                            if (!this.individuals.hasOwnProperty(committee.AffiliateCommitteeName)) {
                                this.individuals[committee.AffiliateCommitteeName] = [];
                            }
                            if (committeeMemberCount > 0) {
                                for (let j = 0; j < committeeMemberCount; j++) {
                                    if (committee.affiliateCommitteeMember[j]) {
                                        let individual = {};
                                        let committeeMember = committee.affiliateCommitteeMember[j];
                                        if (committeeMember.Individual) {
                                            individual['AffiliateCommitteeMemberId'] = committeeMember.AffiliateCommitteeMemberId;
                                            individual['AffiliateCommitteeId'] = committee.AffiliateCommitteeId;
                                            individual['CommitteeMemberTypeId'] = committeeMember.CommitteeMemberType.CommitteeMemberTypeId;
                                            individual['IndividualId'] = committeeMember.Individual.IndividualId;
                                            individual['FullName'] = committeeMember.Individual.FullName;
                                            individual['Individual'] = committeeMember.Individual;
                                            individual['StartDate'] = committeeMember.StartDate;
                                            individual['EndDate'] = committeeMember.EndDate;
                                            individual['CommitteeMemberTypeName'] = committeeMember.CommitteeMemberType.CommitteeMemberTypeName;
                                        }
                                        this.individuals[committee.AffiliateCommitteeName].push(individual);
                                    }
                                }
                            }
                        }
                        this.filteredIndividuals = clone(this.individuals);
                    }
                },
                deep: true
            }
        },
        mounted() {
            axios.get('/api/v2/AffiliateCommittee?include=CommitteeType&per_page=50')
                .then(response => {
                    this.committees = response.data.data;
                });
        },
        methods: {
            search() {
                if (this.filter.firstName !== '' || this.filter.lastName !== '' || this.filter.committeeName !== 0) {
                    this.filteredIndividuals = {};
                    for (const committeeName in this.individuals) {
                        if (this.individuals.hasOwnProperty(committeeName)) {
                            this.filteredIndividuals[committeeName] = this.individuals[committeeName].filter( v => {
                                return (this.filter.firstName === '' || v.Individual.FirstName.toLowerCase().includes(this.filter.firstName.toLowerCase()))
                                    && (this.filter.lastName === '' || v.Individual.LastName.toLowerCase().includes(this.filter.lastName.toLowerCase()))
                                    && (this.filter.committeeName === 0 || v.AffiliateCommitteeId === this.filter.committeeName)
                                    ;
                            });
                        }
                    }
                    this.noDataText = "No results found for '["+this.filter.firstName+"] + ["+this.filter.lastName+"]' name search.";
                } else {
                    this.clear();
                }
            },
            clear() {
                this.filter = {
                    firstName: '',
                    lastName: '',
                    committeeName: 0
                };
                this.filteredIndividuals = clone(this.individuals);
                this.noDataText = '';
            },
            addNewCommittee() {
                this.showAddIndividualCommittee = true;

            },
            addedNewCommittee(data) {
                this.showAddIndividualCommittee=false;
                this.$emit('savedCommittee', data);
            }
        }
    }
</script>
