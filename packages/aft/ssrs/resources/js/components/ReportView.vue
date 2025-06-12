<template>
    <v-container>
        <report-toolbar v-model="parameters" :path="path" :affiliate="affiliate" :errors="errors" @input="updateParameters"></report-toolbar>
        <v-btn v-if="path !== ''" @click="downloadReport" variant="elevated">Download</v-btn>
        <div v-if="!errors" class="container" style="width:100%;height:100%;" v-html="report"></div>
        <div v-else class="container" style="width:100%;height:100%;">Something went wrong!</div>
        <loading-component :loading="loading"></loading-component>
    </v-container>
</template>

<script>
import api from '../api/reports';
import ReportToolbar from './ReportToolbar.vue';
import LoadingComponent from './LoadingOverlay.vue'
import axios from "axios";

export default {
    name: 'ReportView',
    components: { ReportToolbar, LoadingComponent },
    props: {
        path: { type: String, default: '' },
    },
    data: () => ({
        loading: false,
        disabled: false,
        errors: false,
        affiliate: '',
        report: '',
        parameters: {},
    }),
    watch: {
        path: function(value, old) {
            // this.loadReport(value);
        },
        parameters: {
            deep: true,
            handler() {
                console.log('LOAD REPORT');
                // this.loadReport(this.path);
            }
        }
    },
    mounted() {
        // this.loadReport(this.path);
    },
    methods: {
        loadReport(path) {
            const p = this.parameters;
            console.log('REPORTVIEW LOAD REPORT', path, p);
            this.loading = true;
            this.disabled = false;
            this.errors = false;
            console.log('REALLY?', p);
            api.reportGet(path, p)
                .then((response) => {
                    this.report = response.data;
                })
                .catch((error) => {
                    console.log('SSRS VIEW ERROR', error);
                    this.disabled = true;
                    this.errors = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        downloadReport() {
            const path = this.path;
            const p = this.parameters;
            console.log('REPORTVIEW DOWNLOAD REPORT', path, p);
            this.loading = true;
            this.disabled = false;
            this.errors = false;
            const pa = api.makeParams(p);
            console.log('REALLY?', p);
            axios.request({ url: '/api/v3/reports/download' + path + '?' + pa, method: 'GET', responseType: 'blob' })
                .then((response) => {
                    console.log('DOWNLOAD AXIOS REQUEST RESPONSE', response);
                    let cd = response.headers['content-disposition'].split('; ');
                    let disposition = [];
                    cd.forEach(function(item) {
                        let t = item.split('=');
                        disposition[t[0]] = t[1];
                    });
                    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.setAttribute('download', disposition['filename']);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        updateParameters() {
            console.log('REPORTVIEW UPDATE PARAMETERS', this.parameters);
            this.loadReport(this.path);
        }
    },
};
</script>
