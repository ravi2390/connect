<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="3">
                <v-text-field
                    v-model="searchAffiliateNumberValue"
                    label="Search by Affiliate number"
                    clearable
                    variant="underlined"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
                <v-autocomplete
                    label="Search by State Feds"
                    :items="stateFeds"
                    item-value="AffiliateId"
                    item-title="AffiliateName"
                    v-model="searchStateFedValue"
                    variant="underlined"
                >
                </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3">
                <v-select
                    :items="typesList"
                    label="Search by Form Type"
                    item-value="value"
                    item-title="label"
                    clearable
                    v-model="searchFormTypeValue"
                    variant="underlined"
                ></v-select>
            </v-col>
            <v-col cols="12" sm="3">
                <v-select
                    :items="statusList"
                    label="Search by Form Status"
                    item-value="value"
                    item-title="label"
                    clearable
                    v-model="searchFormStatusValue"
                    variant="underlined"
                ></v-select>
                <v-btn color="default"
                    class="mb-4 btn-block actionButtons" @click="clearSearch">Clear</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table-server
                    v-model:options="options"
                    :loading="loading"
                    :headers="headers"
                    :items="forms"
                    :item-key="forms.id"
                    :items-length="formTotal"
                    disable-sort
                >
                    <template v-slot:[`item.FormSubmissions`]="{ item }">
                       <div> {{ item.FormSubmissions.length }}</div>
                    </template>
                     <template v-slot:[`item.Affiliate`]="{ item }">
                       <div> {{ item.Affiliate.AffiliateNumber }}</div>
                    </template>
                     <template v-slot:[`item.Template`]="{ item }">
                       <div> {{ item.Template.display_name }}</div>
                    </template>
                     <template v-slot:[`item.CreatedBy`]="{ item }">
                       <div> {{ item.CreatedBy.name }}</div>
                    </template>
                     <template v-slot:[`item.UpdatedBy`]="{ item }">
                       <div> {{ item.UpdatedBy.name }}</div>
                    </template>
                    <template v-slot:[`item.url`]="props">
                        <a :href="'/app/memberforms' + props.item.url">{{ props.item.url }}</a>
                    </template>
                </v-data-table-server>
            </v-col>
        </v-row>
        <loading-component :loading="loading"></loading-component>
    </v-container>
</template>

<script>
    import { debounce } from "lodash-es";
    import LoadingComponent from "../Common/LoadingComponent.vue";

    export default {
        name: 'MfpListComponent',
        components: { LoadingComponent },
        data: () => ({
            loading: false,
            headers: [
                { title: 'Form Name', value: 'system_name' },
                { title: 'Form Title', value: 'display_name' },
                { title: 'Form Type', value: 'Template' },
                { title: 'URL', value: 'url' },
                { title: 'Number of Submissions', value: 'FormSubmissions' },
                { title: 'Affiliate Number', value: 'Affiliate' },
                { title: 'Created By', value: 'CreatedBy' },
                { title: 'Updated By', value: 'UpdatedBy' }
            ],
            options: {
                page: 1,
                itemsPerPage: 15,
            },
            forms: [],
            formTotal: 0,
            typesList: [
                { 'value': '1', 'label': 'Payroll Deduction' },
                { 'value': '2', 'label': 'Payroll Deduction And COPE' },
                { 'value': '3', 'label': 'COPE' },
                { 'value': '4', 'label': 'Payment processing - Dues' },
                { 'value': '5', 'label': 'Payment processing - Dues and Cope' },
                { 'value': '6', 'label': 'Payment Processing COPE' },
                { 'value': '8', 'label': 'State Fed Recurring COPE' },
            ],
            statusList: [
                { 'value': '', 'label': 'All' },
                { 'value': '1', 'label': 'Active' },
                { 'value': '2', 'label': 'Archive' },
            ],
            searchAffiliateNumberValue: null,
            searchFormTypeValue: null,
            searchStateFedValue: null,
            searchFormStatusValue: null,
            stateFeds: []
        }),
        watch: {
            options: {
                handler() {
                    this.getDataFromApi();
                },
                deep: true,
                immediate: true,
            },
            searchAffiliateNumberValue: function(value) { this.searchAffiliateNumber(value); },
            searchFormTypeValue: function(value) { this.searchFormType(value); },
            searchStateFedValue: function(value) { this.searchStateFed(value); },
            searchFormStatusValue: function(value) { this.searchFormStatus(value); },
        },
        mounted() {
            axios.get('/api/v2/affiliate?scope=global&sort=AffiliateName&filter[AffiliateTypeId]=2&per_page=100')
            .then(response => {
                this.stateFeds = this.addEmptyElement(response.data.data, 'AffiliateName', 'AffiliateId');
            });
        },
        methods: {
            addEmptyElement(data, labelName, valueName) {
                const empty = {};
                empty[labelName] = '';
                empty[valueName] = '';
                data.unshift(empty);
                return data;
            },
            clearSearch(){
                this.searchAffiliateNumberValue = null;
                this.searchFormTypeValue =  null;
                this.searchStateFedValue = null;
                this.searchFormStatusValue =  null;
                this.options.page = 1;
                this.getDataFromApi();
            },
            searchAffiliateNumber: debounce(function(search) {
                this.options.page = 1;
                this.getDataFromApi();
            }, 500),
            searchFormType: debounce(function(search) {
                this.options.page = 1;
                this.getDataFromApi();
            }, 500),
            searchFormStatus: debounce(function(search) {
                this.options.page = 1;
                this.getDataFromApi();
            }, 500),
            searchStateFed: debounce(function(search) {
                this.options.page = 1;
                this.getDataFromApi();
            }, 500),
            getDataFromApi() {
                this.loading = true;
                const { page, itemsPerPage } = this.options;
                axios.post('/admin/api/form/search?page=' + page
                    + '&perPage=' + itemsPerPage, {
                    affiliateNumber: this.searchAffiliateNumberValue,
                    formType: this.searchFormTypeValue,
                    stateFed: this.searchStateFedValue,
                    status: this.searchFormStatusValue
                    }
                )
                    .then(response => {
                        this.forms = response.data.data;
                        this.options.itemsPerPage = response.data.meta.per_page;
                        this.formTotal = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        }
    }
</script>

<style scoped>

</style>
