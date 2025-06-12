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
                            <contact-address-list-component :addresses="getAddressesByType(getAddressTypeByName('Main'), [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <h4>Per Capita Billing</h4>
                            <contact-address-list-component :addresses="getAddressesByType(getAddressTypeByName('Per Capita Billing Address'), [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <h4>Other</h4>
                            <contact-address-list-component :addresses="getAddressesByType(getAddressTypeByName('Other'), [])" :addressheaders="addressheaders" v-on:edit-address="onEdit"></contact-address-list-component>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <affiliate-address-component :affiliate="affiliate" :saved-address="selected"
                                                  v-on:saved-address="onAddressSaved"
                                                  v-on:cancel-add-address="flipped=false"></affiliate-address-component>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import AddressListComponent from "../../../Affiliate/Partial/AddressListComponent";
    import ContactAddressListComponent from "./ContactAddressListComponent";
    import FlipCard from "../../../Common/Card/FlipCard";
    import AffiliateAddressComponent from "../Edit/Contact/AffiliateAddressComponent";
    import markAsPreferredMixin from "../../../../mixins/Data/markAsPreferredMixin";
    import contactsMixin from "../../../../mixins/UI/contactsMixin";

    export default {
        name: "AddressInformationComponent",
        components: {AffiliateAddressComponent, FlipCard, ContactAddressListComponent, AddressListComponent},
        mixins: [markAsPreferredMixin, contactsMixin],
        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },

        beforeMount() {
            axios.get('/api/v2/affiliateAddressType')
            .then(response => {
                this.addressTypes = response.data.data;
            });
        },
        methods: {
             getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/affiliate/' + this.affiliateId + '?scope=global&include=affiliateAddresses,affiliateAddresses.StateTerritory,affiliateAddresses.ContactSource,affiliateAddresses.ContactStatus')
                    .then(response => {
                        this.addresses = response.data.data.affiliateAddresses;
                        this.affiliate = response.data.data;
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

            getAddressTypeByName(name) {
                const matchingAddressTypes = this.addressTypes.filter(addressType => addressType.AffiliateAddressTypeName === name);
                if (matchingAddressTypes.length > 0) {
                    return matchingAddressTypes[0].AffiliateAddressTypeId;
                }
                return 0;
            },
            getAddressesByType(typeId, ignoreTypes) {
                return this.addresses.filter((address) => {
                    return ignoreTypes.length > 0 ?
                        (!address.AffiliateAddressTypeId || ignoreTypes.indexOf(address.AffiliateAddressTypeId) === -1) :
                        address.AffiliateAddressTypeId && address.AffiliateAddressTypeId === typeId;
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
                        return address.AffiliateAddressId === event.address.AffiliateAddressId;
                    });
                    if (index >= 0) {
                        this.addresses[index] = event.address;
                    }
                }
                this.handleIsPreferred(this.addresses, event.address, 'AffiliateAddressId', 'AffiliateAddressTypeId');
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
                affiliate: {},
                flipped: false,
                addressheaders: [
                    {title: 'Address', value: 'Address'},
                    {title: 'Status', value: 'ContactStatus'},
                    {title: 'Source', value: 'ContactSource'},
                    {title: 'Preferred', value: 'IsPreferred'},
                    {title: 'Action', value: 'AffiliateAddressId'},
                ],
                addressTypes: [],
                selected: null,
            }
        }
    }
</script>

<style scoped>

</style>
