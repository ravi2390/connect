<template>
    <v-card>
        <div class="form-card-header">
            <div
                v-if="form.show_fed_logo == false
                    && form.show_aft_logo == false
                    && form.show_local_logo == false"
            />
            <v-card-title
                v-else
                class="d-flex justify-space-between"
                flat
                tile
            >
                <v-col
                    cols="12" sm="4"
                >
                    <v-img
                        v-if="form.show_aft_logo"
                        class="first-logo"
                        max-width="120"
                        max-height="48"
                        cover
                        :src="logoSm"
                    />
                    <!-- NO logo -->
                    <v-img
                        v-else-if="
                            (form.show_aft_logo == false && form.show_fed_logo == true
                                && form.show_local_logo == false) ||
                                (form.show_aft_logo == false && form.show_fed_logo == false
                                    && form.show_local_logo == true)"
                        class="first-logo"
                        max-width="120"
                        max-height="48"
                        cover
                    />
                    <!-- FED logo -->
                    <v-img
                        v-else-if="form.show_aft_logo == false && form.show_fed_logo == true"
                        class="first-logo"
                        max-width="120"
                        max-height="48"
                        cover
                        :src="form.fed_logo_url && form.fed_logo_url"
                    />
                </v-col>
                <v-col
                    cols="12" sm="4"
                >
                    <!-- FED logo -->
                    <v-img
                        v-if="
                            form.show_fed_logo &&
                                form.show_fed_logo == true
                                && form.show_aft_logo == true
                                && form.show_local_logo == true"
                        class="second-logo"
                        max-width="120"
                        max-height="48"
                        cover
                        :src="form.fed_logo_url && form.fed_logo_url"
                    />
                </v-col>
                <v-col
                    cols="12" sm="4"
                >
                    <!-- LOCAL logo -->
                    <v-img
                        v-if="form.show_local_logo && form.show_local_logo == true"
                        class="third-logo"
                        max-width="120"
                        max-height="48"
                        cover
                        :src="form.local_logo_url && form.local_logo_url"
                    />
                    <!-- FED logo -->
                    <v-img
                        v-else-if="form.show_fed_logo == true && form.show_local_logo == false"
                        class="third-logo"
                        max-width="120"
                        max-height="48"
                        cover
                        :src="form.fed_logo_url && form.fed_logo_url"
                    />
                </v-col>
            </v-card-title>
            <h4 class="py-4 form-title">
                {{ form.display_name }}
            </h4>
        </div>
        <v-card-text class="form-header">
            <!-- eslint-disable vue/no-v-html -->
            <p
                style="width: 100%"
                v-html="form.description"
            />
            <!--eslint-enable-->
        </v-card-text>
        <v-alert
            v-if="formValidationMessage != ''"
            density="compact"
            variant="outlined"
            type="error"
            class="mx-4"
        >
            <div class="sig-alert">
                <span class="d-block">
                    {{ formValidationMessage }}
                </span>
            </div>
        </v-alert>
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
                        <div v-else-if="field.type == 'billingAddress'">
                            <MfpGenericField
                                :key="uniqueKey"
                                :item-key="field.order"
                                :field="field"
                                :required="field.required"
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
                variant="elevated"
                size="large"
                @click="onSubmit"
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
import apiPrivate from '../../api/private';
import api from '../../api/public';
import MfpErrorDialog from "../shared/components/MfpErrorDialog.vue";
import MfpGenericField from "../shared/components/MfpGenericField.vue";
import MfpWorkLocation from "../shared/components/MfpWorkLocation.vue";
import logoSm from '../../../images/aft-small.png';

export default {
    name: 'PageForm',
    components: {
        MfpErrorDialog,
        MfpWorkLocation,
        MfpGenericField,
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
        formValidationMessage: '',
        signatureError: '',
        designer: false,
        fab: false,
        uniqueKey: 0,
        logoSm,
    }),
    watch: {
        form: {
            deep: true,
            handler() {
                console.log('FORM CHANGED', this.form);
                this.updateSource();
                this.updateBillingAddressSameAsHome();
            },
        },
    },
    mounted() {
        const divElement = document.getElementById('memberforms');
        divElement.id = 'memberforms1';

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
                        if (!this.form) {
                            this.disableButton = true;
                        }
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
            // console.log('form', this.form);
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
        updateBillingAddressSameAsHome() {
            if (!this.disabled && this.form.fields) {
                const billingAddress = this.getFormField('billingAddress');
                const mailingAddress = this.getFormField('mailingAddress');
                if (mailingAddress && billingAddress && (typeof billingAddress.fields.billingSameAsHome.value !== 'undefined')) {
                    if (billingAddress.fields.billingSameAsHome.value) {
                        billingAddress.fields.billingAddressLine1.value = mailingAddress.fields.addressLine1.value;
                        billingAddress.fields.billingAddressLine2.value = mailingAddress.fields.addressLine2.value;
                        billingAddress.fields.billingCity.value = mailingAddress.fields.city.value;
                        billingAddress.fields.billingState.value = mailingAddress.fields.state.value;
                        billingAddress.fields.billingState.stateName = this.getStateName(
                            mailingAddress.fields.state.source,
                            mailingAddress.fields.state.value,
                        );
                        billingAddress.fields.billingZip.value = mailingAddress.fields.zip.value;
                    } else {
                        delete billingAddress.fields.billingAddressLine1.value;
                        delete billingAddress.fields.billingAddressLine2.value;
                        delete billingAddress.fields.billingCity.value;
                        delete billingAddress.fields.billingState.value;
                        delete billingAddress.fields.billingZip.value;
                        delete billingAddress.fields.billingState.stateName;
                    }
                    this.uniqueKey = Math.floor(Math.random() * 10);
                }
            }
        },
        getStateName(stateList, stateCode) {
            if (stateCode && stateCode > 0) {
                const oState = stateList.filter((state) => state.itemValue === stateCode.toString());
                return oState ? oState[0].itemText : '';
            }
            return '';
        },
        onSubmit() {
            /*
            const signatureField = this.getFormField('signature');
            const customCopeField = this.getFormField('customCope');
            const signatureOtherField = this.getFormField('signatureOther');
            */

            if (!this.$refs.form.validate()) {
                // alert('form not valid');
                this.formValidationMessage = 'Please fill in all required fields.';
            }

            /*
            // COPE Signature
            if (customCopeField) {
                if (customCopeField.value.signature === '' || customCopeField.value.signature == null) {
                    this.validate();
                    document.querySelector('.mfp-signature-field').classList.add('sig-err');
                    return;
                } else { // eslint-disable-line
                    document.querySelector('.mfp-signature-field').classList.remove('sig-err');
                    this.$vuetify.goTo(0);
                }
            }
            */

            /*
            // Addtional Signature Component
            if (signatureOtherField) {
                if ((typeof signatureOtherField.fields.signatureOther.value === 'undefined'
                    && signatureOtherField.fields.signatureOther.required === true)
                    || (signatureOtherField.fields.signatureOther.value == null
                    && signatureOtherField.fields.signatureOther.required === true)
                ) {
                    this.validate();
                    document.querySelector('.signatureOther').classList.add('sig-err');
                    return;
                } else { // eslint-disable-line
                    document.querySelector('.signatureOther').classList.remove('sig-err');
                    this.$vuetify.goTo(0);
                }
            }
            */

            /*
            // Basic Signature
            if (signatureField) {
                if ((typeof signatureField.fields.signature.value === 'undefined'
                    && signatureField.fields.signature.required === true)
                    || (signatureField.fields.signature.value == null
                    && signatureField.fields.signature.required === true)
                ) {
                    this.validate();
                    document.querySelector('.signature').classList.add('sig-err');
                    return;
                } else { // eslint-disable-line
                    document.querySelector('.signature').classList.remove('sig-err');
                    this.$vuetify.goTo(0);
                }
            }
            */

            this.submit();
        },
        submit() {
            console.log('form', this.form);
            if (this.$refs.form.validate()) {
                this.loading = true;
                this.disableButton = true;
                api.sendFormData(this.form.id, this.form)
                    .then((response) => {
                        console.log(response.data);
                        apiPrivate.dataFormSubmissionUpdate(response.data.submissionId);
                        this.$router.push({ name: 'manage', params: {} });
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
.form-card-header {
    position: relative;
    .first-logo {
        float: left;
    }
    .second-logo {
        display: flex;
        margin: 0 auto;
    }
    .third-logo {
        float: right;
    }
    h4 {
        display: inline-block;
        width: 100%;
        background-color: #E3F2FD;
    }
}
.v-card__actions>.v-btn.v-btn {
    background-color: #092a5c !important;
    border-color: #092a5c !important;
    color: #ffffff !important;
}
.theme--light.v-card>.v-card__text.form-header {
    color: #000;
}
</style>
