<template>
    <div>
        <v-data-table
            :loading="loading"
            :headers="headers"
            :items="authorizations"
            :item-key="authorizations.order"
            disable-sort
            hide-default-footer
            class="elevation-1"
            no-data-text="No Authorizations"
        >

            <template v-slot:[`item.entityTypeId`]="{ item }">
                {{ entityTypes[item.entityTypeId].info.label }}
            </template>

            <template v-slot:[`item.entityId`]="{ item }">
                <span v-if="item.entity">
                    {{ item.entity.display_name }}
                </span>
            </template>

            <template v-slot:[`item.role`]="{ item }">
                {{ item.role.name }}
            </template>

            <template v-slot:[`item.inherit`]="{ item }">
                <v-checkbox-btn v-model="item.inherit" disabled></v-checkbox-btn>
            </template>

            <template v-slot:[`item.delete`]="{ item }">
                <v-btn icon="mdi:mdi-delete" color="red" variant="text" @click="authorizationRemoveShow(item)"></v-btn>
            </template>

        </v-data-table>

        <div v-if="error">
            <v-alert v-for="error in errorMessages" :key="error.id" density="compact" type="error">
                {{ error }}
            </v-alert>
        </div>

        <v-dialog v-model="authorizationRemoveModal" persistent max-width="400px">
            <v-card>
                <v-card-title class="text-h5">Delete Authorization?</v-card-title>
                <v-card-text>Are you sure you want to remove this authorization?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" @click="authorizationRemoveCancel" variant="elevated">Cancel</v-btn>
                    <v-btn color="red" @click="authorizationRemove" variant="elevated">Remove Authorization</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="authorizationAddModal" persistent max-width="600px">
            <template v-slot:activator="{ props }">
                <v-btn class="mt-4" color="primary" v-bind="props">Add Authorization</v-btn>
            </template>
            <v-form validate-on="submit" @submit.prevent="authorizationAdd">
            <v-card>
                <v-card-title>
                    Add Authorization
                </v-card-title>
                <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <p>Authorization Type</p>
                                    <v-radio-group v-model="addAuth.entityTypeId" :rules="[value => (!!value || value === 0) || 'Required.']">
                                        <v-radio
                                            :label="entity.info.label"
                                            v-for="(entity, index) in entityTypes"
                                            :key="index"
                                            :value="index"
                                            :disabled="entity.disabled"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12">
                                    <v-autocomplete
                                        :loading="addAuth.loading"
                                        v-model="addAuth.entity"
                                        v-model:search="addAuth.searchText"
                                        item-value="AffiliateId"
                                        item-title="display_name"
                                        :items="addAuth.entities"
                                        label="Authorization Target"
                                        variant="underlined"
                                        return-object
                                        no-data-text="Enter text to search..."
                                        :error="noEntityError"
                                        :rules="[value => !!value || 'Required.']"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12">
                                    <v-select
                                        v-model="addAuth.role"
                                        item-value="id"
                                        item-title="name"
                                        :items="roles"
                                        label="Role"
                                        variant="underlined"
                                        return-object
                                        :error="noRoleError"
                                        :rules="[value => !!value || 'Required.']"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-checkbox v-model="addAuth.inherit" label="Inherit"></v-checkbox>
                                    <p>Children: {{ addAuth.childCount }}</p>
                                </v-col>
                            </v-row>
                        </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="authorizationAddCancel" variant="elevated">Cancel</v-btn>
                    <v-btn color="primary" type="submit" variant="elevated">Add Authorization</v-btn>
                </v-card-actions>
            </v-card>
            </v-form>
        </v-dialog>
        <v-dialog v-model="authorizationGlobalConfirmModal" persistent max-width="450px">
            <v-card>
                <v-card-title>Global Access authorization</v-card-title>
                <v-card-text>Global Access authorization requires director approval.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" @click="closeGlobalConfirmBox" variant="elevated">Cancel</v-btn>
                    <v-btn color="red" @click="authorizationGlobalAdd" variant="elevated">Add Global Access</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-btn class="mt-4 ml-4" v-if="isGlobal" color="#4caf50" @click="openGlobalConfirmBox">Add Global Access</v-btn>
    </div>
</template>

<script>
    import { debounce } from "lodash-es";

    export default {
        name: 'AuthorizationManagerComponent',
        props: {
            entityTypes: { type: Array, default: null },
            roles: { type: Array, default: null },
            authorizations: { type: Array, default: null },
            error: { type: Boolean, default: false },
            errorMessages: { type: Array, default: null },
        },
        emits: ['update:authorizations'],
        data: () => ({
            loading: false,
            headers: [
                { title: 'Order', value: 'order' },
                { title: 'Authorization To', value: 'entityTypeId' },
                { title: 'Name', value: 'entityId' },
                { title: 'Role', value: 'role' },
                { title: 'Inherit', value: 'inherit' },
                { title: 'Child Count', value: 'childCount' },
                { title: 'Delete', value: 'delete' },
            ],
            authorizationRemoveModal: false,
            authorizationRemoveTarget: -1,
            authorizationAddModal: false,
            authorizationGlobalConfirmModal: false,
            isGlobal: true,
            addAuth: {
                loading: false,
                searchText: null,
                entities: [],
                entityTypeId: null,
                entityTypeName: null,
                entity: null,
                role: null,
                inherit: false,
                childCount: 0,
            },
            noEntityError: false,
            noRoleError: false,

        }),
        watch: {
            authorizations: {
                handler(auths) {
                    let self = this;
                    self.isGlobal = true;
                    auths.forEach(function(auth) {
                        if (auth.entityId == 0) {
                            self.isGlobal = false;
                        }
                        if (!auth.childCount && auth.entityTypeId == 0) {
                            self.getAffiliateChildCount(auth, auth.entityId);
                        }
                    });
                }
            },
            'addAuth.searchText': {
                handler(value) {
                    this.noEntityError = false;
                    this.affiliateSearch(value)
                },
            },
            'addAuth.role': {
                handler(value) {
                    this.noRoleError = false;
                },
            },
            'addAuth': {
                handler(auth) {
                    if (auth.entity && !auth.childCount) {
                        this.getAffiliateChildCount(auth, auth.entity.AffiliateId);
                    }
                },
            }
        },
        methods: {
            closeGlobalConfirmBox() {
                this.authorizationGlobalConfirmModal = false;
            },
            openGlobalConfirmBox(){
                this.authorizationGlobalConfirmModal = true;
            },
            authorizationRemoveShow(item) {
                this.authorizationRemoveTarget = this.authorizations.indexOf(item);
                this.authorizationRemoveModal = true;
            },
            authorizationRemoveCancel() {
                this.authorizationRemoveModal = false
                this.authorizationRemoveTarget = -1;
            },
            authorizationRemove() {
                this.authorizationRemoveModal = false
                if (this.authorizationRemoveTarget > -1) {
                    const authorizations = [...this.authorizations]
                    authorizations.splice(this.authorizationRemoveTarget, 1);
                    this.$emit('update:authorizations', authorizations);
                }
                this.authorizationRemoveTarget = -1;
                let index = 0;
                this.authorizations.forEach(function (item) {
                    item.order = index++;
                })
            },
            authorizationAddCancel() {
                this.authorizationAddModal = false;
            },
            authorizationGlobalAdd() {
                const authorizations = [...this.authorizations];
                authorizations.push({
                    order: -1,
                    entityTypeId: 0,
                    entityTypeName: this.entityTypes[0].type,
                    entityId: 0,
                    entity: { display_name: 'Global Access' },
                    role: {id: 3,name:"Super Admin"},
                    inherit: true,
                    childCount: 0,
                });
                let index = 0;
                authorizations.forEach(function (item) {
                    item.order = index++;
                })
                this.authorizationAddModal = false;
                this.authorizationGlobalConfirmModal = false;
                this.addAuth = {
                    loading: false,
                    searchText: null,
                    entities: [],
                    entityTypeId: 1,
                    entityTypeName: null,
                    entity: null,
                    role: null,
                    inherit: false,
                    childCount: 0,
                };
                this.$emit('update:authorizations', authorizations);
            },
            async authorizationAdd(event) {
                const results = await event;
                if (!results.valid) {
                    return;
                }
                if (!this.addAuth.entity) {
                    this.noEntityError = true;
                }
                if (!this.addAuth.role) {
                    this.noRoleError = true;
                }
                if (this.noEntityError || this.noRoleError) {
                    return;
                }
                const authorizations = [...this.authorizations];
                authorizations.push({
                    order: -1,
                    entityTypeId: this.addAuth.entityTypeId,
                    entityTypeName: this.entityTypes[this.addAuth.entityTypeId].type,
                    entityId: this.addAuth.entity.AffiliateId,
                    entity: this.addAuth.entity,
                    role: this.addAuth.role,
                    inherit: this.addAuth.inherit,
                    childCount: this.addAuth.childCount,
                });
                let index = 0;
                authorizations.forEach(function (item) {
                    item.order = index++;
                })
                this.authorizationAddModal = false;
                this.addAuth = {
                    loading: false,
                    searchText: null,
                    entities: [],
                    entityTypeId: null,
                    entityTypeName: null,
                    entity: null,
                    role: null,
                    inherit: false,
                    childCount: 0,
                };
                this.$emit('update:authorizations', authorizations);
            },
            affiliateSearch: debounce(function(search) {
                if (!search) { return; }
                if (this.addAuth.entity && this.addAuth.entity.display_name && this.addAuth.entity.display_name === search) { return; }
                this.addAuth.loading = true;
                axios.post('/admin/api/affiliate/search', {search: search})
                    .then(response => {
                        this.addAuth.entities = response.data.data;
                    })
                    .finally(() => {
                        this.addAuth.loading = false;
                    });
            }, 500),
            getAffiliateChildCount(dest, affiliateId) {
                axios.post('/admin/api/affiliate/childCount', { parentId: affiliateId })
                    .then(response => {
                        dest.childCount = response.data;
                    })
                    .finally(() => {

                    });
            },
        },
    }
</script>
