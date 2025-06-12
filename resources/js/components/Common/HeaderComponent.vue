<template>
    <div>
        <v-toolbar color="primary" class="main-menu hidden-md-and-down"  id="main-header-menu">
            <v-container class="d-flex">
                <v-toolbar-title class="d-flex align-center">
                    <a class="navbar-brand" href="/">
                        <img src="/images/logos/AFTConnectLogo.png" />
                    </a>
                </v-toolbar-title>
                <v-toolbar-items class="px-2">
                    <v-btn variant="text" to="/individuals" class="menu-link">Individuals</v-btn>
                    <v-btn variant="text" class="menu-link" to="/units">Units</v-btn>
                    <v-btn
                        variant="text"
                        v-if="selectedAffiliate && selectedAffiliate.hasChapters"
                        class="menu-link"
                        to="/chapters"
                    >
                       Chapters
                    </v-btn>
                    <v-btn variant="text" to="/employers" class="menu-link">Employers</v-btn>
                    <v-btn variant="text" to="/affiliate" class="menu-link">Affiliate</v-btn>
                    <v-btn variant="text" to="/reports" class="menu-link">Reports</v-btn>
                    <v-btn variant="text" v-if="hasEdues" to="/edues" class="menu-link">eDues</v-btn>
<!--                   <v-btn variant="text">-->
<!--                       <router-link class="menu-link" to="/looker-dashboard">Looker</router-link>-->
<!--                   </v-btn>-->
                </v-toolbar-items>
                <div class="select-affiliate pt-3">
                    <AffiliateSelectorComponent :affiliate="affiliate" @selected="selectAffiliate">
                        <template #append>
                            <v-list-item
                                title="Click to see all affiliates"
                                append-icon="mdi:mdi-chevron-double-right"
                                class="mt-2"
                                :to="{ name: 'AffiliatesAdmin' }"
                            >
                                <template #title="{ title }">
                                    <strong class="text-primary">{{ title }}</strong>
                                </template>
                            </v-list-item>
                        </template>
                    </AffiliateSelectorComponent>
                </div>
                <v-spacer></v-spacer>
                <div class="icons">
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="fa-plus" size="small" v-bind="props" class="menu-icons" />
                        </template>
                        <v-list>
                            <v-list-item
                                v-for="(item, index) in createNavItems"
                                :key="index"
                                :to="`${item.link}`"
                            >
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="fa-search" variant="text" size="small" v-bind="props" class="menu-icons" />
                        </template>
                        <v-list>
                            <v-list-item
                                v-for="(item, index) in searchNavItems"
                                :key="index+'-search'"
                                :to="{name: item.linkName}"
                            >
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-menu v-if="appNavItems && appNavItems.length !== 0">
                        <template v-slot:activator="{ props }">
                            <v-btn variant="text" size="small" v-bind="props" icon="fa-paper-plane" class="menu-icons" />
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in appNavItems" :key="index+'-app'" :href="item.link">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
<!--                            <v-list-item :key="'edues'" v-if="hasEdues">-->
<!--                                <v-list-item-title>-->
<!--                                    <router-link to="/edues">Edues</router-link>-->
<!--                                </v-list-item-title>-->
<!--                            </v-list-item>-->
                        </v-list>
                    </v-menu>

                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn size="small" v-bind="props" icon="fa-user-o" class="menu-icons" />
                        </template>
                        <v-list>
                            <v-list-item
                                v-for="(item, index) in userNavItems"
                                :key="index+'-user-menu'"
                                :to="{name: item.linkName}"
                            >
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                                href="https://awa.knack.aft.org/aftdatasupport#connect-feedback/"
                                target="_blank"
                            >
                                <v-list-item-title>Feedback</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="logout">
                                <v-list-item-title>Logout</v-list-item-title>
                                <form id="logout-form" action="/logout" method="POST" style="display: none;">
                                    <input type="hidden" name="_token" :value="token"/>
                                </form>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-container>
        </v-toolbar>

        <div class="hidden-lg-and-up mb-14">
            <v-app-bar color="primary" class="mobile-app-bar">
                <v-app-bar-nav-icon
                    icon="mdi:mdi-menu"
                    @click.stop="drawer = !drawer"
                    color="white"
                    class="mobile-menu-icons"
                />
                <v-spacer></v-spacer>

                <v-toolbar-title>
                    <a class="navbar-brand" href="/">
                        <img class="mobile-logo" src="/images/logos/AFTConnectLogo.png"/>
                    </a>
                </v-toolbar-title>

                <v-spacer></v-spacer>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi:mdi-plus" color="white" v-bind="props" class="mobile-menu-icons rounded-circle">
                        </v-btn>
                    </template>
                    <v-list class="bg-light-blue-darken-2">
                        <v-list-item
                            :v-for="(item, index) in createNavItems"
                            :key="index"
                            :to="`${item.link}`"
                        >
                            <v-list-item-title class>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" absolute temporary class="mobile-primary-navigation bg-primaryDark">
                <v-list nav density="compact" class="mobile-v-list" v-model="group">
                    <v-list-item class="navigation-drawer-icons">
                        <v-btn
                            variant="text"
                            color="white"
                            icon="fa-question"
                            size="large"
                            class="mobile-menu-icons rounded-circle"
                            to="/releasenotes"
                        />
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    variant="text"
                                    v-bind="props"
                                    color="white"
                                    icon="fa-search"
                                    size="large"
                                    class="mobile-menu-icons rounded-circle"
                                    @click.stop="drawer = true"
                                />
                            </template>
                            <v-list>
                                <v-list-item
                                    v-for="(item, index) in searchNavItems"
                                    :key="index+'-search'"
                                    :to="{name: item.linkName}"
                                >
                                    {{ item.title }}
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-menu v-if="appNavItems && appNavItems.length !== 0">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    variant="text"
                                    v-bind="props"
                                    color="white"
                                    icon="fa-paper-plane"
                                    size="large"
                                    class="mobile-menu-icons"
                                    @click.stop="drawer = true"
                                />
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in appNavItems" :key="index+'-app'" :href="item.link">
                                    {{ item.title }}
                                </v-list-item>
<!--                                    <v-list-item :key="'edues'" v-if="hasEdues">-->
<!--                                        <v-list-item-title>-->
<!--                                            <router-link to="/edues">Edues</router-link>-->
<!--                                        </v-list-item-title>-->
<!--                                    </v-list-item>-->
                            </v-list>
                        </v-menu>
                        <v-menu @click.stop="drawer = true">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    variant="text"
                                    v-bind="props"
                                    color="white"
                                    icon="fa-user-o"
                                    size="large"
                                    class="mobile-menu-icons"
                                    @click.stop="drawer = true"
                                />
                            </template>
                            <v-list>
                                <v-list-item
                                    v-for="(item, index) in userNavItems"
                                    :key="index+'-user-menu'"
                                    :to="{name: item.linkName}"
                                >
                                    {{ item.title }}
                                </v-list-item>
                                <v-list-item
                                    href="https://awa.knack.aft.org/aftdatasupport#connect-feedback/"
                                    target="_blank"
                                >
                                    Feedback
                                </v-list-item>
                                <v-list-item @click="logout">
                                    Logout
                                    <form id="logout-form" action="/logout" method="POST" style="display: none;">
                                        <input type="hidden" name="_token" :value="token"/>
                                    </form>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-list-item>
                    <v-divider class="mobile-v-divider"></v-divider>
                    <v-list-item>
                        <AffiliateSelectorComponent :affiliate="affiliate" @selected="selectAffiliate">
                            <template #append>
                                <v-list-item
                                    title="Click to see all affiliates"
                                    append-icon="mdi:mdi-chevron-double-right"
                                    class="mt-2"
                                    :to="{ name: 'AffiliatesAdmin' }"
                                >
                                    <template #title="{ title }">
                                        <strong class="text-primary">{{ title }}</strong>
                                    </template>
                                </v-list-item>
                            </template>
                        </AffiliateSelectorComponent>
                    </v-list-item>
                    <v-divider class="mobile-v-divider"></v-divider>
                    <v-list-item class="mobile-menu-link" to="/individuals">Individuals</v-list-item>
                    <v-list-item class="mobile-menu-link" to="/affiliate">Affiliate</v-list-item>
                    <v-list-item
                        v-if="selectedAffiliate && selectedAffiliate.hasChapters"
                        class="mobile-menu-link"
                        to="/chapters"
                    >
                        Chapters
                    </v-list-item>
                    <v-list-item class="mobile-menu-link" to="/units">Units</v-list-item>
                    <v-list-item class="mobile-menu-link" to="/employers">Employers</v-list-item>
                    <v-list-item class="mobile-menu-link" to="/reports">Reports</v-list-item>
                    <v-list-item v-if="hasEdues" class="mobile-menu-link" to="/edues">Edues</v-list-item>
                    <v-divider class="mobile-v-divider"></v-divider>
                </v-list>
            </v-navigation-drawer>
        </div>
    </div>
</template>

<script>
    import { mergeProps } from 'vue'
    import AffiliateSelectorComponent from "./AffiliateSelectorComponent.vue";
    export default {
        name: "HeaderComponent",
        data: () => ({
            createNavItems: [{title: "Add Individual", link: "/individuals/add"}],
            userNavItems: [
                {title: "My Account", linkName: "MyAccount"},
                {title: "Admin Affiliate Listing", linkName: "AffiliatesAdmin"}
            ],
            searchNavItems: [
                {title: "Search for Individuals", linkName: "IndividualSearch"},
                {title: "Search for Officers", linkName: "OfficerSearch" },
                {title: "Search for Affiliates", linkName: "AffiliatesSearch"},
                {title: "Search for Employers", linkName: "EmployersSearch"}
            ],
            appNavItems: [
                { title: 'Connect Admin Panel', link: '/admin', ability: 'admin' },
                { title: 'Connect Staff Portal', link: '/app/staff', ability: 'staffportal' },
                { title: 'Membership Forms Portal', link: '/app/memberforms/admin', ability: 'memberforms' },
            ],
            user: [],
            drawer: false,
            group: null,
            hasEdues : false,
            affiliate: null,
        }),
        components: {
            AffiliateSelectorComponent,
        },
        computed: {
            token() {
                const token = document.head.querySelector('meta[name="csrf-token"]');
                return token.content;
            },
            selectedAffiliate() {
                const affiliate = this.$store.getters['user/selectedAffiliate'];
                if (affiliate) {
                    this.getHasDues(affiliate.AffiliateId);
                    this.affiliate = affiliate;
                }
                return affiliate;
            },
        },
        beforeMount() {
            const userAbilities = this.$store.getters['user/userAbilities']
                .map((ability) => ability?.AuthAbility?.type)
                .filter((ability) => ability);

            this.appNavItems = this.appNavItems.filter((item) => {
                return userAbilities.includes(item.ability);
            });
        },
        methods: {
            mergeProps,
            selectAffiliate(affiliateId) {
                if (affiliateId > 0) {
                    this.$store.dispatch('user/setUserSelectedEntity', affiliateId).then((res) => {
                        switch (this.$route.name) {
                            case 'Individuals':
                                this.$router.go(0).catch(err => {});
                                break;
                            case 'IndividualDetails':
                                this.$router.push({ name: 'Individuals' }).catch(err => {});
                                break;
                            case 'EmployerDetails':
                                this.$router.push({ name: 'Employers' }).catch(err => {});
                                break;
                            default:
                                window.location.reload();
                                break;
                        }
                    });
                } else {
                    this.$router.push({ name: 'AffiliatesAdmin' }).catch(err => {});
                }
            },
            logout() {
                document.getElementById("logout-form").submit();
            },
            getHasDues(id) {
                axios.get('/api/v3/memberforms/admin/has-edues/' + id).then(response => {
                    this.hasEdues = response.data.hasEdues;
                });
            }
        },
        watch: {
            group() {
                this.drawer = false;
            }
        }
    };
</script>
