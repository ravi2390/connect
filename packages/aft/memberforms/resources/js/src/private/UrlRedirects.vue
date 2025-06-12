<template>
    <v-container fluid>
        <v-alert
            v-model="alert"
            :type="alertType"
            closable
            close-text="Dismiss"
        >
            {{ alertText }}
        </v-alert>

        <v-row>
            <v-col>
                <h2 class="submissionTitle">
                    URL Redirects
                </h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <FormSearchSelector
                    ref="formSelector"
                    v-model="formId"
                    label="Select a Form"
                    item-value="id"
                    search-type="form"
                    :search-args="{ affiliateId: affiliateId, sortBy: 'system_name' }"
                    item-title="system_name"
                    outlined
                    clearable
                />
            </v-col>
        </v-row>
        <v-col v-if="formId">
            <strong> Original public form URL:</strong>
            <a
                :href="'/app/memberforms/form/'+formId"
                target="_blank"
            >
                {{ baseUrl }}/app/memberforms/form/{{ formId }}
            </a>
        </v-col>
        <v-row>
            <v-col>
                <v-text-field
                    v-model="customUrl"
                    label="Custom URL"
                    :prefix="'/app/memberforms/'+affiliateNumber+'/'"
                    class=""
                    variant="outlined"
                    :disabled="!formId"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="continueButton">
                <v-btn
                    color="#0A2A5C"
                    class="submit-button"
                    @click="saveUrlRedirect()"
                >
                    Save
                </v-btn>
                <v-btn
                    class="btn-default"
                    @click="clearForm()"
                >
                    Clear
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="urlRedirects"
                    class="v-outlined"
                >
                    <template v-slot:[`item.CreatedAt`]="{ item }">
                        <span>
                            {{ displayDate(item.CreatedAt) }}
                        </span>
                    </template>
                    <template #[`item.form_id`]="{ item }">
                        <span>
                            <a
                                :href="'/app/memberforms/form/'+item.form_id"
                                target="_blank"
                            >
                                {{ "/app/memberforms/form/"+item.form_id }}
                            </a>
                        </span>
                        <v-icon
                            start
                            class="clipboardIcon"
                            @click="copyUrlToClipBoard(baseUrl+'/app/memberforms/form/'+item.form_id)"
                            icon="mdi:mdi-clipboard-multiple"
                        >
                        </v-icon>
                    </template>
                    <template #[`item.qr_code`]="{ item }">
                        <a @click="generateQrCode(item.custom_url)">
                            <v-img
                                max-height="32"
                                max-width="32"
                                :src="qrCodeImage"
                            />
                        </a>
                    </template>
                    <template v-slot:[`item.custom_url`]="{ item }">
                        <span>
                            <a
                                :href="'/app/memberforms/'+affiliateNumber+'/'+item.custom_url"
                                target="_blank"
                            >
                                {{ "/app/memberforms/"+affiliateNumber+"/"+item.custom_url }}
                            </a>
                        </span>
                        <v-icon
                            start
                            class="clipboardIcon"
                            @click="copyUrlToClipBoard(baseUrl+'/app/memberforms/'+affiliateNumber+'/'+item.custom_url)"
                            icon="mdi:mdi-clipboard-multiple"
                        >
                        </v-icon>
                    </template>
                    <template v-slot:[`item.id`]="{ item }">
                        <v-btn
                            size="small"
                            elevation="2"
                            @click="deleteUrl(item.id);"
                        >
                            Delete
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-dialog
            v-model="qrCodeDialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-text>
                    <div v-html="qrCode" />
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="qrCodeDialog = false"
                    >
                        Dismiss
                    </v-btn>
                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="downloadQrCode"
                    >
                        Download
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
import qrCodeImage from '../../../images/qr-code.png';

export default {
    name: 'PageSubmissionList',
    components: { FormSearchSelector },
    data: () => ({
        loading: false,
        alert: false,
        alertType: 'success',
        alertText: '',
        affiliateId: null,
        affiliateName: null,
        affiliateNumber: null,
        formId: null,
        headers: [
            { title: 'Form URL', value: 'form_id' },
            { title: 'Custom URL', value: 'custom_url' },
            { title: 'Form Name', value: 'form.display_name' },
            { title: 'QR', value: 'qr_code' },
            { title: 'Date Created', value: 'CreatedAt' },
            { title: 'Action', value: 'id' },
        ],
        baseUrl: '/',
        customUrl: '',
        customUrlField: {
            label: 'Custom URL',
        },
        urlRedirects: [],
        qrCodeDialog: false,
        qrCodeImage,
        qrCode: '',
        customFormUrl: '',
    }),
    watch: {
        affiliateId() {
            this.$nextTick(() => {
                localStorage.mfpAffiliateId = JSON.stringify(this.affiliateId);
                this.$refs.formSelector.reset();
                this.getUrlRedirects();
            });
        },
    },
    created() {
        if (localStorage.mfpAffiliateId) {
            this.affiliateName = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateName : null;
            this.affiliateNumber = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateNumber : null;
            this.affiliateId = JSON.parse(localStorage.mfpAffiliateId);
        } else {
            this.affiliateId = null;
        }
    },
    mounted() {
        this.getUrlRedirects();
        this.baseUrl = window.location.origin;
    },
    methods: {
        copyUrlToClipBoard(url) {
            navigator.clipboard.writeText(url);
        },
        displayDate(date) {
            return format(new Date(date), 'MMMM dd, yyyy hh:mm a');
        },
        async deleteUrl(id) {
            try {
                if (!id) { return; }
                this.loading = true;
                const data = await api.urlRedirectDelete(id)
                    .then(() => {
                        this.getUrlRedirects();
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
                this.urlRedirects = data;
            } catch (error) {
                console.log('Error deleting URL Redirects: ', error);
            }
            this.loading = false;
        },
        async getUrlRedirects() {
            this.affiliateId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
            try {
                this.alert = false;
                this.alertType = 'success';
                this.alertText = '';
                if (!this.affiliateName) { return; }
                this.loading = true;
                const { data } = await api.urlRedirectList(this.affiliateName)
                    .catch((err) => {
                        throw new Error(err);
                    });
                this.urlRedirects = data;
            } catch (error) {
                console.log('Error fetching URL Redirects: ', error);
            }
            this.loading = false;
        },

        async saveUrlRedirect() {
            try {
                if (!this.affiliateName) { return; }
                if (this.customUrl === '') { return; }
                this.alert = false;
                this.alertType = 'success';
                this.alertText = '';
                if (/\s/.test(this.customUrl)) {
                    this.alert = true;
                    this.alertType = 'error';
                    this.alertText = 'Please enter valid URL';
                    return;
                }
                this.loading = true;
                await api.urlRedirectCreate({
                    customUrl: this.customUrl,
                    affiliateName: this.affiliateName,
                    affiliateNumber: this.affiliateNumber,
                    formId: this.formId,
                })
                    .then((response) => {
                        // console.log(response);
                        if (response.data && response.data.errors) {
                            this.alert = true;
                            this.alertText = response.data.errors.customUrl[0];
                            this.alertType = 'error';
                        } else {
                            this.getUrlRedirects();
                            this.clearForm();
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 422) {
                            this.alert = true;
                            this.alertType = 'error';
                            this.alertText = err.response.data.errors.formId ? err.response.data.errors.formId[0]
                                : err.response.data.errors.customUrl[0];
                        }
                    });
            } catch (error) {
                console.log('Error fetching URL Redirects: ', error);
            }
            this.loading = false;
        },
        clearForm() {
            this.formId = null;
            this.$refs.formSelector.reset();
            this.customUrl = '';
        },
        generateQrCode(customUrl) {
            this.loading = true;
            const url = `${this.baseUrl}/app/memberforms/${this.affiliateNumber}/${customUrl}`;
            this.customFormUrl = url;
            api.submissionQrCode(url)
                .then((response) => {
                    this.qrCode = response.data;
                    this.qrCodeDialog = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        downloadQrCode() {
            this.loading = true;
            api.downloadQrCode(this.customFormUrl)
                .then((response) => {
                    // console.log('test', response);
                    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    const fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    const filename = 'qr_code.svg';
                    fileLink.setAttribute('download', filename);
                    document.body.appendChild(fileLink);
                    fileLink.click();
                    fileLink.remove();
                })
                .finally(() => {
                    this.loading = false;
                });
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
    margin-top: 24px;
}
.downloadBtn{
    background-color: #092a5c !important;
    border-color: #092a5c !important;
}
.downloadBtn .v-icon{
    color: #FFFFFF !important;
}

.clipboardIcon {
    margin-left: 5px;
}
@media only screen and (max-width: 960px) {
    .v-data-footer {
        padding: 0 8px;
        .v-btn--icon.v-size--default {
            height: 30px;
            width: 30px;
        }
    }
    .v-application--is-ltr {
        .v-data-footer__select {
            margin-left: 0;
            margin-right: 0;
            .v-select {
                margin-left: 12px;
            }
        }
        .v-data-footer__pagination {
            margin: 0 12px;
        }
    }
    .v-data-table-header-mobile__wrapper {
        .theme--light {
            &.v-label,
            &.v-icon {
                color: white;
            }
        }
        .theme--light.v-text-field>.v-input__control>.v-input__slot:before,
        .theme--light.v-text-field>.v-input__control>.v-input__slot:after {
            border-color: white;
        }
    }
}
</style>
