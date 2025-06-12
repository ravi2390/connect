<template>
    <v-container fluid>
        <v-form
            ref="form"
            validate-on="submit"
            @submit.prevent="doNext"
        >
        <v-row>
            <v-col>
                <h2>Submission Confirmation and Email</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-container flex>
                    <v-row>
                        <v-col class="formHeaderSettings">
                            <MfpTextField
                                v-model="thankYouFields.thankyouHeader.value"
                                :field="thankYouFields.thankyouHeader"
                                class="formHeader"
                            />
                            <MfpTextAreaField
                                v-model="thankYouFields.thankyouBody.value"
                                :field="thankYouFields.thankyouBody"
                                :designer="true"
                                class="formHeader"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="formHeaderSettings">
                <v-checkbox
                    v-model="sendEmail"
                    :label="confirmationEmailFields.sendConfirmationEmail.label"
                />
                <v-text-field
                    v-model="confirmationEmailFields.confirmationEmailFrom.value"
                    disabled
                />
                <MfpTextField
                    v-model="confirmationEmailFields.confirmationEmailCC.value"
                    :field="confirmationEmailFields.confirmationEmailCC"
                />
                <MfpTextField
                    v-model="confirmationEmailFields.confirmationEmailBCC.value"
                    :field="confirmationEmailFields.confirmationEmailBCC"
                />
                <MfpTextAreaField
                    v-model="confirmationEmailFields.confirmationEmailBody.value"
                    :field="confirmationEmailFields.confirmationEmailBody"
                    :disabled="!confirmationEmailFields.sendConfirmationEmail.value"
                    :designer="true"
                    class="formHeader"
                />
                <v-expansion-panels
                    :disabled="!confirmationEmailFields.sendConfirmationEmail.value"
                >
                    <v-expansion-panel>
                        <v-expansion-panel-title><strong>Token list</strong></v-expansion-panel-title>
                        <v-expansion-panel-text>
                            {affiliate_number} - Affiliate Number <br>
                            {affiliate_name} - Affiliate Name <br>
                            {chapter_name} - Chapter Name <br>
                            {unit_name} - Unit Name <br>
                            {affiliate_address_line1} - Affiliate Address Line1 <br>
                            {affiliate_address_line2} - Affiliate Address Line2 <br>
                            {affiliate_address_city} - Affiliate Address City <br>
                            {affiliate_address_state} - Affiliate Address State <br>
                            {affiliate_address_zip} - Affiliate Address Zip <br>
                            {submission_first_name} - Submission First Name <br>
                            {submission_last_name} - Submission Last Name <br>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex justify-space-between ga-2">
                <v-btn
                    @click.prevent="doPrev()"
                >
                    {{ cancelText }}
                </v-btn>
                <v-btn
                    color="#0A2A5C"
                    type="submit"
                >
                    {{ confirmText }}
                </v-btn>
            </v-col>
        </v-row>
        </v-form>
        <v-overlay
            :model-value="loading"
            opacity=".5"
            scrim="#FFF"
        />
    </v-container>
</template>

<script>
import api from '../../../../api/private';
import MfpTextField from "../../../shared/components/MfpTextField.vue";
import MfpTextAreaField from "../../../shared/components/MfpTextAreaField.vue";

export default {
    name: 'FormBuilderConfirmation',
    components: {
        MfpTextField,
        MfpTextAreaField,
    },
    options: {
        label: 'Submission Confirmation and Email',
    },
    props: {
        store: { type: Object, required: true },
    },
    emits: ['prev', 'next', 'reset'],
    data: () => ({
        loading: false,
        actions: api.getFormActions(),
        thankYouFields: null,
        sendEmail: false,
        confirmationEmailFields: null,
        isEditConfirmationOnly: false,
    }),
    watch: {
        thankYouFields: {
            deep: true,
            handler() {
                this.store.form.thankyou_fields.fields = this.thankYouFields;
                localStorage.formBuilderActiveTemplate = JSON.stringify(this.store);
            },
        },
        sendEmail() {
            this.confirmationEmailFields.sendConfirmationEmail.value = this.sendEmail;
            this.enableDisableEmailFields(this.sendEmail);

            this.store.form.confirmation_email_fields.fields = this.confirmationEmailFields;
            localStorage.formBuilderActiveTemplate = JSON.stringify(this.store);
        },
        confirmationEmailFields: {
            deep: true,
            handler() {
                this.store.form.confirmation_email_fields.fields = this.confirmationEmailFields;
                localStorage.formBuilderActiveTemplate = JSON.stringify(this.store);
            },
        },
    },
    computed: {
        cancelText() {
            return this.isEditConfirmationOnly ? 'Cancel (back to Manage Forms)' : 'Back';
        },
        confirmText() {
            return this.isEditConfirmationOnly ? 'Update confirmation' : 'Continue';
        },
    },
    created() {
        this.isEditConfirmationOnly = this.store.action === this.actions.editConfirmation;

        // Thank You
        this.thankYouFields = this.store.form.thankyou_fields.fields;
        if (this.thankYouFields.thankyouHeader.value === undefined) {
            this.thankYouFields.thankyouHeader.value = this.thankYouFields.thankyouHeader.default;
            this.thankYouFields.thankyouBody.value = this.thankYouFields.thankyouBody.default;
        }

        // Email
        this.confirmationEmailFields = this.store.form.confirmation_email_fields.fields;
        this.confirmationEmailFields.confirmationEmailFrom.disabled = true;
        if (this.confirmationEmailFields.confirmationEmailFrom.value === undefined) {
            this.confirmationEmailFields.sendConfirmationEmail.value = this.sendEmail;
            this.confirmationEmailFields.confirmationEmailCC.value = '';
            this.confirmationEmailFields.confirmationEmailCC.tooltip = true;
            this.confirmationEmailFields.confirmationEmailCC.toolText = 'To include more than one CC recipient, separate email addresses with a comma';
            this.confirmationEmailFields.confirmationEmailBCC.value = '';
            this.confirmationEmailFields.confirmationEmailBCC.tooltip = true;
            this.confirmationEmailFields.confirmationEmailBCC.toolText = 'To include more than one BCC recipient, separate email addresses with a comma';
            this.confirmationEmailFields.confirmationEmailFrom.value = this.confirmationEmailFields.confirmationEmailFrom.default;
            this.confirmationEmailFields.confirmationEmailSubject.value = this.confirmationEmailFields.confirmationEmailSubject.default;
            this.confirmationEmailFields.confirmationEmailBody.value = this.confirmationEmailFields.confirmationEmailBody.default;
        } else {
            this.sendEmail = this.confirmationEmailFields.sendConfirmationEmail.value;
        }
        this.enableDisableEmailFields(this.sendEmail);

        this.store.form.thankyou_fields.fields = this.thankYouFields;
        this.store.form.confirmation_email_fields.fields = this.confirmationEmailFields;
        localStorage.formBuilderActiveTemplate = JSON.stringify(this.store);
    },
    methods: {
        doPrev() {
            if (this.isEditConfirmationOnly) {
                // this.$emit('reset');
                this.$router.push({ path: 'manage' });
            } else {
                this.$emit('prev');
            }
        },
        async doNext(event) {
            const results = await event;
            console.log({ results})
            if (this.isEditConfirmationOnly) {
                this.save();
            } else {
                if (results.valid) {
                    this.$emit('next');
                }
            }
        },
        enableDisableEmailFields(sendEmail) {
            this.confirmationEmailFields.confirmationEmailCC.disabled = !sendEmail;
            this.confirmationEmailFields.confirmationEmailBCC.disabled = !sendEmail;
            this.confirmationEmailFields.confirmationEmailBody.disabled = !sendEmail;
        },
        save() {
            api.formCreate(this.store)
                .then(() => {
                    this.$emit('reset');
                    this.$router.push({ path: 'manage' });
                })
                .catch((error) => {
                    alert(error);
                });
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
</style>
