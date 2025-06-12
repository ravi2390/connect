<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Employers
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
            <FlipCard :flipped="flipped">
                <template #front>
                    <view-employers-component :individual="individual" v-on:add-individual-employer="onAddEmployer" v-on:edit-employer="onEditEmployer" :individual-employers="nonStructuralEmployers"></view-employers-component>
                </template>
                <template #back>
                    <edit-employer-data-component :edit-mode="editMode" :read-only="false" :individual-employer="individualEmployer" :individual="individual" v-on:cancel-edit-employer="flipped=false" v-on:saved-employer="onSave"></edit-employer-data-component>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../Common/Card/FlipCard";
    import ViewEmployersComponent from "./ViewEmployersComponent";
    import EditEmployerDataComponent from "./Edit/EditEmployerDataComponent";
    import markAsPreferredMixin from "../../../mixins/Data/markAsPreferredMixin";
    export default {
        name: "EmployersComponent",
        components: {EditEmployerDataComponent, ViewEmployersComponent, FlipCard},
        mixins: [markAsPreferredMixin],
        data() {
            return {
                flipped: false,
                individualEmployer: {},
                individual: {},
                individualEmployers: [],
                loading: false,
                editMode: false,
                selectedAffiliateId: null,
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
        },
        computed: {
            nonStructuralEmployers() {
                return this.individualEmployers.filter(individualEmployer => individualEmployer.Employer && !individualEmployer.Employer.IsStructural);
            }
        },
        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },
            onSave(employer) {
                this.flipped = false;

                const index = this.individualEmployers.findIndex((individualEmployer) => {
                    return employer.IndividualEmployerId === individualEmployer.IndividualEmployerId
                });

                if (index === -1) {
                    this.individualEmployers.unshift(employer);
                } else {
                    this.individualEmployers[index] = employer;
                }

                this.handleIsPreferred(this.individualEmployers, employer, 'IndividualEmployerId', 'IndividualId');
                this.individualEmployers = [...this.individualEmployers];
            },
            getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/individual/' + this.id + '?include=individualEmployers.Employer,individualEmployers.Subject,individualEmployers.WorkLocation,individualEmployers.WorkStructure,individualEmployers.WorkLocation.WorkLocationType,individualEmployers.WorkStructure.WorkStructureType,individualEmployers.LocalJobClass,individualEmployers.LocalJobClass.Unit,individualEmployers.LocalJobClass.NationalJobClass,individualEmployers.WorkLocation.ParentWorkLocation,individualEmployers.WorkStructure.ParentWorkStructure,individualEmployers.JobTitle')
                    .then(response => {
                        this.individual = response.data.data;
                        if (response.data.data.individualEmployers) {
                            this.individualEmployers = response.data.data.individualEmployers;
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            onEditEmployer(employer) {
                this.individualEmployer = employer;
                this.editMode = true;
                this.flipped = true;
            },
            onAddEmployer() {
                this.individualEmployer = {};
                this.editMode = false;
                this.flipped = true;
            }
        }
    }
</script>

<style scoped>

</style>
