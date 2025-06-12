<template>
    <v-data-table
        :hide-default-footer="true"
        :headers="phoneHeaders"
        :items="phones"
        class="mobile-global-card-table"
        :mobile-breakpoint=992
        :items-per-page="-1"
    >
        <template v-slot:[`item.fullPhone`]="{ item }">
            <span>{{ maskPhone(item.fullPhone) }}</span>
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
        <template v-slot:[`item.CanTextRestrictionId`]="{ item }">
            <span>
                <v-checkbox :model-value="item.CanTextRestrictionId === 1" disabled></v-checkbox>
            </span>
        </template>
        <template v-slot:[`item.IsPreferred`]="{ item }">
            <span>
                <v-checkbox :model-value="item.IsPreferred" disabled></v-checkbox>
            </span>
        </template>
        <template v-slot:[`item.CanCallRestrictionId`]="{ item }">
            <span>
                <v-checkbox :model-value="item.CanCallRestrictionId === 1" disabled></v-checkbox>
            </span>
        </template>
        <template v-slot:[`item.AffiliatePhoneId`]="{ item }">
            <span>
                <v-btn @click="$emit('edit-phone', item)">Edit</v-btn>
            </span>
        </template>
    </v-data-table>
</template>

<script>
    import { maskPhoneNumber } from "../../../../helpers/index.js";

    export default {
        name: "PhoneListComponent",
        props: {
            phoneHeaders: {
                type: Array,
                required: true
            },
            phones: {
                type: Array,
                required: true
            }
        },
        methods: {
            maskPhone(phone) {
                return maskPhoneNumber(phone);
            },
        },
    }
</script>

<style scoped>

</style>
