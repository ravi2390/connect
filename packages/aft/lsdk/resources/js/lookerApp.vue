<template>
    <v-app id="looker-app">
        <v-app-bar app dense>
            <v-app-bar-title>
                <v-icon>{{ $route.meta.icon }}</v-icon> 
                {{ $route.meta.displayName }}
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn href="/">
                    <v-icon left>mdi-home</v-icon>
                    Back to Connect
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

        <!-- <footer-component></footer-component> -->
    </v-app>
</template>

<script>
export default {
    name: 'LookerApp',
}
</script>