<template>
    <v-select
        v-model="selected"
        :label="parameter.label"
        :hide-details="true"
        :items="parameter.values"
        item-value="value"
        item-title="label"
        placeholder="Select"
        variant="outlined"
        density="compact"
    ></v-select>
</template>

<script>

export default {
    name: 'SelectParameter',
    props: {
        value: { type: String, default: null },
        parameter: { type: Object, required: true },
    },
    data: () => ({
        selected: null,
    }),
    watch: { selected() { this.updated(); }, },
    mounted() {
        this.selected = this.parameter.default[0] || this.parameter.value;
    },
    methods: {
        updated() {
            this.$emit('input', this.selected);
        },
    },
};
</script>
