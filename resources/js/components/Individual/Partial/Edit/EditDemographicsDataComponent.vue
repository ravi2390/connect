<template>
    <v-card>
        <v-card-title v-if="!editMode">Demographics</v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <div class="data-container">
                        <v-label>Date of Birth:</v-label>
                        <v-row>
                            <v-col cols="12" lg="3">
                                <v-select
                                    :items="months"
                                    label="Month"
                                    item-value="value"
                                    :readonly="readOnly"
                                    item-title="label"
                                    v-model="computedMonthOfBirth"
                                    variant="underlined"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" lg="2">
                                <v-select
                                    :items="dates"
                                    label="Day"
                                    item-value="value"
                                    :readonly="readOnly"
                                    item-title="label"
                                    v-model="computedDayOfBirth"
                                    variant="underlined"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" lg="3">
                                <v-select
                                    :items="years"
                                    label="Year"
                                    item-value="value"
                                    :readonly="readOnly"
                                    item-title="label"
                                    v-model="computedYearOfBirth"
                                    variant="underlined"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="3">
                    <v-select
                        label="Gender"
                        :readonly="readOnly"
                        :items="genders"
                        item-value="GenderId"
                        item-title="GenderName"
                        v-model="editableIndividual.GenderId"
                        variant="underlined"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="3">
                    <v-select
                        label="Marital Status"
                        :readonly="readOnly"
                        :items="maritalStatus"
                        item-value="MaritalStatusId"
                        item-title="MaritalStatusName"
                        v-model="editableIndividual.MaritalStatusId"
                        variant="underlined"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="3">
                    <v-select
                        label="Dependents"
                        :readonly="readOnly"
                        :items="dependents"
                        item-value="value"
                        item-title="label"
                        v-model="editableIndividual.Dependents"
                        variant="underlined"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="3">
                    <v-select
                        label="Education Level"
                        :items="educationLevels"
                        item-value="LocalEducationLevelId"
                        item-title="LocalEducationLevelName"
                        v-model="editableIndividual.LocalEducationLevelId"
                        variant="underlined"
                    ></v-select>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions v-if="editMode && !readOnly">
           <v-spacer></v-spacer>
            <v-btn @click="$emit('cancel-edit-demographics')" variant="elevated">Cancel</v-btn>
            <v-btn color="success" href="" @click="saveData()" variant="elevated">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { clone } from "lodash-es";
    export default {
        name: "EditDemographicsDataComponent",
        props: {
            individual: {
                type: Object,
                required: true
            },
            editMode: {
                type: Boolean,
                required: true
            },
            readOnly: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                years: [],
                months: [
                    {
                        label: 'January',
                        value: 1
                    },
                    {
                        label: 'February',
                        value: 2
                    },
                    {
                        label: 'March',
                        value: 3
                    },
                    {
                        label: 'April',
                        value: 4
                    },
                    {
                        label: 'May',
                        value: 5
                    },
                    {
                        label: 'June',
                        value: 6
                    },
                    {
                        label: 'July',
                        value: 7
                    },
                    {
                        label: 'August',
                        value: 8
                    },
                    {
                        label: 'September',
                        value: 9
                    },
                    {
                        label: 'October',
                        value: 10
                    },
                    {
                        label: 'November',
                        value: 11
                    },
                    {
                        label: 'December',
                        value: 12
                    },
                ],
                dates: [],
                genders: [],
                maritalStatus: [],
                educationLevels: [],
                dependents: [],
                editableIndividual: {},
                aggregatedFields: {},
            }
        },
        mounted() {
            axios.get('/api/v2/gender').then((response) => {
                this.genders = response.data.data;
            });

            axios.get('/api/v2/maritalStatus').then((response) => {
                this.maritalStatus = response.data.data;
            });

            if (this.selectedAffiliate) {
                axios.get('/api/v2/localEducationLevel?filter[AffiliateId]=' + this.selectedAffiliate).then((response) => {
                    this.educationLevels = response.data.data;
                });
            }

            this.editableIndividual = this.individual.IndividualId ? clone(this.individual) : this.individual;
            this.editableIndividual.LocalEducationLevelId = (this.editableIndividual.individualEducationLevels && this.editableIndividual.individualEducationLevels.length > 0) ? this.editableIndividual.individualEducationLevels[0].LocalEducationLevelId : null;
            this.setupStaticData();
        },
        computed: {
            loading() {
                return (this.editMode) ? typeof this.individual.FirstName === 'undefined' : false;
            },
            selectedAffiliate() {
                return this.$store.getters['user/selectedAffiliate'].AffiliateId;
            },
            computedMonthOfBirth: {
                get() {
                    return this.editableIndividual.MonthOfBirth;
                },
                set(value) {
                    this.editableIndividual.MonthOfBirth = value;
                }
            },
            computedDayOfBirth: {
                get() {
                    return this.editableIndividual.DayOfBirth;
                },
                set(value) {
                    this.editableIndividual.DayOfBirth = value;
                }
            },
            computedYearOfBirth: {
                get() {
                    return this.editableIndividual.YearOfBirth;
                },
                set(value) {
                    this.editableIndividual.YearOfBirth = value;
                }
            },
        },
        watch: {
            individual: {
                handler(newVal) {
                    this.$nextTick(() => {
                        this.editableIndividual.MonthOfBirth = newVal.MonthOfBirth;
                        this.editableIndividual.DayOfBirth = newVal.DayOfBirth;
                        this.editableIndividual.YearOfBirth = newVal.YearOfBirth;

                        if (newVal.individualEducationLevels && newVal.individualEducationLevels.length > 0) {
                            this.editableIndividual.LocalEducationLevelId = newVal.individualEducationLevels[0].LocalEducationLevelId;
                        }
                    });
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            setupStaticData() {
                for (let i = 1; i <= 31; i++) {
                    this.dates.push({
                        label: i.toString(),
                        value: i
                    });
                }
                for (let i = 1; i <= 20; i++) {
                    this.dependents.push({
                        label: i.toString(),
                        value: i
                    });
                }
                this.dates = [...this.dates];
                this.dependents = [...this.dependents];
                for (let i = 1900; i <= new Date().getFullYear(); i++) {
                    this.years.push({
                        label: i.toString(),
                        value: i
                    });
                }
                this.years = [...this.years];
            },
            saveData() {
                if (this.editMode) {

                    let individualEducationalLevel = {
                        IndividualEducationalLevelId: this.editableIndividual.individualEducationLevels && this.editableIndividual.individualEducationLevels.length > 0 ? this.editableIndividual.individualEducationLevels[0].IndividualEducationLevelId : null,
                        IndividualId: this.individual.IndividualId,
                        AffiliateId: this.selectedAffiliate,
                        LocalEducationLevelId: this.editableIndividual.LocalEducationLevelId
                    };

                    axios.put('/api/v2/individual/' + this.individual.IndividualId + '?include=individualAffiliates.Affiliate,Gender,MaritalStatus,individualEducationLevels,individualEducationLevels.LocalEducationLevel', {
                        MonthOfBirth: this.editableIndividual.MonthOfBirth,
                        DayOfBirth: this.editableIndividual.DayOfBirth,
                        YearOfBirth: this.editableIndividual.YearOfBirth,
                        GenderId: this.editableIndividual.GenderId,
                        MaritalStatusId: this.editableIndividual.MaritalStatusId,
                        Dependents: this.editableIndividual.Dependents,
                        IndividualEducationalLevel: individualEducationalLevel,
                    }).then((response) => {
                        this.afterSave(response.data.data);
                    }).finally();
                }
            },

            afterSave(data) {
                this.editableIndividual = data;
                this.$emit('saved-demographics', clone(data));
            },
        }
    }
</script>

<style scoped>

</style>
