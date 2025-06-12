<template>
    <v-container>
        <v-row>
            <h5>
                Job Details
            </h5>
        </v-row>
        <v-row>
            <v-autocomplete
                v-model="localJobClassId"
                v-model:search="searchTerm"
                :items="jobClasses"
                item-title="LocalJobClassName"
                item-value="LocalJobClassId"
                persistent-hint
                :rules="[rules.required]"
                variant="underlined"
            >
                <template #label>
                    <span v-if="rules.required" class="text-red">* </span>Local Job Class
                </template>
            </v-autocomplete>
        </v-row>
        <v-row>
            <v-autocomplete
                clearable
                label="Job Title"
                :items="jobTitles"
                item-value="JobTitleId"
                item-title="JobTitleName"
                v-model="selectedJobTitleId"
                variant="underlined"
            ></v-autocomplete>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: "JobClassChooser",
    props: {
        jobClassId: {
            required: true
        },
        jobTitleId: {
            required: true
        },
        unitId: {
            required: true
        },
        rules: {
            default: {}
        }
    },
    data: () => ({
        isLoading: false,
        jobClasses: [],
        jobTitles: [],
        searchTerm: ''
    }),
    computed: {
        localJobClassId: {
            get() {
                return this.jobClassId;
            },
            set(newValue) {
                this.$emit('selected-job-class', newValue);
                this.doLoadJobTitles(newValue);
            }
        },
        selectedJobTitleId: {
            get() {
                return this.jobTitleId;
            },
            set(newValue) {
                this.$emit('selected-job-title', newValue);
            }
        }
    },
    methods: {
        doLoad(val) {
            //if empty search is done
            if (!val) {
                this.jobClasses = [];
                return;
            }

            const nameFilter = (this.searchTerm && this.searchTerm != '') ? '&filter[LocalJobClass.LocalJobClassName]=' + this.searchTerm : '';

            // delay new call 500ms
            axios.get('/api/v2/localJobClass?per_page=200&filter[LocalJobClass.UnitId]=' + this.unitId + nameFilter + '&sort=LocalJobClassName').then((response) => {
                this.jobClasses = response.data.data;
            });
        },
        doLoadJobTitles(jobClassId) {
            if (!jobClassId) {
                this.jobTitles = [];
                return;
            }
            axios.get('/api/v2/jobTitle?per_page=200&filter[LocalJobClassId]=' + jobClassId + '&sort=JobTitleName').then((response) => {
                this.jobTitles = response.data.data;
            });
        }
    },
    watch: {
        unitId (val) {
            this.doLoad(val);
            return val;
        },
        jobClassId (val) {
            this.doLoadJobTitles(val);
        },
        searchTerm (val) {
            this.doLoad(this.unitId);
        },
    }
}
</script>
