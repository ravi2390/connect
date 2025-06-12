<template>
    <div class="mb-4">
        <h5 class="d-flex align-center ga-2">
            {{ roleObject.AffiliateOfficerRoleName }}
            <v-btn-group>
                <v-btn size="small" icon="fa-edit" v-on:click="editRole=!editRole" variant="elevated" />
                <v-btn size="small" icon="fa-trash" :disabled="Boolean(individuals)" @click="deleteDialog=!deleteDialog" variant="elevated" />
            </v-btn-group>
            <v-tooltip
                location="right"
                color="primary-darken-2"
            >
                <template #activator="{ props }">
                    <v-btn
                        variant="text"
                        color="primary-darken-1"

                        class="btn-tooltip ml-4"
                        v-bind="props"
                        size="small"
                        icon="mdi:mdi-information-outline"
                    />
                </template>
                <span>Officer role can not be deleted if an individual is associated with the role.</span>
            </v-tooltip>
        </h5>
        <RoleEditorComponent v-if="editRole" v-on:canceled="editRole=false" v-on:saved="editRole=false" :is-edit-mode="true" :roleTypes="roleTypes" :roleTitles="roleTitles" :role="roleObject" :affiliateId="affiliateId"/>
        <v-dialog v-model="deleteDialog" width="500">
            <v-card>
                <v-card-title>Delete Officer Role</v-card-title>
                <v-card-text>
                    Delete role {{ roleObject.AffiliateOfficerRoleName }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteDialog=false" variant="elevated">Cancel</v-btn>
                    <v-btn @click="deleteRole()" color="red" variant="elevated">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <RolePersonEditorComponent v-if="editIndividual" v-on:canceled="editIndividual=false" v-on:saved="onSaveIndividual" :is-edit-mode="true" :roles="roles" v-model:affiliateOfficer="selectedIndividual" :affiliateId="affiliateId"/>
        <v-data-table
            :headers="getHeaders(headers)"
            :items="individuals"
            :hide-default-footer="hideFooter()"
            class="elevation-1"
            :no-data-text="getNoDataText()"
            :items-per-page="-1"
        >
            <template v-slot:[`item.actions`]="{ item }">
                <div>
                    <v-btn size="small" icon="fa-edit" @click="selectIndividualForEdit(item)" variant="text" />
                    <!-- <v-btn small :disabled="checkDate(props.item.TermEndDate)" @click="deleteAffiliateOfficerRole(props.item)">
                        <i class="fa fa-trash"/>

                    </v-btn>
                    <v-tooltip
                        right
                        color="primary darken-2"
                    >
                        <template #activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                icon
                                v-bind="attrs"
                                class="btn-tooltip ml-4"
                                v-on="on"
                            >
                                <v-icon
                                    small
                                    color="primary darken-1"
                                >
                                    mdi-information-outline
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Individual can not be deleted from the officer role without an end date. End date must be today's date or earlier to delete an officer.</span>
                    </v-tooltip> -->
                </div>
            </template>
            <template v-slot:[`item.name`]="{ item }">
                <div>
                    {{ item.FirstName }} {{ item.LastName }}
                </div>
            </template>
            <template v-slot:[`item.TermStartDate`]="{ item }">
                <div class="data-value">
                    {{ $filters.formatDate(item.TermStartDate) }}
                </div>
            </template>
            <template v-slot:[`item.TermEndDate`]="{ item }">
                <div class="data-value">
                    {{ $filters.formatDate(item.TermEndDate) }}
                </div>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import { compareAsc, format } from 'date-fns';
import headersMixin from "../../../mixins/Grid/headersMixin";
import RoleEditorComponent from "./RoleEditorComponent";
import RolePersonEditorComponent from "./RolePersonEditorComponent";

    export default {
        name: "AffiliateOfficerRoleListComponent",
        components: { RoleEditorComponent, RolePersonEditorComponent },
        mixins: [headersMixin],
        props: {
            role: {},
            individuals: {},
            roleTypes: {},
            roleTitles: {},
            roleObject: {},
            roles: {
                type: Array
            },
            affiliateId: {
                required: true
            },
            noDataText: {
                type: String,
                required: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        data: () => ({
            headers: [
                {title: 'Name', value: 'name', visible: true, sortable: false},
                {title: 'Is Elected', value: 'IsElected', visible: true, sortable: false},
                {title: 'Start Date', value: 'TermStartDate', visible: true, sortable: false},
                {title: 'End Date', value: 'TermEndDate', visible: true, sortable: true},
                {title: '', value: 'actions', visible: true, sortable: false},
            ],
            editRole: false,
            deleteDialog: false,
            editIndividual: false,
            selectedIndividual: {},
            pageSize: 10,
            currentDate: format(new Date(), 'MMM dd, yyyy'), // moment: 'MMM DD,YYYY'
        }),
        methods: {
            checkDate(endDate){
                return !endDate || compareAsc(new Date(endDate), new Date()) === 1;
            },
            hideFooter(){
                return this.individuals != null && this.individuals.length > 0 ? false : true;
            },
            deleteAffiliateOfficerRole(item) {
                if (confirm("are you sure you want to delete individual assignment for " +item.FirstName + ' ' + item.LastName + '?')) {
                    axios.delete('/api/v2/affiliateOfficer/' + item.AffiliateOfficerId)
                        .finally(() => {
                            this.$emit('role-deleted');
                        });
                }
            },
            deleteRole() {
                if(this.individuals && this.individuals.length > 0){
                    alert('There are individuals assigned to the role '+ this.roleObject.AffiliateOfficerRoleName + ". Please remove the individuals and try again.");
                } else {
                    if (confirm("are you sure you want to delete role " + this.roleObject.AffiliateOfficerRoleName)) {
                        axios.delete('/api/v2/affiliateOfficerRole/' + this.roleObject.AffiliateOfficerRoleId)
                            .finally(() => {
                                this.$emit('role-deleted');
                                this.deleteDialog = false;
                            });
                    }
                }
            },
            getNoDataText() {
                if (this.noDataText) {
                    return this.noDataText;
                }
                return "There are no individuals in the " + this.roleObject.AffiliateOfficerRoleName +" role.";
            },
            selectIndividualForEdit(individual) {
                this.selectedIndividual = individual;
                this.editIndividual=true
            },
            onSaveIndividual() {
                this.$emit('role-deleted'); // refreshing when admin or user selects TermEndDate field on edit
                this.editIndividual=false;
            }
        }
    }
</script>
