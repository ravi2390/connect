<template>
    <v-row justify="end" class="px-3">
        <v-dialog v-model="dialog" scrollable persistent max-width="600px">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props" v-on:click="prepare" icon="fa-filter" class="elevation-0" />
            </template>
            <v-form ref="form" v-model="valid">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Filters</span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <div>
                            <v-switch color="accent" v-model="existing" :label="existing?'Select from existing filters':'Create a new filter'"/>
                            <v-select
                                v-if="existing"
                                v-model="localPreset"
                                :items="presets"
                                item-title="component_key"
                                item-value="component_key"
                                label="Select Preset"
                                :rules="[rules.required]"
                                @update:model-value="change()"
                            ></v-select>
                            <v-text-field label="New Preset" v-model="localPreset" v-if="!existing" :rules="[rules.required]"></v-text-field>
                        </div>
                        <v-checkbox v-for="filter in localFilters" v-model="filter.visible" :label="filter.label" v-bind:key="filter.name"></v-checkbox>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">Close</v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="apply()">Apply</v-btn>
                </v-card-actions>
            </v-card>
            </v-form>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "FilterChooserComponent",

        props: {
            filters: {
                type: Array,
                required: false
            },
            presets: {
                type: Array,
                required: true
            },
            selectedPreset: {
                type: String,
                default: ''
            }
        },

        data: () => ({
            dialog: false,
            localFilters: [],
            localPreset: '',
            valid: true,
            rules: {
                required: value => !!value || 'Required.'
            },
            existing: false
        }),

        watch: {
            selectedPreset: {
                handler(data) {
                    this.localPreset = data;
                    this.existing = data !== '';
                }
            },
            filters: {
                handler(data) {
                    this.prepare();
                }
            }
        },

        methods: {
            apply() {
                if (!this.$refs.form.validate()) {
                    return;
                }
                this.localFilters.forEach((localFilter) => {
                    const filter = this.filters.find(function (filter) {
                        return filter.name === localFilter.name;
                    });
                    filter.visible = localFilter.visible;
                });
                this.dialog = false;
                this.$emit('filter-chooser-applied', this.localPreset);
            },

            change() {
                this.$emit('presets-load', this.localPreset);
            },

            prepare() {
                this.localFilters = JSON.parse(JSON.stringify(this.filters));
            }
        }
    }
</script>

<style scoped>

</style>
