<template>
    <v-input></v-input>
</template>

<script>
export default {
    name: 'BooleanParameter',
    props: {
        parameter: { type: Object, required: true },
    },
};
</script>
