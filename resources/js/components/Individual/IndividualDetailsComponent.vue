<template>
    <v-container>
        <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
        <v-alert type="error" v-model="notAllowed" class="mb-2">You do not have access to this record. Please check your global filter to ensure you have the correct Affiliate selected.</v-alert>
        <div v-if="!notAllowed">
            <FlipCard :flipped="flipped">
                <template #front>
                    <individual-basic-data-component :individual="individual" v-on:edit-individual="flipped=true"></individual-basic-data-component>
                </template>
                <template #back>
                    <individual-edit-basic-data-component :individual="individual" :edit-mode="!!individual.IndividualId"
                                                          v-on:saved-individual="onSavedIndividual"
                                                          v-on:cancel-edit-individual="flipped=false"></individual-edit-basic-data-component>
                </template>
            </FlipCard>
            <div class="pt-4">
                <v-expansion-panels>
                    <demographics-component :individual="individual" v-on:demographics-changed="onSavedIndividual"></demographics-component>
                    <address-information-component :individual="individual"></address-information-component>
                    <email-information-component :individual="individual"></email-information-component>
                    <phone-information-component :individual="individual"></phone-information-component>
                    <social-media-information-component :individual="individual"></social-media-information-component>
                    <union-relationships-component></union-relationships-component>
                    <all-union-relationships-component></all-union-relationships-component>
                    <individual-union-roles-component :individual="individual"></individual-union-roles-component>
                    <membership-card-component :individual="individual"></membership-card-component>
                    <individual-employers-component></individual-employers-component>
                    <individual-quick-comments-component :individual="individual"></individual-quick-comments-component>
                    <individual-political-data-component :individual="individual"></individual-political-data-component>
                    <!--
                    <v-card class="v-card--outlined v-sheet--tile mt-4">
                        <file-attachment-component :entityId="id" fileAttachmentTypeName="Individual" allowedFileExtensions=".xls, .xlsx, .csv" v-if="id"></file-attachment-component>
                    </v-card>
                    -->
                    <activity-log-component :individual="individual"></activity-log-component>
                    <edues-component :individual="individual" v-if="eduesStatus"></edues-component>
                </v-expansion-panels>
            </div>
        </div>
    </v-container>
</template>

<script>
    import FlipCard from "../Common/Card/FlipCard";
import ActivityLogComponent from "./Partial/ActivityLogComponent";
import AllUnionRelationshipsComponent from "./Partial/AllUnionRelationshipsComponent";
import AddressInformationComponent from "./Partial/Contact/AddressInformationComponent";
import EmailInformationComponent from "./Partial/Contact/EmailInformationComponent";
import PhoneInformationComponent from "./Partial/Contact/PhoneInformationComponent";
import SocialMediaInformationComponent from "./Partial/Contact/SocialMediaInformationComponent";
import DemographicsComponent from "./Partial/DemographicsComponent";
import BasicDataComponent from "./Partial/Edit/BasicDataComponent";
import EditDemographicsDataComponent from "./Partial/Edit/EditDemographicsDataComponent";
import EduesComponent from "./Partial/EduesComponent";
import EmployersComponent from "./Partial/EmployersComponent";
import MembershipCardComponent from "./Partial/MembershipCardComponent";
import PoliticalDataComponent from "./Partial/PoliticalDataComponent";
import QuickCommentsComponent from "./Partial/QuickCommentsComponent";
import UnionRelationshipsComponent from "./Partial/UnionRelationshipsComponent";
import UnionRolesComponent from "./Partial/UnionRolesComponent";
import ViewBasicDataComponent from "./Partial/ViewBasicDataComponent";

    export default {
        name: "IndividualDetailsComponent",
        components: {
            UnionRelationshipsComponent,
            AllUnionRelationshipsComponent,
            DemographicsComponent,
            FlipCard,
            'address-information-component': AddressInformationComponent,
            'email-information-component': EmailInformationComponent,
            'phone-information-component': PhoneInformationComponent,
            'social-media-information-component': SocialMediaInformationComponent,
            'individual-union-roles-component': UnionRolesComponent,
            'membership-card-component': MembershipCardComponent,
            'individual-employers-component': EmployersComponent,
            'individual-quick-comments-component': QuickCommentsComponent,
            'individual-basic-data-component': ViewBasicDataComponent,
            'individual-edit-basic-data-component': BasicDataComponent,
            'edit-demographics-data-component': EditDemographicsDataComponent,
            'individual-political-data-component': PoliticalDataComponent,
            'activity-log-component' : ActivityLogComponent,
            'edues-component' : EduesComponent
        },

        data() {
            return {
                id: 0,
                individual: {},
                flipped: false,
                loading: false,
                notAllowed: false,
                eduesStatus: false
            }
        },

        mounted() {
            if (this.$route.params.id) {
                this.id = this.$route.params.id;
                this.getDataFromApi();
                this.getEduesStatusApi();
            } else {
                this.loading = false;
            }
        },
        methods: {
            getDataFromApi() {
                this.loading = true;

                return axios.get('/api/v2/individual/' + this.id + '?include=individualAffiliates.Affiliate,Gender,Prefix,Suffix,MaritalStatus,individualEducationLevels,individualEducationLevels.LocalEducationLevel,individualMembers,activeindividualAffiliates.UnionRelationshipType,activeIndividualAffiliates.LocalDuesCategory,individualAddressesOrdered,individualAddressesOrdered.StateTerritory,individualEmailsOrdered,individualPhonesOrdered,activeIndividualEmployers,activeIndividualEmployers.JobTitle,activeIndividualEmployers.Employer,activeIndividualEmployers.Employer.Chapter,individualQuickComments.IndividualAssessment,PoliticalParty')
                    .then(response => {
                        this.individual = response.data.data;
                    })
                    .catch(() => {
                        this.notAllowed = true;
                        this.$router.push({ name: 'Individuals' });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },

            getEduesStatusApi() {
                this.loading = true;
                const individualId = this.id;
                return axios.get('/api/v3/memberforms/admin/individual-edues-status/'+individualId)
                    .then(response => {
                        if(response.data.eduesStatus){
                            this.eduesStatus = true;
                        }
                       
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },

            onSavedIndividual(individual) {
                this.flipped = false;
                this.getDataFromApi();
            }
        },
        watch: {
            $route(to, from) {
                this.id = to.params.id;
                this.getDataFromApi();
            }
        }
    }
</script>
