<template>
    <v-autocomplete
        :items="stateTerritories"
        :item-value="itemValue"
        :item-title="itemText"
        :model-value="modelValue"
        :rules="rules"
        variant="underlined"
        @update:model-value="handleChange"
    >
        <template #label>
            <span v-if="rules" class="text-red">* </span>{{label}}
        </template>
    </v-autocomplete>
</template>

<script>
    import emptySelectMixin from "../../mixins/UI/emptySelectMixin";

    export default {
        name: "StateTerritorySelectComponent2",
        mixins: [emptySelectMixin],
        props: {
            label: {
                default: 'State'
            },
            itemValue: {
                default: 'StateTerritoryId'
            },
            itemText: {
                default: 'StateTerritoryName'
            },
            modelValue: {
                required: true
            },
            rules: {
                type: Array,
                required: false
            },
            stateTerritories: {
                type: Array,
                required : true
            }
        },
        emits: ['update:modelValue'],
        methods: {
            handleChange(value) {
                this.$emit('update:modelValue', value);
            }
        }
    }
</script>
