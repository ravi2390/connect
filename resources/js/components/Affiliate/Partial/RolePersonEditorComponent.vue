<template>
    <v-dialog v-model="showDialog"
              width="500"
              persistent
    >
        <v-form ref="form" validate-on="submit" @submit.prevent="save">
            <v-card>
                <v-card-title><span v-if="isEditMode">Edit</span><span v-else>Add</span> Person to Role</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-select
                                v-model="affiliateOfficerRoleId"
                                item-title="AffiliateOfficerRoleName"
                                item-value="AffiliateOfficerRoleId"
                                :items="roles"
                                :affiliateId="affiliateId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Role
                                </template>
                            </v-select>
                            <IndividualAutocomplete
                                v-model="individualId"
                                :individual="affiliateOfficer"
                                :rules="[rules.required]"
                                :affiliateId="affiliateId"
                                filter="member"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" lg="6">
                            <div class="data-container">
                                <v-menu
                                    v-model="dateStartMenu"
                                    :close-on-content-click="false"
                                    :offset="40"
                                    transition="scale-transition"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ props }">
                                        <v-text-field
                                            v-model="termStartDate"
                                            hint="YYYY-MM-DD"
                                            label="Start Date:"
                                            v-bind="props"
                                            variant="underlined"
                                            v-on="props"
                                        />
                                    </template>
                                    <v-date-picker @update:model-value="updateTermStartDate" />
                                </v-menu>
                            </div>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <div class="data-container">
                                <v-menu
                                    v-model="dateEndMenu"
                                    :close-on-content-click="false"
                                    :offset="40"
                                    transition="scale-transition"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ props }">
                                        <v-text-field
                                            v-model="termEndDate"
                                            hint="YYYY-MM-DD"
                                            label="End Date:"
                                            v-bind="props"
                                            variant="underlined"
                                            v-on="props"
                                        />
                                    </template>
                                    <v-date-picker @update:model-value="updateTermEndDate" />
                                </v-menu>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-checkbox key="text-is-elected" label="Elected Position" v-model="isElectedCheckbox"/>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="default" variant="elevated" v-on:click.prevent="cancel()">
                        Cancel
                    </v-btn>
                    <v-btn elevation="0" color="primary" variant="elevated" type="submit">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
    import { format } from 'date-fns';
    import { ref } from "vue";
    import IndividualAutocomplete from "./IndividualAutocomplete";
    export default {
        name: "RolePersonEditorComponent",
        components: {IndividualAutocomplete},
        props: {
            isEditMode: {
                type: Boolean,
                default: false
            },
            roles: {
                type: Array
            },
            affiliateOfficer: {
                type: Object,
                default: () => ({
                    AffiliateOfficerId: 0,
                    AffiliateOfficerRoleId: '',
                    Id: '',
                    TermStartDate: '',
                    TermEndDate: '',
                    IsElected: false,
                    IsCurrent: true,
                    IsPreferredTitle: false,
                    AffiliateId: 0
                })
            },
            affiliateId: {
                required: true
            },
            individuals: {
                type: Object,
                default: () => ({}),
                required: false,
            },
        },
        data: () => ({
            rules: {
                required: value => !!value || 'Required.'
            },
            dateStartMenu: ref(null),
            dateEndMenu: ref(null),
            showDialog: true,
            affiliateOfficerRoleId: null,
            individualId: null,
            isElectedCheckbox: false,
            termEndDate: '',
            termStartDate: ''
        }),
        methods: {
            async save(event) {
                if (this.individuals) {
                    // check if the individual is already assigned to the same role without an end date
                    const allIndividuals = Object.values(this.individuals).flat();
                    const isDuplicateWithoutEndDate = allIndividuals.some(individual => {
                        return individual.Id == this.affiliateOfficer.IndividualId &&
                            individual.AffiliateOfficerRoleId == this.affiliateOfficer.AffiliateOfficerRoleId &&
                            !individual.TermEndDate;
                    });

                    if (isDuplicateWithoutEndDate) {
                        alert('This individual is already assigned to this role without an end date.');
                        return;
                    }
                }
                const results = await event;
                if (!results.valid) {
                    return;
                }
                let method = 'post';
                let url = '/api/v2/affiliateOfficer';

                const affiliateOfficer = {
                    ...this.affiliateOfficer,
                    AffiliateOfficerRoleId: this.affiliateOfficerRoleId,
                    IndividualId: this.individualId,
                    IsElected: this.isElectedCheckbox,
                    TermEndDate: this.termEndDate,
                    TermStartDate: this.termStartDate,
                    AffiliateId: this.affiliateId
                };

                if (this.isEditMode) {
                    method = 'put';
                    url += '/' + this.affiliateOfficer.AffiliateOfficerId;
                }
                if (affiliateOfficer.AffiliateOfficerId === 0) {
                    delete affiliateOfficer.AffiliateOfficerId;
                }
                axios({method, url, data: affiliateOfficer})
                    .then((response) => {
                    })
                    .finally(() => {
                        this.$emit('saved');
                    });
            },
            cancel() {
                this.$emit('canceled');
            },
            updateTermStartDate(date) {
                this.dateStartMenu = false;
                this.termStartDate = format(date,'yyyy-MM-dd');
            },
            updateTermEndDate(date) {
                this.dateEndMenu = false;
                this.termEndDate = format(date,'yyyy-MM-dd');
            }
        },
        beforeMount() {
            if (this.isEditMode) {
                // we got Individual id flattened in Id.
                this.affiliateOfficerRoleId = Number(this.affiliateOfficer.AffiliateOfficerRoleId);
                this.individualId = Number(this.affiliateOfficer.Id);
                this.termStartDate = this.affiliateOfficer.TermStartDate;
                this.termEndDate = this.affiliateOfficer.TermEndDate;
                this.isElectedCheckbox = this.affiliateOfficer.IsElected == 1;
            }
        },
    }
</script>
