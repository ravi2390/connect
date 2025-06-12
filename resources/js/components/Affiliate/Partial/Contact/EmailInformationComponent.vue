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
                    <h4>Main</h4>
                    <v-row>
                        <v-col cols="12">
                            <contact-email-list-component :emails="getEmailbyType(1, [])" :emailheaders="emailheaders" v-on:edit-email="onEdit"></contact-email-list-component>
                        </v-col>
                    </v-row>
                    <h4>Per Capita Billing</h4>
                    <v-row>
                        <v-col cols="12">
                            <contact-email-list-component :emails="getEmailbyType(3, [])" :emailheaders="emailheaders" v-on:edit-email="onEdit"></contact-email-list-component>
                        </v-col>
                    </v-row>
                    <h4>Other</h4>
                    <v-row>
                        <v-col cols="12">
                            <contact-email-list-component :emails="getEmailbyType(2, [])" :emailheaders="emailheaders" v-on:edit-email="onEdit"></contact-email-list-component>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <affiliate-email-component :affiliate="affiliate" :saved-email="selected" v-on:saved-email="onEmailSaved" v-on:cancel-add-email="flipped=false"></affiliate-email-component>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../../Common/Card/FlipCard";
    import ContactEmailListComponent from "./ContactEmailListComponent";
    import AffiliateEmailComponent from "../Edit/Contact/AffiliateEmailComponent";
    import markAsPreferredMixin from "../../../../mixins/Data/markAsPreferredMixin";
    import contactsMixin from "../../../../mixins/UI/contactsMixin";

    export default {
        name: "EmailInformationComponent",
        components: {
            AffiliateEmailComponent, ContactEmailListComponent, FlipCard
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
                return axios.get('/api/v2/affiliate/' + this.affiliateId + '?scope=global&include=affiliateEmails,affiliateEmails.ContactSource,affiliateEmails.ContactStatus')
                    .then(response => {
                        this.emails = response.data.data.affiliateEmails;
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

            getEmailbyType(typeId, ignoreTypes) {
                return this.emails.filter((address) => {
                    return ignoreTypes.length > 0 ?
                        (!address.AffiliateEmailTypeId || ignoreTypes.indexOf(address.AffiliateEmailTypeId) === -1) :
                        address.AffiliateEmailTypeId && address.AffiliateEmailTypeId === typeId;
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
                        return email.AffiliateEmailId === event.email.AffiliateEmailId;
                    });
                    if (index >= 0) {
                        this.emails[index] = event.email;
                    }
                }
                this.handleIsPreferred(this.emails, event.email, 'AffiliateEmailId', 'AffiliateEmailTypeId');
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
                affiliate: {},
                flipped: false,
                emailheaders: [
                    {title: 'Email', value: 'Email'},
                    {title: 'Status', value: 'ContactStatus'},
                    {title: 'Source', value: 'ContactSource'},
                    {title: 'Preferred', value: 'IsPreferred'},
                    {title: 'Can Contact', value: 'CanContact'},
                    {title: 'Action', value: 'AffiliateEmailId'},
                ],
                selected: null
            }
        }
    }
</script>

<style scoped>

</style>
