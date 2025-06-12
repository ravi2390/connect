<template>
    <div>
        <v-card class="mb-4">
            <v-card-title>
                Search for Officers
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col>
                        <v-text-field key="text-first-name" label="First Name" v-model="filter.firstName" variant="underlined" />
                    </v-col>
                    <v-col>
                        <v-text-field key="text-last-name" label="Last Name" v-model="filter.lastName" variant="underlined" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="d-flex justify-end ga-2">
                        <v-btn elevation="0" color="primary" class="mb-4 btn-block" v-on:click="search()">Search</v-btn>
                        <v-btn elevation="0" color="default" class="mb-4 btn-block" v-on:click="clear()">Clear</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="showAddRole=true" variant="elevated">Add Role</v-btn>
                <v-btn color="primary" v-on:click="showAddPersonToRole=true" variant="elevated">Add Person to Role</v-btn>
            </v-card-actions>
        </v-card>
        <RoleEditorComponent
            v-if="showAddRole"
            @canceled="showAddRole=false"
            @saved="roleSaved"
            :roleTypes="roleTypes"
            :roleTitles="roleTitles"
            :affiliateId="affiliateId"
        />
        <v-alert :type="alertTypeRole" v-model="alertRole" closable close-text="Dismiss" class="mb-2">{{ alertTextRole }}</v-alert>
        <RolePersonEditorComponent
            v-if="showAddPersonToRole"
            @canceled="showAddPersonToRole=false"
            @saved="personToRoleSaved"
            :roles="roles"
            :affiliateId="affiliateId"
            :individuals="filteredIndividuals"
        />
        <v-alert :type="alertTypePersonToRole" v-model="alertPersonToRole" closable close-text="Dismiss" class="mb-2">{{ alertTextPersonToRole }}</v-alert>
        <AffiliateOfficerRoleListComponent
            v-for="role in roles" v-bind:key="role.AffiliateOfficerRoleId"
            :role="role.AffiliateOfficerRoleName"
            :individuals="filteredIndividuals[role.AffiliateOfficerRoleName]"
            :roleTypes="roleTypes" :roleTitles="roleTitles"
            :roleObject="role"
            :roles="roles"
            :affiliateId="affiliateId"
            @role-deleted="emitReload"
            :noDataText="noDataText"
        />
    </div>
</template>

<script>
    import AffiliateOfficerRoleListComponent from "./AffiliateOfficerRoleListComponent";
    import RoleEditorComponent from "./RoleEditorComponent";
    import RolePersonEditorComponent from "./RolePersonEditorComponent";

    export default {
        name: "OfficerRolesEditComponent",
        components: {
            AffiliateOfficerRoleListComponent,
            RoleEditorComponent,
            RolePersonEditorComponent
        },
        props: {
            roles: {},
            individuals: {
                type: Object,
                default: {},
                required: false
            },
            roleTypes: {},
            roleTitles: {},
            affiliateId: {
                required: true
            }
        },
        data: () => ({
            filter: {
                firstName: '',
                lastName: ''
            },
            alertRole: false,
            alertTypeRole: 'success',
            alertTextRole: '',
            alertPersonToRole: false,
            alertTypePersonToRole: 'success',
            alertTextPersonToRole: '',
            showAddRole: false,
            showAddPersonToRole: false,
            filteredIndividuals: {},
            noDataText: ''
        }),
        methods: {
            search() {
                if (this.filter.firstName !== '' || this.filter.lastName !== '') {
                    this.filteredIndividuals = {};
                    for (const role in this.individuals) {
                        if (this.individuals.hasOwnProperty(role)) {
                            this.filteredIndividuals[role] = this.individuals[role].filter( v => {
                                return (this.filter.firstName === '' || v.FirstName.toLowerCase().includes(this.filter.firstName.toLowerCase()))
                                    && (this.filter.lastName === '' || v.LastName.toLowerCase().includes(this.filter.lastName.toLowerCase()))
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
                    lastName: ''
                };
                this.filteredIndividuals = this.individuals;
                this.noDataText = '';
            },
            emitReload() {
                this.$emit('reload');
            },
            getDataFromApi() {
            },
            roleSaved() {
                this.alertRole = true;
                this.alertTypeRole = 'success';
                this.alertTextRole = 'Role saved.';
                this.emitReload();
                this.showAddRole = false;
            },
            personToRoleSaved() {
                this.alertPersonToRole = true;
                this.alertTypePersonToRole = 'success';
                this.alertTextPersonToRole = 'Person to role saved';
                this.emitReload();
                this.showAddPersonToRole = false;
            }    
        },
        watch: {
            individuals: function(newVal) {
                this.filteredIndividuals = newVal;
            }
        }
    }

</script>
