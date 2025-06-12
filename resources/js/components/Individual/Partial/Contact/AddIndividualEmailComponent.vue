<template>
    <v-card>
        <v-card-title>Email</v-card-title>
        <v-card-text>
            <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
            <div @click="dataUpdateFlag()">
            <v-row>
                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            ref="resetEmailType"
                            :items="emailTypes"
                            item-value="IndividualEmailTypeId"
                            item-title="IndividualEmailTypeName"
                            v-model="email.IndividualEmailTypeId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Email Type
                            </template>
                        </v-select>
                    </div>
                </v-col>

                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            ref="resetEmailStatus"
                            :items="contactStatus"
                            item-value="ContactStatusId"
                            item-title="ContactStatusName"
                            v-model="email.ContactStatusId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Email Status
                            </template>
                        </v-select>
                    </div>
                </v-col>

                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            ref="resetEmailSource"
                            :items="contactSources"
                            item-value="ContactSourceId"
                            item-title="ContactSourceName"
                            v-model="email.ContactSourceId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Email Source
                            </template>
                        </v-select>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="switches">
                    <v-switch
                        ref="resetPreferredEmail"
                        label="Preferred Email"
                        :model-value="isPreferred"
                        @update:model-value="onIsPreferred"
                        color="accent"
                    >
                    </v-switch>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        ref="resetEmailField"
                        :rules="rulesEmail"
                        v-model="email.Email"
                        :maxlength="200"
                        variant="underlined"
                    >
                        <template #label>
                            <span v-if="required" class="text-red">* </span>Email
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            ref="resetContactRestriction"
                            :items="contactRestrictions"
                            item-value="ContactRestrictionId"
                            item-title="ContactRestrictionName"
                            v-model="email.CanContactRestrictionId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Contact Restriction
                            </template>
                        </v-select>
                    </div>
                </v-col>
            </v-row>
            </div>
            <v-row v-if="!readOnly && required">
                <v-col cols="4">
                    <v-btn
                        color="error"
                        class="mr-4 px-4"
                        @click="resetAllEmail"
                        variant="elevated"
                    >
                        Reset Email
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import { clone } from "lodash-es";
    export default {
        name: "AddIndividualEmailComponent",
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
                    this.email.ContactStatusId = this.email.ContactStatusId ? this.email.ContactStatusId : null;
                    this.email.CanContactRestrictionId = this.email.CanContactRestrictionId ? this.email.CanContactRestrictionId : null;
                }
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
            this.email.ContactStatusId = this.email.ContactStatusId ? this.email.ContactStatusId : null;
            this.email.CanContactRestrictionId = this.email.CanContactRestrictionId ? this.email.CanContactRestrictionId : null;
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
                dataUpdated: false,
                rules: [],
                rulesEmail: [],
                required: false,
                emptyEmail: {
                    IndividualEmailTypeId: null,
                    ContactStatusId: null,
                    ContactSourceId: null,
                    IsPreferred: false,
                    CanContact: false,
                    Email: null,
                    CanContactRestrictionId: null,
                    IndividualId: this.individual.IndividualId
                }
            }
        },

        methods: {
            dataUpdateFlag() {
                if (this.dataUpdated) {
                    return;
                }
                this.rules = [
                    value => !!value || 'Required.',
                ]
                this.rulesEmail = [

                    value => !!value || 'Required.',
                    value => {
                        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        return pattern.test(value) || 'Invalid e-mail.'
                    }
                ]
                this.required = true;
                this.email.ContactStatusId = 4;
                this.email.CanContactRestrictionId = 1;
                this.dataUpdated = true;
            },
            handleEmailSaved(emailData, flip, isNew) {
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
            },
            resetAllEmail() {
                this.$refs.resetEmailType.reset();
                this.$refs.resetEmailStatus.reset();
                this.$refs.resetEmailSource.reset();
                this.email.isPreferred = false;
                this.$refs.resetEmailField.reset();
                this.$refs.resetContactRestriction.reset();
                this.rules = [];
                this.rulesEmail = [];
                this.required = false;
                this.dataUpdated = false;
            },
        }
    }
</script>

<style scoped>

</style>
