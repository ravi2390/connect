<template>
    <v-card>
        <v-card-title>{{newOrEditAddress}}</v-card-title>
        <v-card-text>
            <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
            <div @click="dataUpdateFlag()">
            <v-row>
                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            ref="resetAddressType"
                            :items="addressTypes"
                            item-value="IndividualAddressTypeId"
                            item-title="IndividualAddressTypeName"
                            v-model="address.IndividualAddressTypeId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Address Type
                            </template>
                        </v-select>
                    </div>
                </v-col>

                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            ref="resetAddressStatus"
                            :items="contactStatus"
                            item-value="ContactStatusId"
                            item-title="ContactStatusName"
                            v-model="address.ContactStatusId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Address Status
                            </template>
                        </v-select>
                    </div>
                </v-col>

                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            ref="resetAddressSource"
                            :items="contactSources"
                            item-value="ContactSourceId"
                            item-title="ContactSourceName"
                            v-model="address.ContactSourceId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Address Source
                            </template>
                        </v-select>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="switches">
                    <v-switch color="accent" ref="resetPreferredAddress" label="Preferred Address" :model-value="isPreferred" @update:model-value="onIsPreferred"></v-switch>
                </v-col>
                <v-col cols="4" class="switches">
                    <v-switch color="accent" ref="resetDoNotVisit" label="Do Not Visit" v-model="address.DoNotVisit"></v-switch>
                </v-col>
                <v-col cols="4">
                    <div class="data-container">
                        <v-select
                            ref="resetMailingRestriction"
                            :items="contactRestrictions"
                            item-value="ContactRestrictionId"
                            item-title="ContactRestrictionName"
                            v-model="address.CanSendMailRestrictionId"
                            :rules="rules"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="required" class="text-red">* </span>Mailing Contact Restriction
                            </template>
                        </v-select>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-text-field
                        ref="resetAddressLine1"
                        :rules="rules"
                        v-model="address.AddressLine1"
                        :maxlength="200"
                        variant="underlined"
                    >
                        <template #label>
                            <span v-if="required" class="text-red">* </span>Street Address
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        ref="resetAddressLine2"
                        label="Suite/Apt"
                        v-model="address.AddressLine2"
                        :maxlength="200"
                        variant="underlined"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field
                        ref="resetCity"
                        :rules="rules"
                        v-model="address.City"
                        :maxlength="100"
                        variant="underlined"
                    >
                        <template #label>
                            <span v-if="required" class="text-red">* </span>City
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
                            :rules="rules"
                            id="stateDropdown"
                        />
                    </div>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        ref="resetZipCode"
                        :rules="rules"
                        v-model="address.PostalCode"
                        :maxlength="15"
                        variant="underlined"
                    >
                        <template #label>
                            <span v-if="required" class="text-red">* </span>Zip Code
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            </div>
            <v-row v-if="!readOnly && resetSection && required">
                <v-col cols="4">
                    <v-btn
                        color="error"
                        class="mr-4 px-4"
                        @click="resetAllAddress"
                    >
                        Reset Address
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions v-if="!readOnly && showSaveButton">
            <v-spacer></v-spacer>
            <v-btn @click="cancel()" variant="elevated">Cancel</v-btn>
            <v-btn v-if="!this.savedAddress" color="secondary" href="" @click="saveNewAddress()" variant="elevated">Save and Continue Adding...</v-btn>
            <v-btn color="success" href="" @click="saveCloseAddress()" variant="elevated">{{ saveButtonLabel }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { clone } from "lodash-es";
import StateTerritorySelectComponent from "../../../Common/StateTerritorySelectComponent";
export default {
    name: "AddIndividualAddressComponent",
    components: {StateTerritorySelectComponent},
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
        },
        resetSection: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        newOrEditAddress() {
            if(!this.savedAddress){
                this.resetAddress();
                return 'Address';
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
                this.address = this.individualAddress &&  this.individualAddress.IndividualAddressId ? clone(value) : value;
                this.address.ContactStatusId = this.address.ContactStatusId ? this.address.ContactStatusId : null;
                this.address.CanContactRestrictionId = this.address.CanContactRestrictionId ? this.address.CanContactRestrictionId : null;
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
        this.address = this.individualAddres && this.individualAddress.IndividualAddressId ? clone(this.individualAddress) : this.individualAddress;
        this.address.ContactStatusId = this.address.ContactStatusId ? this.address.ContactStatusId : 4;
        this.address.CanContactRestrictionId = this.address.CanContactRestrictionId ? this.address.CanContactRestrictionId : 1;

    },

    data() {
        return {
            valid: true,
            alert: false,
            alertType: 'success',
            alertText: '',
            addressTypes: [],
            contactRestrictions: [],
            address: {},
            dataUpdated: false,
            rules: [],
            required: false,
            emptyAddress: {
                IndividualAddressTypeId: null,
                ContactStatusId: null,
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
                CanSendMailRestrictionId: null,
            }
        }
    },

    methods: {
        dataUpdateFlag() {
            if (this.dataUpdated) {
                return;
            }
            this.rules = [
                value => !!value || 'Required.'
            ]
            this.required = true;
            this.address.ContactStatusId = 4;
            this.address.CanSendMailRestrictionId = 1;
            this.dataUpdated = true;
        },
        saveNewAddress() {
            if (!this.$refs.form.validate()) {
                return;
            }
            this.address.IndividualId = this.individual.IndividualId;
            this.address.IsPreferred = !!this.address.IsPreferred;
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
            if (!this.$refs.form.validate()) {
                return;
            }
            this.address.IndividualId = this.individual.IndividualId;
            this.address.IsPreferred = !!this.address.IsPreferred;
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

        cancel() {
            this.setEditAddress();
            this.$emit('cancel-add-address');
        },

        handleAddressSaved(addressData, flip, isNew) {
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
            this.address.DoNotVisit = (this.savedAddress.CanVisitRestrictionId && this.savedAddress.CanVisitRestrictionId !== 1);
        },


        resetAllAddress() {
            this.$refs.resetAddressType.reset();
            this.$refs.resetAddressStatus.reset();
            this.$refs.resetAddressSource.reset();
            this.address.IsPreferred = false;
            this.address.DoNotVisit = false;
            this.$refs.resetMailingRestriction.reset();
            this.$refs.resetAddressLine1.reset();
            this.$refs.resetAddressLine2.reset();
            this.$refs.resetCity.reset();
            this.address.StateTerritoryId = null;
            this.$refs.resetZipCode.reset();
            this.emptyAddress.StateTerritoryId = null;
            this.rules = [];
            this.required = false;
            this.dataUpdated = false;
        },
    }
}
</script>

<style scoped>

</style>
