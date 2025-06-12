<template>
    <v-container fluid @keyup.enter="search">
        <v-card class="v-card--outlined v-sheet--tile mt-4 pa-4 mobile-search-container">
            <div class="filter-row">
            <v-row>
                <v-col cols="12" lg="4">
                    <h3>Search for Affiliates</h3>
                </v-col>
            </v-row>
            <v-row v-if="filters">
                <v-col>
                    <v-text-field variant="outlined" key="text-first-name" :label="filters[filterId['AffiliateName']].label" v-model="filters[filterId['AffiliateName']].value"/>
                </v-col>
                <v-col>
                    <v-text-field variant="outlined" key="text-first-name" :label="filters[filterId['AffiliateNumber']].label" v-model="filters[filterId['AffiliateNumber']].value"/>
                </v-col>
                <v-col>
                    <v-select
                        :label="filters[filterId['StateFedAssociation']].label"
                        v-model="filters[filterId['StateFedAssociation']].value"
                        :items="stateFeds"
                        item-value="AffiliateId"
                        item-title="AffiliateName"
                        variant="outlined"
                    />
                </v-col>
                <v-col>
                    <v-text-field variant="outlined" key="text-first-name" :label="filters[filterId['City']].label" v-model="filters[filterId['City']].value"/>
                </v-col>
                <v-col>
                    <StateTerritorySelectComponent v-model="filters[filterId['HomeState']].value" :label="filters[filterId['HomeState']].label" itemValue="StateTerritoryName"/>
                </v-col>
                <v-col class="d-flex justify-end ga-2">
                    <v-btn variant="elevated" color="primary" class="mb-4 btn-block" v-on:click="search">Search</v-btn>
                    <v-btn variant="elevated" color="default" class="mb-4 btn-block" v-on:click="clear">Clear</v-btn>
                </v-col>
            </v-row>
            </div>
            <v-row class="affiliates-search">
                <v-col>
                    <v-data-table-server
                        :headers="getHeaders(headers)"
                        :items="affiliates"
                        v-model:options="options"
                        :items-length="totalAffiliates"
                        :loading="loading"
                        class="elevation-1 mobile-affiliate-search"
                        no-data-text="No match found"
                        mobile-breakpoint=960
                        @update:page="scrollToBeginningOfPage()"
                    >
                        <template v-slot:loader>
                            <v-progress-linear
                                indeterminate
                                height="8"
                                color="#3f98c9"
                            ></v-progress-linear>
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

                        <template v-slot:[`item.AffiliateNumber`]="{ item }">
                            <AffiliateSwitchComponent
                                component-name="AffiliateDisplay"
                                param-name="id"
                                :param-value="item.AffiliateId"
                                :display-value="item.AffiliateNumber"
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

                        <template v-slot:[`item.ContactInformation`]="{ item }">
                            <span class="data-container" v-if="item && item.affiliatePhonesOrdered && item.affiliatePhonesOrdered.length > 0">
                                {{ item.affiliatePhonesOrdered[0].PhoneNumber }}
                            </span><br/>
                            <span class="data-container" v-if="item && item.affiliateEmailsOrdered && item.affiliateEmailsOrdered.length > 0">
                                {{ item.affiliateEmailsOrdered[0].Email }}
                            </span>
                        </template>

                        <template v-slot:[`item.President`]="{ item }">
                            <template
                                v-for="officer in item.affiliateOfficers"
                                :key="'affiliate-officer-president-'+officer.IndividualId"
                            >
                            <AffiliateSwitchComponent
                                v-if="officer.AffiliateOfficerRole && officer.AffiliateOfficerRole.OfficerRoleTitleId === 14"
                                component-name="IndividualDetails"
                                param-name="id"
                                :param-value="officer.IndividualId"
                                :display-value="displayIndividualFullName(officer.Individual)"
                                :affiliate-id="item.AffiliateId"
                                :affiliate-name="item.AffiliateName"
                                :affiliate-number="item.AffiliateNumber"
                            />
                            </template>
                        </template>

                        <template v-slot:[`item.SecretaryTreasurer`]="{ item }">
                            <template
                                v-for="officer in item.affiliateOfficers"
                                :key="'affiliate-officer-secretary-treasurer-'+officer.IndividualId"
                            >
                            <AffiliateSwitchComponent
                                v-if="officer.AffiliateOfficerRole && officer.AffiliateOfficerRole.OfficerRoleTitleId === 16"
                                component-name="IndividualDetails"
                                param-name="id"
                                :param-value="officer.IndividualId"
                                :display-value="displayIndividualFullName(officer.Individual)"
                                :affiliate-id="item.AffiliateId"
                                :affiliate-name="item.AffiliateName"
                                :affiliate-number="item.AffiliateNumber"
                            />
                            </template>
                        </template>

                        <template v-slot:[`item.Staff`]="{ item }">
                            <span
                                v-for="staff in item.affiliateStaff"
                                :key="'affiliate-staff-'+staff.AffiliateStaffId"
                            >
                                <AffiliateSwitchComponent
                                    v-if="staff.Individual && staff.TermEndDate === ''"
                                    component-name="IndividualDetails"
                                    param-name="id"
                                    :param-value="staff.Individual.IndividualId"
                                    :display-value="displayIndividualFullName(staff.Individual)"
                                    :affiliate-id="item.AffiliateId"
                                    :affiliate-name="item.AffiliateName"
                                    :affiliate-number="item.AffiliateNumber"
                                />
                            </span>
                        </template>
                    </v-data-table-server>
                    <chooser-component :columns="headers" :presets="presets" :selectedPreset="selectedPreset" @applied="onHeaderChangeApplied('affiliateSearch', $event)" @preset-load="loadConfiguration($event)"></chooser-component>
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
    import AffiliateSwitchComponent from "./AffiliateSwitchComponent";
    import emptySelectMixin from "../../mixins/UI/emptySelectMixin";
    import dataTablesMixin from "../../mixins/UI/dataTablesMixin";

    export default {
        name: "AffiliatesSearchComponent",
        mixins: [headersMixin, configurationMixin, paginationUrlMixin, emptySelectMixin, dataTablesMixin],
        components: {'chooser-component': ColumnChooserComponent, StateTerritorySelectComponent, AffiliateSwitchComponent},
        data: () => ({
            filters: null,
            filterId: {
                AffiliateName: 0,
                AffiliateNumber: 1,
                StateFedAssociation: 2,
                City: 3,
                HomeState: 4
            },
            headers: [],
            affiliates: [],
            totalAffiliates: 0,
            options: {
                sortBy: [],
                page: 1,
                itemsPerPage: 10,
            },
            loading: false,
            searched: false,
            stateFeds: []
        }),
        watch: {
            options: {
                handler() {
                    if (this.searched) {
                        this.search();
                    }
                },
                deep: true,
                immediate: true,
            }
        },
        methods: {
            getFilter(field) {
                return this.filters.filter((filter) => filter.name === field);
            },
            displayIndividualFullName(individual) {
                return individual.FirstName + ' ' + individual.LastName;
            },
            search() {
                this.loading = true;
                const { page, itemsPerPage } = this.options;
                let url = '/api/v2/aggregate/affiliate/search?scope=global&page=' + page + '&per_page=' + itemsPerPage;

                let filterUrl = '';
                this.filters.map((filter) => {
                    if (filter.value !== '') {
                        filterUrl += '&'+filter.name+'='+filter.value;
                    }
                });
                if (filterUrl !== '') {
                    url += filterUrl;
                }
                this.updateQueryParams(this.options, this.filters, this.headers);
                return axios.get(url)
                    .then(response => {
                        this.affiliates = response.data.data;
                        this.totalAffiliates = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                        this.searched = true;
                    });

            },
            clear() {
                this.filters.map((filter) => {
                    filter.value = '';
                });
                this.search();
            },
            loadConfiguration(key) {
                this.getConfiguration('affiliateSearch', key).then((response) => {
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
            },
            initConfiguration() {
                this.getConfiguration('affiliateSearch', '').then((response) => {
                    this.headers = this.parseHiddenColumn(response.data.fields);
                    this.configCommon(response);
                    this.search();
                });
            }
        },
        mounted() {
            this.initConfiguration();
            axios.get('/api/v2/affiliate?scope=global&sort=AffiliateName&filter[AffiliateTypeId]=2&per_page=100')
            .then(response => {
                this.stateFeds = this.addEmptyElement(response.data.data, 'AffiliateName', 'AffiliateId');
            });
        }
    }
</script>
