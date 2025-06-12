<template>
    <v-data-table
        :loading="loading"
        :headers="headers"
        :items="response.data"
        multi-sort
    ></v-data-table>
</template>

<script>
    export default {
        name: 'AffiliateListComponent',
        data: () => ({
            loading: false,
            response: {
                meta: {
                    headers: [],
                },
            },
            headers: [],
        }),
        mounted() {
            this.getDataFromApi();
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                axios.get('/admin/api/affiliate')
                    .then(response => {
                        this.response = response.data;
                        let headers = [];
                        for (const key in this.response.meta.headers) {
                            if (this.response.meta.headers.hasOwnProperty(key)) {
                                headers.push({text: key, value: key, visible: true});
                            }
                        }
                        this.headers = headers;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }
    }
</script>
