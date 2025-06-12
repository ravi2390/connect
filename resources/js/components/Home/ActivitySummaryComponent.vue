<template>
    <v-expansion-panels v-model="panel" class="home-activity-list mb-8">
        <v-expansion-panel>
            <v-expansion-panel-title>
                Recent Activity
            </v-expansion-panel-title>
            <v-expansion-panel-text class="border-sm">
                <v-card variant="flat" class="p-3">
                    <div class="hidden-md-and-down display-contents">
                        <v-table density="compact" class="mobile-global-card-table">
                            <thead>
                                <tr>
                                    <th>Date and Time</th>
                                    <th>Affiliate</th>
                                    <th>User Name</th>
                                    <th>Activity</th>
                                    <th>Item</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in activity" :key="item.id">
                                    <td>{{ dateFromNow(item.created_at) }}</td>
                                    <td>{{ item.owner.AffiliateNumber }}</td>
                                    <td>{{ item.user.name }}</td>
                                    <td>{{ item.event }}</td>
                                    <td>
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
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                    <div class="hidden-lg-and-up display-contents">
                        <v-table>
                            <thead class="v-data-table__thead v-data-table-header-mobile"></thead>
                            <tbody>
                                <tr v-for="item in activity" :key="item.id">
                                    <td class="v-data-table__mobile-row">
                                        <div class="v-data-table__mobile-row__wrapper">
                                            <div class="v-data-table__mobile-row__header">
                                                Date and Time
                                            </div>
                                            <div class="v-data-table__mobile-row__cell">
                                                {{ dateFromNow(item.created_at) }}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="v-data-table__mobile-row">
                                        <div class="v-data-table__mobile-row__wrapper">
                                            <div class="v-data-table__mobile-row__header">
                                                Affiliate
                                            </div>
                                            <div class="v-data-table__mobile-row__cell">
                                                {{ item.owner.AffiliateNumber }}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="v-data-table__mobile-row">
                                        <div class="v-data-table__mobile-row__wrapper">
                                            <div class="v-data-table__mobile-row__header">
                                                User Name
                                            </div>
                                            <div class="v-data-table__mobile-row__cell">
                                                {{ item.user.name }}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="v-data-table__mobile-row">
                                        <div class="v-data-table__mobile-row__wrapper">
                                            <div class="v-data-table__mobile-row__header">
                                                Activity
                                            </div>
                                            <div class="v-data-table__mobile-row__cell">
                                                {{ item.event }}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="v-data-table__mobile-row">
                                        <div class="v-data-table__mobile-row__wrapper">
                                            <div class="v-data-table__mobile-row__header">
                                                Item
                                            </div>
                                            <div class="v-data-table__mobile-row__cell">
                                                {{ item.auditable ? item.auditable.display_name : item.auditable_type }}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn variant="elevated" size="small" :to="{name: 'Activity'}">View All Activity</v-btn>
                    </v-card-actions>
                </v-card>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    import { formatDistanceToNow, startOfDay } from 'date-fns';
    export default {
        name: 'ActivitySummaryComponent',
        data: () => ({
            activity: [],
            panel: 0,
            pages: 1,
        }),
        mounted: function() {
            axios.get('admin/api/audit')
                .then(response => {
                    this.activity = response.data.data;
                    this.pages = response.data.meta.total;
                })
        },
        methods: {
            dateFromNow(date) {
                // item.created_at|moment().startOf('day').fromNow()
                return formatDistanceToNow(startOfDay(new Date(date)), { addSuffix: true });
            },
        }

    }
</script>

<style>
    .home-activity-list .v-expansion-panel-title { background-color: #e2eff8; }
    .home-activity-list .v-expansion-panel-content__wrap { padding: 0; }
</style>
