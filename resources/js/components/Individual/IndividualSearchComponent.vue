<template>
    <IndividualAddComponent global="global" />
</template>

<script>
    import IndividualAddComponent from "./IndividualAddComponent";

    export  default {
        name: "IndividualSearchComponent",
        components: {IndividualAddComponent},
        data: () => ({
            global: true
        })

    }
</script>
