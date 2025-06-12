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
                        <v-col>
                            <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss">{{ alertText }}</v-alert>
                        </v-col>
                    </v-row>
                     <v-row v-if="dataLoaded && addresses.length==0">
                        <v-col class="text-center">
                            <p>No addresses found</p>
                        </v-col>
                    </v-row>
                    <v-row v-if="getAddressesByType(1, []).length>0">
                        <v-col>
                            <h4>Home</h4>
                            <contact-address-list-component :addresses="getAddressesByType(1, [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getAddressesByType(2, []).length>0">
                        <v-col>
                            <h4>Work</h4>
                            <contact-address-list-component :addresses="getAddressesByType(2, [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getAddressesByType(6, []).length>0">
                        <v-col>
                            <h4>Seasonal</h4>
                            <contact-address-list-component :addresses="getAddressesByType(6, [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getAddressesByType(5, []).length>0">
                        <v-col>
                            <h4>Shipping</h4>
                            <contact-address-list-component :addresses="getAddressesByType(5, [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getAddressesByType(4, []).length>0">
                        <v-col>
                            <h4>Mailing</h4>
                            <contact-address-list-component :addresses="getAddressesByType(4, [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getAddressesByType(3, []).length>0">
                        <v-col>
                            <h4>Billing</h4>
                            <contact-address-list-component :addresses="getAddressesByType(3, [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <individual-address-component
                        :individual="individual"
                        :saved-address="selected"
                        v-on:saved-address="onAddressSaved"
                        v-on:cancel-add-address="flipped=false"
                        :read-only="false"
                        :individual-address="individualAddress"
                    />
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import ContactAddressListComponent from "./ContactAddressListComponent";
    import FlipCard from "../../../Common/Card/FlipCard";
    import IndividualAddressComponent from "../Edit/Contact/IndividualAddressComponent";
    import markAsPreferredMixin from "../../../../mixins/Data/markAsPreferredMixin";
    import contactsMixin from "../../../../mixins/UI/contactsMixin";

    export default {
        name: "AddressInformationComponent",
        components: {IndividualAddressComponent, FlipCard, ContactAddressListComponent},
        mixins: [markAsPreferredMixin, contactsMixin],
        props: {
            individual: {
                type: Object,
                required: true
            }
        },

        methods: {
            getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/individual/' + this.individual.IndividualId + '?include=individualAddresses,individualAddresses.StateTerritory,individualAddresses.ContactSource,individualAddresses.CanSendMailRestriction,individualAddresses.ContactStatus')
                    .then(response => {
                        this.addresses = response.data.data.individualAddresses;
                        this.dataLoaded = true;
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
                        (!address.IndividualAddressTypeId || ignoreTypes.indexOf(address.IndividualAddressTypeId) === -1) :
                        address.IndividualAddressTypeId && address.IndividualAddressTypeId === typeId;
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
                        return address.IndividualAddressId === event.address.IndividualAddressId;
                    });
                    if (index >= 0) {
                        this.addresses[index] = event.address;
                    }
                }
                this.handleIsPreferred(this.addresses, event.address, 'IndividualAddressId', '');
                this.addresses = [...this.addresses];

                this.alertSuccessMessageForSave('Address');

                if (event.flip) {
                    this.flipped = false;
                }
                this.getDataFromApi();
            },
        },

        data() {
            return {
                expanded: false,
                addresses: [],
                flipped: false,
                addressheaders: [
                    {title: 'Address', value: 'Address'},
                    {title: 'Status', value: 'ContactStatus'},
                    {title: 'Source', value: 'ContactSource'},
                    {title: 'Preferred', value: 'IsPreferred'},
                    {title: 'Do Not Visit', value: 'CanVisitRestrictionId'},
                    {title: 'Mailing Contact Restrictions', value: 'ContactRestriction'},
                    {title: 'Action', value: 'IndividualAddressId'},
                ],
                selected: null,
                dataLoaded: false,
                individualAddress: {},
            }
        }
    }
</script>

<style scoped>

</style>
