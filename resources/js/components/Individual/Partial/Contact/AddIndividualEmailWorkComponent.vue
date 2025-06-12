<template>
    <v-card>
        <v-card-title>Email</v-card-title>
        <v-card-text @click="dataUpdateFlag()">
            <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
            <v-row>
                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            :items="emailTypes"
                            item-value="IndividualEmailTypeId"
                            item-title="IndividualEmailTypeName"
                            v-model="email.IndividualEmailTypeId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if=required class="text-red">* </span>Email Type
                            </template>
                        </v-select>
                    </div>
                </v-col>

                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            :items="contactStatus"
                            item-value="ContactStatusId"
                            item-title="ContactStatusName"
                            v-model="email.ContactStatusId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if=required class="text-red">* </span>Email Status
                            </template>
                        </v-select>
                    </div>
                </v-col>

                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            :items="contactSources"
                            item-value="ContactSourceId"
                            item-title="ContactSourceName"
                            v-model="email.ContactSourceId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if=required class="text-red">* </span>Email Source
                            </template>
                        </v-select>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="switches">
                    <v-switch color="accent" label="Preferred Email" :model-value="isPreferred" @update:model-value="onIsPreferred"></v-switch>
                </v-col>
                <v-col cols="4">
                    <v-text-field :rules="rulesEmail"
                                  v-model="email.Email"
                                  :maxlength="200"
                                  variant="underlined"
                    >
                        <template #label>
                            <span v-if=required class="text-red">* </span>Email
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            :items="contactRestrictions"
                            item-value="ContactRestrictionId"
                            item-title="ContactRestrictionName"
                            v-model="email.CanContactRestrictionId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if=required class="text-red">* </span>Contact Restriction
                            </template>
                        </v-select>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
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
            individualEmailWork: {
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
            individualEmailWork: {
                handler (value) {
                    // this.individualEmailWork = value;
                    this.email = value;
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
            this.email = this.individualEmailWork;
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
                ];
                this.rulesEmail = [
                    value => !!value || 'Required.',
                    value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    }
                ];
                this.required = true;
                this.dataUpdated = true;
            },
            handleEmailSaved(emailData, flip, isNew) {
                this.$emit('saved-email', {email: emailData, flip: flip, isNew: isNew});
            },
            onIsPreferred(value) {
                this.email.IsPreferred = value;
            },
        }
    }
</script>

<style scoped>

</style>
