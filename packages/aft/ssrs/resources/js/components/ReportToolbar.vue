<template>
    <v-card :loading="loading">
        <v-container fluid>
            <v-row no-gutters v-if="!errors">
                <v-col
                    v-for="parameter in reportParameters"
                    :key="parameter.name"
                >
                    <generic-parameter
                        :parameter="parameter"
                        @input="updateSendParameters(parameter.name, $event)"
                    ></generic-parameter>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col>
                    Something went wrong!
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import api from '../api/reports';
import LoadingOverlay from './LoadingOverlay.vue';
import GenericParameter from "./parameters/GenericParameter";

export default {
    name: 'ReportToolbar',
    components: { GenericParameter },
    props: {
        value: { type: Object, default: null },
        path: { type: String, default: '' },
        affiliate: { type: String, default: '' },
    },
    data: () => ({
        loading: false,
        disabled: false,
        errors: false,
        reportParameters: [],
        sendParameters: {},
    }),
    watch: {
        path: function(newValue, oldValue) {
            console.log('TOOLBAR CHANGED', newValue);
            this.loadReportOptions(newValue);
        },
        sendParameters: {
            deep: true,
            handler() {
                console.log('SEND PARAMETERS CHANGED', this.sendParameters);
                this.validateSendParameters();
            }
        },
    },
    mounted() {
        // this.sendParameters = this.reportParameters;
    },
    methods: {
        loadReportOptions(path) {
            this.loading = true;
            this.disabled = false;
            this.errors = false;
            api.reportGetOptions(path)
                .then((response) => {
                    console.log('SET REPORT OPTIONS', response.data);
                    this.reportParameters = response.data.parameters;
                    // TODO: in some cases this forces loading twice...
                    this.validateSendParameters();
                })
                .catch((error) => {
                    console.log('SSRS TOOLBAR ERROR', error);
                    this.disabled = true;
                    this.errors = true;
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        updateSendParameters(name, value) {
            console.log('UPDATE SEND PARAMETERS', this.sendParameters, name, value);
            //this.sendParameters.push({[name]: value});
            this.sendParameters[name] = value;
            this.validateSendParameters();
        },
        validateSendParameters() {
            console.log('VALIDATE SEND PARAMETERS', this.sendParameters);
            this.$emit('input', this.sendParameters);
        },
    },
};
</script>
