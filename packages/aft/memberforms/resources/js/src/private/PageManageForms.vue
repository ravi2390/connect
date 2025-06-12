<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <h2>Manage Forms</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="tableHeaders"
                    :items="forms"
                    :search="searchValue"
                    class="v-outlined forms-table"
                >
                    <!-- <template v-for="(h, index) in tableHeaders" #[`header.${h.value}`]="{ tableHeaders }">
                        <div :key="index" class="table-header-name">
                            <span class="fubar">{{ h.text }}</span>
                        </div>
                    </template> -->
                    <template v-slot:[`item.system_name`]="{ item }">
                        <span v-if="!item.url_redirect && item.archived == 1">
                            <a :href="'/app/memberforms/admin' + item.url">
                                {{ item.system_name }}
                            </a>
                        </span>
                        <span v-else-if="(!item.url_redirect && item.archived == 0) && item.form_template_id == 7">
                            <a :href="'/app/memberforms/admin' + item.url.replace('/form', '/dataform')">
                                {{ item.system_name }}
                            </a>
                        </span>
                        <span v-else-if="!item.url_redirect && item.archived == 0">
                            <a :href="'/app/memberforms' + item.url">
                                {{ item.system_name }}
                            </a>
                        </span>
                        <span v-else-if="item.url_redirect">
                            <a :href="'/app/memberforms/' + affiliateNumber +'/'+ item.url_redirect">
                                {{ item.system_name }}
                            </a>
                        </span>
                    </template>
                    <template v-slot:[`item.CreatedAt`]="{ item }">
                        <span>
                            {{ displayDate(item.CreatedAt) }}
                        </span>
                    </template>
                    <template v-slot:[`item.UpdatedAt`]="{ item }">
                        <span>
                            {{ displayDate(item.UpdatedAt) }}
                        </span>
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        <v-tooltip location="top">
                            <template #activator="{ props }">
                                <v-btn v-bind="props" :disabled="item.form_template_id == 7" class="ma-2" variant="text" icon="mdi:mdi-content-copy">
                                    <v-icon></v-icon>
                                    <v-dialog
                                        activator="parent"
                                        max-width="290"
                                    >
                                        <template #default="{ isActive }">
                                            <v-card>
                                                <v-card-title class="text-h5">
                                                    Clone Form
                                                </v-card-title>
                                                <v-card-text>
                                                    Would you like to clone the form "{{ item.display_name }}"?
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer />
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="isActive.value = false"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="cloneForm(item);"
                                                    >
                                                        Clone
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                </v-btn>
                            </template>
                            <span>Clone</span>
                        </v-tooltip>
                        <!-- eslint-enable -->
                        <v-tooltip location="top">
                            <template #activator="{ props }">
                                <v-btn v-bind="props" :disabled="item.form_submissions_count > 0 || item.archived == 1" class="ma-2" variant="text" icon="mdi:mdi-square-edit-outline">
                                    <v-icon></v-icon>
                                    <v-dialog
                                        activator="parent"
                                        max-width="290"
                                    >
                                        <template #default="{ isActive }">
                                            <v-card>
                                                <v-card-title class="text-h5">
                                                    Edit Form
                                                </v-card-title>
                                                <v-card-text>
                                                    Would you like to edit the form "{{ item.display_name }}"?
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer />
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="isActive.value = false"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="editForm(item);"
                                                    >
                                                        Edit
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                </v-btn>
                            </template>
                            <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" :disabled="item.archived == 1 || item.form_template_id == 7" class="ma-2" variant="text" icon="mdi:mdi-checkbox-marked-outline">
                                    <v-icon></v-icon>
                                    <v-dialog
                                        activator="parent"
                                        max-width="290"
                                    >
                                        <template #default="{ isActive }">
                                            <v-card>
                                                <v-card-title class="text-h5">
                                                    Update Confirmation
                                                </v-card-title>
                                                <v-card-text>
                                                    Would you like to update confirmation message
                                                    for the form "{{ item.display_name }}"?
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer />
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="isActive.value = false"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="editConfirmation(item);"
                                                    >
                                                        Update
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                </v-btn>
                            </template>
                            <span>Update Confirmation</span>
                        </v-tooltip>
                        <v-tooltip loocation="top">
                            <template #activator="{ props }">
                                <v-btn v-bind="props" :disabled="item.form_submissions_count > 0 || item.form_url_redirect_count > 0 || item.archived == 1" class="ma-2" variant="text" icon="mdi:mdi-trash-can-outline">
                                    <v-icon></v-icon>
                                    <v-dialog
                                        activator="parent"
                                        max-width="290"
                                    >
                                        <template #default="{ isActive }">
                                            <v-card>
                                                <v-card-title class="text-h5">
                                                    Delete Form
                                                </v-card-title>
                                                <v-card-text>
                                                    Deleted forms can not be recovered through the Membership Forms Portal.
                                                    For assistance contact AFT. "{{ item.display_name }}"?
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer />
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="isActive.value = false"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="deleteForm(item);"
                                                    >
                                                        Delete
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                </v-btn>
                            </template>
                            <span>Delete</span>
                        </v-tooltip>
                        <v-tooltip location="top" v-if="item.archived == 0">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" :disabled="item.archived == 1" class="ma-2" variant="text" icon="mdi:mdi-archive-outline">
                                    <v-icon></v-icon>
                                    <v-dialog
                                        activator="parent"
                                        max-width="290"
                                    >
                                        <template #default="{ isActive }">
                                            <v-card>
                                                <v-card-title class="text-h5">
                                                    Archive Form
                                                </v-card-title>
                                                <v-card-text>
                                                    Would you like to archive the form "{{ item.display_name }}"?
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer />
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="isActive.value = false"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="archiveForm(item);"
                                                    >
                                                        Archive
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                </v-btn>
                            </template>
                            <span>Archive</span>
                        </v-tooltip>
                        <v-tooltip location="top" v-if="item.archived == 1">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" class="ma-2" variant="text" icon="mdi:mdi-archive-arrow-up-outline">
                                    <v-icon></v-icon>
                                    <v-dialog
                                        activator="parent"
                                        max-width="290"
                                    >
                                        <template #default="{ isActive }" >

                                            <v-card>
                                                <v-card-title class="text-h5">
                                                    Unarchive Form
                                                </v-card-title>
                                                <v-card-text>
                                                    Would you like to unarchive the form "{{ item.display_name }}"?
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer />
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="isActive.value = false"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="unarchiveForm(item);"
                                                    >
                                                        Unarchive
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                </v-btn>
                            </template>
                            <span>Unarchive</span>
                        </v-tooltip>
                        <v-tooltip location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" :disabled="!(item.form_template_id == 4 || item.form_template_id == 5)" class="ma-2" variant="text" icon="mdi:mdi-content-duplicate">
                                    <v-icon></v-icon>
                                    <v-dialog
                                        activator="parent"
                                        max-width="290"
                                    >
                                        <template #default="{ isActive }">
                                            <v-card>
                                                <v-card-title class="text-h5">
                                                    Clone To Data Form
                                                </v-card-title>
                                                <v-card-text>
                                                    Would you like to create a new Data Form by cloning the form
                                                    "{{ item.display_name }}"?
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer />
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="isActive.value = false"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        color="primary-darken-1"
                                                        variant="text"
                                                        @click="cloneFormToDataForm(item); isActive.value = false;"
                                                    >
                                                        Clone
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                </v-btn>
                            </template>
                            <span>Clone to Data Form</span>
                        </v-tooltip>
                        <!-- eslint-enable -->
                    </template>
                    <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand }">
                        <v-btn
                            :icon="isExpanded(internalItem) ? 'mdi:mdi-chevron-up' : 'mdi:mdi-chevron-down'"
                            variant="text"
                            @click="toggleExpand(internalItem)"
                        ></v-btn>
                    </template>
                    <template #expanded-row="{ columns, item }">
                        <td :colspan="columns.length">
                            <div class="form-details">
                                <!--
                                <div><strong> Affiliate Id: </strong> {{ item.affiliate_id }} </div>
                                <div><strong> Form Id: </strong> {{ item.id }} </div>
                                <div>
                                    <strong> Show in directory: </strong>
                                    {{ item.show_in_directory ? 'No' : 'Yes' }}
                                </div>
                                -->
                                <div><strong> Created By: </strong> {{ item.CreatedBy }}</div>
                                <div><strong> Created At: </strong> {{ formatDate(item.CreatedAt) }}</div>
                                <div><strong> Updated By: </strong> {{ item.UpdatedBy }} </div>
                                <div><strong> Updated At: </strong> {{ formatDate(item.UpdatedAt) }}</div>
                            </div>
                        </td>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-overlay
            :model-value="loading"
            opacity=".5"
            scrim="#FFF"
        />
    </v-container>
</template>

<script>
import { format } from "date-fns";
import api from '../../api/private';

export default {
    name: 'PageManageForms',
    data: () => ({
        loading: false,
        affiliateId: null,
        affiliateNumber: null,
        tableHeaders: [
            { text: '', value: 'data-table-expand' },
            { title: 'Form Name', value: 'system_name' },
            { title: 'Form Title', value: 'display_name' },
            { title: 'Submissions', value: 'form_submissions_count' },
            { title: 'Template', value: 'form_template_display_name' },
            { title: 'Action', value: 'action' },
        ],
        forms: [],
        actions: api.getFormActions(),
        searchValue: '',
        dialogClone: {},
        dialogEdit: {},
        dialogEditConfirmation: {},
        dialogDelete: {},
        dialogArchive: {},
        dialogUnarchive: {},
    }),
    watch: {
        affiliateId() {
            this.$nextTick(() => {
                localStorage.mfpAffiliateId = JSON.stringify(this.affiliateId);
                this.getForms();
            });
        },
    },
    created() {
        this.affiliateId = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateId : null;
        this.affiliateNumber = this.$store.getters['user/selectedAffiliate'] ? this.$store.getters['user/selectedAffiliate'].AffiliateNumber : null;
    },
    methods: {
        getForms() {
            if (!this.affiliateId) { return; }
            this.loading = true;
            api.formList(this.affiliateId)
                .then((response) => {
                    this.forms = response.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        searchFor(query) {
            this.searchValue = query;
        },
        formatDate(date) {
            return format(new Date(date), 'h:mm:ss a, MMMM do yyyy');
        },
        cloneFormToDataForm(form) {
            api.formCloneToDataForm(form.id)
                .then((response) => {
                    this.getForms();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        cloneForm(form) {
            this.dialogClone[form.id] = false;
            this.buildForm(2, this.actions.clone, form);
        },
        deleteForm(form) {
            api.formDelete(form.id)
                .then((response) => {
                    // console.log(response.data);
                    if (response.data[0] === 'success') {
                        this.getForms();
                    }
                })
                .finally(() => {
                    this.dialogDelete[form.id] = false;
                });
        },
        archiveForm(form) {
            api.formArchive(form.id)
                .then((response) => {
                    // console.log(response.data);
                    if (response.data[0] === 'success') {
                        this.getForms();
                    }
                })
                .finally(() => {
                    this.dialogArchive[form.id] = false;
                });
        },
        unarchiveForm(form) {
            api.formUnarchive(form.id)
                .then((response) => {
                    // console.log(response.data);
                    if (response.data[0] === 'success') {
                        this.getForms();
                    }
                })
                .finally(() => {
                    this.dialogArchive[form.id] = false;
                });
        },
        editConfirmation(form) {
            this.dialogEditConfirmation[form.id] = false;
            if (this.isPerformingSameFormAction(this.actions.editConfirmation, form)) {
                this.$router.push({ path: 'edit' });
            } else {
                this.buildForm(5, this.actions.editConfirmation, form);
            }
        },
        editForm(form) {
            this.dialogEdit[form.id] = false;
            if (this.isPerformingSameFormAction(this.actions.edit, form)) {
                this.$router.push({ path: 'edit' });
            } else {
                this.buildForm(2, this.actions.edit, form);
            }
        },
        isPerformingSameFormAction(action, form) {
            const localStorageActiveTemplate = localStorage.formBuilderActiveTemplate
                ? JSON.parse(localStorage.formBuilderActiveTemplate) : null;
            return (localStorageActiveTemplate
                && localStorageActiveTemplate.action
                && localStorageActiveTemplate.action === action
                && localStorageActiveTemplate.formId === form.id);
        },
        buildForm(step, action, form) {
            const templateIds = {
                // PD = Payroll Deduction
                PD_DuesOnly: 1,
                PD_DuesAndCope: 2,
                PD_CopeOnly: 3,
                // PP = Payment Processing
                PP_DuesOnly: 4,
                PP_DuesAndCope: 5,
                PP_CopeOnly: 6,
                PP_StateFed: 8,
            };

            api.formShow(form.id)
                .then((responseForm) => {
                    const existingForm = responseForm.data;
                    api.templateShow(existingForm.form_template_id)
                        .then((responseTemplate) => {
                            const defaultTemplate = responseTemplate.data;
                            const formToLoad = {
                                templateId: existingForm.form_template_id,
                                affiliateId: existingForm.affiliate_id,
                                chapterId: existingForm.employment_information_fields
                                    ? existingForm.employment_information_fields.chapterId : null,
                                employerId: existingForm.employment_information_fields
                                    ? existingForm.employment_information_fields.employerId : null,
                                unitId: existingForm.employment_information_fields
                                    ? existingForm.employment_information_fields.unitId : null,
                                formDescription: existingForm.description,
                                formName: existingForm.system_name,
                                formTitle: existingForm.display_name,
                                formShowAftLogo: existingForm.show_aft_logo,
                                formShowLocalLogo: existingForm.show_local_logo,
                                formShowFedLogo: existingForm.show_fed_logo,
                                form: this.extractForm(defaultTemplate, existingForm),
                                step: step,
                                action: action,
                            };

                            if (action === this.actions.edit || action === this.actions.editConfirmation) {
                                formToLoad.formId = existingForm.id;
                            } else if (action === this.actions.clone) {
                                formToLoad.formName = '';
                                formToLoad.formTitle = '';
                            }

                            if (parseInt(existingForm.form_template_id, 10) === templateIds.PD_CopeOnly
                                || parseInt(existingForm.form_template_id, 10) === templateIds.PP_CopeOnly) {
                                if (action === this.actions.editConfirmation) {
                                    formToLoad.step = 4;
                                }
                                formToLoad.reloadRoute = true;
                            } else {
                                const duesCategories = this.extractDuesCategories(responseForm.data.fields);
                                if (duesCategories && duesCategories.length > 0) {
                                    formToLoad.duesCategories = duesCategories;
                                }
                            }

                            if (parseInt(existingForm.form_template_id, 10) === templateIds.PP_CopeOnly) {
                                formToLoad.billHighwayBillingTypeId = existingForm.sources.copeOnlyBillingTypeId;
                            }

                            if (parseInt(existingForm.form_template_id, 10) === templateIds.PP_StateFed) {
                                const localIds = this.extractLocalIds(responseForm.data.fields);
                                if (localIds && localIds.length > 0) {
                                    formToLoad.localId = localIds;
                                }
                            }
                            localStorage.formBuilderActiveTemplate = JSON.stringify(formToLoad);
                            if (action === this.actions.clone) {
                                this.$router.push({ path: 'create' });
                            } else {
                                this.$router.push({ path: 'edit' });
                            }
                        });
                })
                .finally(() => {});
        },
        extractForm(defaultTemplate, existingForm) {
            const form = JSON.parse(JSON.stringify(defaultTemplate));
            form.fields = [];
            form.optional_fields = [];

            for (const [key, value] of Object.entries(existingForm.fields)) {
                form.fields.push(value);
            }

            if (existingForm.optional_fields) {

                for (const [key, value] of Object.entries(existingForm.optional_fields)) {
                    form.optional_fields.push(value);
                }
            }

            form.thankyou_fields = existingForm.thankyou_fields;
            form.confirmation_email_fields = existingForm.confirmation_email_fields;
            return form;
        },
        extractDuesCategories(formFields) {
            const duesCategories = [];
            Object.values(formFields).forEach((fieldValue) => {
                if (fieldValue.fieldName.toLowerCase() === 'localduescategory') {
                    Object.values(fieldValue.source).forEach((duesCategory) => {
                        duesCategories.push(duesCategory.LocalDuesCategoryId);
                    });
                }
            });
            return duesCategories;
        },
        extractLocalIds(formFields) {
            let localIdList = null;
            Object.values(formFields).forEach((fieldValue) => {
                if (fieldValue.fieldName.toLowerCase() === 'childaffiliate') {
                    localIdList = fieldValue.localId;
                }
            });
            return localIdList;
        },
    },
};
</script>

<style lang="scss">
.form-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
    margin: 0 20%;
}
@media only screen and (max-width: 960px) {
    .form-details {
        margin: 0;
        strong {
            display: inline-block;
            width: 100%;
        }
    }
    .forms-table {
        .v-data-table__mobile-row__cell {
            .v-btn {
                margin-bottom: 8px;
            }
        }
    }
}
.v-data-table>.v-data-table__wrapper tbody tr.v-data-table__expanded__content {
    box-shadow: inset 0 4px 8px -8px #0a2a5c, inset 0 4px 8px -8px #0a2a5c;
}
@media only screen and (min-width: 799px) {
    .searchTable {
        width: 30%;
    }
}
.v-data-table-header th[role="columnheader"] {
    position: relative;
}
.v-data-table-header th[role="columnheader"] i {
    position: absolute;
    top: 15px;
    left: -5px;
}
</style>
