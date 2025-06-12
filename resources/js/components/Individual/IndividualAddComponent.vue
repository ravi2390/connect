<template>
    <v-container fluid @keyup.enter="getDataFromApi">
        <v-card :key="componentUpdateKey" class="mb-4">
            <v-card-title>{{ global ? 'Global Individual Search' : 'Add an Individual - Search'}}</v-card-title>
            <v-card-text>
                <v-row v-if="global && filters">
                    <v-col>
                        <v-text-field variant="underlined" key="text-member-id" label="Member Id" v-model="filters[filterId['memberId']].value"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field variant="underlined" key="text-affiliate-name" label="Affiliate Name" v-model="filters[filterId['affiliateName']].value"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field variant="underlined" key="text-affiliate-number" label="Affiliate Number" v-model="filters[filterId['affiliateNumber']].value"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field variant="underlined" key="text-home-city" label="Phone Number" v-model="filters[filterId['phoneNumber']].value"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field variant="underlined" key="text-home-state" label="Home City" v-model="filters[filterId['homeCity']].value"></v-text-field>
                    </v-col>
                    <v-col>
                        <StateTerritorySelectComponent
                            item-value="StateTerritoryName"
                            item-text="StateTerritoryName"
                            label="Home State"
                            v-model="filters[filterId['homeState']].value"
                            :rules="[rules.required]"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field variant="underlined" key="text-zip-code" label="Zip Code" v-model="filters[filterId['zipCode']].value"></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="filters">
                    <v-col>
                        <v-text-field variant="underlined" key="text-first-name" label="First Name" v-model="filters[filterId['firstName']].value"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field variant="underlined"  key="text-middle-name" label="Middle Name" v-model="filters[filterId['middleName']].value"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field variant="underlined"  key="text-last-name" label="Last Name" v-model="filters[filterId['lastName']].value"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field variant="underlined"  key="text-preferred-name" label="Preferred Name" v-model="filters[filterId['preferredName']].value"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field variant="underlined"  key="text-preferred-name" label="Original Last Name" v-model="filters[filterId['previousName']].value"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field variant="underlined"  key="text-email" label="Email" v-model="filters[filterId['email']].value"></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="filters">
                    <v-col class="d-flex justify-end ga-2">
                        <v-btn color="primary" variant="elevated" v-on:click="searchIndividual">Search</v-btn>
                        <v-btn color="default" variant="elevated" v-on:click="clear">Clear</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions v-if="!global">
                <v-btn v-if="searched" color="primary" variant="elevated" class="px-12" @click="clickNewRecord">Add New Record</v-btn>
                <p v-if="searched && totalIndividuals===0" class="lead">No match found.</p>
            </v-card-actions>
        </v-card>
        <v-data-table-server
            :headers="getHeaders(headers)"
            :items="individuals"
            v-model:options="options"
            :items-length="totalIndividuals"
            :loading="loading"
            :mobile-breakpoint=992
            class="elevation-1 mobile-individual-search"
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
                />
            </template>

            <template v-slot:[`item.FullName`]="{ item }">
                <AffiliateSwitchComponent
                    v-if="getAffiliate(item)"
                    component-name="IndividualDetails"
                    param-name="id"
                    :param-value="item.IndividualId"
                    :display-value="getIndividualName(item)"
                    :affiliate-id="getAffiliate(item).AffiliateId"
                    :affiliate-name="getAffiliate(item).AffiliateName"
                    :affiliate-number="getAffiliate(item).AffiliateNumber"
                />
                <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                    {{ item.FirstName }} <span v-if="item.MiddleName != 'Null'">{{ item.MiddleName }}</span> {{ item.LastName }}
                </router-link>
            </template>
            <template v-slot:[`item.PreferredName`]="{ item }">
                <AffiliateSwitchComponent
                    v-if="getAffiliate(item)"
                    component-name="IndividualDetails"
                    param-name="id"
                    :param-value="item.IndividualId"
                    :display-value="item.PreferredName"
                    :affiliate-id="getAffiliate(item).AffiliateId"
                    :affiliate-name="getAffiliate(item).AffiliateName"
                    :affiliate-number="getAffiliate(item).AffiliateNumber"
                />
                <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                    {{ item.PreferredName }}
                </router-link>
            </template>
            <template v-slot:[`item.PreviousName`]="{ item }">
                <AffiliateSwitchComponent
                    v-if="getAffiliate(item)"
                    component-name="IndividualDetails"
                    param-name="id"
                    :param-value="item.IndividualId"
                    :display-value="item.PreviousName"
                    :affiliate-id="getAffiliate(item).AffiliateId"
                    :affiliate-name="getAffiliate(item).AffiliateName"
                    :affiliate-number="getAffiliate(item).AffiliateNumber"
                />
                <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                    {{ item.PreviousName }}
                </router-link>
            </template>
            <template v-slot:[`item.FirstName`]="{ item }">
                <AffiliateSwitchComponent
                    v-if="getAffiliate(item)"
                    component-name="IndividualDetails"
                    param-name="id"
                    :param-value="item.IndividualId"
                    :display-value="item.FirstName"
                    :affiliate-id="getAffiliate(item).AffiliateId"
                    :affiliate-name="getAffiliate(item).AffiliateName"
                    :affiliate-number="getAffiliate(item).AffiliateNumber"
                />
                <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                    {{ item.FirstName }}
                </router-link>
            </template>
            <template v-slot:[`item.MiddleName`]="{ item }">
                    <span v-if="item.MiddleName != 'Null'">
                    <AffiliateSwitchComponent
                        v-if="getAffiliate(item)"
                        component-name="IndividualDetails"
                        param-name="id"
                        :param-value="item.IndividualId"
                        :display-value="item.MiddleName"
                        :affiliate-id="getAffiliate(item).AffiliateId"
                        :affiliate-name="getAffiliate(item).AffiliateName"
                        :affiliate-number="getAffiliate(item).AffiliateNumber"
                    />
                    <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                        {{ item.MiddleName }}
                    </router-link>
                    </span>
            </template>

            <template v-slot:[`item.LastName`]="{ item }">
                <AffiliateSwitchComponent
                    v-if="getAffiliate(item)"
                    component-name="IndividualDetails"
                    param-name="id"
                    :param-value="item.IndividualId"
                    :display-value="item.LastName"
                    :affiliate-id="getAffiliate(item).AffiliateId"
                    :affiliate-name="getAffiliate(item).AffiliateName"
                    :affiliate-number="getAffiliate(item).AffiliateNumber"
                />
                <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                    {{ item.LastName }}
                </router-link>
            </template>

            <template v-slot:[`item.individualMembers`]="{ item }">
                <template v-for="member in item.individualMembers" :key="member.MemberIdMappingId">
                    <span v-bind="member">{{ member.MemberId }}</span>
                </template>
            </template>

            <template v-slot:[`item.individualEmails`]="{ item }">
                <template
                    v-for="email in firstEmail(item.individualEmailsOrdered)"
                    :key="email.IndividualEmailId"
                >
                    <span
                        v-bind="email"
                        v-bind:class="item.activeIndividualAffiliates.length === 0 ? 'greyed-out':''"
                    >
                        {{ email.Email }}
                    </span>
                </template>
            </template>
            <template v-slot:[`item.individualAddresses`]="{ item }">
                <template
                    v-for="address in firstAddress(item.individualAddressesOrdered,'Home')"
                    :key="address.IndividualAddressId"
                >
                    <span
                        v-bind="address"
                        v-bind:class="item.activeIndividualAffiliates.length === 0 ? 'greyed-out':''"
                    >
                        {{ address.AddressLine1 }} <br/>
                        <span v-if="address.AddressLine2">{{ address.AddressLine2 }} <br/></span>
                        {{ address.City }} <span v-if="address.StateTerritory">{{ address.StateTerritory.StateTerritoryCode }}</span> {{ address.PostalCode }}
                    </span>
                </template>
            </template>

            <template v-slot:[`item.individualPhones`]="{ item }">
                <span v-for="phone in firstPhone(item.individualPhonesOrdered,'Mobile')"
                      v-bind="phone"
                      :key="phone.IndividualPhoneId"
                      v-bind:class="item.activeIndividualAffiliates.length === 0 ? 'greyed-out':''"
                >
                    {{ phone.fullPhone }}
                </span>
            </template>
            <template v-slot:[`item.individualPhonesHome`]="{ item }">
                <span v-for="phone in firstPhone(item.individualPhonesOrdered, 'Home')"
                      v-bind="phone"
                      :key="phone.IndividualPhoneId"
                      v-bind:class="item.activeIndividualAffiliates.length === 0 ? 'greyed-out':''"
                >
                    {{ phone.fullPhone }}
                </span>
            </template>

            <template v-slot:[`item.AffiliateName`]="{ item }">
                <v-container v-if="item.activeIndividualAffiliates.length > 0">
                    <div v-for="affiliate in item.activeIndividualAffiliates"
                         v-bind="affiliate"
                         :key="affiliate.IndividualAffiliateId+'-name'"
                    >
                        <AffiliateSwitchComponent
                            v-if="affiliate.Affiliate"
                            component-name="AffiliateDisplay"
                            param-name="id"
                            :param-value="affiliate.Affiliate.AffiliateId"
                            :display-value="affiliate.Affiliate.AffiliateName"
                            :affiliate-id="affiliate.Affiliate.AffiliateId"
                            :affiliate-name="affiliate.Affiliate.AffiliateName"
                            :affiliate-number="affiliate.Affiliate.AffiliateNumber"
                        />
                    </div>
                </v-container>
                <v-container v-else-if="item.activeIndividualAffiliates.length === 0 && item.lastDeactivatedIndividualAffiliate.length > 0">
                    <div v-for="affiliate in item.lastDeactivatedIndividualAffiliate"
                         v-bind="affiliate"
                         :key="affiliate.IndividualAffiliateId+'-name'"
                    >
                        <AffiliateSwitchComponent
                            component-name="AffiliateDisplay"
                            param-name="id"
                            v-if="affiliate.Affiliate"
                            :param-value="affiliate.Affiliate.AffiliateId"
                            :display-value="affiliate.Affiliate.AffiliateName"
                            :affiliate-id="affiliate.Affiliate.AffiliateId"
                            :affiliate-name="affiliate.Affiliate.AffiliateName"
                            :affiliate-number="affiliate.Affiliate.AffiliateNumber"
                        />
                    </div>
                </v-container>
            </template>
            <template v-slot:[`item.AffiliateNumber`]="{ item }">
                <v-container v-if="item.activeIndividualAffiliates.length > 0">
                        <span v-for="affiliate in item.activeIndividualAffiliates"
                              v-bind="affiliate"
                              :key="affiliate.IndividualAffiliateId+'-id'"
                        >
                            <AffiliateSwitchComponent
                                component-name="AffiliateDisplay"
                                param-name="id"
                                v-if="affiliate.Affiliate"
                                :param-value="affiliate.Affiliate.AffiliateId"
                                :display-value="affiliate.Affiliate.AffiliateNumber"
                                :affiliate-id="affiliate.Affiliate.AffiliateId"
                                :affiliate-name="affiliate.Affiliate.AffiliateName"
                                :affiliate-number="affiliate.Affiliate.AffiliateNumber"
                            />
                        </span>
                </v-container>
                <v-container v-else-if="item.activeIndividualAffiliates.length === 0 && item.lastDeactivatedIndividualAffiliate.length > 0">
                        <span v-for="affiliate in item.lastDeactivatedIndividualAffiliate"
                              v-bind="affiliate"
                              :key="affiliate.IndividualAffiliateId+'-id'"
                        >
                            <AffiliateSwitchComponent
                                component-name="AffiliateDisplay"
                                param-name="id"
                                v-if="affiliate.Affiliate"
                                :param-value="affiliate.Affiliate.AffiliateId"
                                :display-value="affiliate.Affiliate.AffiliateNumber"
                                :affiliate-id="affiliate.Affiliate.AffiliateId"
                                :affiliate-name="affiliate.Affiliate.AffiliateName"
                                :affiliate-number="affiliate.Affiliate.AffiliateNumber"
                            />
                        </span>
                </v-container>
            </template>

            <template v-slot:[`item.LocalDuesCategory`]="{ item }">
                <v-container v-if="item.activeIndividualAffiliates.length > 0">
                    <template
                        v-for="affiliate in item.activeIndividualAffiliates"
                        :key="affiliate.IndividualAffiliateId"
                    >
                        <span
                            v-bind="affiliate"
                            v-if="affiliate.LocalDuesCategory"
                        >
                            {{ affiliate.LocalDuesCategory.LocalDuesCategoryName }}
                        </span>
                    </template>
                </v-container>
                <v-container v-else-if="item.activeIndividualAffiliates.length === 0 && item.lastDeactivatedIndividualAffiliate.length > 0">
                    <template
                        v-for="affiliate in item.lastDeactivatedIndividualAffiliate"
                        :key="affiliate.IndividualAffiliateId"
                    >
                        <span
                            v-bind="affiliate"
                            v-if="affiliate.LocalDuesCategory"
                            class="greyed-out"
                        >
                            {{ affiliate.LocalDuesCategory.LocalDuesCategoryName }}
                        </span>
                    </template>
                </v-container>
            </template>
            <template v-slot:[`item.UnionRelationshipType`]="{ item }">
                <v-container v-if="item.activeIndividualAffiliates.length > 0">
                    <template
                        v-for="affiliate in item.activeIndividualAffiliates"
                        :key="affiliate.IndividualAffiliateId"
                    >
                        <span
                            v-bind="affiliate"
                            v-if="affiliate.UnionRelationshipType"
                        >
                            {{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                        </span>
                    </template>
                </v-container>
                <v-container v-else-if="item.activeIndividualAffiliates.length === 0 && item.lastDeactivatedIndividualAffiliate.length > 0">
                    <template
                        v-for="affiliate in item.lastDeactivatedIndividualAffiliate"
                        :key="affiliate.IndividualAffiliateId"
                    >
                        <span
                            v-bind="affiliate"
                            v-if="affiliate.UnionRelationshipType"
                            class="greyed-out"
                        >
                            {{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                        </span>
                    </template>
                </v-container>
                <v-container v-else>
                    <span class="greyed-out">No relationship</span>
                </v-container>
            </template>
            <template v-slot:[`item.EmployerName`]="{ item }">
                <span v-for="(employer, index) in item.activeIndividualEmployers"
                      v-bind="employer"
                      :key="employer.IndividualEmployerId"
                >
                    <span v-if="index>0">, </span>
                    <AffiliateSwitchComponent
                        v-if="employer.Employer && getAffiliate(item)"
                        component-name="EmployerDetails"
                        param-name="id"
                        :param-value="employer.Employer.EmployerId"
                        :display-value="employer.Employer.EmployerName"
                        :affiliate-id="getAffiliate(item).AffiliateId"
                        :affiliate-name="getAffiliate(item).AffiliateName"
                        :affiliate-number="getAffiliate(item).AffiliateNumber"
                    />
                    <router-link v-else-if="employer.Employer" :to="{ name: 'EmployerDetails', params: { id: employer.Employer.EmployerId }}">
                        {{ employer.Employer.EmployerName }}
                    </router-link>
                </span>
            </template>
        </v-data-table-server>
        <chooser-component v-if="global" :columns="headers" :presets="presets" :selectedPreset="selectedPreset" @applied="onHeaderChangeApplied('individualSearch', $event)" @preset-load="loadConfiguration($event)"></chooser-component>
    </v-container>
</template>

<script>
    import headersMixin from "../../mixins/Grid/headersMixin";
import paginationUrlMixin from "../../mixins/Grid/paginationUrlMixin";
import configurationMixin from "../../mixins/UI/configurationMixin";
import dataTablesMixin from "../../mixins/UI/dataTablesMixin";
import AffiliateSwitchComponent from "../Affiliate/AffiliateSwitchComponent";
import ColumnChooserComponent from "../Common/Grid/ColumnChooserComponent";
import StateTerritorySelectComponent from "../Common/StateTerritorySelectComponent";

    export default {
        name: "IndividualAddComponent",
        mixins: [headersMixin, configurationMixin, paginationUrlMixin, dataTablesMixin],
        components: {StateTerritorySelectComponent, 'chooser-component': ColumnChooserComponent, AffiliateSwitchComponent},
        props: {
            global: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            filters: null,
            filterId: {
                firstName: 0,
                lastName: 1,
                email: 2,
                memberId: 3,
                affiliateName: 4,
                affiliateNumber: 5,
                phoneNumber: 6,
                homeCity: 7,
                homeState: 8,
                preferredName: 9,
                middleName: 10,
                previousName: 11,
                zipCode: 12
            },
            componentUpdateKey: 0,
            totalIndividuals: 0,
            individuals: [],
            loading: false,
            searched: false,
            options: {
                sortBy: [{ key: 'IndividualId', order: 'asc' }],
                page: 1,
                itemsPerPage: 10,
            },
            headers: [],
            rules: {
                required: false
            }
        }),
        watch: {
            options: {
                handler() {
                    if (this.searched) {
                        this.getDataFromApi();
                    }
                },
                deep: true,
                immediate: true,
            }
        },
        mounted() {
            if (this.global) {
                this.initConfiguration();
            } else {
                this.headers = [
                    { title: 'First Name', value: 'FirstName', visible: true, sortable: false },
                    { title: 'Middle Name', value: 'MiddleName', visible: true, sortable: false },
                    { title: 'Last Name', value: 'LastName', visible: true, sortable: false },
                    { title: 'Preferred Name', value: 'PreferredName', visible: true, sortable: false },
                    { title: 'Original Last Name', value: 'PreviousName', visible: true, sortable: false },
                    { title: 'Union Relationships', value: 'individualAffiliates.UnionRelationshipType', visible: true, sortable: false },
                    { title: 'Local Dues Category', value: 'individualAffiliates.LocalDuesCategory', visible: true, sortable: false },
                    { title: 'Member ID', value: 'individualMembers', visible: true, sortable: false },
                    { title: 'Affiliate Name', value: 'individualAffiliates.Affiliate.AffiliateName', visible: true, sortable: false },
                    { title: 'Affiliate Number', value: 'individualAffiliatesAffiliate.AffiliateNumber', visible: true, sortable: false },
                    { title: 'Home Phone', value: 'individualPhonesHome', visible: true, sortable: false },
                    { title: 'Mobile Phone', value: 'individualPhones', visible: true, sortable: false },
                    { title: 'Email', value: 'individualEmails', visible: true, sortable: false },
                    { title: 'Home Address', value: 'individualAddresses', visible: true, sortable: false },
                    { title: 'Employer', value: 'activeIndividualEmployers.EmployerName', visible: true, sortable: false },
                    { title: 'Individual Guid', value: 'IndividualGuid', visible: true, sortable: false },
                ];
                this.filters = new Array(10);

                this.filters[this.filterId['firstName']] = { name: "firstName", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['preferredName']] = { name: "preferredName", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['middleName']] = { name: "middleName", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['lastName']] = { name: "lastName", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['email']] = { name: "email", label: "First Name", value: "", type: "text", visible: true };

                this.filters[this.filterId['memberId']] = { name: "memberId", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['affiliateName']] = { name: "affiliateName", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['affiliateNumber']] = { name: "affiliateNumber", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['phoneNumber']] = { name: "phoneNumber", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['homeCity']] = { name: "homeCity", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['homeState']] = { name: "homeState", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['previousName']] = { name: "previousName", label: "First Name", value: "", type: "text", visible: true };
                this.filters[this.filterId['zipCode']] = { name: "zipCode", label: "Zip Code", value: "", type: "text", visible: true };
            }

            // const dataTable = document.querySelector('.v-data-table__wrapper');
            // const topScroll = document.querySelector('.search-top-scroller');
            // $(dataTable).on('scroll', function (e) {
            //     $(topScroll).scrollLeft($(dataTable).scrollLeft());
            // });
        },
        methods: {
            loadConfiguration(key) {
                this.getConfiguration('individualSearch', key).then((response) => {
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
                this.getConfiguration('individualSearch', '').then((response) => {
                    this.headers = this.parseHiddenColumn(response.data.fields);
                    this.configCommon(response);
                    this.getDataFromApi();
                });
            },

            clear() {
                const filtersData = this.filters.map(obj => ({ ...obj, value: '' }))
                this.filters = [...filtersData];
                this.componentUpdateKey++;
                this.$emit('search');
                this.searchIndividual();
            },

            getFilter(field) {
                return this.filters.filter((filter) => filter.name === field);
            },

            searchIndividual() {
                this.options.page = 1;
                this.getDataFromApi();
          },

            getDataFromApi() {
                this.loading = true;
                const { sortBy, page, itemsPerPage } = this.options;
                const globalScope = this.global ? '&scope=global' : '';
                const sortDefault = sortBy[0] ?? { key: 'IndividualId', order: 'asc' };
                let sortByField = sortDefault.key ?? 'IndividualId';
                const sortDirection = sortDefault.order === 'asc' ? '' : '-';
                if (sortByField === 'FullName') {
                    sortByField = 'LastName,'+sortDirection+'FirstName';
                }
                let url = '/api/v2/aggregate/individual/search?page=' + page + '&per_page=' + itemsPerPage + '&sort=' + sortDirection + sortByField + globalScope;

                let filterUrl = '';
                this.filters.map((filter) => {
                    if (filter.value !== '') {
                        filterUrl += '&'+filter.name+'='+filter.value;
                    }
                });
                if (filterUrl !== '') {
                    url += filterUrl;
                }

                if (this.global) {
                    this.updateQueryParams(this.options, this.filters, this.headers);
                }

                return axios.get(url)
                    .then(response => {
                        this.individuals = response.data.data;
                        this.totalIndividuals = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                        this.searched = true;
                    });
            },

            clickNewRecord() {
                const firstName = this.filters[this.filterId['firstName']].value;
                const preferredName = this.filters[this.filterId['preferredName']].value;
                const middleName = this.filters[this.filterId['middleName']].value;
                const lastName = this.filters[this.filterId['lastName']].value;
                this.$router.push({ name: 'IndividualNew', params: { firstName, preferredName, middleName, lastName }});
            },

            getAffiliate(individualAffiliate) {
                if (individualAffiliate.activeIndividualAffiliates.length > 0) {
                    return individualAffiliate.activeIndividualAffiliates[0].Affiliate;
                } else if (individualAffiliate.lastDeactivatedIndividualAffiliate.length > 0) {
                    return individualAffiliate.lastDeactivatedIndividualAffiliate[0].Affiliate;
                }
                return null;
            },

            getIndividualName(individualAffiliate) {
                if (individualAffiliate.MiddleName != 'Null' && individualAffiliate.MiddleName != null) {
                    return this.getPrefixName(individualAffiliate.Prefix) + ' ' +individualAffiliate.FirstName + ' ' + individualAffiliate.MiddleName + ' ' + individualAffiliate.LastName + '' + this.getSuffixName(individualAffiliate.Suffix);
                }
                else {
                    return this.getPrefixName(individualAffiliate.Prefix) + ' '+individualAffiliate.FirstName + ' ' + individualAffiliate.LastName + '' + this.getSuffixName(individualAffiliate.Suffix);
                }
                return '';
            },

            getSuffixName(suffix) {
                if (typeof(suffix) !== 'undefined' && suffix !== null) {
                    return ', '+suffix.SuffixName;
                }
                return '';
            },

            getPrefixName(prefix) {
                if (typeof(prefix) !== 'undefined' && prefix !== null) {
                    return prefix.PrefixName;
                }
                return '';
            },

            firstAddress(addresses, typeName)
            {
                return addresses.filter(address => address.IndividualAddressType&&address.IndividualAddressType.IndividualAddressTypeName===typeName).slice(0,1);
            },

            firstPhone(phone, typeName)
            {
                return phone.filter(phone => phone.IndividualPhoneType&&phone.IndividualPhoneType.IndividualPhoneTypeName===typeName).slice(0,1);
            },

            firstEmail(emails)
            {
                return emails.slice(0,1);
            },
        },
        created() {
            window.addEventListener('scroll', this.handleSCroll);
        },
        unmounted() {
            window.removeEventListener('scroll', this.handleSCroll);
        },
    }
</script>

<style lang="scss" scoped></style>
