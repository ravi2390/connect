<template>
    <v-container fluid @keyup.enter="search">
        <v-card class="v-card--outlined v-sheet--tile pa-4 mobile-search-container">
            <div class="filter-row">
            <v-row>
                <v-col cols="12" lg="4">
                    <h3>Search for Officer</h3>
                </v-col>
            </v-row>
            <v-row v-if="filters">
                <v-col>
                    <v-text-field v-if="filters[filterId['individualMembers.MemberId']]" variant="underlined" key="text-member-id" :label="filters[filterId['individualMembers.MemberId']].label" v-model="filters[filterId['individualMembers.MemberId']].value"/>
                </v-col>
                <v-col>
                    <v-text-field v-if="filters[filterId['individualAffiliates.Affiliate.AffiliateName']]" variant="underlined" key="text-affiliate-name" :label="filters[filterId['individualAffiliates.Affiliate.AffiliateName']].label" v-model="filters[filterId['individualAffiliates.Affiliate.AffiliateName']].value"/>
                </v-col>
                <v-col>
                    <v-text-field v-if="filters[filterId['individualAffiliates.Affiliate.AffiliateNumber']]" variant="underlined" key="text-affiliate-number" :label="filters[filterId['individualAffiliates.Affiliate.AffiliateNumber']].label" v-model="filters[filterId['individualAffiliates.Affiliate.AffiliateNumber']].value"/>
                </v-col>
                <v-col>
                    <v-text-field v-if="filters[filterId['individualPhones.PhoneNumber']]" variant="underlined" key="text-phone-number" :label="filters[filterId['individualPhones.PhoneNumber']].label" v-model="filters[filterId['individualPhones.PhoneNumber']].value"/>
                </v-col>
                <v-col>
                    <v-text-field v-if="filters[filterId['individualAddresses.City']]" variant="underlined" key="text-home-city" :label="filters[filterId['individualAddresses.City']].label" v-model="filters[filterId['individualAddresses.City']].value"/>
                </v-col>
                <v-col>
                    <StateTerritorySelectComponent v-if="filters[filterId['individualAddresses.StateTerritory.StateTerritoryName']]" v-model="filters[filterId['individualAddresses.StateTerritory.StateTerritoryName']].value" :label="filters[filterId['individualAddresses.StateTerritory.StateTerritoryName']].label" itemValue="StateTerritoryName"/>
                </v-col>
            </v-row>
            <v-row v-if="filters">
                <v-col>
                    <v-text-field v-if="filters[filterId['FirstName']]" variant="underlined" key="text-first-name" :label="filters[filterId['FirstName']].label" v-model="filters[filterId['FirstName']].value"/>
                </v-col>
                <v-col>
                    <v-text-field v-if="filters[filterId['MiddleName']]" variant="underlined" key="text-middle-name" :label="filters[filterId['MiddleName']].label" v-model="filters[filterId['MiddleName']].value"/>
                </v-col>
                <v-col>
                    <v-text-field v-if="filters[filterId['LastName']]" variant="underlined" key="text-last-name" :label="filters[filterId['LastName']].label" v-model="filters[filterId['LastName']].value"/>
                </v-col>
                <v-col>
                    <v-text-field v-if="filters[filterId['PreferredName']]" variant="underlined" key="text-preferred-name" :label="filters[filterId['PreferredName']].label" v-model="filters[filterId['PreferredName']].value"/>
                </v-col>
                <v-col>
                    <v-text-field v-if="filters[filterId['individualEmails.Email']]" variant="underlined" key="text-email" :label="filters[filterId['individualEmails.Email']].label" v-model="filters[filterId['individualEmails.Email']].value"/>
                </v-col>
                <v-col>
                    <v-select
                        v-if="filters[filterId['individualAffiliates.individualOfficers.AffiliateOfficerRole.OfficerRoleTitle.OfficerRoleTypeId']]"
                        :items="officerRoles"
                        :label="filters[filterId['individualAffiliates.individualOfficers.AffiliateOfficerRole.OfficerRoleTitle.OfficerRoleTypeId']].label"
                        item-value="OfficerRoleTypeId"
                        item-title="OfficerRoleTypeName"
                        v-model="filters[filterId['individualAffiliates.individualOfficers.AffiliateOfficerRole.OfficerRoleTitle.OfficerRoleTypeId']].value"
                        variant="underlined"
                    ></v-select>
                </v-col>
                <v-col class="d-flex justify-end ga-2">
                    <v-btn variant="elevated" color="primary" class="mb-4 btn-block flex-1-0" @click="search">Search</v-btn>
                    <v-btn variant="elevated" color="default" class="mb-4 btn-block flex-1-0" @click="clear">Clear</v-btn>
                </v-col>
            </v-row>
            </div>
            <v-row class="cnct-search">
                <v-col>
                    <v-data-table-server
                        :headers="getHeaders(headers)"
                        :items="items"
                        v-model:options="options"
                        :items-length="totalItems"
                        :loading="loading"
                        class="elevation-1 mobile-officer-search"
                        no-data-text="No match found"
                        mobile-breakpoint=960
                        @update:options="search"
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

                        <template v-slot:[`item.FullName`]="{ item }">
                            <AffiliateSwitchComponent
                                v-if="item.individualAffiliates && item.individualAffiliates.length===1"
                                component-name="IndividualDetails"
                                param-name="id"
                                :param-value="item.IndividualId"
                                :display-value="getIndividualName(item)"
                                :affiliate-id="item.individualAffiliates[0].Affiliate.AffiliateId"
                                :affiliate-name="item.individualAffiliates[0].Affiliate.AffiliateName"
                                :affiliate-number="item.individualAffiliates[0].Affiliate.AffiliateNumber"
                            />
                            <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                                {{ item.FirstName }} <span v-if="item.MiddleName != 'Null'">{{ item.MiddleName }}</span> {{ item.LastName }}
                            </router-link>
                        </template>

                        <template v-slot:[`item.FirstName`]="{ item }">
                            <AffiliateSwitchComponent
                                v-if="item.individualAffiliates && item.individualAffiliates.length===1"
                                component-name="IndividualDetails"
                                param-name="id"
                                :param-value="item.IndividualId"
                                :display-value="item.FirstName"
                                :affiliate-id="item.individualAffiliates[0].Affiliate.AffiliateId"
                                :affiliate-name="item.individualAffiliates[0].Affiliate.AffiliateName"
                                :affiliate-number="item.individualAffiliates[0].Affiliate.AffiliateNumber"
                            />
                            <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                                {{ item.FirstName }}
                            </router-link>
                        </template>

                        <template v-slot:[`item.PreferredName`]="{ item }">
                            <AffiliateSwitchComponent
                                v-if="item.individualAffiliates && item.individualAffiliates.length===1"
                                component-name="IndividualDetails"
                                param-name="id"
                                :param-value="item.IndividualId"
                                :display-value="item.PreferredName"
                                :affiliate-id="item.individualAffiliates[0].Affiliate.AffiliateId"
                                :affiliate-name="item.individualAffiliates[0].Affiliate.AffiliateName"
                                :affiliate-number="item.individualAffiliates[0].Affiliate.AffiliateNumber"
                            />
                            <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                                {{ item.PreferredName }}
                            </router-link>
                        </template>

                        <template v-slot:[`item.MiddleName`]="{ item }">
                            <span v-if="item.MiddleName != 'Null'">
                            <AffiliateSwitchComponent
                                v-if="item.individualAffiliates && item.individualAffiliates.length===1"
                                component-name="IndividualDetails"
                                param-name="id"
                                :param-value="item.IndividualId"
                                :display-value="item.MiddleName"
                                :affiliate-id="item.individualAffiliates[0].Affiliate.AffiliateId"
                                :affiliate-name="item.individualAffiliates[0].Affiliate.AffiliateName"
                                :affiliate-number="item.individualAffiliates[0].Affiliate.AffiliateNumber"
                            />
                            <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                                {{ item.MiddleName }}
                            </router-link>
                            </span>
                        </template>

                        <template v-slot:[`item.LastName`]="{ item }">
                            <AffiliateSwitchComponent
                                v-if="item.individualAffiliates && item.individualAffiliates.length===1"
                                component-name="IndividualDetails"
                                param-name="id"
                                :param-value="item.IndividualId"
                                :display-value="item.LastName"
                                :affiliate-id="item.individualAffiliates[0].Affiliate.AffiliateId"
                                :affiliate-name="item.individualAffiliates[0].Affiliate.AffiliateName"
                                :affiliate-number="item.individualAffiliates[0].Affiliate.AffiliateNumber"
                            />
                            <router-link v-else :to="{ name: 'IndividualDetails', params: { id: item.IndividualId }}">
                                {{ item.LastName }}
                            </router-link>
                        </template>

                        <template v-slot:[`item.individualMembers`]="{ item }">
                            <span v-for="member in item.individualMembers" :key="member.MemberId">
                                {{ member.MemberId }}
                            </span>
                        </template>

                        <template v-slot:[`item.activeIndividualAffiliates.UnionRelationship`]="{ item }">
                            <span v-for="activeIndividualAffiliates in item.activeIndividualAffiliates">
                                {{activeIndividualAffiliates.UnionRelationshipType.UnionRelationshipTypeName}}
                            </span>
                        </template>

                        <template v-slot:[`item.AffiliateName`]="{ item }">
                            <div v-for="activeIndividualAffiliates in item.activeIndividualAffiliates" :key="activeIndividualAffiliates.Affiliate.AffiliateId">
                                <AffiliateSwitchComponent
                                    component-name="AffiliateDisplay"
                                    param-name="id"
                                    :param-value="activeIndividualAffiliates.Affiliate.AffiliateId"
                                    :display-value="activeIndividualAffiliates.Affiliate.AffiliateName"
                                    :affiliate-id="activeIndividualAffiliates.Affiliate.AffiliateId"
                                    :affiliate-name="activeIndividualAffiliates.Affiliate.AffiliateName"
                                    :affiliate-number="activeIndividualAffiliates.Affiliate.AffiliateNumber"
                                />
                            </div>
                        </template>

                        <template v-slot:[`item.AffiliateNumber`]="{ item }">
                            <div v-for="activeIndividualAffiliates in item.activeIndividualAffiliates" :key="activeIndividualAffiliates.Affiliate.AffiliateId">
                                <AffiliateSwitchComponent
                                    component-name="AffiliateDisplay"
                                    param-name="id"
                                    :param-value="activeIndividualAffiliates.Affiliate.AffiliateId"
                                    :display-value="activeIndividualAffiliates.Affiliate.AffiliateNumber"
                                    :affiliate-id="activeIndividualAffiliates.Affiliate.AffiliateId"
                                    :affiliate-name="activeIndividualAffiliates.Affiliate.AffiliateName"
                                    :affiliate-number="activeIndividualAffiliates.Affiliate.AffiliateNumber"
                                />
                            </div>
                        </template>

                        <template v-slot:[`item.individualAffiliates.AffiliateOfficerRoleName`]="{ item }">
                            <span v-for="officerRole in getUniqueOfficerRoles(item.individualAffiliates)"
                                  v-bind="officerRole"
                                  :key="officerRole.AffiliateOfficerRole"
                            >
                                {{ officerRole.AffiliateOfficerRoleName }}
                            </span>
                        </template>

                        <template v-slot:[`item.HomeAddress`]="{ item }">
                            <span v-for="address in firstAddress(item.individualAddressesOrdered,'Home')"
                                  v-bind="address"
                                  :key="address.IndividualAddressId"
                            >
                                {{ address.AddressLine1 }} <br/>
                                <span v-if="address.AddressLine2">{{ address.AddressLine2 }} <br/></span>
                                {{ address.City }} {{ address.StateTerritory?address.StateTerritory.StateTerritoryCode:'' }} {{ address.PostalCode }}
                            </span>
                        </template>

                        <template v-slot:[`item.individualPhones`]="{ item }">
                        <span v-for="phone in firstPhone(item.individualPhonesOrdered,'Mobile')"
                              v-bind="phone"
                              :key="phone.IndividualPhoneId"
                        >
                            {{ phone.fullPhone }}
                        </span>
                        </template>
                        <template v-slot:[`item.individualPhonesHome`]="{ item }">
                        <span v-for="phone in firstPhone(item.individualPhonesOrdered, 'Home')"
                              v-bind="phone"
                              :key="phone.IndividualPhoneId"
                        >
                            {{ phone.fullPhone }}
                        </span>
                        </template>

                        <template v-slot:[`item.individualEmails`]="{ item }">
                            <span v-for="email in firstEmail(item.individualEmailsOrdered)"
                                  v-bind="email"
                                  :key="email.IndividualEmailId"
                            >
                                {{ email.Email }}
                            </span>
                        </template>

                    </v-data-table-server>
                    <chooser-component :columns="headers" :presets="presets" :selectedPreset="selectedPreset" @applied="onHeaderChangeApplied('OfficerRoleSearch', $event)" @preset-load="loadConfiguration($event)"></chooser-component>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
    import headersMixin from "../../mixins/Grid/headersMixin";
    import StateTerritorySelectComponent from "../Common/StateTerritorySelectComponent";
    import configurationMixin from "../../mixins/UI/configurationMixin";
    import paginationUrlMixin from "../../mixins/Grid/paginationUrlMixin";
    import ColumnChooserComponent from "../Common/Grid/ColumnChooserComponent";
    import AffiliateSwitchComponent from "./AffiliateSwitchComponent";
    import emptySelectMixin from "../../mixins/UI/emptySelectMixin";
    import dataTablesMixin from "../../mixins/UI/dataTablesMixin";

    export default {
        name: "OfficerSearchComponent",
        components: {StateTerritorySelectComponent, 'chooser-component': ColumnChooserComponent, AffiliateSwitchComponent},
        mixins: [headersMixin, configurationMixin, paginationUrlMixin, emptySelectMixin, dataTablesMixin],
        data: () => ({
            filterId: {
                FirstName: 0,
                LastName: 1,
                'individualMembers.MemberId': 2,
                'individualAffiliates.Affiliate.AffiliateName': 3,
                'individualAffiliates.Affiliate.AffiliateNumber': 4,
                'individualAffiliates.individualOfficers.AffiliateOfficerRole.OfficerRoleTitle.OfficerRoleTypeId': 5,
                'individualAddresses.City': 6,
                'individualAddresses.StateTerritory.StateTerritoryName': 7,
                'individualEmails.Email': 8,
                'individualPhones.PhoneNumber': 9,
                PreferredName: 10,
                MiddleName: 11,
            },
            items: [],
            totalItems: 0,
            loading: false,
            filters: [],
            headers: [],
            options: {
                sortBy: [{ key: 'FullName', order: 'asc' }],
                page: 1,
                itemsPerPage: 10,
            },
            officerRoles: [],
        }),
        methods: {
            getFilter(field) {
                return this.filters.filter((filter) => filter.name === field);
            },
            clear() {
                this.filters.map((filter) => {
                    filter.value = '';
                });
                this.search();
            },
            search() {
                this.loading = true;
                const { sortBy, page, itemsPerPage } = this.options;
                const sortDefault = sortBy[0] ?? { key: 'IndividualId', order: 'asc' };
                let sortByField = sortDefault.key ?? 'IndividualId';
                const sortDirection = sortDefault.order === 'asc' ? '' : '-';
                if (sortByField === 'FullName') {
                    sortByField = 'LastName,FirstName,MiddleName';
                }
                let url = '/api/v2/individual?scope=global&include=activeIndividualAffiliates.Affiliate,individualAddressesOrdered.IndividualAddressType,individualAddressesOrdered.StateTerritory,individualMembers,individualEmailsOrdered,activeIndividualAffiliates.UnionRelationshipType,individualAffiliates.individualOfficers.AffiliateOfficerRole,individualPhonesOrdered.IndividualPhoneType&page=' + page+'&per_page='+itemsPerPage+ '&sort=' + sortDirection + sortByField;

                let filterUrl = '&filter[onlyOfficers]=1';
                for (const search of this.filters) {
                    if (search.value !== '') {
                        filterUrl += '&filter[' + search.name + ']=' + search.value;
                    }
                }
                if (filterUrl !== '') {
                    url += filterUrl;
                }

                this.updateQueryParams(this.options, this.filters, this.headers);

                return axios.get(url)
                    .then(response => {
                        this.items = response.data.data;
                        this.totalItems = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            getUniqueOfficerRoles(individualAffiliates) {
                const officerRoles = [];

                for (const individualAffiliate of individualAffiliates) {
                    if (typeof individualAffiliate.individualOfficers === 'undefined' || !individualAffiliate.individualOfficers) {
                        continue;
                    }
                    for (const individualOfficer of individualAffiliate.individualOfficers) {
                        if (individualOfficer.AffiliateOfficerRole && officerRoles.filter((officerRole) => {
                            return officerRole.AffiliateOfficerRoleId === individualOfficer.AffiliateOfficerRole.AffiliateOfficerRoleId;
                        }).length === 0) {
                            officerRoles.push(individualOfficer.AffiliateOfficerRole);
                        }
                    }
                }

                return officerRoles;
            },
            getIndividualName(individualAffiliate) {
                if (individualAffiliate.MiddleName != 'Null' && individualAffiliate.MiddleName != null) {
                    return individualAffiliate.FirstName + ' ' + individualAffiliate.MiddleName + ' ' + individualAffiliate.LastName;
                }
                else {
                    return individualAffiliate.FirstName + ' ' + individualAffiliate.LastName;
                }
                return '';
            },
            loadConfiguration(key) {
                this.getConfiguration('OfficerRoleSearch', key).then((response) => {
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
                this.getConfiguration('OfficerRoleSearch', '').then((response) => {
                    this.headers = this.parseHiddenColumn(response.data.fields);
                    this.configCommon(response);
                    this.search();
                });
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
        mounted() {
            axios.get('/api/v2/OfficerRoleType?scope=global&per_page=50')
            .then( response => {
                this.officerRoles = this.addEmptyElement(response.data.data, 'OfficerRoleTypeId', 'OfficerRoleTypeName');
            });
            this.initConfiguration();

            // const dataTable = document.querySelector('.v-data-table__wrapper');
            // const topScroll = document.querySelector('.search-top-scroller');

            // $(dataTable).on('scroll', function (e) {
            //     $(topScroll).scrollLeft($(dataTable).scrollLeft());
            // });
        }
    }
</script>
