<template>
    <v-data-table
        :hide-default-footer="true"
        :headers="phoneHeaders"
        :mobile-breakpoint=992
        class="mobile-global-card-table"
        :items="phones"
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
                <v-checkbox disabled :model-value="item.CanTextRestrictionId === 1"></v-checkbox>
            </span>
        </template>
        <template v-slot:[`item.IsPreferred`]="{ item }">
            <span>
                <v-checkbox disabled :model-value="item.IsPreferred"></v-checkbox>
            </span>
        </template>
        <template v-slot:[`item.CanCallRestrictionId`]="{ item }">
            <span>
                <v-checkbox :model-value="item.CanCallRestrictionId && item.CanCallRestrictionId !== 1" disabled></v-checkbox>
            </span>
        </template>
        <!-- <template v-slot:item.IsPreferred="phone">
            <span>
                <v-checkbox input-value="true" disabled v-if="phone.item.CanCallRestriction === true"></v-checkbox>
                <v-checkbox value disabled v-if="phone.item.CanCallRestriction === false"></v-checkbox>
            </span>
        </template> -->
        <template v-slot:[`item.IndividualPhoneId`]="{ item }">
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
    };
</script>

<style scoped>

</style>
