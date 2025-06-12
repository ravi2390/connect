<template>
    <v-container fluid class="mobile-word-break">
        <h2>Chapters Within {{chapterAffiliate.AffiliateName}} - {{chapterAffiliate.AffiliateNumber}}</h2>
        <v-row>
            <v-col ref="tableContainer">
                <v-data-table-server
                    :headers="headers"
                    :items="chapters"
                    v-model:options="options"
                    :items-length="totalChapters"
                    :loading="loading"
                    style="min-width: 300px"
                    :mobile-breakpoint=992
                    v-bind:style="{ width: '100%' }"
                    class="elevation-1 mobile-global-card-table chapter-results-table"
                    @update:page="scrollToBeginningOfPage()"
                >
                    <template v-slot:top="{ pagination, options, updateOptions }">
                        <v-data-table-footer
                            :pagination="pagination"
                            :options="options"
                            @update:options="updateOptions"
                            items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
                    </template>
                    <template v-slot:loader>
                        <v-progress-linear
                            indeterminate
                            height="8"
                            color="#3f98c9"
                        ></v-progress-linear>
                    </template>
                    <template v-slot:[`item.ChapterName`]="{ item }">
                        <div>
                            <a :href="'/chapters/' + item.ChapterId">{{ item.ChapterName }}</a>
                        </div>
                    </template>
                </v-data-table-server>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import dataTablesMixin from "../../mixins/UI/dataTablesMixin";

    export default {
        name: "ChapterListComponent",

        mixins: [dataTablesMixin],

        data: () => ({
            id: 0,
            chapterAffiliate: {},
            tableWidth: 0,
            chapterId: false,
            chapterName: '',
            totalChapters: 0,
            chapters: [],
            loading: true,
            options: {
                sortBy: [{ key: 'ChapterName', order: 'asc' }]
            },
            headers: [
                { title: 'Chapter Name', value: 'ChapterName' },
            ]
        }),
        beforeMount() {
            if (this.$route.params.id) {
                this.id = parseInt(this.$route.params.id);
            }
            else {
                this.id = this.getAffiliateId();
            }
        },
        mounted() {
            this.tableWidth = this.$refs.tableContainer.clientWidth-50;
        },
        watch: {
            options: {
                handler() {
                    this.getAffiliateDataFromApi();
                    this.getDataFromApi();
                },
                deep: true,
                immediate: true,
            }
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                const {sortBy, page, itemsPerPage} = this.options;
                const sortDefault = sortBy[0] ?? { key: 'ChapterName', order: 'asc' };
                const sortByField = typeof sortDefault[0].key ?? 'ChapterName';
                const sortDirection = sortDefault.order === 'asc' ? '' : '-';
                let url = '/api/v2/chapter?page=' + page + '&per_page=' + itemsPerPage + '&sort=' + sortDirection + sortByField + '&ChapterName,ChapterNumber';
                let filter = '';
                filter += '&filter[IsStructural]=0';

                if (filter !== '') {
                    url += filter;
                }

                return axios.get(url)
                    .then(response => {
                        this.chapters = response.data.data;
                        this.totalChapters = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            getAffiliateId() {
                return this.$store.getters['user/selectedAffiliate'].AffiliateId;
            },
            getAffiliateDataFromApi() {
                this.loading = true;
                let url = '/api/v2/aggregate/affiliate/detail/' + this.id + '?scope=global';

                return axios.get(url)
                    .then(response => {
                        this.chapterAffiliate = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        }
    }
</script>

<style scoped>
    .fixed-table-header th {
        position: sticky;
        top: 0;
    }
</style>
