<template>
    <div class="mb-2">
        <span v-if="relationship.UnionRelationshipType" class="mr-1">{{ relationship.UnionRelationshipType }}</span>
        <span v-if="relationship.MemberId" class="mr-1">{{ relationship.MemberId }} - </span>
        <span v-if="relationship.LocalDuesCategory" class="mr-1">{{ relationship.LocalDuesCategory }} - </span>
        <span v-if="relationship.Affiliate">{{ relationship.Affiliate.AffiliateName }} ({{ relationship.Affiliate.AffiliateNumber }})</span>
        <span v-if="relationship.EndDate"> (FORMER)</span>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    'relationship': Object,
});
</script>
