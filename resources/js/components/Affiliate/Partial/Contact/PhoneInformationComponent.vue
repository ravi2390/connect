<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Phones
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <FlipCard :flipped="flipped">
                <template #front>
                    <v-row>
                        <v-col class="text-right">
                            <v-btn size="small" @click="onAdd()" color="primary">Add new phone</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss">{{ alertText }}</v-alert>
                        </v-col>
                    </v-row>
                    <h4>Main</h4>
                    <v-row>
                        <v-col cols="12">
                            <phone-list-component :phones="getPhonesByType(1, [])" :phone-headers="phoneheaders" v-on:edit-phone="onEdit"></phone-list-component>
                        </v-col>
                    </v-row>
                    <h4>Other</h4>
                    <v-row>
                        <v-col cols="12">
                            <phone-list-component :phones="getPhonesByType(2, [])" :phone-headers="phoneheaders" v-on:edit-phone="onEdit"></phone-list-component>
                        </v-col>
                    </v-row>
                    <h4>Fax</h4>
                    <v-row>
                        <v-col cols="12">
                            <phone-list-component :phones="getPhonesByType(3, [])" :phone-headers="phoneheaders" v-on:edit-phone="onEdit"></phone-list-component>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <affiliate-phone-component :affiliate="affiliate" :saved-phone="selected" v-on:saved-phone="onPhoneSaved" v-on:cancel-add-phone="flipped=false"></affiliate-phone-component>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../../Common/Card/FlipCard";
    import PhoneListComponent from "./PhoneListComponent";
    import AffiliatePhoneComponent from "../Edit/Contact/AffiliatePhoneComponent";
    import markAsPreferredMixin from "../../../../mixins/Data/markAsPreferredMixin";
    import contactsMixin from "../../../../mixins/UI/contactsMixin";

    export default {
        name: "PhoneInformationComponent",
        components: {
            AffiliatePhoneComponent, PhoneListComponent, FlipCard
        },
        mixins: [markAsPreferredMixin, contactsMixin],
        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },

        methods: {
             getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/affiliate/' + this.affiliateId + '?scope=global&include=affiliatePhones,affiliatePhones.ContactSource')
                    .then(response => {
                        this.phones = response.data.data.affiliatePhones;
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
            getPhonesByType(typeId, ignoreTypes) {
                return this.phones.filter((address) => {
                    return ignoreTypes.length > 0 ?
                        (!address.AffiliatePhoneTypeId || ignoreTypes.indexOf(address.AffiliatePhoneTypeId) === -1) :
                        address.AffiliatePhoneTypeId && address.AffiliatePhoneTypeId === typeId;
                });
            },

            onPhoneSaved(event) {
                if (!event.phone) {
                    return;
                }
                if (event.isNew) {
                    this.phones.push(event.phone);
                } else {
                    const index = this.phones.findIndex((phone) => {
                        return phone.AffiliatePhoneId === event.phone.AffiliatePhoneId;
                    });
                    if (index >= 0) {
                        this.phones[index] = event.phone;
                    }
                }
                this.handleIsPreferred(this.phones, event.phone, 'AffiliatePhoneId', 'AffiliatePhoneTypeId');
                this.phones = [...this.phones];

                this.alertSuccessMessageForSave('Phone');

                if (event.flip) {
                    this.flipped = false;
                }
            },
        },

        data() {
            return {
                phones: [],
                affiliate: {},
                flipped: false,
                phoneheaders: [
                    {title: 'Phone Number', value: 'fullPhone'},
                    {title: 'Status', value: 'ContactStatus'},
                    {title: 'Source', value: 'ContactSource'},
                    {title: 'Preferred', value: 'IsPreferred'},
                    {title: 'Text Allowed', value: 'CanTextRestrictionId'},
                    {title: 'Do Not Call', value: 'CanCallRestrictionId'},
                    {title: 'Action', value: 'AffiliatePhoneId'},
                ],
                selected: null
            }
        }
    }
</script>

<style scoped>

</style>
