<template>
    <v-container>
        <v-row align="center" justify="center">
            <p>Dashboard</p>
        </v-row>
        <v-row>
            <performance-log-component></performance-log-component>
        </v-row>
    </v-container>
</template>

<script>
import PerformanceLogComponent from "./Common/PerformanceLogComponent";
export default {
    name: 'DashboardComponent',
    components: { PerformanceLogComponent },
}
</script>
