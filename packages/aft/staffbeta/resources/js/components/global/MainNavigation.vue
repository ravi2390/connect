<template>
    <v-app-bar color="primary" class="navbar-expand-md fixed-top navbar-dark">
        <v-container class="d-flex ga-2 align-center">
            <router-link to="/" class="navbar-brand">
                <img
                    src="/images/logos/aft-small.png"
                    alt="AFT Staff Portal"
                />
                AFT Staff Portal
            </router-link>
            <div id="navbarCollapse" class="collapse navbar-collapse text-nowrap">
                <ul class="navbar-nav d-md-flex" v-if="$vuetify.display.mdAndUp">
                    <li
                        v-for="route in visibleRoutes" :key="route.path"
                        :ref="'nav-' + route.meta.ability"
                        class="nav-item"
                    >
                        <router-link
                            class="nav-link mx-2"
                            exact-active-class="active"
                            :to="route"
                        >
                            {{ route.meta.displayName }}
                        </router-link>
                    </li>
                </ul>
            </div>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" variant="text" @click.stop="drawerOpen = !drawerOpen"></v-app-bar-nav-icon>
            <v-menu v-if="$vuetify.display.mdAndUp">
                <template #activator="{ props }">
                    <v-btn v-bind="props" variant="plain" append-icon="fa-caret-down" color="white">
                        {{ user.name }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="logout()">
                        Logout
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="showMenu">
        <v-list>
            <v-list-item
                v-for="route in visibleRoutes"
                :key="route.path"
                :to="route"
                link
            >
                <v-list-item-title>
                    {{ route.meta.displayName }}
                </v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title @click="logout">
                    Logout
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <form id="logout-form" action="/logout" method="POST" class="d-none">
        @csrf
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MainNavigation',
    data() {
        return {
            user: {
                name: 'Username',
            },
            userAbilities: [],
            routes: this.$router.options.routes,
            drawerOpen: false,
            visibleRoutes: [],
        }
    },
    created() {
        this.getUser()
            .then(() => {
                this.$router.options.routes.forEach((route) => {
                    if (this.userAbilities.includes(route.meta.ability)) {
                        // this.$refs[`nav-${route.meta.ability}`][0].classList.remove('nav-hidden');
                        route.meta.hidden = false;
                        console.log('unhidden', { route })
                    }
                    // @todo: does route ever have 'abilities' ?
                    if (route.abilities) {
                        route.abilities.forEach((ability) => {
                            if (this.userAbilities.includes(ability)) {
                                // this.$refs[`nav-${route.meta.ability}`][0].classList.remove('nav-hidden');
                                route.meta.hidden = false;
                            }
                        });
                    }
                });
                this.visibleRoutes = this.$router.options.routes.filter((route) => !route.meta.hidden);
            });
    },
    computed: {
        showMenu() {
            return this.drawerOpen && this.$vuetify.display.smAndDown;
        },
    },
    methods: {
        getUser() {
            return axios.get('/api/v2/user')
                .then((response) => {
                    this.user = response.data.data;
                    this.userAbilities = this.user.AuthUserAbilities
                        .map((ability) => ability?.AuthAbility?.type)
                        .filter((ability) => ability);
                });
        },
        logout() {
            document.getElementById('logout-form').submit();
        },
    },
    mounted() {
        this.visibleRoutes = this.$router.options.routes.filter((route) => !route.meta.hidden);
    },
};
</script>

<style scoped>
    #logo-small {
        height: 1.5rem;
    }
    .nav-hidden {
        display: none;
    }
</style>
