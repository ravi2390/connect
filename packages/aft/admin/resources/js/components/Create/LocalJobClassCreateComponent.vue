<template>
    <v-container>
        <v-row justify="space-between">
            <v-col cols="12" md="4">

                <v-form ref="form">

                    <v-autocomplete
                        :loading="loading"
                        v-model="selectedAffiliateId"
                        v-model:search="searchText"
                        item-value="AffiliateId"
                        item-title="display_name"
                        :items="affiliates"
                        label="Affiliate"
                        variant="underlined"
                        return-object
                        no-data-text="Enter text to search..."
                        :error="hasselectedAffiliateIdError"
                        required
                    ></v-autocomplete>

                <v-autocomplete
                    v-model="selectedEmployerId"
                    :items="employers"
                    item-title="EmployerName"
                    item-value="EmployerId"
                    variant="underlined"
                    persistent-hint
                    :rules="[rules.required]"
                >
                    <template #label>
                        <span v-if="rules.required" class="text-red">* </span>Search for an employer
                    </template>
                </v-autocomplete>

                <v-select
                    :items="units"
                    item-value="UnitId"
                    item-title="UnitName"
                    v-model="unit"
                    variant="underlined"
                    :rules="[rules.required]"
                >
                    <template #label>
                        <span v-if="rules.required" class="text-red">* </span>Unit
                    </template>
                </v-select>

                <v-select
                    :items="nationalJobClassList"
                    item-value="NationalJobClassId"
                    item-title="NationalJobClassName"
                    v-model="nationalJobClass"
                    variant="underlined"
                    :rules="[rules.required]"
                >
                    <template #label>
                        <span v-if="rules.required" class="text-red">* </span>NationalJobClass
                    </template>
                </v-select>

                <v-text-field
                    v-model="localJobClassName"
                    label="LocalJobClass Name"
                    variant="underlined"
                    :error="haslocalJobClassNameError"
                    :error-messages="errors.localJobClassName"
                ></v-text-field>

                <v-text-field
                    v-model="localJobClassCode"
                    label="localjobclass Code"
                    variant="underlined"
                    :error="haslocalJobClassCodeError"
                    :error-messages="errors.localJobClassCode"
                ></v-text-field>


                </v-form>

            </v-col>
        </v-row>

        <v-row class="mt-4">
            <v-col cols="12" class="d-flex ga-4">
                <v-btn size="large" class="bg-red" :to="{ name: 'jobClassList' }">Cancel</v-btn>
                <v-btn size="large" color="green" @click="createJobclass">Create LocalJobClass</v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import { debounce } from "lodash-es";

    export default {
        name: 'LocalJobClassCreateComponent',
        data: () => ({
            loading: false,
            localJobClassName: null,
            localJobClassCode: null,
            nationalJobClass: null,
            unit: null,
            selectedEmployerId: null,
            selectedAffiliateId: null,
            searchText: null,
            units:[],
            employers: [],
            affiliates: [],
            nationalJobClassList: [],
            rules: {
                    required: value => !!value || 'Required.'
                },
            errors: {}
        }),
        computed: {
            haslocalJobClassNameError: function() { return this.errors && this.errors.hasOwnProperty('localJobClassName'); },
            haslocalJobClassCodeError: function() { return this.errors && this.errors.hasOwnProperty('localJobClassCode'); },
            hasnationalJobClassError: function() { return this.errors && this.errors.hasOwnProperty('nationalJobClass'); },
            hasselectedAffiliateIdError: function() { return this.errors && this.errors.hasOwnProperty('selectedAffiliateId'); },
            hasunitError: function() { return this.errors && this.errors.hasOwnProperty('unit'); },
        },
        watch: {
            localJobClassName: function() { this.errors.localJobClassName = null; },
            localJobClassCode: function() { this.errors.localJobClassCode = null; },
            nationalJobClass: function() { this.errors.nationalJobClass = null; },
            unit: function() { this.errors.unit = null; },

            selectedAffiliateId: {
                handler(value) {
                    if (value) {
                    this.getEmployers(this.selectedAffiliateId.AffiliateId);
;
                    }
                    return value;
                },
                deep: true
            },

            selectedEmployerId: {
                handler(value) {
                    if (value) {
                        this.loadOptions(value);
                    }
                    return value;
                },
                deep: true
            },
            searchText: {
                handler(value) {
                    this.affiliateSearch(value)
                },
            },
        },
        mounted() {
            this.getNationalJobClass();
        },
        methods: {

            affiliateSearch: debounce(function(search) {
                if (!search) { return; }
                if (this.selectedAffiliateId && this.selectedAffiliateId.display_name === search) { return; }
                this.loading = true;
                axios.post('/admin/api/affiliate/search', {search: search})
                    .then(response => {
                        this.affiliates = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }, 500),
            getEmployers(affiliateId) {
            if (affiliateId) {
                axios.get('/api/v2/aggregate/employer/byaffiliate/' + affiliateId).then((response) => {
                    this.employers = response.data.data;
                });
            }
        },
            loadOptions(employerId) {
                axios.get('/api/v2/aggregate/employer/units/' + employerId).then((response) => {
                    this.units = response.data.data;
                });
            },

            getNationalJobClass() {
                axios.get('/admin/api/nationaljobclass?perPage=100').then((response) => {
                    this.nationalJobClassList = response.data.data;
                });
            },
            createJobclass() {
                axios.post('/admin/api/localjobclass', {
                    localJobClassName: this.localJobClassName,
                    localJobClassCode: this.localJobClassCode,
                    nationalJobClass: this.nationalJobClass,
                    unit: this.unit,
                })
                    .then(response => {
                         this.$router.replace({ name: 'localJobClassEdit', params: { id: response.data.localjobclassid } })
                    })
                    .catch(error => {
                        console.log(error.response.data.errors);
                        this.errors = error.response.data.errors;
                    })
                    .finally(() => {

                    });
            }
        }
    }
</script>

<style scoped>
    .avatar::before {
        color: #4caf50;
        font-size: 200px;
    }
</style>
