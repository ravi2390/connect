<template>
    <div>
        <v-toolbar dark class="main-menu hidden-md-and-down" id="main-header-menu">
            <v-container class="d-flex">
                <v-toolbar-title>
                    <a class="navbar-brand" href="/">
                        <img src="/images/logos/AFTConnectLogo.png"/>
                    </a>
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-container>
        </v-toolbar>

        <div class="hidden-lg-and-up">
            <v-app-bar color="primary" class="mobile-app-bar">
                <v-toolbar-title align="center">
                    <a class="navbar-brand" href="/">
                        <img class="mobile-logo" src="/images/logos/AFTConnectLogo.png"/>
                    </a>
                </v-toolbar-title>

                <v-spacer></v-spacer>
            </v-app-bar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PublicHeaderComponent"
    };
</script>
