<template>
    <v-col>
        <component :is="parameterTypeToComponent" v-model="data" :parameter="parameter"></component>
    </v-col>
</template>

<script>
import UnknownParameter from './UnknownParameter.vue';
import BooleanParameter from './BooleanParameter.vue';
import NumberParameter from './NumberParameter.vue';
import TextParameter from './TextParameter.vue';
import SelectParameter from './SelectParameter.vue';
import MultiSelectParameter from './MultiSelectParameter.vue';
import DateTimeParameter from './DateTimeParameter.vue';

export default {
    name: 'GenericParameter',
    components: {
        UnknownParameter,
        BooleanParameter,
        NumberParameter,
        TextParameter,
        SelectParameter,
        MultiSelectParameter,
        DateTimeParameter
    },
    props: {
        value: { type: null },
        parameter: { type: Object, required: true },
    },
    data: () => ({
        data: null,
    }),
    watch: { data() { this.updated(); }, },
    computed: {
        parameterTypeToComponent() {
            switch (this.parameter.type) {
                case 'number': return NumberParameter;
                case 'text': return TextParameter;
                case 'select': return SelectParameter;
                case 'multiselect': return MultiSelectParameter;
                case 'datetime': return DateTimeParameter;
            }
            console.log('UNKNOWN PARAMETER TYPE', this.parameter.type)
            return UnknownParameter;
        },
    },
    mounted() {
        this.data = this.parameter.value;
    },
    methods: {
        updated() {
            console.log('GENERIC PARAMETER INPUT', this.data);
            this.$emit('input', this.data);
        }
    }
};
</script>
