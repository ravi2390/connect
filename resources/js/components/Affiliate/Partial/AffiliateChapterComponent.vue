<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Chapter
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-progress-linear :active="loading" indeterminate></v-progress-linear>
            <div class="data-container">
                <div class="greyed-out" v-if="!hasNonStructuralChapters()">No data available</div>
                <div class="dues"
                     v-for="(chapter) in structuralChapters(affiliate.chapter)"
                    :key="chapter.ChapterId"
                >
                    <div class="data-tag">Chapter Name:</div>
                    {{ chapter.ChapterName }}
                    <br>
                    <div class="data-tag">Chapter Number:</div>
                    {{ chapter.ChapterNumber}}
                    <br>
                </div>
            </div>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "AffiliateChapterComponent",

        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },

          data: () => ({

            id: '',
            affiliate: {},
            loading: false,

        }),

        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },

            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/affiliate/' + this.affiliateId + '?scope=global&include=chapter';

                return axios.get(url)
                    .then(response => {
                        this.affiliate = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                });
            },

            hasNonStructuralChapters(){
                if(this.affiliate.chapter == null)
                    return false;
                else
                    return  this.affiliate.chapter.filter(ch => !ch.IsStructural).length > 0 ? true : false;
            },
            structuralChapters(chapters) {
                return chapters.filter((chapter) => chapter.IsStructural);
            }
        }
    }
</script>

<style scoped>

</style>
