<template>
    <v-expansion-panels>
        <v-expansion-panel v-on:group:selected="onExpand">
            <v-expansion-panel-title>
                <h4>{{title}}</h4>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <FlipCard :flipped="flipped">
                    <template #front>
                        <v-row>
                            <v-col class="text-right" v-if="isDownloadEnabled">
                                <v-btn size="small" @click="onDownloadView">Download files</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
                                <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
                                <v-card class="v-card--outlined v-sheet--tile p-4">
                                    Upload a file
                                    <div class="data-container">
                                        <v-file-input label="Select a file" :accept="allowedFileExtensions" v-on:change="fileSelection" v-model="file"></v-file-input>
                                        <v-text-field label="File description" size="500" v-model="description"></v-text-field>
                                    </div>
                                    <div>
                                        <v-btn size="small" color="primary" v-on:click="uploadFile">Upload</v-btn>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                    <template #back>
                        <v-row>
                            <v-col class="text-right">
                                <v-btn size="small" @click="onUploadView">Back to upload</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <div>
                                    <v-data-table-server
                                        :headers="headers"
                                        :items="fileAttachments"
                                        v-model:options="options"
                                        :items-length="totalFileAttachments"
                                        :loading="loading"
                                        class="v-outlined"
                                    >
                                        <template v-slot:progress>
                                            <v-progress-linear
                                                indeterminate
                                                height="8"
                                                color="#3f98c9"
                                            ></v-progress-linear>
                                        </template>
                                        <template v-slot:[`item.OriginalFileName`]="{ item }">
                                            <a href="javascript:void(0);" @click="downloadFile(item);">{{ item.OriginalFileName }}</a>
                                        </template>
                                    </v-data-table-server>
                                </div>
                            </v-col>
                        </v-row>
                    </template>
                </FlipCard>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    import FlipCard from "../Common/Card/FlipCard";

    export default {
        name: "FileAttachmentComponent",
        components:{FlipCard},
        data() {
            return {
                alert: false,
                alertType: 'success',
                alertText: '',
                file:null,
                affiliate: {},
                selectedAffiliateId: null,
                description: '',
                options: {
                    sortBy: [{ key: 'CreatedAt', order: 'asc' }],
                },
                loading: false,
                fileAttachments:[],
                totalFileAttachments: 0,
                headers: [
                    {title: 'File Name', value: 'OriginalFileName'},
                    {title: 'Description', value: 'Description'},
                    {title: 'Uploaded On', value: 'CreatedAt'},
                ],
                flipped: false,
            }
        },
        props: {
            title:{
                type: String,
                required: false,
                default: 'File Attachment'
            },
            isDownloadEnabled:{
                type: Boolean,
                required: false,
                default: true
            },
            fileAttachmentTypeName:{
                type: String,
                required: true
            },
            entityId: {
                type: Number,
                required: true
            },
            allowedFileExtensions: {
                type: String,
                required: true
            },
        },
        mounted() {
            const affiliate = this.$store.getters['user/selectedAffiliate'];
            if (affiliate) {
                this.selectedAffiliateId = affiliate.AffiliateId;
            }
        },
        methods: {
            onExpand({ value }) {
                if (value) {
                    //this.getDataFromApi();
                }
            },

            onDownloadView(){
                this.getDataFromApi();
                this.flipped = true;
            },

            onUploadView(){
                this.flipped = false;
                this.alert = false;
                this.alertType = 'success';
                this.alertText = '';
            },

            fileSelection(e)
            {
                this.file = e;
            },

            uploadFile() {
                if(this.selectedAffiliateId != null && this.file != null) {

                    let url = '/api/v2/fileAttachment/uploadFile';
                    let formData = new FormData();

                    formData.append('file', this.file);
                    //formData.append('affiliateId', this.selectedAffiliateId);
                    formData.append('fileAttachmentType', this.fileAttachmentTypeName);
                    formData.append('entityId', this.entityId);
                    formData.append('description', this.description);

                    axios.post(url, formData,
                        {
                            headers: {'Content-Type': 'multipart/form-data'}
                        })
                        .then(data => {
                            this.alert = true;
                            this.alertType = 'success';
                            this.alertText = 'File uploaded.';

                            this.file = null;
                            this.description = '';
                        })
                        .catch(function () {

                        });
                }
            },

            downloadFile(fileOptions) {
                console.log('test Am in' + fileOptions.id);
                let url = '/api/v2/fileAttachment/downloadFile/' + fileOptions.id;
                return axios({
                    url: url,
                    method: 'GET',
                    responseType: 'blob'
                })
                    .then(response => {
                        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                        const fileLink = document.createElement('a');
                        fileLink.href = fileURL;
                        let filename = fileOptions.OriginalFileName;
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
                    .catch(function(error) {
                            if (axios.isCancel(error)) {
                                // do nothing
                            } else {
                                console.log(error);
                            }
                            //this.downloadingCancelToken = null;
                            //this.downloading = false;
                        }
                    )
            },

            getDataFromApi() {
                this.loading = true;
                const {sortBy, page, itemsPerPage} = this.options;
                const sortDefault = sortBy[0] ?? { key: 'CreatedAt', order: 'asc' };
                const sortByField = sortDefault.key ?? 'CreatedAt';
                const sortDirection = sortDefault.order === 'asc' ? '' : '-';
                //const fileAttachmentTypeId = 1;
                let url = '/api/v2/fileAttachment/getFiles?page=' + page + '&per_page=' + itemsPerPage + '&sort=' + sortDirection + sortByField;

                let formData = new FormData();
                formData.append('fileAttachmentType', this.fileAttachmentTypeName);
                formData.append('entityId', this.entityId);

                return axios.post(url, formData)
                    .then(response => {
                        this.fileAttachments = response.data;
                        this.totalFileAttachments = response.data.length;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        }
    }
</script>

<style scoped>

</style>
