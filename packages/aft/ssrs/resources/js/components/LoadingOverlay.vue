<template>
    <v-overlay
        opacity=".5"
        :model-value="loading"
        class="align-center justify-center"
        scrim="#FFF"
    >
        <v-progress-circular indeterminate :size="70" color="primary"></v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
    name: 'LoadingOverlay',
    props: {
        loading: { type: Boolean, default: false },
    },
};
</script>
