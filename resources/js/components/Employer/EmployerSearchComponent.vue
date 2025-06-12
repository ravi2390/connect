<template>
    <v-container fluid @keyup.enter="search">
        <v-card class="v-card--outlined v-sheet--tile mt-4 pa-4 mobile-search-container">
            <div class="filter-row">
            <v-row>
                <v-col cols="12" lg="4">
                    <h3>Search for Employers</h3>
                </v-col>
            </v-row>
            <v-row v-if="filters">
                <v-col>
                    <v-text-field variant="underlined" key="text-first-name" :label="filters[filterId['EmployerName']].label" v-model="filters[filterId['EmployerName']].value"/>
                </v-col>
                <v-col>
                    <v-text-field variant="underlined" key="text-first-name" :label="filters[filterId['Chapter.Affiliate.AffiliateName']].label" v-model="filters[filterId['Chapter.Affiliate.AffiliateName']].value"/>
                </v-col>
                <v-col>
                    <v-text-field variant="underlined" key="text-first-name" :label="filters[filterId['Chapter.Affiliate.AffiliateNumber']].label" v-model="filters[filterId['Chapter.Affiliate.AffiliateNumber']].value"/>
                </v-col>
                <v-col>
                    <v-text-field variant="underlined" key="text-first-name" :label="filters[filterId['EmployerMainAddresses.City']].label" v-model="filters[filterId['EmployerMainAddresses.City']].value"/>
                </v-col>
                <v-col>
                    <StateTerritorySelectComponent
                        :label="filters[filterId['EmployerMainAddresses.StateTerritory.StateTerritoryName']].label"
                        item-value="StateTerritoryName"
                        item-text="StateTerritoryName"
                        v-model="filters[filterId['EmployerMainAddresses.StateTerritory.StateTerritoryName']].value"
                    />
                </v-col>
                <v-col class="d-flex justify-end ga-2">
                    <v-btn variant="elevated" color="primary" @click="search">Search</v-btn>
                    <v-btn variant="elevated" color="default" @click="clear">Clear</v-btn>
                </v-col>
                <v-col>
                </v-col>
            </v-row>
            </div>
            <v-row class="employers-search">
                <v-col>
                    <v-data-table-server
                        :headers="getHeaders(headers)"
                        :items="employers"
                        v-model:options="options"
                        :items-length="totalEmployers"
                        :loading="loading"
                        class="elevation-1 mobile-search-employers"
                        no-data-text="No match found"
                        :mobile-breakpoint=992
                        @update:page="scrollToBeginningOfPage()"
                    >
                        <template v-slot:top>
                            <div class="search-top-scroller">
                                <div class="inner-scroll"></div>
                            </div>
                        </template>
                        <template v-slot:loader>
                            <v-progress-linear
                                indeterminate
                                height="8"
                                color="#3f98c9"
                            ></v-progress-linear>
                        </template>
                        <template v-slot:[`item.EmployerName`]="{ item }">
                            <AffiliateSwitchComponent
                                v-if="item.Chapter && item.Chapter.Affiliate"
                                component-name="EmployerDetails"
                                param-name="id"
                                :param-value="item.EmployerId"
                                :display-value="item.EmployerName"
                                :affiliate-id="item.Chapter.Affiliate.AffiliateId"
                                :affiliate-name="item.Chapter.Affiliate.AffiliateName"
                                :affiliate-number="item.Chapter.Affiliate.AffiliateNumber"
                            />
                            <router-link v-else :to="{ name: 'EmployerDetails', params: { id: item.EmployerId }}">
                                {{ item.EmployerName }}
                            </router-link>
                        </template>

                        <template v-slot:[`item.Chapter.Affiliate.AffiliateName`]="{ item }">
                            <div v-if="item.Chapter && item.Chapter.Affiliate">
                                <AffiliateSwitchComponent
                                    component-name="AffiliateDisplay"
                                    param-name="id"
                                    :param-value="item.Chapter.Affiliate.AffiliateId"
                                    :display-value="item.Chapter.Affiliate.AffiliateName"
                                    :affiliate-id="item.Chapter.Affiliate.AffiliateId"
                                    :affiliate-name="item.Chapter.Affiliate.AffiliateName"
                                    :affiliate-number="item.Chapter.Affiliate.AffiliateNumber"
                                />
                            </div>
                        </template>

                        <template v-slot:[`item.Chapter.Affiliate.AffiliateNumber`]="{ item }">
                            <div v-if="item.Chapter && item.Chapter.Affiliate">
                                <AffiliateSwitchComponent
                                    component-name="AffiliateDisplay"
                                    param-name="id"
                                    :param-value="item.Chapter.Affiliate.AffiliateId"
                                    :display-value="item.Chapter.Affiliate.AffiliateNumber"
                                    :affiliate-id="item.Chapter.Affiliate.AffiliateId"
                                    :affiliate-name="item.Chapter.Affiliate.AffiliateName"
                                    :affiliate-number="item.Chapter.Affiliate.AffiliateNumber"
                                />
                            </div>
                        </template>

                        <template v-slot:[`item.EmployerCity`]="{ item }">
                            <span v-if="item.EmployerMainAddresses && item.EmployerMainAddresses.length > 0">
                                {{ item.EmployerMainAddresses[0].City }}
                            </span>
                        </template>

                        <template v-slot:[`item.EmployerState`]="{ item }">
                            <span v-if="item.EmployerMainAddresses && item.EmployerMainAddresses.length > 0 && item.EmployerMainAddresses[0].StateTerritory">
                                {{ item.EmployerMainAddresses[0].StateTerritory.StateTerritoryCode }}
                            </span>
                        </template>

                    </v-data-table-server>
                    <chooser-component :columns="headers" :presets="presets" :selectedPreset="selectedPreset"  @applied="onHeaderChangeApplied('employerSearch', $event)" @preset-load="loadConfiguration($event)"></chooser-component>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
    import headersMixin from "../../mixins/Grid/headersMixin";
    import configurationMixin from "../../mixins/UI/configurationMixin";
    import paginationUrlMixin from "../../mixins/Grid/paginationUrlMixin";
    import ColumnChooserComponent from "../Common/Grid/ColumnChooserComponent";
    import StateTerritorySelectComponent from "../Common/StateTerritorySelectComponent";
    import AffiliateSwitchComponent from "../Affiliate/AffiliateSwitchComponent";
    import dataTablesMixin from "../../mixins/UI/dataTablesMixin";

    export default {
        name: "EmployerSearchComponent.vue",
        mixins: [headersMixin, configurationMixin, paginationUrlMixin, dataTablesMixin],
        components: {StateTerritorySelectComponent, 'chooser-component': ColumnChooserComponent, AffiliateSwitchComponent},
        data: () => ({
            employers: [],
            totalEmployers: 0,
            loading: false,
            options:{
                sortBy: [{ key: 'EmployerId', order: 'asc' }],
                page: 1,
                itemsPerPage: 10,
            },
            headers: [],
            filters: null,
            filterId: {
                EmployerName: 0,
                'Chapter.Affiliate.AffiliateName': 1,
                'Chapter.Affiliate.AffiliateNumber': 2,
                'EmployerMainAddresses.City': 3,
                'EmployerMainAddresses.StateTerritory.StateTerritoryName': 4
            },
        }),
        watch: {
            options: {
                handler() {
                    if (this.filters) {
                        this.search();
                    }
                },
                deep: true,
            }
        },
        mounted() {
            this.initConfiguration();

            // const dataTable = document.querySelector('.v-data-table__wrapper');
            // const topScroll = document.querySelector('.search-top-scroller');
            //
            // $(dataTable).on('scroll', function (e) {
            //     $(topScroll).scrollLeft($(dataTable).scrollLeft());
            // });
        },
        methods: {
            loadConfiguration(key) {
                this.getConfiguration('employerSearch', key).then((response) => {
                    this.headers = response.data.fields;
                    this.configCommon(response);
                    this.updateQueryParams(this.options, this.filters, this.headers);
                });
            },
            configCommon(response) {
                this.filters = this.parseQueryParams(response.data.filters);
                this.setPresetData(response.data);
                this.filters.forEach((filter, index) => {
                    this.filterId[filter.name] = index;
                });
                this.search();
            },
            initConfiguration() {
                this.getConfiguration('employerSearch', '').then((response) => {
                    this.headers = this.parseHiddenColumn(response.data.fields);
                    this.configCommon(response);
                    this.search();
                });
            },
            clear() {
                if (this.filters) this.filters.map((filter) => {
                    filter.value = '';
                });
                this.search();
            },

            getFilter(field) {
                if (this.filters) {
                    return this.filters.filter((filter) => filter.name === field);
                }
                return null;
            },

            search() {
                this.loading = true;
                const { sortBy, page, itemsPerPage } = this.options;
                const sortDefault = sortBy[0] ?? { key: 'EmployerId', order: 'asc' };
                const sortByField = sortDefault.key ?? 'EmployerId';
                const sortDirection = sortDefault.order === 'asc' ? '' : '-';
                let url = '/api/v2/employer?scope=global&page=' + page + '&per_page=' + itemsPerPage + '&sort=' + sortDirection + sortByField +  '&include=EmployerMainAddresses,EmployerMainAddresses.StateTerritory,Chapter.Affiliate'; // EmployerPreferredAddresses

                let filterUrl = '';
                filterUrl += '&filter[Employer.IsStructural]=0';
                if (this.filters) this.filters.map((filter) => {
                    if (filter.value !== '') {
                        filterUrl += '&filter[' + filter.name+']='+filter.value;
                    }
                });
                if (filterUrl !== '') {
                    url += filterUrl;
                }

                if (this.filters) {
                    this.updateQueryParams(this.options, this.filters, this.headers);
                }

                return axios.get(url)
                    .then(response => {
                        this.employers = response.data.data;
                        this.totalEmployers = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        }
    }
</script>
