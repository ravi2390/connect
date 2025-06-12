<template>
   <div class="mb-2">
       <span class="mr-1" :class="status" v-if="address.IndividualAddressType">{{ address.IndividualAddressType }}:</span>
       <span :class="status">{{ mailingAddress }}</span>
       <v-tooltip v-if="isRestricted" text="Do Not Contact">
          <template #activator="{ props }">
              <span v-bind="props" class="ml-1">&#x1F6AB;</span>
          </template>
       </v-tooltip>
       <v-tooltip v-if="address.IsPreferred" text="Preferred">
          <template #activator="{ props }">
              <span v-bind="props" class="ml-1">&#x2B50;</span>
          </template>
       </v-tooltip>
       <v-tooltip v-if="address.VerifiedDate" text="Verified">
          <template #activator="{ props }">
              <span v-bind="props" class="ml-1">&#x2714;</span>
          </template>
       </v-tooltip>
   </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    address: Object,
})

const status = props.address.ContactStatus && props.address.ContactStatus.ContactStatusName === 'Invalid'
    ? 'contact-invalid'
    : '';
const addressLine1 = props.address.AddressLine1 ? props.address.AddressLine1 : '';
const addressLine2 = props.address.AddressLine2 ? `, ${props.address.AddressLine2}` : '';
const city = props.address.City ? `, ${props.address.City}` : '';
const stateTerritory = props.address.StateTerritory && props.address.StateTerritory.StateTerritoryName
    ? `, ${props.address.StateTerritory.StateTerritoryName}`
    : '';
const postalCode = props.address.PostalCode ? `, ${props.address.PostalCode}` : '';
const mailingAddress = `${addressLine1}${addressLine2}${city}${stateTerritory}${postalCode}`;

const isRestricted = props.address.CanSendMailRestriction && props.address.CanSendMailRestriction.ContactRestrictionId === 2;
</script>
