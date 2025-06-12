<template>
    <v-navigation-drawer permanent width="100%">
        <template #prepend>
            <v-list-item>
                <v-list-item-title class="text-h6">
                    Reports
                </v-list-item-title>
                <v-list-item-subtitle>
                    Choose a report from below
                </v-list-item-subtitle>
            </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-treeview
            v-model="tree"
            :items="items"
            v-model:open="open"
            v-model:active="active"
            activatable
            item-value="path"
            open-on-click
            @update:active="select"
        >
            <template v-slot:prepend="{ item, isOpen }">
                <v-icon v-if="item.type === 'directory'" :icon="isOpen ? 'mdi:mdi-folder-open' : 'mdi:mdi-folder'" />
                <v-icon v-else-if="types[item.type]" :icon="types[item.type]" />
                <v-icon v-else :icon="types['unknown']" />
            </template>
        </v-treeview>
    </v-navigation-drawer>
</template>

<script>
import api from '../api/reports';

export default {
    name: 'ReportsNavigation',
    props: {
        value: { type: String, default: '' },
        path: { type: String, default: '' },
    },
    data: () => ({
        loading: false,
        open: [],
        tree: [],
        items: [],
        active: [''],
        types: {
            directory: 'mdi:mdi-folder',
            report: 'mdi:mdi-file-table-outline',
            unknown: 'mdi:mdi-file-question'
        },
        selected: '',
    }),
    watch: {
        active: function(newValue, oldValue) {
            // prevent deselecting all items
            //if (newValue.length === 0 && oldValue.length > 0) {
            //    this.active = oldValue;
            //}
        },
        value: function(newValue) {
            // this.selected = newValue;
            console.log('NAV VALUE', newValue);
        },
    },
    mounted() {
        this.selected = this.value;
        this.loadNavigation(document.URL);
    },
    methods: {
        loadNavigation(path) {
            let query = '';
            if(path.includes('memberforms')){
                query = '?source=mfp';
            }
            this.loading = true;
            return api.reportsList(query)
                .then((response) => {
                    console.log('REPORTNAV LOADED');
                    this.items = response.data.items;
                    if (response.data.report !== (this.active[0] || '')) {
                        console.log('REPORTNAV SET', response.data.report);
                        this.active = [response.data.report];
                    }
                })
                .catch((error) => {
                    console.log('SSRS NAV ERROR', error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        select() {
            if (!this.active || this.active.length === 0) { return; }
            if (this.selected === this.active[0]) { return; }
            this.selected = this.active[0];
            console.log('SELECT', this.selected);
            this.$emit('input', this.selected);
        },
    },
};
</script>
