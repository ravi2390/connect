<template>
    <v-card>
        <v-card-title>{{ label }}</v-card-title>
        <v-card-text>
            <v-alert type="error" v-model="showAlert" closable>
                {{ alertMessage }}
            </v-alert>
            <v-row>
                <v-col cols="12" lg="3">
                    <v-select
                        :items="prefixes"
                        label="Prefix"
                        item-value="PrefixId"
                        item-title="PrefixName"
                        v-model="editableIndividual.PrefixId"
                        variant="underlined"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="3">
                    <v-text-field v-model="editableIndividual.FirstName" :rules="[rules.required]" variant="underlined">
                        <template #label>
                            <span v-if="rules.required" class="text-red">* </span>First name:
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" lg="3">
                    <v-text-field label="Middle name:" v-model="editableIndividual.MiddleName" variant="underlined"></v-text-field>
                </v-col>

                <v-col cols="12" lg="3">
                    <v-text-field v-model="editableIndividual.LastName" :rules="[rules.required]" variant="underlined">
                        <template #label>
                            <span v-if="rules.required" class="text-red">* </span>Last name:
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="3">
                    <v-select
                        :items="suffixes"
                        label="Suffix"
                        item-value="SuffixId"
                        item-title="SuffixName"
                        v-model="editableIndividual.SuffixId"
                        variant="underlined"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="3">
                    <v-text-field label="Preferred name:" v-model="editableIndividual.PreferredName" variant="underlined"></v-text-field>
                </v-col>
                <v-col cols="12" lg="3">
                    <v-text-field label="Original last name:"
                                  v-model="editableIndividual.PreviousName" variant="underlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row v-if="!editMode">
                <v-col cols="12" lg="8">
                    <v-select
                        :items="unionRelationships"
                        item-value="UnionRelationshipTypeId"
                        item-title="UnionRelationshipTypeName"
                        v-model="computedUnionRelationshipTypeId"
                        :rules="[rules.required]"
                        :readonly="readOnly"
                        variant="underlined"
                    >
                        <template #label>
                            <span v-if="rules.required" class="text-red">* </span>Union Relationship
                        </template>
                    </v-select>
                </v-col>
                <v-col cols="12" lg="4">
                    <v-select
                        :items="affiliateOptions"
                        label="Affiliate"
                        item-value="AffiliateId"
                        item-title="AffiliateName"
                        v-model="selectedAffiliateId"
                        readonly
                        disabled
                        variant="underlined"
                    ></v-select>
                    <AffiliateSwitchComponent
                        v-if="switchAffiliate && !sameAffiliate"
                        component-name="IndividualNew2"
                        param-name="submissionId"
                        :param-value="submissionId"
                        :display-value="switchName"
                        :affiliate-id="switchAffiliate.AffiliateId"
                        :affiliate-name="switchAffiliate.AffiliateName"
                        :affiliate-number="switchAffiliate.AffiliateNumber"
                    />
                </v-col>
            </v-row>
            <v-row v-if="!editMode">
                <v-col cols="12" lg="4" v-if="fieldVisible('Chapter')">
                    <v-select
                        :items="chapters"
                        label="Chapter"
                        item-value="ChapterId"
                        item-title="ChapterName"
                        v-model="editableIndividual.selectedChapter"
                        variant="underlined"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="3">
                    <v-menu
                        :offset="40"
                        transition="scale-transition"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ props }">
                            <v-text-field
                                v-model="editableIndividual.startDate"
                                hint="YYYY-MM-DD"
                                :rules="[rules.required]"
                                v-bind="props"
                                variant="underlined"
                            >
                            <template #label>
                                <span v-if="rules.required" class="text-red">* </span>Start date
                            </template>
                        </v-text-field>
                        </template>
                        <v-date-picker v-model="editableIndividual.startDate" no-title scrollable></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row v-if="!editMode && fieldVisible('Dues category')">
                <v-col cols="12" lg="4">
                    <v-select
                        :items="duesCategories"
                        item-value="LocalDuesCategoryId"
                        item-title="LocalDuesCategoryName"
                        :rules="[rules.required]"
                        v-model="editableIndividual.selectedDuesCategory"
                        variant="underlined"
                    >
                        <template #label>
                            <span v-if="rules.required" class="text-red">* </span>Dues category
                        </template>
                    </v-select>
                </v-col>
                <v-col cols="12" lg="4">
                    <v-select
                        :items="paymentMethods"
                        label="Dues Payment Method"
                        item-value="PaymentMethodId"
                        item-title="PaymentMethodName"
                        v-model="editableIndividual.PaymentMethodId"
                        variant="underlined"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="4">
                    <v-select
                        :items="paymentFrequencies"
                        label="Dues Payment Frequency"
                        item-value="PaymentFrequencyId"
                        item-title="PaymentFrequencyName"
                        v-model="editableIndividual.PaymentFrequencyId"
                        variant="underlined"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row v-if="!editMode && fieldVisible('Cope')">
                <v-col cols="12" lg="4">
                    <v-text-field label="COPE Amount:" v-model="editableIndividual.copeAmount" prefix="$" :rules="[rules.copeAmount, rules.copeDecimal]" variant="underlined"></v-text-field>
                </v-col>
                <v-col cols="12" lg="3">
                    <v-select
                        :items="paymentMethods"
                        label="COPE Payment Method"
                        item-value="PaymentMethodId"
                        item-title="PaymentMethodName"
                        v-model="editableIndividual.selectedPaymentMethod"
                        variant="underlined"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="4">
                    <v-select
                        :items="paymentFrequencies"
                        label="COPE Payment Frequency"
                        item-value="PaymentFrequencyId"
                        item-title="PaymentFrequencyName"
                        v-model="editableIndividual.selectedPaymentFrequency"
                        variant="underlined"
                    ></v-select>
                </v-col>
            </v-row>
            <v-card-actions v-if="editMode">
                <v-spacer></v-spacer>
                <v-btn variant="elevated" @click="cancel()">Cancel</v-btn>
                <v-btn variant="elevated" color="success" href="" @click="saveBasicData()">Save</v-btn>
            </v-card-actions>
        </v-card-text>
    </v-card>
</template>

<script>
import { clone, cloneDeep } from "lodash-es";
 import AffiliateSwitchComponent from "../../../Affiliate/AffiliateSwitchComponent";
 import billHighway from "../../../../mixins/Data/billHighway";

    export default {
        name: "BasicDataComponent",
        components: {AffiliateSwitchComponent},
        mixins: [billHighway],
        props: {
            individual: {
                type: Object,
                required: true
            },
            editMode: {
                type: Boolean,
                required: true
            },
            switchAffiliate: {
                type: Object,
                required: false
            },
        },
        watch: {
            individual: {
                immediate: true,
                deep: true,
                handler(newValue) {
                    this.editableIndividual = this.editMode ? cloneDeep(newValue) : newValue;

                    this.$nextTick(() => {
                        this.editableIndividual.selectedUnionRelationshipTypeId = newValue.selectedUnionRelationshipTypeId;
                        this.selectedUnionRelationshipTypeId = newValue.selectedUnionRelationshipTypeId;

                        this.loadLocalDuesCategories();
                    });
                }
            },
            selectedStopReason: {
                handler(value) {
                    if (value === 'Establish new relationship') {
                        this.readOnly = false;
                    }
                }
            },
            switchAffiliate: {
                handler(value) {
                    if(value){
                        this.switchName = "Switch to "+value.AffiliateName;
                         this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
                    }
                }
            }
        },
        data() {
            return {
                prefixes: [],
                suffixes: [],
                chapters: [],
                unionRelationships: [],
                editableIndividual: {},
                duesCategories: [],
                paymentMethods: [],
                paymentFrequencies: [],
                selectedStopReason: null,
                alertMessage: '',
                showAlert: false,
                readOnly: false,
                selectedUnionRelationshipTypeId: null,
                selectedAffiliateId: null,
                submissionId:null,
                switchName:null,
                overlay: true,
            }
        },
        mounted() {
            this.readOnly = this.editMode;
            this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
            axios.get('/api/v2/prefix').then((response) => {
                this.prefixes = response.data.data;
            });
            axios.get('/api/v2/suffix').then((response) => {
                this.suffixes = response.data.data;
            });

            this.editableIndividual = this.editMode ? clone(this.individual) : this.individual;
            if (this.selectedAffiliate) {
                axios.get('/api/v2/aggregate/individual/unionRelationshipType/' + this.selectedAffiliate.AffiliateId).then((response) => {
                    this.unionRelationships = response.data.data;
                    if(this.individual.selectedUnionRelationshipTypeId){
                        this.selectedUnionRelationshipTypeId = this.individual.selectedUnionRelationshipTypeId;
                    }
                });
                axios.get('/api/v2/chapter?sort=ChapterName&filter[AffiliateId]=' + this.selectedAffiliate.AffiliateId + '&filter[IsStructural]=0').then((response) => {
                    this.chapters = response.data.data;
                });
            }

            axios.get('/api/v2/paymentMethod').then((response) => {
                this.paymentMethods = response.data.data;
            });
            axios.get('/api/v2/paymentFrequency').then((response) => {
                this.paymentFrequencies = response.data.data;
            });

            this.prepareFormData();
            this.submissionId = this.$route.query.submissionId;

            if (this.submissionId != undefined && this.overlay === true) {
                setTimeout(() => {
                this.overlay = false;
                }, 3500);
            } else {
                this.overlay = false;
            }
        },
        computed: {
            loading() {
                return (this.editMode) ? typeof this.individual.FirstName === 'undefined' : false;
            },
            label() {
                return this.editMode ? (this.individual.FirstName || '') + ' ' + (this.individual.LastName || '') : 'Create individual';
            },
            selectedAffiliate() {
                return this.$store.getters['user/selectedAffiliate'];
            },
            sameAffiliate() {
                if(this.switchAffiliate){
                    this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
                return this.selectedAffiliateId == this.switchAffiliate.AffiliateId;
                }else{
                    return true;
                }
            },
            affiliateOptions() {
                return [
                    {
                        AffiliateId: this.selectedAffiliate ? this.selectedAffiliate.AffiliateId : null,
                        AffiliateName: this.selectedAffiliate ? this.selectedAffiliate.AffiliateName : null
                    }
                ];
            },
            rules () {
                const rules = {};
                rules['required'] = value => !!value || 'Required.';

                rules['copeAmount'] = value =>  (this.editableIndividual.selectedPaymentMethod || this.editableIndividual.selectedPaymentFrequency) ? (!!value || 'Required') : true;
                rules['copeDecimal'] = value => value ? /^[+-]?(?=.?\d)\d*(\.\d{0,3})?$/gm.test(value) || 'Should be a decimal value with max 3 decimals' : true;

                return rules
            },
            computedUnionRelationshipTypeId: {
                get() {
                    return this.editableIndividual.selectedUnionRelationshipTypeId || null;
                },
                set(value) {
                    this.editableIndividual.selectedUnionRelationshipTypeId = value;
                    this.loadLocalDuesCategories();
                }
            },
        },
        methods: {
            saveBasicData() {
                if (this.editMode) {
                    this.updateIndividual();
                }
            },

            updateIndividual() {
                let data = {
                    FirstName: this.editableIndividual.FirstName,
                    LastName: this.editableIndividual.LastName,
                    MiddleName: this.editableIndividual.MiddleName,
                    PreviousName: this.editableIndividual.PreviousName,
                    PreferredName: this.editableIndividual.PreferredName,
                    PrefixId: this.editableIndividual.PrefixId,
                    SuffixId: this.editableIndividual.SuffixId,
                    LocalDuesCategoryId: this.editableIndividual.selectedDuesCategory,
                    ChapterId: this.editableIndividual.selectedChapter,
                    PaymentMethodId: this.editableIndividual.selectedPaymentMethod,
                    PaymentFrequencyId: this.editableIndividual.selectedPaymentFrequency,
                    AffiliateId: this.selectedAffiliate,
                };

                axios.put('/api/v2/individual/' + this.individual.IndividualId, data).then((response) => {
                    this.updateBillHighwayIndividual(this.individual.IndividualId, this.selectedAffiliate.AffiliateId, 'basicDetails');
                    this.afterSave(this.editableIndividual);
                }).finally();
            },

            cancel() {
                this.editableIndividual = clone(this.individual);
                this.$emit('cancel-edit-individual');
            },

            prepareFormData() {
                if (!this.editableIndividual.IndividualId) {
                    return;
                }

                const individualAffiliate = this.editableIndividual.individualAffiliates.filter(individualAffiliate =>  {
                    return !individualAffiliate.EndDate;
                }).pop();
                console.log('individualAffiliate:', individualAffiliate);

                if (individualAffiliate) {
                    this.editableIndividual.selectedDuesCategory = individualAffiliate.LocalDuesCategoryId;
                    this.editableIndividual.selectedUnionRelationshipTypeId = individualAffiliate.UnionRelationshipTypeId;
                    this.selectedUnionRelationshipTypeId = individualAffiliate.UnionRelationshipTypeId;
                    this.editableIndividual.selectedPaymentMethod = individualAffiliate.PaymentMethodId;
                    this.editableIndividual.selectedPaymentFrequency = individualAffiliate.PaymentFrequencyId;
                    this.editableIndividual.selectedChapter = individualAffiliate.ChapterId;
                    this.editableIndividual.startDate = individualAffiliate.StartDate;
                }
            },

            afterSave(data) {
                this.editableIndividual = data;
                this.$emit('saved-individual', clone(data));
            },

            fieldVisible(fieldName) {
                if (!this.editableIndividual.selectedUnionRelationshipTypeId || this.unionRelationships.length === 0) {
                    return false;
                }

                const unionRelationship = this.unionRelationships.filter(unionRelationship => {
                    return unionRelationship.UnionRelationshipTypeId === this.editableIndividual.selectedUnionRelationshipTypeId;
                }).pop();

                if (!unionRelationship) {
                    return false;
                }

                switch (fieldName) {
                    case 'Chapter':
                        return this.selectedAffiliate.hasChapters && unionRelationship.UnionRelationshipTypeName !== 'Other';
                    case 'Dues category':
                        return unionRelationship.UnionRelationshipTypeName === 'Member' || unionRelationship.UnionRelationshipTypeName === 'Agency Fee Payer';
                    case 'Cope':
                        return unionRelationship.UnionRelationshipTypeName === 'Member' && this.selectedAffiliate.hasCope;
                }

                return false;
            },

            loadLocalDuesCategories() {
                if (this.selectedUnionRelationshipTypeId) {
                    axios.get('/api/v2/custom/localduescategory/byunionrelationshiptypewithfrequency/' + this.selectedUnionRelationshipTypeId).then((response) => {
                        this.duesCategories = response.data.data;
                        const localDuesData = response.data.data.filter((filterData) => filterData.LocalDuesCategoryId == this.editableIndividual.selectedDuesCategory);
                        if (localDuesData && localDuesData[0] && localDuesData[0].PaymentFrequency && localDuesData[0].PaymentFrequency.PaymentFrequencyId) {
                                this.editableIndividual.PaymentFrequencyId = localDuesData[0].PaymentFrequency.PaymentFrequencyId;
                                this.editableIndividual.selectedPaymentFrequency = localDuesData[0].PaymentFrequency.PaymentFrequencyId;
                        }
                        // console.log('this.editableIndividual.copeAmount', this.editableIndividual.copeAmount);
                        if(this.editableIndividual.copeAmount == '0.00' || this.editableIndividual.copeAmount === undefined || this.editableIndividual.copeAmount === null || parseInt(this.editableIndividual.copeAmount) <= 0){
                            this.editableIndividual.copeAmount = "0.00";
                            this.editableIndividual.selectedPaymentMethod = null;
                            this.editableIndividual.selectedPaymentFrequency = null;
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
