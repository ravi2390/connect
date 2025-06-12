<template>
    <v-data-table
        :hide-default-footer="true"
        :headers="socialMediaHeaders"
        :mobile-breakpoint=992
        class="mobile-global-card-table"
        :items="socialMedia"
        :items-per-page="-1"
    >
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
        <template v-slot:[`item.IndividualSocialMediaType`]="{ item }">
            <span v-if="item.IndividualSocialMediaType">
                {{ item.IndividualSocialMediaType.IndividualSocialMediaTypeName }}
            </span>
        </template>
        <template v-slot:[`item.IndividualSocialMediaId`]="IndividualSocialMediaId">
            <span>
                <v-btn @click="$emit('edit-social-media', IndividualSocialMediaId.item)">Edit</v-btn>
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
