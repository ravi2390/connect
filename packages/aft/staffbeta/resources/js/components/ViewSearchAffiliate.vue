<!-- eslint-disable vue/no-v-html -->
<template>
    <div id="searchAffiliate" class="mt-4">
        <form autocomplete="off">
            <v-row>
                <v-col cols="12" md="6" lg="4">
                    <v-text-field
                        v-model="search.affiliate"
                        label="Affiliate Name or Number"
                    >
                        <template #prepend-inner>
                            <v-tooltip text="Affiliate Name or Number">
                                <template #activator="{ props }">
                                    <v-icon v-bind="props" icon="fa-list-alt"></v-icon>
                                </template>
                            </v-tooltip>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                    <v-select
                        v-model="search.parent"
                        label="State Federation"
                        :items="stateFeds"
                        item-value="AffiliateId"
                        item-title="AffiliateName"
                    >
                        <template #prepend-inner>
                            <v-tooltip text="State Federation">
                                <template #activator="{ props }">
                                    <v-icon v-bind="props" icon="fa-sitemap"></v-icon>
                                </template>
                            </v-tooltip>
                        </template>
                    </v-select>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                    <v-text-field
                        v-model="search.zip"
                        label="Zip Code"
                    >
                        <template #prepend-inner>
                            <v-tooltip text="Zip Code">
                                <template #activator="{ props }">
                                    <v-icon v-bind="props" icon="mdi:mdi-map-marker"></v-icon>
                                </template>
                            </v-tooltip>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="search.city"
                        label="City"
                    >
                        <template #prepend-inner>
                            <v-tooltip text="City">
                                <template #activator="{ props }">
                                    <v-icon v-bind="props" icon="mdi:mdi-city"></v-icon>
                                </template>
                            </v-tooltip>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="search.state"
                        label="State"
                    >
                        <template #prepend-inner>
                            <v-tooltip text="State">
                                <template #activator="{ props }">
                                    <v-icon v-bind="props" icon="fa-flag"></v-icon>
                                </template>
                            </v-tooltip>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <div class="d-flex justify-content-center ga-2">
                <v-btn
                    name="clear"
                    :loading="loading"
                    @click="clearAll"
                    color="secondary"
                    class="flex-1-0"
                >
                    Clear All Fields
                </v-btn>
                <v-btn
                    name="search"
                    :loading="loading"
                    @click="searchAffiliate"
                    color="primary"
                    class="flex-1-0"
                >
                    Search
                </v-btn>
            </div>
        </form>
        <v-divider class="my-8"></v-divider>
        <v-data-table-server
            v-model:items-per-page="tableOptions.per_page"
            v-model:page="tableOptions.current_page"
            v-model:items-length="tableOptions.total"
            :headers="tableHeaders"
            :items="tableResults"
            :loading="loading"
            @update:page="pageChanged"
            @update:items-per-page="perPageChanged"
        >
            <template v-slot:[`item.affiliate`]="{ item }">
                <v-btn variant="text" @click="showAffiliateDetails(item.AffiliateId)">
                    {{ item.AffiliateName }} - ({{ item.AffiliateNumber }})
                </v-btn>
            </template>
            <template v-slot:[`item.phones`]="{ item }">
                <DisplayPhone v-for="phone in item.AffiliatePhonesOrdered" :key="phone.PhoneNumber" :phone="phone" />
            </template>
            <template v-slot:[`item.emails`]="{ item }">
                <DisplayEmail v-for="email in item.AffiliateEmailsOrdered" :key="email.Email" :email="email" />
            </template>
            <template v-slot:[`item.addresses`]="{ item }">
                <DisplayAddress v-for="address in item.AffiliateAddressesOrdered" :key="address.AddressLine1" :address="address" />
            </template>
        </v-data-table-server>
        <v-dialog
            v-model="showAffiliateModal"
            scrollable
        >
            <v-card title="Affiliate Details">
                <v-card-text>
                    <affiliate-detail :affiliate="affiliateDetails" :loading="showAffiliateLoading" />
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="showAffiliateModal = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import { pickBy } from 'lodash-es';
import AffiliateDetail from './custom/AffiliateDetail.vue';
import contactFormatters from './mixins/contactFormatters';
import DisplayAddress from './custom/DisplayAddress.vue';
import DisplayEmail from './custom/DisplayEmail.vue';
import DisplayPhone from '../components/custom/DisplayPhone.vue';

export default {
    name: 'SearchAffiliate',
    components: {
        AffiliateDetail,
        DisplayAddress,
        DisplayEmail,
        DisplayPhone,
    },
    mixins: [
        contactFormatters,
    ],
    data: () => ({
        loading: false,
        search: {
            affiliate: null,
            parent: null,
            city: null,
            state: null,
            zip: null,
        },
        tableOptions: {
            current_page: 1,
            per_page: 15,
            total: 0,
        },
        tableHeaders: [],
        tableResults: [],
        stateFeds: [],
        showAffiliateModal: false,
        showAffiliateLoading: false,
        affiliateDetails: {},
    }),
    mounted() {
        let urlSearch = false;
        const query = this.$route.query;
        Object.entries(query).forEach(([key, value]) => {
            if (key in this.search) {
                this.search[key] = value;
                urlSearch = true;
            }
        });
        this.getOptions()
            .then(() => {
                if (urlSearch) {
                    this.searchAffiliate();
                }
            });
    },
    methods: {
        setUrl(search) {
            this.$router.push({ name: this.$route.name, query: search })
                .catch((err) => {
                    if (err.name !== 'NavigationDuplicated') { throw (err); }
                });
        },
        async getOptions() {
            this.loading = true;
            return axios.get('/api/staff/searchAffiliate/options')
                .then((response) => {
                    this.tableOptions = response.data.options;
                    this.tableHeaders = response.data.headers;
                    this.stateFeds = response.data.statefeds;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async searchAffiliate() {
            this.loading = true;
            // pickBy removes null values from the search object for a prettier URL query.
            this.setUrl(pickBy(this.search));
            return axios.post('/api/staff/searchAffiliate', { search: this.search, options: this.tableOptions })
                .then((response) => {
                    const { data, ...options } = response.data;
                    this.tableOptions = options;
                    this.tableResults = data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        clearAll() {
            for (const [key] of Object.entries(this.search)) {
                this.search[key] = null;
            }
            this.setUrl(null);
        },
        pageChanged(page) {
            this.tableOptions.current_page = page;
            this.searchAffiliate();
        },
        perPageChanged(perPage) {
            this.tableOptions.per_page = perPage;
            this.searchAffiliate();
        },
        showAffiliateDetails(affiliateId) {
            this.showAffiliateModal = true;
            this.showAffiliateLoading = true;
            this.affiliateDetails = {};
            return axios.get(`/api/staff/affiliate/${affiliateId}`)
                .then((response) => {
                    this.affiliateDetails = response.data;
                })
                .finally(() => {
                    this.showAffiliateLoading = false;
                });
        },
    },
};
</script>
