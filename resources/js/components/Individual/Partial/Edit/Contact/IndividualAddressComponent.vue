<template>
    <v-form ref="form" validate-on="submit" @submit.prevent="onSave">
    <v-card>
        <v-card-title>{{ newOrEditAddress }}</v-card-title>
        <v-card-text>
            <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
            <v-row>
                <v-col cols="12" lg="4">
                    <div class="data-container">
                        <v-select
                            :items="addressTypes"
                            item-value="IndividualAddressTypeId"
                            item-title="IndividualAddressTypeName"
                            v-model="address.IndividualAddressTypeId"
                            :rules="[rules.required]"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="rules.required" class="text-red">* </span>Address Type
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
                            v-model="address.ContactStatusId"
                            :rules="[rules.required]"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="rules.required" class="text-red">* </span>Address Status
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
                            v-model="address.ContactSourceId"
                            :rules="[rules.required]"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="rules.required" class="text-red">* </span>Address Source
                            </template>
                        </v-select>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="4" class="switches">
                    <v-switch color="accent" label="Preferred Address" :model-value="isPreferred" @update:model-value="onIsPreferred"></v-switch>
                </v-col>
                <v-col cols="4" class="switches">
                    <v-switch color="accent" label="Do Not Visit" v-model="address.DoNotVisit"></v-switch>
                </v-col>
                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            :items="contactRestrictions"
                            item-value="ContactRestrictionId"
                            item-title="ContactRestrictionName"
                            v-model="address.CanSendMailRestrictionId"
                            :rules="[rules.required]"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="rules.required" class="text-red">* </span>Mailing Contact Restriction
                            </template>
                        </v-select>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-text-field :rules="[rules.required]"
                                  v-model="address.AddressLine1"
                                  :maxlength="200"
                                  variant="underlined"
                    >
                        <template #label>
                            <span v-if="rules.required" class="text-red">* </span>Street Address
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="Suite/Apt"
                                  v-model="address.AddressLine2"
                                  :maxlength="200"
                                  variant="underlined"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field :rules="[rules.required]"
                                  v-model="address.City"
                                  :maxlength="100"
                                  variant="underlined"
                    >
                        <template #label>
                            <span v-if="rules.required" class="text-red">* </span>City
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <div class="data-container">
                        <StateTerritorySelectComponent
                            item-value="StateTerritoryId"
                            item-text="StateTerritoryName"
                            label="State"
                            v-model="address.StateTerritoryId"
                            :rules="[rules.required]"
                        />
                    </div>
                </v-col>
                <v-col cols="4">
                    <v-text-field :rules="[rules.required]"
                                  v-model="address.PostalCode"
                                  :maxlength="15"
                                  variant="underlined"
                    >
                        <template #label>
                            <span v-if="rules.required" class="text-red">* </span>Zip Code
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions v-if="!readOnly && showSaveButton">
            <v-spacer></v-spacer>
            <v-btn @click="cancel()" variant="elevated">Cancel</v-btn>
            <v-btn v-if="!savedAddress" color="secondary" type="submit" variant="elevated" value="continue">Save and Continue Adding...</v-btn>
            <v-btn color="success" type="submit" variant="elevated" value="close">{{ saveButtonLabel }}</v-btn>
        </v-card-actions>
    </v-card>
    </v-form>
</template>

<script>
    import { clone } from "lodash-es";
    import StateTerritorySelectComponent from "../../../../Common/StateTerritorySelectComponent";
    import billHighway from "../../../../../mixins/Data/billHighway";

    export default {
        name: "IndividualAddressComponent",
        components: {StateTerritorySelectComponent},
        mixins: [billHighway],
        props: {
            individual: {
                type: Object,
                required: true
            },
            savedAddress: {
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
            individualAddress: {
                type: Object,
                required: true
            }
        },
        emits: ['saved-address', 'cancel-add-address'],
        computed: {
            newOrEditAddress() {
                if(!this.savedAddress){
                    this.resetAddress();
                    return 'New Address';
                }
                else {
                    return 'Edit Address';
                }
            },
            saveButtonLabel() {
                return this.savedAddress ? 'Save' : 'save and close';
            },
            contactSources() {
                return this.$store.getters["contactSource/contactSources"];
            },
            contactStatus() {
                return this.$store.getters["contactStatus/contactStatuses"]
            },
            isPreferred() {
                return this.address.IsPreferred == '1';
            }
        },

        watch: {
            individualAddress: {
                handler (value) {
                    if (this.address && this.address.IndividualAddressId === this.individualAddress.IndividualAddressId) {
                        return;
                    }
                    // this.individualAddress = value;
                    this.address = this.individualAddress.IndividualAddressId ? clone(value) : value;
                    this.address.ContactStatusId = this.address.ContactStatusId ? this.address.ContactStatusId : 4;
                    this.address.CanContactRestrictionId = this.address.CanContactRestrictionId ? this.address.CanContactRestrictionId : 1;
                }
            },
            savedAddress: {
                handler(data) {
                    // this.savedAddress = data;
                    this.setEditAddress();
                },
                deep: true
            }
        },

        created() {
            this.$store.dispatch('contactSource/getContactSources');
            this.$store.dispatch('contactStatus/getContactStatuses');
        },

        mounted() {
            axios.get('/api/v2/IndividualAddressType').then((response) => {
                this.addressTypes = response.data.data;
            });
            // TODO: use vuex store
            axios.get('/api/v2/ContactRestriction').then((response) => {
                this.contactRestrictions = response.data.data;
            });
            this.address = this.individualAddress.IndividualAddressId ? clone(this.individualAddress) : this.individualAddress;
            this.address.ContactStatusId = this.address.ContactStatusId ? this.address.ContactStatusId : 4;
            this.address.CanContactRestrictionId = this.address.CanContactRestrictionId ? this.address.CanContactRestrictionId : 1;
            this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
        },

        data() {
            return {
                alert: false,
                alertType: 'success',
                alertText: '',
                addressTypes: [],
                contactRestrictions: [],
                address: {},
                rules: {
                    required: value => !!value || 'Required.'
                },
                emptyAddress: {
                    IndividualAddressTypeId: null,
                    ContactStatusId: 4,
                    ContactSourceId: null,
                    IsPreferred: false,
                    AddressLine1: null,
                    AddressLine2: null,
                    City: null,
                    StateTerritoryId: null,
                    PostalCode: null,
                    IndividualId: this.individual.IndividualId,
                    CanVisitRestrictionId: null,
                    DoNotVisit: false,
                    CanSendMailRestrictionId: 1,
                },
                selectedAffiliateId: null,
            }
        },

        methods: {
            saveNewAddress() {
                this.address.IndividualId = this.individual.IndividualId;
                if(this.address.ContactStatusId === 4){
                    this.address.IsPreferred = !!this.address.IsPreferred;
                } else {
                    if(this.address.IsPreferred){
                        this.alert = true;
                        this.alertType = 'error';
                        this.alertText = 'Address must be in verified status, to be marked as preferred.';
                        return;
                    }
                }
                this.address.CanVisitRestrictionId = (this.address.DoNotVisit === true) ? 2 : 1;
                if (this.savedAddress) {
                    axios.put('/api/v2/IndividualAddress/' + this.savedAddress.IndividualAddressId + '?include=ContactStatus,ContactSource,StateTerritory,CanSendMailRestriction', this.address).then((response) => {
                        this.handleAddressSaved(response.data.data, true, false);
                    });
                } else {
                    delete this.address.IndividualAddressId;
                    axios.post('/api/v2/IndividualAddress?include=ContactStatus,ContactSource,StateTerritory,CanSendMailRestriction', this.address).then((response) => {
                        this.resetAddress();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Address saved.';
                        this.handleAddressSaved(response.data.data, false, true);
                    });
                }
            },

            saveCloseAddress() {
                this.address.IndividualId = this.individual.IndividualId;

                if(this.address.ContactStatusId === 4){
                    this.address.IsPreferred = !!this.address.IsPreferred;
                } else {
                    if(this.address.IsPreferred){
                        this.alert = true;
                        this.alertType = 'error';
                        this.alertText = 'Address must be in verified status, to be marked as preferred.';
                        return;
                    }
                }
                this.address.CanVisitRestrictionId = (this.address.DoNotVisit === true) ? 2 : 1;
                if (this.savedAddress) {
                    axios.put('/api/v2/IndividualAddress/' + this.savedAddress.IndividualAddressId + '?include=ContactStatus,ContactSource,StateTerritory,CanSendMailRestriction', this.address).then((response) => {
                        this.handleAddressSaved(response.data.data, true, false);
                    });
                } else {
                    delete this.address.IndividualAddressId;
                    axios.post('/api/v2/IndividualAddress?include=ContactStatus,ContactSource,StateTerritory,CanSendMailRestriction', this.address).then((response) => {
                        this.resetAddress();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Address saved.';
                        this.handleAddressSaved(response.data.data, true, true);
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
                    this.saveNewAddress();
                } else if (value === 'close') {
                    this.saveCloseAddress();
                }
            },

            cancel() {
                this.setEditAddress();
                this.$emit('cancel-add-address');
            },

            handleAddressSaved(addressData, flip, isNew) {
                if (addressData.IndividualAddressTypeId === 3 && addressData.ContactStatus.ContactStatusName === 'Verified') {
                    this.updateBillHighwayIndividual(this.individual.IndividualId, this.selectedAffiliateId, 'address');
                }
                this.$emit('saved-address', {address: addressData, flip: flip, isNew: isNew});
            },

            onIsPreferred(value) {
                this.address.IsPreferred = value;
            },

            resetAddress() {
                for (const field in this.emptyAddress) {
                    if (this.emptyAddress.hasOwnProperty(field)) {
                        this.address[field] = this.emptyAddress[field];
                    }
                }
            },

            setEditAddress() {
                this.address = clone(this.savedAddress) || clone(this.emptyAddress);
                this.address.DoNotVisit = (this.savedAddress?.CanVisitRestrictionId && this?.savedAddress.CanVisitRestrictionId !== 1);
            }
        }
    }
</script>

<style scoped>

</style>
