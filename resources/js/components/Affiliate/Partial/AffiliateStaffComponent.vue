<template>
    <v-expansion-panel value="staffRole" v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Staff Roles
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <FlipCard :flipped="flipped">
                <template #front>
                    <v-row>
                        <v-col class="text-right">
                            <v-btn size="small" color="primary" v-on:click="flipped=true">Manage</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-data-table
                                :headers="staffroles"
                                :loading="loading"
                                :items="currentAffiliateStaff"
                                v-model:options="options"
                                class="mobile-global-card-table"
                                :mobile-breakpoint=992
                            >
                                <template v-slot:[`item.FullName`]="{ item }">
                                    <router-link :to="{ name: 'IndividualDetails', params: { id: item.Individual.IndividualId }}">
                                        {{ item.Individual.FirstName }} {{ item.Individual.LastName }}
                                    </router-link>
                                </template>
                                <template v-slot:[`item.TermStartDate`]="{ item }">
                                    {{ $filters.formatDate(item.TermStartDate) }}
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <v-row>
                        <v-col class="text-right">
                            <v-btn size="small" color="primary" v-on:click="flipped=false">Cancel</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <StaffEditorComponent :affiliateStaff="affiliateStaff" @savedStaff="getDataFromApi" :affiliateId="affiliateId"></StaffEditorComponent>
                        </v-col>
                    </v-row>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../Common/Card/FlipCard";
    import StaffEditorComponent from "./StaffEditorComponent";
    import { compareAsc } from 'date-fns';

    export default {
        name: "AffiliateStaffComponent",
        components: {StaffEditorComponent, FlipCard},

        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },

        data: () => ({
            id: '',
            affiliateStaff: [],
            currentAffiliateStaff: [],
            loading: true,
            staffroles: [
                {title: 'Staff Name', value: 'FullName', sortable: false},
                {title: 'Function area', value: 'StaffDepartment.StaffDepartmentName', sortable: true},
                {title: 'Staff Role Title', value: 'StaffTitle', sortable: true},
                {title: 'Start date', value: 'TermStartDate', sortable: true},
            ],
            options: {
                sortBy: [{ key: 'StaffDepartment.StaffDepartmentName', order: 'asc' }]
            },
            flipped: false,
            panel: []
        }),
        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },
            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/aggregate/affiliate/staff/' + this.affiliateId + '?scope=global';
                axios.get(url)
                    .then(response => {
                        this.affiliateStaff = response.data.data;
                        this.currentAffiliateStaff = this.getCurrentStaff();
                    })
                    .finally(() => {
                        this.loading = false;
                    });

            },
            getCurrentStaff() {
                return this.affiliateStaff.filter(staff =>
                    // moment(staff.TermStartDate).isSameOrAfter(moment())
                    (staff.TermEndDate === '' || compareAsc(new Date(staff.TermEndDate), new Date()) >= 0)
                );
            },
        }
    }
</script>

<style scoped>

</style>
