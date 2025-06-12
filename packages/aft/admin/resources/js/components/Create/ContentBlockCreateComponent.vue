<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6">
                <v-select
                    :items="application"
                    label="Application"
                    item-value="value"
                    item-title="label"
                    v-model="contentblock.application"
                    variant="underlined"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6">
                <v-select
                    :items="priorityList"
                    label="Priority"
                    item-value="value"
                    item-title="label"
                    v-model="contentblock.priority"
                    variant="underlined"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6">
                <v-select
                    :items="positionList"
                    label="Position"
                    item-value="value"
                    item-title="label"
                    v-model="contentblock.position"
                    variant="underlined"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10">
                <v-text-field
                    class="textFieldHeader"
                    v-model="contentblock.title"
                    label="Title"
                    variant="underlined"
                ></v-text-field>
                <Editor v-model="contentblock.content" :upload-url="uploadUrl" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10">
                <v-btn
                    color="primary"
                    rounded
                    :loading="isSelecting"
                    @click="handleFileImport"
                >
                    Upload PDF
                </v-btn>
                <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    accept="application/pdf"
                    @change="onFileChanged"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="switches">
                <v-switch color="accent" label="Published" v-model="contentblock.is_active"></v-switch>
            </v-col>
        </v-row>
        <v-row class="mt-8">
            <v-col cols="12" class="d-flex ga-4">
                <v-btn size="large" color="red" :to="{ name: 'contentBlockList' }">Cancel</v-btn>
                <v-btn size="large" color="green" @click="saveContentBlock">Save Changes</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Editor from '../Common/Editor.vue';
    import uploadFile from "../../mixins/uploadFile.js";

    export default {
        name: 'ContentBlockCreateComponent',
        components: {
            Editor,
        },
        mixins: [uploadFile],
        data: () => ({
            editor: null,
            contentblockId: null,
            contentblock: {
                title: null,
                content: ' ',
                is_active: false,
                application: null,
                priority: null,
                position: null,
            },
            application: [
                { 'value': 'connect', 'label': 'Connect' },
                { 'value': 'memberforms', 'label': 'Membership Forms Portal' },
                { 'value': 'public', 'label': 'Public' }
            ],
            priorityList: [
                { 'value': 'normal', 'label': 'Normal' },
                { 'value': 'low', 'label': 'Low' },
                { 'value': 'medium', 'label': 'Medium' },
                { 'value': 'high', 'label': 'High' }
            ],
            positionList: [
                { 'value': 'left', 'label': 'Left' },
                { 'value': 'right', 'label': 'Right' },
            ],
            isSelecting: false,
            files: []
        }),
        methods: {
            saveContentBlock() {
                axios.post('/admin/api/content-block', {
                    contentblock: this.contentblock,
                })
                    .then(response => {
                        this.$router.replace({ name: 'contentBlockList' })
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
                    })
                    .finally(() => {

                    });
            },
            handleFileImport() {
                this.isSelecting = true;

                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, { once: true });

                this.$refs.uploader.click();
            },
            onFileChanged(e) {
                var selectedFiles = e.target.files;
                for (let i = 0; i < selectedFiles.length; i++) {
                    // console.log(selectedFiles[i]);
                    this.files.push(selectedFiles[i]);
                }
                this.uploadFiles(e.target.files);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .textFieldHeader input { font-size: 1.1rem; }
</style>
