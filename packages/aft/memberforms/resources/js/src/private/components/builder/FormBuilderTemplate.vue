<template>
    <v-card class="flex d-flex flex-column">
        <v-card-title>{{ label }}</v-card-title>
        <v-card-text class="flex">
            {{ description }}
        </v-card-text>
        <v-card-actions class="templateButton">
            <v-btn
                variant="elevated"
                color="primary"
                :data-template-id="id"
                @click="$emit('update:modelValue', id)"
            >
                Select
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'FormBuilderTemplate',
    emits: ['update:modelValue'],
    props: {
        id: { type: Number, required: true },
        label: { type: String, required: true },
        description: { type: String, default: '' },
        modelValue: { type: String },
    },
};
</script>

<style lang="scss">
.templateButton .v-btn__content {
    color: white;
}
</style>
