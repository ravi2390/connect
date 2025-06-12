<template>
    <v-expansion-panel value="officerRole" v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Officer Roles
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
                        <v-col cols="12">
                            <officer-roles-list-component :affiliateId="affiliateId" ref="officerlist"></officer-roles-list-component>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <v-row class="mb-4">
                        <v-col class="text-right">
                            <v-btn size="small" color="primary" v-on:click="onCancel">Cancel</v-btn>
                        </v-col>
                    </v-row>
                    <OfficerRolesEditComponent
                        v-on:cancel-edit-officer-roles-manager="flipped=false"
                        :roles="rolesObjects"
                        :individuals="individuals"
                        :roleTypes="roleTypes"
                        :roleTitles="roleTitles"
                        :affiliateId="affiliateId"
                        @reload="getDataFromApi"
                    />
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../Common/Card/FlipCard";
    import OfficerRolesEditComponent from "./OfficerRolesEditComponent";
    import OfficerRolesListComponent from "./OfficerRolesListComponent";

    export default {
        name: "OfficerRolesComponent",

        components: {
            FlipCard,
            OfficerRolesEditComponent,
            OfficerRolesListComponent
        },

        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },

        data: () => ({
            roles: [],
            individuals: {},
            loading: true,
            flipped: false,
            roleTypes: [],
            roleTitles: [],
            rolesObjects: [],
            panel: []
        }),

        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },
            onCancel(){
                this.flipped=false;
                this.$refs.officerlist.getDataFromApi();
            },
            getDataFromApi() {
                axios.get('/api/v2/officerRoleType?per_page=50')
                    .then(response => {
                        this.roleTypes = response.data.data;
                    });
                axios.get('/api/v2/officerRoleTitle?per_page=50')
                    .then(response => {
                        this.roleTitles = response.data.data;
                    });

                this.loading = true;
                let url = '/api/v2/affiliateOfficerRole/' + this.affiliateId + '?scope=global';

                return axios.get(url)
                    .then(response => {
                        this.roles = [];
                        for (const role in response.data.data) {
                            if (response.data.data.hasOwnProperty(role)) {
                                this.roles.push(role);
                            }
                        }
                        this.individuals = response.data.data;
                        this.rolesObjects = response.data.roles;
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
