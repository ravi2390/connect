<template>
    <v-container>
        <v-row justify="space-between">
            <v-col cols="12" md="4">

                <v-form ref="form">

                <v-text-field
                    v-model="affiliateName"
                    label="Affiliate"
                    variant="underlined"
                    :disabled="editMode"
                ></v-text-field>

                <v-text-field
                    v-model="employerName"
                    label="Employer"
                    variant="underlined"
                    :disabled="editMode"
                ></v-text-field>

                <v-text-field
                    v-model="unitName"
                    label="Unit"
                    variant="underlined"
                    :disabled="editMode"
                ></v-text-field>

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

        <v-row class="mt-8">
            <v-col cols="12" class="d-flex ga-4">
                <v-btn size="large" color="red" :to="{ name: 'jobClassList' }">Cancel</v-btn>
                <v-btn size="large" color="green" @click="editJobClass">Save Changes</v-btn>
            </v-col>
        </v-row>
                <v-row>
            <v-col cols="12">
                <v-data-table-server
                    v-model:options="options"
                    :loading="loading"
                    :headers="headers"
                    :items="individuallist"
                    :item-key="individuallist.IndividualId"
                    :items-length="individualTotal"
                    disable-sort
                >


                </v-data-table-server>
            </v-col>
        </v-row>

    </v-container>

</template>

<script>
    export default {
        name: 'LocalJobClassEditComponent',
        data: () => ({
            loading: false,
            errors: {},
            localJobClassName: null,
            localJobClassCode: null,
            nationalJobClass: null,
            unitName: null,
            employerName: null,
            affiliateName: null,
            localJobClassId: null,
            nationalJobClassList: [],
            individuallist: [],
            individualTotal: 0,
            editMode: true,
            headers: [
                { title: 'individual ID', value: 'IndividualId' },
                { title: 'individual Name', value: 'FirstName' },
                { title: 'individual Name', value: 'LastName' },
            ],
            options: {
                page: 1,
                itemsPerPage: 15,
            },
            rules: {
                    required: value => !!value || 'Required.'
                },
        }),
        computed: {
            haslocalJobClassNameError: function() { return this.errors && this.errors.hasOwnProperty('localJobClassName'); },
            haslocalJobClassCodeError: function() { return this.errors && this.errors.hasOwnProperty('localJobClassCode'); },
            hasnationalJobClassError: function() { return this.errors && this.errors.hasOwnProperty('nationalJobClass'); },
        },
        watch: {
            localJobClassName: function() { this.errors.localJobClassName = null; },
            localJobClassCode: function() { this.errors.localJobClassCode = null; },
            nationalJobClass: function() { this.errors.nationalJobClass = null; },
        },
        mounted() {
            this.getNationalJobClass();
            this.getLocalJobClass(this.$route.params.id);
            this.getIndividualsByJobclass(this.$route.params.id);
        },
        methods: {
            getLocalJobClass(jobClassId) {
                this.loading = true;
                axios.get('/admin/api/localjobclass/' + jobClassId)
                    .then(response => {
                        let self = this;
                        this.localJobClassId = response.data.LocalJobClassId;
                        this.localJobClassName = response.data.LocalJobClassName;
                        this.localJobClassCode = response.data.LocalJobClassCode;
                        this.nationalJobClass = response.data.NationalJobClass.NationalJobClassId;
                        this.affiliateName = response.data.AffiliateName;
                        this.employerName = response.data.EmployerName;
                        this.unitName = response.data.UnitName;

                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            getNationalJobClass() {
                axios.get('/admin/api/nationaljobclass?perPage=50').then((response) => {
                    this.nationalJobClassList = response.data.data;
                });
            },
            editJobClass() {
                axios.put('/admin/api/localjobclass/' + this.localJobClassId, {
                    localJobClassId: this.localJobClassId,
                    localJobClassName: this.localJobClassName,
                    localJobClassCode: this.localJobClassCode,
                    nationalJobClass: this.nationalJobClass,

                })
                    .then(response => {
                        this.$router.replace({ name: 'jobClassList' })
                    })
                    .catch(error => {
                        console.log(error.response.data.errors);
                        this.errors = error.response.data.errors;
                    })
                    .finally(() => {

                    });
            },

            getIndividualsByJobclass(localJobClassId) {
                this.loading = true;
                const { page, itemsPerPage } = this.options;
                axios.get('/admin/api/localjobclass/get-individuals-by-jobclass/'+localJobClassId+'?page=' + page
                    + '&perPage=' + itemsPerPage
                )
                    .then(response => {
                        this.individuallist = response.data.data;
                        this.options.itemsPerPage = response.data.meta.per_page;
                        this.individualTotal = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }

    }
</script>

<style scoped>
    .avatar::before {
        color: #092a5c;
        font-size: 200px;
    }
</style>
