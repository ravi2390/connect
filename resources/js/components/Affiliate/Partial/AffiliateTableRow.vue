<template>
    <tr class="tr-mobile-affiliate">
        <td class="v-data-table__mobile-row mobile-row-header td-mobile-padding custom-mobile-row">{{ item.AffiliateName }}</td>
        <td class="v-data-table__mobile-row td-mobile-padding custom-mobile-row" v-if="item.AffiliateNumber">{{ item.AffiliateNumber }}</td>
        <td class="v-data-table__mobile-row custom-mobile-row td-mobile-padding" v-if="item.AffiliateAcronym">{{ item.AffiliateAcronym }}</td>
        <td class="v-data-table__mobile-row custom-mobile-row td-mobile-padding" v-if="item.AffiliateEIN">{{ item.AffiliateEIN }}</td>
        <td class="td-mobile-padding">
            <v-btn size="small" icon="mdi:mdi-menu-down" @click="$emit('select', item)" />
        </td>
    </tr>
</template>
<script>
export default {
    name: 'AffiliateTableRow',
    props: {
        item: { type: Object, required: true }
    }
}
</script>
