<template>
    <v-autocomplete
        v-model="selected"
        v-model:search="searchText"
        :items="entries"
        :loading="loading"
        :label="label"
        :rules="rules"
        :item-value="itemValue"
        :disabled="disabled"
        :clearable="clearable"
        item-title="name"
        :multiple="multiple"
        :variant="outlined ? 'outlined' : 'underlined'"
        v-on:update:modelValue="handleSelected"
    />
</template>

<script>
import { debounce } from 'lodash-es';
import api from '../../api/public';

export default {
    name: 'FormSearchSelector',
    props: {
        itemValue: { type: String, default: '' },
        itemText: { type: [String, Function], default: '' },
        searchType: { type: String, required: true },
        searchArgs: { type: Object, default: () => ({}) },
        modelValue: { type: [Number, Array], default: null },
        label: { type: String, default: 'Combobox' },
        outlined: { type: Boolean, default: false },
        rules: { type: Array, default: () => ([]) },
        disabled: { type: Boolean, default: false },
        clearable: { type: Boolean, default: true },
        multiple: { type: Boolean, default: false },
    },
    data: () => ({
        loading: false,
        selected: null,
        searchText: null,
        items: [],
    }),
    emits: ['update:modelValue'],
    computed: {
        entries() {
            return this.items.map((item) => {
                let name = '';
                switch (typeof (this.itemText)) {
                    case 'string': name = item[this.itemText];
                    break;
                    case 'function': name = this.itemText(item);
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
        // selected() {
        //     if (this.selected) {
        //         if (this.multiple) {
        //             const selectedItems = this.selected.map((item) => item[this.itemValue]);
        //             this.$emit('input', selectedItems);
        //         } else {
        //             this.$emit('input', this.selected[this.itemValue]);
        //         }
        //     } else {
        //         this.$emit('input', null);
        //     }
        // },
        searchText() { this.search(); },
        searchArgs() { this.search(); },
        // value: {
        //     handler(value) {
        //         if (!value) {
        //             this.selected = null;
        //         }
        //     },
        // },
    },
    created() {
        this.search = debounce(() => { this.doSearch(); }, 500);
        if (this.modelValue) {
            this.loading = true;
            if (Array.isArray(this.modelValue)) {
                api.search(this.searchType, this.searchText, this.searchArgs)
                    .then((response) => {
                        this.items = response.data;
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
            // if (!this.searchText) {
            //     this.items = [];
            //     return;
            // }
            this.loading = true;
            api.search(this.searchType, this.searchText, this.searchArgs)
                .then((response) => {
                    this.items = response.data;

                    if (this.searchType === 'localJobClass') {
                        this.customSortLocalJobClass();
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        customSortLocalJobClass() {
            const itemNamesToMoveAtEnd = ['Job Not Listed', 'Unknown', 'Other'];

            itemNamesToMoveAtEnd.forEach((itemName) => {
                const indexToMove = this.items.findIndex(
                    (item) => item.LocalJobClassName.toLowerCase() === itemName.toLowerCase(),
                );
                this.items.push(this.items.splice(indexToMove, 1)[0]);
            });
        },
        handleSelected() {
            this.$emit('update:modelValue', this.selected);
        }
    },
};
</script>
