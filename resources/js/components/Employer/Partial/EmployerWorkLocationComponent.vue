<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Work Location
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-row>
                <v-col class="mobile-detail-col">
                    <v-data-table
                        :headers="headers"
                        :items="workLocation"
                        :loading="loading"
                        class="v-outlined mobile-global-card-table"
                        :mobile-breakpoint=992
                        :sort-by="defaultSort"
                    >
                        <template v-slot:[`item.IsPubliclyAccessible`]="{ item }">
                            <span v-if="item.IsPubliclyAccessible == 1">Yes</span>
                            <span v-else>No</span>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "EmployerWorkStructureComponent",

        data() {
            return {
                loading: true,
                defaultSort: [{ key: 'WorkLocationName', order: 'asc' }],
                workLocation: [],
                headers: [
                    { title: 'Work Location Name', value: 'WorkLocationName', sortable: true },
                    { title: 'Type', value: 'WorkLocationType.WorkLocationTypeName', sortable: true },
                    { title: 'Code', value: 'WorkLocationCode', sortable: true },
                    { title: 'Area', value: 'WorkLocationArea', sortable: true },
                    { title: 'Publicly Accessible', value: 'IsPubliclyAccessible', sortable: true },
                    { title: 'Parent Work Location', value: 'ParentWorkLocation.WorkLocationName', sortable: true },
                ],
            }
        },
        props: {
            employerId: {
                type: String,
                required: true
            }
        },
        mounted() {

        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/employer/' + this.employerId + '?include=WorkLocation.WorkLocationType,WorkLocation.ParentWorkLocation';

                return axios.get(url)
                    .then(response => {
                        this.workLocation = response.data.data.WorkLocation;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            }
        }
    }
</script>

<style scoped>

</style>
