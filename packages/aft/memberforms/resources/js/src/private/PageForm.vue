<template>
    <v-card>
        <v-card-title class="form-title d-flex pa-8">
            <v-img
                v-if="form.show_aft_logo"
                class="mr-2"
                max-width="41"
                :src="logoSm"
            />
            <h4>{{ form.display_name }}</h4>
        </v-card-title>
        <v-card-text class="form-header">
            <!-- eslint-disable vue/no-v-html -->
            <p
                style="width: 100%"
                v-html="form.description"
            />
            <!--eslint-enable-->
        </v-card-text>
        <v-form
            ref="form"
            v-model="formValid"
            autocomplete="off"
            class="v-form"
        >
            <v-container flex>
                <v-row
                    v-for="field in form.fields"
                    :key="field.id"
                >
                    <v-col>
                        <div v-if="field.type == 'employmentInformation'">
                            <MfpWorkLocation
                                :key="field.id"
                                v-model="field.value"
                                :field="field"
                                :required="field.required"
                                :designer="designer"
                            />
                        </div>
                        <div v-else>
                            <MfpGenericField
                                :item-key="field.order"
                                :field="field"
                                :required="field.required"
                            />
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-card-actions class="d-flex justify-center">
            <v-btn
                :disabled="disableButton"
                color="primary"
                class="px-6"
                size="large"
                @click="submit"
            >
                Join!
            </v-btn>
        </v-card-actions>
        <v-overlay
            :model-value="loading"
            scrim="black"
            opacity="0.25"
            class="align-center justify-center"
        >
            <v-progress-circular
                color="primary"
                indeterminate
                size="64"
            />
        </v-overlay>
        <MfpErrorDialog
            :error-response="errorResponse"
        />
        <!-- Mobile back to top fab button -->
        <div>
            <v-btn
                v-show="fab"
                v-scroll="onScroll"
                fixed
                location="bottom right"

                color="#6F9FCD"
                @click="toTop"
                icon="mdi:mdi-chevron-up"
            >
            </v-btn>
        </div>
    </v-card>
</template>

<script>
import api from '../../api/private';
import MfpErrorDialog from "../shared/components/MfpErrorDialog.vue";
import MfpGenericField from "../shared/components/MfpGenericField.vue";
import MfpWorkLocation from "../shared/components/MfpWorkLocation.vue";
import logoSm from '../../../images/aft-small.png';

export default {
    name: 'PageForm',
    components: {
        MfpErrorDialog,
        MfpGenericField,
        MfpWorkLocation,
    },
    props: {
        disabled: { type: Boolean, default: false },
        formPredefined: { type: Object, required: false },
    },
    data: () => ({
        loading: false,
        formValid: false,
        form: {},
        errorResponse: null,
        disableButton: false,
        designer: false,
        fab: false,
        logoSm,
    }),
    watch: {
        form: {
            deep: true,
            handler() {
                console.log('FORM CHANGED', this.form);
                this.updateSource();
            },
        },
    },
    mounted() {
        this.disableButton = this.disabled;
        if (this.$route.params.id || this.formPredefined) {
            this.getData(this.$route.params.id);
        } else {
            this.getFormIdForCustomUrl(this.$route.params.affiliateNumber, this.$route.params.customUrl);
        }
    },
    methods: {
        getData(id) {
            this.loading = true;
            if (this.formPredefined) {
                this.form = this.formPredefined;
                this.loading = false;
            } else {
                api.getForm(id)
                    .then((response) => {
                        this.form = response.data;
                        // if (!this.form) {
                        this.disableButton = true;
                        // }
                        this.loading = false;
                    });
            }
        },
        getFormIdForCustomUrl(affiliateNumber, customUrl) {
            api.getFormIdByCustomUrl(affiliateNumber, customUrl)
                .then((response) => {
                    this.getData(response.data);
                });
        },
        onScroll(e) {
            if (typeof window === 'undefined') return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 20;
        },
        toTop() {
            this.$vuetify.goTo(0);
        },
        validate() {
            this.$refs.form.validate();
        },
        getFormField(fieldName) {
            // return this.form.fields.filter((field) => field.fieldName === fieldName)[0];
            return this.form.fields[Object.keys(this.form.fields)
                .find((key) => this.form.fields[key].fieldName === fieldName)];
        },
        updateSource() {
            console.log('form', this.form);
            if (this.form.fields) {
                const employmentInformationField = this.getFormField('employmentInformation');
                const workLocationField = this.getFormField('workLocation');
                if (workLocationField) {
                    workLocationField.source = employmentInformationField.value;
                }
                const workStructureField = this.getFormField('workStructure');
                if (workStructureField) {
                    workStructureField.source = employmentInformationField.value;
                }
                const jobTitleField = this.getFormField('jobTitle');
                if (jobTitleField) {
                    jobTitleField.source = employmentInformationField.value;
                }
            }
        },
        submit() {
            console.log('form', this.form);
            if (this.$refs.form.validate()) {
                this.loading = true;
                this.disableButton = true;
                api.sendFormData(this.form.id, this.form)
                    .then((response) => {
                        console.log(response.data);
                        this.$router.push({ name: 'thankyou', params: { id: this.form.id } });
                    })
                    .catch((error) => {
                        this.errorResponse = error.response;
                        this.disableButton = false;
                        console.log('FORM ERRORS', error.response);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
            this.$vuetify.goTo(0);
        },
    },
};
</script>

<style lang="scss" scoped>
.form-title {
    position: relative;
    .v-image {
        position: absolute;
        left: 32px;
        display: inline-block;
    }
    h4 {
        display: inline-block;
        width: calc(100% - 58px);
        margin-left: 41px;
    }
}
.v-card__actions>.v-btn.v-btn {
    background-color: #092a5c !important;
    border-color: #092a5c !important;
    color: #ffffff !important;
}
</style>
