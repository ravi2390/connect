<template>
    <v-form
        v-if="!formNotFound"
        ref="form"
        v-model="formValid"
        autocomplete="off"
        class="v-form"
        :disabled="disabled"
        validate-on="submit"
        @submit.prevent="onSubmit"
    >
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
                    cols="12" sm="4" class="d-flex"
                >
                    <v-img
                        v-if="form.show_aft_logo"
                        class="first-logo"
                        max-width="60"
                        max-height="51"
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
                        max-width="51"
                        max-height="48"
                    />
                    <!-- FED logo -->
                    <v-img
                        v-else-if="form.show_aft_logo == false && form.show_fed_logo == true"
                        class="first-logo"
                        max-width="51"
                        max-height="48"
                        :src="form.fed_logo_url && form.fed_logo_url"
                    />
                </v-col>
                <v-col
                    cols="12" sm="4" class="d-flex"
                >
                    <!-- FED logo -->
                    <v-img
                        v-if="
                            form.show_fed_logo &&
                                form.show_fed_logo == true
                                && form.show_aft_logo == true
                                && form.show_local_logo == true"
                        class="second-logo"
                        max-width="60"
                        max-height="48"
                        :src="form.fed_logo_url && form.fed_logo_url"
                    />
                </v-col>
                <v-col
                    cols="12" sm="4" class="d-flex"
                >
                    <!-- LOCAL logo -->
                    <v-img
                        v-if="form.show_local_logo && form.show_local_logo == true"
                        class="third-logo"
                        max-width="60"
                        max-height="48"
                        :src="form.local_logo_url && form.local_logo_url"
                    />
                    <!-- FED logo -->
                    <v-img
                        v-else-if="form.show_fed_logo == true && form.show_local_logo == false"
                        class="third-logo"
                        max-width="60"
                        max-height="48"
                        :src="form.fed_logo_url && form.fed_logo_url"
                    />
                </v-col>
            </v-card-title>
            <h4 class="py-4 form-title">
                {{ form.display_name }}
            </h4>
        </div>
        <v-card-text class="form-header">
            <v-alert
                v-if="!formValid && formValidationMessage"
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
            <v-container>
                <v-row>
                    <v-col>
                        <!-- eslint-disable vue/no-v-html -->
                        <p v-html="form.description" />
                        <!--eslint-enable-->
                    </v-col>
                </v-row>
                <v-row
                    v-for="field in form.fields"
                    :key="field.id"
                >
                    <v-col>
                        <div v-if="field.type == 'employmentInformation'">
                            <MfpWorkLocation
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
                <v-row v-if="mathCaptchaEnabled">
                    <v-col
                        v-if="!disabled && !loading
                            && form.form_template_id
                            && eDuesPaymentTemplateIds.includes(parseInt(form.form_template_id, 10))"
                    >
                        Please solve the following math question <img :src="qImage">
                        <v-tooltip
                            location="right"
                            color="primary-darken-2"
                        >
                            <template #activator="{ props }">
                                <v-btn
                                    color="primary"
                                    class="btn-tooltip ml-4"
                                    v-bind="props"
                                    @click="fetchMathCaptcha()"
                                    icon="mdi:mdi-cached"
                                />
                            </template>
                            <span>Refresh Math question</span>
                        </v-tooltip>
                        <v-text-field
                            v-model="mathCaptchaAnswer"
                            label="Math answer"
                            maxlength="3"
                            required
                        >
                            <template #label>
                                <span>
                                    <strong class="text-red">
                                        *
                                    </strong>
                                </span>
                                Math answer (required)
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
            <v-btn
                :disabled="disableButton"
                color="primary"
                class="px-6"
                size="large"
                type="submit"
                variant="elevated"
            >
                Join!
            </v-btn>
        </v-card-actions>
        <MfpErrorDialog
            :error-response="errorResponse"
        />
    </v-card>
    </v-form>
    <v-card
        v-else
        class="bg-404"
    >
        <v-card-title><strong>Oops! This page does not exist!</strong></v-card-title>
        <v-card-text>
            404: Page not found
        </v-card-text>
    </v-card>
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
    <v-btn
        v-show="fab"
        v-scroll="onScroll"
        position="fixed"
        location="bottom right"
        class="ma-4"
        color="#6F9FCD"
        @click.prevent="toTop"
        icon="mdi:mdi-chevron-up"
    >
    </v-btn>
</template>

<script>
import axios from 'axios';
import { useGoTo } from 'vuetify';
import logoSm from '../../../images/aft-small.png';
import api from '../../api/public';
import MfpErrorDialog from "../shared/components/MfpErrorDialog.vue";
import MfpGenericField from "../shared/components/MfpGenericField.vue";
import MfpWorkLocation from "../shared/components/MfpWorkLocation.vue";

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
        formValidationMessage: '',
        signatureError: '',
        designer: false,
        fab: false,
        uniqueKey: 0,
        reCaptchaEnabled: false,
        reCaptchaKey: null,
        qImage: null,
        randomImageId: null,
        mathCaptchaEnabled: false,
        mathCaptchaAnswer: '',
        eDuesPaymentTemplateIds: [4, 5, 6],
        formNotFound: false,
        logoSm,
    }),
    setup() {
        const goTo = useGoTo();
        return {
            goTo,
        };
    },
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
        this.disableButton = this.disabled;
        if (this.$route.params.id || this.formPredefined) {
            this.getData(this.$route.params.id);
        } else {
            this.getFormIdForCustomUrl(this.$route.params.affiliateNumber, this.$route.params.customUrl);
        }
    },
    methods: {
        captchaInit() {
            if (this.eDuesPaymentTemplateIds.includes(parseInt(this.form.form_template_id, 10))) {
                if (!this.reCaptchaKey) {
                    axios.get('/api/v3/memberforms/recaptcha/get-info')
                        .then((response) => {
                            if (response.data && response.data.key && response.data.key.length > 0) {
                                this.reCaptchaEnabled = response.data.enabled;
                                this.reCaptchaKey = atob(response.data.key);
                            }
                        });
                }

                if (!this.qImage) {
                    axios.get('/api/v3/memberforms/mathcaptcha/get-info')
                        .then((response) => {
                            if (response.data) {
                                this.mathCaptchaEnabled = response.data.enabled;
                                if (this.mathCaptchaEnabled) {
                                    this.fetchMathCaptcha();
                                }
                            }
                        });
                }
            }
        },
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
                        this.captchaInit();
                        this.loading = false;
                    });
            }
        },
        getFormIdForCustomUrl(affiliateNumber, customUrl) {
            api.getFormIdByCustomUrl(affiliateNumber, customUrl)
                .then((response) => {
                    if (response.data) {
                        this.getData(response.data);
                    } else {
                        this.formNotFound = true;
                    }
                });
        },
        onScroll(e) {
            if (typeof window === 'undefined') return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 20;
        },
        toTop() {
            this.goTo(0);
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
                if (mailingAddress && billingAddress) {
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
                        this.uniqueKey = Math.floor(Math.random() * 10);
                    }
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
        reCaptchaInit(userAction) {
            if (!this.reCaptchaEnabled) {
                return false;
            }

            if (typeof window === 'undefined' || !this.reCaptchaKey) {
                return false;
            }

            if (Object.hasOwn(window, 'grecaptcha')) {
                window.grecaptcha.enterprise.ready(async () => {
                    const token = await window.grecaptcha.enterprise.execute(this.reCaptchaKey,
                        { action: userAction });

                    axios.post('/api/v3/memberforms/recaptcha/create-assessment', {
                        action: userAction,
                        token: token,
                    })
                        .then((response) => {
                            // console.log(response.data);
                        });
                });
            }
            return true;
        },
        fetchMathCaptcha() {
            axios.get('/api/v3/memberforms/mathcaptcha/generate')
                .then((response) => {
                    if (response.data) {
                        this.qImage = response.data.img;
                        this.randomImageId = response.data.randomImageId;
                    }
                });
        },
        async onSubmit(event) {
            const results = await event;
            const signatureField = this.getFormField('signature');
            const customCopeField = this.getFormField('customCope');
            const signatureOtherField = this.getFormField('signatureOther');
            let signature = false;

            if (this.eDuesPaymentTemplateIds.includes(parseInt(this.form.form_template_id, 10))) {
                if (this.reCaptchaEnabled) {
                    this.reCaptchaInit('PublicForm/submit');
                }
            }

            if (!results.valid) {
                // alert('form not valid');
                this.formValidationMessage = 'Please fill in all required fields.';
            }

            // COPE Signature
            if (customCopeField) {
                if (customCopeField.value.signature === '' || customCopeField.value.signature == null) {
                    this.validate();
                    document.querySelector('.mfp-signature-field').classList.add('sig-err');
                    await this.goTo(0);
                } else {
                    signature = true;
                    document.querySelector('.mfp-signature-field').classList.remove('sig-err');
                    await this.goTo(0);
                }
            }

            // Additional Signature Component
            if (signatureOtherField) {
                if ((typeof signatureOtherField.fields.signatureOther.value === 'undefined'
                    && signatureOtherField.fields.signatureOther.required === true)
                    || (signatureOtherField.fields.signatureOther.value == null
                    && signatureOtherField.fields.signatureOther.required === true)
                ) {
                    this.validate();
                    document.querySelector('.signatureOther').classList.add('sig-err');
                    await this.goTo(0);
                } else {
                    signature = true;
                    document.querySelector('.signatureOther').classList.remove('sig-err');
                    await this.goTo(0);
                }
            }

            // Basic Signature
            if (signatureField) {
                if ((typeof signatureField.fields.signature.value === 'undefined'
                    && signatureField.fields.signature.required === true)
                    || (signatureField.fields.signature.value == null
                    && signatureField.fields.signature.required === true)
                ) {
                    this.validate();
                    document.querySelector('.signature').classList.add('sig-err');
                    await this.goTo(0);
                } else {
                    signature = true;
                    document.querySelector('.signature').classList.remove('sig-err');
                    await this.goTo(0);
                }
            }
            if (signature) {
                await this.submit(results.valid);
            }
        },
        async submit(isValid) {
            console.log('form', this.form, isValid);
            if (isValid) {
                this.loading = true;
                this.disableButton = true;
                this.form.mathCaptchaAnswer = this.mathCaptchaAnswer;
                this.form.randomImageId = this.randomImageId;
                api.sendFormData(this.form.id, this.form)
                    .then((response) => {
                        console.log(response.data);
                        this.$router.push({ name: 'thankyou', params: { id: this.form.id } });
                    })
                    .catch((error) => {
                        this.errorResponse = error.response;
                        this.disableButton = false;
                        if (this.eDuesPaymentTemplateIds.includes(parseInt(this.form.form_template_id, 10))) {
                            this.fetchMathCaptcha();
                            this.mathCaptchaAnswer = '';
                        }
                        console.log('FORM ERRORS', error.response);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
            await this.goTo(0);
        },
    },
};
</script>

<style lang="scss" scoped>
.bg-404 {
    display: flex;
    padding: 1.25rem;
    color: #000;
    background-color: #FFF;
}
.form-card-header {
    position: relative;
    .first-logo {
        float: left;
        margin: 0 auto;
    }
    .second-logo {
        display: flex;
        margin: 0 auto;
    }
    .third-logo {
        float: right;
        margin: 0 auto;
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
.v-theme--light.v-card > .v-card__text.form-header {
    color: #000;
}
</style>
    