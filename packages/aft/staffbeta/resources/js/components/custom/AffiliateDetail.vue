<!-- eslint-disable vue/no-v-html -->
<template>
    <div>
        <div v-if="loading">
            Loading...
        </div>
        <div v-else>
            <p>Affiliate Name: <strong>{{ affiliate.AffiliateName }}</strong></p>
            <p>Affiliate Number: <strong>{{ affiliate.AffiliateNumber }}</strong></p>
            <p>Affiliate Website: <strong>{{ affiliate.AffiliateWebsite || 'n/a' }}</strong></p>
            <p v-if="fiscalYearEnd">Fiscal Year End: <strong>{{ fiscalYearEnd }}</strong></p>
            <p>Charter Date: <strong>{{ displayDate(affiliate.CharterDate) }}</strong></p>
            <p><strong>Union Relationships Count :</strong></p>
            <union-count-component :affiliateId="affiliate.AffiliateId"></union-count-component>
            <h2>Officers:</h2>
            <v-data-table-virtual
                :headers="tableOfficerHeaders"
                :items="tableOfficerResults"
                :no-data-text="emptyText"
                fixed-header
            >
                <template v-slot:[`item.role`]="{ item }">
                    {{ item.AffiliateOfficerRole.AffiliateOfficerRoleName }}
                </template>
                <template v-slot:[`item.name`]="{ item }">
                    {{ item.Individual.FullName }}
                </template>
                <template v-slot:[`item.phones`]="{ item }">
                    <DisplayPhone
                        v-for="phone in item.Individual.IndividualPhones"
                        :key="phone.PhoneNumber"
                        :phone="phone"
                    />
                </template>
                <template v-slot:[`item.emails`]="{ item }">
                    <DisplayEmail v-for="email in item.Individual.IndividualEmails" :key="email.Email" :email="email" />
                </template>
                <template v-slot:[`item.addresses`]="{ item }">
                    <DisplayAddress
                        v-for="address in item.Individual.IndividualAddresses"
                        :key="address.AddressLine1"
                        :address="address"
                    />
                </template>
            </v-data-table-virtual>
            <v-divider></v-divider>
            <h2>Staff:</h2>
            <v-data-table-virtual
                :headers="tableStaffHeaders"
                :items="tableStaffResults"
                :no-data-text="emptyText"
                fixed-header
                >
                <template v-slot:[`item.role`]="{ item }">
                    <span class="mr-1" v-if="item.StaffDepartment">{{ item.StaffDepartment.StaffDepartmentName }}:</span>
                    <span>{{ item.StaffTitle }}</span>
                </template>
                <template v-slot:[`item.name`]="{ item }">
                    {{ item.Individual.FullName }}
                </template>
                <template v-slot:[`item.phones`]="{ item }">
                    <DisplayPhone
                        v-for="phone in item.Individual.IndividualPhones"
                        :key="phone.PhoneNumber"
                        :phone="phone"
                    />
                </template>
                <template v-slot:[`item.emails`]="{ item }">
                    <DisplayEmail v-for="email in item.Individual.IndividualEmails" :key="email.Email" :email="email" />
                </template>
                <template v-slot:[`item.addresses`]="{ item }">
                    <DisplayAddress
                        v-for="address in item.Individual.IndividualAddresses"
                        :key="address.AddressLine1"
                        :address="address"
                    />
                </template>
            </v-data-table-virtual>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';
import AffiliateUnionCountComponent from "./AffiliateUnionCountComponent";
import DisplayPhone from "./DisplayPhone.vue";
import DisplayEmail from "./DisplayEmail.vue";
import DisplayAddress from "./DisplayAddress.vue";

export default {
    name: 'AffiliateDetail',
    components: {
        'union-count-component': AffiliateUnionCountComponent,
        DisplayPhone,
        DisplayEmail,
        DisplayAddress,
    },
    props: {
        loading: { type: Boolean, required: true },
        affiliate: null,
    },
    computed: {
        fiscalYearEnd() {
            return this.affiliate?.AffiliatePerCapita?.FiscalYearEnd;
        },
    },
    data: () => ({
        tableOfficerHeaders: [],
        tableOfficerResults: [],
        tableStaffHeaders: [],
        tableStaffResults: [],
        emptyText: 'Loading...',
    }),
    watch: {
        affiliate: function (value) {
            this.getOfficers(value.AffiliateId);
            this.getStaff(value.AffiliateId);
        },
    },
    mounted() {
        this.getOfficerOptions();
        this.getStaffOptions();
    },
    methods: {
        displayDate(date) {
            return format(date, 'MMMM dd, yyyy hh:mm a');
        },
        async getOfficerOptions() {
            return axios.get('/api/staff/searchAffiliate/officers/options')
                .then((response) => {
                    this.tableOfficerHeaders = response.data.officerHeaders;
                })
        },
        async getOfficers(affiliateId) {
            return axios.get(`/api/staff/searchAffiliate/officers/${affiliateId}`)
                .then((response) => {
                    this.tableOfficerResults = response.data.data;
                    if (!this.tableOfficerResults || this.tableOfficerResults.length === 0) {
                        this.emptyText = 'No results';
                    }
                })
        },
        async getStaffOptions() {
            return axios.get('/api/staff/searchAffiliate/staff/options')
                .then((response) => {
                    this.tableStaffHeaders = response.data.staffHeaders;
                })
        },
        async getStaff(affiliateId) {
            return axios.get(`/api/staff/searchAffiliate/staff/${affiliateId}`)
                .then((response) => {
                    this.tableStaffResults = response.data.data;
                    if (!this.tableStaffResults || this.tableStaffResults.length === 0) {
                        this.emptyText = 'No results';
                    }
                })
        },
    },
};
</script>
