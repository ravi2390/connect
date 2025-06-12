<template>
    <v-text-field
        v-model="number"
        :label="parameter.label"
        :hide-details="true"
        placeholder="Text"
        variant="outlined"
        density="compact"
    ></v-text-field>
</template>

<script>
import { debounce } from 'lodash-es';

export default {
    name: 'NumberParameter',
    props: {
        value: { type: Number, default: null },
        parameter: { type: Object, required: true },
    },
    data: () => ({
        number: null,
    }),
    watch: { number() { this.updated(); }, },
    mounted() {
        this.number = this.parameter.default[0] || this.parameter.value;
        this.updated = debounce(() => {
            this.$emit('input', this.number);
        }, 500);
    }
};
</script>
