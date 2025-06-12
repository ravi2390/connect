<template>
    <v-container>
        <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
        <v-alert type="error" v-model="notAllowed" class="mb-2">You do not have access to this record. Please check your global filter to ensure you have the correct Affiliate selected.</v-alert>
        <div v-if="!notAllowed">
        <div v-if="!isExpandedMobileResults">
        <v-card>
            <v-card-title>{{ employer.EmployerName ?? 'N/A'}}</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col>
                        <div class="data-container">
                            <div class="data-tag">Employer Type:</div>
                            <div class="data-value" v-if="employer.EmployerType">
                                {{employer.EmployerType.EmployerTypeName}}
                            </div>
                        </div>

                        <div class="data-container">
                            <div class="data-tag">Employer Code:</div>
                            <div class="data-value">
                                {{employer.Code}}
                            </div>
                        </div>

                        <div class="data-container">
                            <div class="data-tag">Acronym:</div>
                            <div class="data-value">
                                {{employer.Acronym}}
                            </div>
                        </div>

                        <div class="data-container">
                            <div class="data-tag">Parent Employer:</div>
                            <div class="data-value" v-if="employer.ParentEmployer">
                                {{employer.ParentEmployer.EmployerName}}
                            </div>
                        </div>

                        <div class="data-container">
                            <div class="data-tag">Employer Website:</div>
                            <div class="data-value">
                                {{employer.WebsiteURL}}
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="data-container">
                            <div class="data-tag">Phone:</div>
                            <div class="data-value" v-if="employer.EmployerMainPhones && employer.EmployerMainPhones.length > 0">
                            <span v-for="mainPhones in preferredPhones(employer.EmployerMainPhones)" :key="mainPhones.EmployerPhoneId">
                                {{ mainPhones.PhoneNumber}}
                            </span>
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Email:</div>
                            <div class="data-value" v-if="employer.EmployerMainEmails && employer.EmployerMainEmails.length > 0">
                                {{ employer.EmployerMainEmails[0].Email}}
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Associated with:</div>
                            <div class="data-value" v-if="employer.Chapter && employer.Chapter.Affiliate">
                                {{employer.Chapter.Affiliate.AffiliateName}} - {{employer.Chapter.Affiliate.AffiliateNumber}}
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
            <div class="pt-4">
                <v-expansion-panels>
                    <address-information-component :employerId="$route.params.id"></address-information-component>
                    <email-information-component :employerId="$route.params.id"></email-information-component>
                    <phone-information-component :employerId="$route.params.id"></phone-information-component>
                    <employer-work-structure-component :employerId="$route.params.id"></employer-work-structure-component>
                    <employer-work-location-component :employerId="$route.params.id"></employer-work-location-component>
                    <employer-job-title-component :employerId="$route.params.id"></employer-job-title-component>
                    <employer-job-class-component :employerId="$route.params.id"></employer-job-class-component>
                </v-expansion-panels>
            </div>
        </div>
        <div v-if="isExpandedMobileResults" v-touch="{right: () => swipe('right'),}">
                <v-row>
                    <v-col cols="12" class="mobile-employer-name">
                    <h3 v-if="employer.EmployerName" class="mobile-link-style">
                        <a :href="'/employers/' + employer.EmployerId">{{employer.EmployerName}}</a>
                    </h3>
                    <h3 v-else>N/A</h3>
                    </v-col>
                </v-row>
                <div class="mobile-link-note-container">
                    <div class="data-value">
                        <span>Click on the name to view and edit the employer record</span>
                    </div>
                </div>
                <v-row>
                    <v-col>
                        <div class="data-container">
                            <div class="data-tag">Employer Type:</div>
                            <div class="data-value" v-if="employer.EmployerType">
                                {{employer.EmployerType.EmployerTypeName}}
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Employer Code:</div>
                            <div class="data-value">
                                {{employer.Code}}
                            </div>
                        </div>

                        <div class="data-container">
                            <div class="data-tag">Acronym:</div>
                            <div class="data-value">
                                {{employer.Acronym}}
                            </div>
                        </div>

                        <div class="data-container">
                            <div class="data-tag">Parent Employer:</div>
                            <div class="data-value" v-if="employer.ParentEmployer">
                                {{employer.ParentEmployer.EmployerName}}
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Phone:</div>
                            <div class="data-value" v-if="employer.EmployerMainPhones && employer.EmployerMainPhones.length > 0">
                                {{ employer.EmployerMainPhones[0].PhoneNumber}}
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Email:</div>
                            <div class="data-value" v-if="employer.EmployerMainEmails && employer.EmployerMainEmails.length > 0">
                                {{ employer.EmployerMainEmails[0].Email}}
                            </div>
                        </div>
                        <div class="data-container">
                            <div class="data-tag">Associated with:</div>
                            <div class="data-value" v-if="employer.Chapter && employer.Chapter.Affiliate">
                             <router-link :to="{ name: 'AffiliateDisplay', params: { id: employer.Chapter.Affiliate.AffiliateId }}">
                                {{employer.Chapter.Affiliate.AffiliateName}} - {{employer.Chapter.Affiliate.AffiliateNumber}}
                            </router-link>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-container>
</template>

<script>
    import AddressInformationComponent from "./Partial/Contact/AddressInformationComponent";
import EmailInformationComponent from "./Partial/Contact/EmailInformationComponent";
import PhoneInformationComponent from "./Partial/Contact/PhoneInformationComponent";
import EmployerJobClassComponent from "./Partial/EmployerJobClassComponent";
import EmployerJobTitleComponent from "./Partial/EmployerJobTitleComponent";
import EmployerWorkLocationComponent from "./Partial/EmployerWorkLocationComponent";
import EmployerWorkStructureComponent from "./Partial/EmployerWorkStructureComponent";

    export default {
        name: "EmployerDetailsComponent",
        components: {
            'address-information-component': AddressInformationComponent,
            'email-information-component': EmailInformationComponent,
            'phone-information-component': PhoneInformationComponent,
            'employer-work-structure-component': EmployerWorkStructureComponent,
            'employer-work-location-component': EmployerWorkLocationComponent,
            'employer-job-title-component': EmployerJobTitleComponent,
            'employer-job-class-component': EmployerJobClassComponent,
        },

        data() {
            return {
                id: '',
                employer: {},
                loading: false,
                notAllowed: false
            }
        },
        props: {
            employerId: {
                type: Number,
                required: false
            },
            isExpandedMobileResults: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.id = this.$route.params.id;
            } else  {
                this.id = this.employerId;
            }
            this.getDataFromApi();
        },
        methods: {
            preferredPhones(phones) {
                return phones.filter(phone => phone.IsPreferred);
            },
            swipe (direction) {
               this.$emit('swipeToClose');
            },
            getDataFromApi() {
                this.loading = true;

                return axios.get('/api/v2/employer/' + this.id + '?include=EmployerType,EmployerMainPhones.ContactSource,EmployerMainEmails,Chapter.Affiliate,ParentEmployer')
                    .then(response => {
                        this.employer = response.data.data;
                    })
                    .catch(() => {
                        this.notAllowed = true;
                        this.$router.push({ name: 'Employers' });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }
    }
</script>

<style scoped>

</style>
