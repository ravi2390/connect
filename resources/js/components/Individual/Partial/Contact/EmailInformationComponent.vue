<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Emails
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <FlipCard :flipped="flipped">
                <template #front>
                    <v-row>
                        <v-col class="text-right">
                            <v-btn size="small" @click="onAdd()" color="primary">Add email address</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss">{{ alertText }}</v-alert>
                        </v-col>
                    </v-row>
                    <v-row v-if="dataLoaded && emails.length==0">
                        <v-col class="text-center">
                            <p>No emails found</p>
                        </v-col>
                    </v-row>
                    <v-row v-if="getEmailbyType(1, []).length>0">
                        <v-col>
                            <h4>Home email address (personal)</h4>
                            <contact-email-list-component :emails="getEmailbyType(1, [])" :emailheaders="emailheaders" v-on:edit-email="onEdit"></contact-email-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getEmailbyType(2, []).length>0">
                        <v-col>
                            <h4>Work email address</h4>
                            <contact-email-list-component :emails="getEmailbyType(2, [])" :emailheaders="emailheaders" v-on:edit-email="onEdit"></contact-email-list-component>
                        </v-col>
                    </v-row>
                    <v-row v-if="getEmailbyType(3, []).length>0">
                        <v-col>
                            <h4>Other email addresses</h4>
                            <contact-email-list-component :emails="getEmailbyType(3, [])" :emailheaders="emailheaders" v-on:edit-email="onEdit"></contact-email-list-component>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <individual-email-component
                        :individual="individual"
                        :saved-email="selected"
                        v-on:saved-email="onEmailSaved"
                        v-on:cancel-add-email="flipped=false"
                        :read-only="false"
                        :individual-email="individualEmail"
                    />
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import AddressListComponent from "../../../Affiliate/Partial/AddressListComponent";
    import ContactAddressListComponent from "./ContactAddressListComponent";
    import FlipCard from "../../../Common/Card/FlipCard";
    import IndividualAddressComponent from "../Edit/Contact/IndividualAddressComponent";
    import ContactEmailListComponent from "./ContactEmailListComponent";
    import IndividualEmailComponent from "../Edit/Contact/IndividualEmailComponent";
    import markAsPreferredMixin from "../../../../mixins/Data/markAsPreferredMixin";
    import contactsMixin from "../../../../mixins/UI/contactsMixin";

    export default {
        name: "EmailInformationComponent",
        components: {
            IndividualEmailComponent,
            ContactEmailListComponent,
            FlipCard,
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
                return axios.get('/api/v2/individual/' + this.individual.IndividualId + '?include=individualEmails,individualEmails.ContactSource,individualEmails.CanContactRestriction,individualEmails.ContactStatus')
                    .then(response => {
                        this.emails = response.data.data.individualEmails;
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

            getEmailbyType(typeId, ignoreTypes) {
                return this.emails.filter((address) => {
                    return ignoreTypes.length > 0 ?
                        (!address.IndividualEmailTypeId || ignoreTypes.indexOf(address.IndividualEmailTypeId) === -1) :
                        address.IndividualEmailTypeId && address.IndividualEmailTypeId === typeId;
                });
            },

            onEmailSaved(event) {
                if (!event.email) {
                    return;
                }
                if (event.isNew) {
                    this.emails.push(event.email);
                } else {
                    const index = this.emails.findIndex((email) => {
                        return email.IndividualEmailId === event.email.IndividualEmailId;
                    });
                    if (index >= 0) {
                        this.emails[index] = event.email;
                    }
                }

                this.handleIsPreferred(this.emails, event.email, 'IndividualEmailId', '');
                this.emails = [...this.emails];

                this.alertSuccessMessageForSave('Email');

                if (event.flip) {
                    this.flipped = false;
                }
            },
        },

        data() {
            return {
                emails: [],
                flipped: false,
                emailheaders: [
                    {title: 'Email', value: 'Email'},
                    {title: 'Status', value: 'ContactStatus'},
                    {title: 'Source', value: 'ContactSource'},
                    {title: 'Preferred', value: 'IsPreferred'},
                    {title: 'Contact Restriction', value: 'ContactRestriction'},
                    {title: 'Action', value: 'IndividualEmailId'},
                ],
                selected: null,
                dataLoaded: false,
                individualEmail: {},
            }
        }
    }
</script>

<style scoped>

</style>
