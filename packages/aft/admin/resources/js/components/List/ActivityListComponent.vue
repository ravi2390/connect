<template>
    <v-data-table
        :loading="loading"
        :headers="headers"
        :items="audits"
        :item-key="audits.id"
        :single-expand=false
        multi-sort
        show-expand
    >
        <template v-slot:[`item.modified`]="{ item }">
            {{ Object.keys(item.old_values).join(', ') }}
        </template>
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <table>
                    <thead>
                        <tr><th>Changed</th><th>Old Value</th><th>New Value</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value, key) in item.old_values" :key="key">
                            <td>{{ key }}</td>
                            <td class="deleted" v-bind:class="{ 'null': !(value || false) }">{{ value || 'empty' }}</td>
                            <td v-bind:class="{ 'null': !(item.new_values[key] || false) }">{{ item.new_values[key] || 'empty' }}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </template>
    </v-data-table>
</template>

<script>
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
                    { title: 'Target', sortable: true, value: 'entity_type' },
                    { title: 'Modified', sortable: true, value: 'modified' },
                    { title: 'URL', sortable: true, value: 'url' },
                    { title: 'IP Address', sortable: true, value: 'ip_address' },
                ],
                audits: [],
            }
        },
        computed: {

        },
        mounted() {
            this.getDataFromApi();
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                axios.get('/admin/api/audit')
                    .then(response => {
                        this.audits = response.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }
    }
</script>

<style scoped>
    .null { color: gray; }
    .deleted { text-decoration: line-through; }
    .deleted:hover { text-decoration: none; }
</style>
