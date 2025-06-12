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
                <v-icon icon="mdi:mdi-account-plus" class="avatar"></v-icon>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="10">
                <h3>Assign Authorizations</h3>
                <authorization-manager-component
                    v-if="userType !== 'staff'"
                    :entity-types="entityTypes"
                    :roles="roles"
                    v-model:authorizations="authorizations"
                    :error="hasAuthorizationsError"
                    :error-messages="errors.authorizations"
                ></authorization-manager-component>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="8" md="4">
                <h3>Associate Individual Record</h3>
                <v-autocomplete
                    v-model:search="searchText"
                    :loading="loading"
                    v-model="userAffiliate"
                    item-value="AffiliateId"
                    item-title="display_name"
                    :items="affiliates"
                    variant="underlined"
                    label="Affiliate"
                    no-data-text="Enter text to search..."
                    return-object
                    :error="noEntityError"
                    required
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" md="2">
                <v-checkbox
                        v-model="affiliateParentFilter"
                        label="Search individual for selected affiliate"
                ></v-checkbox>
                </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="8" md="4">
                <IndividualAutocomplete
                    v-model="userIndividual"
                    :individual="individual"
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
        <v-row class="mt-4">
            <v-col cols="12" class="d-flex ga-4">
                <v-btn size="large" class="bg-red" :to="{ name: 'userList' }">Cancel</v-btn>
                <v-btn size="large" color="#4caf50" @click="createUser">Create User</v-btn>
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
        name: 'UserCreateComponent',
        components: { AuthorizationManagerComponent, IndividualAutocomplete, UserAbilityManagerComponent },
        data: () => ({
            loading: false,
            userName: null,
            userEmail: null,
            userPassword: null,
            userPasswordReset: null,
            userIndividual: null,
            entityTypes: [],
            roles: [],
            authorizations: [],
            errors: {},
            affiliateId: 0,
            individual: {},
            rules: {
                required: value => !!value || 'Required.'
            },
            searchText: null,
            affiliates: [],
            noEntityError: false,
            userAffiliate: null,
            userType: null,
            userTypes: [
                { type: 'user', label: 'Connect User' },
                { type: 'staff', label: 'Staff Portal User' },
                { type: 'admin', label: 'Connect Site Administrator' },
            ],
            userAbilities: [],
            userId: null,
            affiliateParentFilter: false,
        }),
        computed: {
            hasUserNameError: function() { return this.errors && this.errors.hasOwnProperty('userName'); },
            hasUserEmailError: function() { return this.errors && this.errors.hasOwnProperty('userEmail'); },
            hasUserPasswordError: function() { return this.errors && this.errors.hasOwnProperty('userPassword'); },
            hasAuthorizationsError: function() { return this.errors && this.errors.hasOwnProperty('authorizations'); },
            hasUserTypeError: function() { return this.errors && this.errors.hasOwnProperty('userType'); },
        },
        watch: {
            userName: function() { this.errors.userName = null; },
            userEmail: function() { this.errors.userEmail = null; },
            userPassword: function() { this.errors.userPassword = null; },
            authorizations: function() { this.errors.authorizations = null; },
            userType: function() { this.errors.userType = null; },
            'searchText': {
                handler(value) {
                    this.noEntityError = false;
                    this.affiliateSearch(value)
                },
            },
            'userAffiliate': {
                handler(value) {
                    this.affiliateId = value.AffiliateId;
                },
            },
        },
        mounted() {
            this.getOptions();
        },
        methods: {
            getOptions() {
                this.loading = true;
                axios.get('/admin/api/user/options')
                    .then(response => {
                        this.entityTypes = response.data.entityTypes;
                        this.roles = response.data.roles;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            createUser() {
                axios.post('/admin/api/user', {
                    userName: this.userName,
                    userEmail: this.userEmail,
                    userPassword: this.userPassword,
                    userPasswordReset: !!this.userPasswordReset,
                    userIndividual: this.userIndividual,
                    authorizations: this.authorizations,
                    userType: this.userType
                })
                    .then(response => {
                        this.$router.replace({ name: 'userEdit', params: { id: response.data.user } })
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
        }
    }
</script>

<style scoped>
    .avatar::before {
        color: #4caf50;
        font-size: 200px;
    }
</style>
