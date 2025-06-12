<template>
    <v-expansion-panel>
        <v-expansion-panel-title>
            Demographics
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <FlipCard :flipped="flipped">
                <template #front>
                    <view-demographics-component :individual="individual" v-on:edit-demographics="flipped=true"></view-demographics-component>
                </template>
                <template #back>
                    <edit-demographics-data-component :individual="individual" :edit-mode="true" :read-only="false" v-on:cancel-edit-demographics="flipped=false" v-on:saved-demographics="onSave"></edit-demographics-data-component>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../Common/Card/FlipCard";
    import EditDemographicsDataComponent from "./Edit/EditDemographicsDataComponent";
    import ViewDemographicsComponent from "./ViewDemographicsComponent";
    export default {
        name: "DemographicsComponent",
        components: {ViewDemographicsComponent, EditDemographicsDataComponent, FlipCard},
        data() {
            return {
                flipped: false
            }
        },
        props: {
            individual: {
                type: Object,
                required: true
            }
        },
        mounted() {
            this.id = this.$route.params.id;
        },
        methods: {
            onSave(individual) {
                this.flipped = false;
                this.$emit('demographics-changed', individual);
            }
        }
    }
</script>

<style scoped>

</style>
