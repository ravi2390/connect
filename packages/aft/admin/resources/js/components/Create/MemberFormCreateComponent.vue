<template>
    <v-container>
        <v-form ref="form" v-model="valid">
        <v-row>
            <v-col cols="12" sm="6">
                <v-autocomplete
                    label="Select Affiliate"
                    v-model="selectedAffiliateId"
                    v-model:search="affiliatesSearchText"
                    :items="affiliates"
                    :custom-filter="customAffiliateFilter"
                    :loading="affiliatesSearchLoading"
                    item-title="AffiliateName"
                    item-value="AffiliateId"
                    variant="underlined"
                    placeholder="Select Affiliate"
                    persistent-hint
                    hide-no-data
                    :rules="[rules.required]"
                    v-on:click="fetchAffiliateData('');"
                >
                    <template v-slot:item="{ props, item }">
                        <v-list-item
                            v-bind="props"
                            :title="item.raw.AffiliateName + ' (' + item.raw.AffiliateNumber + ')'"
                        ></v-list-item>
                    </template>
                    <template v-slot:progress>
                        <v-progress-linear
                            indeterminate
                            height="5"
                            color="#3f98c9"
                            absolute
                        ></v-progress-linear>
                    </template>
                </v-autocomplete>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6">
                <v-select
                    :items="typesList"
                    multiple
                    label="Collection Type"
                    item-value="value"
                    item-title="label"
                    v-model="memberFormType"
                    variant="underlined"
                    :rules="[rules.required]"
                ></v-select>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title />
                <v-card-text>As you have selected "All templates", other options have been unselected</v-card-text>
                <v-card-actions>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="dialog = false"
                    >
                        Dismiss
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialogAffiliateTaken"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title />
                <v-card-text>This affiliate has already been taken, please choose a different one</v-card-text>
                <v-card-actions>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="dialogAffiliateTaken = false"
                    >
                        Dismiss
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-row class="mt-8">
            <v-col cols="12" class="d-flex ga-4">
                <v-btn size="large" color="red" :to="{ name: 'memberFormsList' }">Cancel</v-btn>
                <v-btn size="large" color="green" @click="saveMemberFormAssign">Save Changes</v-btn>
            </v-col>
        </v-row>
        </v-form>
    </v-container>
</template>

<script>
    import {debounce} from "lodash-es";

    export default {
        name: 'MemberFormCreateComponent',
        data: () => ({
            affiliates: [],
            affiliatesSearchText: null,
            affiliatesSearchLoading: false,
            selectedAffiliateId: null,
            valid: true,
            rules: {
                required: value => !!value || 'Required.'
            },
            typesList: [
                { 'value': '100', 'label': 'ALL templates' },
                // { 'value': '3', 'label': 'Payroll Deduction' },
                { 'value': '4', 'label': 'Payroll Deduction and COPE' },
                { 'value': '5', 'label': 'Payroll COPE' },
                // { 'value': '1', 'label': 'eDues' },
                { 'value': '2', 'label': 'eDues and COPE' },
                { 'value': '6', 'label': 'Recurring COPE' },
                { 'value': '8', 'label': 'State Fed Recurring COPE' },
                { 'value': '9', 'label': 'eDues and COPE Retiree only' },
            ],
            memberFormType:null,
            dialog: false,
            dialogAffiliateTaken: false,
        }),
        methods: {
            isOptionDisabled(item) {
                return this.memberFormType && this.memberFormType.includes('100') && item.value !== '100';
            },
            saveMemberFormAssign() {
                if (!this.$refs.form.validate()) {
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    return;
                }
                axios.post('/admin/api/member-form-assign', {
                    affiliate_id: this.selectedAffiliateId,
                    type: this.memberFormType
                })
                    .then(response => {
                        this.$router.replace({ name: 'memberFormsList' })
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
                        console.log('error', this.errors);
                        if(this.errors.affiliate_id){
                            this.dialogAffiliateTaken = true;
                        }
                    })
                    .finally(() => {

                    });

            },
            getAffiliateLabel(affiliate) {
                let label =  affiliate.AffiliateName;
                if (affiliate.AffiliateId > 0) {
                    label += ' (' + affiliate.AffiliateNumber + ')'
                }
                return label;
            },
            fetchAffiliateData: debounce(function(searchText) {
                this.affiliatesSearchLoading = true;
                axios.post('/api/v2/search/affiliate?scope=global', {
                    search: searchText
                })
                    .then(response => {
                        this.affiliates = response.data.data;
                        this.affiliatesSearchLoading = false;
                    });
            }, 500),
            customAffiliateFilter(value, queryText, item) {
                const searchText = queryText.toLowerCase();
                return item.raw.AffiliateName.toLowerCase().includes(searchText) || item.raw.AffiliateNumber.toLowerCase().includes(searchText);
            },
        },
        watch: {
            affiliatesSearchText(text) {
                this.fetchAffiliateData(text);
            },
            memberFormType: function ( value ) {
                if(value && value.includes('100') && value.length > 1){
                    this.dialog = true;
                    this.memberFormType.splice(0);
                    this.memberFormType[0] = '100';
                }
            },
        }
    }
</script>

<style>
    .textFieldHeader input { font-size: 1.1rem; }
</style>
