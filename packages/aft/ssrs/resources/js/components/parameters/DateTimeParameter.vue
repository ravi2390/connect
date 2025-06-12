<template>
    <v-text-field
        v-model="datetime"
        :label="parameter.label"
        :hide-details="true"
        placeholder="DateTime"
        variant="outlined"
        density="compact"
    ></v-text-field>
</template>

<script>
export default {
    name: 'DateTimeParameter',
    props: {
        value: { type: String, default: null },
        parameter: { type: Object, required: true },
    },
    data: () => ({
        datetime: null,
    }),
    watch: { datetime() { this.updated(); }, },
    methods: {
        updated() {
            this.$emit('input', this.datetime);
        },
    },
};
</script>
