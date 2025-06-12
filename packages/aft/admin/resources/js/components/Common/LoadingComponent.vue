<template>
    <v-overlay
        absolute
        z-index="0"
        scrim="#FFF"
        opacity=".5"
        :model-value="loading"
        class="align-center justify-center"
    >
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
    export default {
        name: 'LoadingComponent',
        props: {
            loading: Boolean,
        },
    }
</script>
