<template>
    <v-card>
        <v-card-title>{{ pageTitle }}</v-card-title>
        <v-card-text @click="dataUpdateFlag()">
            <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
            <v-row>
                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            :items="phoneTypes"
                            item-value="IndividualPhoneTypeId"
                            item-title="IndividualPhoneTypeName"
                            v-model="phone.IndividualPhoneTypeId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Phone Type
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
                            v-model="phone.ContactStatusId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Phone Status
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
                            v-model="phone.ContactSourceId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Phone Source
                            </template>
                        </v-select>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-autocomplete
                        :items="phoneCountries"
                        item-title="CountryCallingCodeDisplay"
                        item-value="CountryId"
                        v-model="phone.CountryId"
                        label="Country"
                        variant="underlined"
                    />
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        v-model="phone.PhoneNumber"
                        :rules="rules"
                        clearable
                        variant="underlined"
                        v-maska:phnumber.unmasked="(phone.CountryId === 2 || phone.CountryId === 4) ? '(###) ###-####' : null"
                        @maska="onPhoneUpdate"
                    >
                        <template #label>
                            <span v-if="required" class="text-red">* </span>Phone Number
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="Extension"
                                  v-model="phone.Extension"
                                  :maxlength="10"
                                  variant="underlined"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="switches">
                    <v-switch color="accent" label="Preferred" :model-value="isPreferred" @update:model-value="onIsPreferred"></v-switch>
                </v-col>
                <v-col cols="4" class="switches">
                    <v-switch color="accent" label="Text Allowed" v-model="phone.isTextAllowed"></v-switch>
                </v-col>
                <v-col cols="4" class="switches">
                    <v-switch color="accent" label="Do Not Call" v-model="phone.isDoNotCall"></v-switch>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import { vMaska } from "maska/vue";
    import { clone } from "lodash-es";
    export default {
        name: "AddIndividualPhoneMobileComponent",
        directives: { maska: vMaska },
        props: {
            individual: {
                type: Object,
                required: true
            },
            savedPhone: {
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
            individualPhoneMobile: {
                type: Object,
                required: true
            }
        },

        computed: {
            pageTitle() {
                return this.savedPhone ? 'Edit Phone' : 'Add Phone';
            },
            contactSources() {
                return this.$store.getters["contactSource/contactSources"];
            },
            contactStatus() {
                return this.$store.getters["contactStatus/contactStatuses"]
            },
            isPreferred() {
                return this.phone.IsPreferred;
            }
        },

        watch: {
            individualPhoneMobile: {
                handler (value) {
                    this.phone = value;
                    this.phone.ContactStatusId = this.phone.ContactStatusId ? this.phone.ContactStatusId : 4;
                }
            },
        },

        created() {
            this.$store.dispatch('contactSource/getContactSources');
            this.$store.dispatch('contactStatus/getContactStatuses');
        },

        mounted() {
            axios.get('/api/v2/IndividualPhoneType').then((response) => {
                this.phoneTypes = response.data.data;
            });
            axios.get('/api/v3/memberforms/countries').then((response) => {
                this.phoneCountries = response.data;
            });
            this.phone = this.individualPhoneMobile;
            this.phone.ContactStatusId = this.phone.ContactStatusId ? this.phone.ContactStatusId : 4;
        },

        data() {
            return {
                valid: true,
                alert: false,
                alertType: 'success',
                alertText: '',
                phoneTypes: [],
                phoneCountries: [],
                phone: {},
                dataUpdated: false,
                rules: [],
                required: false,
                emptyPhone: {
                    IndividualPhoneTypeId: null,
                    ContactStatusId: null,
                    ContactSourceId: null,
                    IsPreferred: false,
                    isTextAllowed: false,
                    isDoNotCall: false,
                    CanContact: false,
                    PhoneNumber: null,
                    Extension: null,
                    CanCallRestrictionId: null,
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
                this.required = true;
                this.phone.ContactStatusId = 4;
                this.dataUpdated = true;
            },
            handlePhoneSaved(phoneData, flip, isNew) {
                this.$emit('saved-phone', {phone: phoneData, flip: flip, isNew: isNew});
            },
            resetPhone() {
                for (const field in this.emptyPhone) {
                    if (this.emptyPhone.hasOwnProperty(field)) {
                        this.phone[field] = this.emptyPhone[field];
                    }
                }
            },

            setEditPhone() {
                this.phone = clone(this.savedPhone) || clone(this.emptyPhone);
            },
            onPhoneUpdate(event) {
                this.phone.PhoneNumber = event.detail.unmasked;
            },
            onIsPreferred(value) {
                this.phone.IsPreferred = value;
            },
        }
    }
</script>

<style scoped>

</style>
