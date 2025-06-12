<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Address
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <FlipCard :flipped="flipped">
                <template #front>
                    <v-row>
                        <v-col class="text-right">
                            <v-btn size="small" @click="onAdd" color="primary">Add address</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss">{{ alertText }}</v-alert>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <h4>Main</h4>
                            <contact-address-list-component :addresses="getAddressesByType(1, [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <h4>Other</h4>
                            <contact-address-list-component :addresses="getAddressesByType(2, [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <employer-address-component :employer="employer" :saved-address="selected"
                                                  v-on:saved-address="onAddressSaved"
                                                  v-on:cancel-add-address="flipped=false"></employer-address-component>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>


<script>
    import markAsPreferredMixin from "../../../../mixins/Data/markAsPreferredMixin";
import contactsMixin from "../../../../mixins/UI/contactsMixin";
import AddressListComponent from "../../../Affiliate/Partial/AddressListComponent";
import FlipCard from "../../../Common/Card/FlipCard";
import EmployerAddressComponent from "../Edit/Contact/EmployerAddressComponent";
import ContactAddressListComponent from "./ContactAddressListComponent";

    export default {
        name: "AddressInformationComponent",
        components: {
            EmployerAddressComponent, FlipCard, ContactAddressListComponent, AddressListComponent
        },
        mixins: [markAsPreferredMixin, contactsMixin],
        props: {
            employerId: {
                type: String,
                required: true
            }
        },

        methods: {
             getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/employer/' + this.employerId + '?include=employerAddresses,employerAddresses.StateTerritory,employerAddresses.ContactSource,employerAddresses.ContactStatus')
                    .then(response => {
                        this.addresses = response.data.data.employerAddresses;
                        this.employer = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },

            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },

            getAddressesByType(typeId, ignoreTypes) {
                return this.addresses.filter((address) => {
                    return ignoreTypes.length > 0 ?
                        (!address.EmployerAddressTypeId || ignoreTypes.indexOf(address.EmployerAddressTypeId) === -1) :
                        address.EmployerAddressTypeId && address.EmployerAddressTypeId === typeId;
                });
            },

            onAddressSaved(event) {
                if (!event.address) {
                    return;
                }
                if (event.isNew) {
                    this.addresses.push(event.address);
                } else {
                    const index = this.addresses.findIndex((address) => {
                        return address.EmployerAddressId === event.address.EmployerAddressId;
                    });
                    if (index >= 0) {
                        this.addresses[index] = event.address;
                    }
                }
                this.handleIsPreferred(this.addresses, event.address, 'EmployerAddressId', 'EmployerAddressTypeId');
                this.addresses = [...this.addresses];

                this.alertSuccessMessageForSave('Address');

                if (event.flip) {
                    this.flipped = false;
                }
            },
        },

        data() {
            return {
                addresses: [],
                employer: {},
                flipped: false,
                addressheaders: [
                    {title: 'Address', value: 'Address'},
                    {title: 'Status', value: 'ContactStatus'},
                    {title: 'Source', value: 'ContactSource'},
                    {title: 'Preferred', value: 'IsPreferred'},
                    {title: 'Action', value: 'EmployerAddressId'}
                ],
                selected: null
            }
        }
    }
</script>

<style scoped>

</style>
