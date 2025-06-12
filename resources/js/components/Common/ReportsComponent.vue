<template>
    <v-container>
            <v-row>
                <v-col cols="12" lg="4">
                    <v-btn variant="text" color="primary" class="report rounded-circle" to="/unit-report" target="_self">Unit Report
                    </v-btn>
                </v-col>
                <v-col cols="12" lg="4">
                    <v-btn variant="text" color="primary" class="report rounded-circle" to="/add-drop-report" target="_self">Add/Drop Report
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="4">
                    <v-btn variant="text" color="primary" class="report rounded-circle" to="/officer-report" target="_self">Officer Report
                    </v-btn>
                </v-col>
                <v-col cols="12" lg="4">
                    <v-btn variant="text" color="primary" class="report rounded-circle" to="/assessment-report" target="_self">Assessment Report
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="4">
                    <v-btn variant="text" color="primary rounded-circle" class="report" to="/cope-report" target="_self">Cope Report
                    </v-btn>
                </v-col>
            </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "ReportsComponent",

        components: {

        },
    }
</script>

<style scoped>

</style>
