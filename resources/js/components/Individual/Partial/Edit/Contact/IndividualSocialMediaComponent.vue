<template>
    <v-form ref="form" v-model="valid" validate-on="submit" @submit.prevent="onSave">
        <v-card>
            <v-card-title>Social Media</v-card-title>
            <v-card-text>
                <v-alert :type="alertType" v-model="alert" closable close-text="Dismiss" class="mb-2">{{ alertText }}</v-alert>
                <v-row>
                    <v-col cols="4">
                        <div class="data-container">
                            <v-select
                                :items="socialMediaTypes"
                                label="Type"
                                item-value="IndividualSocialMediaTypeId"
                                item-title="IndividualSocialMediaTypeName"
                                v-model="socialMedia.IndividualSocialMediaTypeId"
                                :rules="[rules.required]"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>

                    <v-col cols="4">
                        <div class="data-container">
                            <v-select
                                :items="contactStatus"
                                label="Status"
                                item-value="ContactStatusId"
                                item-title="ContactStatusName"
                                v-model="socialMedia.ContactStatusId"
                                :rules="[rules.required]"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>

                    <v-col cols="4">
                        <div class="data-container">
                            <v-select
                                :items="contactSources"
                                item-value="ContactSourceId"
                                item-title="ContactSourceName"
                                label="Source"
                                v-model="socialMedia.ContactSourceId"
                                :rules="[rules.required]"
                                variant="underlined"
                            ></v-select>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-text-field label="Handle" :rules="[rules.required]"
                                      v-model="socialMedia.URL"
                                      :maxlength="400"
                                      variant="underlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel()" variant="elevated">Cancel</v-btn>
                <v-btn v-if="!savedSocialMedia" color="secondary" type="submit" variant="elevated" value="continue">Save and continue adding...</v-btn>
                <v-btn color="success" type="submit" variant="elevated" value="close">{{ saveButtonLabel }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
    import { clone } from "lodash-es";
    export default {
        name: "IndividualSocialMediaComponent",

        props: {
            individual: {
                type: Object,
                required: true
            },
            savedSocialMedia: {
                type: Object,
                required: false
            }
        },

        computed: {
            saveButtonLabel() {
                return this.savedSocialMedia ? 'Save' : 'save and close';
            },
            contactSources() {
                return this.$store.getters["contactSource/contactSources"];
            },
            contactStatus() {
                return this.$store.getters["contactStatus/contactStatuses"]
            }
        },

        watch: {
            savedSocialMedia: {
                handler(data) {
                    // this.savedSocialMedia = data;
                    this.setEdit();
                },
                deep: true
            }
        },

        created() {
            this.$store.dispatch('contactSource/getContactSources');
            this.$store.dispatch('contactStatus/getContactStatuses');
        },

        mounted() {
            axios.get('/api/v2/IndividualSocialMediaType').then((response) => {
                this.socialMediaTypes = response.data.data;
            });
        },

        data() {
            return {
                valid: true,
                alert: false,
                alertType: 'success',
                alertText: '',
                socialMediaTypes: [],
                socialMedia: {},
                rules: {
                    required: value => !!value || 'Required.'
                },
                emptySocialMedia: {
                    IndividualSocialMediaTypeId: null,
                    ContactStatusId: null,
                    ContactSourceId: null,
                    URL: null,
                    IndividualId: this.individual.IndividualId
                }
            }
        },

        methods: {
            saveNew() {
                this.socialMedia.IndividualId = this.individual.IndividualId;
                if (this.savedSocialMedia) {
                    axios.put('/api/v2/IndividualSocialMedia/' + this.savedSocialMedia.IndividualSocialMediaId + '?include=ContactStatus,ContactSource,IndividualSocialMediaType', this.socialMedia).then((response) => {
                        this.handleSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/IndividualSocialMedia?include=ContactStatus,ContactSource,IndividualSocialMediaType', this.socialMedia).then((response) => {
                        this.reset();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Social media entry saved.';
                        this.handleSaved(response.data.data, false, true);
                    });
                }
            },

            saveClose() {
                this.socialMedia.IndividualId = this.individual.IndividualId;
                if (this.savedSocialMedia) {
                    axios.put('/api/v2/IndividualSocialMedia/' + this.savedSocialMedia.IndividualSocialMediaId + '?include=ContactStatus,ContactSource,IndividualSocialMediaType', this.socialMedia).then((response) => {
                        this.handleSaved(response.data.data, true, false);
                    });
                } else {
                    axios.post('/api/v2/IndividualSocialMedia?include=ContactStatus,ContactSource,IndividualSocialMediaType', this.socialMedia).then((response) => {
                        this.reset();
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertText = 'Social media entry saved.';
                        this.handleSaved(response.data.data, true, true);
                    });
                }
            },
            async onSave(event) {
                const { value } = event.submitter;
                const results = await event;
                if (!results.valid) {
                    return;
                }
                if (value === 'continue') {
                    this.saveNew();
                } else if (value === 'close') {
                    this.saveClose();
                }
            },

            cancel() {
                this.setEdit();
                this.$emit('cancel-add-social-media');
            },

            handleSaved(socialMediaData, flip, isNew) {
                this.$emit('saved-social-media', {socialMedia: socialMediaData, flip: flip, isNew: isNew});
            },

            reset() {
                for (const field in this.emptySocialMedia) {
                    if (this.emptySocialMedia.hasOwnProperty(field)) {
                        this.socialMedia[field] = this.emptySocialMedia[field];
                    }
                }
            },

            setEdit() {
                this.socialMedia = clone(this.savedSocialMedia) || clone(this.emptySocialMedia);
            }
        }
    }
</script>

<style scoped>

</style>
