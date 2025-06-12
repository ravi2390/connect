<template>
    <v-container>
        <v-card class="v-card--outlined v-sheet--tile mt-4">
            <individual-basic-data-component :individual="individual" :edit-mode="true"></individual-basic-data-component>
        </v-card>
    </v-container>
</template>

<script>
    import BasicDataComponent from "./Partial/Edit/BasicDataComponent";

    export default {
        name: "EditIndividualComponent",
        components: {
            'individual-basic-data-component': BasicDataComponent
        },

        data() {
            return {
                id: '',
                individual: {}
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.getDataFromApi();
        },
        methods: {
            getDataFromApi() {
                this.loading = true;

                return axios.get('/api/v2/individual/' + this.id)
                    .then(response => {
                        this.individual = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }
    }
</script>
