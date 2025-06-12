<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col cols="12" lg="5">
                    <div class="data-container">
                        <div class="data-tag">Gender:</div>
                        <div class="data-value">
                            <span>{{ individual.Gender ? individual.Gender.GenderName : '' }}</span>
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Marital Status:</div>
                        <div class="data-value">
                            <span>{{ individual.MaritalStatus ? individual.MaritalStatus.MaritalStatusName : '' }}</span>
                        </div>
                    </div>
                    <div class="data-container" v-if="individual.MonthOfBirth && individual.YearOfBirth && individual.DayOfBirth">
                        <div class="data-tag">DOB:</div>
                        <div class="data-value">
                            <span>{{ individual.MonthOfBirth + '/' + individual.DayOfBirth + '/' + individual.YearOfBirth }}</span>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" lg="5">
                    <div class="data-container">
                        <div class="data-tag">Education Level:</div>
                        <div class="data-value">
                            <span>{{ individual.individualEducationLevels && individual.individualEducationLevels.length > 0 && individual.individualEducationLevels[0].LocalEducationLevel ? individual.individualEducationLevels[0].LocalEducationLevel.LocalEducationLevelName : '' }}</span>
                        </div>
                    </div>
                    <div class="data-container">
                        <div class="data-tag">Dependents:</div>
                        <div class="data-value">
                            <span>{{ individual.Dependents }}</span>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="$emit('edit-demographics')" variant="elevated">Edit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "ViewDemographicsComponent",
        props: {
            individual: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
