<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Social Media
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <FlipCard :flipped="flipped">
                <template #front>
                    <v-row>
                        <v-col class="text-right">
                            <v-btn size="small" @click="onAdd()" color="primary">Add social media</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss">{{ alertText }}</v-alert>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <social-media-list-component :social-media="socialMedia" :social-media-headers="socialMediaHeaders" v-on:edit-social-media="onEdit"></social-media-list-component>
                        </v-col>
                    </v-row>
                </template>
                <template #back>
                    <individual-social-media-component :individual="individual" :saved-social-media="selected" v-on:saved-social-media="onSaved" v-on:cancel-add-social-media="flipped=false"></individual-social-media-component>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../../Common/Card/FlipCard";
    import SocialMediaListComponent from "./SocialMediaListComponent";
    import IndividualSocialMediaComponent from "../Edit/Contact/IndividualSocialMediaComponent";
    import contactsMixin from "../../../../mixins/UI/contactsMixin";

    export default {
        name: "SocialMediaInformationComponent",
        components: {
            IndividualSocialMediaComponent,
            SocialMediaListComponent,
            FlipCard
        },
        mixins: [contactsMixin],
        props: {
            individual: {
                type: Object,
                required: true
            }
        },

        methods: {
            getDataFromApi() {
                this.loading = true;
                return axios.get('/api/v2/individual/' + this.individual.IndividualId + '?include=individualSocialmedia,individualSocialmedia.ContactSource,individualSocialmedia.ContactStatus,individualSocialmedia.IndividualSocialMediaType')
                    .then(response => {
                        this.socialMedia = response.data.data.individualSocialmedia;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },

            onSaved(event) {
                if (!event.socialMedia) {
                    return;
                }
                if (event.isNew) {
                    this.socialMedia.push(event.socialMedia);
                } else {
                    const index = this.socialMedia.findIndex(socialMedia => socialMedia.IndividualSocialMediaId === event.socialMedia.IndividualSocialMediaId);
                    if (index !== -1) {
                        this.socialMedia[index] = event.socialMedia;
                    }
                }
                this.socialMedia = [...this.socialMedia];

                this.alertSuccessMessageForSave('Social media');

                if (event.flip) {
                    this.flipped = false;
                }
            },
        },

        data() {
            return {
                expanded: false,
                socialMedia: [],
                flipped: false,
                socialMediaHeaders: [
                    {title: 'Handle', value: 'URL'},
                    {title: 'Type', value: 'IndividualSocialMediaType'},
                    {title: 'Status', value: 'ContactStatus'},
                    {title: 'Source', value: 'ContactSource'},
                    {title: 'Action', value: 'IndividualSocialMediaId'},
                ],
                selected: null
            }
        }
    }
</script>

<style scoped>

</style>
