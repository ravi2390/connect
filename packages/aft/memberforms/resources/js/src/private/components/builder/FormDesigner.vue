<template>
    <v-container flex>
        <v-row>
            <v-col
                class="Continue-Button d-flex justify-end ga-2"
            >
                <v-btn
                    color="#0A2A5C"
                    @click="reset"
                >
                    Reset Form
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="8" lg="9">
                <h4>Form Fields</h4>
                <draggable
                    v-if="form"
                    v-model="form.fields"
                    group="fields"
                    handle=".handle"
                    item-key="id"
                    animation="200"
                    ghost-class="ghost"
                >
                    <template #item="{element, index}">
                        <MfpWorkLocation
                            v-if="element.dataSource === 'employmentInformation'"
                            :field="element"
                            :required="element.required"
                            designer
                        />
                        <MfpGenericField
                            v-else
                            :item-key="index"
                            :field="element"
                            designer
                            @remove="removeField(index)"
                        />
                    </template>
                </draggable>
            </v-col>
            <v-col cols="12" sm="4" lg="3" class="position-sticky" style="height: fit-content; top: 70px;">
                <h4>Optional Fields</h4>
                <v-list>

                    <draggable
                        v-model="optional"
                        item-key="id"
                        :group="{ name: 'fields', put: false }"
                        :clone="cloneField"
                        @remove="moveField"
                    >
                        <template #item="{element}">
                            <v-list-item prepend-icon="mdi:mdi-arrow-all" variant="outlined" class="mb-1 elevation-1 rounded-bs-lg rounded-te-lg">
                                {{ element.label }}
                            </v-list-item>
                        </template>
                    </draggable>
                </v-list>
            </v-col>
        </v-row>
        <v-overlay
            :model-value="loading"
            opacity: .5
            scrim="#FFF"
        />
    </v-container>
</template>

<script>
import draggable from 'vuedraggable';
import api from '../../../../api/private';
import MfpWorkLocation from "../../../shared/components/MfpWorkLocation.vue";
import MfpGenericField from "../../../shared/components/MfpGenericField.vue";

export default {
    name: 'FormDesigner',
    components: {
        draggable,
        MfpWorkLocation,
        MfpGenericField,
    },
    props: {
        store: { type: Object, required: true },
    },
    data: () => ({
        loading: false,
        form: null,
        optional: null,
        drag: false,
        localDues: [],
        affiliateId: null,
        localId: null,
        chapterId: null,
        employerId: null,
        unitId: null,
        localJobClassId: null,
        jobTitleId: null,
        localDuesCategories: [],
        workLocations: [],
        workStructures: [],
        selectedLocalDuesCategory: null,
        selectedLocalDuesCategoryPrice: null,
        paymentProcessingDuesTemplateIds: [4, 5, 7, 9],
    }),
    watch: {
        form: {
            deep: true,
            handler() {
                console.log('FORMDESIGNER HANDLER', this.form);
                if (!this.form) { return; }
                // const localWorkLocationField = this.getWorkLocationField();
                // if (localWorkLocationField && (localWorkLocationField.source === '' ||
                // localWorkLocationField.source === undefined)) {
                //     localWorkLocationField.source = [{affiliateId:this.affiliateId},{chapterId:this.chapterId},
                //     {employerId:this.employerId}];
                //     localWorkLocationField.type = 'workLocation';
                // }
                this.$emit('save', { key: 'form', value: this.form });
            },
        },
        store: {
            deep: true,
            handler() {
                this.localDues = this.store.duesCategories;
            },
        },
        localDues: {
            deep: true,
            handler() {
                this.doListDuesCategories(this.localDues);
            },
        },
        // @todo: Shouldn't these already be set from FormBuilderSettings?
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
                    this.$refs.unitSelector.reset();
                });
                this.listWorkLocations();
                // this.listWorkStructures();
            }
        },
        localId() {
            if (this.store.localId !== this.localId) {
                this.$emit('save', { key: 'localId', value: this.localId });
            }
        },
        unitId() {
            if (this.store.unitId !== this.unitId) {
                this.$emit('save', { key: 'unitId', value: this.unitId });
                this.$nextTick(() => {
                    this.localJobClassId = null;
                    this.$refs.localJobClassSelector.reset();
                });
            }
        },
        localJobClassId() {
            if (this.store.localJobClassId !== this.localJobClassId) {
                this.$emit('save', { key: 'localJobClassId', value: this.localJobClassId });
                this.$nextTick(() => {
                    this.jobTitleId = null;
                    this.$refs.jobTitleSelector.reset();
                });
            }
        },
        jobTitleId() {
            if (this.store.jobTitleId !== this.jobTitleId) {
                this.$emit('save', { key: 'jobTitleId', value: this.jobTitleId });
            }
        },
    },
    created() {
        if (this.store.form) {
            this.reload();
        } else {
            this.reset();
        }
        this.affiliateId = this.store.affiliateId || null;
        this.localId = this.store.localId || null;
        this.chapterId = this.store.chapterId || null;
        this.employerId = this.store.employerId || null;
        this.unitId = this.store.unitId || null;
        this.localJobClassId = this.store.localJobClassId || null;
        this.jobTitleId = this.store.jobTitleId || null;
    },
    methods: {
        getLocalDuesCategory(ldc) {
            return this.localDuesCategories.filter((localDues) => localDues.LocalDuesCategoryId === ldc)[0];
        },
        getLocalDuesCategoryField() {
            return this.form.fields.filter((field) => field.fieldName === 'LocalDuesCategory')[0];
        },
        getWorkLocationField() {
            return this.form.fields.filter((field) => field.fieldName === 'workLocation')[0];
        },
        getWorkStructureField() {
            return this.form.fields.filter((field) => field.fieldName === 'workStructure')[0];
        },
        removeField(index) {
            const optionalField = this.form.fields[index];
            if (!this.keyExistsInOptionalFields(optionalField.fieldName)) {
                optionalField.key = optionalField.fieldName; // + this.optional.length + 1;
                this.optional.splice(0, 0, optionalField);
            }
            this.form.fields.splice(index, 1);
        },
        reset() {
            this.loading = true;
            console.log('RESET');
            this.form = null;
            this.$emit('remove', { key: 'form' });
            this.reload();
        },
        doListDuesCategories(duesCategories) {
            this.loading = true;
            api.search('duescategory', '', {
                affiliateId: this.store.affiliateId,
                ids: duesCategories,
                from: this.paymentProcessingDuesTemplateIds.includes(parseInt(this.store.templateId, 10)) ? 'form' : '',
            })
                .then((response) => {
                    this.localDuesCategories = response.data;
                    const localDuesCategoryField = this.getLocalDuesCategoryField();
                    if (localDuesCategoryField) {
                        localDuesCategoryField.source = this.localDuesCategories;
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        listWorkLocations() {
            if (this.store.employerId && this.store.employerId !== '') {
                this.loading = true;
                api.search('worklocation', '', { employerId: this.store.employerId })
                    .then((response) => {
                        this.workLocations = response.data;
                        const localWorkLocationField = this.getWorkLocationField();
                        if (localWorkLocationField) {
                            localWorkLocationField.source = this.workLocations;
                            localWorkLocationField.type = 'workLocation';
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        updateSourceForCopeOnlyBillingType() {
            // console.log(this.form.sources, this.store.billHighwayBillingTypeId);
            if (this.form.sources && this.store.billHighwayBillingTypeId) {
                this.form.sources.copeOnlyBillingTypeId = this.store.billHighwayBillingTypeId;
            }
        },
        reload() {
            console.log('localId', this.localId);
            console.log('storeLocalId', this.store.localId);
            console.log('store', this.store);
            this.loading = true;
            api.templateShow(this.store.templateId)
                .then((response) => {
                    const template = response.data;
                    if (this.store.form) {
                        this.form = this.store.form;
                    } else {
                        this.form = this.formFromTemplate(template);
                        this.$emit('save', { key: 'form', value: this.form });
                    }
                    this.localDues = this.store.duesCategories;
                    this.doListDuesCategories(this.localDues);
                    this.updateSourceForCopeOnlyBillingType();
                    // this.listWorkLocations();
                    // this.listWorkStructures();
                    this.optional = [];
                    Object.keys(template.fields).forEach((fieldName) => {
                        const templateField = template.fields[fieldName];
                        if (!templateField.fixed) {
                            if (!this.keyExistsInFormFields(fieldName)) {
                                templateField.fieldName = fieldName;
                                templateField.id = fieldName;
                                this.optional.push(templateField);
                            } else {

                                if (fieldName === 'customSelectionField' || fieldName === 'customTextField' || fieldName === 'markupTextField') {
                                    templateField.fieldName = fieldName;
                                    templateField.id = fieldName;
                                    this.optional.push(templateField);
                                }
                            }
                        }
                    });
                    Object.keys(template.optional_fields).forEach((fieldName) => {
                        const templateField = template.optional_fields[fieldName];
                        if (!this.store[templateField.source]) {
                            if (!this.keyExistsInFormFields(fieldName)) {
                                templateField.fieldName = fieldName;
                                templateField.id = fieldName;
                                this.optional.push(templateField);
                            }
                        }
                    });
                    // console.log('this.optional:', this.optional);
                    this.loading = false;
                });
        },
        cloneField(value) {
            const field = JSON.parse(JSON.stringify(value));
            const formFieldCount = this.getCountOfFormField(field.fieldName);
            if (formFieldCount > 0) {
                field.id = field.fieldName + formFieldCount;
            } else {
                field.id = field.fieldName;
            }
            // console.log('cloneField-field.id', field.id);
            return field;
        },
        moveField(value) {
            const index = value.newIndex;
            const { oldIndex } = value;
            const optionalField = { ...this.form.fields[index] };
            // const allowedFields = ['customField1', 'customField2', 'customField3'];
            const allowedFields = ['customSelectionField', 'customTextField', 'markupTextField'];
            if (allowedFields.includes(optionalField.fieldName)) {
                if (!this.keyExistsInOptionalFields(optionalField.fieldName)) {
                    this.optional.splice(oldIndex, 0, optionalField);
                }
            }
        },
        getCountOfFormField(keyName) {
            let i = 0;

            for (const [key, value] of Object.entries(this.form.fields)) {
                if (value.fieldName === keyName) {
                    i += 1;
                }
            }
            return i;
        },
        keyExistsInFormFields(keyName) {

            for (const [key, value] of Object.entries(this.form.fields)) {
                if (value.fieldName === keyName) {
                    return true;
                }
            }
            return false;
        },
        keyExistsInOptionalFields(keyName) {

            for (const [key, value] of Object.entries(this.optional)) {
                if (value.fieldName === keyName) {
                    return true;
                }
            }
            return false;
        },
        formFromTemplate(template) {
            const form = JSON.parse(JSON.stringify(template));
            form.fields = [];
            form.optional_fields = [];
            this.optional = [];

            for (const [key, value] of Object.entries(template.fields)) {
                if (value.fixed) {
                    console.log('fixed', key);
                    value.fieldName = key;
                    value.id = key; // + form.fields.length + 1;
                    if (value.type !== 'email') {
                        value.value = '';
                    }
                    form.fields.push(value);
                } else {
                    console.log('optional', key);
                    value.fieldName = key;
                    value.id = key; // + this.optional.length + 1;
                    this.optional.push(value);
                }
            }

            if (template.id !== 3 && template.id !== 6 && template.id !== 8) {
                const value = {};
                value.fieldName = 'LocalDuesCategory';
                value.id = value.fieldName; // + form.fields.length + 1;
                value.fixed = true;
                value.templateId = template.id;
                value.required = true;
                value.showPrice = true;
                /*
                if (template.id === 2 || template.id === 3) {
                    value.showCope = true;
                } else {
                    value.showCope = false;
                }
                */
                value.type = 'LocalDuesCategory';
                value.label = 'Local Dues';
                /*
                if (template.id === 3) {
                    value.label = 'Cope';
                } else {
                    value.label = 'Local Dues';
                }
                */
                value.dest = 'form.Dues';
                value.order = form.fields.length - 2;
                value.source = this.localDuesCategories;
                form.fields.splice(form.fields.length - 2, 0, value);
            }
            if (template.id === 8) {
                const source = {
                    affiliateId: this.store.affiliateId,
                    localId: this.store.localId,
                };
                const value = {};
                value.fieldName = 'childAffiliate';
                value.id = value.fieldName; // + form.fields.length + 1;
                value.fixed = true;
                value.templateId = template.id;
                value.required = true;
                value.localId = this.store.localId;
                value.type = 'childAffiliate';
                value.label = 'Select local';
                value.dest = 'form.childAffiliate';
                value.source = source;
                value.order = form.fields.length - 2;
                form.fields.splice(form.fields.length - 2, 0, value);
            }
            return form;
        },
    },
};
</script>

<style lang="scss">
.flip-list-move {
    transition: transform 0.5s;
}
.ghost {
    opacity: 0.5;
    background-color: #c8ebfb;
}
.col {
    background-color: #FFF;
}
.col-2 {
    flex: 0 0 4.666667%;
}
#sticky {
    position: sticky;
    position: -webkit-sticky;
    background: #fff;
    min-width: 20%;
    height: fit-content;
    top: 70px;
    right: 0;
    justify-content: center;
    color: #000;
    padding: 10px;
    text-align: center;
    margin-left: 2%;
}
#wrapper {
    margin: auto;
    background-color: #fff;
    display: flex;
    .v-card__text {
        width: auto;
        margin-left: 35px;
    }
    .v-sheet.v-card {
        box-shadow: 0 0 6px #0A2A5C;
    }
}
.optionalFields {
    background-color: #fff;
    margin: 5px;
    color: black;
    margin: 15px 0 15px 0;
    text-align: center;
    padding: 5px;
    border: 1px dotted #0A2A5C;
    cursor: grab;
    cursor: -webkit-grab;
    .fourWayDragIcon {
        float: left;
    }
}

</style>
