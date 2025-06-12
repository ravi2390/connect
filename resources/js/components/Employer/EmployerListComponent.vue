<template>
<div>
    <div class="hidden-md-and-down">
    <v-container fluid>
        <h2>Employers for {{employerAffiliate.AffiliateName}} - {{employerAffiliate.AffiliateNumber}}</h2>
        <v-row>
            <v-col cols="12">
                <v-data-table-server
                    :headers="getHeaders(headers)"
                    :items="employers"
                    v-model:options="options"
                    :items-length="totalEmployers"
                    :loading="loading"
                    :items-per-page-options="getItemsPerPageOptions()"
                    class="v-outlined employer-results-table"
                >
                    <template v-slot:top>
                        <div class="d-flex flex-wrap align-md-center ga-8">
                            <v-data-table-footer items-per-page-text="Rows per page"></v-data-table-footer>
                            <chooser-component
                                :columns="headers"
                                :presets="presets"
                                :selectedPreset="selectedPreset"
                                @applied="onHeaderChangeApplied('employer', $event)"
                                @preset-load="loadConfiguration($event)"
                            ></chooser-component>
                        </div>
                    </template>
                    <template v-slot:bottom>
                        <div class="d-flex flex-wrap align-md-center ga-8">
                            <v-data-table-footer items-per-page-text="Rows per page"></v-data-table-footer>
                            <chooser-component
                                :columns="headers"
                                :presets="presets"
                                :selectedPreset="selectedPreset"
                                @applied="onHeaderChangeApplied('employer', $event)"
                                @preset-load="loadConfiguration($event)"
                            ></chooser-component>
                        </div>
                    </template>
                    <template v-slot:loading>
                        <v-progress-linear
                            indeterminate
                            height="8"
                            color="#3f98c9"
                        ></v-progress-linear>
                    </template>
                    <template v-slot:[`item.EmployerName`]="{ item }">
                        <div>
                            <a :href="'/employers/' + item.EmployerId">{{ item.EmployerName }}</a>
                        </div>
                    </template>
                    <template v-slot:[`item.EmployerType`]="{ item }">
                        <div v-if="item.EmployerType">
                            {{ item.EmployerType.EmployerTypeName }}
                        </div>
                    </template>
                    <template v-slot:[`item.EmployerMainPhones`]="{ item }">
                        <div v-if="item.EmployerMainPhones && item.EmployerMainPhones.length > 0">
                            {{ item.EmployerMainPhones[0].PhoneNumber }}
                        </div>
                    </template>
                    <template v-slot:[`item.ParentEmployer`]="{ item }">
                        <div v-if="item.ParentEmployer">
                            {{ item.ParentEmployer.EmployerName }}
                        </div>
                    </template>
                    <template v-slot:[`item.Chapter.Affiliate`]="{ item}">
                        <div v-if="item.Chapter && item.Chapter.Affiliate">
                            <router-link :to="{ name: 'AffiliateDisplay', params: { id: item.Chapter.Affiliate.AffiliateId }}">
                                {{ item.Chapter.Affiliate.AffiliateName }}
                            </router-link>
                        </div>
                    </template>
                    <template v-slot:[`item.EmployerMainEmails`]="{ item }">
                        <div v-if="item.EmployerMainEmails && item.EmployerMainEmails.length > 0">
                            {{ item.EmployerMainEmails[0].Email }}
                        </div>
                    </template>
                    <template v-slot:[`item.EmployerMainAddresses`]="{ item }">
                        <div v-if="item.EmployerMainAddresses && item.EmployerMainAddresses.length > 0">
                            {{ item.EmployerMainAddresses[0].AddressLine1 }} <span v-if="item.EmployerMainAddresses[0].AddressLine2">, {{ item.EmployerMainAddresses[0].AddressLine2 }}</span>
                            <div v-if="item.EmployerMainAddresses[0].StateTerritory">
                                {{ item.EmployerMainAddresses[0].City }}, {{ item.EmployerMainAddresses[0].StateTerritory.StateTerritoryCode }} {{ item.EmployerMainAddresses[0].PostalCode }}
                            </div>
                        </div>
                    </template>
                </v-data-table-server>
            </v-col>
        </v-row>
    </v-container>
    </div>
    <!-- MOBILE Breakpoint -->
    <div class="hidden-lg-and-up">
        <v-col v-if="!hasSelectedItem">

                <v-data-table-server
                    :headers="getHeaders(headers)"
                    :items="employers"
                    v-model:options="options"
                    :items-length="totalEmployers"
                    :loading="loading"
                    :mobile-breakpoint=1024
                    hide-default-header
                    class="elevation-1 mobile-word-break mobile-employer-table"
                    @click:row="displaySelectedRow"
                    :items-per-page-options="getItemsPerPageOptions()"
                >
                <template v-slot:item="row">
                <tr class="tr-mobile-individual">
                    <td class="v-data-table__mobile-row mobile-row-header td-mobile-padding custom-mobile-row">{{row.item.EmployerName}}</td>
                    <td class="v-data-table__mobile-row td-mobile-padding custom-mobile-row" v-if="row.item.EmployerMainAddresses && row.item.EmployerMainAddresses.length > 0">
                            {{row.item.EmployerMainAddresses[0].AddressLine1}} <span v-if="row.item.EmployerMainAddresses[0].AddressLine2">, {{row.item.EmployerMainAddresses[0].AddressLine2}}</span>
                            <div v-if="row.item.EmployerMainAddresses[0].StateTerritory">
                                {{row.item.EmployerMainAddresses[0].City}}, {{row.item.EmployerMainAddresses[0].StateTerritory.StateTerritoryCode}} {{row.item.EmployerMainAddresses[0].PostalCode}}
                            </div>
                        </td>
                    <td class="td-mobile-padding">
                        <v-btn size="small" icon="mdi:mdi-menu-down" @click="displaySelectedRow(row.item)"></v-btn>
                    </td>
                </tr>
                </template>
                </v-data-table-server>
            </v-col>
            <div v-if="hasSelectedItem">
                <v-toolbar density="compact" elevation="0" class="hidden-lg-and-up mobile-has-selected-row" v-if="hasSelectedItem">
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi:mdi-close" v-on:click="hasSelectedItem = false"></v-btn>
                </v-toolbar>
                <div class="mobile-selected-item-container">
                    <basic-data-component v-on:swipeToClose="hasSelectedItem = false" :employerId="selectedItem.EmployerId" :isExpandedMobileResults="true"></basic-data-component>
                </div>
            </div>
    </div>
</div>
</template>

<script>
    import { debounce } from "lodash-es";
    import headersMixin from "../../mixins/Grid/headersMixin";
    import ColumnChooserComponent from "../Common/Grid/ColumnChooserComponent";
    import configurationMixin from "../../mixins/UI/configurationMixin";
    import paginationUrlMixin from "../../mixins/Grid/paginationUrlMixin";
    import BasicDataComponent from "./EmployerDetailsComponent";

    export default {
        name: "EmployerListComponent",
        mixins: [headersMixin, configurationMixin, paginationUrlMixin],
        components: {
            'chooser-component': ColumnChooserComponent,
            'basic-data-component': BasicDataComponent
        },
        data: () => ({
            employerAffiliate: {},
            employerId: false,
            employerName: '',
            totalEmployers: 0,
            employers: [],
            loading: true,
            showLabel:true,
            options: {
                sortBy: [{ key: 'EmployerName', order: 'asc' }],
                page: 1,
                itemsPerPage: 10,
            },
            filters: [],
            headers: [],
            hasSelectedItem: false,
            selectedItem: []
        }),
        created() {
            this.debounceInput = debounce(function (search, propertyName) {
                this.filters[propertyName].value = search;
                this.getDataFromApi();
            }, 500);
        },
        beforeMount() {
            if (this.$route.params.id) {
                this.id = parseInt(this.$route.params.id);
            }
            else {
                this.id = this.getAffiliateId();
            }
        },
        mounted() {
            this.initConfiguration();
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
            loadConfiguration(key) {
                this.getConfiguration('employer', key).then((response) => {
                    this.headers = this.parseHiddenColumn(response.data.fields);
                    this.filters = this.parseQueryParams(response.data.filters);
                    this.setPresetData(response.data);
                    this.showLabel = false;
                });
            },
            initConfiguration() {
                this.getConfiguration('employer', '').then((response) => {
                    this.headers = this.parseHiddenColumn(response.data.fields);
                    this.filters = this.parseQueryParams(response.data.filters);
                    this.setPresetData(response.data);
                    this.showLabel = false;
                });
            },
            displaySelectedRow(value) {
                this.hasSelectedItem = true;
                this.selectedItem = value;
            },
            async getDataFromApi() {
                this.loading = true;
                const {sortBy, page, itemsPerPage} = this.options;
                const sortDefault = sortBy[0] ?? { key: 'EmployerName', order: 'asc' };
                let sortByField = sortDefault.key ?? 'EmployerName';
                const sortDirection = sortDefault.order === 'asc' ? '' : '-';
                let url = '/api/v2/employer?page=' + page + '&per_page=' + itemsPerPage + '&sort=' + sortDirection + sortByField + '&include=EmployerType,EmployerMainPhones,EmployerMainEmails,ParentEmployer,EmployerMainAddresses.StateTerritory,Chapter.Affiliate';
                let filter = '';
                filter += '&filter[Employer.IsStructural]=0';

                if (filter !== '') {
                    url += filter;
                }
                this.updateQueryParams(this.options, this.filters, this.headers);

                try {
                    const response = await axios.get(url);
                    this.employers = response.data.data;
                    this.totalEmployers = response.data.meta.total;
                } catch (error) {
                    console.error(error);
                } finally {
                    this.loading = false;
                }
            },
            getAffiliateId() {
                return this.$store.getters['user/selectedAffiliate'].AffiliateId;
            },
            async getAffiliateDataFromApi() {
                this.loading = true;
                const id = this.id ?? this.getAffiliateId();
                let url = '/api/v2/aggregate/affiliate/detail/' + id + '?scope=global';
                try {
                    const response = await axios.get(url);
                    this.employerAffiliate = response.data.data;
                } catch (error) {
                    console.error(error);
                } finally {
                    this.loading = false;
                }
            },
        }
    }
</script>
