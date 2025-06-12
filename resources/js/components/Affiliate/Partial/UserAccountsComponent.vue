<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            User Accounts
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-data-table
                :loading="loading"
                :headers="headers"
                :items="users"
                :item-key="users.id"
                disable-sort
            >
                <template v-slot:[`item.authorizations`]="{ item }">
                    <div v-for="auth in item.authorizations" :key="auth.entity_id">
                        <template v-if="auth.entity_id === 0">
                            {{ auth.role.name }}: Global {{ auth.entity_type.substring(auth.entity_type.lastIndexOf('\\') + 1) }}
                        </template>
                        <template v-else>
                            <span v-if="auth.entity">
                                {{ auth.role.name }}: {{ auth.entity.label }} {{ auth.entity.display_name }}
                            </span>
                        </template>
                    </div>
                </template>

                <template v-slot:[`item.last_login_at`]="{ item }">
                    {{ $filters.formatDateTime(item.last_login_at) }}
                </template>
                <template v-slot:[`item.memberFormAccess`]="{ item }">
                    <template v-if="item.memberFormAccess">
                        <img
                            src="/images/check.png"
                            alt="yes"
                            style="width: 30px; margin-right: 3px;"
                        />
                    </template>
                    <template v-else>
                        <img
                            src="/images/delete.png"
                            alt="no"
                            style="width: 15px; margin-left: 5px;"
                        />
                    </template>
                </template>
            </v-data-table>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "UserAccountsComponent",

        data: () => ({
            loading: false,
            headers: [
                { title: 'Name', value: 'name' },
                { title: 'Email', value: 'email' },
                { title: 'Access', value: 'authorizations' },
                { title: 'MFP Access', value: 'memberFormAccess' },
                { title: 'Last Login', value: 'last_login_at' },
            ],
            users: [],
            userTotal: 0,
        }),
        mounted() {
            this.id = this.$route.params.id;
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/user/affiliate-user-list')
                    .then(response => {
                        this.users = response.data.data;
                        this.users = this.users.map((user) => {
                            const userAbilities = user.AuthUserAbilities ? user.AuthUserAbilities : []
                            if(userAbilities && userAbilities.length){
                                const memberFormAccess = userAbilities.find(ability => ability?.AuthAbility?.type === 'memberforms');
                                user.memberFormAccess = memberFormAccess ? true : false;
                            } else {
                                user.memberFormAccess = false;
                            }
                            return user;
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            }
        }
    }
</script>

<style scoped>

</style>
