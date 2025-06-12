<template>
    <v-form ref="form" v-model="valid" validate-on="submit" @submit.prevent="saveData">
        <v-card>
            <v-card-title>Edit Union Relationship</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" lg="8">
                        <v-select v-if="!editMode"
                                  :items="unionRelationships"
                                  label="Union Relationship"
                                  item-value="UnionRelationshipTypeId"
                                  item-title="UnionRelationshipTypeName"
                                  v-model="selectedUnionRelationshipTypeId"
                                  variant="underlined"
                        ></v-select>
                        <v-text-field v-else label="Union Relationship" v-model="selectedUnionRelationshipLabel" readonly disabled variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Affiliate:" v-model="selectedAffiliateName" readonly disabled variant="underlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="fieldVisible('Dues category')">
                    <v-col cols="12" lg="4">
                        <v-select
                            :items="duesCategories"
                            label="Dues category"
                            item-value="LocalDuesCategoryId"
                            item-title="LocalDuesCategoryName"
                            v-model="editableIndividualAffiliate.LocalDuesCategoryId"
                            :rules="[rules.required]"
                            variant="underlined"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-select
                            :items="paymentMethods"
                            label="Dues Payment Method"
                            item-value="PaymentMethodId"
                            item-title="PaymentMethodName"
                            v-model="editableIndividualAffiliate.PaymentMethodId"
                            variant="underlined"
                        ></v-select>

                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-select
                            :items="paymentFrequencies"
                            label="Dues Payment Frequency"
                            item-value="PaymentFrequencyId"
                            item-title="PaymentFrequencyName"
                            v-model="editableIndividualAffiliate.PaymentFrequencyId"
                            variant="underlined"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4">
                        <v-menu
                            :offset="40"
                            transition="scale-transition"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ props }">
                                <v-text-field
                                    v-model="editableIndividualAffiliate.StartDate"
                                    hint="YYYY-MM-DD"
                                    label="Start date"
                                    :rules="[rules.startEnd]"
                                    v-bind="props"
                                    variant="underlined"
                                ></v-text-field>
                            </template>
                            <v-date-picker model-value="editableIndividualAffiliate.StartDate" @input="updateStartDate" color="primary"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" lg="4" v-if="editMode">
                        <v-menu
                            :offset="40"
                            transition="scale-transition"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ props }">
                                <v-text-field
                                    v-model="editableIndividualAffiliate.EndDate"
                                    :rules="[rules.endStart, rules.stopReasonEndDate]"
                                    label="End date"
                                    hint="YYYY-MM-DD"
                                    v-bind="props"
                                    variant="underlined"
                                ></v-text-field>
                            </template>
                            <v-date-picker model-value="editableIndividualAffiliate.EndDate" v-on:update:modelValue="updateEndDate" color="primary"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" lg="4" v-if="editMode">
                        <v-select
                            :items="stopReasons"
                            label="Stop reason"
                            item-value="IndividualDeactivationReasonId"
                            item-title="IndividualDeactivationReasonName"
                            v-model="editableIndividualAffiliate.IndividualDeactivationReasonId"
                            :rules="[rules.stopReason]"
                            variant="underlined"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4" v-if="editMode" class="switches">
                        <v-switch color="accent" label="Currently Working" v-model="editableIndividualAffiliate.IsCurrent"></v-switch>
                    </v-col>
                </v-row>
                <v-row v-if="fieldVisible('Cope')">
                    <v-col cols="12" lg="4">
                        <v-text-field label="COPE Amount:" v-model="editableIndividualCope.CopeAmount" prefix="$" :rules="[rules.copeAmount, rules.copeDecimal, rules.copeAmountUpdate]"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-select
                            :items="paymentMethods"
                            label="COPE Payment Method"
                            item-value="PaymentMethodId"
                            item-title="PaymentMethodName"
                            v-model="editableIndividualCope.CopePaymentMethodId"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-select
                            :items="paymentFrequencies"
                            label="COPE Payment Frequency"
                            item-value="PaymentFrequencyId"
                            item-title="PaymentFrequencyName"
                            v-model="editableIndividualCope.CopePaymentFrequencyId"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions v-if="!readOnly">
                <v-spacer></v-spacer>
                <v-btn @click="onCancel" variant="elevated">Cancel</v-btn>
                <v-btn color="success" type="submit" variant="elevated">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
    <v-dialog
        v-model="dialog"
        max-width="290"
    >
        <v-card>
            <v-card-title class="text-h5">Warning</v-card-title>

            <v-card-text>
                Setting a Stop Reason and end date will update the individual's union relationship status.
                Please review your changes and confirm you want to proceed.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="dialog = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="doSaveData"
                >
                    Proceed
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
        v-model="dialog2"
        max-width="290"
    >
        <v-card>
            <v-card-title class="text-h5">Warning</v-card-title>

            <v-card-text>
                The Stop Reason selected cannot be completed. This individual record has a union relationship with another affiliate. Please contact the AFT for further assistance.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="dialog2 = false"
                >
                    OK
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { compareAsc, format, formatISO } from 'date-fns';
    import { clone } from "lodash-es";
    export default {
        name: "EditUnionRelationshipDataComponent",
        props: {
            individualAffiliate: {
                type: Object,
                required: true
            },
            individualCope: {
                type: Object,
                required: true
            },
            individual: {
                type: Object,
                required: true
            },
            readOnly: {
                type: Boolean,
                required: true
            },
            eduesStatus: {
                type: Boolean,
                required: false,
                default: false
            },
        },
        watch: {
            individualAffiliate: {
                handler (value) {
                    this.editableIndividualAffiliate = clone(value);
                    if (this.editableIndividualAffiliate.StartDate) {
                        this.editableIndividualAffiliate.StartDate = this.editableIndividualAffiliate.StartDate.split('T')[0];
                    }
                    if (this.editableIndividualAffiliate.EndDate) {
                        this.editableIndividualAffiliate.EndDate = this.editableIndividualAffiliate.EndDate.split('T')[0];
                    }

                    this.setupFormData();
                    if (this.individualAffiliate.UnionRelationshipTypeId) {
                        this.selectedUnionRelationshipTypeId = this.individualAffiliate.UnionRelationshipTypeId;

                        axios.get('/api/v2/custom/individual/stop-reasons/' + this.individualAffiliate.UnionRelationshipTypeId).then((response) => {
                            this.stopReasons = response.data.data;
                        });
                    }
                },
            },
            individualCope: {
                handler (value) {
                    this.editableIndividualCope = this.individualCope.IndividualCopeId ? clone(value) : value;
                },
                deep: true
            },
            selectedUnionRelationshipTypeId: {
                handler (value) {
                    this.editableIndividualAffiliate.UnionRelationshipTypeId = value;
                    this.selectedUnionRelationshipLabel = this.getSelectedUnionRelationshipLabel();
                    this.loadLocalDuesCategories();
                },
                deep: true
            }
        },
        data() {
            return {
                editableIndividualAffiliate: {},
                editableIndividualCope: {},
                selectedUnionRelationshipTypeId: null,
                chapters: [],
                unionRelationships: [],
                duesCategories: [],
                paymentMethods: [],
                paymentFrequencies: [],
                selectedAffiliateName: '',
                stopReasons: [],
                dialog: false,
                dialog2: false,
                valid: true,
                selectedUnionRelationshipLabel: '',
            }
        },
        mounted() {
            axios.get('/api/v2/gender').then((response) => {
                this.genders = response.data.data;
            });
            console.log('eduesStatus:', this.eduesStatus);
            if (this.selectedAffiliate) {
                if (this.editMode) {
                    axios.get('/api/v2/unionRelationshipType').then((response) => {
                        this.unionRelationships = response.data.data;
                    });
                } else {
                    axios.get('/api/v2/aggregate/individual/unionRelationshipType/' + this.selectedAffiliate.AffiliateId).then((response) => {
                        this.unionRelationships = response.data.data;

                        if (this.editableIndividualAffiliate.UnionRelationshipType && this.unionRelationships.findIndex(unionRelationshipType => unionRelationshipType.UnionRelationshipTypeId === this.selectedUnionRelationshipTypeId) !== -1) {
                            this.unionRelationships.unshift(this.editableIndividualAffiliate.UnionRelationshipType);
                        }
                    });
                }

                axios.get('/api/v2/chapter?sort=ChapterName&filter[AffiliateId]=' + this.selectedAffiliate.AffiliateId + '&filter[IsStructural]=0').then((response) => {
                    this.chapters = response.data.data;
                });
            }

            if (this.selectedUnionRelationshipTypeId) {
                this.selectedUnionRelationshipLabel = this.getSelectedUnionRelationshipLabel();
            }

            axios.get('/api/v2/paymentMethod').then((response) => {
                this.paymentMethods = response.data.data;
            });
            axios.get('/api/v2/paymentFrequency').then((response) => {
                this.paymentFrequencies = response.data.data;
            });

            this.editableIndividualAffiliate = clone(this.individualAffiliate);
            if (this.editableIndividualAffiliate.StartDate) {
                this.editableIndividualAffiliate.StartDate = this.editableIndividualAffiliate.StartDate.split('T')[0];
            }
            if (this.editableIndividualAffiliate.EndDate) {
                this.editableIndividualAffiliate.EndDate = this.editableIndividualAffiliate.EndDate.split('T')[0];
            }
            this.editableIndividualCope = clone(this.individualCope);
            this.setupFormData();
            this.loadLocalDuesCategories();
        },
        computed: {
            selectedAffiliate() {
                return this.$store.getters['user/selectedAffiliate'];
            },
            editMode() {
                return !!this.individualAffiliate.IndividualAffiliateId;
            },
            selectedAffiliateId() {
                return this.$store.getters['user/selectedAffiliate'].AffiliateId;
            },
            rules () {
                const rules = {};
                rules['required'] = value => !!value || 'Required.';

                rules['copeAmount'] = value =>  (this.editableIndividualCope.CopePaymentMethodId || this.editableIndividualCope.CopePaymentFrequencyId) ? (!!value || 'Required') : true;
                rules['copeAmountUpdate'] = value =>  (this.eduesStatus && parseFloat(this.individualCope.CopeAmount) === 0 && parseFloat(this.editableIndividualCope.CopeAmount) > 0) ? ' Individual needs to submit cope voluntarily' : true;
                rules['copeDecimal'] = value => value ? /^[+-]?(?=.?\d)\d*(\.\d{0,3})?/gm.test(value) || 'You cannot add more than 3 decimals' : true;
                rules['stopReasonEndDate'] = value =>  (this.editableIndividualAffiliate.IndividualDeactivationReasonId) ? (!!value || 'Required') : true;
                rules['stopReason'] = value =>  (this.editableIndividualAffiliate.EndDate) ? (!!value || 'Required') : true;
                rules['startEnd'] = value => (value && this.editableIndividualAffiliate.EndDate)
                    ? compareAsc(this.editableIndividualAffiliate.EndDate, value) > 0 || 'Start date should be before end date'
                    : true;
                rules['endStart'] = value => (value && this.editableIndividualAffiliate.StartDate)
                    ? compareAsc(value, this.editableIndividualAffiliate.StartDate) > 0 || 'Start date should be before end date'
                    : true;

                return rules
            },
        },
        methods: {
            updateStartDate(date) {
                this.editableIndividualAffiliate.StartDate = format(date, 'yyyy-MM-dd');
            },
            updateEndDate(date) {
                this.editableIndividualAffiliate.EndDate = format(date, 'yyyy-MM-dd');
            },
            async saveData(event) {
                const results = await event;
                if (!results.valid) {
                    return;
                }
                if (this.editableIndividualAffiliate.IndividualDeactivationReasonId && this.editableIndividualAffiliate.IndividualDeactivationReasonId !== this.individualAffiliate.IndividualDeactivationReasonId) {
                    this.dialog = true;
                    return;
                }

                this.doSaveData();
            },

            getSelectedUnionRelationshipLabel() {
                if (this.editableIndividualAffiliate.UnionRelationshipType) {
                    return this.editableIndividualAffiliate.UnionRelationshipType.UnionRelationshipTypeName;
                }
                const index = this.unionRelationships.findIndex((unionRelationship) => {
                    return unionRelationship.UnionRelationshipTypeId === this.selectedUnionRelationshipTypeId;
                });

                return (index >= 0) ? this.unionRelationships[index].UnionRelationshipTypeName : '';
            },

            doSaveData() {
                this.dialog = false;
                this.dialog2 = false;
                this.editableIndividualAffiliate.IndividualId = this.individual.IndividualId;
                this.editableIndividualAffiliate.IndividualCope = this.editableIndividualCope;
                this.editableIndividualAffiliate.IndividualCope.CopeAmount = this.editableIndividualCope.CopeAmount === undefined || this.editableIndividualCope.CopeAmount == "" || this.editableIndividualCope.CopeAmount == null ? "0.00" : this.editableIndividualCope.CopeAmount;
                this.editableIndividualAffiliate.StartDate = this.editableIndividualAffiliate.StartDate ? this.editableIndividualAffiliate.StartDate : formatISO(new Date());
                if (this.editMode) {
                    axios.put('/api/v2/custom/individualaffiliate/' + this.individualAffiliate.IndividualAffiliateId + '?include=Affiliate,UnionRelationshipType,LocalDuesCategory,IndividualDeactivationReason,PaymentMethod,PaymentFrequency&scope=global', this.editableIndividualAffiliate)
                        .then((response) => this.afterSave(response));
                } else {
                    this.editableIndividualAffiliate.AffiliateId = this.selectedAffiliateId;
                    this.editableIndividualAffiliate.IndividualCope = this.editableIndividualCope;
                    axios.post('/api/v2/individualAffiliate' + '?include=Affiliate,UnionRelationshipType,LocalDuesCategory,IndividualDeactivationReason,PaymentMethod,PaymentFrequency', this.editableIndividualAffiliate)
                        .then((response) => this.$emit('saved-individual-affiliate', {individualAffiliate: response.data.data, status: 205}));
                }
            },

            onCancel() {
                this.editableIndividualAffiliate = (!this.editMode) ? {} : clone(this.individualAffiliate);
                if (this.editableIndividualAffiliate.StartDate) {
                    this.editableIndividualAffiliate.StartDate = this.editableIndividualAffiliate.StartDate.split('T')[0];
                }
                if (this.editableIndividualAffiliate.EndDate) {
                    this.editableIndividualAffiliate.EndDate = this.editableIndividualAffiliate.EndDate.split('T')[0];
                }
                this.$emit('cancel-edit-individual-affiliate');
            },

            afterSave(response) {
                switch(response.status) {
                    case 205:
                        this.resetFormValues();
                        this.$emit('saved-individual-affiliate', {individualAffiliate: null, status: response.status});
                        break;
                    case 204:
                        this.resetFormValues();
                        this.$router.push({name: 'Individuals'});
                        break;
                    case 206:
                        this.dialog2 = true;
                        break;
                    case 200:
                        this.resetFormValues();
                        this.$emit('saved-individual-affiliate', {individualAffiliate: response.data, status: response.status});
                        break;
                    case 418:
                    default:
                        //@TODO: show an error message here:
                        console.log(response.statusText);
                }
            },

            resetFormValues() {
                this.$refs.form.reset();
                this.editableIndividualAffiliate = {};
                this.editableIndividualCope = {};
                this.selectedUnionRelationshipTypeId = null;
            },

            fieldVisible(fieldName) {
                if (!this.editableIndividualAffiliate.UnionRelationshipTypeId || this.unionRelationships.length === 0) {
                    return false;
                }

                let unionRelationship = this.unionRelationships.filter(unionRelationship => {
                    return unionRelationship.UnionRelationshipTypeId === this.editableIndividualAffiliate.UnionRelationshipTypeId;
                }).pop();

                if (!unionRelationship) {
                    unionRelationship = this.editableIndividualAffiliate.UnionRelationshipType;
                }

                if (!unionRelationship) {
                    return false;
                }

                switch (fieldName) {
                    case 'Dues category':
                        return unionRelationship.UnionRelationshipTypeName === 'Member' || unionRelationship.UnionRelationshipTypeName === 'Agency Fee Payer' || unionRelationship.UnionRelationshipTypeName === 'Retired Member' || this.isJoiningUnion();
                    case 'Cope':
                        return unionRelationship.UnionRelationshipTypeName === 'Member' && this.selectedAffiliate.hasCope;
                }

                return false;
            },

            isJoiningUnion() {
                if (!this.editableIndividualAffiliate.IndividualDeactivationReasonId) {
                    return false;
                }

                const stopReason = this.stopReasons.find((stopReason) => {return stopReason.IndividualDeactivationReasonId === this.editableIndividualAffiliate.IndividualDeactivationReasonId});

                return stopReason ? stopReason.IndividualDeactivationReasonName.toLowerCase() === 'joined union' : false;
            },

            setupFormData() {
                this.editableIndividualAffiliate.LocalDuesCategoryId = (this.individualAffiliate.UnionRelationshipType
                    && (this.individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName === 'Member' || this.individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName === 'Agency Fee Payer' || this.individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName === 'Retired Member')) ? this.editableIndividualAffiliate.LocalDuesCategoryId : null;

                this.editableIndividualAffiliate.PaymentMethodId = (this.individualAffiliate.UnionRelationshipType
                    && (this.individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName === 'Member' || this.individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName === 'Agency Fee Payer' || this.individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName === 'Retired Member')) ? this.editableIndividualAffiliate.PaymentMethodId : null;

                this.editableIndividualAffiliate.PaymentFrequencyId = (this.individualAffiliate.UnionRelationshipType
                    && (this.individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName === 'Member' || this.individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName === 'Agency Fee Payer' || this.individualAffiliate.UnionRelationshipType.UnionRelationshipTypeName === 'Retired Member')) ? this.editableIndividualAffiliate.PaymentFrequencyId : null;

                this.selectedAffiliateName = this.$store.getters['user/selectedAffiliate'].AffiliateName;
            },

            loadLocalDuesCategories() {
                // console.log(this.editableIndividualAffiliate.IndividualId, this.individual.IndividualId);
                if (this.editableIndividualAffiliate.UnionRelationshipTypeId) {
                    axios.get('/api/v2/custom/localduescategory/byunionrelationshiptype/' + this.editableIndividualAffiliate.UnionRelationshipTypeId + '/'  + this.individual.IndividualId).then((response) => {
                        this.duesCategories = response.data.data;
                    });
                }
            },
        }
    }
</script>

<style scoped>

</style>
