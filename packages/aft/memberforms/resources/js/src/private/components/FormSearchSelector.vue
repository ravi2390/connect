<template>
    <v-autocomplete
        v-model="selected"
        v-model:search="searchText"
        v-on:update:modelValue="handleSelected"
        :label="label"
        :rules="rules"
        :items="entries"
        :multiple="multiple"
        :loading="loading"
        item-title="name"
        :item-value="itemValue"
        :disabled="disabled"
        :clearable="clearable"
        :variant="variant"

    />
</template>

<script>
import { debounce } from 'lodash-es';
import api from '../../../api/private';

export default {
    name: 'FormSearchSelector',
    props: {
        itemValue: { type: String, default: '' },
        itemTitle: { type: [String, Function], default: '' },
        searchType: { type: String, required: true },
        searchArgs: { type: Object, default: () => ({}) },
        label: { type: String, default: 'Combobox' },
        rules: { type: Array, default: () => ([]) },
        disabled: { type: Boolean, default: false },
        clearable: { type: Boolean, default: true },
        multiple: { type: Boolean, default: false },
        modelValue: { type: Number, default: null },
        variant: { type: String, default: 'outlined' },
    },
    emits: ['update:modelValue'],
    data: () => ({
        loading: false,
        selected: null,
        searchText: null,
        items: [],
    }),
    computed: {
        entries() {
            return this.items.map((item) => {
                let name = '';
                switch (typeof (this.itemTitle)) {
                    case 'string': name = item[this.itemTitle];
                    break;
                    case 'function': name = this.itemTitle(item);
                    break;
                    default: name = '';
                    break;
                }
                return { ...item, name };
            });
        },
    },
    watch: {
        disabled() { if (!this.disabled) { this.search(); } },
        searchText() { this.search(); },

    },
    created() {
        this.search = debounce(() => { this.doSearch(); }, 500);
        if (this.modelValue) {
            this.loading = true;
            if (Array.isArray(this.modelValue)) {
                api.search(this.searchType, this.searchText, this.searchArgs)
                    .then((response) => {
                        this.items = response.data;
                        if (!this.selected) {
                            this.selected = [];
                        }
                        this.modelValue.forEach((id) => {
                            const singleEmployer = response.data.find((employer) => employer.EmployerId === id);
                            if (singleEmployer) {
                                this.selected.push(singleEmployer);
                            }
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                api.access(this.searchType, this.modelValue)
                    .then((response) => {
                        this.items.push(response.data);
                        this.selected = this.entries[0];
                        this.searchText = this.entries[0].name;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        } else {
            this.search();
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
            if (this.searchText === this.selected?.name) {
                return;
            }
            this.loading = true;
            api.search(this.searchType, this.searchText, this.searchArgs)
                .then((response) => {
                    this.items = response.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleSelected() {
            this.$emit('update:modelValue', this.selected);
        }
    },
};
</script>
