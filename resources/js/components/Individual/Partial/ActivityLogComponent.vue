<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Activity Logs
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-progress-linear :active="loading" :indeterminate="true" color="#7bb8da"></v-progress-linear>
            <v-data-table-server
                :loading="loading"
                :headers="headers"
                :items="audits"
                :item-key="audits.id"
                :single-expand=false
                v-model:options="options"
                :items-length="total"
                :disable-sort=true
                show-expand
            >
                <template v-slot:[`item.created_at`]="{ item }">
                    {{ formatDate(item.created_at) }}
                </template>
                <template v-slot:[`item.auditable`]="{ item }">
                        <div v-if="item.auditable_type==='App\\Models\\IndividualAddress'">
                            <div v-if="item.auditable">
                                {{ item.auditable.AddressLine1 }}
                                {{ item.auditable.AddressLine2 }}
                                {{ item.auditable.City }}
                                {{ item.auditable.StateTerritory ? item.auditable.StateTerritory.StateTerritoryName : '' }}
                                {{ item.auditable.PostalCode }}
                            </div>
                            <div v-else>
                                {{ item.auditable_type }}
                            </div>
                        </div>
                        <div v-else>
                            {{ item.auditable ? item.auditable.display_name : item.auditable_type }}
                        </div>
                </template>
                <template v-slot:[`item.modified`]="{ item }">
                    {{ Object.keys(item.old_values).join(', ') }}
                </template>
                <template v-slot:expanded-row="{ columns, item }">
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
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import { format } from 'date-fns';
    export default {
        name: 'ActivityLogComponent',
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
                id:0,
                total:0
            }
        },
        mounted() {
            this.id = this.$route.params.id;
        },
        watch: {
            options: {
                handler() {
                    this.getDataFromApi();
                },
                deep: true,
            }
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                const page = this.options.page;
                const perPage = this.options.itemsPerPage || 15;
                axios.get('/admin/api/audit/search?page=' + page + '&per_page=' + perPage+'&individual='+this.id)
                    .then(response => {
                        this.audits = response.data.data;
                        this.total = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
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
                // moment: h:mm:ss a, MMMM Do YYYY
                return format(date, 'h:mm:ss a, MMMM do yyyy');
            }
        }
    }
</script>

<style scoped>
    .null { color: gray; }
    .deleted { text-decoration: line-through; }
    .deleted:hover { text-decoration: none; }
</style>
