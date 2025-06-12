<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-btn color="#4caf50" :to="{ name: 'contentBlockCreate' }">
                    Create Content Block
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table-server
                    v-model:options="options"
                    :loading="loading"
                    :headers="headers"
                    :items="contentblocks"
                    :item-key="contentblocks.id"
                    :items-length="contentBlockTotal"
                    disable-sort
                >
                    <template v-slot:[`item.url`]="{ item }">
                        <a :href="item.url">{{ item.url }}</a>
                    </template>
                    <template v-slot:[`item.sticky`]="{ item }">
                            <span v-if="item.sticky == 1">
                                Yes
                            </span>
                            <span v-if="item.sticky == 0">
                                No
                            </span>
                    </template>
                    <template v-slot:[`item.is_active`]="{ item }">
                            <span v-if="item.is_active == 1">
                                Yes
                            </span>
                            <span v-if="item.is_active == 0">
                                No
                            </span>
                    </template>
                    <template v-slot:[`item.edit`]="{ item }">
                        <v-btn icon="mdi:mdi-comment-edit" color="primary" variant="text" :to="{ name: 'contentBlockEdit', params: { id: item.id }}"></v-btn>
                    </template>

                    <template v-slot:[`item.delete`]="{ item }">
                        <v-btn icon="mdi:mdi-delete" color="red" variant="text" @click="openDeleteContentBlock(item.id)"></v-btn>
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
                <v-btn color="green-darken-1" variant="text" @click="deleteContentBlock">YES</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: 'ContentBlockListComponent',
        data: () => ({
            loading: false,
            headers: [
                { title: 'Edit', value: 'edit' },
                { title: 'Title', value: 'title' },
                { title: 'URL', value: 'url' },
                { title: 'Sticky', value: 'sticky' },
                { title: 'Application', value: 'application' },
                { title: 'Priority', value: 'priority' },
                { title: 'Published', value: 'is_active' },
                { title: 'Created', value: 'created_at' },
                { title: 'Updated', value: 'updated_at' },
                { title: 'Delete', value: 'delete' },
            ],
            options: {
                page: 1,
                itemsPerPage: 15,
            },
            contentblocks: [],
            contentBlockTotal: 0,
            dialog: false,
            contentblockId:null,
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
                axios.get('/admin/api/content-block?page=' + page
                    + '&perPage=' + itemsPerPage
                )
                    .then(response => {
                      console.log({ data: response.data })
                        this.contentblocks = response.data.data;
                        this.options.itemsPerPage = response.data.per_page;
                        this.contentBlockTotal = response.data.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            openDeleteContentBlock(contentblockId) {
                this.dialog = true;
                this.contentblockId = contentblockId;
            },
            deleteContentBlock() {
                this.dialog = false;
                 axios.delete('/admin/api/content-block/' + this.contentblockId)
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
