<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Local Dues Category
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
            <v-table>
                <thead>

                <tr style="background-color: #092A5C; color:#7AB8DA;">
                    <th>Category Name:</th>
                    <th>National Per-Capita Category:</th>
                    <th>State Per-Capita Category:</th>
                    <th>Amount/Percentage:</th>
                    <th>Frequency:</th>
                    <th>Start Date:</th>
                    <th>End Date:</th>
                    <th>Active Individuals:</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="(affiliateduescategry) in affiliate.affiliateDuesCategory" :key="affiliateduescategry.LocalDuesCategoryId">
                    <td>{{ affiliateduescategry.LocalDuesCategoryName}}</td>
                    <td>{{ affiliateduescategry.NationalPerCapita.NationalPerCapitaName}}</td>
                    <td>
                        <span v-if="affiliateduescategry.StatePerCapita">
                            {{ affiliateduescategry.StatePerCapita.StatePerCapitaName}}
                        </span>
                        <span v-else>Null</span>
                    </td>
                    <td>
                        <span v-if="affiliateduescategry.LocalDuesPercentage == ''">
                            ${{ affiliateduescategry.LocalDuesAmount }}
                        </span>
                        <span v-else>%{{ affiliateduescategry.LocalDuesPercentage}}</span>
                    </td>
                    <td>
                        <span v-if="affiliateduescategry.PaymentFrequency">
                            {{ affiliateduescategry.PaymentFrequency.PaymentFrequencyName}}
                        </span>
                        <span v-else> Null </span>
                    </td>
                    <td>
                        <span v-if="affiliateduescategry.StartDate">
                            {{ $filters.formatDate(affiliateduescategry.StartDate) }}
                        </span>
                        <span v-else> Null </span>
                    </td>
                    <td>
                        <span v-if="affiliateduescategry.EndDate">
                            {{ $filters.formatDate(affiliateduescategry.EndDate) }}
                        </span>
                        <span v-else> Null </span>
                    </td>
                    <td @click="navigateToIndividuals(affiliateduescategry.LocalDuesCategoryId)" style="cursor: pointer;">
                        <div v-if="affiliateduescategry.ActiveIndividuals">
                            {{ affiliateduescategry.ActiveIndividuals }}
                        </div>
                        <div v-else>Null</div>
                    </td>
                </tr>
                </tbody>
            </v-table>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "LocalDuesCategoryComponent",

        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },

          data: () => ({
            id: '',
            affiliate: {},
            loading: false,

        }),

        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },
            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/affiliate/' + this.affiliateId + '?include=affiliateDuesCategory,affiliateDuesCategory.StatePerCapita,affiliateDuesCategory.NationalPerCapita,affiliateDuesCategory.PaymentFrequency&scope=global';

                return axios.get(url)
                    .then(response => {
                        this.affiliate = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            navigateToIndividuals(localDuesCategoryId) {
                const urlParams = new URLSearchParams({
                    sortByField: 'FullName',
                    sortDirection: 'false',
                    page: '1',
                    itemsPerPage: '10',
                    'filter:activeIndividualAffiliates.LocalDuesCategoryId': localDuesCategoryId
                });
                this.$router.push({ path: 'Individuals', query: Object.fromEntries(urlParams) });
            }
        }
    }
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  text-align: left;
}

</style>
