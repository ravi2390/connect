<template>
    <v-dialog v-model="showDialog" max-width="800">
        <v-card :title="listTitle" :loading="loading">
            <v-card-text>
                <component
                    v-for="(option, index) in options"
                    :key="index"
                    :is="downloadOptionTypeToComponent(option.type)"
                    :option="option"
                    v-model="option.value"
                />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="hide" variant="elevated">Cancel</v-btn>
                <v-btn @click="doOk" color="primary" prepend-icon="fa-cloud-download" variant="elevated">Download</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import downloadOptionTypeToComponent from "../mixins/downloadOptionTypeToComponent";
import DownloadOptionCheckList from "./DownloadOptionCheckList";
import DownloadOptionTextField from "./DownloadOptionTextField";

export default {
    name: 'DownloadOptions',
    components: {
        DownloadOptionCheckList,
        DownloadOptionTextField,
    },
    mixins: [downloadOptionTypeToComponent],
    props: {
        list: { type: Object, required: true },
    },
    emits: ['ok'],
    data: () => ({
        showDialog: false,
        loading: false,
        options: [],
    }),
    computed: {
        listTitle() {
            return this.list.label + ' Download Options';
        },
    },
    watch: {
        list() {
            console.log('OPTIONS CHANGED');
            //this.getListOptions(this.list.id);
        },
        options: {
            deep: true,
            handler() {
                console.log('DOWNLOAD OPTIONS', this.options);
            }
        },
    },
    mounted() {
        //
    },
    methods: {
        show() {
            this.options = [];
            this.getListOptions(this.list.id);
            this.showDialog = true;
        },
        hide() {
            this.showDialog = false;
        },
        doOk() {
            this.$emit('ok', this.list, this.options);
            this.hide();
        },
        getListOptions(id) {
            this.loading = true;
            return axios.get(`/api/staff/lists/${id}/options`)
                .then((response) => {
                    this.options = response.data;
                })
                .finally(() => {
                    this.loading = false;
                })
        },
    },
};
</script>
