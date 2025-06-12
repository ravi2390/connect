<template>
    <v-menu
        ref="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset="40"
        min-width="290px"
    >
        <template #activator="{ props }">
            <v-text-field
                v-model="date"
                :rules="rules"
                hint="YYYY-MM-DD"
                prepend-icon="mdi:mdi-calendar"
                :required="field.required || false"
                maxlength="10"
                :disabled="designer"
                variant="underlined"
                clearable
                v-bind="props"
                @change="save"
            >
                <template #label>
                    <span
                        v-if="field.required"
                        class="text-red"
                    >
                        <strong>* </strong>
                    </span>
                    {{ field.label + (field.required ? ' (required)' : '') }}
                </template>
            </v-text-field>
        </template>
        <v-date-picker
            :min="minDate"
            :max="field.fieldName === 'dateOfBirth' ? maxDate : null"
            @update:model-value="handleChange"
        />
    </v-menu>
</template>

<script>
import { format, isValid } from "date-fns";

export default {
    name: 'DateOfBirth',
    props: {
        modelValue: { type: String, default: '' },
        field: { type: Object, required: true },
        designer: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    data: () => ({
        date: null,
        minDate: new Date('1950-01-01').toISOString(),
        maxDate: new Date().toISOString(),
        rules: [
            (v) => (!v || /^(\d{4})-(\d{2})-(\d{2})+$/.test(v)) || 'Date must be valid (YYYY-MM-DD)',
            (v) => (!v || isValid(new Date(v)) || 'Please enter a valid date'),
        ],
    }),
    onMounted() {
        this.date = this.modelValue;
    },
    methods: {
        handleChange(date) {
            this.date = format(new Date(date), 'yyyy-MM-dd');
            this.save();
        },
        save() {
            this.$emit('update:modelValue', this.date);
        },
    },
};
</script>
