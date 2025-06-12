<template>
    <v-container>
        <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
        <v-card class="v-card--outlined v-sheet--tile px-6">
            <v-row>
                <v-col>
                    <h3 class="details-header">{{chapter.ChapterName}} - {{chapter.ChapterNumber}}</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="8">
                    <div class="data-container">
                        <div class="data-tag">Chapter Name:</div>
                        <span class="data-value" v-if="chapter.ChapterName">{{chapter.ChapterName}}</span>
                        <span class="data-value" v-else>N/A</span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="8">
                    <div class="data-container">
                        <div class="data-tag">Chapter Number:</div>
                        <span class="data-value" v-if="chapter.ChapterNumber">{{chapter.ChapterNumber}}</span>
                        <span class="data-value" v-else>N/A</span>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>

    export default {
        name: "ChapterDetailsComponent",

        props: {
            chapterId: {
                type: Number,
                required: false
            }
        },

        data: () => ({
            id: '',
            chapter: {},
            loading: false,
        }),
        mounted() {
            this.id = this.$route.params.id;
            this.getDataFromApi();
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/chapter/' + this.id + '?scope=global';

                return axios.get(url)
                    .then(response => {
                        this.chapter = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            openDetails() {
                this.$emit('open-details');
            },
        },
    }
</script>

<style scoped>

</style>
