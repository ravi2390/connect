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
                    <v-row v-if="dataLoaded && phones.length==0">
                        <v-col class="text-center">
                            <p>No phones found</p>
                        </v-col>
                    </v-row>
                    <v-row v-if="getPhonesByType(1, []).length>0">
                        <v-col>
                            <h4>Home</h4>
                            <phone-list-component :phones="getPhonesByType(1, [])" :phone-headers="phoneheaders" v-on:edit-phone="onEdit"></phone-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getPhonesByType(2, []).length>0">
                        <v-col>
                            <h4>Work</h4>
                            <phone-list-component :phones="getPhonesByType(2, [])" :phone-headers="phoneheaders" v-on:edit-phone="onEdit"></phone-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getPhonesByType(3, []).length>0">
                        <v-col>
                            <h4>Mobile</h4>
                            <phone-list-component :phones="getPhonesByType(3, [])" :phone-headers="phoneheaders" v-on:edit-phone="onEdit"></phone-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getPhonesByType(4, []).length>0">
                        <v-col>
                            <h4>Telematch</h4>
                            <phone-list-component :phones="getPhonesByType(4, [])" :phone-headers="phoneheaders" v-on:edit-phone="onEdit"></phone-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getPhonesByType(6, []).length>0">
                        <v-col>
                            <h4>Fax</h4>
                            <phone-list-component :phones="getPhonesByType(6, [])" :phone-headers="phoneheaders" v-on:edit-phone="onEdit"></phone-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getPhonesByType(5, []).length>0">
                        <v-col>
                            <h4>Other</h4>
                            <phone-list-component :phones="getPhonesByType(5, [])" :phone-headers="phoneheaders" v-on:edit-phone="onEdit"></phone-list-component>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <individual-phone-component
                        :individual="individual"
                        :saved-phone="selected"
                        v-on:saved-phone="onPhoneSaved"
                        v-on:cancel-add-phone="flipped=false"
                        :read-only="false"
                        :individual-phone="individualPhone"
                    />
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../../Common/Card/FlipCard";
    import PhoneListComponent from "./PhoneListComponent";
    import IndividualPhoneComponent from "../Edit/Contact/IndividualPhoneComponent";
    import markAsPreferredMixin from "../../../../mixins/Data/markAsPreferredMixin";
    import contactsMixin from "../../../../mixins/UI/contactsMixin";

    export default {
        name: "PhoneInformationComponent",
        components: {
            IndividualPhoneComponent,
            PhoneListComponent,
            FlipCard
        },
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
                return axios.get('/api/v2/individual/' + this.individual.IndividualId + '?include=individualPhones,individualPhones.ContactSource,individualPhones.ContactStatus,individualPhones.IndividualPhoneType,individualPhones.CanCallRestriction,individualPhones.Country')
                    .then(response => {
                        this.phones = response.data.data.individualPhones;
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

            getPhonesByType(typeId, ignoreTypes) {
                return this.phones.filter((address) => {
                    return ignoreTypes.length > 0 ?
                        (!address.IndividualPhoneTypeId || ignoreTypes.indexOf(address.IndividualPhoneTypeId) === -1) :
                        address.IndividualPhoneTypeId && address.IndividualPhoneTypeId === typeId;
                });
            },

            onPhoneSaved(event) {
                if (!event.phone) {
                    return;
                }
                if (event.isNew) {
                    this.phones.push(event.phone);
                } else {
                    const index = this.phones.findIndex(phone => phone.IndividualPhoneId === event.phone.IndividualPhoneId);
                    if (index !== -1) {
                        this.phones[index] = event.phone;
                    }
                }

                this.handleIsPreferred(this.phones, event.phone, 'IndividualPhoneId', '');
                this.phones = [...this.phones];

                this.alertSuccessMessageForSave('Phone');

                if (event.flip) {
                    this.flipped = false;
                }
            },
        },

        data() {
            return {
                expanded: false,
                phones: [],
                alert: false,
                alertType: 'success',
                alertText: '',
                flipped: false,
                phoneheaders: [
                    {title: 'Phone Number', value: 'fullPhone'},
                    {title: 'Status', value: 'ContactStatus'},
                    {title: 'Source', value: 'ContactSource'},
                    {title: 'Preferred', value: 'IsPreferred'},
                    {title: 'Text Allowed', value: 'CanTextRestrictionId'},
                    {title: 'Do Not Call', value: 'CanCallRestrictionId'},
                    {title: 'Action', value: 'IndividualPhoneId'},
                ],
                selected: null,
                dataLoaded: false,
                individualPhone: {},
            }
        }
    }
</script>

<style scoped>

</style>
