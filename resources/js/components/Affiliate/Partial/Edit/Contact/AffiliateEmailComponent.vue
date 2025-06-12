<template>
    <v-form ref="form" v-model="valid">
        <v-card>
            <v-card-title>New Email</v-card-title>
            <v-card-text>
                <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
                <v-row>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-select
                                :items="emailTypes"
                                label="Email Type"
                                item-value="AffiliateEmailTypeId"
                                item-title="AffiliateEmailTypeName"
                                v-model="email.AffiliateEmailTypeId"
                                :rules="[rules.required]"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>

                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-select
                                :items="contactStatus"
                                label="Email Status"
                                item-value="ContactStatusId"
                                item-title="ContactStatusName"
                                v-model="email.ContactStatusId"
                                :rules="[rules.required]"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>

                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-select
                                :items="contactSources"
                                item-value="ContactSourceId"
                                item-title="ContactSourceName"
                                label="Email Source"
                                v-model="email.ContactSourceId"
                                :rules="[rules.required]"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4" class="switches">
                        <v-switch color="accent" label="Preferred Email" v-model="email.IsPreferred"></v-switch>
                    </v-col>
                    <v-col cols="12" lg="4" class="switches">
                        <v-switch color="accent" label="Can Contact" v-model="email.CanContact"></v-switch>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Email" :rules="[rules.required, rules.email]"
                                      v-model="email.Email"
                                      :maxlength="200"
                                      variant="underlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel()" variant="elevated">Cancel</v-btn>
                <v-btn v-if="!this.savedEmail" color="secondary" href="" @click="saveNewEmail()" variant="elevated">save and continue adding...</v-btn>
                <v-btn  color="success" href="" @click="saveCloseEmail()" variant="elevated">{{ saveButtonLabel }}</v-btn>

            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
    import { clone } from "lodash-es";
    export default {
        name: "AffiliateEmailComponent",

        props: {
            affiliate: {
                type: Object,
                required: true
            },
            savedEmail: {
                type: Object,
                required: false
            }
        },

        computed: {
            saveButtonLabel() {
                return this.savedEmail ? 'Save' : 'save and close';
            },
            contactSources() {
                return this.$store.getters["contactSource/contactSources"];
            },
            contactStatus() {
                return this.$store.getters["contactStatus/contactStatuses"]
            }
        },

        watch: {
            savedEmail: {
                handler(data) {
                    // this.savedEmail = data;
                    this.setEditEmail();
                },
                deep: true
            }
        },

        created() {
            this.$store.dispatch('contactSource/getContactSources');
            this.$store.dispatch('contactStatus/getContactStatuses');
        },

        mounted() {
            axios.get('/api/v2/AffiliateEmailType').then((response) => {
                this.emailTypes = response.data.data;
            });
        },

        data() {
            return {
                valid: true,
                alert: false,
                alertType: 'success',
                alertText: '',
                emailTypes: [],
                email: {ContactStatusId: 4},
                rules: {
                    required: value => !!value || 'Required.',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    },
                },
                emptyEmail: {
                    AffiliateEmailTypeId: null,
                    ContactStatusId: 4,
                    ContactSourceId: null,
                    IsPreferred: false,
                    CanContact: false,
                    Email: null,
                    AffiliateId: this.affiliate.AffiliateId
                }
            }
        },

        methods: {
            saveNewEmail() {
                if (!this.$refs.form.validate()) {
                    return;
                }
                this.email.AffiliateId = this.affiliate.AffiliateId;
                this.email.CanContact = (typeof this.email.CanContact === 'undefined' || this.email.CanContact === null) ? false : this.email.CanContact;
                if(this.email.ContactStatusId === 4){
                    this.email.IsPreferred = (typeof this.email.IsPreferred === 'undefined' || this.email.IsPreferred === null) ? false : this.email.IsPreferred;
                } else {
                    if(this.email.IsPreferred){
                        this.alert = true;
                        this.alertType = 'error';
                        this.alertText = 'Email must be in verified status, to be marked as preferred.';
                        return;
                    }
                }
                // @TODO: change this after it is decided which way to go:
                this.email.CanContactRestrictionId = 1;
                if (this.savedEmail) {
                    axios.put('/api/v2/AffiliateEmail/' + this.savedEmail.AffiliateEmailId + '?include=ContactStatus,ContactSource', this.email).then((response) => {
                        this.handleEmailSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/AffiliateEmail?include=ContactStatus,ContactSource', this.email).then((response) => {
                        this.resetEmail();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Email saved.';
                        this.handleEmailSaved(response.data.data, false, true);
                    });
                }
            },

            saveCloseEmail() {
                if (!this.$refs.form.validate()) {
                    return;
                }
                this.email.AffiliateId = this.affiliate.AffiliateId;
                this.email.CanContact = (typeof this.email.CanContact === 'undefined' || this.email.CanContact === null) ? false : this.email.CanContact;
                if(this.email.ContactStatusId === 4){
                    this.email.IsPreferred = (typeof this.email.IsPreferred === 'undefined' || this.email.IsPreferred === null) ? false : this.email.IsPreferred;
                } else {
                    if(this.email.IsPreferred){
                        this.alert = true;
                        this.alertType = 'error';
                        this.alertText = 'Email must be in verified status, to be marked as preferred.';
                        return;
                    }
                }
                // @TODO: change this after it is decided which way to go:
                this.email.CanContactRestrictionId = 1;
                if (this.savedEmail) {
                    axios.put('/api/v2/AffiliateEmail/' + this.savedEmail.AffiliateEmailId + '?include=ContactStatus,ContactSource', this.email).then((response) => {
                        this.handleEmailSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/AffiliateEmail?include=ContactStatus,ContactSource', this.email).then((response) => {
                        this.resetEmail();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Email saved.';
                        this.handleEmailSaved(response.data.data, true, true);
                    });
                }
            },

            cancel() {
                this.setEditEmail();
                this.$emit('cancel-add-email');
            },

            handleEmailSaved(emailData, flip, isNew) {
                this.$emit('saved-email', {email: emailData, flip: flip, isNew: isNew});
            },

            resetEmail() {
                for (const field in this.emptyEmail) {
                    if (this.emptyEmail.hasOwnProperty(field)) {
                        this.email[field] = this.emptyEmail[field];
                    }
                }
            },

            setEditEmail() {
                this.email = clone(this.savedEmail) || clone(this.emptyEmail);
            }
        }
    }
</script>

<style scoped>

</style>
