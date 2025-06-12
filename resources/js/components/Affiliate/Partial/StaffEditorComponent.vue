<template>
    <div>
    <v-card class="mb-4">
        <v-card-title>Search for Staff</v-card-title>
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
                        label="Department"
                        v-model="filter.department"
                        :items="departments"
                        item-title="StaffDepartmentName"
                        item-value="StaffDepartmentId"
                        variant="underlined"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex justify-end ga-2">
                    <v-btn color="primary" v-on:click="search()">Search</v-btn>
                    <v-btn color="default" v-on:click="clear()">Clear</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" v-on:click="addNewStaff()" variant="elevated">Add Staff Member</v-btn>
        </v-card-actions>
    </v-card>
    <StaffDepartmentTableComponent
        v-for="department in departments" :key="'department-table-'+department.StaffDepartmentName"
        :department="department.StaffDepartmentName"
        :individuals="filteredIndividuals[department.StaffDepartmentName]"
        :noDataText="noDataText"
        :departments="departments"
        :affiliateId="affiliateId"
        @staffDeleted="$emit('savedStaff')"
        @savedStaff="$emit('savedStaff')"
    />
    <AffiliateStaffEditorComponent
        v-if="showAddIndividualStaff"
        :departments="departments"
        :affiliateId="affiliateId"
        @canceled="showAddIndividualStaff=false"
        @saved="addedNewStaff"
    />
    </div>
</template>

<script>
    import { clone } from "lodash-es";
    import StaffDepartmentTableComponent from "./StaffDepartmentTableComponent";
    import AffiliateStaffEditorComponent from "./AffiliateStaffEditorComponent";

    export default {
        name: "StaffEditorComponent",
        components: {AffiliateStaffEditorComponent, StaffDepartmentTableComponent},
        props: {
            affiliateStaff: {
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
            departments: [],
            filter: {
                firstName: '',
                lastName: '',
                department: 0
            },
            individuals: {},
            filteredIndividuals: {},
            showAddIndividualStaff: false,
        }),
        watch: {
            affiliateStaff: {
                handler(data) {
                    this.individuals = {};
                    data.map(staff => {
                        if (!this.individuals.hasOwnProperty(staff.StaffDepartment.StaffDepartmentName)) {
                            this.individuals[staff.StaffDepartment.StaffDepartmentName] = [];
                        }
                        let count = staff.Individual.individualEmailsOrdered.length;
                        for (let i = count; i > 0; i--) {
                           if (staff.Individual.individualEmailsOrdered[i]) {
                               staff.Individual.individualEmailsOrdered[i].Email = '';
                           }
                        }

                        count = staff.Individual.individualPhonesOrdered.length;
                        for (let i = count; i > 0; i--) {
                           if (staff.Individual.individualPhonesOrdered[i]) {
                               staff.Individual.individualPhonesOrdered[i].PhoneNumber = '';
                           }
                        }

                        this.individuals[staff.StaffDepartment.StaffDepartmentName].push(staff);
                    });
                    this.filteredIndividuals = clone(this.individuals);
                },
                deep: true
            }
        },
        mounted() {
            axios.get('/api/v2/StaffDepartment?per_page=50')
                .then(response => {
                    this.departments = response.data.data;
                });
        },
        methods: {
            search() {
                if (this.filter.firstName !== '' || this.filter.lastName !== '' || this.filter.department !== 0) {
                    this.filteredIndividuals = {};
                    for (const department in this.individuals) {
                        if (this.individuals.hasOwnProperty(department)) {
                            this.filteredIndividuals[department] = this.individuals[department].filter( v => {
                                return (this.filter.firstName === '' || v.Individual.FirstName.toLowerCase().includes(this.filter.firstName.toLowerCase()))
                                    && (this.filter.lastName === '' || v.Individual.LastName.toLowerCase().includes(this.filter.lastName.toLowerCase()))
                                    && (this.filter.department === 0 || v.StaffDepartment.StaffDepartmentId === this.filter.department)
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
                    department: 0
                };
                this.filteredIndividuals = clone(this.individuals);
                this.noDataText = '';
            },
            addNewStaff() {
                this.showAddIndividualStaff = true;

            },
            addedNewStaff(data) {
                this.showAddIndividualStaff=false;
                this.$emit('savedStaff', data);
            }
        }
    }
</script>
