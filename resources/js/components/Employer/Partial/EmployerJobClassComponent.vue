<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Job Class
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-row>
                <v-col class="mobile-detail-col">
                    <v-data-table
                        :headers="headers"
                        :items="jobTitle"
                        class="v-outlined mobile-global-card-table"
                        :mobile-breakpoint=992
                        :sort-by="defaultSort"
                    >
                    </v-data-table>
                </v-col>
            </v-row>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "EmployerJobClassComponent",

        data() {
            return {
                jobTitle: [],
                defaultSort: [{ key: 'LocalJobClassName', order: 'asc' }],
                headers: [
                    { title: 'Local Job Class', value: 'LocalJobClassName', sortable: true },
                    { title: 'National Job Classification', value: 'NationalJobClassName', sortable: true },
                    { title: 'National Job Classification Code', value: 'NationalJobClassCode', sortable: true },
                    { title: 'Unit Name', value: 'UnitName', sortable: true },
                    { title: 'Job Title Count', value: 'NumberOfJobTitles', sortable: true },
                ],
            }
        },
        props: {
            employerId: {
                type: String,
                required: true
            }
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/aggregate/employer/localjobclass/' + this.employerId;

                return axios.get(url)
                    .then(response => {
                        this.jobTitle = response.data.data;
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
