<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="3">
                <v-text-field
                    v-model="searchUserNameValue"
                    label="Search by User Name"
                    clearable
                    variant="underlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
                <v-text-field
                    v-model="searchUserEmailValue"
                    label="Search by Email Address"
                    variant="underlined"
                    clearable
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
                <v-select
                    :items="userStatus"
                    label="User Status"
                    item-value="type"
                    item-title="label"
                    v-model="searchUserStatusValue"
                    variant="underlined"
                ></v-select>
            </v-col>

            <v-col cols="12" sm="3">
                <v-btn class="mt-2" color="#4caf50" :to="{ name: 'userCreate' }" prepend-icon="mdi:mdi-account-plus">
                    Create User
                </v-btn>
                <v-btn class="mt-2" color="red" @click="exportUser" prepend-icon="mdi:mdi-account-arrow-right">
                    Export User List
                </v-btn>
            </v-col>

        </v-row>

        <v-row>
            <v-col cols="12">
                <v-data-table-server
                    v-model:options="options"
                    :loading="loading"
                    :headers="headers"
                    :items="users"
                    :item-key="users.id"
                    :items-length="userTotal"
                    disable-sort
                    @update:options="getDataFromApi"
                >
                    <template v-slot:[`item.edit`]="{ item }">
                        <v-btn variant="text" icon="mdi:mdi-account-edit" color="primary" :to="{ name: 'userEdit', params: { id: item.id }}"></v-btn>
                    </template>

                    <template v-slot:[`item.authorizations`]="{ item }">
                        <div v-if="item.type === 'staff'">
                            <em>Staff Portal User</em>
                        </div>
                        <div v-else>
                            <div v-for="auth in item.authorizations" :key="auth.id">
                                <template v-if="auth.entity_id === 0">
                                    {{ auth.role.name }}: Global {{ auth.entity_type.substring(auth.entity_type.lastIndexOf('\\') + 1) }}
                                </template>
                                <template v-else>
                                    <span v-if="auth.entity">
                                        {{ auth.role.name }}:
                                        {{ auth.entity.label }} {{ auth.entity.display_name }}
                                    </span>
                                </template>
                            </div>
                        </div>
                    </template>

                    <template v-slot:[`item.last_login_at`]="{ item }">
                        {{ formatLastLogin(item.last_login_at) }}
                    </template>

                    <template v-slot:[`item.delete`]="{ item }">
                        <v-btn v-if="!item.DeletedAt" variant="text" icon="mdi:mdi-delete" color="red" @click="openDeleteUser(item.id)"></v-btn>
                        <v-btn v-if="item.DeletedAt" variant="text" icon="mdi:mdi-reload" color="green" @click="openRestoreUser(item.id)"></v-btn>
                    </template>

                </v-data-table-server>
            </v-col>
        </v-row>
        <v-dialog v-model="dialogDelete" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h5">Are you sure?</v-card-title>
                <v-card-text>This record will be deleted.</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn color="red-darken-1" variant="text" @click="dialogDelete = false">NO</v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="deleteUser">YES</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogRestore" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h5">Are you sure?</v-card-title>
                <v-card-text>Do you want to restore this user?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn color="red-darken-1" variant="text" @click="dialogRestore = false">NO</v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="restoreUser">YES</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <loading-component :loading="loading"></loading-component>
    </v-container>
</template>

<script>
    import { debounce } from "lodash-es";
    import { format } from "date-fns";
    import LoadingComponent from "../Common/LoadingComponent.vue";

    export default {
        name: 'UserListComponent',
        components: { LoadingComponent },
        data: () => ({
            loading: false,
            headers: [
                { title: 'Edit', value: 'edit' },
                { title: 'Name', value: 'name' },
                { title: 'Email', value: 'email' },
                { title: 'Access', value: 'authorizations' },
                { title: 'Last Login', value: 'last_login_at' },
                { title: 'Created', value: 'CreatedAt' },
                { title: 'Updated', value: 'UpdatedAt' },
                { title: 'Delete', value: 'delete' },
            ],
            options: {
                page: 1,
                itemsPerPage: 15,
            },
            users: [],
            userTotal: 0,
            searchUserNameValue: null,
            searchUserEmailValue: null,
            searchUserStatusValue: 'active',
            dialogDelete: false,
            dialogRestore: false,
            userId: null,
            userStatus: [
                { 'type': 'active', 'label': 'Active' },
                { 'type': 'deleted', 'label': 'Deleted' }
            ]
        }),
        watch: {
            searchUserNameValue: function(value) { this.searchUserName(value); },
            searchUserEmailValue: function(value) { this.searchUserEmail(value); },
            searchUserStatusValue: function(value) { this.searchUserStatus(value); },
        },
        mounted() {
            this.getDataFromApi();
        },
        methods: {
            searchUserName: debounce(function(search) {
                this.getDataFromApi();
            }, 500),
            searchUserEmail: debounce(function(search) {
                this.getDataFromApi();
            }, 500),
            searchUserStatus: debounce(function(search) {
                this.getDataFromApi();
            }, 500),
            getDataFromApi() {
                this.loading = true;
                const { page, itemsPerPage } = this.options;
                const userName = this.searchUserNameValue || '';
                const userEmail = this.searchUserEmailValue || '';
                const userStatus = this.searchUserStatusValue || '';
                axios.get('/admin/api/user?page=' + page
                    + '&perPage=' + itemsPerPage
                    + '&filterUserName=' + userName
                    + '&filterUserEmail=' + userEmail
                    + '&filterUserStatus=' + userStatus
                )
                    .then(response => {
                        this.users = response.data.data;
                        this.options.itemsPerPage = response.data.meta.per_page;
                        this.userTotal = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            openDeleteUser(userId) {
                this.dialogDelete = true;
                this.userId = userId;
            },
            openRestoreUser(userId) {
                this.dialogRestore = true;
                this.userId = userId;
            },
            deleteUser() {
                this.dialogDelete = false;
                 axios.delete('/admin/api/user/' + this.userId)
                    .then(response => {
                        this.getDataFromApi();
                    })
                    .catch(error => {

                    })
                    .finally(() => {

                    });
            },
            exportUser() {
                this.loading = true;
                axios.request({ url: '/admin/api/user/export', method: 'GET', responseType: 'blob' })
                    .then((response) => {
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
            restoreUser() {
                this.dialogRestore = false;
                 axios.get('/admin/api/user/restore/' + this.userId)
                    .then(response => {
                        this.getDataFromApi();
                    })
                    .catch(error => {

                    })
                    .finally(() => {

                    });
            },
            formatLastLogin(date) {
                return date ? format(date, 'MMMM do yyyy, h:mm a') : 'never';
            }
        }
    }
</script>

<style scoped>
    .user-btn {
        width: 200px !important;
    }
</style>
