<template>
    <v-app class="app-public">
        <v-main>
            <v-container
                fluid
                class="fill-height"
            >
                <v-row class="justify-center">
                    <v-col cols="12" sm="8">
                        <router-view />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'PublicApp',
};
</script>

<style lang="scss" scoped>
    .aftLogo {
        margin: 30px;
        z-index: 1;

        img {
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
