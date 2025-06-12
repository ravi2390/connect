<template>
    <v-container>
        <v-row v-if="notAllowed">
            <v-col>
                <v-alert type="error" v-model="notAllowed" >You do not have access to this record. Please check your global filter to ensure you have the correct Affiliate selected.</v-alert>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <v-card class="v-card--outlined v-sheet--tile px-6 mobile-global-mobile-container">
                    <affiliate-detail-component :affiliateId="id" @open-details="emitReload"></affiliate-detail-component>
                </v-card>
                <div class="pt-4">
                    <v-expansion-panels v-model="panels">
                        <address-information-component :affiliateId="id" v-if="!addingNew" />
                        <email-information-component :affiliateId="id" v-if="!addingNew" />
                        <phone-information-component :affiliateId="id" v-if="!addingNew" />
                        <social-media-information-component :affiliateId="id" v-if="!addingNew" />
                        <officer-roles :affiliateId="id" />
                        <affiliate-staff :affiliateId="id" />
                        <affiliate-summary-component :affiliateId="id" />
                        <local-dues :affiliateId="id" />
                        <affiliate-committees :affiliateId="id" />
                        <affiliate-chapter :affiliateId="id" />
                        <affiliate-employer :affiliateId="id" />
                        <affiliate-unit-component :affiliateId="id" />
                        <user-accounts-component :affiliateId="id" />
                        <!--
                        <file-attachment-component :entityId="id" fileAttachmentTypeName="Affiliate" allowedFileExtensions=".xls, .xlsx, .csv" v-if="id"></file-attachment-component>
                        -->
                    </v-expansion-panels>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import AddressInformationComponent from "./Partial/Contact/AddressInformationComponent";
    import EmailInformationComponent from "./Partial/Contact/EmailInformationComponent";
    import PhoneInformationComponent from "./Partial/Contact/PhoneInformationComponent";
    import SocialMediaInformationComponent from "./Partial/Contact/SocialMediaInformationComponent";
    import AffiliateDetailComponent from "./Partial/AffiliateDetailComponent";
    import OfficerRolesComponent from "./Partial/OfficerRolesComponent";
    import AffiliateSummaryComponent from "./Partial/AffiliateSummaryComponent";
    import AffiliateStaffComponent from "./Partial/AffiliateStaffComponent";
    import LocalDuesCategoryComponent from "./Partial/LocalDuesCategoryComponent";
    import AffiliateCommitteesComponent from "./Partial/AffiliateCommitteesComponent";
    import AffiliateChapterComponent from "./Partial/AffiliateChapterComponent";
    import AffiliateEmployerComponent from "./Partial/AffiliateEmployerComponent";
    import AffiliateUnitComponent from "./Partial/AffiliateUnitComponent";
    import UserAccountsComponent from "./Partial/UserAccountsComponent";

    export default {
        name: "AffiliateDisplayComponent",
        components: {

            'affiliate-detail-component': AffiliateDetailComponent,
            'address-information-component': AddressInformationComponent,
            'email-information-component': EmailInformationComponent,
            'phone-information-component': PhoneInformationComponent,
            'social-media-information-component': SocialMediaInformationComponent,
            'officer-roles': OfficerRolesComponent,
            'affiliate-summary-component': AffiliateSummaryComponent,
            'affiliate-staff': AffiliateStaffComponent,
            'local-dues': LocalDuesCategoryComponent,
            'affiliate-committees': AffiliateCommitteesComponent,
            'affiliate-chapter': AffiliateChapterComponent,
            'affiliate-employer': AffiliateEmployerComponent,
            'affiliate-unit-component': AffiliateUnitComponent,
            'user-accounts-component': UserAccountsComponent,
        },

        data: () => ({
            id: 0,
            affiliate: {},
            panels: [],
            notAllowed: false
        }),

        computed: {
            addingNew() {
                return this.id === null;
            }
        },

        beforeMount() {
            if (this.$route.params.id) {
                this.id = parseInt(this.$route.params.id);
                if (this.id !== this.getAffiliateId()) {
                    this.notAllowed = true;
                }
            }
            else {
                this.id = this.getAffiliateId();
            }
        },
        mounted() {
            if (!this.notAllowed) {
                this.getDataFromApi();
            }
            if (this.$route.hash) {
                this.panels = [this.$route.hash.substring(1)];
            }
        },
        methods: {
            getAffiliateId() {
                return this.$store.getters['user/selectedAffiliate'].AffiliateId;
            },
            getDataFromApi() {
                let url = '/api/v2/affiliate/' + this.id + '?include=AffiliateType&scope=global';

                return axios.get(url)
                    .then(response => {
                        this.affiliate = response.data.data;
                    })
                    .finally(() => {

                    });

            },
            emitReload() {
                this.panels = ['Details']
            },
        }
    }
</script>

<style scoped>

</style>
