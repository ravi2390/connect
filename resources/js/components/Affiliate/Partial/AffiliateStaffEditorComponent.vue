<template>
    <v-dialog v-model="showDialog" width="500" persistent>
        <v-form ref="form" validate-on="submit" @submit.prevent="save">
            <v-card>
                <v-card-title><span v-if="isEditMode">Edit</span><span v-else>Add</span> Staff Member</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-select
                                key="text-department"
                                v-model="AffiliateStaff.StaffDepartmentId"
                                :items="departments"
                                item-title="StaffDepartmentName"
                                item-value="StaffDepartmentId"
                                :rules="[rules.required]"
                                variant="underlined"
                            >
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Department
                                </template>
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="AffiliateStaff.StaffTitle" :rules="[rules.required]" variant="underlined">
                                <template #label>
                                    <span v-if="rules.required" class="text-red">* </span>Title
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <IndividualAutocomplete
                                v-model="AffiliateStaff.IndividualId"
                                :individual="AffiliateStaff.Individual"
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
                                    v-model="dateStartMenu"
                                    :close-on-content-click="false"
                                    :offset="40"
                                    transition="scale-transition"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ props }">
                                        <v-text-field
                                            v-model="AffiliateStaff.TermStartDate"
                                            hint="YYYY-MM-DD"
                                            v-bind="props"
                                            :rules="[rules.required]"
                                            variant="underlined"
                                            v-on="props"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Start Date:
                                            </template>
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @update:model-value="updateStartDate" />
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
                                            v-model="AffiliateStaff.TermEndDate"
                                            hint="YYYY-MM-DD"
                                            label="End Date:"
                                            v-bind="props"
                                            variant="underlined"
                                            v-on="props"
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
                    <v-btn color="default" class="mb-4 btn-block" v-on:click.prevent="cancel()" variant="elevated">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" class="mb-4 btn-block" type="submit" variant="elevated">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
    import { format } from 'date-fns';
    import { clone } from "lodash-es";
    import IndividualAutocomplete from "./IndividualAutocomplete";
    import {ref} from "vue";

    export default {
        name: "AffiliateStaffEditorComponent",
        components: {IndividualAutocomplete},
        props: {
            isEditMode: {
                type: Boolean,
                default: false
            },
            editedStaff: {
                type: Object,
                required: false
            },
            departments: {
                required: true,
                type: Array
            },
            affiliateId: {
                required: true,
                type: Number
            }
        },
        data: () => ({
            dateStartMenu: ref(null),
            dateEndMenu: ref(null),
            showDialog: true,
            AffiliateStaff: {},
            rules: {
                required: value => !!value || 'Required.'
            },
        }),
        beforeMount() {
            if (this.editedStaff) {
                this.AffiliateStaff = clone(this.editedStaff);
                this.AffiliateStaff.StaffDepartmentId = this.AffiliateStaff.StaffDepartment.StaffDepartmentId;
                this.AffiliateStaff.IndividualId = this.AffiliateStaff.Individual.IndividualId;
                this.AffiliateStaff.TermStartDate = this.AffiliateStaff.TermStartDate.split('T')[0];
                this.AffiliateStaff.TermEndDate = this.AffiliateStaff.TermEndDate.split('T')[0];
            }
        },
        watch: {
            editedStaff: {
                handler(data) {
                    this.AffiliateStaff = clone(this.editedStaff);
                },
                deep: true
            }
        },
        methods: {
            cancel() {
                this.AffiliateStaff = {};
                this.$emit('canceled');
            },
            async save(event) {
                const results = await event;
                if (!results.valid) {
                    return;
                }

                const AffiliateStaff = {
                    ...this.AffiliateStaff,
                    AffiliateId: this.affiliateId
                };
                let method = 'post';
                let url = '/api/v2/affiliateStaff';
                if (this.isEditMode) {
                    method = 'put';
                    url += '/' + AffiliateStaff.AffiliateStaffId;
                }
                let saved = null;
                axios({method, url, data: AffiliateStaff})
                    .then((response) => {
                        saved = response.data;
                    })
                    .finally(() => {
                        this.$emit('saved', saved);
                    });
            },
            updateStartDate(date) {
                this.dateStartMenu = false;
                this.AffiliateStaff.TermStartDate = format(date, 'yyyy-MM-dd');
            },
            updateEndDate(date) {
                this.dateEndMenu = false;
                this.AffiliateStaff.TermEndDate = format(date, 'yyyy-MM-dd');
            }

        }
    }
</script>
