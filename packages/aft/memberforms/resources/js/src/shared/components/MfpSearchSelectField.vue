<template>
    <v-autocomplete
        v-model="selected"
        v-model:search="searchText"
        :items="entries"
        :loading="loading"
        :outlined="outlined"
        :rules="rules"
        :item-value="itemValue"
        :disabled="disabled"
        :clearable="clearable"
        item-title="itemText"
        autocomplete="new-password"
        variant="underlined"
        @update:model-value="handleUpdate"
    >
        <template #label>
            <span v-if="field.required">
                <strong class="text-red">
                    *
                </strong>
            </span>
            {{ label + (field.required ? ' (required)' : '') }}
        </template>
    </v-autocomplete>
</template>

<script>
import { debounce } from 'lodash-es';

export default {
    name: 'MfpSearchSelectField',
    props: {
        itemValue: { type: String, default: 'itemValue' },
        itemText: { type: [String, Function], default: '' },
        searchArgs: { type: Object, default: () => ({}) },
        value: { type: Number, default: null },
        label: { type: String, default: 'Combobox' },
        outlined: { type: Boolean, default: false },
        rules: { type: Array, default: () => ([]) },
        disabled: { type: Boolean, default: false },
        clearable: { type: Boolean, default: false },
        field: { type: Object, required: true },
        modelValue: { type: String, default: null },
    },
    data: () => ({
        loading: false,
        selected: null,
        searchText: null,
        items: [],
    }),
    computed: {
        entries() {
            if (typeof this.items !== 'object') {
                return [this.items];
            }
            return this.items.map((item) => ({ ...item }));
        },
    },
    watch: {
        disabled() { if (!this.disabled) { this.search(); } },
        // selected() {
        //     if (this.selected) {
        //         this.$emit('input', parseInt(this.selected.itemValue, 10));
        //     } else {
        //         this.$emit('input', null);
        //     }
        // },
        searchText() { this.search(); },
    },
    created() {
        if (this.field?.source) {
            this.items = this.field.source;
        }
        this.search = debounce(() => { this.doSearch(); }, 500);
        if (this.value) {
            this.loading = true;
            /* api.access(this.searchType, this.value)
                .then((response) => {
                    this.items.push(response.data);
                    this.selected = this.entries[0];
                    this.searchText = this.entries[0].name;
                })
                .finally(() => {
                    this.loading = false;
                }); */
            this.loading = false;
        } else {
            // this.search();
        }
    },
    methods: {
        reset() {
            this.selected = null;
            this.searchText = null;
            this.items = [];
            this.doSearch();
        },
        doSearch() {
            if (this.disabled) { return; }
            if (this.searchText === this.selected?.itemText) {
                return;
            }
            this.loading = true;
            /* api.search(this.searchType, this.searchText, this.searchArgs)
                .then((response) => {
                    this.items = response.data;
                })
                .finally(() => {
                    this.loading = false;
                }); */
            this.loading = false;
        },
        handleUpdate() {
            this.$emit('update:modelValue', this.selected);
        },
    },
};
</script>
