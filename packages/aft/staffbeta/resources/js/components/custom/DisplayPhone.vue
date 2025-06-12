<template>
    <div class="mb-2">
        <span class="mr-1" :class="status" v-if="type">{{ type }}</span>
        <span :class="status">{{ number }}</span>
        <v-tooltip v-if="isRestricted" text="Do Not Contact">
            <template #activator="{ props }">
                <span v-bind="props" class="ml-1">&#x1F6AB;</span>
            </template>
        </v-tooltip>
        <v-tooltip v-if="phone.IsPreferred" text="Preferred">
            <template #activator="{ props }">
                <span v-bind="props" class="ml-1">&#x2B50;</span>
            </template>
        </v-tooltip>
        <v-tooltip v-if="phone.VerifiedDate" text="Verified">
            <template #activator="{ props }">
                <span v-bind="props" class="ml-1">&#x2714;</span>
            </template>
        </v-tooltip>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    phone: Object,
})

const status = props.phone.ContactStatus && props.phone.ContactStatus.ContactStatusName === 'Invalid'
    ? 'contact-invalid'
    : '';
const type = props.phone.IndividualPhoneType && props.phone.IndividualPhoneType.IndividualPhoneTypeName
    ? `${props.phone.IndividualPhoneType.IndividualPhoneTypeName}:`
    : '';
const countryCode = props.phone.Country && props.phone.Country.CountryCallingCode
    ? `+${props.phone.Country.CountryCallingCode} `
    : '';
const phoneNumber = props.phone.PhoneNumber
    ? props.phone.PhoneNumber
    : '';
const extension = props.phone.Extension
    ? ` x${props.phone.Extension}`
    : '';
const number = `${countryCode}${phoneNumber}${extension}`;
const isRestricted = props.phone.CanCallRestriction && props.phone.CanCallRestriction.ContactRestrictionId === 2;
</script>
