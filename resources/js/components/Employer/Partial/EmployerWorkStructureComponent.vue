<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Work Structure
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-row>
                <v-col class="mobile-detail-col">
                    <v-data-table
                        :headers="headers"
                        :items="workStructure"
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
        name: "EmployerWorkStructureComponent",

        data() {
            return {
                totalEmployers: 0,
                defaultSort: [{ key: 'WorkStructureName', order: 'asc' }],
                workStructure: [],
                headers: [
                    { title: 'Work Structure Name', value: 'WorkStructureName', sortable: true },
                    { title: 'Type', value: 'WorkStructureType.WorkStructureTypeName', sortable: true },
                    { title: 'Code', value: 'WorkStructureCode', sortable: true },
                    { title: 'Parent Work Structure', value: 'ParentWorkStructure.WorkStructureName', sortable: true },
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
                let url = '/api/v2/employer/' + this.employerId + '?include=WorkStructure.WorkStructureType,WorkStructure.ParentWorkStructure';

                return axios.get(url)
                    .then(response => {
                        this.workStructure = response.data.data.WorkStructure;
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
