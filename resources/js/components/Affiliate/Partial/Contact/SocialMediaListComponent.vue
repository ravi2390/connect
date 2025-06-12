<template>
    <v-data-table
        :hide-default-footer="true"
        :headers="socialMediaHeaders"
        :items="socialMedia"
        class="mobile-global-card-table"
        :mobile-breakpoint=992
        :items-per-page="-1"
    >
        <template v-slot:[`item.URL`]="{ item }">
            <span>{{ item.URL }}</span>
        </template>
        <template v-slot:[`item.ContactStatus`]="{ item }">
            <span v-if="item.ContactStatus">
                {{ item.ContactStatus.ContactStatusName }}
            </span>
        </template>
        <template v-slot:[`item.ContactSource`]="{ item }">
            <span v-if="item.ContactSource">
                {{ item.ContactSource.ContactSourceName }}
            </span>
        </template>
        <template v-slot:[`item.AffiliateSocialMediaType`]="{ item }">
            <span v-if="item.AffiliateSocialMediaType">
                {{ item.AffiliateSocialMediaType.AffiliateSocialMediaTypeName }}
            </span>
        </template>
        <template v-slot:[`item.AffiliateSocialMediaId`]="{ item }">
            <span>
                <v-btn @click="$emit('edit-social-media', item)">Edit</v-btn>
            </span>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "SocialMediaListComponent",
        props: {
            socialMediaHeaders: {
                type: Array,
                required: true
            },
            socialMedia: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
