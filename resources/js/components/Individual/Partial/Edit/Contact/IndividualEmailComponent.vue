<template>
    <v-form ref="form" v-model="valid" validate-on="submit" @submit.prevent="onSave">
        <v-card>
            <v-card-title>New Email</v-card-title>
            <v-card-text>
                <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
                <v-row>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-select
                                :items="emailTypes"
                                item-value="IndividualEmailTypeId"
                                item-title="IndividualEmailTypeName"
                                v-model="email.IndividualEmailTypeId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Email Type
                                </template>
                            </v-select>
                        </div>
                    </v-col>

                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-select
                                :items="contactStatus"
                                item-value="ContactStatusId"
                                item-title="ContactStatusName"
                                v-model="email.ContactStatusId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Email Status
                                </template>
                            </v-select>
                        </div>
                    </v-col>

                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-select
                                :items="contactSources"
                                item-value="ContactSourceId"
                                item-title="ContactSourceName"
                                v-model="email.ContactSourceId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Email Source
                                </template>
                            </v-select>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4" class="switches">
                        <v-switch color="accent" label="Preferred Email" :model-value="isPreferred" @update:model-value="onIsPreferred"></v-switch>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field :rules="[rules.required, rules.email]"
                                      v-model="email.Email"
                                      :maxlength="200"
                                      variant="underlined"
                        >
                            <template #label>
                                <span v-if="rules.required" class="text-red">* </span>Email
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-select
                                :items="contactRestrictions"
                                item-value="ContactRestrictionId"
                                item-title="ContactRestrictionName"
                                v-model="email.CanContactRestrictionId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Contact Restriction
                                </template>
                            </v-select>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions v-if="!readOnly && showSaveButton">
                <v-spacer></v-spacer>
                <v-btn @click="cancel()" variant="elevated">Cancel</v-btn>
                <v-btn v-if="!savedEmail" color="secondary" type="submit" variant="elevated" value="continue">Save and Continue Adding...</v-btn>
                <v-btn color="success" type="submit" variant="elevated" value="close">{{ saveButtonLabel }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
import { clone } from "lodash-es";
import billHighway from "../../../../../mixins/Data/billHighway";

    export default {
        name: "IndividualEmailComponent",
        mixins: [billHighway],
        props: {
            individual: {
                type: Object,
                required: true
            },
            savedEmail: {
                type: Object,
                required: false
            },
            showSaveButton: {
                type: Boolean,
                default: true
            },
            readOnly: {
                type: Boolean,
                required: true
            },
            individualEmail: {
                type: Object,
                required: true
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
            },
            isPreferred() {
                return this.email.IsPreferred == '1';
            }
        },

        watch: {
            individualEmail: {
                handler (value) {
                    if (this.email && this.email.IndividualEmailId === this.individualEmail.IndividualEmailId) {
                        return;
                    }
                    // this.individualEmail = value;
                    this.email = this.individualEmail.IndividualEmailId ? clone(value) : value;
                    this.email.ContactStatusId = this.email.ContactStatusId ? this.email.ContactStatusId : 4;
                    this.email.CanContactRestrictionId = this.email.CanContactRestrictionId ? this.email.CanContactRestrictionId : 1;
                }
            },
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
            axios.get('/api/v2/IndividualEmailType').then((response) => {
                this.emailTypes = response.data.data;
            });
            // TODO: use vuex store
            axios.get('/api/v2/ContactRestriction').then((response) => {
                this.contactRestrictions = response.data.data;
            });
            this.email = this.individualEmail.IndividualEmailId ? clone(this.individualEmail) : this.individualEmail;
            this.email.ContactStatusId = this.email.ContactStatusId ? this.email.ContactStatusId : 4;
            this.email.CanContactRestrictionId = this.email.CanContactRestrictionId ? this.email.CanContactRestrictionId : 1;
            this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
        },

        data() {
            return {
                valid: true,
                alert: false,
                alertType: 'success',
                alertText: '',
                emailTypes: [],
                contactRestrictions: [],
                email: {ContactStatusId: 4, CanContactRestrictionId: 1},
                rules: {
                    required: value => !!value || 'Required.',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    },
                },
                emptyEmail: {
                    IndividualEmailTypeId: null,
                    ContactStatusId: 4,
                    ContactSourceId: null,
                    IsPreferred: false,
                    CanContact: false,
                    Email: null,
                    CanContactRestrictionId: 1,
                    IndividualId: this.individual.IndividualId
                },
                selectedAffiliateId: null,
            }
        },

        methods: {
            saveNewEmail() {
                this.email.IndividualId = this.individual.IndividualId;
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
                if (this.savedEmail) {
                    axios.put('/api/v2/IndividualEmail/' + this.savedEmail.IndividualEmailId + '?include=ContactStatus,ContactSource', this.email).then((response) => {
                        this.handleEmailSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/IndividualEmail?include=ContactStatus,ContactSource,CanContactRestriction', this.email).then((response) => {
                        this.resetEmail();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Email saved.';
                        this.handleEmailSaved(response.data.data, false, true);
                    });
                }
            },

            saveCloseEmail() {
                this.email.IndividualId = this.individual.IndividualId;
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
                if (this.savedEmail) {
                    axios.put('/api/v2/IndividualEmail/' + this.savedEmail.IndividualEmailId + '?include=ContactStatus,ContactSource,CanContactRestriction', this.email).then((response) => {
                        this.handleEmailSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/IndividualEmail?include=ContactStatus,ContactSource,CanContactRestriction', this.email).then((response) => {
                        this.resetEmail();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Email saved.';
                        this.handleEmailSaved(response.data.data, true, true);
                    });
                }
            },
            async onSave(event) {
                const { value } = event.submitter;
                const results = await event;
                if (!results.valid) {
                    return;
                }
                if (value === 'continue') {
                    this.saveNewEmail();
                } else if (value === 'close') {
                    this.saveCloseEmail();
                }
            },

            cancel() {
                this.setEditEmail();
                this.$emit('cancel-add-email');
            },

            handleEmailSaved(emailData, flip, isNew) {
                if (emailData.IsPreferred) {
                    this.updateBillHighwayIndividual(this.individual.IndividualId, this.selectedAffiliateId, 'email');
                }
                this.$emit('saved-email', {email: emailData, flip: flip, isNew: isNew});
            },

            onIsPreferred(value) {
                this.email.IsPreferred = value;
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
