<!-- these rules are disabled due to eslint and vue disagreement on how to v-for on a template -->
<!-- eslint-disable vue/no-v-for-template-key-on-child -->
<!-- eslint-disable vue/valid-v-for -->
<template>
    <v-stepper
        v-model="stepCurrId"
        class="mb-huge"
        color="#0A2A5C"
    >
        <v-stepper-header
            :class="{ 'hide-step-header' : stepCurrId == 1}"
        >
            <template
                v-for="step in stepsList"
                :key="step.step"
            >
                <v-stepper-item
                    :complete="stepCurrId > step.step"
                    :value="step.step"
                    color="#0A2A5C"
                >
                    {{ step.label }}
                </v-stepper-item>
                <v-divider v-if="step.step < stepMax" />
            </template>
        </v-stepper-header>
        <v-container
            v-if="stepActive"
        >
            <component
                :is="stepActiveComponent"
                :store="activeEditTemplate"
                @reset="reset()"
                @save="save($event)"
                @remove="remove($event)"
                @prev="doPrevStep()"
                @next="doNextStep()"
            />
        </v-container>
        <v-stepper-actions v-if="showPrevNext">
            <template #prev>
                <v-btn
                    v-if="stepCurrId > 1 && !stepActive.noPrev"
                    color="primary"
                    @click="doPrevStep()"
                >
                    Back
                </v-btn>
            </template>
            <template #next>
                <v-btn
                    v-if="stepActive.step < stepMax && !stepActive.noNext"
                    color="#0A2A5C"
                    @click="doNextStep()"
                >
                    Continue
                </v-btn>
            </template>
        </v-stepper-actions>
    </v-stepper>
    <v-dialog
        v-model="dialogFormWIP"
        persistent
        max-width="290"
    >
        <v-card>
            <v-card-title class="text-h5">
                Resume or Restart
            </v-card-title>
            <v-card-text>
                Would you like to resume your work for template '{{ templateName }}' from where you left or restart new?
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    color="primary-darken-1"
                    variant="text"
                    @click="processSteps(false);dialogFormWIP = false;"
                >
                    Resume
                </v-btn>
                <v-btn
                    color="primary-darken-1"
                    variant="text"
                    @click="processSteps(true);dialogFormWIP = false;"
                >
                    Restart
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import FormBuilderTemplateChooser from './FormBuilderTemplateChooser.vue';
import FormBuilderSettings from './FormBuilderSettings.vue';
import FormBuilderDuesCategories from './FormBuilderDuesCategories.vue';
import FormBuilderDesigner from './FormBuilderDesigner.vue';
import FormBuilderReview from './FormBuilderReview.vue';
import FormBuilderConfirmation from './FormBuilderConfirmation.vue';
import api from '../../../../api/private';

export default {
    name: 'FormBuilder',
    components: {
        FormBuilderTemplateChooser,
        FormBuilderSettings,
        FormBuilderDuesCategories,
        FormBuilderDesigner,
        FormBuilderReview,
        FormBuilderConfirmation,
    },
    props: {
        steps: { type: Array, required: true },
        showPrevNext: { type: Boolean, default: true },
    },
    data: () => ({
        stepCurrId: -1,
        stepMax: -1,
        activeEditTemplate: {},
        stepActive: null,
        stepsList: [],
        dialogFormWIP: false,
        templateName: '',
    }),
    computed: {
        stepActiveComponent() {
            return this.stepActive.component;
        },
    },
    watch: {
        steps: function (list) {
            this.stepMax = list.length;
        },
        stepCurrId: function () {
            this.stepActive = this.stepsList[this.stepCurrId - 1];
            this.updateSteps();
        },
    },

    created() {
        if (!this.verifyActionAndRoute()) {
            this.reset();
        } else {
            this.dialogFormWIP = false;
            if (localStorage.formBuilderActiveTemplate) {
                const activeTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
                const url = new URL(window.location.href);
                const navClicked = url.searchParams.get('nav') != null ? url.searchParams.get('nav') === 'true' : false;
                if (activeTemplate.action && url.pathname.endsWith('create') && navClicked) {
                    api.templateShow(activeTemplate.templateId)
                        .then((responseTemplate) => {
                            this.templateName = responseTemplate.data.display_name;
                            this.dialogFormWIP = true;
                        });
                }
            }
        }
        this.processSteps(false);
    },
    methods: {
        processSteps(doReset) {
            if (doReset) { this.reset(); }
            this.updateSteps();
            this.stepMax = this.stepsList.length;
            this.doSetStep(this.activeEditTemplate.step, false);

            const url = new URL(window.location.href);
            const navClicked = url.searchParams.get('nav') != null ? url.searchParams.get('nav') === 'true' : false;
            if (url.pathname.endsWith('create') && navClicked) {
                this.$router.push({ path: 'create' });
            }
        },
        verifyActionAndRoute() {
            if (localStorage.formBuilderActiveTemplate) {
                const activeTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
                const url = new URL(window.location.href);
                return !(url.pathname.endsWith('create') && activeTemplate.action && activeTemplate.action.startsWith('edit'));
            }
            return false;
        },
        updateSteps() {
            if (localStorage.formBuilderActiveTemplate) {
                this.activeEditTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
                if (this.activeEditTemplate && this.activeEditTemplate.templateId
                    && (parseInt(this.activeEditTemplate.templateId, 10) === 3
                        || parseInt(this.activeEditTemplate.templateId, 10) === 6
                        || parseInt(this.activeEditTemplate.templateId, 10) === 8)) {
                    if (this.activeEditTemplate.reloadRoute) {
                        this.stepsList = [...this.steps];
                        this.stepsList.splice(2, 1);
                        this.stepsList[2].step = 3;
                        this.stepsList[3].step = 4;
                        this.stepsList[4].step = 5;
                    } else {
                        this.save({ key: 'reloadRoute', value: true });
                        this.$router.go();
                    }
                } else {
                    this.stepsList = [...this.steps];
                }
            }
        },
        reset() {
            this.activeEditTemplate = {};
            localStorage.formBuilderActiveTemplate = JSON.stringify(this.activeEditTemplate);
        },
        remove({ key }) {
            delete this.activeEditTemplate[key];
            localStorage.formBuilderActiveTemplate = JSON.stringify(this.activeEditTemplate);
        },
        save({ key, value }) {
            this.activeEditTemplate[key] = value;
            localStorage.formBuilderActiveTemplate = JSON.stringify(this.activeEditTemplate);
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        doPrevStep() {
            if (this.stepCurrId > 1) {
                this.stepCurrId -= 1;
                this.save({ key: 'step', value: this.stepCurrId });
                this.scrollToTop();
            }
        },
        doSetStep(step, save) {
            const shouldSave = (save === undefined ? true : save);
            let setStep = step || 1;
            if (setStep < 1) { setStep = 1; }
            if (setStep > this.stepMax) { setStep = this.stepMax; }
            if (setStep === this.stepCurrId) { return; }
            this.stepCurrId = setStep;
            if (shouldSave) {
                this.save({ key: 'step', value: this.stepCurrId });
            }
            this.scrollToTop();
        },
        doNextStep() {
            if (this.stepCurrId <= this.stepMax) {
                this.updateDefaultTextForFields(this.stepCurrId);
                this.stepCurrId += 1;
                this.save({ key: 'step', value: this.stepCurrId });
                this.scrollToTop();
            }
        },
        updateDefaultTextForFields(step) {
            const activeTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
            let stepIs = 4; // Submission confirmation
            if (activeTemplate && activeTemplate.templateId
                && (parseInt(activeTemplate.templateId, 10) === 3
                    || parseInt(activeTemplate.templateId, 10) === 6
                    || parseInt(activeTemplate.templateId, 10) === 8)) {
                stepIs = 3; // Submission confirmation
            }
            if (step === stepIs) {
                if (localStorage.formBuilderActiveTemplate) {
                    if (activeTemplate.form) {
                        api.templateShow(activeTemplate.templateId)
                            .then((response) => {

                                const customTextField = response.data.fields.customTextField;

                                const markupTextField = response.data.fields.markupTextField;
                                Object.keys(activeTemplate.form.fields).forEach((fieldIndex) => {
                                    const templateField = activeTemplate.form.fields[fieldIndex];
                                    if (templateField.fieldName === 'customTextField'
                                        && (templateField.label === null || templateField.label.length === 0)) {
                                        templateField.label = customTextField.label;
                                        this.activeEditTemplate = activeTemplate;
                                        localStorage.formBuilderActiveTemplate = JSON.stringify(activeTemplate);
                                    }
                                    if (templateField.fieldName === 'markupTextField'
                                        && (templateField.label === null || templateField.label.length === 0)) {
                                        templateField.label = markupTextField.label;
                                        this.activeEditTemplate = activeTemplate;
                                        localStorage.formBuilderActiveTemplate = JSON.stringify(activeTemplate);
                                    }
                                });
                            });
                    }
                }
            }
        },
    },
};
</script>

<style scoped>
    .mb-huge {
        margin-bottom: 25%;
        overflow: visible;
    }
    .hide-step-header {
        display: none;
    }
</style>
