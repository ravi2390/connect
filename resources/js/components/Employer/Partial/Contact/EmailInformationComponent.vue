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
                    <v-row>
                        <v-col cols="12">
                            <h4>Main</h4>
                            <contact-email-list-component :emails="getEmailbyType(1, [])" :emailheaders="emailheaders" v-on:edit-email="onEdit"></contact-email-list-component>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <h4>Other</h4>
                            <contact-email-list-component :emails="getEmailbyType(2, [])" :emailheaders="emailheaders" v-on:edit-email="onEdit"></contact-email-list-component>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <employer-email-component :employer="employer" :saved-email="selected" v-on:saved-email="onEmailSaved" v-on:cancel-add-email="flipped=false"></employer-email-component>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import markAsPreferredMixin from "../../../../mixins/Data/markAsPreferredMixin";
import contactsMixin from "../../../../mixins/UI/contactsMixin";
import FlipCard from "../../../Common/Card/FlipCard";
import EmployerEmailComponent from "../Edit/Contact/EmployerEmailComponent";
import ContactEmailListComponent from "./ContactEmailListComponent";

    export default {
        name: "EmailInformationComponent",
        components: {
            EmployerEmailComponent, ContactEmailListComponent, FlipCard
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
                return axios.get('/api/v2/employer/' + this.employerId + '?include=employerEmails,employerEmails.ContactSource,employerEmails.ContactStatus')

                    .then(response => {
                        this.emails = response.data.data.employerEmails;
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

            getEmailbyType(typeId, ignoreTypes) {
                return this.emails.filter((address) => {
                    return ignoreTypes.length > 0 ?
                        (!address.EmployerEmailTypeId || ignoreTypes.indexOf(address.EmployerEmailTypeId) === -1) :
                        address.EmployerEmailTypeId && address.EmployerEmailTypeId === typeId;
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
                        return email.EmployerEmailId === event.email.EmployerEmailId;
                    });
                    if (index >= 0) {
                        this.emails[index] = event.email;
                    }
                }

                this.handleIsPreferred(this.emails, event.email, 'EmployerEmailId', 'EmployerEmailTypeId');
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
                employer: {},
                flipped: false,
                emailheaders: [
                    {title: 'Email', value: 'Email'},
                    {title: 'Status', value: 'ContactStatus'},
                    {title: 'Source', value: 'ContactSource'},
                    {title: 'Preferred', value: 'IsPreferred'},
                    {title: 'Can Contact', value: 'CanContact'},
                    {title: 'Action', value: 'EmployerEmailId'},
                ],
                selected: null
            }
        }
    }
</script>

<style scoped>

</style>
