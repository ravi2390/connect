<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Union Roles
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
            <v-row class="hidden-md-and-down">
                <v-col>
                    <v-btn-toggle v-model="showRoles" density="compact" variant="outlined" class="d-flex justify-end">
                        <v-btn size="small" value="current">SHOW CURRENT ROLES</v-btn>
                        <v-btn size="small" value="past">SHOW CURRENT AND PREVIOUS ROLES</v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
            <!-- Mobile Buttons -->
            <v-col class="hidden-lg-and-up">
                <v-btn size="x-small" @click="openPast()" >Show current and previous roles</v-btn>

            </v-col>
            <v-col class="hidden-lg-and-up">
                <v-btn size="x-small" @click="openCurrent()">Show current roles</v-btn>
            </v-col>
            <v-row>
                <v-col>
                    <v-expansion-panels :model-value="0" class="mb-4">
                        <v-expansion-panel>
                            <v-expansion-panel-text>
                                <v-row>
                                    <v-col><h3>Current Roles</h3></v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" lg="2">
                                        <h4>Officer roles</h4>
                                    </v-col>
                                    <v-col cols="10">
                                        <AffiliateSwitchRolesComponent
                                            component-name="Officer"
                                            section-name="officerRole"
                                            :affiliate-name="IndividualAffiliate.AffiliateName"
                                            :affiliate-number="IndividualAffiliate.AffiliateNumber"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row >
                                    <v-col cols="12">
                                        <v-data-table
                                            :hide-default-footer="true"
                                            :headers="officerroles"
                                            :mobile-breakpoint=992
                                            class="mobile-global-card-table"
                                            :items="currentIndividualOfficers"
                                            :items-per-page="-1"
                                        >
                                            <template v-slot:[`item.AffiliateName`]="props">
                                                    {{IndividualAffiliate.AffiliateName}}
                                            </template>
                                            <template v-slot:[`item.AffiliateNumber`]="props">
                                                    {{IndividualAffiliate.AffiliateNumber}}
                                            </template>
                                            <template v-slot:[`item.TermStartDate`]="props">
                                                <span v-if="props.item">
                                                    {{ $filters.formatDate(props.item.TermStartDate) }}
                                                </span>
                                            </template>
                                            <template v-slot:[`item.TermEndDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.TermEndDate) }}
                                                </span>
                                            </template>
                                        </v-data-table>

                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" lg="2">
                                        <h4>Staff roles</h4>
                                    </v-col>
                                    <v-col cols="10">
                                        <AffiliateSwitchRolesComponent
                                            component-name="Staff"
                                            section-name="staffRole"
                                            :affiliate-name="IndividualAffiliate.AffiliateName"
                                            :affiliate-number="IndividualAffiliate.AffiliateNumber"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-data-table
                                            :hide-default-footer="true"
                                            :headers="staffroles"
                                            :mobile-breakpoint=992
                                            class="mobile-global-card-table"
                                            :items="currentIndividualStaff"
                                            :items-per-page="-1"
                                        >
                                            <template v-slot:[`item.AffiliateName`]="props">
                                                    {{IndividualAffiliate.AffiliateName}}
                                            </template>
                                            <template v-slot:[`item.AffiliateNumber`]="props">
                                                    {{IndividualAffiliate.AffiliateNumber}}
                                            </template>
                                            <template v-slot:[`item.TermStartDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.TermStartDate) }}
                                                </span>
                                            </template>
                                            <template v-slot:[`item.TermEndDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.TermEndDate) }}
                                                </span>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                                <h4>Committee roles</h4>
                                <v-row>
                                    <v-col cols="12">
                                        <v-data-table
                                            :hide-default-footer="true"
                                            :headers="committeeroles"
                                            :mobile-breakpoint=992
                                            class="mobile-global-card-table"
                                            :items="currentIndividualCommitteeMembers"
                                            :items-per-page="-1"
                                        >
                                            <template v-slot:[`item.AffiliateName`]="props">
                                                    {{IndividualAffiliate.AffiliateName}}
                                            </template>
                                            <template v-slot:[`item.AffiliateNumber`]="props">
                                                    {{IndividualAffiliate.AffiliateNumber}}
                                            </template>
                                            <template v-slot:[`item.StartDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.StartDate) }}
                                                </span>
                                            </template>
                                            <template v-slot:[`item.EndDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.EndDate) }}
                                                </span>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                                <h4>Groups</h4>
                                <v-row>
                                    <v-col cols="12">
                                        <v-data-table
                                            :hide-default-footer="true"
                                            :headers="groups"
                                            :mobile-breakpoint=992
                                            class="mobile-global-card-table"
                                            :items="currentIndividualGroups"
                                            :items-per-page="-1"
                                        >
                                            <template v-slot:[`item.AffiliateName`]="props">
                                                    {{IndividualAffiliate.AffiliateName}}
                                            </template>
                                            <template v-slot:[`item.AffiliateNumber`]="props">
                                                    {{IndividualAffiliate.AffiliateNumber}}
                                            </template>
                                            <template v-slot:[`item.StartDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.StartDate) }}
                                                </span>
                                            </template>
                                            <template v-slot:[`item.EndDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.EndDate) }}
                                                </span>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-expansion-panels :model-value="showPast">
                        <v-expansion-panel>
                            <v-expansion-panel-text>
                                <v-row>
                                    <v-col><h3>Previous Roles</h3></v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" lg="2">
                                        <h4>Officer roles</h4>
                                    </v-col>
                                    <v-col cols="10">
                                        <AffiliateSwitchRolesComponent
                                            component-name="Officer"
                                            section-name="officerRole"
                                            :affiliate-name="IndividualAffiliate.AffiliateName"
                                            :affiliate-number="IndividualAffiliate.AffiliateNumber"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row >
                                    <v-col cols="12">
                                        <v-data-table
                                            :hide-default-footer="true"
                                            :headers="officerroles"
                                            :mobile-breakpoint=992
                                            class="mobile-global-card-table"
                                            :items="pastIndividualOfficers"
                                            :items-per-page="-1"
                                        >
                                            <template v-slot:[`item.AffiliateName`]="props">
                                                    {{IndividualAffiliate.AffiliateName}}
                                            </template>
                                            <template v-slot:[`item.AffiliateNumber`]="props">
                                                    {{IndividualAffiliate.AffiliateNumber}}
                                            </template>
                                            <template v-slot:[`item.TermStartDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.TermStartDate) }}
                                                </span>
                                            </template>
                                            <template v-slot:[`item.TermEndDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.TermEndDate) }}
                                                </span>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="2">
                                        <h4>Staff roles</h4>
                                    </v-col>
                                    <v-col cols="10">
                                        <AffiliateSwitchRolesComponent
                                            component-name="Staff"
                                            section-name="staffRole"
                                            :affiliate-name="IndividualAffiliate.AffiliateName"
                                            :affiliate-number="IndividualAffiliate.AffiliateNumber"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-data-table
                                            :hide-default-footer="true"
                                            :headers="staffroles"
                                            :mobile-breakpoint=992
                                            class="mobile-global-card-table"
                                            :items="pastIndividualStaff"
                                            :items-per-page="-1"
                                        >
                                            <template v-slot:[`item.AffiliateName`]="props">
                                                    {{IndividualAffiliate.AffiliateName}}
                                            </template>
                                            <template v-slot:[`item.AffiliateNumber`]="props">
                                                    {{IndividualAffiliate.AffiliateNumber}}
                                            </template>
                                            <template v-slot:[`item.TermStartDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.TermStartDate) }}
                                                </span>
                                            </template>
                                            <template v-slot:[`item.TermEndDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.TermEndDate) }}
                                                </span>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                                <h4>Committee roles</h4>
                                <v-row>
                                    <v-col cols="12">
                                        <v-data-table
                                            :hide-default-footer="true"
                                            :headers="committeeroles"
                                            :mobile-breakpoint=992
                                            class="mobile-global-card-table"
                                            :items="pastIndividualCommitteeMembers"
                                            :items-per-page="-1"
                                        >
                                            <template v-slot:[`item.AffiliateName`]="props">
                                                    {{IndividualAffiliate.AffiliateName}}
                                            </template>
                                            <template v-slot:[`item.AffiliateNumber`]="props">
                                                    {{IndividualAffiliate.AffiliateNumber}}
                                            </template>
                                            <template v-slot:[`item.StartDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.StartDate) }}
                                                </span>
                                            </template>
                                            <template v-slot:[`item.EndDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.EndDate) }}
                                                </span>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                                <h4>Groups</h4>
                                <v-row>
                                    <v-col cols="12">
                                        <v-data-table
                                            :hide-default-footer="true"
                                            :headers="groups"
                                            :mobile-breakpoint=992
                                            class="mobile-global-card-table"
                                            :items="pastIndividualGroups"
                                            :items-per-page="-1"
                                        >
                                            <template v-slot:[`item.AffiliateName`]="props">
                                                    {{IndividualAffiliate.AffiliateName}}
                                            </template>
                                            <template v-slot:[`item.AffiliateNumber`]="props">
                                                    {{IndividualAffiliate.AffiliateNumber}}
                                            </template>
                                            <template v-slot:[`item.StartDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.StartDate) }}
                                                </span>
                                            </template>
                                            <template v-slot:[`item.EndDate`]="{ item }">
                                                <span v-if="item">
                                                    {{ $filters.formatDate(item.EndDate) }}
                                                </span>
                                            </template>
                                        </v-data-table>
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
    import AffiliateSwitchRolesComponent from "../../Affiliate/AffiliateSwitchRolesComponent";
    export default {
        name: "UnionRolesComponent",
        components: {AffiliateSwitchRolesComponent},
        data() {
            return {
                id: '',
                showRoles: 'current',
                currentPanel: 0,
                pastPanel: -1,
                individualOfficers: [],
                IndividualAffiliate: {},
                currentIndividualOfficers: [],
                pastIndividualOfficers: [],
                individualStaff: [],
                currentIndividualStaff: [],
                pastIndividualStaff: [],
                currentIndividualCommitteeMembers: [],
                pastIndividualCommitteeMembers: [],
                individualCommitteeMembers: [],
                individualGroups: [],
                currentIndividualGroups: [],
                pastIndividualGroups: [],
                loading: false,
                Affiliate: {},
                officerroles: [
                    {title: 'Title', value: 'AffiliateOfficerRole.AffiliateOfficerRoleName'},
                    {title: 'Affiliate number', value: 'AffiliateNumber'},
                    {title: 'Affiliate name', value: 'AffiliateName'},
                    {title: 'Elected?', value: 'IsElected'},
                    {title: 'Start date', value: 'TermStartDate'},
                    {title: 'End date', value: 'TermEndDate'},
                ],
                staffroles: [
                    {title: 'Title', value: 'StaffTitle'},
                    {title: 'Function area', value: 'StaffDepartment.StaffDepartmentName'},
                    {title: 'Affiliate name', value: 'AffiliateName'},
                    {title: 'Affiliate number', value: 'AffiliateNumber'},
                    {title: 'Start date', value: 'TermStartDate'},
                    {title: 'End date', value: 'TermEndDate'},
                ],
                committeeroles: [
                    {title: 'Title', value: 'CommitteeMemberType.CommitteeMemberTypeName'},
                    {title: 'Committee', value: 'AffiliateCommittee.AffiliateCommitteeName'},
                    {title: 'Affiliate name', value: 'AffiliateName'},
                    {title: 'Affiliate number', value: 'AffiliateNumber'},
                    {title: 'Start date', value: 'StartDate'},
                    {title: 'End date', value: 'EndDate'},
                ],
                groups: [
                    {title: 'Group', value: 'AffiliateGroup.AffiliateGroupName'},
                    {title: 'Affiliate number', value: 'AffiliateNumber'},
                    {title: 'Affiliate name', value: 'AffiliateName'},
                    {title: 'Start date', value: 'StartDate'},
                    {title: 'End date', value: 'EndDate'},
                ]
            }
        },
        mounted() {
            this.id = this.$route.params.id;
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/aggregate/individual/unionroles/' + this.id)
                    .then(response => {
                        this.IndividualAffiliate = response.data.data[0].Affiliate;
                        this.individualOfficers = response.data.data[0].individualOfficers;
                        this.currentIndividualOfficers = response.data.data[0].currentIndividualOfficers;
                        this.pastIndividualOfficers = response.data.data[0].pastIndividualOfficers;
                        this.individualStaff = response.data.data[0].individualStaff;
                        this.currentIndividualStaff = response.data.data[0].currentIndividualStaff;
                        this.pastIndividualStaff = response.data.data[0].pastIndividualStaff;
                        this.individualCommitteeMembers = response.data.data[0].individualCommitteeMember;
                        this.currentIndividualCommitteeMembers = response.data.data[0].currentIndividualCommitteeMember;
                        this.pastIndividualCommitteeMembers = response.data.data[0].pastIndividualCommitteeMember;
                        this.individualGroups = response.data.data[0].individualGroupMember;
                        this.currentIndividualGroups = response.data.data[0].currentIndividualGroupMember;
                        this.pastIndividualGroups = response.data.data[0].pastIndividualGroupMember;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },
            openCurrent() {
                this.currentPanel = 0;
                this.pastPanel = -1;
            },
            openPast() {
                this.currentPanel = -1;
                this.pastPanel = 0;
            },
        },
        computed: {
            showPast() {
                return this.showRoles === 'past' ? 0 : -1;
            }
        }
    }
</script>

