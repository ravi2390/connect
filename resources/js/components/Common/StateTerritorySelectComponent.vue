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
            <span v-if="rules[0]" class="text-red">* </span>{{label}}
        </template>
    </v-autocomplete>
</template>

<script>
    import emptySelectMixin from "../../mixins/UI/emptySelectMixin";

    export default {
        name: "StateTerritorySelectComponent",
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
                default: () => ([true]),
                required: false
            }
        },
        emits: ['update:modelValue'],
        created() {
            this.$store.dispatch('stateTerritory/getStateTerritories');
        },
        computed: {
            stateTerritories() {
                return this.addEmptyElement(this.$store.getters["stateTerritory/stateTerritories"], this.itemText, this.itemValue);
            }
        },
        methods: {
            handleChange(value) {
                this.$emit('update:modelValue', value);
            }
        }
    }
</script>
