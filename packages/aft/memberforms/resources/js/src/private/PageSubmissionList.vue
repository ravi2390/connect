<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <h2 class="submissionTitle">
                    {{ $route && $route.query && $route.query.type !== undefined ?
                        $route.query.type + " Submissions" : submissionType +' Submissions' }}
                </h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <FormSearchSelector
                    ref="formSelector"
                    v-model="formId"
                    label="Select a Form Name"
                    item-value="id"
                    search-type="form"
                    :search-args="{ affiliateId: affiliateId, sortBy: 'system_name' }"
                    item-title="system_name"
                    outlined
                    clearable
                />
            </v-col>
            <v-col>
                <FormSearchSelector
                    ref="formTitleSelector"
                    v-model="formId"
                    label="Select a Form Title"
                    item-value="id"
                    search-type="form"
                    :search-args="{ affiliateId: affiliateId, sortBy: 'display_name' }"
                    item-title="display_name"
                    outlined
                    clearable
                />
            </v-col>
        </v-row>
        <template v-if="!$route.query.type">
        <v-row >
            <v-col>
                <v-autocomplete
                    v-model="submissionType"
                    :items="submissionsList"
                    label="Submission Type"
                    variant="outlined"
                    :clearable="false"
                    item-value="typeValue"
                    item-title="typeText"
                />
            </v-col>
        </v-row>
        <v-row v-if="!$route.query.type">
            <v-col>
                <div class="col-md">
                    <v-text-field
                        v-model="fName"
                        label="First Name"
                        variant="underlined"
                    />
                </div>
            </v-col>
            <v-col>
                <div class="col-md">
                    <v-text-field
                        v-model="lName"
                        label="Last Name"
                        variant="underlined"
                    />
                </div>
            </v-col>
            <v-col class="continueButton d-flex align-center">
                <v-btn
                    color="#0A2A5C"
                    class="submit-button"
                    @click="performSearch()"
                >
                    Search
                </v-btn>
                <v-btn
                    class="btn-default"
                    @click="clearSearch()"
                >
                    Clear
                </v-btn>
                <div class="downloadButton">
                    <v-btn
                        v-if="formId>0"
                        class="downloadBtn"
                        @click="downloadList()"
                        icon="mdi:mdi-cloud-download"
                    />
                    <v-tooltip
                        v-if="!formId"
                        location="top"
                    >
                        <template #activator="{ props }">
                            <div
                                class="disable-download-btn"
                                v-bind="props"
                            >
                                <v-btn disabled icon="mdi:mdi-cloud-download">
                                </v-btn>
                            </div>
                        </template>
                        <span>Choose a Form to Download</span>
                    </v-tooltip>
                </div>
                <v-dialog
                    v-model="downloading"
                    persistent
                    max-width="320"
                >
                    <v-card>
                        <v-card-title class="text-h5">
                            Downloading...
                        </v-card-title>
                        <v-card-text class="pb-0">
                            <v-progress-linear
                                :indeterminate="downloadRecordTotal == 0"
                                :model-value="(downloadRecordCount * 100) / downloadRecordTotal"
                            />
                            <p class="mb-0">
                                {{ downloadPercent }}% :
                                {{ downloadRecordCount }} of {{ downloadRecordTotal }} records received...
                            </p>
                            <p
                                v-if="downloadSize > 0"
                                class="mb-0 small"
                            >
                                {{ downloadSize }} bytes received...
                            </p>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn @click="downloadCancel()">
                                Cancel
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        </template>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="submissions"
                    class="v-outlined"
                >
                    <template #[`item.CreatedAt`]="{ item }">
                        <span>
                            {{ displayDate(item.CreatedAt) }}
                        </span>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template #[`item.form_submission_data`]="{ item }">
                        <FormSubmissionPreview
                            :submission="{
                                firstName:{data_value: item.firstName},
                                middleName:{data_value: item.middleName ? item.middleName : ''},
                                lastName:{data_value: item.lastName}
                            }"
                            :individual-data="{
                                IndividualId:item.IndividualId,
                                submission_status_id:item.submission_status_id
                            }"
                        />
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template #item.download="{ item }">
                        <a @click="download(item.id)">
                            <v-img
                                max-height="32"
                                max-width="32"
                                :src="imgPdf32"
                            />
                        </a>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template #item.resendEmail="{ item }">
                        <a @click="openDialog(item.id)">
                            <v-img
                                max-height="32"
                                max-width="32"
                                :src="imgMail"
                            />
                        </a>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template #item.createNew="{ item }">
                        <a :href="'/app/memberforms/admin/view-submission/' + item.id">
                            View Submission
                        </a>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialogConfirm"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Are you sure
                </v-card-title>
                <v-card-text>Do you want to resend email?</v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="red-darken-1"
                        variant="text"
                        @click="dialogConfirm = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="resendEmail"
                    >
                        Send
                        <v-img
                            max-height="32"
                            max-width="32"
                            :src="imgMail"
                        />
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
                <v-card-title />
                <v-card-text>{{ message }}</v-card-text>
                <v-card-actions>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="dialog = false"
                    >
                        Dismiss
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-overlay
            :model-value="loading"
            opacity=".5"
            scrim="#FFF"
        />
    </v-container>
</template>

<script>
import { format } from 'date-fns';
import api from '../../api/private';
import FormSearchSelector from './components/FormSearchSelector.vue';
import FormSubmissionPreview from './components/FormSumbissionPreview.vue';
import imgPdf32 from '../../../images/PDF_32.png';
import imgMail from '../../../images/mail.png';

export default {
    name: 'PageSubmissionList',
    components: { FormSubmissionPreview, FormSearchSelector },
    data: () => ({
        loading: false,
        affiliateId: null,
        formId: null,
        headers: [
            { title: 'Full Name', value: 'form_submission_data', align: 'left' },
            { title: 'Form Title', value: 'form.display_name', align: 'left' },
            { title: 'Form Name', value: 'form.system_name', align: 'left' },
            { title: 'View Submission', value: 'createNew', align: 'left' },
            { title: 'Download', value: 'download', align: 'left' },
            { title: 'Resend Email', value: 'resendEmail', align: 'left' },
            { title: 'Date Submitted', value: 'CreatedAt', align: 'left' },
            { title: 'Submission Type', value: 'submission_status.status_name', align: 'left' },
        ],
        fName: '',
        fNameField: {
            label: 'First Name',
        },
        lName: '',
        lNameField: {
            label: 'Last Name',
        },
        submissions: [],
        submissionType: 'all',
        submissionsList: [
            { typeValue: 'all', typeText: 'All Submissions' },
            { typeValue: 'new', typeText: 'New Submissions' },
            { typeValue: 'Created Individual', typeText: 'Created Individual' },
            { typeValue: 'Exists in connect', typeText: 'Exists in connect' },
            { typeValue: 'not a member', typeText: 'Not a Member' },
        ],
        message: '',
        dialog: false,
        dialogConfirm: false,
        downloading: false,
        downloadingCancelToken: null,
        downloadRecordCount: 0,
        downloadRecordTotal: 0,
        downloadRecordChunk: 0,
        downloadPercent: 0,
        downloadSize: 'calculating',
        imgPdf32,
        imgMail,
    }),
    computed: {
        displayDate() {
            return (date) => format(date, 'MMMM dd, yyyy');
        },
    },
    watch: {
        affiliateId() {
            this.$nextTick(() => {
                localStorage.mfpAffiliateId = JSON.stringify(this.affiliateId);
                this.$refs.formSelector.reset();
                this.getSubmissions();
            });
        },
        submissionType() {
            this.getSubmissions();
        },
        formId() {
            this.getSubmissions();
        },
        '$route.query.type'() {
            this.submissions = [];
            this.getSubmissions();
        },
    },
    created() {
        if (localStorage.mfpAffiliateId) {
            this.affiliateId = JSON.parse(localStorage.mfpAffiliateId);
        } else {
            this.affiliateId = null;
        }
    },
    mounted() {
        this.getSubmissions();
    },
    methods: {
        async getSubmissions() {
            this.affiliateId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
            try {
                if (!this.affiliateId) { return; }
                this.loading = true;
                const submissionType = this.$route.query?.type ? this.$route.query.type : this.submissionType;
                const { data } = await api.submissionListV2(this.affiliateId, this.formId,
                    submissionType, this.fName, this.lName)
                    .catch((err) => {
                        throw new Error(err);
                    });
                this.submissions = data;
            } catch (error) {
                console.log('Error fetching submissions: ', error);
            }
            this.loading = false;
        },
        async downloadSubmissions() {
            this.affiliateId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
            try {
                if (!this.affiliateId) { return; }
                this.loading = true;
                this.downloading = true;
                const self = this;
                const submissionType = this.$route.query?.type ? this.$route.query.type : this.submissionType;
                await api.downloadSubmissions(this.affiliateId, this.formId,
                    submissionType, this.fName, this.lName, this.onDownloadProgress, self)
                    .then((response) => {
                        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                        const fileLink = document.createElement('a');
                        fileLink.href = fileURL;
                        let filename = 'download.csv';
                        const disposition = response.headers['content-disposition'];
                        if (disposition && disposition.indexOf('attachment') !== -1) {
                            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                            const matches = filenameRegex.exec(disposition);
                            if (matches != null && matches[1]) {
                                filename = matches[1].replace(/['"]/g, '');
                            }
                        }
                        fileLink.setAttribute('download', filename);
                        document.body.appendChild(fileLink);
                        fileLink.click();
                        fileLink.remove();
                    })
                    .catch((err) => {
                        this.downloadingCancelToken = null;
                        this.downloading = false;
                        throw new Error(err);
                    })
                    .finally(() => {
                        this.downloadingCancelToken = null;
                        this.downloading = false;
                        this.downloadSize = 'calculating';
                        this.downloadRecordCount = 0;
                        this.downloadRecordTotal = 0;
                        this.downloadPercent = 0;
                    });
                // this.submissions = data;
            } catch (error) {
                console.log('Error fetching submissions: ', error);
            }
            this.loading = false;
        },
        performSearch() {
            if (this.fName !== '' || this.lName !== '') {
                this.getSubmissions();
            }
        },
        onDownloadProgress(event) {
            this.downloadRecordTotal = parseInt(event.target.getResponseHeader('Content-Record-Count'), 10);
            this.downloadRecordChunk = parseInt(event.target.getResponseHeader('Content-Record-Chunk'), 10);
            this.downloadSize = event.loaded;
            this.downloadRecordCount += this.downloadRecordChunk;
            if (this.downloadRecordCount >= this.downloadRecordTotal) {
                this.downloadRecordCount = this.downloadRecordTotal;
                this.downloadPercent = 100;
            } else {
                this.downloadPercent = Math.round((this.downloadRecordCount * 100.0) / this.downloadRecordTotal);
            }
            // console.log(this.downloadRecordCount + ' of ' + this.downloadRecordTotal);
        },
        downloadList() {
            if (this.formId !== '') {
                this.downloadSubmissions();
            }
        },
        clearSearch() {
            this.fName = null;
            this.lName = null;
            this.getSubmissions();
        },
        download(id) {
            this.loading = true;
            api.submissionDownload(id)
                .finally(() => {
                    this.loading = false;
                });
        },
        openDialog(id) {
            this.dialogConfirm = true;
            this.id = id;
        },
        resendEmail() {
            this.loading = true;
            this.dialogConfirm = false;
            api.resendEmail(this.id)
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
        clickNewRecord(item) {
            const {
                id,
                form_submission_data: {
                    firstName: {
                        data_value: fName,
                    },
                    lastName: {
                        data_value: lName,
                    },
                    middleName: {
                        data_value: middle,
                    },
                    preferredName: {
                        data_value: preferred,
                    },
                },
            } = item;
            const mName = !middle ? fName : middle;
            const pName = !preferred ? lName : preferred;
            const { origin } = window.location;
            const url = `${origin}/individuals/new/${fName}/${lName}/${mName}/${pName}/?submissionId=${id}`;
            window.open(url, '_blank');
        },
        downloadCancel() {
            if (this.downloadingCancelToken) {
                this.downloadingCancelToken.cancel();
                this.downloadingCancelToken = null;
            }
            this.loading = false;
            this.downloading = false;
        },
    },
};
</script>

<style lang="scss">
.submissionTitle {
    text-transform: uppercase;
}
.continueButton {
    .submit-button{
        color: white !important;
    }
    .v-btn {
        margin: 0 12px;
    }
}
.disable-download-btn {
    display: inline;
}
.downloadButton {
    display: inline-flex;
    margin-top: 0 !important;
}
.downloadBtn{
    background-color: #092a5c !important;
    border-color: #092a5c !important;
}
.downloadBtn .v-icon{
    color: #FFFFFF !important;
}
.v-data-table-header th {
    white-space: nowrap;
}
</style>
