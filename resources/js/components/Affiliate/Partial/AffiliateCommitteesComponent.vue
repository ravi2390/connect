<template>
    <v-expansion-panel value="committee" v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Committees
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <FlipCard :flipped="flipped">
                <template #front>
                    <v-row>
                        <v-col class="text-right">
                            <div>
                                <v-btn size="small" color="primary" v-on:click="flipped=true">Manage</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
                            <div class="data-container">
                                <div class="dues" v-for="(affiliateCommittee) in affiliate.affiliateCommittee"
                                      :key="affiliateCommittee.AffiliateCommitteeId"
                                >
                                    <div class="data-tag">Name:</div>
                                    {{ affiliateCommittee.AffiliateCommitteeName }}
                                    <br>
                                    <div class="data-tag">Committee Type:</div>
                                    {{ affiliateCommittee.CommitteeType.CommitteeTypeName}}
                                    <br>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <v-row>
                        <v-col class="text-right">
                            <v-btn size="small" color="primary" v-on:click="flipped=false">Cancel</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <CommitteesEditorComponent :affiliateCommittee="affiliateCommittee" @savedCommittee="getDataFromApi" :affiliateId="affiliateId"></CommitteesEditorComponent>
                        </v-col>
                    </v-row>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../Common/Card/FlipCard";
    import CommitteesEditorComponent from "./CommitteesEditorComponent";

    export default {
        name: "AffiliateCommitteesComponent",
        components: {CommitteesEditorComponent, FlipCard},

        props: {
            affiliateId: {
                type: Number,
                required: true
            }
        },

          data: () => ({

            id: '',
            affiliate: {},
            affiliateCommittee: [],
            loading: false,
            flipped: false,
            panel: [],

        }),
        methods: {
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },

            getDataFromApi() {
                this.loading = true;
                let url = '/api/v2/affiliate/' + this.affiliateId + '?scope=global&include=affiliateCommittee,affiliateCommittee.CommitteeType,affiliateCommittee.affiliateCommitteeMember.CommitteeMemberType,affiliateCommittee.affiliateCommitteeMember.Individual';
                console.log('getting data')
                return axios.get(url)
                    .then(response => {
                        console.log({ response: response.data })
                        this.affiliate = response.data.data;
                        this.affiliateCommittee = response.data.data.affiliateCommittee;
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
