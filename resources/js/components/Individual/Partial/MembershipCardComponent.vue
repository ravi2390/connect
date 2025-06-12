<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Membership Card Tracking
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-row v-if="this.memberIds && this.memberIds.length > 0">
                <v-col class="d-flex justify-end ga-2">
                    <v-btn size="small" color="primary" @click="requestNewCard">Request New Card</v-btn>
                    <v-btn size="small" color="primary" @click="dialogConfirm = true">
                        Request Digital Membership Card
                        <template #append>
                            <v-img
                                height="24"
                                width="24"
                                src="/images/mail.png"
                            />
                        </template>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="mobile-detail-col">
                    <v-alert type="success" v-model="alert" closable close-text="Dismiss" title="Your request has been submitted!" class="mb-4">
                        The selected member will be sent a new card in the next card run. Replacement cards are processed on the 20th of the month, and then printed and mailed - this can take three-four weeks, depending on volume and USPS mail-times.<br />
                        Printing a temporary membership card:
                        You can print a temporary card by going to <a href="https://members.aft.org/members/login">https://members.aft.org/members/login</a>. Once you create an account, you will then have the option to print a temporary card.
                    </v-alert>
                    <v-data-table
                        :headers="headers"
                        :items="memberIds"
                        :mobile-breakpoint=992
                        class="v-outlined mobile-global-card-table"
                    >

                        <template v-slot:[`item.CardMailDate`]="{ item }">
                            {{ $filters.formatDate(item.CardMailDate) }}
                        </template>

                        <template v-slot:[`item.CardActivationDate`]="{ item }">
                            {{ $filters.formatDate(item.CardActivationDate) }}
                        </template>

                        <template v-slot:[`item.IsReplacementCardRequested`]="{ item }">
                            <span v-if="item.IsReplacementCardRequested">
                                Yes
                            </span>
                        </template>

                        <template v-slot:[`item.ReplacementCardRequestedDate`]="{ item }">
                            {{ $filters.formatDate(item.ReplacementCardRequestedDate) }}
                        </template>

                        <!-- <template v-slot:item.IsDigitalCardRequested="props">
                            <span v-if="props.item.DigitalCardRequestedDate">
                                Yes
                            </span>
                        </template> -->

                        <!-- <template v-slot:item.DigitalCardRemovedDate="props">
                            <span v-if="props.item.DigitalCardRemovedDate">
                                No
                            </span>
                            <span v-else="props.item.DigitalCardRemovedDate">
                                Yes
                            </span>
                        </template> -->

                        <!-- <template v-slot:item.DigitalCardRequestedDate="props">
                            {{props.item.DigitalCardRequestedDate | formatDate }}
                        </template> -->

                        <template v-slot:[`item.DigitalCardEmailSentDate`]="{ item }">
                            <span v-if="item.DigitalCardEmailSentDate">
                                {{ $filters.formatDate(item.DigitalCardEmailSentDate) }}
                            </span>
                            <span v-else>
                                Never Emailed
                            </span>
                        </template>

                        <template v-slot:[`item.DigitalCardInstalledDate`]="{ item }">

                            <span v-if="item.DigitalCardRemovedDate">
                                Uninstalled
                            </span>
                            <span v-else-if="item.DigitalCardInstalledDate">
                                Installed
                            </span>
                            <span v-else>
                                Uninstalled
                            </span>
                        </template>
                    </v-data-table>
                    <v-card>
                        <v-card-title>Member Benefit Login Information</v-card-title>
                        <v-card-text v-if="memberLoginName">
                            <p><b>Username:</b> {{ memberLoginName }}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-expansion-panel-text>
        <v-dialog v-model="dialogConfirm" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h5">
                    Are you sure
                </v-card-title>
                <v-card-text>Do you want to send email?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        variant="text"
                        @click="dialogConfirm = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="green"
                        variant="text"
                        @click="sendEmail"
                    >
                        Send
                        <template #append>
                            <v-img
                                height="24"
                                width="24"
                                src="/images/mail.png"
                            />
                        </template>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-text>{{ message }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green"
                        variant="text"
                        @click="dialog = false"
                    >
                        Dismiss
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "MembershipCardComponent",

        data() {
            return {
                individual: {},
                memberlogin:{},
                individualguid:0,
                memberLoginName:'',
                memberIds: [],
                headers: [
                    {title: 'Member Id', value: 'MemberId', sortable: true },
                    {title: 'Card Mail Date', value: 'CardMailDate', sortable: true },
                    {title: 'Card Activation Date', value: 'CardActivationDate', sortable: true },
                    {title: 'Is Replacement Card Requested', value: 'IsReplacementCardRequested', sortable: true },
                    {title: 'Replacement Card Request Date', value: 'ReplacementCardRequestedDate', sortable: true },
                    // {title: 'Is Digital Card Requested', value: 'IsDigitalCardRequested'},
                    // {title: 'Is using Digital ID', value: 'DigitalCardRemovedDate'},
                    // {title: 'Date of use', value: 'DigitalCardRequestedDate'},
                    {title: 'Digital Card Email sent', value: 'DigitalCardEmailSentDate', sortable: true },
                    {title: 'Digital Card Wallet', value: 'DigitalCardInstalledDate', sortable: true },
                ],
                alert: false,
                dialogConfirm: false,
                dialog: false,
                message: ''
            }
        },
        mounted() {
            this.id = this.$route.params.id;
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/individual/' + this.id + '?include=individualAffiliates.MemberIdMapping')
                    .then(response => {
                        this.individual = response.data.data;
                        this.memberIds = this.individual.individualAffiliates[0].MemberIdMapping;
                        this.individualguid = this.individual.IndividualGuid;
                        this.getMemberDataFromApi();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            getMemberDataFromApi() {
                this.loading = true;
                let url = '/api/v2/aggregate/individual/memberlogin/' + this.individualguid + '?scope=global';

                return axios.get(url)
                    .then(response => {
                        this.memberlogin = response.data.data;
                        this.memberLoginName = this.memberlogin[0].name;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            sendEmail() {
                this.loading = true;
                this.dialogConfirm = false;
                let url = '/api/v2/aggregate/individual/sendEmail/' + this.memberIds[0].MemberId;

                let formData = new FormData();

                return axios.post(url, formData)
                    .then(() => {
                        this.message = 'Email sent successfully';
                        this.dialog = true;
                    })
                    .catch(() => {
                        this.message = 'Something went wrong, please contact support team';
                        this.dialog = true;
                    })
                    .finally(() => {
                        this.loading = false;
                        // show popup
                    });
            },
            requestNewCard(){
                this.loading = true;
                if (this.memberIds[0] != null) {
                    const editableMembershipCard = this.memberIds[0];
                    editableMembershipCard.IsReplacementCardRequested = true;
                    // This created an error because the format function expects a string.
                    editableMembershipCard.ReplacementCardRequestedDate = new Date();
                    return axios.put('/api/v2/MemberIdMapping/' + editableMembershipCard.MemberIdMappingId, editableMembershipCard)
                        .then(response => {
                            this.getDataFromApi();
                            this.alert = true;
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            },
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            }
        }
    }
</script>

<style scoped>

</style>
