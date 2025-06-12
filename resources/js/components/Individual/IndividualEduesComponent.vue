<template>
    <v-container>
        <v-overlay
            opacity=".5"
            :model-value="overlay"
            class="align-center justify-center"
            scrim="#FFF"
        >
            <v-progress-circular indeterminate :size="70" color="primary"></v-progress-circular>
        </v-overlay>
        <v-card v-if="!hasEdues">
            <v-row>
                <v-col class="py-4 text-center">
                    <p>Oops! You are not authorized.</p>
                </v-col>
            </v-row>
        </v-card>
        <v-card v-if="hasEdues" class="v-card--outlined v-sheet--tile pa-4 mobile-new-container">
            <v-row>
                <v-col cols="12" lg="2">
                    <v-btn elevation="0" color="primary" class="btn-block" @click="toggleFilter">
                        Filters
                    </v-btn>
                </v-col>
            </v-row>
            <v-expansion-panels v-model="filters" multiple>
                <v-expansion-panel
                    :key="panelKey"
                >
                    <v-expansion-panel-text>
                        <v-row>
                            <v-col>
                                <v-text-field key="text-first-name" label="First Name" v-model="firstName" variant="underlined"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field key="text-last-name" label="Last Name" v-model="lastName" variant="underlined"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-menu
                                    v-model="startDateMenu"
                                    :close-on-content-click="false"
                                    :offset="40"
                                    transition="scale-transition"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ props }">
                                        <v-text-field
                                            v-model="submissionStartDate"
                                            hint="YYYY-MM-DD"
                                            v-bind="props"
                                            label="Submission Start Date"
                                            variant="underlined"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker @update:model-value="updateStartDate" />
                                </v-menu>
                            </v-col>
                            <v-col>
                                <v-menu
                                    v-model="endDateMenu"
                                    :close-on-content-click="false"
                                    :offset="40"
                                    transition="scale-transition"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ props }">
                                        <v-text-field
                                            v-model="submissionEndDate"
                                            hint="YYYY-MM-DD"
                                            v-bind="props"
                                            label="Submission End Date"
                                            variant="underlined"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker @update:model-value="updateEndDate" />
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select
                                    :items="sortOptions"
                                    label="Sort By"
                                    item-value="type"
                                    item-title="label"
                                    v-model="sortBy"
                                    variant="underlined"
                                ></v-select>
                            </v-col>
                            <v-col>
                                <v-select
                                    :items="sortOrderOptions"
                                    label="Order"
                                    item-value="type"
                                    item-title="label"
                                    v-model="sortOrder"
                                    variant="underlined"
                                ></v-select>
                            </v-col>
                            <v-col>
                                <v-select
                                    :items="templateTypes"
                                    label="Template"
                                    item-value="id"
                                    item-title="display_name"
                                    v-model="selectedTemplateId"
                                    variant="underlined"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="d-flex justify-end ga-4">
                                <v-btn elevation="0" color="default" class="mb-4 btn-block" @click="clear">Clear</v-btn>
                                <v-btn elevation="0" color="primary" class="mb-4 btn-block" @click="getDataFromApi" >Search</v-btn>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-spacer></v-spacer>
        </v-card>
        <v-card v-if="hasEdues" class="v-card--outlined v-sheet--tile pa-4 mobile-new-container">
            <v-expansion-panels variant="accordion" class="edues-expansion">
                <v-expansion-panel
                    v-for="(member, i) in itemsShowed" :key="i"
                    @click="getEduesDetailsApi(member.IndividualId)"
                >
                    <v-menu
                        v-if="!loading"
                        :ref="`menu` + member.IndividualId"
                        location="bottom left"

                        transition="scroll-y-transition"
                        class="edit-acct_btn"
                    >
                        <template v-slot:activator="{ props }">
                            <div

                                v-bind="props"
                                class="edit-icon">
                                <span></span>
                            </div>
                        </template>
                        <v-list density="compact" color="primary">
                            <!-- 1st link -->
                            <v-list-item v-if="member.TemplateId !== '8'">
                                <template v-slot:prepend>
                                    <v-icon color="#092a5c" icon="mdi:mdi-account-edit-outline" />
                                </template>
                                <v-list-item-title>
                                    <a :href="`/individuals/${member.IndividualId}`">Edit Member Details</a>
                                </v-list-item-title>
                            </v-list-item>
                            <!-- 2nd link -->
                            <v-list-item v-if="!member.DeletedAt && member.BHIndividualId !== '-1' && !(member.api_data.AutoPayStatus === 'Inactive' && (member.api_data.MemberStatusId == 0 || member.api_data.MemberStatusDesc == 'Inactive'))">
                                <template v-slot:prepend>
                                    <v-icon color="#092a5c" icon="mdi:mdi-account-check-outline" />
                                </template>
                                <v-list-item-title @click.stop="dialogConfirm = true;">
                                    <span>{{ activateOrDeactivate }} BillHighway Account</span>
                                </v-list-item-title>
                            </v-list-item>
                            <v-dialog
                                v-model="dialogConfirm"
                                persistent
                                max-width="350"
                            >
                                <v-card>
                                    <v-card-title class="text-h6">
                                        <span>{{ activateOrDeactivate }} BillHighway Account</span>
                                    </v-card-title>
                                    <v-card-text class="text-subtitle-1">
                                        Are you sure you would like to {{ activateOrDeactivate.toLowerCase() }} {{ member.FirstName }} {{ member.LastName }}'s Billhighway account?
                                        <v-progress-linear v-show="loadingActive" indeterminate></v-progress-linear>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            elevation="2"
                                            color="error"
                                            class="px-4"
                                            :disabled="isDisabledActive"
                                            @click="cancelActiveState"
                                        >
                                            No
                                        </v-btn>
                                        <v-btn
                                            elevation="2"
                                            color="success"
                                            class="px-4"
                                            :disabled="isDisabledActive"
                                            @click="toggleActiveState(member.IndividualId, activateOrDeactivate, member.TemplateId)"
                                        >
                                            Yes
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <!-- 3rd link -->
                            <v-list-item v-if="!member.DeletedAt && member.BHIndividualId !== '-1' && !(member.api_data.AutoPayStatus === 'Inactive' && (member.api_data.MemberStatusId == 0 || member.api_data.MemberStatusDesc == 'Inactive'))">
                                <template v-slot:prepend>
                                    <v-icon color="#092a5c" icon="mdi:mdi-playlist-edit"></v-icon>
                                </template>
                                <v-list-item-title>
                                    <a :href="`/individuals/${member.IndividualId}#unionRelationship`">Edit Dues Category</a>
                                </v-list-item-title>
                            </v-list-item>
                            <!-- 4th link -->
                            <v-list-item v-if="!member.DeletedAt && member.BHIndividualId !== '-1' && !(member.api_data.AutoPayStatus === 'Inactive' && (member.api_data.MemberStatusId == 0 || member.api_data.MemberStatusDesc == 'Inactive'))">
                                <template v-slot:prepend>
                                    <v-icon color="#092a5c" icon="mdi:mdi-credit-card"></v-icon>
                                </template>
                                <v-list-item-title>
                                    <span @click="flippedTo='EditPayment';onEdit()">Edit Payment</span>
                                </v-list-item-title>
                            </v-list-item>
                            <!-- 5th link -->
                            <v-list-item v-if="!member.DeletedAt && member.BHIndividualId !== '-1' && !(member.api_data.AutoPayStatus === 'Inactive' && (member.api_data.MemberStatusId == 0 || member.api_data.MemberStatusDesc == 'Inactive')) && member.TemplateId !== '6' && member.TemplateId !== '8' ">
                                <template v-slot:prepend>
                                    <v-icon color="#092a5c" icon="mdi:mdi-credit-card-remove-outline"></v-icon>
                                </template>
                                <v-list-item-title>
                                    <span @click.stop="dialogConfirmMoveToPD=true">Move to Local Payroll Deduction</span>
                                    <v-dialog
                                        v-model="dialogConfirmMoveToPD"
                                        persistent
                                        max-width="350"
                                    >
                                        <v-card>
                                            <v-card-title class="text-h6">
                                                <span>Move to Local Payroll Deduction</span>
                                            </v-card-title>
                                            <v-card-text class="text-subtitle-1">
                                                This is a permanent change and you won't be able to undo this change.
                                                Do you still wish to move <span>{{ member.FirstName }} {{ member.LastName }}</span> to Local Payroll Deduction?
                                                <v-progress-linear v-show="loadingMove" indeterminate></v-progress-linear>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    elevation="2"
                                                    color="error"
                                                    class="px-4"
                                                    :disabled="isDisabledMove"
                                                    @click="dialogConfirmMoveToPD=false; hideEditMenu();"
                                                >
                                                    Cancel Move
                                                </v-btn>
                                                <v-btn
                                                    elevation="2"
                                                    color="success"
                                                    class="px-4"
                                                    :disabled="isDisabledMove"
                                                    @click="moveToLocalPayrollDeduction(member.IndividualId)"
                                                >
                                                    Confirm Move
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-list-item-title>
                            </v-list-item>
                            <!-- 6th link -->
                            <v-list-item v-if="member.BHIndividualId == '-1' && !(member.api_data.AutoPayStatus === 'Inactive' && (member.api_data.MemberStatusId == 0 || member.api_data.MemberStatusDesc == 'Inactive'))">
                                <template v-slot:prepend>
                                    <v-icon color="#092a5c" icon="mdi:mdi-format-list-bulleted"></v-icon>
                                </template>
                                <v-list-item-title>
                                    <span @click.stop="dialogConfirmResendSub=true">Resend Submission</span>
                                    <v-dialog
                                        v-model="dialogConfirmResendSub"
                                        persistent
                                        max-width="350"
                                    >
                                        <v-card>
                                            <v-card-title class="text-h6">
                                                <span>Resend Submission</span>
                                            </v-card-title>
                                            <v-card-text class="text-subtitle-1">
                                                Do you still wish to resend the submission for <span>{{ member.FirstName }} {{ member.LastName }}</span> ?
                                                <v-progress-linear v-show="loadingResendSub" indeterminate></v-progress-linear>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    elevation="2"
                                                    color="error"
                                                    class="px-4"
                                                    :disabled="isDisabledResendSub"
                                                    @click="dialogConfirmResendSub=false; hideEditMenu();"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                    elevation="2"
                                                    color="success"
                                                    class="px-4"
                                                    :disabled="isDisabledResendSub"
                                                    @click="resendSubmission(member.IndividualId, member.AffiliateId, member.SubmissionId)"
                                                >
                                                    Confirm
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-list-item-title>
                            </v-list-item>
                            <!-- 7th link -->
                            <v-list-item v-if="(member.TemplateId == 6 || member.TemplateId == 8)
                                && member.api_data.MemberStatusDesc == 'Active'
                                && member.api_data.AutoPayStatus == 'Active'">
                                <template v-slot:prepend>
                                    <v-icon color="#092a5c" icon="mdi:mdi-credit-card-remove-outline"></v-icon>
                                </template>
                                <v-list-item-title>
                                    <span @click.stop="dialogConfirmCopeCancelPayment=true">Cancel Payment</span>
                                    <v-dialog
                                        v-model="dialogConfirmCopeCancelPayment"
                                        persistent
                                        max-width="350"
                                    >
                                        <v-card>
                                            <v-card-title class="text-h6">
                                                <span>Cancel Payment</span>
                                            </v-card-title>
                                            <v-card-text class="text-subtitle-1">
                                                Do you wish to cancel payment for <span>{{ member.FirstName }} {{ member.LastName }}</span> ?
                                                <v-progress-linear v-show="loadingCopeCancelPayment" indeterminate></v-progress-linear>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    elevation="2"
                                                    color="error"
                                                    class="px-4"
                                                    :disabled="isDisabledCopeCancelPayment"
                                                    @click="dialogConfirmCopeCancelPayment=false; hideEditMenu();"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                    elevation="2"
                                                    color="success"
                                                    class="px-4"
                                                    :disabled="isDisabledCopeCancelPayment"
                                                    @click="copeCancelPayment(member.IndividualId, member.AffiliateId)"
                                                >
                                                    Confirm
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-list-item-title>
                            </v-list-item>
                            <!-- 8th link -->
                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-icon color="#092a5c" icon="mdi:mdi-file-pdf-box"></v-icon>
                                </template>
                                <v-list-item-title>
                                    <a @click="download(member.SubmissionId)">Download PDF</a>
                                </v-list-item-title>
                            </v-list-item>
                            <!-- 9th link -->
                            <v-list-item v-if="!member.DeletedAt && member.BHIndividualId !== '-1'
                                && member.api_data.MemberStatusDesc == 'Active'
                                && member.api_data.AutoPayStatus == 'Active'">
                                <template v-slot:prepend>
                                    <v-icon color="#092a5c" icon="mdi:mdi-playlist-edit"></v-icon>
                                </template>
                                <v-list-item-title>
                                    <span @click="flippedTo='EditCopeAmount';onEdit()">Edit Cope Amount</span>
                                    <v-dialog
                                        v-model="dialogConfirmEditCopeAmount"
                                        persistent
                                        max-width="350"
                                    >
                                        <v-card>
                                            <v-card-title class="text-h6">
                                                <span>Edit COPE Amount</span>
                                            </v-card-title>
                                            <v-card-text class="text-subtitle-1">
                                                Do you wish to update the cope amount for <span>{{ member.FirstName }} {{ member.LastName }}</span>?
                                                <v-progress-linear v-show="loadingEditCopeAmount" indeterminate></v-progress-linear>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    elevation="2"
                                                    color="error"
                                                    class="px-4"
                                                    @click="dialogConfirmEditCopeAmount=false; hideEditMenu();"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                    elevation="2"
                                                    color="success"
                                                    class="px-4"
                                                    @click="updateCopeAmount(member.IndividualId, member.AffiliateId, copeAmount)"
                                                >
                                                    Confirm
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-expansion-panel-title>
                        <div v-if="member.BHIndividualId === '-1'" class="edues-icons">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="2" viewBox="0 0 64 512"><path fill="#e84117" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                        </div>
                        <div class="edues-icons"  v-else-if="(member.api_data.AutoPayStatus === 'Inactive' && member.api_data.MemberStatusDesc == 'Active')
                            || ((member.TemplateId == 6 || member.TemplateId == 8) && member.api_data.AutoPayStatus === 'Inactive' && member.api_data.MemberStatusDesc == 'Inactive')">
                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 640" x="0px" y="0px"><title>No Cash</title><path d="M58.664,233.527a16.336,16.336,0,0,0-6.982,21.989A15.866,15.866,0,0,0,61.4,263.36a16.728,16.728,0,0,0,20.459-10.869,15.861,15.861,0,0,0-1.062-12.438A16.334,16.334,0,0,0,58.664,233.527ZM70.439,248.79a4.733,4.733,0,0,1-5.72,3.04,3.964,3.964,0,0,1-2.439-1.943,4.328,4.328,0,0,1,2.013-5.762,4.732,4.732,0,0,1,2.222-.56,4.1,4.1,0,0,1,3.68,2.118A3.961,3.961,0,0,1,70.439,248.79Z"/><path d="M327.911,308.359a56.714,56.714,0,1,0-33.484-27.623A56.883,56.883,0,0,0,327.911,308.359Zm-4.376-93.717a44.714,44.714,0,1,1-18.51,60.465A44.442,44.442,0,0,1,323.535,214.642Z"/><path d="M315.2,275.7a5.966,5.966,0,0,0,2.809-.7l2.353-1.25a18.994,18.994,0,0,0,13.042,5.2,18.9,18.9,0,0,0,16.664-27.771,6.905,6.905,0,1,1,9.338,2.857,6,6,0,1,0,5.628,10.6,18.873,18.873,0,0,0,9.771-19.8l1.834-.975a6,6,0,0,0-5.629-10.6l-1.835.975a18.9,18.9,0,0,0-29.7,22.575,6.9,6.9,0,0,1-12.148,6.558c-.015-.028-.025-.056-.04-.084s-.032-.052-.047-.08a6.911,6.911,0,0,1,2.9-9.254,6,6,0,0,0-5.629-10.6,18.924,18.924,0,0,0-9.765,19.8l-2.358,1.252a6,6,0,0,0,2.82,11.3Z"/><path d="M256,10A246,246,0,0,0,82.052,429.948a246,246,0,1,0,347.9-347.9A244.39,244.39,0,0,0,256,10ZM90.537,421.463A234.082,234.082,0,0,1,365.016,48.831L294.237,182.806l-63.393-26.122a5.721,5.721,0,0,0-.581-.2,30.62,30.62,0,0,0-23.205,2.331L88.94,221.557l-2.094-3.942a16.02,16.02,0,0,0-21.636-6.623L37.421,225.755A16.019,16.019,0,0,0,30.8,247.391L83.959,347.464h0a16.01,16.01,0,0,0,21.637,6.623l27.789-14.763a16.018,16.018,0,0,0,6.623-21.636l-.057-.107,23.721-12.6A30.826,30.826,0,0,0,202,312.706l22.629-12.021,3.677,6.92-82,155.212A234.787,234.787,0,0,1,90.537,421.463Zm4.02-79.628L41.4,241.762a4,4,0,0,1,1.656-5.409L70.84,221.59a4,4,0,0,1,5.409,1.655l53.162,100.073a4.006,4.006,0,0,1-1.656,5.41L99.966,343.49a4.006,4.006,0,0,1-5.409-1.656Zm.013-109.68,118.118-62.748a18.7,18.7,0,0,1,13.888-1.5l59.307,24.439L247.6,212.68l-34.7-15.2a6,6,0,1,0-4.813,10.993l58.955,25.816-6.473,12.252a12.628,12.628,0,0,1-3.767-.553L221.222,235.1a6,6,0,0,0-4.261.285l-5.221,2.4c-.105.048-.208.1-.31.154a30.656,30.656,0,0,0-10.154,8.817,27.662,27.662,0,0,1-24.767,10.874,6.013,6.013,0,0,0-3.412.672l-10.952,5.817a6,6,0,1,0,5.629,10.6l9.421-5a39.836,39.836,0,0,0,26.5-8.442L219,290.087l-22.63,12.021a18.8,18.8,0,0,1-25.427-7.784,6,6,0,0,0-8.114-2.484l-28.507,15.144Zm185.942-23.37-7.855,14.867-11.035-4.832Zm-68.09,43.345a18.018,18.018,0,0,1,4.5-3.52l2.977-1.367,33.39,10.222c.438.134.878.252,1.319.361L235.08,294.781Zm56.083,5.071a24.909,24.909,0,0,0,3.523-1.534,24.435,24.435,0,0,0,11.983-14.524l1.815-5.929a5.992,5.992,0,0,0-2.217-6.6l15.77-29.851,103.749-55.116a4.144,4.144,0,0,1,5.6,1.715l61.86,116.446a4.148,4.148,0,0,1-1.715,5.6L278.855,368.354a4.147,4.147,0,0,1-5.6-1.715L241.885,307.59ZM421.463,421.463a234.421,234.421,0,0,1-264.415,46.71l78.061-147.758,27.546,51.853a16.148,16.148,0,0,0,21.83,6.683L474.5,278.007a16.161,16.161,0,0,0,6.683-21.829L419.328,139.732a16.141,16.141,0,0,0-21.829-6.683l-88.141,46.823L375.485,54.7a235.5,235.5,0,0,1,45.978,35.834,234,234,0,0,1,0,330.926Z"/></svg>
                        </div>
                        <div class="edues-icons"  v-else-if="member.api_data.AutoPayStatus === 'Inactive' && (member.api_data.MemberStatusId == 0 || member.api_data.MemberStatusDesc == 'Inactive')">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path fill="#e6a71e" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                        </div>
                        <div class="edues-icons"  v-else-if="member.api_data.AutoPayStatus === 'Inactive' && member.api_data.MemberStatusDesc == 'Active' && member.BillHighwayGroupId === -1">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="2" viewBox="0 0 64 512"><path fill="#e63e14" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                        </div>
                        <div class="edues-icons"  v-else-if="member.is_member === 1 && member.api_data.MemberStatusDesc == 'Inactive'">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="2" viewBox="0 0 64 512"><path fill="#e84117" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                        </div>
                        <div class="edues-icons"  v-else-if="member.is_retired_member === 1 && member.api_data.MemberStatusCode == 'RI'">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="2" viewBox="0 0 64 512"><path fill="#e84117" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                        </div>
                        <div class="edues-icons fa fa-check" style="font-size: 32px; color: green;"  v-else>
                        </div>
                        <h4 class="mb-0 edues-h4">{{ member.FirstName }} {{ member.LastName }}</h4>
                        <div v-if="member.DeletedAt">[Moved to Local Payroll Deduction]</div>
                        <div v-else-if="member.TemplateId == 7" class="data-only"> - Data only</div>
                        <div v-else-if="member.TemplateId == 6" class="data-only"> - Recurring COPE only</div>
                        <div v-else-if="member.TemplateId == 8" class="data-only"> - Local # {{ member.affillateNumber ? member.affillateNumber:''}} Recurring COPE only</div>
                        <div v-if="member.DeletedAt">Moved to Local Payroll Deduction</div>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <FlipCard :flipped="flipped">
                            <template #front>
                                <v-progress-linear v-show="loading" indeterminate></v-progress-linear>
                                <div
                                    v-for="(user, j) in memberMatch(Number(member.IndividualId))"
                                    :key="j"
                                >
                                <v-row>
                                    <v-col class="text-left">
                                        <div v-if="member.BHIndividualId === '-1'" class="edues-icons">
                                            <h5 class = 'message-display'>Unable to verify the data. Please resolve any conflicts associated to submission.</h5>
                                        </div>
                                        <div class="edues-icons" v-if="member.api_data.AutoPayStatus === 'Inactive' && (member.api_data.MemberStatusId == 0 || member.api_data.MemberStatusDesc == 'Inactive')">
                                            <h5 class = 'message-display'>This member is a non-member union relationship status. In Connect please update the union relationship.</h5>
                                        </div>
                                        <div class="edues-icons" v-if="member.api_data.AutoPayStatus === 'Inactive' && member.api_data.MemberStatusDesc == 'Active'">
                                            <h5 class = 'message-display'>Dues are no longer being collected from this member</h5>
                                        </div>
                                        <div v-if="member.is_member === 1 && member.api_data.MemberStatusDesc == 'Inactive'">
                                            <h5 class = 'message-display'>Conflict: custom header message</h5>
                                        </div>
                                    </v-col>
                                </v-row>
                                    <v-divider></v-divider>
                                    <h5 class="mt-10 bhTitle">BillHighway Status: </h5>
                                    <v-card
                                        class="d-flex justify-space-around mb-4 mt-6 pb-4 stat-card"
                                        flat
                                    >
                                        <v-card
                                            class="pa-2"
                                            border
                                            color="transparent"
                                            flat
                                        >
                                            Record Status

                                            <span :class="user[1].MemberStatusDesc === 'Inactive' || user[1].MemberStatusCode === 'RI' ? 'stat-error' : ''">
                                                {{ user[1].MemberStatusDesc }}
                                            </span>
                                        </v-card>
                                        <v-card
                                            class="pa-2"
                                            border
                                            color="transparent"
                                            flat
                                            v-if="user[1].AutoPayInfo"
                                        >
                                            Payment (Last 4)
                                            <span v-if="user[1].AutoPayInfo.PaymentMethod === 'Credit Card'">{{ user[1].AutoPayInfo.CardNumberLastFour }}</span>
                                            <span v-else>{{ user[1].AutoPayInfo.AccountNumberLastFour }}</span>
                                        </v-card>
                                        <v-card
                                            class="pa-2"
                                            border
                                            color="transparent"
                                            flat
                                        >
                                            Billing Type ID
                                            <span>{{ user[1].BillingTypeId }}</span>
                                        </v-card>
                                        <v-card
                                            class="pa-2"
                                            border
                                            color="transparent"
                                            flat
                                        >
                                            AutoPay
                                            <span
                                                :class="{ 'stat-error': user[1].AutoPayStatus !== 'Active' }">
                                                {{ user[1].AutoPayStatus }}
                                            </span>
                                        </v-card>
                                        <v-card
                                            class="pa-2"
                                            border
                                            color="transparent"
                                            flat
                                        >
                                            Current balance
                                            <span :class="{ 'stat-error': user[1].CurrentBalance > 0 }">${{ user[1].CurrentBalance }}</span>
                                        </v-card>
                                    </v-card>
                                    <h5 class="mt-10">Submission Information:</h5>
                                    <v-card
                                        class="d-flex mb-2 mt-2 pa-2 sub-info"
                                        flat
                                    >
                                        <v-row class="d-flex flex-wrap">
                                            <v-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <h5>AFT GUID</h5>
                                                <span>{{ user[1].UserId }}</span>
                                            </v-col>
                                            <!-- <v-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <h5>Billhighway Payment Reference</h5>
                                                <span>{{ user[1].MemberTypeDesc }}</span>
                                            </v-col> -->
                                            <v-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <h5>Billhighway ID</h5>
                                                <span>{{ user[1].BhUserId }}</span>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <h5>Billing Type</h5>
                                                <span>{{ user[1].BillingTypeId }} - {{ user[1].BillingTypeName }}</span>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                lg="6"
                                                v-if="user[0].IndividualEmails"
                                            >
                                                <h5>Email</h5>
                                                <span>{{ user[0].IndividualEmails.Email }}</span>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                lg="6"
                                                v-if="user[0].IndividualPhones"
                                            >
                                                <h5>Phone Number</h5>
                                                <span>{{ updatedPhoneNumber(user[0].IndividualPhones.Number) }}</span>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-card
                                        class="d-flex justify-space-around mb-6 pa-2 date-sub"
                                        flat
                                    >
                                        <v-row class="d-flex justify-end">
                                            <v-col
                                                cols="12"
                                                lg="6"
                                                class="date-submitted"
                                            >
                                                <h5 class="mb-0" v-if="user[0].Source">
                                                    Source: <span class="text-subtitle-1">
                                                        {{ user[0].Source }}
                                                    </span>
                                                </h5>
                                                <h5 class="mb-0" v-if="user[0].SubmittedDate">
                                                    Date Submitted: <span class="text-subtitle-1">
                                                        {{ formatDate(user[0].SubmittedDate) }} EST
                                                    </span>
                                                </h5>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-row>
                                    <v-col class="text-left">
                                        <div v-if="member.BHIndividualId === '-1'" class="edues-icons">
                                            <h5 class = 'message-display'>Bill Highway Conflict:(Display the error msg that is received via API). For assistance, Please contact AFT.</h5>
                                        </div>
                                        <div class="edues-icons" v-if="member.api_data.AutoPayStatus === 'Inactive' && (member.api_data.MemberStatusId == 0 || member.api_data.MemberStatusDesc == 'Inactive')">
                                            <h5 class = 'message-display'>This member is a non-member union relationship status. In Connect please update the union relationship.</h5>
                                        </div>
                                        <div class="edues-icons" v-if="member.api_data.AutoPayStatus === 'Inactive' && member.api_data.MemberStatusDesc == 'Active'">
                                            <h5 class = 'message-display'>please click on the menu and select an option to resolve.</h5>
                                        </div>
                                        <div v-if="member.is_member === 1 && member.api_data.MemberStatusDesc == 'Inactive'">
                                            <h5 class = 'message-display'>Conflict: custom footer message</h5>
                                        </div>
                                    </v-col>
                                </v-row>
                                </div>
                            </template>
                            <template #back>
                                <span v-if="flippedTo === 'EditPayment'">
                                    <edit-edues-payment-component :key="uniqueNo" :individual="ind" :bill-highway-data="billHighwayData" :required="true" v-on:cancel-edit-payment="flipped=false" @clicked-force-render="forceRender"></edit-edues-payment-component>
                                </span>
                                <span v-else-if="flippedTo === 'EditCopeAmount'">
                                    <v-row>
                                        <v-col class="text-left">
                                            Current COPE contribution: <strong>${{ind.CopeAmount}}</strong>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="text-left">
                                            Update {{ member.FirstName }} {{ member.LastName }}'s COPE contribution:
                                            <v-text-field prefix="$" :disabled="ind.CopeAmount == 0" v-model="copeAmount"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="text-right hidden-md-and-down">
                                            <v-btn class="px-4" @click="flipped=false">Cancel</v-btn>
                                            <v-btn
                                                color="success"
                                                class="px-4"
                                                :disabled="ind.CopeAmount == 0"
                                                @click="dialogConfirmEditCopeAmount=true"
                                            >
                                                Update COPE contribution
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row v-if="ind.CopeAmount == 0" style="color: #ff0000">
                                        {{ member.FirstName }} {{ member.LastName }} needs to submit form with cope contribution to allow updating the cope amount.
                                    </v-row>
                                </span>
                            </template>
                        </FlipCard>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <div
                class="text-center"
            >
                <v-row>
                    <v-col>
                        <v-select
                            label="Rows per page"
                            style="width:120px;"
                            v-model="pageSize"
                            :items="itemsPerPageOptions"
                            variant="underlined"
                        />
                    </v-col>
                    <v-col v-if="paginationSize > 1">
                        {{ (pageSize * pageNumber) - pageSize + 1}}-{{ (pageSize * pageNumber) > totalRecords ? totalRecords : pageSize * pageNumber}} of {{totalRecords}}
                    </v-col>
                    <v-col v-if="paginationSize > 1">
                        <v-pagination
                            v-model="pageNumber"
                            :length="paginationSize"
                            :total-visible="visiblePages"
                            @update:model-value="setPage"
                        ></v-pagination>
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import { format, subHours } from 'date-fns';
import contactsMixin from "../../mixins/UI/contactsMixin";
import FlipCard from "../Common/Card/FlipCard";
import EditEduesPaymentComponent from "./Partial/Edit/EditEduesPaymentComponent";

    export default {
        name: "IndividualEduesComponent",
        components: {
            EditEduesPaymentComponent,
            FlipCard,
        },
        mixins: [contactsMixin],
        data() {
            return {
                id: '',
                individualId: '',
                individual: {},
                ind: {},
                billHighwayData: {},
                bhData: [],
                indData: [],
                affiliateId: null,
                isActive: false,
                activateOrDeactivate: '',
                flipped: false,
                loading: false,
                overlay: true,
                dialogConfirm: false,
                parentMenu: false,
                dialogConfirmMoveToPD: false,
                dialogConfirmResendSub: false,
                dialogConfirmCopeCancelPayment: false,
                isDisabledMove: false,
                isDisabledResendSub: false,
                isDisabledCopeCancelPayment: false,
                loadingMove: false,
                loadingResendSub: false,
                loadingCopeCancelPayment: false,
                isDisabledActive: false,
                loadingActive: false,
                menu: false,
                startDateMenu: false,
                endDateMenu: false,
                firstName: null,
                lastName: null,
                submissionDate: null,
                submissionStartDate: null,
                submissionEndDate: null,
                pageSize: 10,
                itemsPerPageOptions: [5, 10, 15, 30, 50],
                totalRecords: 0,
                visiblePages: 7,
                templateTypes: [],
                selectedTemplateId: null,
                pageNumber: 1,
                itemsShowed: {},
                offset: 0,
                limit: 0,
                numOfPages: 0,
                paginationSize: 0,
                filters: [],
                panelKey: 0,
                childAffiliates: '',
                copeOnly: null,
                sortOptions:[
                    { 'type': 'date_submitted', 'label': 'Date Submitted' },
                    { 'type': 'last_name', 'label': 'Last Name' }
                ],
                sortBy: 'date_submitted',
                sortOrderOptions:[
                    { 'type': 'desc', 'label': 'Descending' },
                    { 'type': 'asc', 'label': 'Ascending' }
                ],
                sortOrder: 'desc',
                hasEdues: false,
                flippedTo: '',
                copeAmount: null,
                dialogConfirmEditCopeAmount: false,
                loadingEditCopeAmount: false,
                uniqueNo: 0,
            }
        },
        created() {
            this.affiliateId = this.$store.getters['user/selectedAffiliate'].AffiliateId;
            this.getHasDues();
            this.getTemplatesApi();
        },
        computed: {
            // getIndividualData:function(){
            //     return this.individual;
            // },
            memberMatch:function(){
                return id => Object.values(this.billHighwayData).filter(member => Number(member[0].individualId) === id);
            }
        },
        watch: {
            data(){
                this.loading = false;
            },
            pageSize(){
                this.getDataFromApi();
            },
        },
        mounted() {
            this.id = this.$route.params.id;
            this.getChildAffiliatesApi();
        },
        methods: {
            toggleFilter() {
                if(this.filters.length>0){
                    this.filters = [];
                }else{
                    this.filters=[this.panelKey];
                }
            },
            setItems() {
                this.offset = (this.pageNumber - 1) * this.pageSize;
                this.limit = this.offset + this.pageSize;
                this.numOfPages = Math.ceil(this.individual.length / this.pageSize);
                if (this.offset > this.individual.length) {
                    this.pageNumber = this.numOfPages;
                }
                //this.itemsShowed = this.individual.slice(this.offset, this.pageSize + this.offset);
            },
            setPage(n) {
                this.pageNumber = n;
                //this.setItems();
                this.getDataFromApi()
                //return this.itemsShowed;
            },
            forceRender(value) {
                this.getEduesDetailsApi(value);
            },
            open() {
                this.dialogConfirm = true;
            },
            clear() {
                this.firstName = null;
                this.lastName = null;
                this.submissionDate = null;
                this.submissionStartDate = null;
                this.submissionEndDate = null;
                this.selectedTemplateId = null;
                this.sortBy = 'date_submitted';
                this.sortOrder = 'desc';
                this.copeOnly = null;
                this.getDataFromApi();
            },
            hideEditMenu() {
                const clickable = document.querySelector(".v-menu__content");
                clickable.click(function() {
                    // console.log('clicked');
                });
            },
            formatDate(date) {
                return format(subHours(new Date(date), 5), 'MMMM do yyyy, h:mm a');
                // return moment.utc(date).subtract(5, 'hours').format("MMMM Do YYYY, h:mm a");
            },
            getDataFromApi() {
                this.loading = true;
                this.overlay = true;

                let filter = '';
                if (this.firstName) {
                    filter += '&FirstName='+this.firstName;
                }

                if (this.lastName) {
                    filter += '&LastName='+this.lastName;
                }

                if (this.submissionDate) {
                    filter += '&SubmissionDate='+this.submissionDate;
                }

                if (this.submissionStartDate) {
                    filter += '&SubmissionStartDate='+this.submissionStartDate;
                }

                if (this.submissionEndDate) {
                    filter += '&SubmissionEndDate='+this.submissionEndDate;
                }

                if (this.sortBy) {
                    filter += '&SortBy='+this.sortBy;
                }

                if (this.sortOrder) {
                    filter += '&SortOrder='+this.sortOrder;
                }

                if (this.copeOnly) {
                    filter += '&CopeOnly='+this.copeOnly;
                }

                if (this.selectedTemplateId) {
                    filter += '&TemplateId='+this.selectedTemplateId;
                }
                if (this.childAffiliates) {
                    filter += '&childAffiliateIds='+this.childAffiliates;
                }
                filter += '&page='+this.pageNumber+'&pageSize='+this.pageSize;
                return axios.get('/api/v3/memberforms/admin/edues-submission?scope=global&affiliateId=' + this.affiliateId + filter)
                    .then(response => {
                        this.individual = response.data.results;
                        // console.log(Object.assign({}, this.individual[0]));
                        if(this.individual.length > 0) {
                            this.individual.forEach((item, index) => {
                                // this.id = item.id;
                                this.individualId = item.IndividualId;
                                // console.log(this.individualId);
                            });
                            this.itemsShowed = response.data.results;
                            // Show items
                            //this.setItems();
                            //this.paginationSize = Math.ceil(this.individual.length / this.pageSize);
                            this.pageNumber = response.data.current_page;
                            this.paginationSize = response.data.last_page;
                            this.totalRecords = response.data.total;
                        }  else if(this.pageNumber > 1) {
                            this.pageNumber = response.data.last_page;
                            this.getDataFromApi();
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                        this.overlay = false;
                    });
            },
            getChildAffiliatesApi() {
                this.loading = true;
                return axios.get('/api/v3/memberforms/admin/child-affiliates?scope=global&affiliateId=' + this.affiliateId)
                    .then(response => {
                        this.childAffiliates = response.data.join(',');
                        this.getDataFromApi();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            getTemplatesApi() {
                this.loading = true;
                return axios.get('/api/v3/memberforms/admin/get-templates')
                    .then(response => {
                        this.templateTypes = response.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            getEduesDetailsApi(individualId) {
                this.flipped=false;
                this.loading = true;
                return axios.get('/api/v3/memberforms/admin/edues-submission-details/'+individualId+'/'+this.affiliateId+'?scope=global')
                    .then(response => {
                        const memberArray = Object.entries(response.data).map((arr) => ({
                            bhData: arr[0],
                            indData: arr[1],
                        }));

                        this.ind = Object.assign({}, memberArray[1].indData);
                        this.billHighwayData = [[memberArray[1].indData, memberArray[2].indData]];

                        this.isActive = false;
                        this.activateOrDeactivate = 'Activate';
                        if (memberArray[2].indData.MemberStatusDesc === 'Active' || memberArray[2].indData.MemberStatusCode === 'RA') {
                            this.Active = true;
                            this.activateOrDeactivate = 'Deactivate';
                        } else if (memberArray[2].indData.MemberStatusDesc === 'Active - Manual Payment') {
                            this.Active = true;
                            this.activateOrDeactivate = 'Deactivate';
                        }
                        var singleIndiData = this.itemsShowed.find(item => item.IndividualId == this.ind.individualId);
                        singleIndiData.BHIndividualId = this.ind.BHIndividualId;
                        singleIndiData.api_data.MemberStatusId = this.billHighwayData ? this.billHighwayData[0][1].MemberStatusId: '';
                        singleIndiData.api_data.AutoPayStatus = this.billHighwayData ? this.billHighwayData[0][1].AutoPayStatus : '';
                        singleIndiData.api_data.MemberStatusDesc = this.billHighwayData ? this.billHighwayData[0][1].MemberStatusDesc:'';
                        singleIndiData.api_data.MemberStatusCode = this.billHighwayData ? this.billHighwayData[0][1].MemberStatusCode:'';
                        singleIndiData.BillHighwayGroupId = this.ind.BillHighwayGroupId;
                        var indIndex = this.itemsShowed.indexOf(singleIndiData);
                        this.itemsShowed[indIndex] = singleIndiData;
                    })
                    .finally(() => {
                        this.loading = false;
                        this.uniqueNo = this.uniqueNo + 1;
                    });
            },
            updatedPhoneNumber(pNum) {
                let phoneString = pNum.replace(/[^+\d]+/g, "");
                const x = phoneString.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                pNum = (!x[2] ? x[1] : `(${x[1]}) ${x[2]}-${x[3]}`);
                return pNum;
            },
            cancelActiveState() {
                this.dialogConfirm = false;
            },
            toggleActiveState(individualId, activateOrDeactivate, templateId) {
                this.loadingActive = true;
                this.isDisabledActive = true;
                const data = {};
                data.affiliateId = this.affiliateId;
                data.individualId = individualId;

                if (activateOrDeactivate.toLowerCase() === 'deactivate') {
                    data.status = templateId == '9' ? 'RI': 'I'
                } else {
                    data.status = templateId == '9' ? 'RA' : templateId == '7' ? 'A-MP' : 'A';
                }

                axios.post('/api/v3/memberforms/admin/submission/update-member-status', data)
                    .then((response) => {
                        this.dialogConfirm = false;
                        this.loadingActive = false;
                        this.isDisabledActive = false;
                        this.getEduesDetailsApi(individualId);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally();
            },
            onSavedIndividual(individual) {
                this.flipped = false;
                this.getDataFromApi();
            },
            moveToLocalPayrollDeduction(individualId) {
                this.isDisabledMove = true;
                this.loadingMove = true;
                axios.post('/api/v2/billHighway/moveToLocalPayrollDeduction',
                        { IndividualId: individualId, AffiliateId: this.affiliateId }
                    )
                    .then((response) => {
                        this.dialogConfirmMoveToPD = false;
                        this.hideEditMenu();
                        this.isDisabledMove = false;
                        this.loadingMove = false;
                        this.$router.go(0);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally();
            },
            resendSubmission(individualId, affiliateId, submissionId) {
                this.isDisabledResendSub = true;
                this.loadingResendSub = true;
                axios.post('/api/v3/memberforms/admin/edues-enrollment',
                {
                    IndividualId: individualId,
                    AffiliateId: affiliateId,
                    SubmissionId: submissionId,
                    Source: 'Membership Forms Portal',
                })
                    .then(response => {
                        this.dialogConfirmResendSub = false;
                        this.hideEditMenu();
                        this.isDisabledResendSub = false;
                        this.loadingResendSub = false;
                        this.$router.go(0);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally();
            },
            updateCopeAmount(individualId, affiliateId, copeAmount) {
                this.loadingEditCopeAmount = true;
                axios.post('/api/v2/billHighway/updateCopeAmount',
                    {
                        IndividualId: individualId,
                        AffiliateId: affiliateId,
                        CopeAmount: copeAmount,
                    })
                    .then(response => {
                        this.loadingEditCopeAmount = false;
                        this.hideEditMenu();
                        this.flipped = false;
                        this.copeAmount = null;
                        this.getEduesDetailsApi(individualId);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally();
            },
            copeCancelPayment(individualId, affiliateId) {
                this.isDisabledCopeCancelPayment = true;
                this.loadingCopeCancelPayment = true;
                axios.post('/api/v2/billHighway/copeCancelPayment',
                    {
                        IndividualId: individualId,
                        AffiliateId: affiliateId,
                        Source: 'eDues',
                    })
                    .then(response => {
                        this.dialogConfirmCopeCancelPayment = false;
                        this.hideEditMenu();
                        this.isDisabledCopeCancelPayment = false;
                        this.loadingCopeCancelPayment = false;
                        this.getEduesDetailsApi(individualId);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally();
            },
            getHasDues() {
                axios.get('/api/v3/memberforms/admin/has-edues/' + this.affiliateId).then(response => {
                    this.hasEdues = response.data.hasEdues;
                });
            },
            download(id) {
                this.loading = true;
                axios.request({
                    url: '/api/v3/memberforms/admin/submission/' + id + '/download',
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    const cd = response.headers['content-disposition'].split('; ');
                    const disposition = [];
                    cd.forEach((item) => {
                        const t = item.split('=');
                        if (t[1]) { t[1] = t[1].replace(/^"(.+)"$/, '$1'); }
                        disposition[t[0]] = t[1];
                    });
                    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.setAttribute('download', disposition.filename);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                })
                .finally(() => {
                    this.loading = false;
                });
            },
            updateStartDate(date) {
                this.submissionStartDate = format(date, 'yyyy-MM-dd');
                this.startDateMenu = false;
            },
            updateEndDate(date) {
                this.submissionEndDate = format(date, 'yyyy-MM-dd');
                this.endDateMenu = false;
            }
        },
    }
</script>

<style lang="scss" scoped>
.edit-menu {
    .activeMenu {
        display: block;
    }
}
.edit-acct_btn {
    .v-overlay__content {
        .v-list {
            .v-list-item {
                cursor: pointer;
            }
        }
    }
}
.edues-expansion {
    .edit-icon {
        display: none;
        position: absolute;
        right: 24px;
        top: 19px;
        width: 35px;
        height: 22px;
        background: white;
        span {
            position: relative;
            width: 20px;
            height: 5px;
            background-color: #092a5c;
            &:before, &:after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0px;
                background-color: inherit;
                border-radius: inherit;
            }
            &:before {
                top: 8px;
            }
            &:after {
                top: 16px;
            }
        }
    }
    .v-expansion-panel--active {
        .edit-icon {
            display: flex;
            justify-content: flex-end;
            z-index: 1;
            cursor: pointer;
        }
    }
    .v-expansion-panel-title {
        color: #092a5c;
    }
    .v-expansion-panel {
        margin-bottom: 1rem;
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        h5 { font-weight: 600; }
        .stat-card {
            border-bottom: 1px solid #ccc;
            border-radius: 0;
            .v-card {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                text-transform: capitalize;
                width: 100%;
                line-height: 22px;
                font-weight: 600;
                border-right: 1px solid #ccc !important;
                border-radius: unset;
                span {
                    margin-top: 8px;
                    color: #379306;
                    &.stat-error {
                        color: #D32F2F;
                    }
                }
                &:last-of-type {
                    border-right: none !important;
                    span {
                        font-size: 140%;
                    }
                }
            }
        }
        .sub-info {
            span {
                font-size: 1rem;
                color: #757575;
                letter-spacing: 0.025rem;
            }
        }
        .date-sub {
            border-bottom: 1px solid #ccc;
            border-radius: 0;
            h5 {
                color: #092a5c;
                font-weight: 500;
            }
            span {
                color: #757575;
            }
        }
    }
    .v-expansion-panel--active+.v-expansion-panel,
    .v-expansion-panel--active:not(:first-child) {
        margin-top: 0;
    }
    @media only screen and (max-width: 960px) {
        .v-expansion-panel {
            .stat-card {
                flex-wrap: wrap;
                .v-card {
                    width: 50%;
                    margin-bottom: 1rem;
                    &:nth-of-type(even) {
                        border: none !important;
                    }
                }
            }
            .date-sub {
                h5, span { font-size: 0.875rem !important; }
            }
        }
    }
}
.edues-icons{
    flex: none;
    svg {
        width: 30px;
        height: 30px;
        margin-right: 3px;
    }
}
.edues-h4 {
    margin-left: 10px;
}
.v-application--is-ltr .v-list-item__icon:first-child {
    margin-right: 16px;
}
.v-expansion-panel-title h4{
    flex: none;
}
.message-display{
    text-align: center;
    color: #0C4499;
}
.data-only{
    font-style: italic;
    color: #0c080d70;
}
</style>
