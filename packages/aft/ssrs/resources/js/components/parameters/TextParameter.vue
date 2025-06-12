<template>
    <v-text-field
        v-model="text"
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
    name: 'TextParameter',
    props: {
        value: { type: String, default: null },
        parameter: { type: Object, required: true },
    },
    data: () => ({
        text: null,
    }),
    watch: { text() { this.updated(); }, },
    mounted() {
        this.text = this.parameter.default[0] || this.parameter.value;
        this.updated = debounce(() => {
            this.$emit('input', this.text);
        }, 500);
    }
};
</script>
