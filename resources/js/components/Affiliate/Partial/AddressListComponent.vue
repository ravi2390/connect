<template>
    <v-container>
        <v-data-table-server
            :headers="headers"
            :items="addresses"
            :items-length="totalAddresses"
            :loading="loading"
            class="v-outlined"
        >
        </v-data-table-server>
    </v-container>
</template>

<script>
    export default {
        name: "AddressListComponent",

        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },

        data: () => ({
            totalAddresses: 0,
            addresses: [],
            loading: true,
            headers: [
                {
                    text: 'ID',
                    value: 'AddressId',
                    align: 'left',
                    sortable: false
                },
                {text: 'AddressLine1', value: 'AddressLine1'},
                {text: 'AddressLine2', value: 'AddressLine2'},
                {text: 'City', value: 'City'},
                {text: 'PostalCode', value: 'PostalCode'}
            ]
        }),
        mounted() {
            this.getDataFromApi();
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/affiliate/' + this.affiliateId + '?with=addresses';

                return axios.get(url)
                    .then(response => {
                        this.addresses = response.data.addresses;
                        this.totalAddresses = response.data.addresses.length;
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
