<template>
<div @keyup.enter="getDataFromApi">
    <div class="hidden-md-and-down" v-if="!isOnMobile">
    <v-container fluid>
        <v-row>
            <v-col>
                <h2 class="container-title">Affiliate Listing</h2>
            </v-col>
        </v-row>
        <v-row :class="collapsedFilterRowTheme" class="flex-sm-nowrap table-content-row">
            <v-col cols="12" lg="2" :class="collapsedFilterColTheme" class="table-content-row__left">
                <filter-component
                    :filters="filters"
                    :presets="presets"
                    :selectedPreset="selectedPreset"
                    v-on:change="updateFilter()"
                    v-on:clear="clearFilters()"
                    v-on:search="getDataFromApi()"
                    v-on:collapsedFilterChanged="shouldCollapseFilter"
                    @filter-chooser-applied="onFilterChangeApplied(filters,'affiliate', $event)"
                    @presets-load="loadConfiguration($event)"
                >
                </filter-component>
            </v-col>
            <v-col cols="10" ref="tableContainer" :class="[collapsedFilterPaddingColTheme, fixedHeaderTheme]" class="table-content-row__right">
                <div class="tableContainer__inner">
                <v-data-table-server
                    :headers="getHeaders(headers)"
                    :items="affiliates"
                    v-model:options="options"
                    v-model:sort-by="options.sortBy"
                    :items-length="totalAffiliates"
                    :loading="loading"
                    class="elevation-1 affiliate-results-table scrollable-table"
                    fixed-header
                    height="80dvh"
                    @update:page="scrollToBeginningOfPage()"
                >
                    <template #top>
                        <div class="d-flex flex-wrap align-md-center ga-8">
                            <v-data-table-footer items-per-page-text="$vuetify.dataTable.itemsPerPageText" />
                            <chooser-component
                                :columns="headers"
                                :presets="presets"
                                :selectedPreset="selectedPreset"
                                @applied="onHeaderChangeApplied('affiliate', $event)"
                                @preset-load="loadConfiguration($event)"
                            ></chooser-component>
                        </div>
                    </template>
                    <template #bottom>
                        <div class="d-flex flex-wrap align-md-center ga-8">
                            <v-data-table-footer items-per-page-text="$vuetify.dataTable.itemsPerPageText" />
                            <chooser-component :columns="headers" :presets="presets" :selectedPreset="selectedPreset" @applied="onHeaderChangeApplied('affiliate', $event)" @preset-load="loadConfiguration($event)"></chooser-component>
                        </div>
                    </template>
                    <template v-slot:loader>
                        <v-progress-linear
                            indeterminate
                            height="8"
                            color="#3f98c9"
                        />
                    </template>
                    <template v-slot:[`item.AffiliateName`]="{ item }">
                            <AffiliateSwitchComponent
                                component-name="AffiliateDisplay"
                                param-name="id"
                                :param-value="item.AffiliateId"
                                :display-value="item.AffiliateName"
                                :affiliate-id="item.AffiliateId"
                                :affiliate-name="item.AffiliateName"
                                :affiliate-number="item.AffiliateNumber"
                            />
                    </template>
                    <template v-slot:[`item.Address`]="{ item }">
                        <span class="data-container" v-if="item && item.affiliateAddressesOrdered && item.affiliateAddressesOrdered.length > 0">

                            {{ item.affiliateAddressesOrdered[0].AddressLine1 }},
                            {{ item.affiliateAddressesOrdered[0].City }},
                            {{ item.affiliateAddressesOrdered[0].StateTerritory ? item.affiliateAddressesOrdered[0].StateTerritory.StateTerritoryCode : '' }},
                            {{ item.affiliateAddressesOrdered[0].PostalCode }}

                        </span>
                    </template>
                    <template v-slot:[`item.Phone`]="{ item }">
                        <span class="data-container" v-if="item && item.affiliatePhonesOrdered && item.affiliatePhonesOrdered.length > 0">
                            {{ maskPhone(item.affiliatePhonesOrdered[0].PhoneNumber) }}
                        </span>
                    </template>
                    <template v-slot:[`item.Email`]="{ item }">
                        <span class="data-container" v-if="item && item.affiliateEmailsOrdered && item.affiliateEmailsOrdered.length > 0">
                            {{ item.affiliateEmailsOrdered[0].Email }}
                        </span>
                    </template>
                    <template v-slot:[`item.CharterDate`]="{ item }">
                    <span v-if="item.CharterDate">
                        {{ $filters.formatDate(item.CharterDate) }}
                    </span>
                    </template>
                </v-data-table-server>
                </div>
            </v-col>
        </v-row>
    </v-container>
    </div>
    <!-- MOBILE Breakpoint -->
    <div class="hidden-lg-and-up" v-if="isOnMobile">
            <filter-component
                :filters="filters"
                :presets="presets"
                :selectedPreset="selectedPreset"
                :mobileIndividualHeaders="getSortableHeaders(headers)"
                v-on:search="getDataFromApi()"
                v-on:change="updateFilter()"
                v-on:onShowSort="hideResults()"
                v-on:onHideSort="shouldHideResults = false"
                v-on:sort="mobileSort"
                v-on:onShowFilters="hideResults()"
                v-on:onHideFilters="shouldHideResults = false"
                v-if="!hasSelectedItem"
                @filter-chooser-applied="onFilterChangeApplied(filters,'affiliate', $event)"
                @presets-load="loadConfiguration($event)"
            >
            </filter-component>
                <v-toolbar dense flat class="hidden-lg-and-up mobile-has-selected-row" v-if="hasSelectedItem">
                    <v-spacer></v-spacer>
                <v-btn icon="mdi:mdi-close" v-on:click="hasSelectedItem = false" />
                </v-toolbar>
                <p v-if="shouldShowResultsAndSortingTypeText()" class="mobile-displaying-sort-p">Displaying {{totalAffiliates}} results.</p>
                <v-col ref="mobileAffiliateTableContainer" class="mobile-affiliate-table" v-if="!hasSelectedItem">
                <v-data-table-server
                    :items="affiliates"
                    v-model:options="options"
                    v-model:sort-by="options.sortBy"
                    :page="options.page"
                    :items-length="totalAffiliates"
                    :loading="loading"
                    hide-default-header
                    :mobile-breakpoint=992
                    class="elevation-1"
                    @click:row="displaySelectedRow"
                    v-if="!shouldHideResults"
                    items-per-page-text="Rows per page"
                >
                <template v-slot:item="{ item }">
                    <affiliate-table-row :item="item" @select="displaySelectedRow" />
                </template>
                </v-data-table-server>
            </v-col>
            <div v-if="hasSelectedItem">
                <affiliate-detail-drawer :affiliateId="selectedItem.AffiliateId" @close="hasSelectedItem = false" />
            </div>
        </div>
    </div>
</template>

<script>
    import FilterComponent from "../Common/Grid/FilterComponent";
    import ColumnChooserComponent from "../Common/Grid/ColumnChooserComponent";
    import headersMixin from "../../mixins/Grid/headersMixin";
    import configurationMixin from "../../mixins/UI/configurationMixin";
    import paginationUrlMixin from "../../mixins/Grid/paginationUrlMixin";
import AffiliateSwitchComponent from "./AffiliateSwitchComponent";
import mobileCheckMixin from "../../mixins/UI/mobileCheckMixin";
import AffiliateDetailComponent from "./Partial/AffiliateDetailComponent";
import AffiliateTableRow from "./Partial/AffiliateTableRow";
import AffiliateDetailDrawer from "./Partial/AffiliateDetailDrawer";
    import { maskPhoneNumber } from "../../helpers/index.js";

    export default {
        name: "AffiliateListComponent",

        mixins: [headersMixin, configurationMixin, paginationUrlMixin, mobileCheckMixin],

        components: {
            'filter-component': FilterComponent,
            'chooser-component': ColumnChooserComponent,AffiliateSwitchComponent,
            'affiliate-detail-component': AffiliateDetailComponent,
            'affiliate-table-row': AffiliateTableRow,
            'affiliate-detail-drawer': AffiliateDetailDrawer,
        },

        data: () => ({
            filters: [],
            affiliateId: false,
            affiliateName: '',
            totalAffiliates: 0,
            affiliates: [],
            loading: true,
            showLabel:true,
            options: {
                sortBy: [{ key: 'AffiliateNumber', order: 'asc' }],
                page: 1,
                itemsPerPage: 10,
            },
            headers: [],
            isShowingFilters: false,
            collapsedFilter: false,
            fixedHeaders: false,
            fixedWidth: 0,
            cellWidth: 100,
            hasSelectedItem: false,
            selectedItem: [],
            shouldHideResults: false,
        }),
        computed: {
            collapsedFilterRowTheme() {
                return this.collapsedFilter ? 'collapsed-filter-row' : 'row-inline-flex';
            },
            collapsedFilterColTheme() {
                return this.collapsedFilter ? 'collapsed-filter-col' : '';
            },
            collapsedFilterPaddingColTheme() {
                return this.collapsedFilter ? 'collapsed-table-col' : '';
            },
            fixedHeaderTheme() {
                return this.fixedHeaders ? 'fixed-table-header' : '';
            },
        },

        mounted() {
            this.initConfiguration();
            this.showLabel = false;
            const container = document.getElementById('main-container');
            if (!container) {
                console.warn('main-container element not found during mounted');
            }

            // const fullRow = document.querySelector('.v-data-table');
            // const dataTable = document.querySelector('.v-data-table__wrapper');
            // const windowWidth = $(window).width();
            // const windowHeight = $(window).height();
            // const $footer = $(".footer-block");
            // $(window).scroll(function(){
            //     if (windowWidth >= 960 && !fullRow.classList.contains("collapse-table")) {
            //         const footerTop = $footer.offset().top - $(window).scrollTop();
            //         const visibleHeight = Math.min(windowHeight, footerTop) - 331;
            //         dataTable.style.height = visibleHeight + 'px';
            //     }
            // });

            // const topScroller = document.querySelector('.top-scroller');
            // $(dataTable).on('scroll', function (e) {
            //     $(topScroller).scrollLeft($(dataTable).scrollLeft());
            // });
        },
        watch: {
            options: {
                handler() {
                    if (this.headers.length > 0 && !this.loading) {
                        this.getDataFromApi();
                    }
                },
                deep: true,
                immediate: true,
            },
        },
        methods: {
            loadConfiguration(key) {
                this.getConfiguration('affiliate', key).then((response) => {
                    this.headers = response.data.fields;
                    this.filters = this.parseQueryParams(response.data.filters);
                    this.setPresetData(response.data);
                    this.selectedPreset = response.data.selectedPreset;
                    this.updateFilter();
                    this.getDataFromApi();
                });
            },
            initConfiguration() {
                this.getConfiguration('affiliate', '').then((response) => {
                    this.headers = this.parseHiddenColumn(response.data.fields);
                    this.filters = this.parseQueryParams(response.data.filters);
                    this.setPresetData(response.data);
                    this.updateFilter();
                    this.selectedPreset = response.data.selectedPreset;
                    this.getDataFromApi();
                });
            },
            shouldCollapseFilter(val) {
                this.collapsedFilter = val;
            },
            shouldShowResultsAndSortingTypeText() {
                return !!(this.totalAffiliates && !this.hasSelectedItem && !this.shouldHideResults);
            },
            hideResults(){
                this.shouldHideResults = true;
            },
            mobileSort(sortBy) {
                this.shouldHideResults = false;
                this.options.sortBy = sortBy;
            },
            displaySelectedRow(value) {
                this.hasSelectedItem = true;
                this.selectedItem = value;
            },
            updateFilter() {
                for (const search of this.filters) {
                    if (search.type === 'autocomplete' && search.value === '') {
                        search.value = null;
                    }
                }
            },
            clearFilters() {
                this.updateQueryParams(this.options, this.filters, this.headers);
                this.getDataFromApi();
            },
            async getDataFromApi() {
                this.loading = true;
                const { sortBy, page, itemsPerPage } = this.options;
                const sortDefault = sortBy[0] ?? { key: '', order: 'asc' };
                let sortByField = sortDefault.key ?? '';
                const sortDirection = sortDefault.order === 'asc' ? '' : '-';
                let url = '/api/v2/affiliate?scope=global&page=' + page + '&per_page=' + itemsPerPage + '&sort=' + sortDirection + sortByField + '&include=affiliateAddressesOrdered,affiliateAddressesOrdered.StateTerritory,affiliatePhonesOrdered,affiliateEmailsOrdered,AffiliateType';

                let filter = '';
                for (const search of this.filters) {
                    if (search.value !== '' && search.value !== null) {
                        filter += '&filter[' + search.name + ']=' + search.value;
                    }
                }

                if (filter !== '') {
                    url += filter;
                }

                this.updateQueryParams(this.options, this.filters, this.headers);

                try {
                    const response = await axios.get(url);
                    this.affiliates = response.data.data;
                    this.totalAffiliates = response.data.meta.total;
                    if (this.affiliates.length === 0 && page > 0 && this.totalAffiliates > 0) {
                        this.options.page = 1;
                        await this.getDataFromApi();
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    this.loading = false;
                }
            },
            onDestroyComponent() {
                const container = document.getElementById('main-container');
                if (!container) {
                    console.warn('main-container element not found during teardown');
                }
            },
            maskPhone(phone) {
                return maskPhoneNumber(phone);
            },
        },
        unmounted () {
            this.onDestroyComponent();
        }
    }
</script>

<style scoped>
    .fixed-table-header th {
        position: sticky;
        top: 0;
    }
</style>
