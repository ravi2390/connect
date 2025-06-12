<template>
    <v-container>
        <v-card class="v-card--outlined v-sheet--tile px-6">
            <v-row>
                <v-col>
                    <div class="data-container">
                        <div class="data-tag">Name:</div>
                        <div class="data-value">{{useraccount.name}}</div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Email:</div>
                        <div class="data-value">{{useraccount.email}}</div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Account created on:</div>
                        <div class="data-value">{{ $filters.formatDate(useraccount.CreatedAt) }}</div>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "MyAccountComponent",

        data() {
            return {
                "useraccount": {}
            }
        },

        mounted() {
            this.getDataFromApi();
        },
        methods: {
            getDataFromApi() {
                this.loading = true;

                return axios.get('/api/v2/user')
                    .then(response => {
                        this.useraccount = response.data.data;
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
