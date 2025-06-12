<template>
    <v-form ref="form" validate-on="submit" @submit.prevent="onSave">
        <v-card>
            <v-card-title>{{ pageTitle }}</v-card-title>
            <v-card-text>
                <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
                <v-row>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-select
                                :items="phoneTypes"
                                label="Phone Type"
                                item-value="AffiliatePhoneTypeId"
                                item-title="AffiliatePhoneTypeName"
                                v-model="phone.AffiliatePhoneTypeId"
                                :rules="[rules.required]"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>

                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-select
                                :items="contactStatus"
                                label="Phone Status"
                                item-value="ContactStatusId"
                                item-title="ContactStatusName"
                                v-model="phone.ContactStatusId"
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
                                label="Phone Source"
                                v-model="phone.ContactSourceId"
                                :rules="[rules.required]"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Phone Number" :rules="[rules.required, rules.phone]"
                                      v-model="phone.PhoneNumber"
                                      :maxlength="20"
                                      variant="underlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Extension"
                                      v-model="phone.Extension"
                                      :maxlength="10"
                                      variant="underlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4" class="switches">
                        <v-switch color="accent" label="Preferred" v-model="phone.IsPreferred"></v-switch>
                    </v-col>
                    <v-col cols="12" lg="4" class="switches">
                        <v-switch color="accent" label="Text Allowed" v-model="phone.isTextAllowed"></v-switch>
                    </v-col>
                    <v-col cols="12" lg="4" class="switches">
                        <v-switch color="accent" label="Do Not Call" v-model="phone.isCallAllowed"></v-switch>
                    </v-col>
                </v-row>

            </v-card-text>
            <v-card-actions>
               <v-spacer></v-spacer>
                <v-btn @click="cancel()" variant="elevated">Cancel</v-btn>
                <v-btn v-if="!this.savedPhone" color="secondary" type="submit" variant="elevated" value="continue">Save and continue adding...</v-btn>
                <v-btn color="success" type="submit" variant="elevated" value="close">{{ saveButtonLabel }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
    import { clone } from "lodash-es";
    export default {
        name: "AffiliatePhoneComponent",

        props: {
            affiliate: {
                type: Object,
                required: true
            },
            savedPhone: {
                type: Object,
                required: false
            }
        },

        computed: {
            saveButtonLabel() {
                return this.savedPhone ? 'Save' : 'save and close';
            },
            pageTitle() {
                return this.savedPhone ? 'Edit Phone' : 'New Phone';
            },
            contactSources() {
                return this.$store.getters["contactSource/contactSources"];
            },
            contactStatus() {
                return this.$store.getters["contactStatus/contactStatuses"]
            }
        },

        watch: {
            savedPhone() {
                this.setEditPhone();
            }
        },

        created() {
            this.$store.dispatch('contactSource/getContactSources');
            this.$store.dispatch('contactStatus/getContactStatuses');
        },

        mounted() {
            axios.get('/api/v2/AffiliatePhoneType').then((response) => {
                this.phoneTypes = response.data.data;
            });
        },

        data() {
            return {
                valid: true,
                alert: false,
                alertType: 'success',
                alertText: '',
                phoneTypes: [],
                phone: {ContactStatusId: 4},
                rules: {
                    required: value => !!value || 'Required.',
                    phone: value => {
                        const pattern = /^([0-9\(\)\/\+ \-]*)$/
                        return pattern.test(value) || 'Please enter a valid phone number.'
                    },
                },
                emptyPhone: {
                    AffiliatePhoneTypeId: null,
                    ContactStatusId: 4,
                    ContactSourceId: null,
                    IsPreferred: false,
                    isTextAllowed: false,
                    CanContact: false,
                    PhoneNumber: null,
                    Extension: null,
                    CanCallRestrictionId: null,
                    AffiliateId: this.affiliate.AffiliateId
                }
            }
        },

        methods: {
            saveNewPhone() {
                this.phone.AffiliateId = this.affiliate.AffiliateId;
                if(this.phone.ContactStatusId === 4){
                    this.phone.IsPreferred = (typeof this.phone.IsPreferred === 'undefined' || this.phone.IsPreferred === null) ? false : this.phone.IsPreferred;
                } else {
                    if(this.phone.IsPreferred){
                        this.alert = true;
                        this.alertType = 'error';
                        this.alertText = 'Phone must be in verified status, to be marked as preferred.';
                        return;
                    }
                }
                // @TODO: change this after it is decided which way to go:
                this.phone.CanTextRestrictionId = (this.phone.isTextAllowed === true) ? 1 : 2;
                this.phone.CanCallRestrictionId = (this.phone.isCallAllowed === true) ? 1 : 2;
                if (this.savedPhone) {
                    axios.put('/api/v2/AffiliatePhone/' + this.savedPhone.AffiliatePhoneId + '?include=ContactStatus,ContactSource', this.phone).then((response) => {
                        this.handlePhoneSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/AffiliatePhone?include=ContactStatus,ContactSource', this.phone).then((response) => {
                        this.resetPhone();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Phone saved.';
                        this.handlePhoneSaved(response.data.data, false, true);
                    });
                }
            },

            saveClosePhone() {
                this.phone.AffiliateId = this.affiliate.AffiliateId;
                if(this.phone.ContactStatusId === 4){
                    this.phone.IsPreferred = (typeof this.phone.IsPreferred === 'undefined' || this.phone.IsPreferred === null) ? false : this.phone.IsPreferred;
                } else {
                    if(this.phone.IsPreferred){
                        this.alert = true;
                        this.alertType = 'error';
                        this.alertText = 'Phone must be in verified status, to be marked as preferred.';
                        return;
                    }
                }
                // @TODO: change this after it is decided which way to go:
                this.phone.CanTextRestrictionId = (this.phone.isTextAllowed === true) ? 1 : 2;
                this.phone.CanCallRestrictionId = (this.phone.isCallAllowed === true) ? 1 : 2;
                if (this.savedPhone) {
                    axios.put('/api/v2/AffiliatePhone/' + this.savedPhone.AffiliatePhoneId + '?include=ContactStatus,ContactSource', this.phone).then((response) => {
                        this.handlePhoneSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/AffiliatePhone?include=ContactStatus,ContactSource', this.phone).then((response) => {
                        this.resetPhone();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Phone saved.';
                        this.handlePhoneSaved(response.data.data, true, true);
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
                    this.saveNewPhone();
                } else {
                    this.saveClosePhone();
                }
            },

            cancel() {
                this.setEditPhone();
                this.$emit('cancel-add-phone');
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
                if (this.savedPhone) {
                    this.phone = clone(this.savedPhone);
                    this.phone.isTextAllowed = this.savedPhone?.CanTextRestrictionId === 1;
                    this.phone.isCallAllowed = this.savedPhone?.CanCallRestrictionId === 1;
                } else {
                    this.phone = clone(this.emptyPhone);
                }
            }
        }
    }
</script>

<style scoped>

</style>
