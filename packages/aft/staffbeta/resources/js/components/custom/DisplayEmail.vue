<template>
   <div class="mb-2">
         <span :class="status">{{ email.Email }}</span>
         <v-tooltip v-if="isRestricted" text="Do Not Contact">
              <template #activator="{ props }">
                <span v-bind="props" class="ml-1">&#x1F6AB;</span>
              </template>
         </v-tooltip>
         <v-tooltip v-if="email.IsPreferred" text="Preferred">
              <template #activator="{ props }">
                <span v-bind="props" class="ml-1">&#x2B50;</span>
              </template>
         </v-tooltip>
         <v-tooltip v-if="email.VerifiedDate" text="Verified">
              <template #activator="{ props }">
                <span v-bind="props" class="ml-1">&#x2714;</span>
              </template>
         </v-tooltip>
   </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    email: Object,
})
const status = props.email.ContactStatus && props.email.ContactStatus.ContactStatusName === 'Invalid'
    ? 'contact-invalid'
    : '';
const isRestricted = props.email.CanContactRestriction && props.email.CanContactRestriction.ContactRestrictionId === 2;
</script>
