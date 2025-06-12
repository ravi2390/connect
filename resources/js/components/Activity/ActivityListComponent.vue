<template>
    <v-container>
        <h2 class="mb-4">Activity Log</h2>
        <v-data-table-server
            :loading="loading"
            :headers="headers"
            :items="audits"
            :item-key="audits.id"
            :single-expand=false
            v-model:options="options"
            :items-length="options.total"
            :disable-sort=true
            show-expand
        >
            <template v-slot:[`item.created_at`]="{ item }">
                {{ formatDate(item.created_at) }}
            </template>
            <template v-slot:[`item.auditable`]="{ item }">
                    {{ item.auditable ? item.auditable.label : item.auditable_type }}
            </template>
            <template v-slot:[`item.modified`]="{ item }">
                {{ Object.keys(item.old_values).join(', ') }}
            </template>
            <template #expanded-row="{ columns, item }">
                <tr>
                    <td :colspan="columns.length" class="py-2">
                        <v-table density="compact">
                            <thead>
                            <tr><th>Changed</th><th>Old Value</th><th>New Value</th></tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in item.new_values">
                                    <td>{{ getNiceLabel(item.auditable, key) }}</td>
                                    <td class="deleted" v-bind:class="{ 'null': (getNiceName(item.auditable, key) === '[empty]') }">{{ getNiceName(item.previous, key) }}</td>
                                    <td v-bind:class="{ 'null': (getNiceName(item.auditable, key) === '[empty]') }">{{ getNiceName(item.auditable, key) }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </td>
                </tr>
            </template>
        </v-data-table-server>
    </v-container>
</template>

<script>
    import { format } from 'date-fns';
    export default {
        name: 'ActivityListComponent',
        data() {
            return {
                loading: false,
                headers: [
                    { title: 'Date', sortable: true, value: 'created_at' },
                    { title: 'Affiliate', sortable: true, value: 'owner.AffiliateNumber' }, // TODO: every model should have a DisplayName or something
                    { title: 'User', sortable: true, value: 'user.name' },
                    { title: 'Email', sortable: true, value: 'user.email' },
                    { title: 'Activity', sortable: true, value: 'event' },
                    { title: 'Record', sortable: true, value: 'auditable' },
                    { title: 'Modified', sortable: true, value: 'modified' },
                ],
                audits: [],
                options: {},
            }
        },
        mounted() {
            //this.getDataFromApi();
        },
        watch: {
            options: {
                handler() {
                    this.getDataFromApi();
                },
                deep: true,
                immediate: true,
            }
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                const page = this.options.page || 1;
                const perPage = this.options.itemsPerPage || 15;
                axios.get('/admin/api/audit?page=' + page + '&per_page=' + perPage)
                    .then(response => {
                        this.audits = response.data.data;
                        this.options.page = response.data.meta.current_page;
                        this.options.itemsPerPage = response.data.meta.per_page;
                        this.options.total = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            getNiceLabel(item, key) {
                const related = item[key.replace(/Id$/, '')];
                return (related ? related.label : false) || key;
            },
            getNiceName(item, key) {
                const related = item[key.replace(/Id$/, '')]
                return item[key]
                    || (related ? related.display_name : false)
                    || '[empty]';
            },
            formatDate(date) {
                // change moment format h:mm:ss a, MMMM Do YYYY
                return format(new Date(date), 'h:mm:ss a, MMMM do yyyy');
            },
        }
    }
</script>

<style scoped>
    .null { color: gray; }
    .deleted { text-decoration: line-through; }
    .deleted:hover { text-decoration: none; }
</style>
