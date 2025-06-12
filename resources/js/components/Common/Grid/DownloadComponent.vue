<template>
    <div>
        <v-menu
            open-on-hover
        >
            <template v-slot:activator="{ props }">
                <v-btn density="compact" rounded="lg" color="primary" v-bind="props" icon="mdi:mdi-cloud-download" class="download-button" />
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, index) in downloadTypes"
                    :key="index"
                    :value="item.value"
                    :disabled="item.disabled"
                    @click="download(item)"
                    :title="item.title"
                >
                </v-list-item>
            </v-list>
        </v-menu>
        <v-dialog v-model="downloading" persistent max-width="640">
            <v-card>
                <v-card-title class="text-h5">{{ downloadLabel }}</v-card-title>
                <v-card-subtitle>
                    <p v-if="downloadSize > 0" class="mt-4 mb-0 text-right">{{ downloadSize }} <em>bytes received</em></p>
                </v-card-subtitle>
                <v-card-text>
                    <v-progress-linear
                        :indeterminate="downloadPercent === 0"
                        :model-value="downloadPercent"
                        :buffer-value="downloadBuffer"
                        buffer-color="primary"
                        buffer-opacity=".4"
                        color="primary"
                        height="12"
                        stream
                    ></v-progress-linear>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="downloadCancel()" color="red" variant="elevated">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "DownloadComponent",
    props: {
        downloadBaseURL: {
            type: String
        },
        downloadAllUrlParams: {
            type: String,
            default: ''
        },
        downloadUrlParams: {
            type: String
        },
        configurationModel: {
            type: String
        },
        configurationKey: {
            type: String
        },
        include: {
            type: String,
            default: ''
        },
        useHomeAddress: {
            type: Boolean,
            default: false
        },
    },
    data: () => ({
        downloadURL: null,
        downloading: false,
        downloadingCancelToken: null,
        downloadTypes: [
            // { title: 'Export List Below (Excel)', format: 'xlsx', type: 'filtered', disabled: true },
            // { title: 'Export All Records and Fields (Excel)', format: 'xlsx', type: 'all', disabled: true },
            { title: 'Export List Below (CSV)', format: 'csv', type: 'filtered', disabled: false },
            { title: 'Export All Records and Fields (CSV)', format: 'csv', type: 'all', disabled: false },
        ],
        downloadLabel: 'Preparing Download...',
        downloadPercent: 0,
        downloadBuffer: 0,
        downloadSize: null,
    }),
    methods: {
        download(options) {
            let url = this.downloadBaseURL + '/download/' + options.format + '/' + options.type + '?model=' + this.configurationModel + '&key=' + this.configurationKey + '&' + this.include;
            url += '&useHomeAddress=' + this.useHomeAddress;
            // console.log(url);
            if (options.type === 'all') {
                url += '&' + this.downloadAllUrlParams;
            }
            else {
                url += '&' + this.downloadUrlParams;
            }
            this.downloading = true;
            this.downloadLabel = 'Waiting to Download...';
            this.downloadPercent = 0;
            this.downloadBuffer = 0;
            this.downloadSize = 0;

            this.downloadingCancelToken = axios.CancelToken.source();
            let chunkTotal = 0;
            // Fuzzy factor since chunk total does not increment as fast as bytes downloaded.
            const fuzzy = 2;

            return axios({
                url: url,
                method: 'GET',
                responseType: 'blob',
                cancelToken: this.downloadingCancelToken.token,
                onDownloadProgress: (progressEvent) => {
                    this.downloadLabel = 'Downloading...';
                    const headers = progressEvent.event.target.getAllResponseHeaders();
                    if (headers) {
                        const contentRecordCount = parseInt(progressEvent.event.target.getResponseHeader('Content-Record-Count')) || 0;
                        const contentChunk = parseInt(progressEvent.event.target.getResponseHeader('Content-Record-Chunk')) || 15;
                        chunkTotal += contentChunk;
                        this.downloadLabel = `Downloading ${contentRecordCount} records...`;
                        this.downloadPercent = Math.min(Math.round((chunkTotal * fuzzy / contentRecordCount * 100.0)), 100.0);
                        // Buffer advances ahead just for fun.
                        this.downloadBuffer = Math.min(Math.max(this.downloadPercent * Math.floor(Math.random() * 2 + 1), this.downloadBuffer), 100.0);
                        this.downloadSize = progressEvent.loaded;
                        // console.log(`size: ${progressEvent.loaded}, percent: ${this.downloadPercent}, buffer: ${this.downloadBuffer}, recordCount: ${contentRecordCount}`);
                    }
                },
            })
                .then(response => {
                    this.downloadBuffer = 100;
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
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // do nothing
                    } else {
                        this.downloadLabel = 'Download Failed!';
                        console.log(error);
                    }
                    this.downloadingCancelToken = null;
                    // Leave the error up for a second.
                    setTimeout(() => {
                        this.downloading = false;
                    }, 1000);
                })
                .finally(() => {
                    this.downloadLabel = 'Download Completed!';
                    this.downloadPercent = 100;
                    this.downloadingCancelToken = null;
                    // Let the 100% state stay for a second.
                    setTimeout(() => {
                        this.downloading = false;
                    }, 1500);
                });
        },
        downloadCancel() {
            if (this.downloadingCancelToken) {
                this.downloadingCancelToken.cancel();
                this.downloadingCancelToken = null;
            }
            this.loading = false;
            this.downloading = false;
        }
    },
}
</script>

