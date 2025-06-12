<template>
    <v-expansion-panel>
        <v-expansion-panel-title>
            Political Data
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-row>
                <v-col cols="12" md="6" lg="4">
                    <div class="data-container">
                        <div class="data-tag">Congressional District:</div>
                        <div class="data-value">
                            {{ individual.CongressionalDistrict }}
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                    <div class="data-container">
                        <div class="data-tag">State Senate District:</div>
                        <div class="data-value">
                            {{ individual.StateSenateDistrict }}
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                    <div class="data-container">
                        <div class="data-tag">State House District:</div>
                        <div class="data-value">
                            {{ individual.StateHouseDistrict }}
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                    <div class="data-container">
                        <div class="data-tag">Residential School District:</div>
                        <div class="data-value">
                            {{ individual.ResidentialSchoolDistrict }}
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                    <div class="data-container">
                        <div class="data-tag">Voter Precinct:</div>
                        <div class="data-value">
                            {{ individual.VoterPrecinct }}
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6" lg="4">
                    <div class="data-container">
                        <div class="data-tag">Township:</div>
                        <div class="data-value">
                            {{ individual.Township }}
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                    <div class="data-container">
                        <div class="data-tag">Ward:</div>
                        <div class="data-value">
                            {{ individual.Ward }}
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                    <div class="data-container">
                        <div class="data-tag">Is Registered to Vote:</div>
                        <div class="data-value">
                            <span v-if="individual.IsRegisteredVoter == true">
                                Yes
                            </span>
                            <span v-if="individual.IsRegisteredVoter == false">
                                No
                            </span>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                    <div class="data-container">
                        <div class="data-tag">Party Affiliation:</div>
                        <div class="data-value">
                            <span v-if="individual.PoliticalParty">
                            {{ individual.PoliticalParty.PoliticalPartyName }}
                            </span>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                    <!-- <div class="data-container">
                        <div class="data-tag">IsPoliticallyActive:</div>
                        <div class="data-value">
                            <span v-if="individual.IsPoliticallyActive == true">
                                Yes
                            </span>
                            <span v-if="individual.IsPoliticallyActive == false">
                                No
                            </span>
                        </div>
                    </div> -->
                </v-col>
            </v-row>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "PoliticalDataComponent",
        data() {
            return {
                flipped: false
            }
        },
        props: {
            individual: {
                type: Object,
                required: true
            }
        },
    }
</script>

<style scoped>

</style>
