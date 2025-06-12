<template>
    <FormSearchSelector
        v-model="affiliateId"
        label="Choose an Affiliate"
        item-value="AffiliateId"
        search-type="affiliate"
        :item-title="item => item.AffiliateNumber + ' - ' + item.AffiliateName"
        outlined
        clearable
    />
</template>

<script>
import FormSearchSelector from './FormSearchSelector.vue';

export default {
    name: 'AffiliateSelector',
    components: { FormSearchSelector },
    props: {
        value: { type: Number, default: 0 },
    },
    data: () => ({
        affiliateId: null,
        items: [],
    }),
    watch: {
        affiliateId() { this.$emit('input', this.affiliateId); },
    },
    created() {
        this.affiliateId = this.value;
    },
};
</script>
