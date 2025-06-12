<template>
    <div>
    <v-form
        ref="form"
        validate-on="submit"
        @submit.prevent="doNext"
    >
    <v-container fluid>
        <v-row>
            <v-col>
                <h2>Form Settings</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="formHeaderSettings">
                <MfpTextField
                    v-model="formName"
                    :field="formNameField"
                    :rules="[rules.required]"
                    :designer="true"
                    :max="255"
                />
                <MfpTextField
                    v-model="formTitle"
                    :field="formTitleField"
                    :rules="[rules.required]"
                    :designer="true"
                    :max="255"
                />
                <v-checkbox
                    v-model="formShowAftLogo"
                    label="Show AFT logo"
                />
                <v-checkbox
                    v-if="affiliateLogoData.local_logo"
                    v-model="formShowLocalLogo"
                    label="Show Local logo"
                />
                <v-checkbox
                    v-if="affiliateLogoData.fed_logo"
                    v-model="formShowFedLogo"
                    label="Show State Federation/Other logo"
                />
                <MfpTextAreaField
                    v-model="formDescription"
                    class="formHeader"
                    :field="formDescriptionField"
                    :designer="true"
                />
                <!--
                <v-checkbox
                    v-model="formShowInDirectory"
                    label="Show Form in Directory"
                />
                -->
            </v-col>
        </v-row>
        <v-row v-if="isCopeOnlyTemplate() || isStateFedTemplate()">
            <v-col>
                <v-select
                    v-model="selectedBHBillingType"
                    label="Select BillHighway Billing Type"
                    :items="bhBillingTypes"
                    item-title="BillingTypeName"
                    item-value="BillingTypeID"
                    return-object
                    variant="outlined"
                    required
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <FormSearchSelector
                    v-model="affiliateId"
                    label="Select an Affiliate"
                    :item-title="item => item.AffiliateNumber + ' - ' + item.AffiliateName"
                    item-value="AffiliateId"
                    search-type="affiliate"
                    :rules="[v => !!v || 'Affiliate is required']"
                    :disabled="true"
                    :clearable="!chapterId && !employerId && !unitId"
                />
            </v-col>
        </v-row>
        <v-row v-if="isStateFedTemplate()">
            <v-col>
                <FormSearchSelectAll
                    ref="localSelector"
                    v-model="localId"
                    label="Type local name or local number or select from the dropdown list"
                    :item-title="item => item.AffiliateNumber + ' - ' + item.AffiliateName"
                    item-value="AffiliateId"
                    search-type="childAffiliate"
                    :search-args="{ affiliateId: affiliateId }"
                    multiple
                />
            </v-col>
        </v-row>
        <v-row v-if="!isStateFedTemplate() && !isRetireeCopeTemplate()">
            <v-col>
                <FormSearchSelector
                    ref="chapterSelector"
                    v-model="chapterId"
                    label="Select a Chapter"
                    item-title="ChapterName"
                    item-value="ChapterId"
                    search-type="chapter"
                    :search-args="{ affiliateId: affiliateId }"
                    :disabled="!affiliateId || (employerId && employerId.length >= 1)"
                    :clearable="!(employerId && employerId.length >= 1) && !unitId"
                />
            </v-col>
        </v-row>
        <v-row v-if="!isStateFedTemplate() && !isRetireeCopeTemplate()">
            <v-col>
                <FormSearchSelectAll
                    ref="employerSelector"
                    v-model="employerId"
                    label="Select an Employer"
                    item-value="EmployerId"
                    search-type="employer"
                    :search-args="{ chapterId: chapterId }"
                    item-title="EmployerName"
                    :disabled="!chapterId || !!unitId"
                    :clearable="!unitId"
                    multiple
                />
            </v-col>
        </v-row>
        <v-row v-if="!isStateFedTemplate() && !isRetireeCopeTemplate()">
            <v-col>
                <FormSearchSelector
                    ref="unitSelector"
                    v-model="unitId"
                    label="Select a Unit"
                    item-title="UnitName"
                    item-value="UnitId"
                    search-type="unit"
                    :search-args="{ employerId: employerId }"
                    :disabled="!employerId || employerId.length > 1"
                    clearable
                />
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-col>
                <form-search-selector
                    ref="localJobClassSelector"
                    v-model="localJobClassId"
                    label="Local Job Class"
                    item-value="LocalJobClassId"
                    search-type="localJobClass"
                    :search-args="{ unitId: unitId }"
                    item-text="LocalJobClassName"
                    :disabled="!unitId"
                    outlined
                    clearable
                />
            </v-col>
        </v-row> -->
        <!-- <v-row>
            <v-col>
                <form-search-selector
                    ref="jobTitleSelector"
                    v-model="jobTitleId"
                    label="Job Title"
                    item-value="JobTitleId"
                    search-type="jobTitle"
                    :search-args="{ localJobClassId: localJobClassId }"
                    item-text="JobTitleName"
                    :disabled="!localJobClassId"
                    outlined
                    clearable
                />
            </v-col>
        </v-row> -->
        <v-row>
            <v-col class="d-flex justify-space-between ga-2">
                <v-btn
                    @click.prevent="doPrev()"
                    value="cancel"
                >
                    {{ cancelText }}
                </v-btn>
                <v-btn
                    color="#0A2A5C"
                    type="submit"
                    value="continue"
                >
                    Continue
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    </v-form>
    <v-overlay
        :model-value="loading"
        opacity=".5"
        scrim="#FFF"
    />
    </div>
</template>

<script>
import api from '../../../../api/private';
import MfpTextAreaField from "../../../shared/components/MfpTextAreaField.vue";
import MfpTextField from "../../../shared/components/MfpTextField.vue";
import FormSearchSelectAll from "../FormSearchSelectAll.vue";
import FormSearchSelector from "../FormSearchSelector.vue";

export default {
    name: 'FormBuilderSettings',
    components: {
        MfpTextField,
        MfpTextAreaField,
        FormSearchSelector,
        FormSearchSelectAll,
    },
    emits: ['next', 'prev', 'save'],
    options: {
        label: 'Form Settings',
    },
    props: {
        store: { type: Object, required: true },
    },
    data: () => ({
        loading: false,
        formName: null,
        formTitle: null,
        formDescription: '',
        formShowInDirectory: false,
        formShowAftLogo: true,
        formShowLocalLogo: false,
        formShowFedLogo: false,
        formLogoType: 0,
        affiliateId: null,
        localId: null,
        affiliateLogoData: {},
        chapterId: null,
        employerId: null,
        unitId: null,
        localJobClassId: null,
        jobTitleId: null,
        formNameField: {
            label: 'Form Name',
            required: true,
            tooltip: true,
            toolText: 'Form name for internal use only (local admin)',
        },
        formTitleField: {
            label: 'Form Title',
            required: true,
            tooltip: true,
            toolText: 'Membership form title displayed on the form viewed by the member',
        },
        formDescriptionField: {
            label: 'Form Header Text',
            required: false,
        },
        actions: api.getFormActions(),
        isEdit: false,
        isClone: false,
        rules: {
            required: (value) => !!value || 'Required.',
        },
        bhBillingTypes: [],
        selectedBHBillingType: null,
    }),
    watch: {
        formName() {
            if (this.store.formName !== this.formName) {
                this.$emit('save', { key: 'formName', value: this.formName });
            }
        },
        formTitle() {
            if (this.store.formTitle !== this.formTitle) {
                this.$emit('save', { key: 'formTitle', value: this.formTitle });
            }
        },
        formShowAftLogo() {
            this.$emit('save', { key: 'formShowAftLogo', value: this.formShowAftLogo });
        },
        formShowLocalLogo() {
            this.$emit('save', { key: 'formShowLocalLogo', value: this.formShowLocalLogo });
        },
        formShowFedLogo() {
            this.$emit('save', { key: 'formShowFedLogo', value: this.formShowFedLogo });
        },
        formLogoType() {
            this.$emit('save', { key: 'formLogoType', value: this.formLogoType });
        },
        formDescription() {
            if (this.store.formDescription !== this.formDescription) {
                this.$emit('save', { key: 'formDescription', value: this.formDescription });
            }
        },
        formShowInDirectory() {
            if (this.store.formShowInDirectory !== this.formShowInDirectory) {
                this.$emit('save', { key: 'formShowInDirectory', value: this.formShowInDirectory });
            }
        },
        selectedBHBillingType() {
            if (this.selectedBHBillingType && this.selectedBHBillingType.BillingTypeID
                && this.store.billHighwayBillingTypeId !== this.selectedBHBillingType.BillingTypeID) {
                this.$emit('save', { key: 'billHighwayBillingTypeId', value: this.selectedBHBillingType.BillingTypeID });
            }
        },
        affiliateId() {
            if (this.store.affiliateId !== this.affiliateId) {
                this.$emit('save', { key: 'affiliateId', value: this.affiliateId });
                this.$nextTick(() => {
                    this.chapterId = null;
                    this.employerId = null;
                    this.unitId = null;
                    this.localJobClassId = null;
                    this.jobTitleId = null;
                    this.localId = null;
                    this.$refs.chapterSelector.reset();
                    this.$refs.employerSelector.reset();
                    // this.$refs.unitSelector.reset();
                    // this.$refs.localJobClassSelector.reset();
                    // this.$refs.jobTitleSelector.reset();
                });
            }
        },
        chapterId() {
            if (this.store.chapterId !== this.chapterId) {
                this.$emit('save', { key: 'chapterId', value: this.chapterId });
                this.$nextTick(() => {
                    this.employerId = null;
                    this.$refs.employerSelector.reset();
                });
            }
        },
        employerId() {
            if (this.store.employerId !== this.employerId) {
                this.$emit('save', { key: 'employerId', value: this.employerId });
                this.$nextTick(() => {
                    this.unitId = null;
                    // @todo: employer is a multiple select, but this will not work if >1 selected.
                    if (this.employerId == null || this.employerId.length <= 1) {
                        this.$refs.unitSelector.reset();
                    }
                });
            }
        },
        unitId() {
            if (this.store.unitId !== this.unitId) {
                this.$emit('save', { key: 'unitId', value: this.unitId });
            }
        },
        localJobClassId() {
            if (this.store.localJobClassId !== this.localJobClassId) {
                this.$emit('save', { key: 'localJobClassId', value: this.localJobClassId });
            }
        },
        jobTitleId() {
            if (this.store.jobTitleId !== this.jobTitleId) {
                this.$emit('save', { key: 'jobTitleId', value: this.jobTitleId });
            }
        },
        localId() {
            if (this.store.localId !== this.localId) {
                this.$emit('save', { key: 'localId', value: this.localId });
            }
        },
    },
    created() {
        this.isEdit = (this.store.action && this.store.action === this.actions.edit);
        this.isClone = (this.store.action && this.store.action === this.actions.clone);

        this.formName = this.store.formName || null;
        this.formTitle = this.store.formTitle || null;
        this.formDescription = this.store.formDescription || '';
        this.formShowInDirectory = this.store.formShowInDirectory || false;
        // this.affiliateId = this.store.affiliateId || null;
        if (this.store.action === this.actions.create) {
            this.formShowAftLogo = true;
        } else {
            this.formShowAftLogo = this.store.formShowAftLogo || false;
        }
        this.formShowLocalLogo = this.store.formShowLocalLogo || false;
        this.formShowFedLogo = this.store.formShowFedLogo || false;
        this.formLogoType = this.store.formLogoType || 0;

        this.affiliateId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
        this.getAffiliateLogo();
        if (this.store.affiliateId !== this.affiliateId) {
            this.$nextTick(() => {
                this.chapterId = null;
                this.employerId = null;
                this.unitId = null;
                this.localJobClassId = null;
                this.jobTitleId = null;
                this.localId = null;
                this.$refs.chapterSelector.reset();
                this.$refs.employerSelector.reset();
                this.$refs.unitSelector.reset();
                // this.$refs.localJobClassSelector.reset();
                // this.$refs.jobTitleSelector.reset();
            });
        } else {
            this.chapterId = this.store.chapterId || null;
            this.employerId = this.store.employerId || null;
            this.unitId = this.store.unitId || null;
            this.localJobClassId = this.store.localJobClassId || null;
            this.jobTitleId = this.store.jobTitleId || null;
            this.localId = this.store.localId || null;
        }

        if (this.isCopeOnlyTemplate() || this.isStateFedTemplate()) {
            this.getBHBillingTypes();
        }
    },
    mounted() {
        this.affiliateId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
    },
    computed: {
        cancelText() {
            return this.isClone || this.isEdit ? 'Cancel (back to Manage Forms)' : 'Cancel (back to Select a Template)';
        },
    },
    methods: {
        isCopeOnlyTemplate() {
            return parseInt(this.store.templateId, 10) === 6;
        },
        isStateFedTemplate() {
            return parseInt(this.store.templateId, 10) === 8;
        },
        isRetireeCopeTemplate() {
            return parseInt(this.store.templateId, 10) === 9;
        },
        changeLogoType(event) {
            this.formLogoType = parseInt(event.id, 10);
        },
        getAffiliateLogo() {
            api.access('affiliate', this.affiliateId)
                .then((response) => {
                    this.affiliateLogoData = response.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getBHBillingTypes() {
            api.getBillHighwayBillingTypes(this.affiliateId)
                .then((response) => {
                    this.bhBillingTypes = response.data;
                    if (this.store.billHighwayBillingTypeId) {
                        this.selectedBHBillingType = this.bhBillingTypes.filter(
                            (billingType) => billingType.BillingTypeID === this.store.billHighwayBillingTypeId,
                        )[0];
                        // console.log(this.selectedBHBillingType);
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        doPrev() {
            if (this.isClone || this.isEdit) {
                // this.$emit('reset');
                this.$router.push({ path: 'manage' });
            } else {
                this.$emit('prev');
            }
        },
        async doNext(event) {
            const results = await event;
            if (results.valid) {
                this.$emit('next');
            }
        },
    },
};
</script>

<style lang="scss">
.formHeaderSettings {
    .formHeader {
        margin-top: 25px;
    }
    label.v-label.v-label--active.theme--light {
        color: red;
    }
}
.v-application {
    .requiredFields .primary--text {
        color: red !important;
        caret-color: red !important;
    }
    .requiredFields .theme--light.v-label {
        color: red !important;
        caret-color: red !important;
    }
}
.Continue-Button .v-btn__content {
    color: white;
}
.field-tooltip {
    position: absolute;
    top: -3rem;
    left: 0;
    width: 300px;
    height: 40px;
}
</style>
