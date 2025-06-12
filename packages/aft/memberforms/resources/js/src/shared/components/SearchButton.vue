<template>
    <v-btn
        id="searchButton"
        class="ma-2"
        :loading="isLoading"
        :disabled="isDisabled"
        :color="isDisabled ? 'grey' : '#092A5C'"
        @click="onSearchClick"
        append-icon="mdi:mdi-database-search"
    >
        Search
        <template #loader>
            <v-progress-circular
                indeterminate
                color="white"
            />
        </template>
    </v-btn>
</template>

<script>
export default {
    name: 'SearchButton',
    props: {
        isLoading: {
            type: [Boolean, String],
            default: false,
        },
        isDisabled: {
            type: [Boolean, String],
            default: true,
        },
    },
    emits: ['onSearchClick'],
    methods: {
        onSearchClick() {
            this.$root.$emit('onSearchClick');
        },
    },
};
</script>

<style lang="scss" scoped>
    .v-size--default {
        width: 100px;
    }
    #searchButton .v-btn__content
    , .ma-2 {
        color: white;
    }
    .v-size--default {
        width: 125px;
    }
</style>
