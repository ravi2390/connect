<template>
    <v-dialog v-model="dialog" scrollable persistent max-width="600px">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="text">
                <template #prepend>
                    <v-icon icon="mdi:mdi-cog" size="x-large" />
                </template>
                <span v-if="localDisplayLabel">Customize table columns</span>
            </v-btn>
        </template>
        <v-form ref="form" v-model="valid">
        <v-card>
            <v-card-title>
                <span class="text-h5">Columns</span>
            </v-card-title>
            <v-card-text>
                <v-container fluid>
                    <div>
                        <v-switch color="accent" v-model="existing" :label="selectLabel" />
                        <v-select
                            v-if="existing"
                            v-model="localPreset"
                            :items="presets"
                            item-title="component_key"
                            item-value="component_key"
                            label="Select Preset"
                            :rules="[rules.required]"
                            @update:model-value="changeSelect()"
                        ></v-select>
                        <v-text-field label="New Preset" v-model="localPreset" v-if="!existing" :rules="[rules.required]"></v-text-field>
                    </div>
                    <v-checkbox v-for="locCol in localColumns" v-model="locCol.visible" :label="locCol.title"
                                v-bind:key="locCol.value"></v-checkbox>
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
</template>

<script>
    import { clone } from "lodash-es";
    import paginationUrlMixin from "../../../mixins/Grid/paginationUrlMixin";

    export default {
        name: "ColumnChooserComponent",

        mixins: [paginationUrlMixin],

        props: {
            columns: {
                type: Array,
                required: false
            },
             displayLabel: {
                type: Boolean,
                required: false
            },
            presets: {
                type: Array,
                required: false
            },
            selectedPreset: {
                type: String,
                default: ''
            },
            mainClass: {
                type: String,
                default: 'columnChooser'
            }
        },

        mounted() {
            this.localColumns = JSON.parse(JSON.stringify(this.columns));
        },

        data: () => ({
            dialog: false,
            localDisplayLabel: true,
            localColumns: [],
            localPreset: '',
            existing: false,
            valid: true,
            rules: {
                required: value => !!value || 'Required.'
            },
        }),
        computed: {
            selectLabel() {
                return this.existing ? 'Select from existing filters' : 'Create a new filter';
            }
        },
        watch: {
            selectedPreset: {
                handler(data) {
                    this.localPreset = data;
                    this.existing = data !== '';
                }
            },
            columns: {
                handler(data) {
                    this.localColumns = JSON.parse(JSON.stringify(data));;
                }
            },
            displayLabel:{
                handler(data) {
                    if(data==false)
                    this.localDisplayLabel = false;
                }
            },
        },

        methods: {
            apply() {
                if (!this.$refs.form.validate()) {
                    return;
                }
                this.localColumns.forEach((localColumn) => {
                    const column = this.columns.find(function (column) {
                        return column.value === localColumn.value;
                    });
                    column.visible = localColumn.visible;
                });
                const hideColumn = this.headersToQuery(this.columns);
                const queryParams = clone(this.$route.query);
                queryParams['hideColumn'] = hideColumn;
                this.$router.push({path: this.$router.path, query:queryParams}).catch(err => {});
                this.$emit('applied', this.localPreset);
                this.dialog = false;
                this.localDisplayLabel = false;
            },
            changeSelect() {
                this.$emit('preset-load', this.localPreset);
            },
        }
    }
</script>

<style scoped>
</style>
