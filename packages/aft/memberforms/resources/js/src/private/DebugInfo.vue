<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-data-iterator
                    :items="items"
                    :items-per-page="2"
                >
                    <template #default="props">
                        <v-row>
                            <v-col
                                v-for="item in props.items"
                                :key="item.name"
                                cols="12"
                                sm="6"
                                md="4"
                                lg="3"
                            >
                                <v-card>
                                    <v-card-title class="subheading font-weight-bold">
                                        {{ item.name }}
                                    </v-card-title>

                                    <v-divider />

                                    <v-list density="compact">
                                        <v-list-item>
                                            Environment:
                                            <span class="align-end">
                                                {{ item.environment }}
                                            </span>
                                        </v-list-item>
                                        <v-list-item>
                                            Base path:
                                            <span class="align-end">
                                                {{ item.basePath }}
                                            </span>
                                        </v-list-item>
                                        <v-list-item>
                                            App path:
                                            <span class="align-end">
                                                {{ item.appPath }}
                                            </span>
                                        </v-list-item>
                                        <v-list-item>
                                            Public path:
                                            <span class="align-end">
                                                {{ item.publicPath }}
                                            </span>
                                        </v-list-item>
                                        <v-list-item>
                                            Storage path:
                                            <span class="align-end">
                                                {{ item.storagePath }}
                                            </span>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </v-data-iterator>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DebugInfo',
    data: () => ({
        items: [],
    }),
    created() {
        axios.get('/api/v3/memberforms/admin/debug/get-debug-info')
            .then((response) => {
                console.log(response.data);
                const { data } = response;
                console.log(data.environment);
                if (data.environment) {
                    const devExpected = {
                        name: 'Dev (for reference)',
                        environment: 'local',
                        appPath: '/var/www/connect/app',
                        basePath: '/var/www/connect',
                        publicPath: '/var/www/connect/public',
                        storagePath: '/var/www/connect/storage',
                    };
                    this.items.push(devExpected);
                    this.items.push(data);
                }
            });
    },
};
</script>
