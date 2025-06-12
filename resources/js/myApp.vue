<template>
<v-app>
    <HeaderComponent />
    <main class="py-4" :class="{'mt-12': $vuetify.display.mdAndUp}" id="main-container">
        <router-view></router-view>
        <v-dialog
            v-model="dialogSessionTimeout"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Session Timed Out
                </v-card-title>
                <v-card-text>
                    Your session has timed out due to inactivity. Please login to continue.
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="primary-darken-1"
                        variant="text"
                        @click="gotoLogin()"
                    >
                        Login
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </main>
    <FooterComponent />
</v-app>
</template>

<script>
    import HeaderComponent from "./components/Common/HeaderComponent";
    import FooterComponent from "./components/Common/FooterComponent";

    export default {
        name: "App",
        components: {
            HeaderComponent,
            FooterComponent,
        },
        data: () => ({
            dialogSessionTimeout: false,
        }),
        created: function () {
            const token = document.head.querySelector('meta[name="csrf-token"]');
            if (!token) {
                window.location = '/login';
                return;
            }

            window.axios.interceptors.response.use(null, (error) => {
                if(error.response && error.response.status == 401) {
                    this.dialogSessionTimeout = true;
                    return;
                }
                return Promise.reject(error);
            });

            const me = this;
            window.axios.interceptors.request.use(function (config) {
                const affiliate = me.$store.getters['user/selectedAffiliate'];
                if (affiliate && window.scope  === 'affiliate' && typeof affiliate.AffiliateId !== 'undefined' && config.url.indexOf('scope=global') === -1) {
                    config.url += (config.url.indexOf('?') > 0 ? '&' : '?') + 'affiliates=' + affiliate.AffiliateId;
                }
                return config;
            });
        },
        methods: {
            gotoLogin() {
                window.location = '/login';
            }
        },
    };
</script>

<style></style>
