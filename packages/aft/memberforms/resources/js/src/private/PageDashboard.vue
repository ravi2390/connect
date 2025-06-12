<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-expansion-panels
                    v-for="announcement in announcements"
                    :key="announcement.id"
                    v-model="announcement.expanded"
                    class="announcement mb-8"
                    :class="'type-'+announcement.type"
                >
                    <v-expansion-panel>
                        <v-expansion-panel-title :class="announcement.priority">
                            {{ announcement.title }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <div class="pa-3" v-html="announcement.content" />
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import api from '../../api/private';

export default {
    name: 'PageDashboard',
    data: () => ({
        panel: [],
        announcements: [],
        loading: false,
    }),
    mounted() {
        this.getAnnouncements();
    },
    methods: {
        getAnnouncements() {
            this.loading = true;
            api.contentBlocks('/admin/api/active-content-block?application=memberforms')
                .then((response) => {
                    this.announcements = response.data.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style>
    .announcement .v-expansion-panel-title { background-color: #e2eff8; font-size: 25px; }
    .announcement.type-alert .v-expansion-panel-title { background-color: #ffae42 !important; }
    .low { background-color: #ffff66 !important; }
    .medium { background-color: #ff9900 !important; }
    .high { background-color: #ff1a1a !important; }
</style>
