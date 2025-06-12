<template>
    <v-container class="mt-8">
        <v-alert
            v-model="alert"
            :type="alertType"
            closable
            close-text="Dismiss"
        >
            {{ alertText }}
        </v-alert>
        <v-row>
            <v-col cols="10">
                <h4 class="mt-3 mb-0">
                    Local Logo:
                </h4>
                <div class="logo-item">
                    <v-btn
                        class="mr-6"
                        color="primary"
                        name="local-btn"
                        :loading="isLocalSelecting"
                        @click="handleLocalFileImport"
                        append-icon="mdi:mdi-cloud-upload"
                    >
                        Upload
                    </v-btn>
                    <input
                        ref="localUploader"
                        class="d-none"
                        type="file"
                        name="local"
                        accept=".png, .jpg, .svg"
                        @change="onFileChanged"
                    >

                    <span
                        v-if="logoData && logoData.localLogo"
                        class="uploaded-logo"
                    >
                        <img
                            :src="logoData.localLogo"
                            alt="localLogo"
                            width="60"
                        >
                        <v-tooltip location="top">
                            <template #activator="{ props }">
                                <v-btn
                                    class="ml-4"
                                    v-bind="props"
                                    @click="removeLogoDialog('local')"
                                    icon="mdi:mdi-trash-can-outline"
                                    variant="text"
                                >
                                    <v-icon color="red" />
                                </v-btn>
                            </template>
                            Discard
                        </v-tooltip>
                    </span>
                    <span v-else-if="localFileName !== ''">
                        <img
                            :src="localFileName"
                            alt="fedLogo"
                            width="60"
                        >
                    </span>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10">
                <h4 class="mt-3 mb-0">
                    State Federation/Other Logo:
                </h4>
                <div class="logo-item">
                    <v-btn
                        class="mr-6"
                        color="primary"
                        name="fed-btn"
                        :loading="isFedSelecting"
                        @click="handleFedFileImport"
                        append-icon="mdi:mdi-cloud-upload"
                    >
                        Upload
                    </v-btn>
                    <input
                        ref="fedUploader"
                        name="fed"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        @change="onFileChanged"
                    >
                    <span
                        v-if="logoData && logoData.fedLogo"
                        class="uploaded-logo"
                    >
                        <img
                            :src="logoData.fedLogo"
                            alt="fedLogo"
                            width="60"
                        >
                        <v-tooltip location="top">
                            <template #activator="{ props }">
                                <v-btn
                                    class="ml-4"
                                    v-bind="props"
                                    @click="removeLogoDialog('fed')"
                                    icon="mdi:mdi-trash-can-outline"
                                    variant="text"
                                >
                                    <v-icon color="red" />
                                </v-btn>
                            </template>
                            Discard
                        </v-tooltip>
                    </span>
                    <span v-else-if="fedFileName !== ''">
                        <img
                            :src="fedFileName"
                            alt="fedLogo"
                            width="60"
                        >
                    </span>
                </div>
            </v-col>
        </v-row>
        <v-row class="mt-8">
            <v-col cols="12" class="d-flex ga-4">
                <v-btn
                    size="large"
                    color="red"
                    @click="cancelFiles"
                >
                    Cancel
                </v-btn>
                <v-btn
                    size="large"
                    color="green"
                    @click="uploadFiles"
                >
                    Save Changes
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title
                    class="text-h5"
                >
                    Are you sure?
                </v-card-title>
                <v-card-text>
                    Logo will be deleted permanently.
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="red-darken-1"
                        variant="text"
                        @click="dialog = false"
                    >
                        NO
                    </v-btn>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="removeLogo(deleteType)"
                    >
                        YES
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PageSettings',
    components: {

    },
    data: () => ({
        isLocalSelecting: false,
        isFedSelecting: false,
        files: {},
        fedFileName: '',
        localFileName: '',
        logoData: {},
        dialog: false,
        deleteType: '',
        alert: false,
        alertType: 'success',
        alertText: '',
    }),
    computed: {
        selectedAffiliate() {
            return this.$store.getters['user/selectedAffiliate'].AffiliateId;
        },
    },
    mounted() {
        this.getLogos();
    },
    methods: {
        handleLocalFileImport() {
            this.isLocalSelecting = true;
            window.addEventListener('focus', () => {
                this.isLocalSelecting = false;
            }, { once: true });

            this.$refs.localUploader.click();
        },
        handleFedFileImport() {
            this.isFedSelecting = true;

            window.addEventListener('focus', () => {
                this.isFedSelecting = false;
            }, { once: true });

            this.$refs.fedUploader.click();
        },
        onFileChanged(e) {
            const selectedFiles = e.target.files;

            for (let i = 0; i < selectedFiles.length; i += 1) {
                this.files[e.target.name] = selectedFiles[i];
            }
            console.log('this.files:', this.files);
            if (e.target.name === 'fed') {
                this.fedFileName = URL.createObjectURL(this.files.fed);
            }
            if (e.target.name === 'local') {
                this.localFileName = URL.createObjectURL(this.files.local);
            }
        },

        getLogos() {
            const url = '/api/v3/memberforms/admin/get-logos';
            return axios.post(url, { affiliateId: this.selectedAffiliate })
                .then((response) => {
                    this.logoData = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        removeLogoDialog(type) {
            this.dialog = true;
            this.deleteType = type;
        },
        removeLogo(logoType) {
            const url = '/api/v3/memberforms/admin/remove-logo';
            return axios.post(url, { affiliateId: this.selectedAffiliate, type: logoType })
                .then((response) => {
                    console.log(response);
                    this.dialog = false;
                    this.deleteType = '';
                    this.getLogos();
                    this.cancelFiles();
                    this.alert = true;
                    this.alertType = 'success';
                    this.alertText = 'Logo removed successfully.';
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        cancelFiles() {
            this.files = {};
            this.fedFileName = '';
            this.localFileName = '';
        },
        uploadFiles() {
            const url = '/api/v3/memberforms/admin/upload-logos';
            const formData = new FormData();
            formData.append('fed', this.files.fed);
            formData.append('local', this.files.local);
            formData.append('affiliateId', this.selectedAffiliate);
            axios.post(url, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((response) => {
                    if (response) {
                        this.getLogos();
                    }
                    this.alert = true;
                    this.alertType = 'success';
                    this.alertText = 'Logo updated.';
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
    .textFieldHeader input { font-size: 1.1rem; }

    .logo-item {
        display: flex;
        align-items: center;

        .uploaded-logo {
            display: flex;
            align-items: center;
        }
    }
</style>
