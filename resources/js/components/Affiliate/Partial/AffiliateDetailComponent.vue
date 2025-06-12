<template>
<div>
    <div v-if="shouldDisplayDataComponent">
    <v-container>
        <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
        <v-row>
            <v-col cols="10">
                <h3 class="details-header mobile-word-break">{{ affiliate.AffiliateName }} - {{ affiliate.AffiliateNumber }}</h3>
            </v-col>
            <v-col cols="12" lg="2" class="hidden-md-and-down">
                <v-btn href="#Details" size="small" @click="openDetails()" color="primary">View Details</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="8">
                <div class="data-container">
                    <div class="data-tag">Affiliate Number:</div>
                    <span class="data-value" v-if="affiliate.AffiliateNumber">{{ affiliate.AffiliateNumber }}</span>
                    <span class="data-value" v-else>N/A</span>
                </div>

                <div class="data-container">
                    <div class="data-tag">PIN:</div>
                    <div class="data-value" v-if="affiliate">
                        {{ affiliate.AffiliatePerCapitaPIN }}
                    </div>
                </div>

                <div class="data-container">
                    <div class="data-tag">Phone Number:</div>
                        <span v-if="affiliate && affiliate.affiliatePhonesOrdered && affiliate.affiliatePhonesOrdered.length > 0">
                            {{ maskPhone(affiliate.affiliatePhonesOrdered[0].PhoneNumber) }}
                        </span>
                        <span v-else>N/A</span>
                    </div>

                <div class="data-container">
                    <div class="data-tag">Email:</div>
                        <span v-if="affiliate && affiliate.affiliateEmailsOrdered && affiliate.affiliateEmailsOrdered.length > 0">
                            {{ affiliate.affiliateEmailsOrdered[0].Email }}
                        </span>
                        <span v-else>N/A</span>
                    </div>

                <div class="data-container">
                    <div class="data-tag">Website:</div>
                    <span v-if="affiliate.AffiliateWebsite">{{ affiliate.AffiliateWebsite }}</span>
                    <span v-else>N/A</span>
                </div>

                <div class="data-container">
                    <div class="data-tag">Address:</div>
                        <span v-if="affiliate && affiliate.affiliateAddressesOrdered && affiliate.affiliateAddressesOrdered.length > 0">
                            {{ affiliate.affiliateAddressesOrdered[0].AddressLine1 }},
                            {{ affiliate.affiliateAddressesOrdered[0].AddressLine2 && affiliate.affiliateAddressesOrdered[0].AddressLine2.trim().length > 0 ? affiliate.affiliateAddressesOrdered[0].AddressLine2 + ', ' : ''}}
                            {{ affiliate.affiliateAddressesOrdered[0].City }},
                            {{ affiliate.affiliateAddressesOrdered[0].StateTerritory ? affiliate.affiliateAddressesOrdered[0].StateTerritory.StateTerritoryCode : '' }},
                            {{ affiliate.affiliateAddressesOrdered[0].PostalCode }}
                        </span>
                        <span v-else>N/A</span>
                </div>

            </v-col>
            <v-col class="hidden-lg-and-up">
                <v-btn href="#Details" size="small" @click="openDetails()" color="primary">View Details</v-btn>
            </v-col>
            <v-col cols="12" lg="4">
                <div class="data-container">
                    <span v-if="affiliate.affiliateAddressesOrdered && affiliate.affiliateAddressesOrdered.length > 0" class="maps">
                        <a v-bind:href="'https://www.google.com/maps/search/?api=1&query=' + affiliate.affiliateAddressesOrdered[0].AddressLine1 + ',' + affiliate.affiliateAddressesOrdered[0].City + ',' + affiliate.affiliateAddressesOrdered[0].StateTerritory.StateTerritoryCode + ''" target="_blank">
                            <img alt="Map" v-bind:src="'https://maps.google.com/maps/api/staticmap?center=' + affiliate.affiliateAddressesOrdered[0].AddressLine1 + affiliate.affiliateAddressesOrdered[0].City + affiliate.affiliateAddressesOrdered[0].StateTerritory.StateTerritoryCode + '&zoom=18&size=480x320&sensor=false&maptype=roadmap&style=feature:landscape%7Ccolor:0xb3d9ff&style=feature:water%7Ccolor:0x4285f4&key=AIzaSyDuVjkyWXQcFLS0f7Y8OxftR0m08cwWf5Q'" />
                        </a>
                    </span>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    v-model:sort-by="options.sortBy"
                    :loading="loadingOfficers"
                    :items="affiliateOfficers"
                    :mobile-breakpoint=992
                    class="mobile-global-card-table"
                >
                    <template v-slot:[`item.Individual.FullName`]="{ item }">
                        <span v-if="item.Individual">
                        <router-link :to="{ name: 'IndividualDetails', params: { id: item.Individual.IndividualId }}">
                            {{ item.Individual.FullName }}
                        </router-link>
                        </span>
                    </template>
                    <template v-slot:[`item.StartDate`]="{ item }">
                        {{ $filters.formatDate(item.TermStartDate) }}
                    </template>
                    <template v-slot:[`item.Individual.individualPhonesOrdered`]="{ item }">
                        {{ item.Individual.individualPhonesOrdered[0] ? maskPhone(item.Individual.individualPhonesOrdered[0].PhoneNumber) : null }}
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <union-count-component :affiliateId="affiliateId"></union-count-component>
            </v-col>
        </v-row>
    </v-container>
    </div>
    <!-- MOBILE Breakpoint -->
    <div class="hidden-lg-and-up" v-if="!shouldDisplayDataComponent">
        <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
        <v-row v-touch="{right: () => swipe('right'),}">
            <v-col>
            <h3 class="mobile-data-container mobile-link-style">
                <AffiliateSwitchComponent
                    component-name="AffiliateDisplay"
                    param-name="id"
                    :param-value="affiliate.AffiliateId"
                    :display-value="affiliate.AffiliateName"
                    :affiliate-id="affiliate.AffiliateId"
                    :affiliate-name="affiliate.AffiliateName"
                    :affiliate-number="affiliate.AffiliateNumber"
                />
            </h3>
            <div class="mobile-link-note-container">
                <div class="data-value">
                    <span>Click on the name to view and edit the affiliate record.</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                <span class="mobile-detail-column-name">Affiliate Number: </span>
                <span v-if="affiliate.AffiliateNumber">{{ affiliate.AffiliateNumber }}</span>
                <span v-else>N/A</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                <span class="mobile-detail-column-name">Abbreviated Name: </span>
                <span v-if="affiliate.AffiliateAbbreviatedName">{{ affiliate.AffiliateAbbreviatedName }}</span>
                <span v-else>N/A</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                <span class="mobile-detail-column-name">Acronym: </span>
                <span v-if="affiliate.AffiliateAcronym">{{ affiliate.AffiliateAcronym }}</span>
                <span v-else>N/A</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                <span class="mobile-detail-column-name">Affiliate EIN: </span>
                <span v-if="affiliate.AffiliateEIN">{{ affiliate.AffiliateEIN }}</span>
                <span v-else>N/A</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                <span class="mobile-detail-column-name">Affiliate GUID: </span>
                <span v-if="affiliate.AffiliateGuid">{{ affiliate.AffiliateGuid }}</span>
                <span v-else>N/A</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                <span class="mobile-detail-column-name">Affiliate Type: </span>
                <span v-if="affiliate.AffiliateType">{{ affiliate.AffiliateType.AffiliateTypeName }}</span>
                <span v-else>N/A</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                <span class="mobile-detail-column-name">BillHighwayGroupId: </span>
                <span v-if="affiliate.BillHighwayGroupId">{{ affiliate.BillHighwayGroupId }}</span>
                <span v-else>N/A</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                    <span class="mobile-detail-column-name">Affiliate CharterDate: </span>
                        <span v-if="affiliate.CharterDate">{{ $filters.formatDate(affiliate.CharterDate) }}</span>
                        <span v-else>N/A</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                    <span class="mobile-detail-column-name">Address:</span>
                        <span v-if="affiliate && affiliate.affiliateAddressesOrdered && affiliate.affiliateAddressesOrdered.length > 0">
                            {{ affiliate.affiliateAddressesOrdered[0].AddressLine1 }},
                            {{ affiliate.affiliateAddressesOrdered[0].City }},
                            {{ affiliate.affiliateAddressesOrdered[0].StateTerritory ? affiliate.affiliateAddressesOrdered[0].StateTerritory.StateTerritoryCode : '' }},
                            {{ affiliate.affiliateAddressesOrdered[0].PostalCode }}
                        </span>
                        <span v-else>N/A</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                    <span class="mobile-detail-column-name" >Phone:</span>
                        <span v-if="affiliate && affiliate.affiliatePhonesOrdered && affiliate.affiliatePhonesOrdered && affiliate.affiliatePhonesOrdered.length > 0">
                            {{ maskPhone(affiliate.affiliatePhonesOrdered[0].PhoneNumber) }}
                        </span>
                        <span v-else>N/A</span>
                </div>
            </div>

            <div class="data-container mobile-data-container">
                <div class="data-value">
                <span class="mobile-detail-column-name">Email Address:</span>
                    <span v-if="affiliate && affiliate.affiliateEmailsOrdered && affiliate.affiliateEmailsOrdered.length > 0">
                        {{ affiliate.affiliateEmailsOrdered[0].Email }}
                    </span>
                    <span v-else>N/A</span>
                </div>
            </div>

            </v-col>
        </v-row>
    </div>
</div>
</template>

<script>
import AffiliateSwitchComponent from "../AffiliateSwitchComponent";
import AffiliateUnionCountComponent from "./AffiliateUnionCountComponent";
    import { maskPhoneNumber } from "../../../helpers/index.js";

    export default {
        name: "AffiliateDetailComponent",

        components: {
            'union-count-component': AffiliateUnionCountComponent,AffiliateSwitchComponent
        },

        props: {
            affiliateId: {
                type: Number,
                required: true
            },
            shouldDisplayDataComponent: {
                type: Boolean,
                default: true
            }
        },

        data: () => ({
            affiliate: {},
            affiliateOfficers: [],
            loading: false,
            loadingOfficers: false,
            options: {
                sortBy: [{ key: 'AffiliateOfficerRole.officerRoleTitle.DisplayOrder', order: 'asc' }]
            },
            headers: [
                {title: 'Officer Name', sortable: true, value: 'Individual.FullName'},
                {title: 'Officer Roles', sortable: true, value: 'AffiliateOfficerRole.AffiliateOfficerRoleName'},
                {title: 'Start Date', value: 'StartDate'},
                {title: 'Phone', value: 'Individual.individualPhonesOrdered'},
                {title: 'Email', value: 'Individual.individualEmailsOrdered[0].Email'}
            ]
        }),
        mounted() {
            this.getDataFromApi();
            this.getCurrentOfficersFromApi();
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/aggregate/affiliate/detail/' + this.affiliateId + '?scope=global';

                return axios.get(url)
                    .then(response => {
                        this.affiliate = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            getCurrentOfficersFromApi() {
                this.loadingOfficers = true;
                let url = '/api/v2/affiliate/' + this.affiliateId + '?include=currentAffiliateOfficers.AffiliateOfficerRole.officerRoleTitle,currentAffiliateOfficers.Individual.individualEmailsOrdered,currentAffiliateOfficers.Individual.individualPhonesOrdered';

                return axios.get(url)
                    .then(response => {
                        this.affiliateOfficers = response.data.data.currentAffiliateOfficers;
                    })
                    .finally(() => {
                        this.loadingOfficers = false;
                    });

            },
            openDetails() {
                this.$emit('open-details');
            },
            maskPhone(phone) {
                return maskPhoneNumber(phone);
            }
        },
    }
</script>
