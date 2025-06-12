<template>
    <v-list>
        <v-list
            v-if="option.items && option.items.length >= 1"
            v-model:selected="selected"
            select-strategy="classic"
        >
            <v-list-item
                v-for="item in option.items"
                :key="item.AffiliateCommitteeId"
                :title="item.AffiliateCommitteeName"
                :subtitle="item.Description"
                :value="item.AffiliateCommitteeId"
            >
                <template #prepend="{ isSelected, select }">
                    <v-list-item-action start>
                        <v-checkbox-btn
                            :model-value="isSelected"
                            @update:model-value="select"
                        />
                    </v-list-item-action>
                </template>
            </v-list-item>
        </v-list>
        <div v-else>
            <p>No data</p>
        </div>
    </v-list>
</template>

<script setup>
import { defineModel } from 'vue';

const selected = defineModel({ default: [] });
const props = defineProps({
    option: { type: Object, required: true },
});
</script>
