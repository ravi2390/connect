<template>
    <div>
    <v-card v-if="designer" variant="elevated" class="mb-2 elevation-4">
        <v-card-title
            class="genericTitle"
            color="aft-dark-blue"
        >
            <div class="d-flex ga-2">
                <v-icon
                    v-if="designer"
                    class="handle"
                    icon="mdi:mdi-arrow-up-down"
                />
                <div class="flex-1-0">
                    <MfpTextField
                        v-if="designer"
                        v-model="field.label"
                        :field="{}"
                        :designer="designer"
                        solo
                        class="mr-4"
                    />
                    <span v-else>
                        {{ field.label }}
                    </span>
                </div>
                <div>
                    <v-checkbox
                        v-if="designer"
                        v-model="fieldRequired"
                        :disabled="field.fixed"
                        :designer="designer"
                        label="Required"
                        class="mr-4"
                    />
                </div>
            </div>
        </v-card-title>
        <v-card-text>
            <FormSearchSelector
                v-if="!field.value.chapterId"
                ref="chapterSelector"
                v-model="field.value.chapterId"
                label="Select a Chapter"
                item-value="ChapterId"
                search-type="chapter"
                item-title="ChapterName"
                :disabled="true"
                outlined
            />
            <FormSearchSelector
                v-if="!field.value.employerId"
                ref="employerSelector"
                v-model="field.value.employerId"
                label="Select an Employer"
                item-value="EmployerId"
                search-type="employer"
                item-title="EmployerName"
                :disabled="true"
                outlined
            />
            <FormSearchSelector
                v-if="!field.value.unitId"
                ref="unitSelector"
                v-model="field.value.unitId"
                label="Select a Unit"
                item-value="UnitId"
                search-type="unit"
                item-title="UnitName"
                :disabled="true"
                outlined
                clearable
            />
            <FormSearchSelector
                v-if="!field.value.localJobClassId"
                ref="localJobClassSelector"
                v-model="field.value.localJobClassId"
                label="Local Job Class"
                item-value="LocalJobClassId"
                search-type="localJobClass"
                item-title="LocalJobClassName"
                :disabled="true"
                outlined
                clearable
            />
            <!-- <form-search-selector
                v-if="!jobTitleId"
                ref="jobTitleSelector"
                v-model="jobTitleId"
                label="Job Title"
                item-value="JobTitleId"
                search-type="jobTitle"
                item-text="JobTitleName"
                :disabled="true"
                outlined
                clearable
            /> -->
        </v-card-text>
    </v-card>
    <div v-else>
            <v-row v-if="(!field?.source?.employerId || !field?.source?.localJobClassId)">
                <v-col>
                    <span v-if="field.required">
                        <strong class="text-red">
                            *
                        </strong>
                    </span>
                    {{ field.label }} {{ (field.required ? ' (required)' : '') }}
                </v-col>
            </v-row>
            <v-row v-if="field?.source?.chapterId === null">
                <v-col>
                    <FormSearchSelector
                        ref="chapterSelector"
                        v-model="field.value.chapterId"
                        name="chapterId"
                        label="Choose a Chapter"
                        item-value="ChapterId"
                        search-type="chapter"
                        :search-args="{ affiliateId: field.value.affiliateId }"
                        item-title="ChapterName"
                        :disabled="!field.value.affiliateId || !!field.value.employerId"
                        outlined
                        :clearable="!field.value.employerId && !field.value.unitId"
                    />
                </v-col>
            </v-row>
            <v-row
                v-if="field?.source?.employerId === null"
            >
                <v-col>
                    <FormSearchSelector
                        ref="employerSelector"
                        v-model="field.value.employerId"
                        name="employerId"
                        label="Choose an Employer"
                        item-value="EmployerId"
                        search-type="employer"
                        :rules="[v => !!v || `Employer is required`]"
                        :search-args="{ chapterId: field.value.chapterId, selectedEmployerIds: field.value.employerId }"
                        item-title="EmployerName"
                        :disabled="!field.value.chapterId || !!field.value.unitId"
                        outlined
                        :clearable="!field.value.unitId"
                    />
                </v-col>
            </v-row>
            <v-row v-if="field?.source?.unitId === null">
                <v-col>
                    <FormSearchSelector
                        ref="unitSelector"
                        v-model="field.value.unitId"
                        name="unitId"
                        label="Choose a Unit"
                        item-value="UnitId"
                        search-type="unit"
                        :rules="[v => !!v || `Unit is required`]"
                        :search-args="{ employerId: searchableEmployerId }"
                        item-title="UnitName"
                        :disabled="!field.value.employerId"
                        outlined
                        clearable
                    />
                </v-col>
            </v-row>
            <v-row v-if="field?.source?.localJobClassId === null">
                <v-col>
                    <FormSearchSelector
                        ref="localJobClassSelector"
                        v-model="field.value.localJobClassId"
                        label="Local Job Class"
                        item-value="LocalJobClassId"
                        search-type="localJobClass"
                        :rules="[v => !!v || `Local Job Class is required`]"
                        :search-args="{ unitId: field.value.unitId }"
                        item-title="LocalJobClassName"
                        :disabled="!field.value.unitId"
                        outlined
                        clearable
                    />
                </v-col>
            </v-row>
            <!-- <v-row v-if="storeData && storeData.localJobClassId === null">
                <v-col>
                    <form-search-selector
                        ref="jobTitleSelector"
                        v-model="jobTitleId"
                        label="Job Title"
                        item-value="JobTitleId"
                        search-type="jobTitle"
                        :search-args="{ localJobClassId: localJobClassId }"
                        item-text="JobTitleName"
                        :disabled="!localJobClassId"
                        outlined
                        clearable
                    />
                </v-col>
            </v-row> -->
    </div>
    </div>
</template>

<script>
import FormSearchSelector from '../../public/FormSearchSelector.vue';
import MfpTextField from "./MfpTextField.vue";

export default {
    name: 'MfpWorkLocation',
    components: { FormSearchSelector, MfpTextField },
    props: {
        field: { type: Object, required: true, default: { value: {} } },
        designer: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
    },
    data: () => ({
        activeEditTemplate: {},
        fieldRequired: true,
    }),
    computed: {
        searchableEmployerId() {
            return Array.isArray(this.field.value.employerId)
                ? parseInt(this.field.value.employerId[0])
                : parseInt(this.field.value.employerId);
        }
    },
    created() {
        // @todo: gah what is this
        if (this.designer) {
            this.activeEditTemplate = JSON.parse(localStorage.formBuilderActiveTemplate);
            this.field.value = {
                chapterId: this.activeEditTemplate.chapterId || null,
                employerId: this.activeEditTemplate.employerId || null,
                unitId: this.activeEditTemplate.unitId || null,
                localJobClassId: this.activeEditTemplate.localJobClassId || null,
                jobTitleId: this.activeEditTemplate.jobTitleId || null,
            }
        }
        else {
            const values = { ...this.field.source };
            // If employerId is an array it will throw a 500 in the API.
            if (values.employerId) {
                if (Array.isArray(values.employerId)) {
                    values.employerId = parseInt(values.employerId[0]);
                }
            }
            this.field.value = values;
        }
    },
};
</script>

<style lang="scss">

</style>
