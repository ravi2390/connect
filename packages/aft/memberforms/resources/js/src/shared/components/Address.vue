<template>
    <v-row>
        <v-col
            cols="12"
        >
            <v-text-field
                v-model="value.addressLine1"
                density="compact"
                required
                label="Address 1"
                @update:model-value="$emit('input', value)"
            />
        </v-col>
        <v-col
            cols="12"
        >
            <v-text-field
                v-model="value.addressLine2"
                density="compact"
                label="Address 2 (Optional)"
                @update:model-value="$emit('input', value)"
            />
        </v-col>

        <v-col
            cols="12"
            sm="6"
            md="4"
        >
            <v-text-field
                v-model="value.city"
                label="City"
                required
                density="compact"
                @update:model-value="$emit('input', value)"
            />
        </v-col>

        <v-col
            cols="12"
            sm="6"
            md="4"
        >
            <v-text-field
                v-model="value.state"
                label="State"
                required
                density="compact"
                @update:model-value="$emit('input', value)"
            />
        </v-col>

        <v-col
            cols="12"
            sm="6"
            md="4"
        >
            <v-text-field
                v-model="value.zip"
                label="ZipCode"
                required
                density="compact"
                @update:model-value="$emit('input', value)"
            />
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'Address',
    props: {
        type: {
            type: [String, Object, Array],
            default: '',
        },
        value: {
            type: [Object, Array, String],
            default: '',
        },
        obj: {
            type: [Object, Array, Function],
            default: undefined,
        },
    },
    emits: ['input'],
};
</script>
