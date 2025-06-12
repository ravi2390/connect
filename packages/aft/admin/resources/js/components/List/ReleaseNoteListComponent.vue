<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-btn color="#4caf50" :to="{ name: 'releaseNoteCreate' }">
                    Create Release Note
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table-server
                    v-model:options="options"
                    :loading="loading"
                    :headers="headers"
                    :items="releaseNotes"
                    :item-key="releaseNotes.id"
                    :items-length="releaseNoteTotal"
                    disable-sort
                >
                    <template v-slot:[`item.is_active`]="props">
                            <span v-if="props.item.is_active == 1">
                                Yes
                            </span>
                            <span v-if="props.item.is_active == 0">
                                No
                            </span>
                    </template>
                    <template v-slot:[`item.edit`]="{ item }">
                        <v-btn icon="mdi:mdi-comment-edit" color="primary" variant="text" :to="{ name: 'releaseNoteEdit', params: { id: item.id }}"></v-btn>
                    </template>

                    <template v-slot:[`item.delete`]="{ item }">
                        <v-btn icon="mdi:mdi-delete" color="red" variant="text" @click="openDeleteReleaseNote(item.id)"></v-btn>
                    </template>
                </v-data-table-server>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
            <v-card-title class="text-h5">Are you sure?</v-card-title>
            <v-card-text>This record will be deleted permanently.</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn color="red-darken-1" variant="text" @click="dialog = false">NO</v-btn>
                <v-btn color="green-darken-1" variant="text" @click="deleteReleaseNote">YES</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: 'ReleaseNoteListComponent',
        data: () => ({
            loading: false,
            headers: [
                { title: 'Title', value: 'title' },
                { title: 'Published', value: 'is_active' },
                { title: 'Order', value: 'order' },
                { title: 'Created', value: 'created_at' },
                { title: 'Updated', value: 'updated_at' },
                { title: 'Edit', value: 'edit' },
                { title: 'Delete', value: 'delete' },
            ],
            options: {
                page: 1,
                itemsPerPage: 15,
            },
            releaseNotes: [],
            releaseNoteTotal: 0,
            dialog: false,
            releaseNoteId:null,
        }),
        watch: {
            options: {
                handler() {
                    this.getDataFromApi();
                },
                deep: true,
                immediate: true,
            },
        },
        mounted() {},
        methods: {
            getDataFromApi() {
                this.loading = true;
                const { page, itemsPerPage } = this.options;
                axios.get('/admin/api/release-note?page=' + page
                    + '&perPage=' + itemsPerPage
                )
                    .then(response => {
                        this.releaseNotes = response.data.data;
                        this.options.itemsPerPage = response.data.per_page;
                        this.releaseNoteTotal = response.data.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            openDeleteReleaseNote(releaseNoteId) {
                this.dialog = true;
                this.releaseNoteId = releaseNoteId;
            },
            deleteReleaseNote() {
                this.dialog = false;
                 axios.delete('/admin/api/release-note/' + this.releaseNoteId)
                    .then(response => {
                        this.getDataFromApi();
                    })
                    .catch(error => {

                    })
                    .finally(() => {

                    });
            },
        }
    }
</script>
