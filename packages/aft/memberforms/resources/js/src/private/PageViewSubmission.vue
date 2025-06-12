<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <div class="form-header">
                    <div
                        v-if="formSubmission.Form &&
                            formSubmission.Form.show_aft_logo == false &&
                            formSubmission.Form.show_local_logo == false &&
                            formSubmission.Form.show_fed_logo == false"
                    />
                    <v-card-title
                        v-else
                        class="d-flex justify-space-between"
                        flat
                        tile
                    >
                        <v-col
                            cols="12" sm="4"
                        >
                            <v-img
                                v-if="formSubmission.Form && formSubmission.Form.show_aft_logo == '1'"
                                class="first-logo"
                                max-width="120"
                                max-height="48"
                                cover
                                :src="logoSm"
                            />
                            <v-img
                                v-else-if="formSubmission.Form &&
                                    ((formSubmission.Form.show_aft_logo == false &&
                                        formSubmission.Form.show_fed_logo == true &&
                                        formSubmission.Form.show_local_logo == false) ||
                                        (formSubmission.Form.show_aft_logo == false &&
                                            formSubmission.Form.show_fed_logo == false &&
                                            formSubmission.Form.show_local_logo == true))"
                                class="first-logo"
                                max-width="120"
                                max-height="48"
                                cover
                            />
                            <v-img
                                v-else-if="formSubmission.Form && formSubmission.Form.show_aft_logo == false &&
                                    formSubmission.Form.show_fed_logo == true"
                                class="first-logo"
                                max-width="120"
                                max-height="48"
                                cover
                                :src="formSubmission.Form.fed_logo_url && formSubmission.Form.fed_logo_url"
                            />
                        </v-col>
                        <v-col
                            cols="12" sm="4"
                            class="d-flex justify-center"
                        >
                            <v-img
                                v-if="formSubmission.Form && formSubmission.Form.show_fed_logo &&
                                    formSubmission.Form.show_aft_logo == true &&
                                    formSubmission.Form.show_local_logo == true"
                                class="second-logo"
                                max-width="120"
                                max-height="48"
                                cover
                                :src="formSubmission.Form.fed_logo_url && formSubmission.Form.fed_logo_url"
                            />
                        </v-col>
                        <v-col
                            cols="12" sm="4"
                        >
                            <v-img
                                v-if="formSubmission.Form && formSubmission.Form.show_local_logo &&
                                    formSubmission.Form.show_local_logo == true"
                                class="third-logo"
                                max-width="120"
                                max-height="48"
                                cover
                                :src="formSubmission.Form.local_logo_url && formSubmission.Form.local_logo_url"
                            />
                            <v-img
                                v-else-if="formSubmission.Form && formSubmission.Form.show_local_logo == false &&
                                    formSubmission.Form.show_fed_logo == true"
                                class="third-logo"
                                max-width="120"
                                max-height="48"
                                cover
                                :src="formSubmission.Form.fed_logo_url && formSubmission.Form.fed_logo_url"
                            />
                        </v-col>
                    </v-card-title>
                    <h3
                        v-if="formSubmission.Form"
                        class="py-4 form-title"
                    >
                        {{ formSubmission.Form.display_name }}
                    </h3>
                </div>
                <!-- <v-divider /> -->
            </v-col>
        </v-row>
        <v-row class="submission-cols">
            <v-col>
                <h2>Submission Details</h2>
                <template
                    v-for="(item, index) in submissionData"
                    :key="index"
                    class="mb-5"
                >
                    <v-row
                        v-if="item.data_name != 'legal' && item.data_name != 'signature' &&
                            item.data_name != 'copeLegal' && item.data_name != 'copeSignature' &&
                            item.data_name != 'signatureOther'"
                    >
                        <v-col
                            cols="12" sm="2"
                            class="col-one pa-3"
                            v-if="item.data_type !== 'markup'"
                        >
                            <span v-if="item.data_label === 'Token'">
                                Payment Information:
                            </span>
                            <span v-else-if="item.data_name !== 'agree'">
                                {{ item.data_label }}
                            </span>
                            <span v-else>
                                Opt for text
                            </span>
                        </v-col>
                        <v-col
                            v-if="item.data_type=='drawing'"
                            cols="11"
                            class="ml-6 pa-2"
                        >
                            <span>
                                <v-img
                                    style="max-width: 100%"
                                    :src="item.data_value"
                                />
                            </span>
                        </v-col>
                        <v-col
                            v-else-if="item.data_type === 'textarea'"
                            cols="11"
                        >
                            <!-- eslint-disable vue/no-v-html -->
                            <blockquote
                                class="blockquote pl-6 pt-0"
                                v-html="item.data_value"
                            />
                            <!--eslint-enable-->
                        </v-col>
                        <v-col
                            v-else-if="item.data_type === 'markup'"
                            cols="11"
                        >
                            <!-- eslint-disable vue/no-v-html -->
                            <blockquote
                                class="blockquote pl-6 pt-0"
                                v-html="item.data_value"
                            />
                            <!--eslint-enable-->
                        </v-col>
                        <v-col
                            v-else-if="item.data_type === 'checkbox'"
                            cols="12" sm="9"
                            class="pa-3 col-two"
                        >
                            <span v-if="item.data_value">
                                Yes
                            </span>
                            <span v-else>
                                No
                            </span>
                        </v-col>
                        <v-col
                            v-else-if="item.data_type === 'workLocation'"
                            cols="12" sm="9"
                            class="pa-3 col-two"
                        >
                            <p
                                v-for="(workLocation, index2) in item.data_value"
                                :key="index2"
                                class="mb-5"
                            >
                                <v-row>
                                    <v-col
                                        cols="12" sm="2"
                                        class="col-one pa-3"
                                    >
                                        <span>{{ workLocation.data_label }}:</span>
                                    </v-col>
                                    <v-col
                                        cols="12" sm="9"
                                        class="pa-3 col-two"
                                    >
                                        <span>
                                            {{ workLocation.data_value }}
                                        </span>
                                    </v-col>
                                </v-row>
                            </p>
                        </v-col>
                        <v-col
                            v-else-if="item.data_type === 'workStructure'"
                            cols="12" sm="9"
                            class="pa-3 col-two"
                        >
                            <p
                                v-for="(workStructure, index3) in item.data_value"
                                :key="index3"
                                class="mb-5"
                            >
                                <v-row>
                                    <v-col
                                        cols="12" sm="2"
                                        class="col-one pa-3"
                                    >
                                        <span>{{ workStructure.data_label }}:</span>
                                    </v-col>
                                    <v-col
                                        cols="12" sm="9"
                                        class="pa-3 col-two"
                                    >
                                        <span>
                                            {{ workStructure.data_value }}
                                        </span>
                                    </v-col>
                                </v-row>
                            </p>
                        </v-col>
                        <v-col
                            v-else-if="item.data_type === 'phone'"
                            cols="12" sm="9"
                            class="pa-3 col-two"
                        >
                            <p
                                v-for="(phones, index3) in item.data_value"
                                :key="index3"
                                class="mb-5"
                            >
                                <v-row>
                                    <v-col
                                        cols="12" sm="9"
                                        class="pa-3 col-two"
                                    >
                                        <p
                                            v-for="(phone, index4) in phones.data_value"
                                            :key="index4"
                                            class="mb-5"
                                        >
                                            <v-row>
                                                <v-col
                                                    cols="12" sm="4"
                                                    class="col-one pa-3 text-right"
                                                >
                                                    <span v-if="phone.data_name !== 'agree'">
                                                        {{ phone.data_label }}:
                                                    </span>
                                                    <span v-else>
                                                        Opt for text:
                                                    </span>
                                                </v-col>
                                                <v-col
                                                    v-if="phone.data_type === 'checkbox'"
                                                    cols="12" sm="8"
                                                    class="pa-3 col-two"
                                                >
                                                    <span v-if="phone.data_value">
                                                        Yes
                                                    </span>
                                                    <span v-else>
                                                        No
                                                    </span>
                                                </v-col>
                                                <v-col
                                                    v-else-if="phone.data_type === 'checktext'"
                                                    cols="12" sm="8"
                                                    class="pa-3 col-two"
                                                >
                                                    <span v-if="phone.data_value">
                                                        Yes
                                                    </span>
                                                    <span v-else>
                                                        No
                                                    </span>
                                                </v-col>
                                                <v-col
                                                    v-else
                                                    cols="12" sm="8"
                                                    class="pa-3 col-two"
                                                >
                                                    <span
                                                        v-if="phone.data_label !== 'Ext'
                                                            && phone.data_label !== 'Country'"
                                                        class="phoneDataFormat"
                                                    >
                                                        {{ phone.data_value }}
                                                    </span>
                                                    <span v-else>
                                                        {{ phone.data_value }}
                                                    </span>
                                                </v-col>
                                            </v-row>
                                        </p>
                                    </v-col>
                                </v-row>
                            </p>
                        </v-col>
                        <v-col
                            v-else-if="item.data_type === 'email'"
                            cols="12" sm="9"
                            class="pa-3 col-two"
                        >
                            <p
                                v-for="(emails, emailIndex1) in item.data_value"
                                :key="emailIndex1"
                                class="mb-5"
                            >
                                <v-row>
                                    <v-col
                                        cols="12" sm="9"
                                        class="pa-3 col-two"
                                    >
                                        <p
                                            v-for="(email, emailIndex2) in emails.data_value"
                                            :key="emailIndex2"
                                            class="mb-5"
                                        >
                                            <v-row>
                                                <v-col
                                                    cols="12" sm="4"
                                                    class="col-one pa-3 text-right"
                                                >
                                                    <span>{{ email.data_label }}:</span>
                                                </v-col>
                                                <v-col
                                                    v-if="email.data_type === 'checkbox'"
                                                    cols="12" sm="8"
                                                    class="pa-3 col-two"
                                                >
                                                    <span v-if="email.data_value">
                                                        Yes
                                                    </span>
                                                    <span v-else>
                                                        No
                                                    </span>
                                                </v-col>
                                                <v-col
                                                    v-else
                                                    cols="12" sm="8"
                                                    class="pa-3 col-two"
                                                >
                                                    <span>
                                                        {{ email.data_value }}
                                                    </span>
                                                </v-col>
                                            </v-row>
                                        </p>
                                    </v-col>
                                </v-row>
                            </p>
                        </v-col>
                        <v-col
                            v-else-if="item.data_type === 'address'"
                            cols="12" sm="9"
                            class="pa-3 col-two"
                        >
                            <p
                                v-for="(address, addressIndex) in item.data_value"
                                :key="addressIndex"
                                class="mb-5"
                            >
                                <v-row>
                                    <v-col
                                        cols="12" sm="3"
                                        class="col-one pa-3"
                                    >
                                        <span v-if="address.data_label === 'Address Line 2'">
                                            Suite/Apt:
                                        </span>
                                        <span v-else>
                                            {{ address.data_label }}:
                                        </span>
                                    </v-col>
                                    <v-col
                                        v-if="address.data_type === 'checkbox'"
                                        cols="12" sm="8"
                                        class="pa-3 col-two"
                                    >
                                        <span v-if="address.data_value">
                                            Yes
                                        </span>
                                        <span v-else>
                                            No
                                        </span>
                                    </v-col>
                                    <v-col
                                        v-else
                                        cols="12" sm="9"
                                        class="pa-3 col-two"
                                    >
                                        <span>
                                            {{ address.data_value }}
                                        </span>
                                    </v-col>
                                </v-row>
                            </p>
                        </v-col>
                        <v-col
                            v-else-if="item.data_type === 'childAffiliate'"
                            cols="12" sm="9"
                            class="pa-3 col-two"
                        >
                            <p
                                class="mb-5"
                            >
                                <v-row>
                                    <v-col
                                        v-for="(childAffiliate, index4) in item.data_value"
                                        :key="index4"
                                        cols="12" sm="5"
                                        class="pa-3"
                                    >
                                        <span>
                                            {{ childAffiliate.data_value }}
                                        </span>
                                    </v-col>
                                </v-row>
                            </p>
                        </v-col>
                        <v-col
                            v-else-if="item.data_type==='payment'"
                            cols="12" sm="9"
                            class="pa-3 col-two"
                        >
                            <p class="mb-5">
                                <v-row>
                                    <v-col
                                        cols="12" sm="3"
                                        class="col-one pa-3"
                                    >
                                        <span>Payment Method:</span>
                                    </v-col>
                                    <v-col
                                        cols="12" sm="9"
                                        class="pa-3 col-two"
                                    >
                                        <span>
                                            {{ JSON.parse(item.data_value).CardDetails ? 'Credit Card' : 'Bank Draft' }}
                                        </span>
                                    </v-col>
                                </v-row>
                            </p>
                            <p class="mb-5">
                                <v-row>
                                    <v-col
                                        cols="12" sm="3"
                                        class="col-one pa-3"
                                    >
                                        <span>Type:</span>
                                    </v-col>
                                    <v-col
                                        cols="12" sm="9"
                                        class="pa-3 col-two"
                                    >
                                        <span>
                                            {{ JSON.parse(item.data_value).CardDetails
                                                ? JSON.parse(item.data_value).CardDetails.CardType
                                                : JSON.parse(item.data_value).AchDetails.AccountType }}
                                        </span>
                                    </v-col>
                                </v-row>
                            </p>
                            <p class="mb-5">
                                <v-row>
                                    <v-col
                                        cols="12" sm="3"
                                        class="col-one pa-3"
                                    >
                                        <span>Account No. Last Four:</span>
                                    </v-col>
                                    <v-col
                                        cols="12" sm="9"
                                        class="pa-3 col-two"
                                    >
                                        <span>
                                            {{ JSON.parse(item.data_value).CardDetails
                                                ? JSON.parse(item.data_value).CardDetails.Last4
                                                : JSON.parse(item.data_value).AchDetails.AccountNumberLast4 }}
                                        </span>
                                    </v-col>
                                </v-row>
                            </p>
                        </v-col>
                        <v-col
                            v-else-if="item.data_name==='agree'"
                            cols="12" sm="9"
                            class="pa-3 col-two"
                        >
                            {{ item.data_value ==='1' ? 'Yes' : 'No' }}
                        </v-col>
                        <v-col
                            v-else
                            cols="12" sm="9"
                            class="pa-3 col-two"
                        >
                            <span v-if="item.data_label === 'Dues Amount'">
                                {{ item.data_value }}
                            </span>
                            <span v-else>
                                {{ item.data_value }}
                            </span>
                        </v-col>
                    </v-row>
                </template>
                <p
                    class="mr-6 pt-6 text-right"
                >
                    {{ submittedBy }} <br>
                    {{ submittedOn }}
                </p>
            </v-col>
        </v-row>
        <template v-if="filters && !formSubmission.IndividualId && formSubmission.submission_status_id!=4">
            <div class="d-flex ga-4 flex-wrap">
                <v-text-field
                    key="text-first-name"
                    v-model="filters[filterId['firstName']].value"
                    label="First Name"
                    variant="underlined"
                />
                <v-text-field
                    key="text-middle-name"
                    v-model="filters[filterId['middleName']].value"
                    label="Middle Name"
                    variant="underlined"
                />
                <v-text-field
                    key="text-last-name"
                    v-model="filters[filterId['lastName']].value"
                    label="Last Name"
                    variant="underlined"
                />
                <v-text-field
                    key="text-preferred-name"
                    v-model="filters[filterId['preferredName']].value"
                    label="Preferred Name"
                    variant="underlined"
                />
                <v-text-field
                    key="text-email"
                    v-model="filters[filterId['email']].value"
                    label="Email"
                    variant="underlined"
                />
                <v-text-field
                    key="text-member-id"
                    v-model="filters[filterId['memberId']].value"
                    label="Member Id"
                    variant="underlined"
                />
                <v-text-field
                    key="text-employee-id"
                    v-model="filters[filterId['employeeId']].value"
                    label="Employee Id"
                    variant="underlined"
                />
                <FormSearchSelector
                    ref="filterAffiliateIdRef"
                    v-model="filters[filterId['filterAffiliateId']].value"
                    label="Affiliate"
                    item-value="AffiliateId"
                    search-type="affiliate"
                    :item-title="item => item.AffiliateNumber + ' - ' + item.AffiliateName"
                    variant="underlined"
                />
            </div>
            <v-row>
                <v-col class="buttons d-flex justify-end ga-2">
                    <v-btn
                        ref="searchButton"
                        elevation="0"
                        color="primary"
                        class="mb-4 btn-block actionButtons"
                        @click="getDataFromApi();searched = true"
                    >
                        Search
                    </v-btn>
                    <v-btn
                        elevation="0"
                        color="default"
                        class="mb-4 btn-block actionButtons"
                        @click="clear()"
                    >
                        Clear
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        <v-row>
            <v-col class="buttons center">
                <div
                    v-if="isCopeForm"
                    class="text-center"
                >
                    <span v-if="formSubmission.submission_status_id == 4">
                        Not a Member Added
                    </span>
                    <v-btn
                        v-if="!formSubmission.IndividualId && formSubmission.submission_status_id==4"
                        elevation="0"
                        color="primary"
                        class="mb-4 btn-block actionButtons"
                        @click="markAsNew()"
                    >
                        Revert
                    </v-btn>
                </div>
                <div
                    v-if="formSubmission.submission_status_id != 4"
                    class="text-center"
                >
                    <span v-if="formSubmission.submission_status_id == 3">
                        Marked as Existing Record
                    </span>
                </div>
            </v-col>
        </v-row>
        <v-row v-if="!formSubmission.IndividualId && formSubmission.submission_status_id!=4">
            <v-col>
                <v-data-table-server
                    :headers="headers"
                    :items="individuals"
                    v-model:options="options"
                    :items-length="totalIndividuals"
                    :loading="loading"
                    :mobile-breakpoint="960"
                    class="elevation-1 mobile-individual-search"
                >
                    <template #loader>
                        <v-progress-linear
                            indeterminate
                            height="8"
                            color="#3f98c9"
                        />
                    </template>
                    <template v-slot:[`item.FirstName`]="{ item }">
                        <a
                            @click="viewIndividual(item.IndividualId)"
                        >
                            {{ item.FirstName }}
                        </a>
                    </template>
                    <template v-slot:[`item.MiddleName`]="{ item }">
                        <a
                            @click="viewIndividual(item.IndividualId)"
                        >
                            {{ item.MiddleName }}
                        </a>
                    </template>
                    <template v-slot:[`item.LastName`]="{ item }">
                        <a
                            @click="viewIndividual(item.IndividualId)"
                        >
                            {{ item.LastName }}
                        </a>
                    </template>
                    <template v-slot:[`item.UnionRelationshipType`]="{ item }">
                        <v-container v-if="item.activeIndividualAffiliates.length > 0">
                            <span
                                v-for="affiliate in item.activeIndividualAffiliates"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                            >
                                <span
                                    v-if="affiliate.UnionRelationshipType"
                                >
                                    {{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                                </span>
                            </span>
                        </v-container>
                        <v-container v-else-if="checkActive(item)">
                            <span
                                v-for="affiliate in item.lastDeactivatedIndividualAffiliate"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId"
                                class="greyed-out"
                            >
                                <span
                                    v-if="affiliate.UnionRelationshipType"
                                >
                                    {{ affiliate.UnionRelationshipType.UnionRelationshipTypeName }}
                                </span>
                            </span>
                        </v-container>
                        <v-container v-else>
                            <span class="greyed-out">
                                No relationship
                            </span>
                        </v-container>
                    </template>
                    <template v-slot:[`item.individualEmails`]="{ item }">
                        <span
                            v-for="email in firstEmail(item.individualEmailsOrdered)"
                            v-bind="email"
                            :key="email.IndividualEmailId"
                            :class="item.activeIndividualAffiliates.length === 0 ? 'greyed-out':''"
                        >
                            {{ email.Email }}
                        </span>
                    </template>
                    <template v-slot:[`item.AffiliateNumber`]="{ item }">
                        <v-container v-if="item.activeIndividualAffiliates.length > 0">
                            <span
                                v-for="affiliate in item.activeIndividualAffiliates"
                                v-bind="affiliate"
                                :key="affiliate.IndividualAffiliateId+'-id'"
                            >
                                {{ affiliate.Affiliate.AffiliateNumber }}
                            </span>
                        </v-container>
                    </template>
                    <template v-slot:[`item.individualMembers`]="{ item }">
                        <span
                            v-for="memberIds in firstMemberId(item.individualMembers)"
                            v-bind="memberIds"
                            :key="memberIds.MemberId"
                        >
                            {{ memberIds.MemberId }}
                        </span>
                    </template>
                    <template v-slot:[`item.activeIndividualEmployers`]="{ item }">
                        <span
                            v-for="employers in item.activeIndividualEmployers"
                            v-bind="employers"
                            :key="employers.EmployeeId"
                        >
                            {{ employers.EmployeeId }}
                        </span>
                    </template>
                    <template v-slot:[`item.update`]="{ item }">
                        <v-tooltip>
                            Existing Record in Connect
                            <template #activator="{ props }">
                                <v-btn
                                    v-bind="props"
                                    :disabled="!checkParentAffiliate(item)"
                                    color="primary"
                                    class="mb-4 btn-block actionButtons"
                                    @click="existingIndividual(item.IndividualId, item.AffiliateId)"
                                >
                                    Existing Record in Connect
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </template>
                </v-data-table-server>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="buttons center">
                <div
                    v-if="notCopeForm"
                    class="d-flex justify-center ga-2"
                >
                    <v-btn
                        v-if="!formSubmission.IndividualId && formSubmission.submission_status_id!=3 &&
                            formSubmission.Form.form_template_id != 9"
                        elevation="0"
                        color="primary"
                        class="mb-4 btn-block actionButtons"
                        :disabled="!searched"
                        @click="clickNewRecord()"
                    >
                        Create New Record
                    </v-btn>
                    <span v-if="formSubmission.IndividualId && formSubmission.submission_status_id!=3">
                        Record Created
                    </span>
                    <template v-if="formSubmission.submission_status_id==1">
                        <v-dialog
                            v-model="dialogDeleteSubmission"
                            persistent
                            color="error"
                            max-width="290"
                        >
                            <template #activator="{ props }">
                                <v-btn
                                    elevation="0"
                                    color="error"
                                    class="mb-4 btn-block actionButtons"
                                    v-bind="props"
                                    @click.stop="updateDialog(true)"
                                >
                                    Delete Submission
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="text-h6">
                                    Delete Form Submission
                                </v-card-title>
                                <v-card-text>
                                    Deleted submissions can not be recovered through the Membership Forms Portal.
                                    For assistance contact AFT.
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn
                                        color="green-darken-1"
                                        variant="text"
                                        @click.stop="updateDialog(false)"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        color="green-darken-1"
                                        variant="text"
                                        @click="deleteFormSubmission(formSubmission.id);"
                                    >
                                        Delete
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                </div>
                <div
                    v-if="isCopeForm"
                    class="d-flex justify-center ga-2"
                >
                    <v-btn
                        v-if="(formSubmission.submission_status_id!=4 && formSubmission.submission_status_id!=5)
                            && !formSubmission.IndividualId"
                        elevation="0"
                        color="primary"
                        class="mb-4 btn-block actionButtons"
                        @click="markAsNotAMember()"
                    >
                        Not a Member
                    </v-btn>
                    <template v-if="formSubmission.submission_status_id==1">
                        <v-dialog
                            v-model="dialogDeleteSubmission"
                            persistent
                            color="error"
                            max-width="290"
                        >
                            <template #activator="{ props }">
                                <v-btn
                                    elevation="0"
                                    color="error"
                                    class="mb-4 btn-block actionButtons"
                                    v-bind="props"
                                    @click.stop="updateDialog(true)"
                                >
                                    Delete Submission
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="text-h6">
                                    Delete Form Submission
                                </v-card-title>
                                <v-card-text>
                                    Would you like to delete the form submission?
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn
                                        color="green-darken-1"
                                        variant="text"
                                        @click.stop="updateDialog(false)"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        color="green-darken-1"
                                        variant="text"
                                        @click="deleteFormSubmission(formSubmission.id);"
                                    >
                                        Delete
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                </div>
            </v-col>
        </v-row>
        <v-dialog
            v-model="copeDialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Warning
                </v-card-title>
                <v-card-text>
                    You are attempting to process this individual for a recurring COPE only payment,
                    if this is correct, please proceed.
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="red-darken-1"
                        variant="text"
                        @click="copeDialog = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="proceedCope"
                    >
                        Proceed
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-overlay
            :model-value="loading"
            opacity=".5"
            scrim="#FFF"
        />
    </v-container>
</template>

<script>
import { format } from 'date-fns';
import api from '../../api/private';
import FormSearchSelector from "./components/FormSearchSelector.vue";
import logoSm from '../../../images/aft-small.png';

export default {
    name: 'PageViewSubmission',
    components: { FormSearchSelector },
    data: () => ({
        loading: false,
        affiliateId: null,
        submissionId: null,
        submissionData: [],
        submittedBy: null,
        submittedOn: null,
        formSubmission: {},
        filters: [
            { name: 'firstName', value: '' },
            { name: 'lastName', value: '' },
            { name: 'email', value: '' },
            { name: 'preferredName', value: '' },
            { name: 'middleName', value: '' },
            { name: 'memberId', value: '' },
            { name: 'filterAffiliateId', value: null },
            { name: 'employeeId', value: '' },
        ],
        filterId: {
            firstName: 0,
            lastName: 1,
            email: 2,
            preferredName: 3,
            middleName: 4,
            memberId: 5,
            filterAffiliateId: 6,
            employeeId: 7,
        },
        totalIndividuals: 0,
        individuals: [],
        searched: false,
        options: {
            sortBy: [{ key: 'IndividualId', order: 'asc' }],
            page: 1,
            itemsPerPage: 10,
        },
        headers: [],
        form_template_id: null,
        dialogDeleteSubmission: false,
        phoneNumberData: '',
        copeDialog: false,
        individualId: null,
        selectedAffiliateId: null,
        logoSm,
    }),
    watch: {
        options: {
            handler() {
                if (this.filters.length > 0 && this.searched) {
                    this.getDataFromApi();
                }
            },
            deep: true,
            immediate: true,
        },
    },
    created() {
        this.selectedAffiliateId = this.$store.getters['user/selectedAffiliate']
            ? this.$store.getters['user/selectedAffiliate'].AffiliateId
            : null;
        this.filters.find((filter) => filter.name === 'filterAffiliateId').value = this.selectedAffiliateId;
    },
    computed: {
        isCopeForm() {
            return this.form_template_id && ['3', '6', '8'].includes(this.form_template_id);
        },
        notCopeForm() {
            return this.form_template_id && !['3', '6', '8'].includes(this.form_template_id);
        }
    },
    mounted() {
        this.submissionId = this.$route.params.id;
        this.getSubmissionDetails();
        this.updatePhoneFormat();

        this.headers = [
            {
                title: 'First Name', value: 'FirstName', visible: true, sortable: false,
            },
            {
                title: 'Middle Name', value: 'MiddleName', visible: true, sortable: false,
            },
            {
                title: 'Last Name', value: 'LastName', visible: true, sortable: false,
            },
            {
                title: 'Preferred Name', value: 'PreferredName', visible: true, sortable: false,
            },
            {
                title: 'Union Relationships', value: 'UnionRelationshipType', visible: true, sortable: false,
            },
            {
                title: 'Affiliate Number', value: 'AffiliateNumber', visible: true, sortable: false,
            },
            {
                title: 'Email', value: 'individualEmails', visible: true, sortable: false,
            },
            {
                title: 'Member Id', value: 'individualMembers', visible: true, sortable: false,
            },
            {
                title: 'Employee Id', value: 'activeIndividualEmployers', visible: true, sortable: false,
            },
            {
                title: 'Action', value: 'update', visible: true, sortable: false,
            },
        ];
    },
    methods: {
        updateDialog(value) {
            this.dialogDeleteSubmission = value;
        },
        openCopeDialog(individualId) {
            this.copeDialog = true;
            this.individualId = individualId;
        },
        proceedCope() {
            this.copeDialog = false;
            this.loading = true;
            api.proceedCope(this.submissionId, this.individualId, 3, this.affiliateId)
                .then(() => {
                    this.loading = true;
                    api.eduesEnrollment(this.submissionId, this.individualId, this.affiliateId, 'Online Membership Form')
                        .then(() => {
                            const { origin } = window.location;
                            const url = `${origin}/edues`;
                            window.location.href = url;
                        })
                        .finally(() => {
                            this.loading = false;
                            this.searched = true;
                        });
                })
                .finally(() => {
                    this.loading = false;
                    this.searched = true;
                });
        },
        checkActive(item) {
            console.log('active',{ item })
            const { length } = item.activeIndividualAffiliates.length;
            const { lastLength } = item.lastDeactivatedIndividualAffiliate.length;

            return length === 0 && lastLength > 0;
        },
        checkParentAffiliate(item) {
            console.log('parent',{ item })
            const parentAffiliate = this.formSubmission && this.formSubmission.Form
            && this.formSubmission.Form.affiliate_id ? this.formSubmission
                && this.formSubmission.Form && this.formSubmission.Form.affiliate_id : null;
            const formTemplateId = this.formSubmission && this.formSubmission.Form
            && this.formSubmission.Form.form_template_id ? this.formSubmission
                && this.formSubmission.Form && this.formSubmission.Form.form_template_id : null;
            let returnValue = false;
            if (formTemplateId === 8) {
                returnValue = true;
            } else if (item.activeIndividualAffiliates.length > 0 && parentAffiliate) {
                item.activeIndividualAffiliates.forEach((aff) => {
                    returnValue = aff.Affiliate.AffiliateId === parentAffiliate;
                });
            }
            return returnValue;
        },
        triggerSearch() {
            this.$nextTick(() => {
                const { searchButton } = this.$refs;
                if (searchButton) {
                    searchButton.$el.click();
                }
            });
        },
        getSubmissionDetails() {
            if (!this.submissionId) { return; }
            this.loading = true;
            api.submissionDetails(this.submissionId)
                .then((response) => {
                    this.submissionData = response.data.submissionData;
                    this.submittedBy = response.data.submittedBy;
                    // this.submittedOn = response.data.submittedOn;
                    this.submittedOn = format(response.data.submittedOn, 'MMMM do yyyy');
                    this.formSubmission = response.data.formSubmission;
                    this.form_template_id = response.data.formSubmission.Form.form_template_id;
                    this.affiliateId = response.data.formSubmission.Form.affiliate_id;
                    // auto search after page load
                    const names = this.submittedBy.split(' ');
                    if (names) {
                        const firstName = names[0];
                        const lastName = names[names.length - 1];

                        this.filters = this.filters.map((filter) => {
                            if (filter.name === 'firstName') {
                                return { ...filter, value: firstName };
                            }
                            if (filter.name === 'lastName') {
                                return { ...filter, value: lastName };
                            }
                            return filter;
                        });
                        this.triggerSearch();
                    }
                    console.log(this.submissionData);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        updatePhoneFormat() {
            if (!this.submissionId) { return; }
            this.loading = true;
            api.submissionDetails(this.submissionId)
                .then((response) => {
                    this.submissionData = response.data.submissionData;
                    const pClassArray = document.querySelectorAll('.phoneDataFormat');
                    pClassArray.forEach((value) => {
                        const pText = value;
                        const childEl = pText.innerText;
                        const xNum = childEl.toString().replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                        this.childEl = !xNum[2] ? xNum[1] : `(${xNum[1]}) ${xNum[2]}-${xNum[3]}`;
                        pText.innerText = this.childEl;
                        console.log(pText, childEl, xNum, this.childEl);
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        clickNewRecord() {
            const { id } = this.formSubmission;
            const { origin } = window.location;
            const url = `${origin}/individuals/new/?submissionId=${id}`;
            window.location.href = url;
        },
        compareIndividual(individualId) {
            const { id } = this.formSubmission;
            const { origin } = window.location;
            const url = `${origin}/compare-individual/${individualId}/?submissionId=${id}`;
            window.location.href = url;
        },
        viewIndividual(id) {
            const { origin } = window.location;
            const url = `${origin}/individuals/${id}`;
            window.open(url, '_blank');
        },
        markAsCope() {
            if (!this.submissionId) { return; }
            this.loading = true;
            api.markSubmissionAsCope(this.submissionId)
                .then(() => {
                    const { origin } = window.location;
                    const url = `${origin}/app/memberforms/admin/list?type=new`;
                    window.location.href = url;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        markAsNotAMember() {
            if (!this.submissionId) { return; }
            this.loading = true;
            api.markSubmissionAsNotAMember(this.submissionId)
                .then(() => {
                    const { origin } = window.location;
                    const url = `${origin}/app/memberforms/admin/list?type=new`;
                    window.location.href = url;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        markAsNew() {
            if (!this.submissionId) { return; }
            this.loading = true;
            api.markSubmissionAsNew(this.submissionId)
                .then(() => {
                    const { origin } = window.location;
                    const url = `${origin}/app/memberforms/admin/list?type=new`;
                    window.location.href = url;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        markAsDuplicate() {
            if (!this.submissionId) { return; }
            this.loading = true;
            api.markSubmissionAsDuplicate(this.submissionId)
                .then(() => {
                    const { origin } = window.location;
                    const url = `${origin}/app/memberforms/admin/list?type=new`;
                    window.location.href = url;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        existingIndividual(individualId) {
            if (parseInt(this.form_template_id, 10) === 8) {
                this.openCopeDialog(individualId);
            } else {
                this.compareIndividual(individualId);
            }
        },
        updateIndividualId(individualId) {
            this.loading = true;
            console.log(individualId);
            api.updateIndividualId(this.submissionId, individualId, 3)
                .then(() => {
                    this.compareIndividual(individualId);
                })
                .finally(() => {
                    this.loading = false;
                    this.searched = true;
                });
        },
        // restoreSubmission() {
        //     this.loading = true;
        //     api.updateIndividualId(this.submissionId, null, 1)
        //         .then(() => {
        //             const { origin } = window.location;
        //             const url = `${origin}/app/memberforms/admin/list?type=new`;
        //             window.location.href = url;
        //         })
        //         .finally(() => {
        //             this.loading = false;
        //             this.searched = true;
        //         });
        // },
        getDataFromApi() {
            this.loading = true;

            const { sortBy, page, itemsPerPage } = this.options;
            const sortDefault = sortBy[0] ?? { key: 'IndividualId', order: 'asc' };
            let sortByField = sortDefault.key ?? 'IndividualId';
            const sortDirection = sortDefault.order === 'asc' ? '' : '-';
            if (sortBy[0] === 'FullName') {
                sortByField = `LastName,FirstName`;
            }

            let url = '/api/v2/aggregate/individual/search';
            const affiliate = this.formSubmission && this.formSubmission.Form
            && this.formSubmission.Form.affiliate_id ? this.formSubmission
                && this.formSubmission.Form && this.formSubmission.Form.affiliate_id : null;
            if (affiliate === null) {
                return;
            }
            url += `?page=${page}&per_page=${itemsPerPage}&sort=${sortDirection}${sortByField}`;
            url += `&parentAffiliateId=${affiliate}`;

            let filterUrl = '';
            this.filters.map((filter) => {
                if (filter.value !== '') {
                    filterUrl += `&${filter.name}=${filter.value}`;
                }
                return filter;
            });
            if (filterUrl !== '') {
                url += filterUrl;
            }

            api.individualList(url)
                .then((response) => {
                    this.individuals = response.data.data;
                    this.totalIndividuals = response.data.meta.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        firstEmail(emails) {
            return emails.slice(0, 1);
        },
        firstMemberId(memberIds) {
            return memberIds.slice(0, 1);
        },
        deleteFormSubmission(formSubmissionId) {
            api.submissionDelete(formSubmissionId)
                .then((response) => {
                    if (response.data[0] === 'success') {
                        this.dialogDeleteSubmission = false;
                    }
                })
                .finally(() => {
                    this.$router.push(
                        {
                            path: '/list?type=new',
                        },
                    );
                });
        },
        clear() {
            this.filters.map((filter) => {

                filter.value = '';
                return filter;
            });
            this.$refs.filterAffiliateIdRef.reset();
            this.individuals = [];
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-header {
        position: relative;
        .first-logo {
            float: left;
        }
        .second-logo {
            display: inline-block;
            text-align: center;
        }
        .third-logo {
            float: right;
        }
        h3 {
            background-color: #E3F2FD;
        }
    }
    .submission-cols {
        .col-one {
            flex: auto;
            background-color: rgba(245, 245, 245, 0.4);
            border-bottom: 1px solid #EEEEEE;
        }
        .col-two {
            border-bottom: 1px solid #EEEEEE;
        }
    }
    button.actionButtons {
        bottom: -15px;
    }
    .buttons.col {
        display: inline-flex;
        column-gap: 20px;
    }
    .col.center.buttons {
        justify-content: center;
    }
    .blockquote {
        font-size: 16px;
    }

    .v-application {
        button.mb-4.btn-block.actionButtons.v-btn.v-btn--has-bg.theme--light
        .elevation-0.v-size--default.primary {
            background-color: #0A2A5C !important;
        }
        button.primary {
            background-color: #0A2A5C !important;
            border-color: #0A2A5C !important;
        }
    }
</style>

<style lang="scss">
    .v-main {
        z-index: 4;
    }
</style>
