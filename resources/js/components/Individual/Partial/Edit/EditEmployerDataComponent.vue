<template>
    <v-card>
        <v-card-title>{{ pageTitle }}</v-card-title>
        <v-form ref="form">
            <v-card-text>
                <v-row>
                    <v-col cols="12" lg="8">
                        <v-autocomplete
                            v-model="selectedEmployerId"
                            :items="employers"
                            item-title="EmployerName"
                            item-value="EmployerId"
                            persistent-hint
                            :rules="[rules.required]"
                            :readonly="editMode"
                            :disabled="editMode"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="rules.required" class="text-red">* </span>Search for an employer
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-autocomplete
                            :items="units"
                            item-value="UnitId"
                            item-title="UnitName"
                            v-model="selectedUnitId"
                            :rules="[rules.required]"
                            :readonly="editMode"
                            :disabled="editMode"
                            variant="underlined"
                        >
                            <template #label>
                                <span v-if="rules.required" class="text-red">* </span>Unit
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4">
                        <work-location-chooser :employer-id="selectedEmployerId" :value="WorkLocationId" v-on:selected-work-location="setWorkLocationId($event)"></work-location-chooser>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <work-structure-chooser :employer-id="selectedEmployerId" :value="WorkStructureId" v-on:selected-work-structure="setWorkStructureId($event)"></work-structure-chooser>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <job-class-chooser
                            :unit-id="selectedUnitId"
                            :job-class-id="editableIndividualEmployer.LocalJobClassId"
                            :job-title-id="editableIndividualEmployer.JobTitleId"
                            :rules="rules"
                            v-on:selected-job-class="setPropertyValue('LocalJobClassId', $event)"
                            v-on:selected-job-title="setPropertyValue('JobTitleId', $event)"
                        ></job-class-chooser>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Employee ID" v-model="editableIndividualEmployer.EmployeeId" variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Job Description" v-model="editableIndividualEmployer.JobDescription" variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Room Number" v-model="editableIndividualEmployer.RoomNumber" variant="underlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-menu
                                v-model="menuHireDate"
                                :close-on-content-click="false"
                                :offset="40"
                                transition="scale-transition"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ props }">
                                    <v-text-field
                                        v-model="editableIndividualEmployer.HireDate"
                                        hint="YYYY-MM-DD"
                                        label="Hire Date"
                                        v-bind="props"
                                        variant="underlined"
                                    ></v-text-field>
                                </template>
                                <v-date-picker :max="maxHireDate?maxHireDate:editableIndividualEmployer.StartDate" @update:model-value="updateHireDate" color="primary" no-title scrollable></v-date-picker>
                            </v-menu>
                        </div>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-menu
                                v-model="menuStartDate"
                                :close-on-content-click="false"
                                :offset="40"
                                transition="scale-transition"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ props }">
                                    <v-text-field
                                        :rules="[rules.required]"
                                        v-model="editableIndividualEmployer.StartDate"
                                        hint="YYYY-MM-DD"
                                        v-bind="props"
                                        variant="underlined"
                                    >
                                        <template #label>
                                            <span v-if="rules.required" class="text-red">* </span>Start Date
                                        </template>
                                    </v-text-field>
                                </template>
                                <v-date-picker :min="minStartDate" @update:model-value="updateStartDate" color="primary"></v-date-picker>
                            </v-menu>
                        </div>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-menu
                                v-model="menuEndDate"
                                :close-on-content-click="false"
                                :offset="40"
                                transition="scale-transition"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ props }">
                                    <v-text-field
                                        v-model="editableIndividualEmployer.EndDate"
                                        hint="YYYY-MM-DD"
                                        label="End Date"
                                        v-bind="props"
                                        variant="underlined"
                                    ></v-text-field>
                                </template>
                                <v-date-picker @update:model-value="updateEndDate" color="primary" no-title scrollable></v-date-picker>
                            </v-menu>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-select
                                clearable
                                label="Subject"
                                :items="subjects"
                                item-value="SubjectId"
                                item-title="SubjectName"
                                v-model="editableIndividualEmployer.SubjectId"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-text-field label="Source" v-model="editableIndividualEmployer.Source" variant="underlined"></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <div class="data-container">
                            <v-text-field label="Stop reason" v-model="editableIndividualEmployer.StopReason" variant="underlined"></v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="3" class="switches">
                        <v-switch color="accent" label="Part Time" v-model="editableIndividualEmployer.IsPartTime"></v-switch>
                    </v-col>
                    <v-col cols="12" lg="3" class="switches">
                        <v-switch color="accent" label="Is Tenured" v-model="editableIndividualEmployer.IsTenured"></v-switch>
                    </v-col>
                    <v-col cols="12" lg="3" class="switches">
                        <v-switch color="accent" label="Preferred" :model-value="isPreferred" @update:model-value="onIsPreferred"></v-switch>
                    </v-col>
                    <v-col cols="12" lg="3" class="switches">
                        <v-switch color="accent" v-show="false" label="Currently Working" v-model="editableIndividualEmployer.CurrentlyWorking"></v-switch>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="3">
                        <v-text-field label="Position Id" v-model="editableIndividualEmployer.PositionId" variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                        <div class="data-container">
                            <v-text-field label="Full Time Equivalent(Use 0 to 100)" v-model="editableIndividualEmployer.FullTimeEquivalent" variant="underlined"></v-text-field>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions v-if="!readOnly && showSaveButton">
                <v-spacer></v-spacer>
                <v-btn @click="$emit('cancel-edit-employer')" variant="elevated">Cancel</v-btn>
                <v-btn color="success" @click="saveData()" variant="elevated">Save</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    import { format, formatISO } from "date-fns";
import { clone } from "lodash-es";
import JobClassChooser from "../../../Employer/Partial/JobClassChooser";
import WorkLocationChooser from "../../../Employer/Partial/WorkLocationChooser";
import WorkStructureChooser from "../../../Employer/Partial/WorkStructureChooser";
    export default {
        name: "EditEmployerDataComponent",
        components: {JobClassChooser, WorkStructureChooser, WorkLocationChooser},
        props: {
            individualEmployer: {
                type: Object,
                required: true
            },
            individual: {
                type: Object,
                required: true
            },
            readOnly: {
                type: Boolean,
                required: true
            },
            editMode: {
                type: Boolean,
                required: true
            },
            showSaveButton: {
                type: Boolean,
                default: true
            },
            selectedEmployer: {
                type: Number,
                required: false,
                default:null
            },
            selectedUnit: {
                type: Number,
                required: false,
                default:null
            },
            WorkLocation: {
                type: Number,
                required: false,
                default:null
            },
            WorkStructure: {
                type: Number,
                required: false,
                default:null
            }
        },
        watch: {
            editMode:{
                handler (value) {
                    if(!value) {
                        this.editableIndividualEmployer = null;
                        this.selectedEmployerId = this.selectedUnitId = null;
                    }
                }
            },
            selectedEmployerId: {
                handler(value) {
                    if (value && value !== this.editableIndividualEmployer.EmployerId) {
                        this.editableIndividualEmployer.EmployerId = value;
                        this.loadOptions(value);
                    }
                    return value;
                },
                deep: true
            },
            selectedUnitId: {
                handler(value) {
                    if (value && value !== this.editableIndividualEmployer.UnitId) {
                        this.editableIndividualEmployer.UnitId = value;
                    }
                    return value;
                },
                deep: true
            },
            WorkLocation: {
                handler(value) {
                    if (value && value !== this.WorkLocationId) {
                        this.WorkLocationId = value;
                    }
                }
            },
            WorkStructure: {
                handler(value) {
                    if (value && value !== this.WorkStructureId) {
                        this.WorkStructureId = value;
                    }
                }
            },
            selectedEmployer: {
                handler(value) {
                    if (value && value !== this.selectedEmployerId) {
                        this.selectedEmployerId = value;
                    }
                    console.log(value);
                }
            },
            selectedUnit: {
                handler(value) {
                    if (value && value !== this.selectedUnitId) {
                        this.selectedUnitId = value;
                    }
                }
            },
            individualEmployer: {
                handler (value) {
                    if (this.editableIndividualEmployer && this.editableIndividualEmployer.IndividualEmployerId === this.individualEmployer.IndividualEmployerId) {
                       return;
                    }
                    // this.individualEmployer = value;
                    this.editableIndividualEmployer = this.individualEmployer.IndividualEmployerId ? clone(value) : value;
                    if (this.individualEmployer.EmployerId) {
                        this.selectedEmployerId = this.individualEmployer.EmployerId;
                        this.selectedUnitId = this.editableIndividualEmployer.LocalJobClass ? this.editableIndividualEmployer.LocalJobClass.UnitId : null;
                        this.editableIndividualEmployer.UnitId = this.editableIndividualEmployer.LocalJobClass ? this.editableIndividualEmployer.LocalJobClass.UnitId : null;
                        this.loadOptions(this.individualEmployer.EmployerId);
                    } else {
                        this.selectedEmployerId = (this.employers && this.employers.length === 1) ? this.employers[0].EmployerId : null;
                        this.editableIndividualEmployer.EmployerId = this.selectedEmployerId;
                    }
                    if (this.editableIndividualEmployer.HireDate) {
                        this.editableIndividualEmployer.HireDate = this.editableIndividualEmployer.HireDate.split('T')[0];
                    }
                    if (this.editableIndividualEmployer.StartDate) {
                        this.editableIndividualEmployer.StartDate = this.editableIndividualEmployer.StartDate.split('T')[0];
                    }
                    if (this.editableIndividualEmployer.EndDate) {
                        this.editableIndividualEmployer.EndDate = this.editableIndividualEmployer.EndDate.split('T')[0];
                    }
                    if (this.editableIndividualEmployer.StartDate) {
                        this.maxHireDate = this.editableIndividualEmployer.StartDate;
                    }
                    this.WorkStructureId = this.editableIndividualEmployer.WorkStructureId;
                    this.WorkLocationId = this.editableIndividualEmployer.WorkLocationId;
                },
                deep: true
            },
            editableIndividualEmployer: {
                handler (value) {
                    if (this.editableIndividualEmployer.HireDate) {
                        this.minStartDate = this.editableIndividualEmployer.HireDate;
                    }
                    if (this.editableIndividualEmployer.StartDate) {
                        this.maxHireDate = this.editableIndividualEmployer.StartDate;
                    }
                    if(!this.editableIndividualEmployer.HireDate){
                        // this.editableIndividualEmployer.HireDate = this.editableIndividualEmployer.StartDate;
                    }
                },
                deep: true

            }
        },
        data() {
            return {
                employers: [],
                subjects: [],
                units: [],
                editableIndividualEmployer: {},
                WorkStructureId: null,
                WorkLocationId: null,
                selectedEmployerId: null,
                selectedUnitId: null,
                minStartDate: null,
                maxHireDate: null,
                menuStartDate: false,
                menuEndDate: false,
                menuHireDate: false,
                rules: {
                    required: value => !!value || 'Required.'
                },
                valid: true,
            }
        },
        mounted() {
            axios.get('/api/v2/gender').then((response) => {
                this.genders = response.data.data;
            });

            if (this.selectedAffiliate) {
                axios.get('/api/v2/aggregate/employer/byaffiliate/' + this.selectedAffiliate.AffiliateId).then((response) => {
                    this.employers = response.data.data;
                });
                axios.get('/api/v2/subject?sort=SubjectName&filter[AffiliateId]' + this.selectedAffiliate.AffiliateId).then((response) => {
                    this.subjects = response.data.data;
                });
            }

            this.editableIndividualEmployer = this.individualEmployer.IndividualEmployerId ? clone(this.individualEmployer) : this.individualEmployer;
            this.WorkStructureId = this.editableIndividualEmployer.WorkStructureId;
            this.WorkLocationId = this.editableIndividualEmployer.WorkLocationId;
        },
        computed: {
            pageTitle() {
                if(!this.editMode) {
                    return 'Add Employer';
                }
                else {
                    return 'Edit Employer';
                }
            },
            loading() {
                return (this.editMode) ? typeof this.individualEmployer.FirstName === 'undefined' : false;
            },
            selectedAffiliate() {
                return this.$store.getters['user/selectedAffiliate'];
            },
            isPreferred() {
                return this.editableIndividualEmployer.IsPreferred == '1';
            }
        },
        methods: {
            updateStartDate(date) {
                this.editableIndividualEmployer.StartDate = format(date, 'yyyy-MM-dd');
                this.menuStartDate = false;
            },
            updateEndDate(date) {
                this.editableIndividualEmployer.EndDate = format(date, 'yyyy-MM-dd');
                this.menuEndDate = false;
            },
            updateHireDate(date) {
                this.editableIndividualEmployer.HireDate = format(date, 'yyyy-MM-dd');
                this.menuHireDate = false;
            },
            async saveData() {
                const formValidation = await this.$refs.form.validate()
                if (!formValidation.valid) {
                    return;
                }
                this.editableIndividualEmployer.IndividualId = this.individual.IndividualId;
                this.editableIndividualEmployer.StartDate = this.editableIndividualEmployer.StartDate ? this.editableIndividualEmployer.StartDate : formatISO(new Date());
                //this.editableIndividualEmployer.HireDate = this.editableIndividualEmployer.HireDate ? this.editableIndividualEmployer.HireDate : this.editableIndividualEmployer.StartDate;
                this.editableIndividualEmployer.FullTimeEquivalent = this.editableIndividualEmployer.FullTimeEquivalent ? parseInt(this.editableIndividualEmployer.FullTimeEquivalent): 0;
                this.editableIndividualEmployer.IsPreferred = this.editableIndividualEmployer.IsPreferred != '' ? this.editableIndividualEmployer.IsPreferred : false;
                if (this.individualEmployer && this.individualEmployer.IndividualEmployerId) {
                    axios.put('/api/v2/individualEmployer/' + this.individualEmployer.IndividualEmployerId + '?include=Employer,Subject,Unit,WorkLocation,WorkStructure,LocalJobClass,LocalJobClass.Unit,LocalJobClass.NationalJobClass,JobTitle', this.editableIndividualEmployer)
                        .then((response) => this.afterSave(response.data.data));
                } else {
                    this.editableIndividualEmployer.IsPartTime = !!this.editableIndividualEmployer.IsPartTime;
                    this.editableIndividualEmployer.IsTenured = !!this.editableIndividualEmployer.IsTenured;
                    this.editableIndividualEmployer.IsPreferred = !!this.editableIndividualEmployer.IsPreferred;
                    this.editableIndividualEmployer.CurrentlyWorking = true;
                    axios.post('/api/v2/individualEmployer' + '?include=Employer,Subject,Unit,WorkLocation,WorkStructure,LocalJobClass,LocalJobClass.Unit,LocalJobClass.NationalJobClass,JobTitle', this.editableIndividualEmployer).then((response) => this.afterSave(response.data.data));
                }
            },

            afterSave(data) {
                this.editableIndividualEmployer = {};
                this.$emit('saved-employer', data);
            },

            loadOptions(employerId) {
                axios.get('/api/v2/aggregate/employer/units/' + employerId).then((response) => {
                    this.units = response.data.data;
                });
            },

            setPropertyValue(propertyName, value) {
                this.editableIndividualEmployer[propertyName] = value;
            },

            setWorkStructureId(value) {
                this.editableIndividualEmployer['WorkStructureId'] = value;
                this.WorkStructureId  = value;
            },

            setWorkLocationId(value) {
                if(value === undefined) {
                    value = null;
                }
                this.editableIndividualEmployer['WorkLocationId'] = value;
                this.WorkLocationId  = value;
            },
            onIsPreferred(value) {
                this.editableIndividualEmployer.IsPreferred = value;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
