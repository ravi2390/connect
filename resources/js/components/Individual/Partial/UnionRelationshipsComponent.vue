<template>
    <v-expansion-panel id="unionRelationship" v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Union Relationships
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
            <FlipCard :flipped="flipped">
                <template #front>
                    <view-union-relationship-component
                        :individual="individual"
                        v-on:edit-individual-affiliate="onEditRelationship"
                        :individual-employers="individualEmployers"
                        :individual-affiliates="individualAffiliates"
                        :individual-cope="individualCope"
                        :clicked="!clicked"
                        v-on:individual-affiliate-reactivated="onReactivated"
                    ></view-union-relationship-component>
                </template>
                <template #back>
                    <edit-union-relationship-data-component :read-only="false" :individual="individual" :individual-affiliate="individualAffiliate" v-on:cancel-edit-individual-affiliate="flipped=false" v-on:saved-individual-affiliate="onSave" :individual-cope="individualCope.length > 0 ? individualCope[0] : {}" :edues-status="eduesStatus"></edit-union-relationship-data-component>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../Common/Card/FlipCard";
    import ViewUnionRelationshipComponent from "./ViewUnionRelationshipComponent";
    import EditUnionRelationshipDataComponent from "./Edit/EditUnionRelationshipDataComponent";
    import billHighway from "../../../mixins/Data/billHighway";
    export default {
        name: "UnionRelationshipsComponent",
        components: {EditUnionRelationshipDataComponent, ViewUnionRelationshipComponent, FlipCard},
        mixins: [billHighway],
        data() {
            return {
                flipped: false,
                individualAffiliate: {},
                individual: {},
                individualEmployers: [],
                individualAffiliates: [],
                individualCope: [],
                loading: false,
                selectedAffiliateId: null,
                hash: '',
                panel: '',
                clicked: false,
                eduesStatus: false,
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
            this.hash = window.location.hash.substring(1);
            this.getEduesStatusApi();
        },
        watch: {
            hash(hash) {
                if (hash === 'unionRelationship') {
                    this.scrollTo();
                }
            }
        },
        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },
            scrollTo() {
                const getMeTo = document.getElementById("unionRelationship");
                getMeTo.scrollIntoView({behavior: 'smooth'}, true);
                this.panel = 0;
                this.getDataFromApi();
                setTimeout(this.clickEditBtn, 5000);
            },
            clickEditBtn() {
                this.clicked = !this.clicked;
            },
            onSave({individualAffiliate, status}) {
                if (status === 200 || status === 201) {
                    const index = this.individualAffiliates.findIndex((indAffiliate) => {
                        return indAffiliate.IndividualAffiliateId === individualAffiliate.IndividualAffiliateId;
                    });

                    if (index !== -1) {
                        this.individualAffiliates[index] = individualAffiliate;
                    } else {
                        this.individualAffiliates.push(individualAffiliate);
                    }

                    this.individualAffiliates = [...this.individualAffiliates];

                    axios.get('/api/v2/individualCope?filter[IndividualId]=' + this.id)
                        .then(response => {
                            this.individualCope = response.data.data;
                        });
                } else if (status === 205) {
                    axios.get('/api/v2/individualAffiliate?filter[IndividualId]=' + this.id + '&include=Affiliate,UnionRelationshipType,LocalDuesCategory,IndividualDeactivationReason,PaymentMethod,PaymentFrequency&sort=-EndDate')
                        .then(response => {
                            this.individualAffiliates = response.data.data;
                        });
                    axios.get('/api/v2/individualCope?filter[IndividualId]=' + this.id)
                        .then(response => {
                            this.individualCope = response.data.data;
                        });
                    axios.get('/api/v2/individualEmployer?filter[IndividualId]=' + this.id + '&include=LocalJobClass.Unit,Employer.Chapter')
                        .then(response => {
                            this.individualEmployers = response.data.data;
                        });
                }
                this.updateBillHighwayIndividual(this.individual.IndividualId, this.selectedAffiliateId, 'unionRelationship');
                this.flipped = false;
            },
            getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/individual/' + this.id + '?include=individualAffiliates.Affiliate,individualAffiliates.UnionRelationshipType,individualAffiliates.LocalDuesCategory,individualAffiliates.IndividualDeactivationReason,individualAffiliates.PaymentMethod,individualAffiliates.PaymentFrequency,individualEmployers,individualEmployers.LocalJobClass,individualEmployers.LocalJobClass.Unit,individualCope,individualEmployers.Employer,individualEmployers.Employer.Chapter,individualMembers')
                    .then(response => {
                        this.individual = response.data.data;
                        if (response.data.data.individualEmployers) {
                            this.individualEmployers = response.data.data.individualEmployers;
                            this.individualAffiliates = response.data.data.individualAffiliates;
                            this.individualCope = response.data.data.individualCope;
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            onEditRelationship(individualAffiliate) {
                this.individualAffiliate = individualAffiliate;
                this.flipped = true;
            },
            onReactivated(responseIndividualAffiliate) {
                const index = this.individualAffiliates.findIndex((individualAffiliateList) => {
                    return individualAffiliateList.IndividualAffiliateId = responseIndividualAffiliate.IndividualAffiliateId;
                });

                if (index !== -1) {
                    this.individualAffiliates[index] = responseIndividualAffiliate;
                    this.individualAffiliates = [...this.individualAffiliates];
                }
            },
            getEduesStatusApi() {
                return axios.get('/api/v3/memberforms/admin/individual-edues-status/' + this.id)
                    .then(response => {
                        if(response.data.eduesStatus){
                            this.eduesStatus = true;
                        }
                    })
                    .finally(() => {
                    });
            },
        }
    }
</script>

<style scoped>

</style>
