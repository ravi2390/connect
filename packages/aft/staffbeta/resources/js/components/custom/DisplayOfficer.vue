<template>
    <div class="mb-2">
        <span v-if="officer.Affiliate" class="mr-1">
            {{ officer.Affiliate.AffiliateName }} ({{ officer.Affiliate.AffiliateNumber}}) -
        </span>
        <span v-if="officer.AffiliateOfficerRole">
            {{ officer.AffiliateOfficerRole?.OfficerRoleTitle?.OfficerRoleTitleName }}
        </span>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    'officer': Object,
});
</script>
