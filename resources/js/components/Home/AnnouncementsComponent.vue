<template>
    <div>
        <v-expansion-panels
                v-for="announcement in announcements"
                :key="announcement.id"
                v-model="announcement.expanded"
                class="announcement mb-8"
                :class="'type-'+announcement.type">
            <v-expansion-panel>
                <v-expansion-panel-title :class="announcement.priority">
                    <h4>{{ announcement.title }}</h4>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="border-sm">
                    <v-card variant="flat" class="p-3">
                        <span v-html="announcement.content"></span>
                    </v-card>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
    export default {
        props: {
            position: {
                type: String,
                required: false
            }
        },
        data: () => ({
            panel: [],
            announcements: [],
        }),
        mounted() {
            this.getAnnouncements();
        },
        methods: {
            getAnnouncements() {
                const isPosition = this.position ? "&position=" + this.position : "";
                axios.get("admin/api/active-content-block?application=connect" + isPosition)
                    .then(response => {
                        this.announcements = response.data.data;
                    })
            },
        }
    }
</script>

<style>
    .announcement .v-expansion-panel-title { background-color: #e2eff8; }
    .announcement.type-alert .v-expansion-panel-title { background-color: #ffae42 !important; }
    .announcement .v-expansion-panel-content__wrap { padding: 0; }
    .low { background-color: #FFC423 !important; }
    .medium { background-color: #ff9900 !important; }
    .high { background-color: #ff1a1a !important; }
</style>
