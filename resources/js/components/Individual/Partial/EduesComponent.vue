<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            eDues
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
            <FlipCard :flipped="flipped">
                <template #front>
                    <view-edues-component :individual="individual" v-on:edit-edues="onEditEdues" :loading="loading"></view-edues-component>
                </template>
                <template #back>
                    <edit-edues-payment-component :edit-mode="editMode" :read-only="false" :individual="individualData" :bill-highway-data="billHighwayData" v-on:cancel-edit-payment="flipped=false" v-on:saved-edues="onSave" @clicked-force-render="forceRender"></edit-edues-payment-component>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../Common/Card/FlipCard";
    import ViewEduesComponent from "./ViewEduesComponent";
    import EditEduesPaymentComponent from "./Edit/EditEduesPaymentComponent";
    export default {
        name: "EduesComponent",
        components: {ViewEduesComponent, EditEduesPaymentComponent, FlipCard},
        data() {
            return {
                flipped: false,
                individual: {},
                individualData: {},
                editMode: false,
                selectedAffiliateId: null,
                bhData: [],
                indData: [],
                billHighwayData: [],
                isActive: false,
                loading: false,
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
        },
        computed: {

        },
        methods: {
            forceRender() {
                this.getEduesDetailsApi();
            },
            onExpand({ value }) {
                if (value) {
                    this.getEduesDetailsApi();
                }
            },
            onSave() {
                this.flipped = false;
            },
            getEduesDetailsApi() {
                this.loading = true;
                const individualId = this.id;
                return axios.get('/api/v3/memberforms/admin/edues-submission-details/'+individualId+'/'+this.selectedAffiliateId)
                    .then(response => {
                        this.individual = response.data;
                        console.log('response.data', response.data);
                        this.individualData = response.data.individualData;

                        // -- Logic replicated from IndividualEduesComponent.vue for consistency required in the component --
                        const memberArray = Object.entries(response.data).map((arr) => ({
                            bhData: arr[0],
                            indData: arr[1],
                        }));
                        this.billHighwayData = [[memberArray[1].indData, memberArray[2].indData]];
                        // ------------------------------------------------------------------------

                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            onEditEdues(employer) {
                this.editMode = true;
                this.flipped = true;
            },
        }
    }
</script>

<style scoped>

</style>
