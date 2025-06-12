<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Unit
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-data-table
                :headers="headers"
                :items="unit"
                class="v-outlined mobile-global-card-table"
                :mobile-breakpoint=992
            >
            </v-data-table>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "AffiliateUnitComponent",

        data() {
            return {
                unit: [],
                headers: [
                    {title: 'Unit Name', value: 'UnitName'},
                    {title: 'Agreement/Contract', value: 'LocalAgreementName'},
                    {title: 'Employer', value: 'EmployerName'},
                ],
            }
        },
        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },
        beforeMount() {
            if (this.$store.getters['user/selectedAffiliate'].hasChapters) {
                this.headers.push(
                    {text: 'Chapter', value: 'ChapterName'}
                );
            }
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/aggregate/affiliate/unit/' + this.affiliateId + '?scope=global';

                return axios.get(url)
                    .then(response => {
                        this.unit = response.data.data;
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
