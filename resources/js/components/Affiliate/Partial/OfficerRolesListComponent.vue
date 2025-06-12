<template>
    <v-container>
        <v-data-table
            :headers="headers"
            v-model:sort-by="options.sortBy"
            :loading="loading"
            :items="affiliateOfficers"
            class="mobile-global-card-table"
            :mobile-breakpoint=992
        >
            <template v-slot:[`item.Individual.FullName`]="{ item }">
               <span v-if="item.Individual">
                   <router-link :to="{ name: 'IndividualDetails', params: { id: item.Individual.IndividualId }}">
                    {{ item.Individual.FullName }}
                   </router-link>
               </span>
            </template>
            <template v-slot:[`item.Individual.individualPhones.PhoneNumber`]="{ item }">
                {{ item.Individual.individualPhones[0] ? maskPhone(item.Individual.individualPhones[0].PhoneNumber) : null }}
            </template>
            <template v-slot:[`item.StartDate`]="{ item }">
                {{ $filters.formatDate(item.TermStartDate) }}
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    import { maskPhoneNumber } from "../../../helpers/index.js";

    export default {
        name: "OfficerRolesListComponent",
        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },
        data: () => ({
            affiliateOfficers: [],
            loading: true,
            options: {
                sortBy: [{ key: 'AffiliateOfficerRole.officerRoleTitle.DisplayOrder', order: 'asc' }]
            },
            headers: [
                {title: 'Officer Name', sortable: true, value: 'Individual.FullName'},
                {title: 'Officer Roles', sortable: true, value: 'AffiliateOfficerRole.AffiliateOfficerRoleName'},
                {title: 'Start Date', value: 'StartDate'},
                {title: 'Phone Number', value: 'Individual.individualPhones.PhoneNumber'},
                {title: 'Email', value: 'Individual.individualEmails[0].Email'}
            ]
        }),
        mounted() {
            this.getDataFromApi();
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
                let url = '/api/v2/affiliate/' + this.affiliateId + '?include=affiliateOfficerRoles.officerRoleTitle,currentAffiliateOfficers.AffiliateOfficerRole,currentAffiliateOfficers.Individual.individualEmails,currentAffiliateOfficers.Individual.individualPhones';
                return axios.get(url)
                    .then(response => {
                        this.affiliateOfficers = response.data.data.currentAffiliateOfficers;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            maskPhone(phone) {
                return maskPhoneNumber(phone);
            }
        }
    }
</script>
<style scoped>
</style>
