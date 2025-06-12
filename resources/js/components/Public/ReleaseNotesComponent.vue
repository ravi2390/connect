<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="mt-8">
                <div>
                    <v-expansion-panels

                        v-model="panel"
                        class="announcement mb-8 r-notes"

                        multiple
                        >
                        <v-expansion-panel
                            v-for="releaseNote in releaseNotes"
                            :key="releaseNote.id"
                            class="mb-4"
                            :class="'type-'+releaseNote.id"
                        >
                            <v-expansion-panel-title >
                                <h4>{{ releaseNote.title }}</h4>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text class="border-sm">
                                <v-card variant="flat" class="p-3">
                                    <span v-html="releaseNote.description"></span>
                                </v-card>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        panel: [0],
        releaseNotes: [],
    }),
    mounted() {
        this.getAnnouncements();
    },
    methods: {
        getAnnouncements() {
            axios.get("public-release-notes")
                .then(response => {
                    this.releaseNotes = response.data.data;
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.announcement .v-expansion-panel { border-bottom: 1px solid rgba(0,0,0,.17); }
.announcement .v-expansion-panel-title { background-color: #e2eff8; }
.announcement.type-alert .v-expansion-panel-title { background-color: #ffae42 !important; }
.announcement .v-expansion-panel-content__wrap { padding: 0; }
.announcement.v-expansion-panels { border-radius: unset; }
.announcement span img { max-width: 100%; }
.v-expansion-panels .v-expansion-panel:not(:first-child):after { border: none; }
.low { background-color: #ffff66 !important; }
.medium { background-color: #ff9900 !important; }
.high { background-color: #ff1a1a !important; }
</style>
