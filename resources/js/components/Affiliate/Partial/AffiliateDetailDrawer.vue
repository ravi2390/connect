<template>
    <div>
        <v-toolbar density="compact" elevation="0" class="hidden-lg-and-up mobile-has-selected-row">
            <v-spacer></v-spacer>
            <v-btn icon="mdi:mdi-close" @click="$emit('close')" />
        </v-toolbar>
        <div class="mobile-selected-item-container">
            <affiliate-detail-component @swipeToClose="$emit('close')" :affiliateId="affiliateId" :shouldDisplayDataComponent="false" />
        </div>
    </div>
</template>
<script>
import AffiliateDetailComponent from './AffiliateDetailComponent';
export default {
    name: 'AffiliateDetailDrawer',
    components: { AffiliateDetailComponent },
    props: { affiliateId: { type: Number, required: true } }
};
</script>
