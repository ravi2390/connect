<template>
    <v-card>
        <v-card-title>Counts of Individuals by Union Relationship</v-card-title>
        <v-card-text>
            <div class="data-container">
                <div class="counts" v-for="(affiliate,index) in affiliates" :key="index">
                    {{ affiliate.UnionRelationshipTypeName }} - {{ affiliate.UnionRelationship }}
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "AffiliateUnionCountComponent",

        props: {
            affiliateId: {
                required: true
            }
        },
        data: () => ({
            affiliates: [],
        }),
        mounted() {
            this.getDataFromApi();
        },

        methods: {

            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/aggregate/affiliate/unioncount/' + this.affiliateId + '?scope=global';

                return axios.get(url)
                    .then(response => {
                        this.affiliates = response.data.data;
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
