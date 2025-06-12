<template>
    <v-row>
        <v-col cols="auto">
            <v-text-field
                v-model="value.firstName"
                :disabled="disabled"
                label="First Name"
                @update:model-value="$emit('input', value)"
            />
        </v-col>
        <v-col cols="auto">
            <v-text-field
                v-model="value.middleName"
                :disabled="disabled"
                label="MI"
                @update:model-value="$emit('input', value)"
            />
        </v-col>
        <v-col cols="auto">
            <v-text-field
                v-model="value.lastName"
                :disabled="disabled"
                label="Last Name"
                @update:model-value="$emit('input', value)"
            />
        </v-col>
        <v-col cols="auto">
            <v-text-field
                v-model="value.preferredName"
                :disabled="disabled"
                label="Preferred Name"
                @update:model-value="$emit('input', value)"
            />
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'FullName',
    props: {
        value: { type: Object, default: () => ({}) },
        disabled: { type: Boolean, default: false },
    },
};
</script>
