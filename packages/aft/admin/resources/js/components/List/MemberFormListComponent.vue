<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-btn color="#4caf50" :to="{ name: 'memberFormCreate' }">
                    ASSIGN TEMPLATE
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="3">
                <v-text-field
                    v-model="searchAffiliateNameValue"
                    label="Search by Affiliate name"
                    variant="underlined"
                    clearable
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
                <v-text-field
                    v-model="searchAffiliateNumberValue"
                    label="Search by Affiliate number"
                    clearable
                    variant="underlined"
                ></v-text-field>
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
                    :multiple="true"

                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table-server
                    v-model:options="options"
                    :loading="loading"
                    :headers="headers"
                    :items="memberForms"
                    :item-key="memberForms.id"
                    :items-length="memberFormAssignTotal"
                    disable-sort
                >
                    <template v-slot:[`item.type`]="{ item }">
                        <span>{{ displayTypes(item.type) }}</span>
                    </template>
                    <template v-slot:[`item.edit`]="{ item }">
                        <v-btn icon="mdi:mdi-comment-edit" color="primary" variant="text" :to="{ name: 'memberFormEdit', params: { id: item.id }}"></v-btn>
                    </template>

                    <template v-slot:[`item.delete`]="{ item }">
                        <v-btn icon="mdi:mdi-delete" color="red" variant="text" @click="openDeleteMemberForm(item.id)"></v-btn>
                    </template>
                </v-data-table-server>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
            <v-card-title class="text-h5">Are you sure?</v-card-title>
            <v-card-text>This record will be deleted permanently.</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn color="red-darken-1" variant="text" @click="dialog = false">NO</v-btn>
                <v-btn color="green-darken-1" variant="text" @click="deleteContentBlock">YES</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import { debounce } from "lodash-es";

    export default {
        name: 'MemberFormListComponent',
        data: () => ({
            loading: false,
            headers: [
                { title: 'AffiliateName', value: 'affiliates.AffiliateName' },
                { title: 'AffiliateNumber', value: 'affiliates.AffiliateNumber' },
                { title: 'Type', value: 'type' },
                { title: 'Edit', value: 'edit' },
                { title: 'Delete', value: 'delete' }
            ],
            options: {
                page: 1,
                itemsPerPage: 15,
            },
            memberForms: [],
            memberFormAssignTotal: 0,
            typesList: [
                { 'value': '3', 'label': 'Payroll Deduction' },
                { 'value': '4', 'label': 'Payroll Deduction and COPE' },
                { 'value': '5', 'label': 'Payroll COPE' },
                { 'value': '1', 'label': 'eDues' },
                { 'value': '2', 'label': 'eDues and COPE' },
                { 'value': '6', 'label': 'Recurring COPE' },
                { 'value': '100', 'label': 'ALL templates' }
            ],
            dialog: false,
            memberFormAssignId:null,
            searchAffiliateNumberValue: null,
            searchAffiliateNameValue: null,
            searchFormTypeValue: null
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
            searchAffiliateNameValue: function(value) { this.searchAffiliateName(value); },
            searchFormTypeValue: function(value) { this.searchFormType(value); },
        },

        methods: {
            searchAffiliateNumber: debounce(function(search) {
                this.getDataFromApi();
            }, 500),
            searchAffiliateName: debounce(function(search) {
                this.getDataFromApi();
            }, 500),
            searchFormType: debounce(function(search) {
                this.getDataFromApi();
            }, 500),
            getDataFromApi() {
                this.loading = true;
                const { page, itemsPerPage } = this.options;
                axios.post('/admin/api/member-form-assign/search?page=' + page
                    + '&perPage=' + itemsPerPage, {
                    affiliateNumber: this.searchAffiliateNumberValue,
                    affiliateName: this.searchAffiliateNameValue,
                    formType: this.searchFormTypeValue
                    }
                )
                    .then(response => {
                      console.log({ data: response.data })
                        this.memberForms = response.data.data;
                        this.memberForms.forEach( i => i.type = JSON.parse(i.type));
                        this.options.itemsPerPage = response.data.meta.per_page;
                        this.memberFormAssignTotal = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            openDeleteMemberForm(memberFormId) {
                this.dialog = true;
                this.memberFormAssignId = memberFormId;
            },
            deleteContentBlock() {
                this.dialog = false;
                 axios.delete('/admin/api/member-form-assign/' + this.memberFormAssignId)
                    .then(response => {
                        this.getDataFromApi();
                    })
                    .catch(error => {

                    })
                    .finally(() => {

                    });
            },
            displayTypes(types) {
              const typeMap = {
                '1': 'eDues',
                '2': 'eDues and COPE',
                '3': 'Payroll Deduction',
                '4': 'Payroll Deduction and COPE',
                '5': 'Payroll COPE',
                '6': 'Recurring COPE',
                '100': 'ALL templates',
                '101': 'ALL eDues templates',
                '102': 'ALL Payroll templates',
              };
              return types.map(type => typeMap[type]).join(', ');
            },
        }
    }
</script>
