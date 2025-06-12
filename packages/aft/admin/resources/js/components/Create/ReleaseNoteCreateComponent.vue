<template>
    <v-container>
        <v-row>
            <v-col cols="10">
                <v-text-field
                    class="textFieldHeader"
                    v-model="releaseNote.title"
                    label="Title"
                    variant="underlined"
                ></v-text-field>
                <div class="mt-4">
                    <v-label>Description</v-label>
                    <Editor v-model="releaseNote.description" upload-url="/admin/api/content-block/uploadFile" />
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-switch color="accent" label="Published" v-model="releaseNote.is_active"></v-switch>
                <v-text-field
                    class="textFieldHeader"
                    v-model="releaseNote.order"
                    label="Order"
                    variant="underlined"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row class="mt-8">
            <v-col cols="12" class="d-flex ga-4">
                <v-btn size="large" color="red" :to="{ name: 'releaseNoteList' }">Cancel</v-btn>
                <v-btn size="large" color="green" @click="saveReleaseNote">Save Changes</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Editor from '../Common/Editor.vue';

    export default {
        name: 'ReleaseNoteCreateComponent',
        components: {
            Editor,
        },
        data: () => ({
            editor: null,
            releaseNoteId: null,
            releaseNote: {
                title: null,
                description: ' ',
                is_active: false,
                order: 0,
            },
        }),
        methods: {
            saveReleaseNote() {
                axios.post('/admin/api/release-note', this.releaseNote)
                    .then(response => {
                        this.$router.replace({ name: 'releaseNoteList' })
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
                    })
                    .finally(() => {

                    });
            },
        }
    }
</script>
<style lang="scss" scoped>
    .textFieldHeader input { font-size: 1.1rem; }
</style>
