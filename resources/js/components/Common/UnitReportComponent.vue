<template>
        <v-layout>
            <v-row>
                <v-col cols="12">
                    <iframe :src="reportURL" frameborder="0" style="display: block;border: 50px;height: 100vh;width: 100vw;"></iframe>
                </v-col>
            </v-row>
        </v-layout>
</template>

<script>
    export default {
        name: "UnitReportComponent",

        components: {

        },

        data: () => ({
            reportURL: '',
        }),

        mounted() {
            this.getDataFromApi();
        },

        methods: {
            getDataFromApi() {
                return axios.get("api/sisense/reports?report=unit&scope=global")
                    .then(response => {
                        this.reportURL = response.data.reportURL;
                    })
                    .finally(() => {
                        this.loading = false
                    });

            }
        }
    }
</script>

<style scoped>

</style>
