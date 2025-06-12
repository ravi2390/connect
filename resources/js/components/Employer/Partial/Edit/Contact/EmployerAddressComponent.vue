<template>
    <v-form ref="form" v-model="valid" validate-on="submit" @submit.prevent="onSave">
        <v-card>
            <v-card-title>New Address</v-card-title>
            <v-card-text>
                <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
                <v-row>
                    <v-col cols="12" lg="3">
                        <div class="data-container">
                            <v-select
                                :items="addressTypes"
                                label="Address Type"
                                item-value="EmployerAddressTypeId"
                                item-title="EmployerAddressTypeName"
                                v-model="address.EmployerAddressTypeId"
                                :rules="[rules.required]"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>

                    <v-col cols="12" lg="3">
                        <div class="data-container">
                            <v-select
                                :items="contactStatus"
                                label="Address Status"
                                item-value="ContactStatusId"
                                item-title="ContactStatusName"
                                v-model="address.ContactStatusId"
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
                                label="Address Source"
                                v-model="address.ContactSourceId"
                                :rules="[rules.required]"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>
                    <v-col cols="12" lg="2" class="switches">
                        <v-switch color="accent" label="Preferred Address" v-model="address.IsPreferred"></v-switch>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="8">
                        <v-text-field label="Street Address" :rules="[rules.required]"
                                      v-model="address.AddressLine1"
                                      variant="underlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Suite/Apt"
                                      v-model="address.AddressLine2"
                                      variant="underlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4">
                        <v-text-field label="City" :rules="[rules.required]"
                                      v-model="address.City"
                                      variant="underlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <StateTerritorySelectComponent
                                item-value="StateTerritoryId"
                                item-text="StateTerritoryName"
                                label="State"
                                v-model="address.StateTerritoryId"
                            />
                        </div>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Zip Code" :rules="[rules.required]"
                                      v-model="address.PostalCode"
                                      variant="underlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
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
    export default {
        name: "EmployerAddressComponent",
        components: {StateTerritorySelectComponent},
        props: {
            employer: {
                type: Object,
                required: true
            },
            savedAddress: {
                type: Object,
                required: false
            }
        },

        computed: {
            saveButtonLabel() {
                return this.savedAddress ? 'Save' : 'save and close';
            },
            contactSources() {
                return this.$store.getters["contactSource/contactSources"];
            },
            contactStatus() {
                return this.$store.getters["contactStatus/contactStatuses"]
            }
        },

        watch: {
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
            axios.get('/api/v2/EmployerAddressType').then((response) => {
                this.addressTypes = response.data.data;
            });
        },

        data() {
            return {
                valid: true,
                alert: false,
                alertType: 'success',
                alertText: '',
                addressTypes: [],
                address: {ContactStatusId: 4},
                rules: {
                    required: value => !!value || 'Required.'
                },
                emptyAddress: {
                    EmployerAddressTypeId: null,
                    ContactStatusId: 4,
                    ContactSourceId: null,
                    IsPreferred: false,
                    AddressLine1: null,
                    AddressLine2: null,
                    City: null,
                    StateTerritoryId: null,
                    PostalCode: null,
                    EmployerId: this.employer.EmployerId
                }
            }
        },

        methods: {
            saveNewAddress() {
                this.address.EmployerId = this.employer.EmployerId;
                this.address.IsPreferred = (typeof this.address.IsPreferred === 'undefined' || this.address.IsPreferred === null) ? false : this.address.IsPreferred;
                if (this.savedAddress) {
                    axios.put('/api/v2/EmployerAddress/' + this.savedAddress.EmployerAddressId + '?include=ContactStatus,ContactSource', this.address).then((response) => {
                        this.handleAddressSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/EmployerAddress?include=ContactStatus,ContactSource', this.address).then((response) => {
                        this.resetAddress();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Address saved.';
                        this.handleAddressSaved(response.data.data, false, true);
                    });
                }
            },

            saveCloseAddress() {
                this.address.EmployerId = this.employer.EmployerId;
                this.address.IsPreferred = (typeof this.address.IsPreferred === 'undefined' || this.address.IsPreferred === null) ? false : this.address.IsPreferred;
                if (this.savedAddress) {
                    axios.put('/api/v2/EmployerAddress/' + this.savedAddress.EmployerAddressId + '?include=ContactStatus,ContactSource', this.address).then((response) => {
                        this.handleAddressSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/EmployerAddress?include=ContactStatus,ContactSource', this.address).then((response) => {
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

            cancel(){
                this.setEditAddress();
                this.$emit('cancel-add-address');
            },

            handleAddressSaved(addressData, flip, isNew) {
                this.$emit('saved-address', {address: addressData, flip: flip, isNew: isNew});
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
            }
        }
    }
</script>

<style scoped>

</style>
