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
                                item-value="IndividualPhoneTypeId"
                                item-title="IndividualPhoneTypeName"
                                v-model="phone.IndividualPhoneTypeId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Phone Type
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
                                v-model="phone.ContactStatusId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Phone Status
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
                                v-model="phone.ContactSourceId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Phone Source
                                </template>
                            </v-select>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-autocomplete
                                :items="phoneCountries"
                                item-title="CountryCallingCodeDisplay"
                                item-value="CountryId"
                                v-model="phoneCountryId"
                                label="Country"
                                variant="underlined"
                            />
                        </div>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field :rules="phoneFormatCountryIds.includes(phone.CountryId) ? [rules.required, rules.phone] : [rules.required]"
                                      v-model="formattedPhoneNumber"
                                      clearable
                                      variant="underlined"
                        >
                            <template #label>
                                <span v-if="rules.required" class="text-red">* </span>Phone Number
                            </template>
                        </v-text-field>
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
                        <v-switch color="accent" label="Preferred" :model-value="isPreferred" @update:model-value="onIsPreferred"></v-switch>
                    </v-col>
                    <v-col cols="12" lg="4" class="switches">
                        <v-switch color="accent" label="Text Allowed" v-model="phone.isTextAllowed"></v-switch>
                    </v-col>
                    <v-col cols="12" lg="4" class="switches">
                        <v-switch color="accent" label="Do Not Call" v-model="phone.isDoNotCall"></v-switch>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions v-if="!readOnly && showSaveButton">
                <v-spacer></v-spacer>
                <v-btn @click="cancel()" variant="elevated">Cancel</v-btn>
                <v-btn v-if="!savedPhone" color="secondary" type="submit" variant="elevated" value="continue">Save and continue adding...</v-btn>
                <v-btn color="success" type="submit" variant="elevated" value="close">{{ saveButtonLabel }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
import { clone } from "lodash-es";
import billHighway from "../../../../../mixins/Data/billHighway";

    export default {
        name: "IndividualPhoneComponent",
        mixins: [billHighway],
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
            individualPhone: {
                type: Object,
                required: true
            }
        },

        computed: {
            saveButtonLabel() {
                return this.savedPhone ? 'Save' : 'save and close';
            },
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
                return this.phone.IsPreferred == '1';
            }
        },

        watch: {
            phoneCountryId() {
                this.formattedPhoneNumber = this.formatPhoneNumber(this.formattedPhoneNumber);
            },
            formattedPhoneNumber() {
                if(this.formattedPhoneNumber !== '') {
                    this.formattedPhoneNumber = this.formatPhoneNumber(this.formattedPhoneNumber);
                    this.phone.PhoneNumber = this.revertPhoneNumberFormat(this.formattedPhoneNumber);
                }
            },
            individualPhone: {
                handler (value) {
                    if (this.phone && this.phone.IndividualPhoneId === this.individualPhone.IndividualPhoneId) {
                        return;
                    }
                    // this.individualPhone = value;
                    this.phone = this.individualPhone.IndividualPhoneId ? clone(value) : value;
                    this.phone.ContactStatusId = this.phone.ContactStatusId ? this.phone.ContactStatusId : 4;
                    this.phone.CountryId = this.phone.CountryId ? this.phone.CountryId : 4;
                    this.phoneCountryId = parseInt(this.phone.CountryId, 10);
                }
            },
            savedPhone() {
                this.setEditPhone();
                this.formattedPhoneNumber = this.formatPhoneNumber(this.phone.PhoneNumber);
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
            axios.get('/api/v2/Country?sort=DisplayOrder&per_page=1000').then((response) => {
                this.phoneCountries = this.filterCountries(response.data.data);
            });
            this.phone = this.individualPhone.IndividualPhoneId ? clone(this.individualPhone) : this.individualPhone;
            this.phone.ContactStatusId = this.phone.ContactStatusId ? this.phone.ContactStatusId : 4;
            this.phone.CountryId = this.phone.CountryId ? this.phone.CountryId : 4;
            this.phoneCountryId = parseInt(this.phone.CountryId, 10);
            this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
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
                formattedPhoneNumber: '',
                phoneFormatCountryIds: [2, 4],
                phoneCountryId: 4,
                rules: {
                    required: value => !!value || 'Required.',
                    phone: value => {
                        const pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
                        return pattern.test(value) || 'Please enter a valid phone number.'
                    },
                },
                emptyPhone: {
                    IndividualPhoneTypeId: null,
                    ContactStatusId: 4,
                    ContactSourceId: null,
                    IsPreferred: false,
                    isTextAllowed: false,
                    isDoNotCall: false,
                    CanContact: false,
                    PhoneNumber: null,
                    Extension: null,
                    CanCallRestrictionId: null,
                    CountryId: 4,
                    IndividualId: this.individual.IndividualId
                },
                selectedAffiliateId: null,
            }
        },

        methods: {
            formatPhoneNumber(phoneNumber) {
                if (this.phoneFormatCountryIds.includes(this.phoneCountryId) && phoneNumber && phoneNumber !== undefined && phoneNumber !== null && phoneNumber != '') {
                    const x = phoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                    return (!x[2] ? x[1] : `(${x[1]}) ${x[2]}-${x[3]}`);
                }
                return phoneNumber;
            },
            revertPhoneNumberFormat(formattedPhoneNumber) {
                // console.log('In here revertPhoneNumberFormat:', formattedPhoneNumber);
                if (formattedPhoneNumber && formattedPhoneNumber != '') {
                    return formattedPhoneNumber.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
                }
                return formattedPhoneNumber;
            },
            saveNewPhone() {
                this.phone.IndividualId = this.individual.IndividualId;
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

                this.phone.CanTextRestrictionId = (this.phone.isTextAllowed === true) ? 1 : 2;
                this.phone.CanCallRestrictionId = (this.phone.isDoNotCall === true) ? 2 : 1;
                this.phone.CountryId = this.phoneCountryId;
                // @TODO: change this after it is decided which way to go:
                if (this.savedPhone) {
                    axios.put('/api/v2/IndividualPhone/' + this.savedPhone.IndividualPhoneId + '?include=ContactStatus,ContactSource', this.phone).then((response) => {
                        this.handlePhoneSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/IndividualPhone?include=ContactStatus,ContactSource', this.phone).then((response) => {
                        this.resetPhone();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Phone saved.';
                        this.handlePhoneSaved(response.data.data, false, true);
                    });
                }
            },

            saveClosePhone() {
                this.phone.IndividualId = this.individual.IndividualId;
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
                this.phone.CanCallRestrictionId = (this.phone.isDoNotCall === true) ? 2 : 1;
                this.phone.CountryId = this.phoneCountryId;
                if (this.savedPhone) {
                    axios.put('/api/v2/IndividualPhone/' + this.savedPhone.IndividualPhoneId + '?include=ContactStatus,ContactSource', this.phone).then((response) => {
                        this.handlePhoneSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/IndividualPhone?include=ContactStatus,ContactSource', this.phone).then((response) => {
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
                if (phoneData.IsPreferred) {
                    this.updateBillHighwayIndividual(this.individual.IndividualId, this.selectedAffiliateId, 'phone');
                }
                this.$emit('saved-phone', {phone: phoneData, flip: flip, isNew: isNew});
            },

            resetPhone() {
                for (const field in this.emptyPhone) {
                    if (this.emptyPhone.hasOwnProperty(field)) {
                        this.phone[field] = this.emptyPhone[field];
                    }
                }
                this.phoneCountryId = 4;
                this.formattedPhoneNumber = '';
            },

            setEditPhone() {
                if (this.savedPhone) {
                    this.phoneCountryId = this.savedPhone.CountryId;
                    this.phone = clone(this.savedPhone);
                    this.phone.isTextAllowed = this.savedPhone?.CanTextRestrictionId === 1;
                    this.phone.isDoNotCall = this.savedPhone?.CanCallRestrictionId !== 1;
                } else {
                    this.phone = clone(this.emptyPhone);
                }
            },

            filterCountries(countries) {
                let result = [];
                countries.forEach( (country) => {
                    if (country.CountryCallingCode !== '') {
                        let item = {
                            CountryId: country.CountryId,
                            CountryCallingCode: country.CountryCallingCode,
                            CountryCallingCodeDisplay: '+' + country.CountryCallingCode + ' (' + country.CountryCode + ')',
                        }
                        result.push(item);
                    }
                } );

                return result;
            },
            onIsPreferred(value) {
                this.phone.IsPreferred = value;
            },
        }
    }
</script>

<style scoped>

</style>
