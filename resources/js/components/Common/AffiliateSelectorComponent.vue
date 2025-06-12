<template>
    <v-autocomplete
        :label="label"
        :items="items"
        :model-value="affiliate"
        v-model:search="searchText"
        :loading="loading"
        :customFilter="searchFilter"
        :item-title="itemTitle"
        :item-value="itemValue"
        :placeholder="placeholderText"
        v-on:update:search="search"
        v-on:update:modelValue="select"
        v-on:update:focused="onFocus"
        auto-select-first
        base-color="rgba(255,255,255,1)"
        variant="underlined"
        ref="affiliateSelector"
        class="text-white"
    >
        <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
                <template #title>
                    {{ getAffiliateLabel(item.raw) }}
                </template>
            </v-list-item>
        </template>
        <template v-if="$slots.append" #append-item>
            <slot name="append" />
        </template>
    </v-autocomplete>
</template>
<script setup>
import { computed, ref, onMounted, nextTick, useTemplateRef } from 'vue';
import { debounce } from 'lodash-es';

const props = defineProps({
    label: { type: String, default: 'Selected Affiliate' },
    itemTitle: { type: String, default: 'AffiliateName' },
    itemValue: { type: String, default: 'AffiliateId' },
    affiliate: { type: Object, default: null },
});
const emit = defineEmits(['selected']);
const searchText = ref('');
const loading = ref(false);
const items = ref([]);
const autocomplete = useTemplateRef('affiliateSelector');

onMounted(() => {
    // Load default affiliates.
    axios.post('/api/v2/search/affiliate?scope=global', { search: '' })
        .then((response) => {
            items.value = response.data.data;
        });

    // Trigger the selector to ensure the input has a value, when the page loads the input value is empty.
    const input = autocomplete.value.$el.querySelector('input');
    input.focus();
    input.blur();
    nextTick(() => {
        input.focus();
        input.blur();
    });
})

// Allow searches for both affiliate name and number.
const searchMatch = (searchText, matches) => matches
    .some(text => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
const searchFilter = (value, query, item) => searchMatch(query, [value, item.raw.AffiliateNumber]);
const placeholderText = computed(() => props.affiliate ? getAffiliateLabel(props.affiliate) : 'Select Affiliate');
const getAffiliateLabel = (item) => `${item.AffiliateName} (${item.AffiliateNumber})`;

const search = debounce((searchText) => {
    if (props.affiliate) {
        // Do not search if the selected affiliate is already selected.
        if (searchMatch(searchText, [props.affiliate.AffiliateName, props.affiliate.AffiliateNumber])) {
            return;
        }
    }
    loading.value = true;
    axios.post('/api/v2/search/affiliate?scope=global', { search: searchText })
        .then((response) => {
            items.value = response.data.data;
            // if (response.data.meta.last_page > 1) {
            // @todo: should we try to handle pagination? Or just require the user to keep typing?
            loading.value = false;
        });
}, 500);
const select = (affiliateId) => {
    emit('selected', affiliateId);
}

// Select the input text when the autocomplete is focused.
const onFocus = (event) => {
    const input = autocomplete.value.$el.querySelector('input');
    if (event && input) {
        input.select();
    }
};

</script>