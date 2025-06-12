<template>
    <v-container>
        <v-form ref="form" v-model="valid">
        <v-row>
            <v-col cols="12" sm="6">
                <v-autocomplete
                    :label="affiliateText"
                    v-model="selectedAffiliate"
                    :items="affiliates"
                    item-title="AffiliateName"
                    item-value="AffiliateId"
                    variant="underlined"
                    :placeholder="affiliateText"
                    persistent-hint
                    readonly
                    hide-no-data
                    :rules="[rules.required]"
                >
                    <template v-slot:item="data">
                        {{ getAffiliateLabel(data.item) }}
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
        <v-row class="mt-8">
            <v-col cols="12" class="d-flex ga-4">
                <v-btn size="large" color="red" :to="{ name: 'memberFormsList' }">Cancel</v-btn>
                <v-btn size="large" color="green" @click="editMemberForm">Save Changes</v-btn>
            </v-col>
        </v-row>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: 'ContentBlockEditComponent',
        data: () => ({
            memberFormAssignId: null,
            affiliates: [],
            selectedAffiliateId: null,
            selectedAffiliate: null,
            valid:true,
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
            dialog: false
        }),
        computed: {
            affiliateText() {
                if (this.selectedAffiliate) {
                    return (this.selectedAffiliate.AffiliateNumber + ' - ' + this.selectedAffiliate.AffiliateName);
                }
                return "Selected Affiliate";
            },
        },
        mounted() {
            this.getMemberForm(this.$route.params.id);
        },
        methods: {
            getMemberForm(memberFormAssignId) {
                this.loading = true;
                axios.get('/admin/api/member-form-assign/' + memberFormAssignId)
                    .then(response => {
                        this.selectedAffiliate = response.data.affiliates ? response.data.affiliates: {};
                        this.memberFormAssignId = response.data.id;
                        this.selectedAffiliateId = response.data.affiliate_id;
                        this.memberFormType = JSON.parse(response.data.type);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            editMemberForm() {
                if (!this.$refs.form.validate()) {
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    return;
                }
                axios.put('/admin/api/member-form-assign/' + this.memberFormAssignId, {
                    affiliate_id: this.selectedAffiliateId,
                    type: this.memberFormType
                })
                    .then(response => {
                        this.$router.replace({ name: 'memberFormsList' })
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
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
        },
        watch: {
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
