<template>
    <v-app>
        <v-app-bar density="compact">
        <v-container class="d-flex ga-2 align-center">
            <v-app-bar-nav-icon @click.stop="drawer=!drawer" />
            <v-app-bar-title><v-icon :icon="currentRoute.meta.icon" /> {{ currentRoute.meta.displayName }}</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="pr-4">
                <v-btn href="/" prepend-icon="mdi:mdi-home">
                    Back to Connect
                </v-btn>
            </v-toolbar-items>
        </v-container>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer">
            <v-list density="compact">
              <template v-for="route in routes" :key="route.path">
                <v-list-item :to="route.path" link :prepend-icon="route.meta.icon">
                  <v-list-item-title>{{ route.meta.displayName }}</v-list-item-title>
                </v-list-item>
                <v-divider v-if="route.divider"></v-divider>
              </template>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>

        <footer-component></footer-component>
    </v-app>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import FooterComponent from "./components/Common/FooterComponent.vue";

    export default {
        components: {
            FooterComponent,
        },
        setup() {
            const drawer = ref(true);;
            const currentRoute = useRoute();
            const router = useRouter();
            const routes = router.options.routes;
            return {
                drawer,
                currentRoute,
                routes,
            };
        },
    }
</script>
