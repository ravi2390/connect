<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <h3>User Login Information</h3>
                <v-select
                    :items="userTypes"
                    label="User Type"
                    item-value="type"
                    item-title="label"
                    v-model="userType"
                    variant="underlined"
                    :rules="[rules.required]"
                    :error="hasUserTypeError"
                    :error-messages="errors.userType"
                ></v-select>
            </v-col>
        </v-row>
        <v-row justify="space-between">
            <v-col cols="12" md="4">
                <v-form ref="form">
                    <v-text-field
                        v-model="userName"
                        label="User Name"
                        variant="underlined"
                        :error="hasUserNameError"
                        :error-messages="errors.userName"
                    ></v-text-field>
                    <v-text-field
                        v-model="userEmail"
                        label="Email Address"
                        variant="underlined"
                        :error="hasUserEmailError"
                        :error-messages="errors.userEmail"
                    ></v-text-field>
                    <v-text-field
                        v-model="userPassword"
                        label="Password"
                        variant="underlined"
                        :error="hasUserPasswordError"
                        :error-messages="errors.userPassword"
                    ></v-text-field>
                    <v-checkbox
                        v-model="userPasswordReset"
                        label="Require Password Reset"
                    ></v-checkbox>
                </v-form>
            </v-col>
            <v-col cols="12" md="7">
                <v-icon class="avatar" icon="mdi:mdi-account-edit"></v-icon>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="10">
                <h3>Assign Authorizations</h3>
                <authorization-manager-component
                    v-if="userType !== 'staff'"
                    :entity-types="entityTypes"
                    :roles="roles"
                    :authorizations="authorizations"
                    :error="hasAuthorizationsError"
                    :error-messages="errors.authorizations"
                ></authorization-manager-component>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="8" md="4">
                <h3>Associate Individual Record</h3>
                <v-autocomplete
                    :loading="loading"
                    v-model="userAffiliate"
                    item-value="AffiliateId"
                    item-title="display_name"
                    :items="affiliates"
                    label="Affiliate"
                    variant="underlined"
                    no-data-text="Enter text to search..."
                    return-object
                    :error="noEntityError"
                    required
                    @update:search="onSearch"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" md="2">
                <v-checkbox
                        v-model="affiliateParentFilter"
                        label="Search individual for selected affiliate"
                ></v-checkbox>
            </v-col>
        </v-row>
        <v-row v-if="!editIndividual">
            <v-col cols="12" sm="4" md="4">
                <v-text-field
                    readonly
                    v-model="individualName"
                    variant="underlined"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <v-btn @click="enableEditIndividual">Change</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="editIndividual">
            <v-col cols="12" sm="8" md="4">
                <IndividualAutocomplete
                    v-model="userIndividual"
                    :individual="user.individual"
                    :rules="[rules.required]"
                    v-bind:affiliateId="this.affiliateId"
                    v-bind:affiliateParentFilter="this.affiliateParentFilter"
                    filter="current"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <h3>Set User Abilities</h3>
                <user-ability-manager-component
                    v-model="userAbilities"
                    :userId="userId"
                />
            </v-col>
        </v-row>
        <v-row class="mt-8">
            <v-col cols="12" class="d-flex ga-4">
                <v-btn size="large" color="red" :to="{ name: 'userList' }">Cancel</v-btn>
                <v-btn size="large" color="green" @click="editUser">Save Changes</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { debounce } from "lodash-es";
import AuthorizationManagerComponent from "../Common/AuthorizationManagerComponent.vue";
import IndividualAutocomplete from "../Common/IndividualAutocomplete";
import UserAbilityManagerComponent from "../Common/UserAbilityManagerComponent.vue";

    export default {
        name: 'UserEditComponent',
        components: { AuthorizationManagerComponent, IndividualAutocomplete, UserAbilityManagerComponent },
        data: () => ({
            loading: false,
            userId: null,
            userName: null,
            userEmail: null,
            userPassword: null,
            userIndividual: null,
            userPasswordReset: null,
            AffiliateName: null,
            individualName: null,
            entityTypes: [],
            roles: [],
            authorizations: [],
            errors: {},
            affiliateId: 0,
            individual: {},
            user: {},
            editMode: true,
            editIndividual: false,
            userAffiliate: null,
            userType: null,
            userTypes: [
                { type: 'user', label: 'Connect User' },
                { type: 'staff', label: 'Staff Portal User' },
                { type: 'admin', label: 'Connect Site Administrator' },
            ],
            userAbilities: [],
            searchText: null,
            affiliates: [],
            noEntityError: false,
            affiliateParentFilter: false,
            rules: {
                required: value => !!value || 'Required.'
            }
        }),
        computed: {
            hasUserNameError: function() { return this.errors && this.errors.hasOwnProperty('userName'); },
            hasUserEmailError: function() { return this.errors && this.errors.hasOwnProperty('userEmail'); },
            hasUserPasswordError: function() { return this.errors && this.errors.hasOwnProperty('userPassword'); },
            hasAuthorizationsError: function() { return this.errors && this.errors.hasOwnProperty('authorizations'); },
            hasUserTypeError: function() { return this.errors && this.errors.hasOwnProperty('userType'); }
        },
        beforeMount() {
            this.getUser(this.$route.params.id);
        },
        watch: {
            userName: function() { this.errors.userName = null; },
            userEmail: function() { this.errors.userEmail = null; },
            userPassword: function() { this.errors.userPassword = null; },
            authorizations: function() { this.errors.authorizations = null; },
            userType: function() { this.errors.userType = null; },
            'userAffiliate': {
                handler(value) {
                    if (value){
                        this.affiliateId = value.AffiliateId;
                    }
                },
            },
            'individual': {
                handler(value) {
                    if (value){
                        this.individualName = value.FirstName;
                        this.individualName = value.FirstName + ' ' + value.LastName;
                        if (value.individualMembers && value.individualMembers.length > 0) {
                            this.individualName += ' (' + value.individualMembers[0].MemberId + ')';
                        }
                        if (value.individualAffiliates && value.individualAffiliates.length > 0) {
                            this.individualName += ' (';
                            var affiliates = "";
                            value.individualAffiliates.forEach((key, individualAffiliate) => {
                                if (individualAffiliate.Affiliate) {
                                    if (key==value.individualAffiliates.length-1) {
                                        affiliates += individualAffiliate.Affiliate.AffiliateNumber;
                                    } else {
                                        affiliates += individualAffiliate.Affiliate.AffiliateNumber + ' ,';
                                    }
                                }
                            });
                            this.individualName += affiliates+ ')';
                        }
                    }
                },
            }
        },
        methods: {
            getUser(userId) {
                this.loading = true;
                axios.get('/admin/api/user/' + userId)
                    .then(response => {
                        let self = this;
                        this.userId = response.data.id;
                        this.userName = response.data.name;
                        this.userEmail = response.data.email;
                        this.user = response.data;
                        this.userType = response.data.type;
                        this.userIndividual = response.data.individual_id;
                        this.individual = response.data.individual;
                        this.AffiliateName = response.data.AffiliateName;
                        this.entityTypes = response.data.options.entityTypes;
                        this.roles = response.data.options.roles;
                        this.affiliateId = response.data.AffiliateId;
                        this.loadAffiliateSearch(this.AffiliateName,response.data.Affiliate);
                        response.data.authorizations.forEach(function(auth) {
                            let entityTypeId = -1;
                            self.entityTypes.forEach(function(item, index) {
                                if (item.type === auth.entity_type) {
                                    entityTypeId = index;
                                }
                            });
                            self.authorizations.push({
                                order: auth.order,
                                entityTypeId: entityTypeId,
                                entityTypeName: auth.entity_type,
                                entityId: auth.entity_id,
                                entity: auth.entity_id === 0 ? { display_name: 'Global Access' } : auth.entity,
                                role: auth.role,
                                inherit: auth.entity_inherit === '1' ? true:false,
                                childCount: null,
                            });
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            editUser() {
                const savedata = {
                    userId: this.userId,
                    userName: this.userName,
                    userEmail: this.userEmail,
                    userPassword: this.userPassword,
                    userPasswordReset: !!this.userPasswordReset,
                    userIndividual: this.userIndividual,
                    authorizations: this.authorizations,
                    userType: this.userType,
                    userAbilities: this.userAbilities,
                }
                axios.put('/admin/api/user/' + this.userId, savedata)
                    .then(response => {
                        this.$router.replace({ name: 'userList' })
                    })
                    .catch(error => {
                        console.log(error.response.data.errors);
                        this.errors = error.response.data.errors;
                    })
                    .finally(() => {
                    });
            },
            affiliateSearch: debounce(function(search) {
                if (!search) { return; }
                if (this.userAffiliate && this.userAffiliate.display_name === search) { return; }
                this.loading = true;
                axios.post('/admin/api/affiliate/search', {search: search})
                    .then(response => {
                        this.affiliates = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }, 500),
            loadAffiliateSearch(search,affiliate) {
                if (!search) { return; }
                this.loading = true;
                axios.post('/admin/api/affiliate/search', {search: search})
                    .then(response => {
                        this.affiliates = response.data.data;
                        this.userAffiliate = response.data.data[0];
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            enableEditIndividual() {
                this.editIndividual = true;
            },
            onSearch(search) {
                this.noEntityError = false;
                this.affiliateSearch(search);
            },
        }
    }
</script>
<style scoped>
    .avatar::before {
        color: #092a5c;
        font-size: 200px;
    }
</style>
