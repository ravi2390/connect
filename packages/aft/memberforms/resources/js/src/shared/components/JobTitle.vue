<template>
    <v-row>
        <v-col>
            <v-row>
                <v-col>
                    <span v-if="field.required">
                        <strong class="text-red">
                            *
                        </strong>
                    </span>
                    {{ (field.required ? ' (required)' : '') }}
                    <strong v-if="!localJobClassId && designer">
                        This field must be placed on the form after the Employment Information field in order to work
                        properly
                    </strong>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <FormSearchSelector
                        ref="jobTitleSelector"
                        v-model="jobTitleId"
                        label="Job Title"
                        item-value="JobTitleId"
                        search-type="jobTitle"
                        :search-args="{ localJobClassId: localJobClassId }"
                        item-title="JobTitleName"
                        :disabled="!localJobClassId"
                        outlined
                        clearable
                    />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>

import FormSearchSelector from '../../public/FormSearchSelector.vue';

export default {
    name: 'JobTitle',
    components: { FormSearchSelector },
    props: {
        field: { type: Object, default: () => {} },
        label: { type: String, default: 'MFP Select Field' },
        required: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        designer: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    data: () => ({
        jobTitleId: null,
        localJobClassId: null,
        storeData: [],
    }),
    watch: {
        field: {
            deep: true,
            handler() {
                console.log('field', this.field);
                this.storeData = this.field.source;
                if (this.localJobClassId !== this.storeData.localJobClassId) {
                    this.jobTitleId = null;
                }
                this.localJobClassId = this.storeData.localJobClassId;
            },
        },
        jobTitleId: {
            handler() {
                this.change();
            },
        },
    },
    mounted() {
        this.storeData = this.field.source;
        if (this.storeData) {
            this.localJobClassId = this.storeData.localJobClassId;

            this.$emit('update:modelValue', {
                jobTitleId: this.jobTitleId,
                localJobClassId: this.localJobClassId,
            });
        }
    },
    methods: {
        change() {
            this.$emit('update:modelValue', {
                jobTitleId: this.jobTitleId,
                localJobClassId: this.localJobClassId,
            });
        },
    },
};
</script>
