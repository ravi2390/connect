<template>
    <v-container
        fluid
        class="checkbox-label"
    >
        <v-row
            v-if="designer"
            :class="{ 'editable-comp': designer }"
        >
            <v-col>
                <v-row>
                    <v-col
                        class="d-flex"
                        cols="12" sm="8"
                    >
                        <v-select
                            v-if="designer"
                            v-model="selectionTypeValue"
                            :items="selectionTypeItems"
                            item-title="name"
                            item-value="value"
                            single-line
                            variant="outlined"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        md="12"
                        class="single-label"
                    >
                        <v-textarea
                            v-model="selectionChoicesModel"
                            variant="outlined"
                            clearable
                            name="input-textarea"
                            label="Enter choices (hit enter to separate choices)"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-if="!designer">
            <v-col
                cols="12"
                class="py-0"
            >
                <h4>{{ selectionTitle }}</h4>
            </v-col>
            <v-col
                v-if="field.required"
                class="d-flex"
                cols="12"
            >
                <span>
                    <strong class="text-red">
                        *
                    </strong>
                    {{ `This item is` + (field.required ? ' required)' : '') }}
                </span>
            </v-col>
            <v-col v-if="modelValue.selectionType === 'multiSelection'">
                <v-checkbox
                    v-for="n in modelValue.selectionChoices.length"
                    :key="modelValue.selectionChoices[n-1]"
                    v-model="selectionChoicesAnswer"
                    :label="`${modelValue.selectionChoices[n-1]}`"
                    :value="modelValue.selectionChoices[n-1]"
                    :rules="required ? validationRules : []"
                    hide-details
                />
            </v-col>
            <v-col v-else-if="modelValue.selectionType === 'singleSelection'">
                <v-radio-group
                    v-for="n in modelValue.selectionChoices.length"
                    :key="modelValue.selectionChoices[n-1]"
                    v-model="selectionChoicesAnswer"
                    :rules="required ? validationRules : []"
                    hide-details
                >
                    <v-radio
                        :label="`${modelValue.selectionChoices[n-1]}`"
                        :value="modelValue.selectionChoices[n-1]"
                    />
                </v-radio-group>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { debounce } from 'lodash-es';

export default {
    name: 'MfpCustomSelectionField',
    props: {
        modelValue: { type: Object, default() { return { selectionType: '', selectionChoices: [] }; } },
        label: { type: String, default: 'MFP Custom Field' },
        required: { type: Boolean, default: false },
        field: { type: Object, default: () => {} },
        designer: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    data: () => ({
        selectionTypeItems: [
            { name: 'Single Selection', value: 'singleSelection' },
            { name: 'Multi Selection', value: 'multiSelection' },
        ],
        selectionTypeValue: 'singleSelection',
        selectionChoicesModel: '',
        selectionChoicesAnswer: [],
    }),
    computed: {
        selectionTitle() {
           this.modelValue.selectionType === 'singleSelection' ? 'Single Selection' : 'Multi Selection'
        },
        validationRules() {
            return [
                this.selectionChoicesAnswer.length > 0 || 'At least one item should be selected',
            ];
        },
    },
    watch: {
        selectionTypeValue() {
            this.change();
        },
        selectionChoicesModel() {
            this.change();
        },
        selectionChoicesAnswer() {
            this.change();
        },
    },
    mounted() {
        this.selectionTypeValue = this.modelValue.selectionType;
        this.selectionChoicesModel = this.convertToString(this.modelValue.selectionChoices);
        this.change = debounce(() => {
            this.$emit('update:modelValue', this.getSelectionObject());
        }, 500);
    },
    methods: {
        getSelectionObject() {
            return {
                selectionType: (this.selectionTypeValue && this.selectionTypeValue !== '') ? this.selectionTypeValue : 'singleSelection',
                selectionChoices: this.convertToArray(this.selectionChoicesModel),
                selectionChoicesAnswer: this.selectionChoicesAnswer,
            };
        },
        convertToArray(stringData) {
            if (stringData !== '') {
                return stringData.split('\n');
            }
            return [];
        },
        convertToString(arrayData) {
            if (typeof arrayData === 'object') {
                const newArrayData = arrayData.filter((el) => (
                    el !== ''
                ));
                return newArrayData.join('\n');
            }
            return '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .checkbox-label {
        padding-top: 0;
    }
</style>
