<template>
    <v-text-field
        :label="parameter.label"
        placeholder="Unknown Data"
        :hide-details="true"
        variant="outlined"
        density="compact"
    ></v-text-field>
</template>

<script>
export default {
    name: 'UnknownParameter',
    props: {
        parameter: { type: Object, required: true },
    },
};
</script>
