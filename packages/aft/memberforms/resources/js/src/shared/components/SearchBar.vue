<template>
    <v-text-field
        v-model="query"
        :append-icon="icon"
        :label="searchLabel"
        hide-details
        variant="solo"
        @keyup="emitQuery"
    />
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        searchLabel: {
            type: String,
            default: 'Search',
        },
        icon: {
            type: String,
            default: 'mdi-magnify',
        },
    },
    emits: ['onTextEnter'],
    data() {
        return {
            query: '',
        };
    },
    methods: {
        emitQuery() {
            this.$emit('onTextEnter', this.query);
        },
    },
};
</script>
