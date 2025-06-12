<template>
    <v-container fluid class="mobile-word-break">
        <h2>Units Within {{unitAffiliate.AffiliateName}} - {{unitAffiliate.AffiliateNumber}}</h2>
        <v-row>
            <v-col ref="tableContainer">
                <v-data-table-server
                    :headers="headers"
                    :items="units"
                    v-model:options="options"
                    :items-length="totalUnits"
                    :loading="loading"
                    :mobile-breakpoint=992
                    v-bind:style="{ width: '100%' }"
                    class="elevation-1 mobile-units-card-table units-results-table"
                    @update:page="scrollToBeginningOfPage()"
                >
                    <template v-slot:top>
                        <v-data-table-footer items-per-page-text="Rows per page"></v-data-table-footer>
                    </template>
                    <template v-slot:loader>
                        <v-progress-linear
                            indeterminate
                            height="8"
                            color="#3f98c9"
                        ></v-progress-linear>
                    </template>
                    <template v-slot:[`item.LocalAgreement.Employer.EmployerName`]="{ item }">
                        <router-link v-if="item.LocalAgreement && item.LocalAgreement.Employer" :to="{ name: 'EmployerDetails', params: { id: item.LocalAgreement.Employer.EmployerId }}">
                            {{ item.LocalAgreement.Employer.EmployerName}}
                        </router-link>
                    </template>

                    <template v-slot:[`item.LocalAgreement.Employer.Chapter.Affiliate.AffiliateNumber`]="{ item }">
                            <router-link v-if="item.LocalAgreement && item.LocalAgreement.Employer && item.LocalAgreement.Employer.Chapter && item.LocalAgreement.Employer.Chapter.Affiliate" :to="{ name: 'AffiliateDisplay', params: { id: item.LocalAgreement.Employer.Chapter.Affiliate.AffiliateId }}">
                                {{ item.LocalAgreement.Employer.Chapter.Affiliate.AffiliateNumber }}
                            </router-link>
                    </template>
                    <template v-slot:bottom>
                        <v-data-table-footer items-per-page-text="Rows per page"></v-data-table-footer>
                    </template>
                </v-data-table-server>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import dataTablesMixin from "../../mixins/UI/dataTablesMixin";

    export default {
        name: "UnitListComponent",
        mixins: [dataTablesMixin],

        data: () => ({
            id: 0,
            unitAffiliate: {},
            tableWidth: 0,
            unitId: false,
            uniteName: '',
            totalUnits: 0,
            units: [],
            loading: true,
            options: {
                sortBy: [{ key: 'UnitName', order: 'asc' }],
                page: '1',
                itemsPerPage: '10',
            },
            headers: [
                { title: 'Employer Name', value: 'LocalAgreement.Employer.EmployerName', sortable: true },
                { title: 'Unit Name', value: 'UnitName', sortable: true },
                { title: 'Division Name', value: 'Division.DivisionName', sortable: true },
                { title: 'Agreement/Contract', value: 'LocalAgreement.LocalAgreementName', sortable: true },
                { title: 'Affiliate Number', value: 'LocalAgreement.Employer.Chapter.Affiliate.AffiliateNumber', sortable: true },
            ]
        }),
        beforeMount() {
            if (this.$route.params.id) {
                this.id = parseInt(this.$route.params.id);
            }
            else {
                this.id = this.getAffiliateId();
            }
            if (this.$store.getters['user/selectedAffiliate'].hasChapters) {
                this.headers.push(
                    { title: 'Chapter', value: 'LocalAgreement.Employer.Chapter.ChapterName' }
                );
            }
        },
        mounted() {
            this.tableWidth = this.$refs.tableContainer.clientWidth-50;
            this.getAffiliateDataFromApi();
        },
        watch: {
            options: {
                handler() {
                    this.getDataFromApi();
                },
                deep: true,
                immediate: true,
            }
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                const { sortBy, page, itemsPerPage } = this.options;
                const sortDefault = sortBy[0] ?? 'UnitName';
                const sortByField = sortDefault.key ?? 'UnitName';
                const sortDirection = sortDefault.order === 'asc' ? '' : '-';
                let url = '/api/v2/unit?page=' + page + '&per_page=' + itemsPerPage + '&sort=' + sortDirection + sortByField + '&include=Division,LocalAgreement.Employer.Chapter.Affiliate';
                let filter = '';
                filter += '&filter[Unit.IsStructural]=0';

                if (filter !== '') {
                    url += filter;
                }
                return axios.get(url)
                    .then(response => {
                        this.units = response.data.data;
                        this.totalUnits = response.data.meta.total;
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
                        this.unitAffiliate = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            openCreateUnit() {
            },
            onEdit() {
            }
        }
    }
</script>

<style>
    /* TODO: full width table hack */
    html {
        overflow: auto;
    }

    .v-application--wrap {
        max-width: none;
    }

    .main-menu, .footer-block {
        max-width: 100vw;
    }

    .row {
        flex-wrap: nowrap;
    }

    .col-2 {
        max-width: 320px;
    }

    .col-9 {
        max-width: none;
    }
</style>
