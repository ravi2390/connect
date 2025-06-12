<template>
    <v-container>
        <v-row>
            <v-col class="text-right">
                <v-btn size="small" @click="$emit('add-individual-employer')" color="primary">Add employer record</v-btn>
            </v-col>
        </v-row>
        <v-row v-for="IndividualEmployer in individualEmployers"
               :key="IndividualEmployer.IndividualEmployerId">
            <v-col :class="getClass(IndividualEmployer)">
                <v-container>
                    <v-row>
                        <v-col cols="9">
                            <h4> {{ IndividualEmployer.Employer.EmployerName }} </h4>
                        </v-col>
                        <v-col cols="3" class="text-right" v-if="!isLocked(IndividualEmployer)">
                            <v-btn size="small" @click="$emit('edit-employer', IndividualEmployer)" color="primary">Edit</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Employee ID:</div>
                                    <div class="data-value">
                                        {{ IndividualEmployer.EmployeeId }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Job Title:</div>
                                    <div class="data-value" v-if="IndividualEmployer.JobTitle">
                                        {{ IndividualEmployer.JobTitle.JobTitleName }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Job Description:</div>
                                    <div class="data-value" v-if="IndividualEmployer.JobDescription">
                                        {{ IndividualEmployer.JobDescription }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Unit:</div>
                                    <div class="data-value" v-if="IndividualEmployer.LocalJobClass && IndividualEmployer.LocalJobClass.Unit">
                                        {{ IndividualEmployer.LocalJobClass.Unit.UnitName }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Hire Date:</div>
                                    <div class="data-value">
                                        {{ $filters.formatDate(IndividualEmployer.HireDate) }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Start Date:</div>
                                    <div class="data-value">
                                        {{ $filters.formatDate(IndividualEmployer.StartDate) }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Room:</div>
                                    <div class="data-value">
                                        {{ IndividualEmployer.RoomNumber }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Tenured:</div>
                                    <span class="data-value" v-if="IndividualEmployer.IsTenured == 1">Yes</span>
                                    <span v-else>No</span>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Part Time:</div>
                                    <span class="data-value" v-if="IndividualEmployer.IsPartTime == 1">Yes</span>
                                    <span v-else>No</span>
                                </div>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Source:</div>
                                    <div class="data-value">
                                        {{ IndividualEmployer.Source }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Subject:</div>
                                    <div class="data-value" v-if="IndividualEmployer.Subject">
                                        {{ IndividualEmployer.Subject.SubjectName }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Stop Date:</div>
                                    <div class="data-value">
                                        {{ $filters.formatDate(IndividualEmployer.EndDate) }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Stop Reason:</div>
                                    <div class="data-value">
                                        {{ IndividualEmployer.StopReason }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Last Update:</div>
                                    <div class="data-value">
                                        {{ $filters.formatDate(IndividualEmployer.UpdatedAt) }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row v-show="false">
                                <div class="data-container">
                                    <div class="data-tag">Currently Working:</div>
                                    <span class="data-value" v-if="IndividualEmployer.CurrentlyWorking == 1">Yes</span>
                                    <span v-else>No</span>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Preferred:</div>
                                    <span class="data-value" v-if="IndividualEmployer.IsPreferred == 1">Yes</span>
                                    <span v-else>No</span>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Position Id:</div>
                                    <div class="data-value">
                                        {{ IndividualEmployer.PositionId }}
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Full Time Equivalent:</div>
                                    <div class="data-value">
                                        {{ IndividualEmployer.FullTimeEquivalent }}
                                    </div>
                                </div>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider class="my-8"></v-divider>
                    <v-row>
                        <v-col cols="4">
                            <v-row>
                                <b>Work Location:</b>
                            </v-row>
                            <div v-if="IndividualEmployer.WorkLocation">

                                <v-row>
                                    <div class="data-container">
                                        <div class="data-tag my-3"
                                             v-if="IndividualEmployer.WorkLocation.WorkLocationType">
                                            {{IndividualEmployer.WorkLocation.WorkLocationType.WorkLocationTypeName}}:
                                        </div>
                                        <div class="data-value">
                                            {{ IndividualEmployer.WorkLocation.WorkLocationName }}
                                        </div>
                                    </div>
                                </v-row>
                                <div v-if="IndividualEmployer.WorkLocation.ParentWorkLocation">
                                    <v-row>
                                        <div class="data-container">
                                            <div class="data-tag"
                                                 v-if="IndividualEmployer.WorkLocation.ParentWorkLocation.WorkLocationType">
                                                {{IndividualEmployer.WorkLocation.ParentWorkLocation.WorkLocationType.WorkLocationTypeName}}:
                                            </div>
                                            <div class="data-value">
                                                {{
                                                IndividualEmployer.WorkLocation.ParentWorkLocation.WorkLocationName
                                                }}
                                            </div>
                                        </div>
                                    </v-row>
                                    <div
                                        v-if="IndividualEmployer.WorkLocation.ParentWorkLocation.ParentWorkLocation">
                                        <v-row>
                                            <div class="data-container">
                                                <div class="data-tag"
                                                     v-if="IndividualEmployer.WorkLocation.ParentWorkLocation.ParentWorkLocation.WorkLocationType">
                                                    {{IndividualEmployer.WorkLocation.ParentWorkLocation.ParentWorkLocation.WorkLocationType.WorkLocationTypeName}}:
                                                </div>
                                                <div class="data-value">
                                                    {{
                                                    IndividualEmployer.WorkLocation.ParentWorkLocation.ParentWorkLocation.WorkLocationName
                                                    }}
                                                </div>
                                            </div>
                                        </v-row>
                                    </div>
                                </div>

                            </div>
                        </v-col>
                        <v-col cols="4">
                            <v-row>
                                <b>Work Structure:</b>
                            </v-row>
                            <div v-if="IndividualEmployer.WorkStructure">

                                <v-row>
                                    <div class="data-container">
                                        <div class="data-tag"
                                             v-if="IndividualEmployer.WorkStructure.WorkStructureType">
                                            {{IndividualEmployer.WorkStructure.WorkStructureType.WorkStructureTypeName}}:
                                        </div>
                                        <div class="data-value">
                                            {{ IndividualEmployer.WorkStructure.WorkStructureName }}
                                        </div>
                                    </div>
                                </v-row>
                                <div v-if="IndividualEmployer.WorkStructure.ParentWorkStructure">
                                    <v-row>
                                        <div class="data-container">
                                            <div class="data-tag"
                                                 v-if="IndividualEmployer.WorkStructure.ParentWorkStructure.WorkStructureType">
                                                {{IndividualEmployer.WorkStructure.ParentWorkStructure.WorkStructureType.WorkStructureTypeName}}:
                                            </div>
                                            <div class="data-value">
                                                {{
                                                IndividualEmployer.WorkStructure.ParentWorkStructure.WorkStructureName
                                                }}
                                            </div>
                                        </div>
                                    </v-row>
                                    <div
                                        v-if="IndividualEmployer.WorkStructure.ParentWorkStructure.ParentWorkStructure">
                                        <v-row>
                                            <div class="data-container">
                                                <div class="data-tag"
                                                     v-if="IndividualEmployer.WorkStructure.ParentWorkStructure.ParentWorkStructure.WorkStructureType">
                                                    {{IndividualEmployer.WorkStructure.ParentWorkStructure.ParentWorkStructure.WorkStructureType.WorkStructureTypeName}}:
                                                </div>
                                                <div class="data-value">
                                                    {{
                                                    IndividualEmployer.WorkStructure.ParentWorkStructure.ParentWorkStructure.WorkStructureName
                                                    }}
                                                </div>
                                            </div>
                                        </v-row>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="4">
                            <v-row>
                                <b>Job Class:</b>
                            </v-row>
                            <v-row>
                                <div class="data-container">
                                    <div class="data-tag">Local Job Class:</div>
                                    <div class="data-value" v-if="IndividualEmployer.LocalJobClass">
                                        {{ IndividualEmployer.LocalJobClass.LocalJobClassName }}
                                    </div>
                                    <div class="data-tag">National Job Class:</div>
                                    <div class="data-value"
                                         v-if="IndividualEmployer.LocalJobClass && IndividualEmployer.LocalJobClass.NationalJobClass">
                                        {{ IndividualEmployer.LocalJobClass.NationalJobClass.NationalJobClassName }}
                                    </div>
                                </div>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { compareAsc } from 'date-fns';
    export default {
        name: "ViewEmployersComponent",

        props: {
            individual: {
                type: Object,
                required: true
            },
            individualEmployers: {
                type: Array,
                required: true
            }
        },
        methods: {
            isLocked(IndividualEmployer) {
                return IndividualEmployer.EndDate && compareAsc(new Date(), IndividualEmployer.EndDate) > 0;
            },
            getClass(individualEmployer) {
                return this.isLocked(individualEmployer) ? 'past-relationship' : 'current-relationship';
            }
        },
        mounted() {
            this.id = this.$route.params.id;
        },
        watch: {
            individual: {
                deep: true,
                handler(value) {
                    // this.individual = value;
                    return value;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
