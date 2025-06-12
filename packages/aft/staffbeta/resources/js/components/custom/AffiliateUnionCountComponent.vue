<template>
    <div class="data-container">
        <div class="data-tag"></div>
        <v-list density="compact">
            <v-list-item v-for="(affiliate,index) in affiliates" :key="index">
                {{ affiliate.UnionRelationshipTypeName }} - {{ affiliate.UnionRelationship }}
            </v-list-item>
        </v-list>
    </div>
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
