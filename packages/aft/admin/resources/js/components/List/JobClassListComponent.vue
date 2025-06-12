<template>
  <v-container>
        <v-row>
            <v-col cols="12" sm="3">
                <v-text-field
                    v-model="searchJobClassName"
                    label="Search by Local Job Class Name"
                    variant="underlined"
                    clearable
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
                <v-text-field
                    v-model="searchUnitName"
                    label="Search by Unit Name"
                    variant="underlined"
                    clearable
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
                <v-text-field
                    v-model="searchAffiliateName"
                    label="Search by Affiliate Name"
                    variant="underlined"
                    clearable
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
                <v-btn color="#4caf50" :to="{ name: 'jobclassCreate' }" prepend-icon="mdi:mdi-account-plus">
                    Create LocalJobClass
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table-server
                    v-model:options="options"
                    :loading="loading"
                    :headers="headers"
                    :items="localjobclasslist"
                    :item-key="localjobclasslist.id"
                    :items-length="jobClassTotal"
                    disable-sort
                >
                    <template v-slot:[`item.edit`]="{ item }">
                        <v-btn icon="mdi:mdi-account-edit" color="primary" variant="text" :to="{ name: 'localJobClassEdit', params: { id: item.LocalJobClassId }}"></v-btn>
                    </template>

                    <template v-slot:[`item.NationalJobClass`]="{ item }">
                      <span v-if="item.NationalJobClass">
                        {{ item.NationalJobClass.NationalJobClassName }}
                      </span>
                    </template>

                    <template v-slot:[`item.Unit`]="{ item }">
                      <span v-if="item.Unit">
                        {{ item.Unit.UnitName }}
                      </span>
                    </template>

                    <template v-slot:item.IndividualEmployer="{ item }">
                      <span v-if="item.IndividualEmployer">
                        {{ item.IndividualEmployer.length }}
                      </span>
                    </template>

                </v-data-table-server>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
    import { debounce } from "lodash-es";

    export default {
        name: 'JobClassListComponent',
        data: () => ({
            loading: false,
            response: {
                meta: {
                    headers: [],
                },
            },
            headers: [
                { title: 'LocalJobClass ID', value: 'LocalJobClassId' },
                { title: 'LocalJobClass Name', value: 'LocalJobClassName' },
                { title: 'NationalJobClass Name', value: 'NationalJobClass' },
                { title: 'LocalJobClass Code', value: 'LocalJobClassCode' },
                { title: 'Unit ID', value: 'Unit.UnitId' },
                { title: 'Unit', value: 'Unit' },
                { title: 'Individuals Count', value: 'IndividualEmployer' },
                { title: 'Created', value: 'CreatedAt' },
                { title: 'Updated', value: 'UpdatedAt' },
                { title: 'Edit', value: 'edit' },
            ],
            localjobclasslist: [],
            options: {
                page: 1,
                itemsPerPage: 15,
            },
            jobClassTotal: 0,
            searchJobClassName: null,
            searchUnitName: null,
            searchAffiliateName: null,

        }),
        watch: {
            options: {
                handler() {
                    this.getDataFromApi();
                },
                deep: true,
                immediate: true,
            },
            searchJobClassName: function(value) { this.searchJobClass(value); },
            searchUnitName: function(value) { this.searchUnit(value); },
            searchAffiliateName: function(value) { this.searchAffiliate(value); },
        },
        mounted() {
            //this.getDataFromApi();
        },
        methods: {
            searchJobClass: debounce(function(search) {
                this.getDataFromApi();
            }, 500),
            searchUnit: debounce(function(search) {
                this.getDataFromApi();
            }, 500),
            searchAffiliate: debounce(function(search) {
                this.getDataFromApi();
            }, 500),
            getDataFromApi() {
                this.loading = true;
                const { page, itemsPerPage } = this.options;
                const jobClassName = this.searchJobClassName || '';
                const unitName = this.searchUnitName || '';
                const affiliateName = this.searchAffiliateName || '';
                axios.get('/admin/api/localjobclass?page=' + page
                    + '&perPage=' + itemsPerPage
                    + '&filterLocalJobClassName=' + jobClassName
                    + '&filterUnitName=' + unitName
                    + '&filterAffiliateName=' + affiliateName
                )
                    .then(response => {
                        this.localjobclasslist = response.data.data;
                        this.options.itemsPerPage = response.data.meta.per_page;
                        this.jobClassTotal = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }
    }
</script>
