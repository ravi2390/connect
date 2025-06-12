<template>
    <v-dialog v-model="showDialog" width="500" persistent>
        <v-form ref="form" validate-on="submit" @submit.prevent="save">
            <v-card>
                <v-card-title><span v-if="isEditMode">Edit</span><span v-else>Add</span> Committee Member</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-select
                                key="text-committee"
                                v-model="AffiliateCommiteeMember.AffiliateCommitteeId"
                                :items="committees"
                                item-title="AffiliateCommitteeName"
                                item-value="AffiliateCommitteeId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Committee Name
                                </template>
                            </v-select>
                            <v-select
                                key="text-committee-member-type"
                                v-model="AffiliateCommiteeMember.CommitteeMemberTypeId"
                                :items="CommitteeMemberTypes"
                                item-title="CommitteeMemberTypeName"
                                item-value="CommitteeMemberTypeId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Committee Member Type
                                </template>
                            </v-select>
                            <IndividualAutocomplete
                                v-model="AffiliateCommiteeMember.IndividualId"
                                :individual="AffiliateCommiteeMember.Individual"
                                :rules="[rules.required]"
                                :affiliateId="this.affiliateId"
                                filter="current"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" lg="6">
                            <div class="data-container">
                                <v-menu
                                    :offset="40"
                                    transition="scale-transition"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ props }">
                                        <v-text-field
                                            :model-value="AffiliateCommiteeMember.StartDate"
                                            hint="YYYY-MM-DD"
                                            label="Start Date:"
                                            v-bind="props"
                                            variant="underlined"
                                        />
                                    </template>
                                    <v-date-picker @update:model-value="updateStartDate" />
                                </v-menu>
                            </div>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <div class="data-container">
                                <v-menu
                                    :offset="40"
                                    transition="scale-transition"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ props }">
                                        <v-text-field
                                            :model-value="AffiliateCommiteeMember.EndDate"
                                            hint="YYYY-MM-DD"
                                            label="End Date:"
                                            v-bind="props"
                                            variant="underlined"
                                        />
                                    </template>
                                    <v-date-picker @update:model-value="updateEndDate" />
                                </v-menu>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="default" variant="elevated" v-on:click="cancel()">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" variant="elevated" type="submit">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
    import { clone } from "lodash-es";
    import { format } from "date-fns";
    import IndividualAutocomplete from "./IndividualAutocomplete";

    export default {
        name: "AffiliateCommitteesEditorComponent",
        components: {IndividualAutocomplete},
        props: {
            committees: {
                required: true,
                type: Array
            },
            isEditMode: {
                type: Boolean,
                default: false
            },
            editedCommittee: {
                type: Object,
                required: false
            },
            affiliateId: {
                required: true,
                type: Number
            }
        },
        data: () => ({
            showDialog: true,
            AffiliateCommiteeMember: {},
            CommitteeMemberTypes: [],
            rules: {
                required: value => !!value || 'Required.'
            },
            valid: true
        }),
        mounted() {
            axios.get('/api/v2/aggregate/committee-member-type/list?scope=global')
                .then(response => {
                    this.CommitteeMemberTypes = response.data.data;
                });
        },
        beforeMount() {
            if (this.editedCommittee) {
                this.AffiliateCommiteeMember = clone(this.editedCommittee);
                this.AffiliateCommiteeMember.StartDate = this.AffiliateCommiteeMember.StartDate.split('T')[0];
                this.AffiliateCommiteeMember.EndDate = this.AffiliateCommiteeMember.EndDate.split('T')[0];
            }
        },
        watch: {
            editedCommittee: {
                handler(data) {
                    this.AffiliateCommiteeMember = clone(this.editedCommittee);
                },
                deep: true
            }
        },
        methods: {
            cancel() {
                this.AffiliateCommiteeMember = {};
                this.$emit('canceled');
            },
            updateStartDate(date) {
                this.AffiliateCommiteeMember.StartDate = format(date, 'yyyy-MM-dd');
            },
            updateEndDate(date) {
                this.AffiliateCommiteeMember.EndDate = format(date, 'yyyy-MM-dd');
            },
            async save(event) {
                const results = await event;
                if (!results.valid) {
                    return;
                }

                const AffiliateCommiteeMember = {
                    ...this.AffiliateCommiteeMember,
                    AffiliateId: this.affiliateId,
                };
                let method = 'post';
                let url = '/api/v2/affiliateCommitteeMember';
                if (this.isEditMode) {
                    method = 'put';
                    url += '/' + AffiliateCommiteeMember.AffiliateCommitteeMemberId;
                }
                let saved = null;
                axios({method, url, data: AffiliateCommiteeMember})
                    .then((response) => {
                        saved = response.data;
                    })
                    .finally(() => {
                        this.$emit('saved', saved);
                    });
            },

        }
    }
</script>
