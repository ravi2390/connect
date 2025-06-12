<template>
    <v-data-table
        :hide-default-footer="true"
        :headers="addressheaders"
        :items="addresses"
        class="mobile-global-card-table"
        :mobile-breakpoint=992
        :items-per-page="-1"
    >
        <template v-slot:[`item.Address`]="{ item }">
            <p>{{ item.AddressLine1 }}</p>
            <p>{{ item.AddressLine2 }}</p>
            <p>{{ item.City }}, {{ item.StateTerritory ? item.StateTerritory.StateTerritoryCode : '' }}, {{ item.PostalCode }}</p>
        </template>
        <template v-slot:[`item.ContactStatus`]="{ item }">
        <span v-if="item.ContactStatus">
            {{ item.ContactStatus.ContactStatusName }}
        </span>
        </template>
        <template v-slot:[`item.ContactSource`]="{ item }">
        <span v-if="item.ContactSource">
            {{ item.ContactSource.ContactSourceName }}
        </span>
        </template>
        <template v-slot:[`item.IsPreferred`]="{ item }">
        <span>
            <v-checkbox :model-value="item.IsPreferred" disabled></v-checkbox>
        </span>
        </template>
        <template v-slot:[`item.EmployerAddressId`]="{ item }">
        <span>
            <v-btn @click="$emit('edit-address', item)">Edit</v-btn>
        </span>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "ContactAddressListComponent",
        props: {
            addressheaders: {
                type: Array,
                required: true
            },
            addresses: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
