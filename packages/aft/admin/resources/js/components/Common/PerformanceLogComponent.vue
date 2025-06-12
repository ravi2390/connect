<template>
    <v-container>
        <v-sheet elevation="2" v-for="(group, groupName) in events" :key="groupName" class="pt-3 px-3 overflow-x-auto">
            <h4 class="mb-0">{{ groupName }} health</h4>
            <v-row class="flex-nowrap">
                <template v-for="(server, serverName) in group">
                    <template v-for="(context, contextName) in server">
                        <v-col v-for="(type, typeName) in context" :key="groupName + serverName + contextName + typeName">
                            <v-card>
                                <v-card-text>
                                    <v-sheet>
                                        <chart-component
                                            :label="contextName + ' - ' + typeName + ' : ' + serverName"
                                            :height="200"
                                            :labels="filterEventTimestamps(type)"
                                            :data="filterEventValues(type)"
                                        ></chart-component>
                                    </v-sheet>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </template>
                </template>

            </v-row>
        </v-sheet>
    </v-container>
</template>

<script>
import ChartComponent from "./ChartComponent";

export default {
    name: 'PerformanceLogComponent',
    components: { ChartComponent },
    data: () => ({
        events: [],
    }),
    mounted() {
        this.getLogs();
    },
    methods: {
        getLogs() {
            axios.get('/admin/api/performance')
            .then(response => {
                this.events = response.data.data;
            })
            .catch(error => {

            })
            .finally(() => {

            });
        },
        filterEventTimestamps(events) {
            return events.map(event => event.created_at);
        },
        filterEventValues(events) {
            return events.map(event => event.value);
        }
    }
}
</script>
