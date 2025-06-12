<template>
    <v-app id="memberforms">
        <v-app-bar
            color="primary"
            :height="showMobileNav ? 140 : 76"
        >
            <div class="logo-mobile mt-3" v-if="!showMobileNav">
                <router-link to="/" class="navbar-brand">
                    <img
                        :src="logoAft"
                        style="max-height: 42px;"
                    >
                </router-link>
            </div>
            <v-spacer v-if="!showMobileNav" />
            <div class="d-lg-block flex-1-0" :class="showMobileNav ? 'd-block' : 'd-none'" :style="$vuetify.display.lgAndUp ? 'max-width: 400px;' : ''">
                <AffiliateSelectorComponent :affiliate="affiliate" @selected="selectAffiliate" />
                <div class="mobile-nav-btns hidden-lg-and-up d-flex justify-center ga-4">
                    <v-btn
                        href="/"
                        variant="elevated"
                        color="#f5f5f5"
                        size="small"
                    >
                        Back to Connect
                    </v-btn>
                    <v-btn
                        variant="elevated"
                        color="#f5f5f5"
                        @click="logout()"
                        size="small"
                    >
                        Logout
                    </v-btn>
                    <form
                        id="logout-form2"
                        action="/logout"
                        method="POST"
                        class="d-none"
                    >
                        @csrf
                    </form>
                </div>
            </div>
            <v-btn
                class="click-me d-lg-none"
                color="white"
                @click="isShow = !isShow"
                icon="mdi:mdi-tune-variant"
            >
                <v-icon color="#fff" size="x-large" />
            </v-btn>
            <div class="header-btns d-none d-lg-block">
                <v-menu>
                    <template #activator="{ props }">
                        <v-btn
                            size="small"
                            class="menu-icons"
                            icon="mdi:mdi-backburger"
                            v-bind="props"
                            variant="flat"
                            color="#619FD1"
                        >
                            <v-icon color="#fff" size="x-large" />
                        </v-btn>
                    </template>
                    <v-list class="mfp-member-nav">
                        <v-list-item>
                            <v-list-item-title>
                                <a href="/">
                                    Back to Connect
                                </a>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="logout()">
                            <v-list-item-title>
                                <span> Logout </span>
                            </v-list-item-title>
                            <form
                                id="logout-form2"
                                action="/logout"
                                method="POST"
                                class="d-none"
                            >
                                @csrf
                            </form>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-app-bar>
        <v-main class="main-content">
            <Navigation
                title="Menu"
                :shown="mainDrawer"
                :items="$router.options.routes"
                :member-form-assign-type="memberFormAssignType"
            />
            <v-divider
                vertical
                class="main-divider"
            />
            <router-view />
        </v-main>
        <FooterComponent />
        <v-dialog
            v-model="dialog"
            max-width="290"
        >
          <v-card>
            <v-card-title class="text-h5">
              Changing Affiliate?
            </v-card-title>

            <v-card-text>
              By selecting this affiliate you will lose any changes made to
              an existing form. Are you sure?
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                  color="green-darken-1"
                  variant="text"
                  @click="cancelSelectedAffiliate()"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="green-darken-1"
                  variant="text"
                  @click="setSelectedAffiliate()"
              >
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import logoAft from '../../../../../public/images/logos/mfp-logo-small.png';
import FooterComponent from '../../../../../resources/js/components/Common/FooterComponent.vue';
import api from './api/private';
import Navigation from './src/private/components/nav/Navigation.vue';
import AffiliateSelectorComponent from "../../../../../resources/js/components/Common/AffiliateSelectorComponent.vue";

export default {
    name: 'PrivateApp',
    components: {
        AffiliateSelectorComponent,
        Navigation,
        FooterComponent,
    },
    data: () => ({
        mainDrawer: true,
        dialog: false,
        isShow: false,
        memberFormAssignType: null,
        logoAft,
        affiliate: null,
    }),
    computed: {
        selectedAffiliate() {
            const affiliate = this.$store.getters['user/selectedAffiliate'] || null;
            this.affiliate = affiliate;
            return affiliate;
        },
        showMobileNav() {
            return this.isShow && this.$vuetify.display.mdAndDown;
        }
    },
    beforeMount() {
        this.getMemberFormAssignType();
    },
    methods: {
        logout() {
            document.getElementById('logout-form2').submit();
        },
        selectAffiliate(affiliateId) {
            if (affiliateId > 0) {
                this.selectedAffiliateId = affiliateId;
                if (this.isFormWorkInProgress()) {
                    this.dialog = true;
                } else {
                    // window.location.reload();
                    this.setSelectedAffiliate();
                }
            } else {
                this.$nextTick(() => {
                    this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
                });
            }
        },
        setSelectedAffiliate() {
            this.dialog = false;
            localStorage.mfpAffiliateId = this.selectedAffiliateId;
            localStorage.formBuilderActiveTemplate = JSON.stringify({});
            this.$store.dispatch('user/setUserSelectedEntity', this.selectedAffiliateId).then(() => {
                if (window.location.href.endsWith('edit')) {
                    this.$router.push({ path: 'manage' });
                } else {
                    window.location.reload();
                }
            });
        },
        cancelSelectedAffiliate() {
            this.dialog = false;
            this.selectedAffiliateId = localStorage.mfpAffiliateId;
            window.location.reload();
        },
        getMemberFormAssignType() {
            this.loading = true;
            this.affiliateId = this.selectedAffiliate
                ? this.selectedAffiliate.AffiliateId : null;
            api.getMemberFormAssign(this.affiliateId)
                .then((response) => {
                    const memberFormAssign = response.data;
                    if (memberFormAssign) {
                        this.memberFormAssignType = memberFormAssign.type;
                        console.log(this.memberFormAssignType);
                    }
                    this.loading = false;
                });
        },
        isFormWorkInProgress() {
            const url = new URL(window.location.href);
            const isExpectedFormRoute = (url.pathname.endsWith('create') || url.pathname.endsWith('edit'));
            const localStorageActiveTemplate = localStorage.formBuilderActiveTemplate
                ? JSON.parse(localStorage.formBuilderActiveTemplate) : null;
            return (isExpectedFormRoute && localStorageActiveTemplate && localStorageActiveTemplate.step > 1);
        },
    },
};
</script>

<style lang="scss">
.main-content {
    border-left: 1px solid rgba(0,0,0,.12);
}
.main-divider {
    position: absolute;
}
.navbar-brand {
    padding-top: 10px;
    margin-right: 7px;
}
.mfp-member-nav {
    .v-list-item.v-list-item--link.theme--light {
        margin-left: 0;
    }
}
.v-application a,
.v-application .mfp-member-nav span {
    color: #092a5c;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
}
.v-toolbar__content {
    padding: 12px 16px 4px 16px;
    align-items: start;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 4px solid #3f98c9;
}
</style>
