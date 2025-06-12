<template>
    <v-data-table
        :hide-default-footer="true"
        :headers="emailheaders"
        :mobile-breakpoint=992
        class="mobile-global-card-table"
        :items="emails"
        :items-per-page="-1"
    >
        <template v-slot:[`item.Email`]="{ item }">
            <span>{{ item.Email }}</span>
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
            <v-checkbox-btn :model-value="item.IsPreferred" disabled></v-checkbox-btn>
        </template>
        <template v-slot:[`item.ContactRestriction`]="{ item }">
            <span v-if="item.CanContactRestriction">
                {{ item.CanContactRestriction.ContactRestrictionName }}
            </span>
        </template>
        <template v-slot:[`item.IndividualEmailId`]="{ item }">
            <span>
                <v-btn @click="$emit('edit-email', item)">Edit</v-btn>
            </span>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "ContactEmailListComponent",
        props: {
            emailheaders: {
                type: Array,
                required: true
            },
            emails: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
