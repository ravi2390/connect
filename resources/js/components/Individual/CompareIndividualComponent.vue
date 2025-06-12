<template>
    <v-overlay
        opacity=".5"
        :model-value="overlay"
        class="align-center justify-center"
        scrim="#FFF"
    >
       <v-progress-circular indeterminate :size="70" color="primary"></v-progress-circular>
    </v-overlay>
    <v-container class="compare-container">
        <v-row>
            <v-col>
            <v-row>
                <v-col>
                    <h2 class="text-center">CONNECT</h2>
                </v-col>
            </v-row>
            </v-col>
            <v-col>
            <v-row>
                <v-col>
                    <h2 class="text-center">MEMBERSHIP FORMS PORTAL</h2>
                </v-col>
            </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-alert type="warning" title="Individual Comparison">
                    Please review each section below. Changes to the individual must be saved at each section. The saved changes will update the individual's record in Connect. After all sections have been reviewed and/or saved, click the Review Completed button at the bottom of the page to move forward.
                </v-alert>
            </v-col>
        </v-row>
        <v-row>
           <v-col class="pt-4">
               <h4 class="text-center">Individual</h4>
               <v-divider />
           </v-col>
        </v-row>
        <v-row>
            <v-col class="p-4">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-text-field label="First name:" v-model="individual.FirstName" variant="underlined" disabled />
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-text-field label="Middle name:" v-model="individual.MiddleName" variant="underlined" disabled />
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-text-field label="Last name:" v-model="individual.LastName" variant="underlined" disabled />
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-text-field label="Preferred name:" v-model="individual.PreferredName" variant="underlined" disabled></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-text-field label="Original last name:" v-model="individual.PreviousName" variant="underlined" disabled />
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                           <span class="empty-btn"></span>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider vertical blue />
            <v-col class="p-4">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-text-field label="First name:" v-model="editableIndividual.FirstName" variant="underlined" />
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-text-field label="Middle name:" v-model="editableIndividual.MiddleName" variant="underlined" />
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-text-field label="Last name:" v-model="editableIndividual.LastName" variant="underlined" />
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-text-field label="Preferred name:" v-model="editableIndividual.PreferredName" variant="underlined" />
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-text-field label="Original last name:" v-model="editableIndividual.PreviousName" variant="underlined" />
                                </div>
                            </v-col>
                        </v-row>
                        <v-row class="btns-row">
                            <p v-if="basicMessage" class="success-message">{{ basicMessage }}</p>
                            <v-col cols="8" offset="4" class="text-right hidden-md-and-down">
                                <v-btn color="primary" class="px-4" href="" @click="updateBasicData()" :disabled="basicDisabled">Update Individual</v-btn>
                            </v-col>
                            <v-col class="hidden-lg-and-up">
                                <v-btn color="primary" class="px-4" href="" @click="updateBasicData()" :disabled="basicDisabled">Update Individual</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pt-4">
                <h4 class="text-center">Demographics</h4>
                <v-divider />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <div class="data-container">
                                    <v-label>Date of Birth:</v-label>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-select
                                                :items="months"
                                                label="Month"
                                                item-value="value"
                                                disabled
                                                item-title="label"
                                                v-model="individual.MonthOfBirth"
                                                variant="underlined"
                                            />
                                        </v-col>
                                        <v-col cols="3">
                                            <v-select
                                                :items="dates"
                                                label="Day"
                                                item-value="value"
                                                disabled
                                                item-title="label"
                                                v-model="computedDayOfBirth"
                                                variant="underlined"
                                            />
                                        </v-col>
                                        <v-col cols="4">
                                            <v-select
                                                :items="years"
                                                label="Year"
                                                item-value="value"
                                                disabled
                                                item-title="label"
                                                v-model="individual.YearOfBirth"
                                                variant="underlined"
                                            />
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-select
                                        label="Gender"
                                        disabled
                                        :items="genders"
                                        item-value="GenderId"
                                        item-title="GenderName"
                                        v-model="individual.GenderId"
                                        variant="underlined"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-select
                                        label="Marital Status"
                                        disabled
                                        :items="maritalStatus"
                                        item-value="MaritalStatusId"
                                        item-title="MaritalStatusName"
                                        v-model="individual.MaritalStatusId"
                                        variant="underlined"
                                    />
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <span class="empty-btn"></span>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider vertical />
            <v-col class="p-4">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col>
                            <v-label>Date of Birth:</v-label>
                            <v-row>
                                <v-col cols="4">
                                    <v-select
                                        :items="months"
                                        label="Month"
                                        item-value="value"
                                        item-title="label"
                                        v-model="editableIndividual.MonthOfBirth"
                                        variant="underlined"
                                    />
                                </v-col>
                                <v-col cols="3">
                                    <v-select
                                        :items="dates"
                                        label="Day"
                                        item-value="value"
                                        item-title="label"
                                        v-model="editableIndividual.DayOfBirth"
                                        variant="underlined"
                                    />
                                </v-col>
                                <v-col cols="4">
                                    <v-select
                                        :items="years"
                                        label="Year"
                                        item-value="value"
                                        item-title="label"
                                        v-model="editableIndividual.YearOfBirth"
                                        variant="underlined"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-select
                                label="Gender"
                                :items="genders"
                                item-value="GenderId"
                                item-title="GenderName"
                                v-model="editableIndividual.GenderId"
                                variant="underlined"
                            />
                        </v-col>
                        <v-col cols="4">
                            <v-select
                                label="Marital Status"
                                :items="maritalStatus"
                                item-value="MaritalStatusId"
                                item-title="MaritalStatusName"
                                v-model="editableIndividual.MaritalStatusId"
                                variant="underlined"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="btns-row">
                        <p v-if="demographicMessage" class="success-message">{{ demographicMessage }}</p>
                        <v-col cols="8" offset="4" class="text-right hidden-md-and-down">
                            <v-btn color="primary" class="px-4" href="" @click="updateDemographics()" :disabled="demographicsDisabled">Update Demographics</v-btn>
                        </v-col>
                        <v-col class="hidden-lg-and-up">
                            <v-btn color="primary" class="px-4" href="" @click="updateDemographics()" :disabled="demographicsDisabled">Update Demographics</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="pt-4">
            <h4 class="text-center">Union Relationship</h4>
            <v-divider />
        </v-col>
    </v-row>
    <v-row>
        <v-col class="p-4">
            <v-card class="unionRelationships">
                <v-card-text>
                    <v-row>
                        <v-col cols="8">
                            <v-select
                                :items="unionRelationships"
                                label="Union Relationship"
                                item-value="UnionRelationshipTypeId"
                                item-title="UnionRelationshipTypeName"
                                v-model="oldUnionRelationshipTypeId"
                                disabled
                                variant="underlined"
                            />
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Affiliate:" v-model="selectedAffiliateName" disabled variant="underlined" />
                        </v-col>
                    </v-row>
                    <v-row v-if="fieldVisible('Dues category')">
                        <v-col cols="4">
                            <v-select
                                :items="duesCategories"
                                label="Dues category"
                                item-value="LocalDuesCategoryId"
                                item-title="LocalDuesCategoryName"
                                v-model="individualAffiliate.LocalDuesCategoryId"
                                :rules="[rules.required]"
                                disabled
                                variant="underlined"
                            />
                        </v-col>
                        <v-col cols="4">
                            <v-select
                                :items="paymentMethods"
                                label="Dues Payment Method"
                                item-value="PaymentMethodId"
                                item-title="PaymentMethodName"
                                v-model="individualAffiliate.PaymentMethodId"
                                disabled
                                variant="underlined"
                            />
                        </v-col>
                        <v-col cols="4">
                            <v-select
                                :items="paymentFrequencies"
                                label="Dues Payment Frequency"
                                item-value="PaymentFrequencyId"
                                item-title="PaymentFrequencyName"
                                v-model="individualAffiliate.PaymentFrequencyId"
                                disabled
                                variant="underlined"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-menu
                                :offset="40"
                                transition="scale-transition"
                                :close-on-content-click="false"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ props }">
                                    <v-text-field
                                        v-model="individualAffiliate.StartDate"
                                        hint="YYYY-MM-DD"
                                        label="Start date"
                                        v-bind="props"
                                        disabled
                                    ></v-text-field>
                                </template>
                                <v-date-picker @update:model-value="onAffiliateStartDate" no-title scrollable variant="underlined" />
                            </v-menu>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="MemberId:" v-model="individualAffiliate.MemberId" disabled variant="underlined" />
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Unit:" v-model="individualAffiliate.Unit" disabled variant="underlined" />
                        </v-col>
                    </v-row>
                    <v-row v-if="fieldVisible('Cope')">
                        <v-col cols="4">
                            <v-text-field label="COPE Amount:" v-model="individualCope.CopeAmount" prefix="$" :rules="[rules.copeAmount, rules.copeDecimal]" disabled variant="underlined" />
                        </v-col>
                        <v-col cols="4">
                            <v-select
                                :items="paymentMethods"
                                label="COPE Payment Method"
                                item-value="PaymentMethodId"
                                item-title="PaymentMethodName"
                                v-model="individualCope.CopePaymentMethodId"
                                disabled
                                variant="underlined"
                            />
                        </v-col>
                        <v-col cols="4">
                            <v-select
                                :items="paymentFrequencies"
                                label="COPE Payment Frequency"
                                item-value="PaymentFrequencyId"
                                item-title="PaymentFrequencyName"
                                v-model="individualCope.CopePaymentFrequencyId"
                                disabled
                                variant="underlined"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col class="p-4">
            <v-card class="unionRelationships">
                <v-card-text>
                    <v-form ref="form">
                        <v-row>
                            <v-col cols="8">
                                <v-select
                                    :items="unionRelationships"
                                    label="Union Relationship"
                                    item-value="UnionRelationshipTypeId"
                                    item-title="UnionRelationshipTypeName"
                                    v-model="selectedUnionRelationshipTypeId"
                                    disabled
                                    variant="underlined"
                                />
                            </v-col>
                            <v-col cols="4">
                                <v-text-field label="Affiliate:" v-model="selectedAffiliateName" disabled variant="underlined" />
                            </v-col>
                        </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <v-select
                                        :items="duesCategories"
                                        label="Dues category"
                                        item-value="LocalDuesCategoryId"
                                        item-title="LocalDuesCategoryName"
                                        v-model="editableIndividualAffiliate.LocalDuesCategoryId"
                                        :rules="[rules.required]"
                                        disabled
                                        variant="underlined"
                                    />
                                </v-col>
                                <v-col cols="4">
                                    <v-select
                                        :items="paymentMethods"
                                        label="Dues Payment Method"
                                        item-value="PaymentMethodId"
                                        item-title="PaymentMethodName"
                                        v-model="editableIndividualAffiliate.PaymentMethodId"
                                        disabled
                                        variant="underlined"
                                    />
                                </v-col>
                                <v-col cols="4">
                                    <v-select
                                        :items="paymentFrequencies"
                                        label="Dues Payment Frequency"
                                        item-value="PaymentFrequencyId"
                                        item-title="PaymentFrequencyName"
                                        v-model="editableIndividualAffiliate.PaymentFrequencyId"
                                        disabled
                                        variant="underlined"
                                    />
                                </v-col>
                            </v-row>
                            <v-row v-if="fieldVisible('Stop Reason')">
                                <v-col cols="4">
                                    <v-menu
                                        :offset="40"
                                        transition="scale-transition"
                                        :close-on-content-click="false"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ props }">
                                            <v-text-field
                                                v-model="editableIndividualAffiliate.StartDate"
                                                hint="YYYY-MM-DD"
                                                label="Start date"
                                                v-bind="props"
                                                variant="underlined"
                                            />
                                        </template>
                                        <v-date-picker @update:model-value="onEditableAffiliateStartDate" no-title scrollable />
                                    </v-menu>
                                </v-col>
                                <v-col cols="4">
                                </v-col>
                            </v-row>
                            <v-row v-if="showCope">
                                <v-col cols="4">
                                    <v-text-field label="COPE Amount:" v-model="editableIndividualCope.CopeAmount" prefix="$" :rules="[rules.copeAmount, rules.copeDecimal]" disabled variant="underlined" />
                                </v-col>
                                <v-col cols="4">
                                    <v-select
                                        :items="paymentMethods"
                                        label="COPE Payment Method"
                                        item-value="PaymentMethodId"
                                        item-title="PaymentMethodName"
                                        v-model="editableIndividualCope.CopePaymentMethodId"
                                        disabled
                                        variant="underlined"
                                    />
                                </v-col>
                                <v-col cols="4">
                                    <v-select
                                        :items="paymentFrequencies"
                                        label="COPE Payment Frequency"
                                        item-value="PaymentFrequencyId"
                                        item-title="PaymentFrequencyName"
                                        v-model="editableIndividualCope.CopePaymentFrequencyId"
                                        disabled
                                        variant="underlined"
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="btns-row">
                                <p v-if="unionRelationshipMessage" class="success-message">{{ unionRelationshipMessage }}</p>
                                <v-col cols="8" offset="4" class="text-right hidden-md-and-down">
                                    <v-btn color="primary" class="px-4" href="" @click="updateUnionRelationship()" :disabled="unionDisabled">Update Union Relationship</v-btn>
                                </v-col>
                                <v-col class="hidden-lg-and-up">
                                    <v-btn color="primary" class="px-4" href="" @click="updateUnionRelationship()" :disabled="unionDisabled">Update Union Relationship</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <template v-if="parseInt(templateId, 10) != 9">
            <v-row>
                <v-col class="pt-4">
                    <h4 class="text-center">Employer</h4>
                    <v-divider />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="p-4">
                    <v-card class="employer" style="overflow-y: scroll;">
                        <v-card-text>
                            <v-row v-for="individualEmployer in individualEmployers" :key="individualEmployer.IndividualEmployerId">
                                <v-col cols="12" >
                                    <v-row>
                                        <v-col cols="8">
                                            <v-text-field label="Employer" v-model="individualEmployer.selectedEmployerName" disabled variant="underlined" />
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field label="Unit" v-model="individualEmployer.selectedUnitName" disabled variant="underlined" />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field label="Work Location" v-model="individualEmployer.WorkLocationName" disabled variant="underlined" />
                                        </v-col>
                                        <v-col cols="4">
                                                <v-text-field label="Work Structure" v-model="individualEmployer.WorkStructureName" disabled variant="underlined" />
                                        </v-col>
                                        <v-col cols="4">
                                                <v-text-field label="Job Details" v-model="individualEmployer.LocalJobClassName" disabled variant="underlined" />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field label="Employee ID" v-model="individualEmployer.EmployeeId" disabled variant="underlined" />
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field label="Job Description" v-model="individualEmployer.JobDescription" disabled variant="underlined" />
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field label="Room Number" v-model="individualEmployer.RoomNumber" disabled variant="underlined" />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field
                                                v-model="individualEmployer.HireDate"
                                                hint="YYYY-MM-DD"
                                                label="Hire Date"
                                                disabled
                                                variant="underlined"
                                            />
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                v-model="individualEmployer.StartDate"
                                                hint="YYYY-MM-DD"
                                                label="Start Date"
                                                disabled
                                                variant="underlined"
                                            />
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                v-model="individualEmployer.EndDate"
                                                hint="YYYY-MM-DD"
                                                label="End Date"
                                                disabled
                                                variant="underlined"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col class="p-4">
                    <v-card>
                        <v-card-text>
                            <v-form ref="employerForm" v-model="valid">
                                <v-row>
                                    <v-col cols="8">
                                        <v-autocomplete
                                            v-model="selectedEmployerId"
                                            :items="employers"
                                            item-title="EmployerName"
                                            item-value="EmployerId"
                                            persistent-hint
                                            :rules="[rules.required]"
                                            variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Search for an employer
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-select
                                            :items="units"
                                            item-value="UnitId"
                                            item-title="UnitName"
                                            v-model="selectedUnitId"
                                            :rules="[rules.required]"
                                            variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Unit
                                            </template>
                                        </v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <work-location-chooser :employer-id="selectedEmployerId" :value="WorkLocationId" v-on:selected-work-location="setWorkLocationId($event)"></work-location-chooser>
                                    </v-col>
                                    <v-col cols="4">
                                        <work-structure-chooser :employer-id="selectedEmployerId" :value="WorkStructureId" v-on:selected-work-structure="setWorkStructureId($event)"></work-structure-chooser>
                                    </v-col>
                                    <v-col cols="4">
                                        <job-class-chooser
                                            :unit-id="selectedUnitId"
                                            :job-class-id="selectedLocalJobClassId"
                                            :job-title-id="selectedJobTitleId"
                                            :rules="rules"
                                            v-on:selected-job-class="setPropertyValue('LocalJobClassId', $event)"
                                            v-on:selected-job-title="setPropertyValue('JobTitleId', $event)"
                                        ></job-class-chooser>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-text-field label="Employee ID" v-model="editableIndividualEmployer.EmployeeId" variant="underlined" />
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field label="Job Description" v-model="editableIndividualEmployer.JobDescription" variant="underlined" />
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field label="Room Number" v-model="editableIndividualEmployer.RoomNumber" variant="underlined" />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-menu
                                                :offset="40"
                                                transition="scale-transition"
                                                :close-on-content-click="false"
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ props }">
                                                    <v-text-field
                                                        v-model="editableIndividualEmployer.HireDate"
                                                        hint="YYYY-MM-DD"
                                                        label="Hire Date"
                                                        v-bind="props"
                                                        variant="underlined"
                                                    />
                                                </template>
                                                <v-date-picker @update:model-value="onHireDate" no-title scrollable />
                                            </v-menu>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-menu
                                                :offset="40"
                                                transition="scale-transition"
                                                :close-on-content-click="false"
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ props }">
                                                    <v-text-field
                                                        v-model="editableIndividualEmployer.StartDate"
                                                        hint="YYYY-MM-DD"
                                                        label="Start Date"
                                                        v-bind="props"
                                                        variant="underlined"
                                                    />
                                                </template>
                                                <v-date-picker @update:model-value="onEmployerStartDate" no-title scrollable />
                                            </v-menu>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-menu
                                                :offset="40"
                                                transition="scale-transition"
                                                :close-on-content-click="false"
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ props }">
                                                    <v-text-field
                                                        v-model="editableIndividualEmployer.EndDate"
                                                        hint="YYYY-MM-DD"
                                                        label="End Date"
                                                        v-bind="props"
                                                        variant="underlined"
                                                    />
                                                </template>
                                                <v-date-picker @update:model-value="onEmployerEndDate" no-title scrollable />
                                            </v-menu>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row class="btns-row">
                                    <p v-if="employerMessage" class="success-message">{{ employerMessage }}</p>
                                    <v-col cols="8" offset="4" class="text-right hidden-md-and-down">
                                        <v-btn color="primary" class="px-4" href="" @click="updateEmployer()" :disabled="employerDisabled">Update Employer</v-btn>
                                    </v-col>
                                    <v-col class="hidden-lg-and-up">
                                        <v-btn color="primary" class="px-4" href="" @click="updateEmployer()" :disabled="employerDisabled">Update Employer</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        <v-row>
            <v-col class="pt-4">
                <h4 class="text-center">Contact Information</h4>
                <v-divider />
            </v-col>
        </v-row>
        <!-- HOME ADDRESS -->
        <v-row>
            <v-col class="p-4">
                <v-card class="address" style="overflow-y: scroll; height: 535px">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Address {{individualHomeAddresses.length > 1 ? '(' + individualHomeAddresses.length + ' found)' : ''}}</h3>
                            </v-col>
                        </v-row>
                        <v-row v-for="(address, index) in individualHomeAddresses" :key="index">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="addressTypes"
                                                item-value="IndividualAddressTypeId"
                                                item-title="IndividualAddressTypeName"
                                                v-model="address.IndividualAddressTypeId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Address Type
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactStatus"
                                                item-value="ContactStatusId"
                                                item-title="ContactStatusName"
                                                v-model="address.ContactStatusId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Address Status
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactSources"
                                                item-value="ContactSourceId"
                                                item-title="ContactSourceName"
                                                v-model="address.ContactSourceId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Address Source
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Preferred Address" v-model="address.IsPreferred" disabled />
                                    </v-col>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Do Not Visit" v-model="address.DoNotVisit" disabled />
                                    </v-col>
                                    <v-col cols="6">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactRestrictions"
                                                item-value="ContactRestrictionId"
                                                item-title="ContactRestrictionName"
                                                v-model="address.CanSendMailRestrictionId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Mailing Contact Restriction
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="8">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            v-model="address.AddressLine1"
                                            :maxlength="200"
                                            disabled
                                            variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Street Address
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field label="Suite/Apt" v-model="address.AddressLine2" :maxlength="200" disabled variant="underlined" />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            v-model="address.City"
                                            :maxlength="100"
                                            disabled
                                            variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>City
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-text-field
                                                :rules="[rules.required]"
                                                v-model="address.StateTerritory.StateTerritoryName"
                                                :maxlength="100"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>State Territory
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            v-model="address.PostalCode"
                                            :maxlength="15"
                                            disabled
                                            variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Zip Code
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="p-4">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Address</h3>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-select
                                        :items="addressTypes"
                                        item-value="IndividualAddressTypeId"
                                        item-title="IndividualAddressTypeName"
                                        v-model="editableIndividualAddress.IndividualAddressTypeId"
                                        :rules="[rules.required]"
                                        disabled
                                        variant="underlined"
                                    >
                                        <template #label>
                                            <span v-if="rules.required" class="text-red">* </span>Address Type
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-select
                                        :items="contactStatus"
                                        item-value="ContactStatusId"
                                        item-title="ContactStatusName"
                                        v-model="editableIndividualAddress.ContactStatusId"
                                        :rules="[rules.required]"
                                        disabled
                                        variant="underlined"
                                    >
                                        <template #label>
                                            <span v-if="rules.required" class="text-red">* </span>Address Status
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-select
                                        :items="contactSources"
                                        item-value="ContactSourceId"
                                        item-title="ContactSourceName"
                                        v-model="editableIndividualAddress.ContactSourceId"
                                        :rules="[rules.required]"
                                        disabled
                                        variant="underlined"
                                    >
                                        <template #label>
                                            <span v-if="rules.required" class="text-red">* </span>Address Source
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="switches">
                                <v-switch color="accent" label="Preferred Address" v-model="editableIndividualAddress.IsPreferred" />
                            </v-col>
                            <v-col cols="3" class="switches">
                                <v-switch color="accent" label="Do Not Visit" v-model="editableIndividualAddress.DoNotVisit" />
                            </v-col>
                            <v-col cols="6">
                                <div class="data-container">
                                    <v-select
                                        :items="contactRestrictions"
                                        item-value="ContactRestrictionId"
                                        item-title="ContactRestrictionName"
                                        v-model="editableIndividualAddress.CanSendMailRestrictionId"
                                        :rules="[rules.required]"
                                        variant="underlined"
                                    >
                                        <template #label>
                                            <span v-if="rules.required" class="text-red">* </span>Mailing Contact Restriction
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="8">
                                <v-text-field
                                    :rules="[rules.required]"
                                    v-model="editableIndividualAddress.AddressLine1"
                                    :maxlength="200"
                                    variant="underlined"
                                >
                                    <template #label>
                                        <span v-if="rules.required" class="text-red">* </span>Street Address
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="Suite/Apt"
                                    v-model="editableIndividualAddress.AddressLine2"
                                    :maxlength="200"
                                    variant="underlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field
                                    :rules="[rules.required]"
                                    v-model="editableIndividualAddress.City"
                                    :maxlength="100"
                                    variant="underlined"
                                >
                                    <template #label>
                                        <span v-if="rules.required" class="text-red">* </span>City
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <StateTerritorySelectComponent
                                        item-value="StateTerritoryId"
                                        item-text="StateTerritoryName"
                                        label="State"
                                        v-model="editableIndividualAddress.StateTerritoryId"
                                        :rules="[rules.required]"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    :rules="[rules.required]"
                                    v-model="editableIndividualAddress.PostalCode"
                                    :maxlength="15"
                                    variant="underlined"
                                >
                                    <template #label>
                                        <span v-if="rules.required" class="text-red">* </span>Zip Code
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="btns-row">
                            <p v-if="addressMessage" class="success-message">{{ addressMessage }}</p>
                            <v-col class="text-right hidden-md-and-down">
                                <v-btn color="primary" class="px-4" @click="updateAddress('home')" :disabled="addressDisabled">Create Address</v-btn>
                            </v-col>
                            <v-col class="hidden-lg-and-up mobile-col-button-spacing">
                                <v-btn color="primary" @click="updateAddress('home')" :disabled="addressDisabled" class="px-4 mobile-button-multiline-smaller">Create Address</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-4">
                <hr style="border-top: dotted 2px;" v-if="isEduesEligible" />
            </v-col>
        </v-row>
        <!-- BILLING ADDRESS -->
        <v-row v-if="isEduesEligible">
            <v-col class="p-4">
                <v-card class="address" style="overflow-y: scroll; height: 535px">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Billing Address {{individualBillingAddresses.length > 1 ? '(' + individualBillingAddresses.length + ' found)' : ''}}</h3>
                            </v-col>
                        </v-row>
                        <v-row v-for="(address, index) in individualBillingAddresses" :key="index">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="addressTypes"
                                                item-value="IndividualAddressTypeId"
                                                item-title="IndividualAddressTypeName"
                                                v-model="address.IndividualAddressTypeId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Address Type
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactStatus"
                                                item-value="ContactStatusId"
                                                item-title="ContactStatusName"
                                                v-model="address.ContactStatusId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Address Status
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactSources"
                                                item-value="ContactSourceId"
                                                item-title="ContactSourceName"
                                                v-model="address.ContactSourceId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Address Source
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Preferred Address" v-model="address.IsPreferred" disabled />
                                    </v-col>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Do Not Visit" v-model="address.DoNotVisit" disabled />
                                    </v-col>
                                    <v-col cols="6">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactRestrictions"
                                                item-value="ContactRestrictionId"
                                                item-title="ContactRestrictionName"
                                                v-model="address.CanSendMailRestrictionId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Mailing Contact Restriction
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="8">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            v-model="address.AddressLine1"
                                            :maxlength="200" disabled
                                            variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Street Address
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field label="Suite/Apt" v-model="address.AddressLine2" :maxlength="200" disabled  variant="underlined" />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            v-model="address.City"
                                            :maxlength="100"
                                            disabled
                                            variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>City
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-text-field
                                                :rules="[rules.required]"
                                                v-model="address.StateTerritory.StateTerritoryName"
                                                :maxlength="100"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>State Territory
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            v-model="address.PostalCode"
                                            :maxlength="15"
                                            disabled
                                            variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Zip Code
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row v-if="individualBillingAddresses.length > 1 && index < individualBillingAddresses.length-1">
                                    <v-divider></v-divider>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-if="individualBillingAddresses.length === 0">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12">
                                        <p class="text-center contact-message">Billing Address not found</p>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="p-4">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Billing Address</h3>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualBillingAddress.City">
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-select
                                        :items="addressTypes"
                                        item-value="IndividualAddressTypeId"
                                        item-title="IndividualAddressTypeName"
                                        v-model="editableIndividualBillingAddress.IndividualAddressTypeId"
                                        :rules="[rules.required]"
                                        disabled
                                        variant="underlined"
                                    >
                                        <template #label>
                                            <span v-if="rules.required" class="text-red">* </span>Address Type
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-select
                                        :items="contactStatus"
                                        item-value="ContactStatusId"
                                        item-title="ContactStatusName"
                                        v-model="editableIndividualBillingAddress.ContactStatusId"
                                        :rules="[rules.required]"
                                        disabled
                                        variant="underlined"
                                    >
                                        <template #label>
                                            <span v-if="rules.required" class="text-red">* </span>Address Status
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <v-select
                                        :items="contactSources"
                                        item-value="ContactSourceId"
                                        item-title="ContactSourceName"
                                        v-model="editableIndividualBillingAddress.ContactSourceId"
                                        :rules="[rules.required]"
                                        disabled
                                        variant="underlined"
                                    >
                                        <template #label>
                                            <span v-if="rules.required" class="text-red">* </span>Address Source
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualBillingAddress.City">
                            <v-col cols="3" class="switches">
                                <v-switch color="accent" label="Preferred Address" v-model="editableIndividualBillingAddress.IsPreferred" />
                            </v-col>
                            <v-col cols="3" class="switches">
                                <v-switch color="accent" label="Do Not Visit" v-model="editableIndividualBillingAddress.DoNotVisit" />
                            </v-col>
                            <v-col cols="6">
                                <div class="data-container">
                                    <v-select
                                        :items="contactRestrictions"
                                        item-value="ContactRestrictionId"
                                        item-title="ContactRestrictionName"
                                        v-model="editableIndividualBillingAddress.CanSendMailRestrictionId"
                                        :rules="[rules.required]"
                                        variant="underlined"
                                    >
                                        <template #label>
                                            <span v-if="rules.required" class="text-red">* </span>Mailing Contact Restriction
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualBillingAddress.City">
                            <v-col cols="8">
                                <v-text-field :rules="[rules.required]"
                                              v-model="editableIndividualBillingAddress.AddressLine1"
                                              :maxlength="200"
                                              variant="underlined"
                                >
                                    <template #label>
                                        <span v-if="rules.required" class="text-red">* </span>Street Address
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field label="Suite/Apt"
                                              v-model="editableIndividualBillingAddress.AddressLine2"
                                              :maxlength="200"
                                              variant="underlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualBillingAddress.City">
                            <v-col cols="4">
                                <v-text-field :rules="[rules.required]"
                                              v-model="editableIndividualBillingAddress.City"
                                              :maxlength="100"
                                              variant="underlined"
                                >
                                    <template #label>
                                        <span v-if="rules.required" class="text-red">* </span>City
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <div class="data-container">
                                    <StateTerritorySelectComponent2
                                        item-value="StateTerritoryId"
                                        item-text="StateTerritoryName"
                                        label="State"
                                        v-model="editableIndividualBillingAddress.StateTerritoryId"
                                        :rules="[rules.required]"
                                        id="stateDropdown"
                                        :state-territories="stateTerritories"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field :rules="[rules.required]"
                                              v-model="editableIndividualBillingAddress.PostalCode"
                                              :maxlength="15"
                                              variant="underlined"
                                >
                                    <template #label>
                                        <span v-if="rules.required" class="text-red">* </span>Zip Code
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="btns-row" v-if="editableIndividualBillingAddress.City">
                            <p v-if="billingAddressMessage" class="success-message">{{ billingAddressMessage }}</p>
                            <v-col class="text-right hidden-md-and-down">
                                <v-btn color="primary" class="px-4" href="" @click="updateAddress('billing')" :disabled="billingAddressDisabled">Create Billing Address</v-btn>
                            </v-col>
                            <v-col class="hidden-lg-and-up mobile-col-button-spacing">
                                <v-btn color="primary" href="" @click="updateAddress('billing')" :disabled="billingAddressDisabled" class="px-4 mobile-button-multiline-smaller">Create Billing Address</v-btn>
                            </v-col>
                        </v-row>
                        <v-row v-if="!editableIndividualBillingAddress.City">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12">
                                        <p class="text-center contact-message">Billing Address not found</p>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-4">
                <hr style="border-top: dotted 2px;" />
            </v-col>
        </v-row>
        <!-- HOME EMAIL -->
        <v-row>
            <v-col class="p-4">
                <v-card class="email" style="overflow-y: scroll">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Home Email {{individualHomeEmails.length > 1 ? '(' + individualHomeEmails.length + ' found)' : ''}}</h3>
                            </v-col>
                        </v-row>
                        <v-row v-for="(email, index) in individualHomeEmails" :key="index">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="emailTypes"
                                                item-value="IndividualEmailTypeId"
                                                item-title="IndividualEmailTypeName"
                                                v-model="email.IndividualEmailTypeId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Type
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactStatus"
                                                item-value="ContactStatusId"
                                                item-title="ContactStatusName"
                                                v-model="email.ContactStatusId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Status
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactSources"
                                                item-value="ContactSourceId"
                                                item-title="ContactSourceName"
                                                v-model="email.ContactSourceId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Source
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Preferred Email" v-model="email.IsPreferred" disabled />
                                    </v-col>
                                    <v-col cols="5">
                                        <v-text-field :rules="[rules.required, rules.email]"
                                                      v-model="email.Email"
                                                      :maxlength="200"
                                                      disabled
                                                      variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Email
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactRestrictions"
                                                item-value="ContactRestrictionId"
                                                item-title="ContactRestrictionName"
                                                v-model="email.CanContactRestrictionId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Contact Restriction
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                        <v-row v-if="individualHomeEmails.length === 0">
                            <v-col cols="12">
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <p class="text-center contact-message">Home Email not found</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider v-if="editableIndividualEmail1.Email" vertical></v-divider>
            <v-col class="p-4">
                <v-card class="email">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Home Email</h3>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="emailTypes"
                                                item-value="IndividualEmailTypeId"
                                                item-title="IndividualEmailTypeName"
                                                v-model="editableIndividualEmail1.IndividualEmailTypeId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Type
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactStatus"
                                                item-value="ContactStatusId"
                                                item-title="ContactStatusName"
                                                v-model="editableIndividualEmail1.ContactStatusId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Status
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactSources"
                                                item-value="ContactSourceId"
                                                item-title="ContactSourceName"
                                                v-model="editableIndividualEmail1.ContactSourceId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Source
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Preferred Email" v-model="editableIndividualEmail1.IsPreferred" />
                                    </v-col>
                                    <v-col cols="5">
                                        <v-text-field :rules="[rules.required, rules.email]"
                                                      v-model="editableIndividualEmail1.Email"
                                                      :maxlength="200"
                                                      variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Email
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactRestrictions"
                                                item-value="ContactRestrictionId"
                                                item-title="ContactRestrictionName"
                                                v-model="editableIndividualEmail1.CanContactRestrictionId"
                                                :rules="[rules.required]"
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Contact Restriction
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualEmail1.Email" class="btns-row">
                            <p class="success-message">{{ emailMessage }}</p>
                            <v-col class="text-right hidden-md-and-down">
                                <v-btn color="primary" class="px-4" @click="updateEmail1()" :disabled="emailDisabled">Create Home Email</v-btn>
                            </v-col>
                            <v-col class="hidden-lg-and-up mobile-col-button-spacing">
                                <v-btn color="primary" @click="updateEmail1()" class="px-4 mobile-button-multiline-smaller" :disabled="emailDisabled">Create Home Email</v-btn>
                            </v-col>
                        </v-row>
                        <v-row v-if="!editableIndividualEmail1.Email">
                            <v-col cols="12">
                                <p class="text-center contact-message">Home Email not found</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <hr style="border-top: dotted 2px;" />
            </v-col>
        </v-row>
        <!-- WORK EMAIL -->
        <v-row>
            <v-col class="p-4">
                <v-card class="email" style="overflow-y: scroll">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Work Email {{individualWorkEmails.length > 1 ? '(' + individualWorkEmails.length + ' found)' : ''}}</h3>
                            </v-col>
                        </v-row>
                        <v-row v-for="(email, index) in individualWorkEmails" :key="index">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="emailTypes"
                                                item-value="IndividualEmailTypeId"
                                                item-title="IndividualEmailTypeName"
                                                v-model="email.IndividualEmailTypeId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Type
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactStatus"
                                                item-value="ContactStatusId"
                                                item-title="ContactStatusName"
                                                v-model="email.ContactStatusId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Status
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactSources"
                                                item-value="ContactSourceId"
                                                item-title="ContactSourceName"
                                                v-model="email.ContactSourceId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Source
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Preferred Email" v-model="email.IsPreferred" disabled />
                                    </v-col>
                                    <v-col cols="5">
                                        <v-text-field :rules="[rules.required, rules.email]"
                                                      v-model="email.Email"
                                                      :maxlength="200"
                                                      disabled
                                                      variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Email
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactRestrictions"
                                                item-value="ContactRestrictionId"
                                                item-title="ContactRestrictionName"
                                                v-model="email.CanContactRestrictionId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Contact Restriction
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                        <v-row v-if="individualWorkEmails.length === 0">
                            <v-col cols="12">
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <p class="text-center contact-message">Work Email not found</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
                <v-card class="p-4 mt-0 email">
                        <v-row>
                            <v-col cols="12">
                                <h3>Work Email</h3>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualEmail2.Email">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="emailTypes"
                                                item-value="IndividualEmailTypeId"
                                                item-title="IndividualEmailTypeName"
                                                v-model="editableIndividualEmail2.IndividualEmailTypeId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Type
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactStatus"
                                                item-value="ContactStatusId"
                                                item-title="ContactStatusName"
                                                v-model="editableIndividualEmail2.ContactStatusId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Status
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactSources"
                                                item-value="ContactSourceId"
                                                item-title="ContactSourceName"
                                                v-model="editableIndividualEmail2.ContactSourceId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Email Source
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Preferred Email" v-model="editableIndividualEmail2.IsPreferred" />
                                    </v-col>
                                    <v-col cols="5">
                                        <v-text-field :rules="[rules.required, rules.email]"
                                                      v-model="editableIndividualEmail2.Email"
                                                      :maxlength="200"
                                                      variant="underlined"
                                        >
                                            <template #label>
                                                <span v-if="rules.required" class="text-red">* </span>Email
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactRestrictions"
                                                item-value="ContactRestrictionId"
                                                item-title="ContactRestrictionName"
                                                v-model="editableIndividualEmail2.CanContactRestrictionId"
                                                :rules="[rules.required]"
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Contact Restriction
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualEmail2.Email" class="btns-row">
                            <p class="success-message">{{ email2Message }}</p>
                            <v-col class="text-right hidden-md-and-down">
                                <v-btn color="primary" class="px-4" @click="updateEmail2()" :disabled="email2Disabled">Create Work Email</v-btn>
                            </v-col>
                            <v-col class="hidden-lg-and-up mobile-col-button-spacing">
                                <v-btn color="primary" @click="updateEmail2()" class="px-4 mobile-button-multiline-smaller" :disabled="email2Disabled">Create Work Email</v-btn>
                            </v-col>
                        </v-row>
                        <v-row v-if="!editableIndividualEmail2.Email">
                            <v-col cols="12">
                                <p class="text-center contact-message">Work Email not found</p>
                            </v-col>
                        </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <hr style="border-top: dotted 2px;" />
            </v-col>
        </v-row>
        <!-- HOME PHONES -->
        <v-row>
            <v-col class="p-4">
                <v-card class="phone" style="overflow-y: scroll;">
                    <v-card-text>

                        <v-row>
                            <v-col cols="12">
                                <h3>Home Phone {{individualHomePhones.length > 1 ? '(' + individualHomePhones.length + ' found)' : ''}}</h3>
                            </v-col>
                        </v-row>
                        <v-row v-for="(phone, index) in individualHomePhones" :key="index">
                            <v-col cols="12">
                                <v-row v-if="phone.PhoneNumber">
                                    <v-col cols="12">
                                        <v-row>
                                            <v-col cols="4">
                                                <div class="data-container">
                                                    <v-select
                                                        :items="phoneTypes"
                                                        item-value="IndividualPhoneTypeId"
                                                        item-title="IndividualPhoneTypeName"
                                                        v-model="phone.IndividualPhoneTypeId"
                                                        :rules="[rules.required]"
                                                        disabled
                                                        variant="underlined"
                                                    >
                                                        <template #label>
                                                            <span v-if="rules.required" class="text-red">* </span>Phone Type
                                                        </template>
                                                    </v-select>
                                                </div>
                                            </v-col>
                                            <v-col cols="4">
                                                <div class="data-container">
                                                    <v-select
                                                        :items="contactStatus"
                                                        item-value="ContactStatusId"
                                                        item-title="ContactStatusName"
                                                        v-model="phone.ContactStatusId"
                                                        :rules="[rules.required]"
                                                        disabled
                                                        variant="underlined"
                                                    >
                                                        <template #label>
                                                            <span v-if="rules.required" class="text-red">* </span>Phone Status
                                                        </template>
                                                    </v-select>
                                                </div>
                                            </v-col>
                                            <v-col cols="4">
                                                <div class="data-container">
                                                    <v-select
                                                        :items="contactSources"
                                                        item-value="ContactSourceId"
                                                        item-title="ContactSourceName"
                                                        v-model="phone.ContactSourceId"
                                                        :rules="[rules.required]"
                                                        disabled
                                                        variant="underlined"
                                                    >
                                                        <template #label>
                                                            <span v-if="rules.required" class="text-red">* </span>Phone Source
                                                        </template>
                                                    </v-select>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-autocomplete
                                                    :items="phoneCountries"
                                                    item-title="CountryCallingCodeDisplay"
                                                    item-value="CountryId"
                                                    v-model="phone.CountryId"
                                                    label="Country"
                                                    disabled
                                                    variant="underlined"
                                                />
                                            </v-col>
                                            <v-col cols="4">
                                                <PhoneNumberComponent
                                                    v-model="phone.PhoneNumber"
                                                    :country-id="phone.CountryId"
                                                    :disabled="true"
                                                />
                                            </v-col>
                                            <v-col cols="4">
                                                <v-text-field label="Extension" v-model="phone.Extension" :maxlength="10" disabled variant="underlined" />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="3" class="switches">
                                                <v-switch color="accent" label="Preferred" v-model="phone.IsPreferred" disabled />
                                            </v-col>
                                            <v-col cols="3" class="switches">
                                                <v-switch color="accent" label="Text Allowed" v-model="phone.isTextAllowed" disabled />
                                            </v-col>
                                            <v-col cols="3" class="switches">
                                                <v-switch color="accent" label="Do Not Call" v-model="phone.isDoNotCall" disabled />
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-if="individualHomePhones.length === 0">
                            <v-col cols="12">
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <p class="text-center contact-message">Home Phone not found</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="p-4">
                <v-card class="phone">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Home Phone</h3>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualPhone1.PhoneNumber">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="phoneTypes"
                                                item-value="IndividualPhoneTypeId"
                                                item-title="IndividualPhoneTypeName"
                                                v-model="editableIndividualPhone1.IndividualPhoneTypeId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Phone Type
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactStatus"
                                                item-value="ContactStatusId"
                                                item-title="ContactStatusName"
                                                v-model="editableIndividualPhone1.ContactStatusId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Phone Status
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactSources"
                                                item-value="ContactSourceId"
                                                item-title="ContactSourceName"
                                                v-model="editableIndividualPhone1.ContactSourceId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Phone Source
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-autocomplete
                                            :items="phoneCountries"
                                            item-title="CountryCallingCodeDisplay"
                                            item-value="CountryId"
                                            v-model="editableIndividualPhone1.CountryId"
                                            label="Country"
                                            variant="underlined"
                                        />
                                    </v-col>
                                    <v-col cols="4">
                                        <PhoneNumberComponent
                                            v-model="editableIndividualPhone1.PhoneNumber"
                                            :country-id="editableIndividualPhone1.CountryId"
                                            :required="true"
                                        />
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field label="Extension"
                                                      v-model="editableIndividualPhone1.Extension"
                                                      :maxlength="10"
                                                      variant="underlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Preferred" v-model="editableIndividualPhone1.IsPreferred" />
                                    </v-col>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Text Allowed" v-model="editableIndividualPhone1.isTextAllowed" />
                                    </v-col>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Do Not Call" v-model="editableIndividualPhone1.isDoNotCall" />
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualPhone1.PhoneNumber" class="btns-row">
                            <p v-if="phoneMessage" class="success-message">{{ phoneMessage }}</p>
                            <v-col class="text-right hidden-md-and-down">
                                <v-btn color="primary" class="px-4" @click="updatePhone1()" :disabled="phoneDisabled">Create Home Phone</v-btn>
                            </v-col>

                            <v-col class="hidden-lg-and-up mobile-col-button-spacing">
                                <v-btn color="primary" @click="updatePhone1()" class="px-4 mobile-button-multiline-smaller" :disabled="phoneDisabled">Create Home Phone</v-btn>
                            </v-col>
                        </v-row>
                        <v-row v-if="!editableIndividualPhone1.PhoneNumber">
                            <v-col cols="12">
                                <p class="text-center contact-message">Home phone not found</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- WORK PHONES -->
        <v-row>
            <v-col class="p-4">
                <v-card class="phone" style="overflow-y: scroll;">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Work Phone {{individualWorkPhones.length > 1 ? '(' + individualWorkPhones.length + ' found)' : ''}}</h3>
                            </v-col>
                        </v-row>
                        <v-row v-for="(phone, index) in individualWorkPhones" :key="index">
                            <v-col cols="12">
                                <v-row v-if="phone.PhoneNumber">
                                    <v-col cols="12">
                                        <v-row>
                                            <v-col cols="4">
                                                <div class="data-container">
                                                    <v-select
                                                        :items="phoneTypes"
                                                        item-value="IndividualPhoneTypeId"
                                                        item-title="IndividualPhoneTypeName"
                                                        v-model="phone.IndividualPhoneTypeId"
                                                        :rules="[rules.required]"
                                                        disabled
                                                        variant="underlined"
                                                    >
                                                        <template #label>
                                                            <span v-if="rules.required" class="text-red">* </span>Phone Type
                                                        </template>
                                                    </v-select>
                                                </div>
                                            </v-col>
                                            <v-col cols="4">
                                                <div class="data-container">
                                                    <v-select
                                                        :items="contactStatus"
                                                        item-value="ContactStatusId"
                                                        item-title="ContactStatusName"
                                                        v-model="phone.ContactStatusId"
                                                        :rules="[rules.required]"
                                                        disabled
                                                        variant="underlined"
                                                    >
                                                        <template #label>
                                                            <span v-if="rules.required" class="text-red">* </span>Phone Status
                                                        </template>
                                                    </v-select>
                                                </div>
                                            </v-col>
                                            <v-col cols="4">
                                                <div class="data-container">
                                                    <v-select
                                                        :items="contactSources"
                                                        item-value="ContactSourceId"
                                                        item-title="ContactSourceName"
                                                        v-model="phone.ContactSourceId"
                                                        :rules="[rules.required]"
                                                        disabled
                                                        variant="underlined"
                                                    >
                                                        <template #label>
                                                            <span v-if="rules.required" class="text-red">* </span>Phone Source
                                                        </template>
                                                    </v-select>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-autocomplete
                                                    :items="phoneCountries"
                                                    item-title="CountryCallingCodeDisplay"
                                                    item-value="CountryId"
                                                    v-model="phone.CountryId"
                                                    label="Country"
                                                    disabled
                                                    variant="underlined"
                                                />
                                            </v-col>
                                            <v-col cols="4">
                                                <PhoneNumberComponent
                                                    v-model="phone.PhoneNumber"
                                                    :country-id="phone.CountryId"
                                                    :disabled="true"
                                                />
                                            </v-col>
                                            <v-col cols="4">
                                                <v-text-field label="Extension" v-model="phone.Extension" :maxlength="10" disabled variant="underlined" />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="3" class="switches">
                                                <v-switch color="accent" label="Preferred" v-model="phone.IsPreferred" disabled />
                                            </v-col>
                                            <v-col cols="3" class="switches">
                                                <v-switch color="accent" label="Text Allowed" v-model="phone.isTextAllowed" disabled />
                                            </v-col>
                                            <v-col cols="3" class="switches">
                                                <v-switch color="accent" label="Do Not Call" v-model="phone.isDoNotCall" disabled />
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-if="individualWorkPhones.length === 0">
                            <v-col cols="12">
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <p class="text-center contact-message">Work Phone not found</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="p-4">
                <v-card class="phone">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Work Phone</h3>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualPhone3.PhoneNumber">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="phoneTypes"
                                                item-value="IndividualPhoneTypeId"
                                                item-title="IndividualPhoneTypeName"
                                                v-model="editableIndividualPhone3.IndividualPhoneTypeId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Phone Type
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactStatus"
                                                item-value="ContactStatusId"
                                                item-title="ContactStatusName"
                                                v-model="editableIndividualPhone3.ContactStatusId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Phone Status
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactSources"
                                                item-value="ContactSourceId"
                                                item-title="ContactSourceName"
                                                v-model="editableIndividualPhone3.ContactSourceId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Phone Source
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-autocomplete
                                            :items="phoneCountries"
                                            item-title="CountryCallingCodeDisplay"
                                            item-value="CountryId"
                                            v-model="editableIndividualPhone3.CountryId"
                                            label="Country"
                                            variant="underlined"
                                        />
                                    </v-col>
                                    <v-col cols="4">
                                        <PhoneNumberComponent
                                            v-model="editableIndividualPhone3.PhoneNumber"
                                            :country-id="editableIndividualPhone3.CountryId"
                                            :required="true"
                                        />
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field label="Extension"
                                                      v-model="editableIndividualPhone3.Extension"
                                                      :maxlength="10"
                                                      variant="underlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Preferred" v-model="editableIndividualPhone3.IsPreferred" />
                                    </v-col>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Text Allowed" v-model="editableIndividualPhone3.isTextAllowed" />
                                    </v-col>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Do Not Call" v-model="editableIndividualPhone3.isDoNotCall" />
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualPhone3.PhoneNumber" class="btns-row">
                            <p v-if="phone3Message" class="success-message">{{ phone3Message }}</p>
                            <v-col class="text-right hidden-md-and-down">
                                <v-btn color="primary" class="px-4" @click="updatePhone3()" :disabled="phone3Disabled">Create Work Phone</v-btn>
                            </v-col>

                            <v-col class="hidden-lg-and-up mobile-col-button-spacing">
                                <v-btn color="primary" @click="updatePhone3()" class="px-4 mobile-button-multiline-smaller" :disabled="phone3Disabled">Create Work Phone</v-btn>
                            </v-col>
                        </v-row>
                        <v-row v-if="!editableIndividualPhone3.PhoneNumber">
                            <v-col cols="12">
                                <p class="text-center contact-message">Work phone not found</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- MOBILE PHONES -->
        <v-row>
            <v-col class="p-4">
                <v-card class="phone" style="overflow-y: scroll;">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>{{ mobilePhoneLabel }}</h3>
                            </v-col>
                        </v-row>
                        <v-row v-for="(phone, index) in individualMobilePhones" :key="index">
                            <v-col cols="12">
                                <v-row v-if="phone.PhoneNumber">
                                    <v-col cols="12">
                                        <v-row>
                                            <v-col cols="4">
                                                <div class="data-container">
                                                    <v-select
                                                        :items="phoneTypes"
                                                        item-value="IndividualPhoneTypeId"
                                                        item-title="IndividualPhoneTypeName"
                                                        v-model="phone.IndividualPhoneTypeId"
                                                        :rules="[rules.required]"
                                                        disabled
                                                        variant="underlined"
                                                    >
                                                        <template #label>
                                                            <span v-if="rules.required" class="text-red">* </span>Phone Type
                                                        </template>
                                                    </v-select>
                                                </div>
                                            </v-col>
                                            <v-col cols="4">
                                                <div class="data-container">
                                                    <v-select
                                                        :items="contactStatus"
                                                        item-value="ContactStatusId"
                                                        item-title="ContactStatusName"
                                                        v-model="phone.ContactStatusId"
                                                        :rules="[rules.required]"
                                                        disabled
                                                        variant="underlined"
                                                    >
                                                        <template #label>
                                                            <span v-if="rules.required" class="text-red">* </span>Phone Status
                                                        </template>
                                                    </v-select>
                                                </div>
                                            </v-col>
                                            <v-col cols="4">
                                                <div class="data-container">
                                                    <v-select
                                                        :items="contactSources"
                                                        item-value="ContactSourceId"
                                                        item-title="ContactSourceName"
                                                        v-model="phone.ContactSourceId"
                                                        :rules="[rules.required]"
                                                        disabled
                                                        variant="underlined"
                                                    >
                                                        <template #label>
                                                            <span v-if="rules.required" class="text-red">* </span>Phone Source
                                                        </template>
                                                    </v-select>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-autocomplete
                                                    :items="phoneCountries"
                                                    item-title="CountryCallingCodeDisplay"
                                                    item-value="CountryId"
                                                    v-model="phone.CountryId"
                                                    label="Country"
                                                    disabled
                                                    variant="underlined"
                                                />
                                            </v-col>
                                            <v-col cols="4">
                                                <PhoneNumberComponent
                                                    v-model="phone.PhoneNumber"
                                                    :country-id="phone.CountryId"
                                                    :disabled="true"
                                                />
                                            </v-col>
                                            <v-col cols="4">
                                                <v-text-field label="Extension" v-model="phone.Extension" :maxlength="10" disabled variant="underlined" />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="3" class="switches">
                                                <v-switch color="accent" label="Preferred" v-model="phone.IsPreferred" disabled />
                                            </v-col>
                                            <v-col cols="3" class="switches">
                                                <v-switch color="accent" label="Text Allowed" v-model="phone.isTextAllowed" disabled />
                                            </v-col>
                                            <v-col cols="3" class="switches">
                                                <v-switch color="accent" label="Do Not Call" v-model="phone.isDoNotCall" disabled />
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-if="individualMobilePhones.length === 0">
                            <v-col cols="12">
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <p class="text-center contact-message">Mobile Phone not found</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="p-4">
                <v-card class="phone">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h3>Mobile Phone</h3>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualPhone2.PhoneNumber">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="phoneTypes"
                                                item-value="IndividualPhoneTypeId"
                                                item-title="IndividualPhoneTypeName"
                                                v-model="editableIndividualPhone2.IndividualPhoneTypeId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Phone Type
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactStatus"
                                                item-value="ContactStatusId"
                                                item-title="ContactStatusName"
                                                v-model="editableIndividualPhone2.ContactStatusId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Phone Status
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="data-container">
                                            <v-select
                                                :items="contactSources"
                                                item-value="ContactSourceId"
                                                item-title="ContactSourceName"
                                                v-model="editableIndividualPhone2.ContactSourceId"
                                                :rules="[rules.required]"
                                                disabled
                                                variant="underlined"
                                            >
                                                <template #label>
                                                    <span v-if="rules.required" class="text-red">* </span>Phone Source
                                                </template>
                                            </v-select>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-autocomplete
                                            :items="phoneCountries"
                                            item-title="CountryCallingCodeDisplay"
                                            item-value="CountryId"
                                            v-model="editableIndividualPhone2.CountryId"
                                            label="Country"
                                            variant="underlined"
                                        />
                                    </v-col>
                                    <v-col cols="4">
                                        <PhoneNumberComponent
                                            v-model="editableIndividualPhone2.PhoneNumber"
                                            :countryId="editableIndividualPhone2.CountryId"
                                            :required="true"
                                        />
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field label="Extension"
                                                      v-model="editableIndividualPhone2.Extension"
                                                      :maxlength="10"
                                                      variant="underlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Preferred" v-model="editableIndividualPhone2.IsPreferred" />
                                    </v-col>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Text Allowed" v-model="editableIndividualPhone2.isTextAllowed" />
                                    </v-col>
                                    <v-col cols="3" class="switches">
                                        <v-switch color="accent" label="Do Not Call" v-model="editableIndividualPhone2.isDoNotCall" />
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-if="editableIndividualPhone2.PhoneNumber" class="btns-row">
                            <p v-if="phone2Message" class="success-message">{{ phone2Message }}</p>
                            <v-col class="text-right hidden-md-and-down">
                                <v-btn color="primary" class="px-4" @click="updatePhone2()" :disabled="phone2Disabled">Create Mobile Phone</v-btn>
                            </v-col>

                            <v-col class="hidden-lg-and-up mobile-col-button-spacing">
                                <v-btn color="primary" @click="updatePhone2()" class="px-4 mobile-button-multiline-smaller" :disabled="phone2Disabled">Create Mobile Phone</v-btn>
                            </v-col>
                        </v-row>
                        <v-row v-if="!editableIndividualPhone2.PhoneNumber">
                            <v-col cols="12">
                                <p class="text-center contact-message">Mobile phone not found</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-container>
       <v-row>
           <v-col>
              <v-alert type="warning">
                  Changes to the individual must be saved at each section. Click the Review Completed button to move forward.
              </v-alert>
           </v-col>
       </v-row>
        <v-row>
            <v-col class="text-right">
                <v-btn v-if="!hideCancelBtn" class="cancel-btn mx-2 px-3" color="darken-1" @click="cancelAction()">Cancel</v-btn>
                <v-btn class="save-btn mx-2 px-3" color="success" @click="openConfirmAction()">Review Completed</v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="300">
        <v-card class="review-popup">
            <v-card-title class="text-h5">Confirm changes</v-card-title>
            <v-card-text>Click Continue to review updates.</v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="red-darken-1" class="pop-btn" variant="text" @click="dialog = false">Cancel</v-btn>
                <v-btn color="green-darken-1" class="pop-btn" variant="text" @click="dialog = false; saveAction()">Continue</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { compareAsc, format, formatISO, subDays } from 'date-fns';
    import { clone } from "lodash-es";
    import PhoneNumberComponent from "../Common/PhoneNumberComponent";
    import JobClassChooser from "../Employer/Partial/JobClassChooser";
    import StateTerritorySelectComponent from "../Common/StateTerritorySelectComponent";
    import StateTerritorySelectComponent2 from "../Common/StateTerritorySelectComponent2";
    import WorkLocationChooser from "../Employer/Partial/WorkLocationChooser";
    import WorkStructureChooser from "../Employer/Partial/WorkStructureChooser";

    export default {
        name: "CompareIndividualComponent",
        components: {
            PhoneNumberComponent,
            JobClassChooser,
            WorkStructureChooser,
            WorkLocationChooser,
            StateTerritorySelectComponent,
            StateTerritorySelectComponent2,
        },

        data() {
            return {
                id: 0,
                individual: {},
                individualAffiliate:{},
                individualCope: {},
                templateId: 0,
                flipped: false,
                loading: false,
                notAllowed: false,
                valid: true,
                submissionData: [],
                editableIndividual: {},
                prefixes: [],
                suffixes: [],
                item: null,
                index: null,
                FirstName: null,
                individualFirstName: null,
                submissionId: null,
                years: [],
                months: [
                    {
                        label: 'January',
                        value: 1
                    },
                    {
                        label: 'February',
                        value: 2
                    },
                    {
                        label: 'March',
                        value: 3
                    },
                    {
                        label: 'April',
                        value: 4
                    },
                    {
                        label: 'May',
                        value: 5
                    },
                    {
                        label: 'June',
                        value: 6
                    },
                    {
                        label: 'July',
                        value: 7
                    },
                    {
                        label: 'August',
                        value: 8
                    },
                    {
                        label: 'September',
                        value: 9
                    },
                    {
                        label: 'October',
                        value: 10
                    },
                    {
                        label: 'November',
                        value: 11
                    },
                    {
                        label: 'December',
                        value: 12
                    },
                ],
                dates: [],
                genders: [],
                maritalStatus: [],
                educationLevels: [],
                dependents: [],
                unionRelationships: [],
                editableIndividualAffiliate: {},
                editableIndividualCope: {},
                selectedUnionRelationshipTypeId: 2,
                oldUnionRelationshipTypeId: null,
                selectedAffiliateName: '',
                stopReasons: [],
                dialog: false,
                dialog2: false,
                duesCategories: [],
                paymentMethods: [],
                paymentFrequencies: [],
                basicMessage: "",
                demographicMessage: "",
                unionRelationshipMessage: "",
                emailMessage: "",
                email2Message: "",
                phoneMessage: "",
                phone2Message: "",
                phone3Message: "",
                addressMessage: "",
                billingAddressMessage: "",
                basicDisabled: false,
                demographicsDisabled: false,
                unionDisabled: false,
                emailDisabled: false,
                email2Disabled: false,
                phoneDisabled: false,
                phone2Disabled: false,
                phone3Disabled: false,
                addressDisabled: false,
                billingAddressDisabled: false,
                employers: [],
                subjects: [],
                units: [],
                editableIndividualEmployer: {},
                WorkStructureId: null,
                WorkLocationId: null,
                selectedEmployerId: null,
                selectedUnitId: null,
                selectedLocalJobClassId: null,
                selectedJobTitleId: null,
                selectedEmployerName: "",
                selectedUnitName:"",
                employerDisabled: false,
                employerMessage: "",
                individualEmployer: {},
                individualEmployers:[],
                individualAddress: {},
                individualHomeAddresses: [],
                individualBillingAddress: {},
                individualBillingAddresses: [],
                editableIndividualAddress:{},
                editableIndividualBillingAddress:{},
                addressTypes: [],
                emailTypes: [],
                phoneTypes:[],
                contactRestrictions: [],
                individualEmails: [],
                individualEmail1: {},
                individualEmail2:{},
                individualHomeEmails: [],
                individualWorkEmails: [],
                editableIndividualEmail1: {},
                editableIndividualEmail2: {},
                phoneCountries: [],
                individualPhones: [],
                individualPhone1: {},
                individualPhone2:{},
                individualPhone3:{},
                individualHomePhones: [],
                individualWorkPhones: [],
                individualMobilePhones: [],
                editableIndividualPhone1: {},
                editableIndividualPhone2:{},
                editableIndividualPhone3:{},
                hideCancelBtn: false,
                hideBillingCancelBtn: false,
                showCope: true,
                employerRules: {
                    required: value => !!value || 'Required.'
                },
                isEduesEligible: false,
                overlay: true,
            }
        },

        created() {
            // Default buttons/messge is displayed. Later, needs some research if custom message is possible.
            window.addEventListener('beforeunload', (event) => {
                const message = '';
                if (event) {
                    console.log(message);
                    event.preventDefault();
                    event.returnValue = message;
                }
                return message;
            });

            this.$store.dispatch('contactSource/getContactSources');
            this.$store.dispatch('contactStatus/getContactStatuses');
        },

        async mounted() {
            /*
            if (this.overlay === true) {
                setTimeout(() => {
                this.overlay = false;
                }, 3500);
            }
             */
            this.individualAffiliate.UnionRelationshipTypeId = this.selectedUnionRelationshipTypeId;
            this.editableIndividualAffiliate.UnionRelationshipTypeId = this.selectedUnionRelationshipTypeId;
            if(this.$route.query.submissionId){
                this.getFormTemplateDetailsFromSubmission(this.$route.query.submissionId);
            }
            if (this.$route.params.id) {
                this.id = this.$route.params.id;
                await this.getDataFromApi();
            } else {
                this.loading = false;
            }
            if(this.$route.query.submissionId){
                this.isSubmissionEDuesEligible(this.$route.query.submissionId);
                this.getSubmissionDataFromApi(this.$route.query.submissionId);
            }
            axios.get('/api/v2/gender').then((response) => {
                this.genders = response.data.data;
            });

            axios.get('/api/v2/maritalStatus').then((response) => {
                this.maritalStatus = response.data.data;
            });

            axios.get('/api/v3/memberforms/countries').then((response) => {
                this.phoneCountries = response.data;
            });

            if (this.selectedAffiliate) {
                axios.get('/api/v2/localEducationLevel?filter[AffiliateId]=' + this.selectedAffiliate).then((response) => {
                    this.educationLevels = response.data.data;
                });
                axios.get('/api/v2/unionRelationshipType').then((response) => {
                    this.unionRelationships = response.data.data;
                });
                 axios.get('/api/v2/aggregate/employer/byaffiliate/' + this.selectedAffiliate).then((response) => {
                    this.employers = response.data.data;
                });
                axios.get('/api/v2/subject?sort=SubjectName&filter[AffiliateId]' + this.selectedAffiliate).then((response) => {
                    this.subjects = response.data.data;
                });
            }

            axios.get('/api/v2/paymentMethod').then((response) => {
                this.paymentMethods = response.data.data;
            });
            axios.get('/api/v2/paymentFrequency').then((response) => {
                this.paymentFrequencies = response.data.data;
            });
            axios.get('/api/v2/custom/individual/stop-reasons/' + this.individualAffiliate.UnionRelationshipTypeId).then((response) => {
                this.stopReasons = response.data.data;
            });
            this.setupStaticData();
            axios.get('/api/v2/IndividualAddressType').then((response) => {
                this.addressTypes = response.data.data;
            });
             axios.get('/api/v2/IndividualEmailType').then((response) => {
                this.emailTypes = response.data.data;
            });
             axios.get('/api/v2/IndividualPhoneType').then((response) => {
                this.phoneTypes = response.data.data;
            });
            // TODO: use vuex store
            axios.get('/api/v2/ContactRestriction').then((response) => {
                this.contactRestrictions = response.data.data;
                // this.overlay = false;
            })
            .finally(() => {
                this.overlay = false;
            });

            console.log(this.individualPhones);
        },
        watch: {
            individualAffiliate: {
                handler (value) {
                    this.individualAffiliate = value;
                    this.editableIndividualAffiliate = clone(value);
                     console.log(this.editableIndividualAffiliate);
                    if (this.editableIndividualAffiliate.StartDate) {
                        this.editableIndividualAffiliate.StartDate = this.editableIndividualAffiliate.StartDate.split('T')[0];
                    }
                    if (this.editableIndividualAffiliate.EndDate) {
                        this.editableIndividualAffiliate.EndDate = this.editableIndividualAffiliate.EndDate.split('T')[0];
                    }

                    this.setupFormData();
                    if (this.individualAffiliate.UnionRelationshipTypeId) {
                        this.selectedUnionRelationshipTypeId = this.individualAffiliate.UnionRelationshipTypeId;
                        // console.log('this.templateId', this.templateId);
                        const memberTemplates = [1, 2, 4, 5, 7];
                        if (memberTemplates.includes(parseInt(this.templateId, 10))) {
                            this.selectedUnionRelationshipTypeId = 2;
                        }
                        /*
                        axios.get('/api/v2/custom/individual/stop-reasons/' + this.individualAffiliate.UnionRelationshipTypeId).then((response) => {
                            this.stopReasons = response.data.data;
                        });
                        */
                    }
                },
            },
            individual: {
                deep: true,
                immediate: false,
                handler(newVal, oldVal) {
                    this.$nextTick(() => {
                        this.individual = newVal;
                    });
                }
            },
            selectedUnionRelationshipTypeId: {
                handler (value) {
                    this.editableIndividualAffiliate.UnionRelationshipTypeId = value;
                    console.log(this.editableIndividualAffiliate);
                }
            },
            selectedEmployerId: {
                handler(value) {
                    if (value && value !== this.editableIndividualEmployer.EmployerId) {
                        this.editableIndividualEmployer.EmployerId = value;
                        this.loadOptions(value);
                    }
                    return value;
                },
                deep: true
            },
            selectedUnitId: {
                handler (value) {
                    if (value && value !== this.editableIndividualEmployer.UnitId) {
                        this.editableIndividualEmployer.UnitId = value;
                        this.selectedLocalJobClassId = null;
                        this.selectedJobTitleId = null;
                        console.log('Unit', this.editableIndividualEmployer);
                    }
                }
            },
            selectedLocalJobClassId: {
                handler (value) {
                    if (value && value !== this.editableIndividualEmployer.LocalJobClassId) {
                        this.editableIndividualEmployer.LocalJobClassId = value;
                        this.selectedJobTitleId = null;
                        console.log('LocalJobClass', this.editableIndividualEmployer);
                    }
                },
            },
            selectedJobTitleId: {
                handler (value) {
                    if (value && value !== this.editableIndividualEmployer.JobTitleId) {
                        this.editableIndividualEmployer.JobTitleId = value;
                        console.log('JobTitle', this.editableIndividualEmployer);
                    }
                },
            },
            $route(to, from) {
                this.id = to.params.id;
                //this.getDataFromApi();
            }
        },
        computed: {
            computedDayOfBirth: {
                get() {
                    return this.individual.DayOfBirth;
                },
                set(value) {
                    this.individual.DayOfBirth = value;
                }
            },
            mobilePhoneLabel() {
                const phoneCount = this.individualMobilePhones.length;
                return `Mobile Phone${phoneCount > 1 ? ` (${phoneCount} found)` : ''}`;
            },
            selectedAffiliate() {
                return this.$store.getters['user/selectedAffiliate'].AffiliateId;
            },
            rules () {
                const rules = {};
                rules['required'] = value => !!value || 'Required.';
                rules['email'] = value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                };
                rules['copeAmount'] = value => (this.editableIndividualCope.CopePaymentMethodId || this.editableIndividualCope.CopePaymentFrequencyId) ? (!!value || 'Required') : true;
                rules['copeDecimal'] = value => value ? /^[+-]?(?=.?\d)\d*(\.\d{0,3})?/gm.test(value) || 'You cannot add more than 3 decimals' : true;
                rules['stopReasonEndDate'] = value =>  (this.editableIndividualAffiliate.IndividualDeactivationReasonId) ? (!!value || 'Required') : true;
                rules['stopReason'] = value => (this.editableIndividualAffiliate.EndDate) ? (!!value || 'Required') : true;
                rules['startEnd'] = value => (value && this.editableIndividualAffiliate.EndDate)
                    ? (compareAsc(value, this.editableIndividualAffiliate.EndDate) < 0) || 'Start date should be before end date'
                    : true;
                rules['endStart'] = value => (value && this.editableIndividualAffiliate.StartDate)
                    ? (compareAsc(value, this.editableIndividualAffiliate.StartDate) > 0) || 'Start date should be before end date'
                    : true;

                return rules
            },
            contactSources() {
                return this.$store.getters["contactSource/contactSources"];
            },
            contactStatus() {
                return this.$store.getters["contactStatus/contactStatuses"]
            },
            stateTerritories() {
                return this.$store.getters["stateTerritory/stateTerritories"];
            }
        },
        methods: {
            async getDataFromApi() {
                this.loading = true;
                this.oldUnionRelationshipTypeId = 0;

                return await axios.get('/api/v2/individual/' + this.id + '?include=individualAffiliates.Affiliate,Gender,MaritalStatus,individualEducationLevels,individualEducationLevels.LocalEducationLevel,individualMembers,activeindividualAffiliates.UnionRelationshipType,activeIndividualAffiliates.LocalDuesCategory,individualAddressesOrdered,individualAddressesOrdered.StateTerritory,individualEmailsOrdered,individualPhonesOrdered,activeIndividualEmployers,activeIndividualEmployers.JobTitle,activeIndividualEmployers.Employer,activeIndividualEmployers.Employer.Chapter,individualQuickComments.IndividualAssessment,PoliticalParty,individualCope,individualEmployers,activeIndividualEmployers.LocalJobClass,activeIndividualEmployers.LocalJobClass.Unit,activeIndividualEmployers.WorkLocation,activeIndividualEmployers.WorkStructure')
                    .then(response => {
                        this.individual = response.data.data;
                        if(this.individual.activeIndividualAffiliates && this.individual.activeIndividualAffiliates.length>0){
                            this.individualAffiliate = this.individual.activeIndividualAffiliates[0];
                            this.individualAffiliate.StartDate = this.individualAffiliate.StartDate ? format(this.individualAffiliate.StartDate, 'yyyy-MM-dd') : null;
                            if(this.individual.individualCope && this.individual.individualCope.length>0){
                                this.individualCope = this.individual.individualCope[0];
                            }
                            let MemberId = "";
                            for (let i = 0; i <this.individual.individualMembers.length; i++) {
                                const member = this.individual.individualMembers[i].MemberId
                                MemberId = MemberId+','+member;
                            }
                            this.individualAffiliate.MemberId = MemberId;

                            let Unit = "";
                            for (let i = 0; i <this.individual.individualEmployers.length; i++) {
                                if (this.individual.individualEmployers[i].hasOwnProperty('LocalJobClass')) {
                                    const LocalJobClass = this.individual.individualEmployers[i].LocalJobClass;
                                    const unitObj = LocalJobClass.Unit;
                                    Unit = Unit + ',' + unitObj.UnitName;
                                }
                            }
                            this.individualAffiliate.Unit = Unit;
                            this.oldUnionRelationshipTypeId = this.individualAffiliate.UnionRelationshipTypeId;
                            //this.individualAffiliate.UnionRelationshipTypeId = this.selectedUnionRelationshipTypeId;
                        }
                        this.individualFirstName = this.individual.FirstName;
                        this.individualEmployers =  this.individual.activeIndividualEmployers;
                        for (let i = 0; i <this.individual.activeIndividualEmployers.length; i++) {
                            const individualEmployer = this.individual.activeIndividualEmployers[i];
                            individualEmployer.HireDate = individualEmployer.HireDate ? format(individualEmployer.HireDate, 'yyyy-MM-dd') : null;
                            individualEmployer.StartDate = individualEmployer.StartDate ? format(individualEmployer.StartDate, 'yyyy-MM-dd') : null;
                            if (individualEmployer.EmployerId) {
                                individualEmployer.selectedEmployerName = individualEmployer.Employer ? individualEmployer.Employer.EmployerName : "";
                                const unitObj = individualEmployer.LocalJobClass ? individualEmployer.LocalJobClass.Unit : null;
                                individualEmployer.selectedUnitName = unitObj ? unitObj.UnitName : null;
                                individualEmployer.UnitId = individualEmployer.LocalJobClass ? individualEmployer.LocalJobClass.UnitId : null;
                                individualEmployer.LocalJobClassName = individualEmployer.LocalJobClass ? individualEmployer.LocalJobClass.LocalJobClassName : '';
                            }
                            if(individualEmployer.WorkLocation){
                                individualEmployer.WorkLocationName = individualEmployer.WorkLocation.WorkLocationName;
                            }
                            if(individualEmployer.WorkStructure){
                                individualEmployer.WorkStructureName = individualEmployer.WorkStructure.WorkStructureName;
                            }
                        }
                        this.individualAddress = this.individual.individualAddressesOrdered ? this.getIndividualAddressByType(1, this.individual.individualAddressesOrdered) : {};
                        this.individualHomeAddresses = this.individual.individualAddressesOrdered ? this.getIndividualAddressesByType(1, this.individual.individualAddressesOrdered) : [];

                        if (this.individualAddress) {
                            this.individualAddress.StateTerritoryName = this.individualAddress.StateTerritory ? this.individualAddress.StateTerritory.StateTerritoryName : '';
                        }
                        this.individualBillingAddress = this.individual.individualAddressesOrdered ? this.getIndividualAddressByType(3, this.individual.individualAddressesOrdered) : {};
                        this.individualBillingAddresses = this.individual.individualAddressesOrdered ? this.getIndividualAddressesByType(3, this.individual.individualAddressesOrdered) : [];
                        // this.individualBillingAddress = this.individual.individualAddressesOrdered[1] ? this.individual.individualAddressesOrdered[1] : {};
                        this.individualBillingAddress.StateTerritoryName = this.individualBillingAddress.StateTerritory ? this.individualBillingAddress.StateTerritory.StateTerritoryName : '';
                        this.editableIndividualAddress = clone(this.individualAddress);
                        this.editableIndividualAddress ? this.editableIndividualAddress.IndividualAddressTypeId = 1: '';
                        this.editableIndividualBillingAddress = clone(this.individualBillingAddress);
                        let individualEmailsTemp = this.individual.individualEmailsOrdered;
                        this.individualEmail1.IndividualEmailTypeId =1;
                        this.individualEmail2.IndividualEmailTypeId =2;
                        for (let i = 0; i <individualEmailsTemp.length; i++) {

                            if(individualEmailsTemp[i].IndividualEmailTypeId==1){
                                this.individualEmail1 = individualEmailsTemp[i];
                            }
                            if(individualEmailsTemp[i].IndividualEmailTypeId==2){
                                this.individualEmail2 = individualEmailsTemp[i];
                            }
                        }
                        this.individualEmails.push(this.individualEmail1);
                        this.individualEmails.push(this.individualEmail2);
                        this.individualHomeEmails = this.individual.individualEmailsOrdered ? this.getIndividualEmailsByType(1, this.individual.individualEmailsOrdered) : [];
                        this.individualWorkEmails = this.individual.individualEmailsOrdered ? this.getIndividualEmailsByType(2, this.individual.individualEmailsOrdered) : [];

                        let individualPhonesTemp = this.individual.individualPhonesOrdered;
                        this.individualPhone1.IndividualPhoneTypeId = 1;
                        this.individualPhone2.IndividualPhoneTypeId = 2;
                        this.individualPhone3.IndividualPhoneTypeId = 3;
                        for (let i = 0; i < individualPhonesTemp.length; i++) {

                            if(individualPhonesTemp[i].IndividualPhoneTypeId==1){
                                this.individualPhone1 = individualPhonesTemp[i];
                                this.individualPhone1.isTextAllowed = individualPhonesTemp[i].CanTextRestrictionId ? true : false;
                                this.individualPhone1.isDoNotCall = individualPhonesTemp[i].CanCallRestrictionId ? true : false;
                            }
                            if(individualPhonesTemp[i].IndividualPhoneTypeId==2){
                                this.individualPhone2 = individualPhonesTemp[i];
                                this.individualPhone2.isTextAllowed = individualPhonesTemp[i].CanTextRestrictionId ? true : false;
                                this.individualPhone2.isDoNotCall = individualPhonesTemp[i].CanCallRestrictionId ? true : false;
                            }
                            if(individualPhonesTemp[i].IndividualPhoneTypeId==3){
                                this.individualPhone3 = individualPhonesTemp[i];
                                this.individualPhone3.isTextAllowed = individualPhonesTemp[i].CanTextRestrictionId ? true : false;
                                this.individualPhone3.isDoNotCall = individualPhonesTemp[i].CanCallRestrictionId ? true : false;
                            }
                        }
                        this.individualPhones.push(this.individualPhone1);
                        this.individualPhones.push(this.individualPhone2);
                        this.individualPhones.push(this.individualPhone3);

                        this.addPhoneRestrictionAttributes(this.individual.individualPhonesOrdered);
                        this.individualHomePhones = this.individual.individualPhonesOrdered ? this.getIndividualPhonesByType(1, this.individual.individualPhonesOrdered) : [];
                        this.individualWorkPhones = this.individual.individualPhonesOrdered ? this.getIndividualPhonesByType(2, this.individual.individualPhonesOrdered) : [];
                        this.individualMobilePhones = this.individual.individualPhonesOrdered ? this.getIndividualPhonesByType(3, this.individual.individualPhonesOrdered) : [];

                        this.setupFormData();
                    })
                    .catch((err) => {
                        // this.$router.push({ name: 'Individuals' });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            addPhoneRestrictionAttributes(phones) {
                for(const phone of phones) {
                    // Extracting the same logic as implemented earlier.
                    phone.isTextAllowed = phone.CanTextRestrictionId == 1 ? true : false;
                    phone.isDoNotCall = phone.CanCallRestrictionId == 1 ? false : true;
                }
            },
            getSubmissionDataFromApi(id) {
                this.submissionId = id;
                let url = '/api/v3/memberforms/admin/submission/' + id;
                return axios.get(url)
                    .then(response => {
                        const submissionDate = response.data.CreatedAt;
                        this.submissionData = response.data.FormSubmissionData;
                        const form = response.data.Form;
                        if (form.form_template_id == 1 || form.form_template_id == 4){
                            this.showCope = false;
                        }
                        const firstName = this.getSubmissionValue('firstName')
                        this.FirstName = firstName;
                        this.editableIndividual.FirstName = firstName;
                        this.editableIndividual.LastName = this.getSubmissionValue('lastName');
                        this.editableIndividual.MiddleName = this.getSubmissionValue('middleName');
                        this.editableIndividual.PreferredName = this.getSubmissionValue('preferredName');

                        const dateOfBirth = this.getSubmissionValue('dateOfBirth');
                        if (dateOfBirth) {
                            const [y, m, d] = dateOfBirth.split("-").map((part) => parseInt(part));
                            this.editableIndividual.YearOfBirth = y;
                            this.editableIndividual.MonthOfBirth = m;
                            this.editableIndividual.DayOfBirth = d;
                        }
                        this.editableIndividualAffiliate.PaymentFrequencyId = null;
                        this.editableIndividualCope.CopePaymentFrequencyId = this.individualCope.CopePaymentFrequencyId;
                        const localDuesCategory = this.getSubmissionValue('LocalDuesCategory');
                        if (localDuesCategory) {
                            this.individual.selectedDuesCategory = parseInt(localDuesCategory);
                            this.editableIndividualAffiliate.LocalDuesCategoryId = parseInt(localDuesCategory);
                            const LocalDuesCategoryIdObj =  this.getLocalDuesCategory(this.individual.selectedDuesCategory);
                            if(LocalDuesCategoryIdObj && LocalDuesCategoryIdObj.PaymentFrequency){
                                if (this.individualAffiliate.PaymentFrequencyId == null || this.individualAffiliate.PaymentFrequencyId == "") {
                                    this.editableIndividualAffiliate.PaymentFrequencyId =  LocalDuesCategoryIdObj.PaymentFrequency.PaymentFrequencyId;
                                }
                                if (this.individualCope.PaymentFrequencyId == null || this.individualCope.PaymentFrequencyId == "") {
                                    this.editableIndividualCope.CopePaymentFrequencyId =  LocalDuesCategoryIdObj.PaymentFrequency.PaymentFrequencyId;
                                }
                            }
                        }
                        this.editableIndividualAffiliate.PaymentMethodId = this.individualAffiliate.PaymentMethodId || 1;

                        if (parseInt(this.templateId, 10) === 7) {
                            this.editableIndividualAffiliate.PaymentMethodId = 2; //Cash if DataForm
                        }

                        if (submissionDate) {
                            this.editableIndividualAffiliate.StartDate =  format(subDays(submissionDate, 1), 'yyyy-MM-dd');
                            this.editableIndividualAffiliate.EndDate = format(subDays(submissionDate, 1), 'yyyy-MM-dd');
                        }
                        const copeAmount = this.getSubmissionValue('copeAmount');
                        this.editableIndividualCope.CopeAmount =  copeAmount ? copeAmount.replace('$','') : '';

                        const employerId = parseInt(this.getSubmissionValue('employer'));
                        if (employerId) {
                            const individualEmployer = this.getIndividualEmployer(employerId);
                            if (individualEmployer) {
                                this.individualEmployer = individualEmployer;
                                this.editableIndividualEmployer = clone(this.individualEmployer);
                                this.selectedUnitId = this.editableIndividualEmployer.LocalJobClass
                                    ? this.editableIndividualEmployer.LocalJobClass.UnitId
                                    : null;
                                 this.selectedLocalJobClassId = this.editableIndividualEmployer.LocalJobClass
                                     ? this.editableIndividualEmployer.LocalJobClassId
                                     : null;
                            } else {
                                 if (this.individualEmployers.length > 0) {
                                    this.selectedUnitId = this.individualEmployers[0].LocalJobClass
                                        ? this.individualEmployers[0].LocalJobClass.UnitId
                                        : null;
                                     this.selectedLocalJobClassId = this.editableIndividualEmployer.LocalJobClassId = this.individualEmployers[0].LocalJobClassId
                                         ? this.individualEmployers[0].LocalJobClassId
                                         : null;
                                }
                            }
                            this.editableIndividualEmployer.EmployerId = employerId;
                            this.selectedEmployerId = this.editableIndividualEmployer.EmployerId;
                            this.loadOptions(this.editableIndividualEmployer.EmployerId);
                            this.setWorkLocationId(this.editableIndividualEmployer.EmployerId);
                        }
                        const workLocation = this.getSubmissionValue('workLocation');
                        if (workLocation) {
                            this.editableIndividualEmployer.WorkLocationId = parseInt(workLocation);
                            // this.WorkStructureId = this.editableIndividualEmployer.WorkStructureId;
                            this.WorkLocationId = this.editableIndividualEmployer.WorkLocationId;
                        }
                        const workStructure = this.getSubmissionValue('workStructure');
                        if (workStructure) {
                            this.editableIndividualEmployer.WorkStructureId = parseInt(workStructure);
                            this.WorkStructureId = this.editableIndividualEmployer.WorkStructureId;
                            // this.WorkLocationId = this.editableIndividualEmployer.WorkLocationId;
                        }
                        this.selectedUnitId = this.editableIndividualEmployer.UnitId = parseInt(this.getSubmissionValue('unit')) || null;
                        this.selectedLocalJobClassId = this.editableIndividualEmployer.LocalJobClassId = parseInt(this.getSubmissionValue('localJobClass')) || null;
                        this.selectedJobTitleId = this.editableIndividualEmployer.JobTitleId = parseInt(this.getSubmissionValue('jobTitle')) || null;

                        const employerHireDate = this.getSubmissionValue('employerHireDate') ?? submissionDate;
                        this.editableIndividualEmployer.HireDate = employerHireDate ? format(subDays(employerHireDate, 1), 'yyyy-MM-dd') : null;
                        const employerStartDate = this.getSubmissionValue('employerStartDate') ?? submissionDate;
                        this.editableIndividualEmployer.StartDate = employerStartDate ? format(subDays(employerStartDate, 1), 'yyyy-MM-dd') : null;

                        this.editableIndividualEmployer.EmployeeId = this.getSubmissionValue('employeeID');

                        const addressLine1 = this.getSubmissionValue('addressLine1');
                        if (addressLine1) {
                            this.editableIndividualAddress.AddressLine1 = addressLine1;
                            this.editableIndividualAddress.ContactSourceId = 29;
                            this.editableIndividualAddress.CanSendMailRestrictionId = 1;
                        }
                        this.editableIndividualAddress.ContactStatusId = 4;

                        this.editableIndividualAddress.AddressLine2 = this.getSubmissionValue('addressLine2');
                        this.editableIndividualAddress.City = this.getSubmissionValue('city');
                        this.editableIndividualAddress.StateTerritoryId = parseInt(this.getSubmissionValue('state')) || null;
                        this.editableIndividualAddress.PostalCode = this.getSubmissionValue('zip');
                        this.editableIndividualAddress.IsPreferred = !!this.getSubmissionValue('addressHomePreferred');
                        this.editableIndividualBillingAddress ? this.editableIndividualBillingAddress.IndividualAddressTypeId = 3: '';
                        const billingAddressLine1 = this.getSubmissionValue('billingAddressLine1');
                        if (billingAddressLine1) {
                            this.editableIndividualBillingAddress.AddressLine1 = billingAddressLine1;
                            this.editableIndividualBillingAddress.ContactSourceId = 29;
                        }
                        this.editableIndividualBillingAddress.AddressLine2 = this.getSubmissionValue('billingAddressLine2');
                        this.editableIndividualBillingAddress.City = this.getSubmissionValue('billingCity');
                        this.editableIndividualBillingAddress.StateTerritoryId = parseInt(this.getSubmissionValue('billingState')) || null;
                        this.editableIndividualBillingAddress.PostalCode = this.getSubmissionValue('billingZip');
                        this.editableIndividualBillingAddress.ContactStatusId = 4;
                        this.editableIndividualBillingAddress.IsPreferred = false;
                        this.editableIndividualBillingAddress.CanSendMailRestrictionId = 1;
                        this.editableIndividualBillingAddress.IsPreferred = !!this.getSubmissionValue('addressBillingPreferred');

                        const phoneHome = this.getSubmissionValue('phoneHome');
                        if (phoneHome) {
                            let individualPhone1 = this.getIndividualPhoneByType(1);
                            if (individualPhone1) {
                                this.editableIndividualPhone1 = clone(individualPhone1);
                            }
                            this.editableIndividualPhone1.IndividualPhoneTypeId = 1;
                            this.editableIndividualPhone1.ContactSourceId = 29;
                            this.editableIndividualPhone1.ContactStatusId = 4;
                            this.editableIndividualPhone1.CanContactRestrictionId = 1;
                            this.editableIndividualPhone1.IsPreferred = false;
                            this.editableIndividualPhone1.CountryId = parseInt(this.getSubmissionValue('phoneHomeCountry')) || 4;
                            this.editableIndividualPhone1.PhoneNumber = phoneHome;
                            this.editableIndividualPhone1.Extension = this.getSubmissionValue('phoneHomeExt');
                            this.editableIndividualPhone1.IsPreferred = !!this.getSubmissionValue('phoneHomePreferred');
                            this.editableIndividualPhone1.isTextAllowed = false;
                            this.editableIndividualPhone1.isDoNotCall = false;
                        }

                        const phoneMobile = this.getSubmissionValue('phoneMobile');
                        if (phoneMobile) {
                            const individualPhone2 = this.getIndividualPhoneByType(2);
                            if (individualPhone2) {
                                this.editableIndividualPhone2 = clone(individualPhone2);
                            }
                            this.editableIndividualPhone2.IndividualPhoneTypeId = 3;
                            this.editableIndividualPhone2.ContactSourceId = 29;
                            this.editableIndividualPhone2.ContactStatusId = 4;
                            this.editableIndividualPhone2.CanContactRestrictionId = 1;
                            // this.editableIndividualPhone2.IsPreferred = false;
                            this.editableIndividualPhone2.CountryId = parseInt(this.getSubmissionValue('phoneMobileCountry')) || 4;
                            this.editableIndividualPhone2.PhoneNumber = phoneMobile;
                            this.editableIndividualPhone2.Extension = this.getSubmissionValue('phoneMobileExt');
                            this.editableIndividualPhone2.IsPreferred = !!this.getSubmissionValue('phoneMobilePreferred');
                            this.editableIndividualPhone2.isTextAllowed = !!this.getSubmissionValue('agree');
                        }

                        const phoneWork = this.getSubmissionValue('phoneWork');
                        if (phoneWork) {
                            const individualPhone3 = this.getIndividualPhoneByType(3);
                            if (individualPhone3) {
                                this.editableIndividualPhone3 = clone(individualPhone3);
                            }
                            this.editableIndividualPhone3.IndividualPhoneTypeId = 2;
                            this.editableIndividualPhone3.ContactSourceId = 29;
                            this.editableIndividualPhone3.ContactStatusId = 4;
                            this.editableIndividualPhone3.CanContactRestrictionId = 1;
                            this.editableIndividualPhone3.CountryId = parseInt(this.getSubmissionValue('phoneWorkCountry')) || 4;
                            this.editableIndividualPhone3.PhoneNumber = phoneWork;
                            this.editableIndividualPhone3.Extension = this.getSubmissionValue('phoneWorkExt');
                            this.editableIndividualPhone3.IsPreferred = !!this.getSubmissionValue('phoneWorkPreferred');
                        }

                        const email = this.getSubmissionValue('email');
                        if (email) {
                            const individualEmail1 = this.getIndividualEmailByType(1);
                            if (individualEmail1) {
                                this.editableIndividualEmail1 = clone(individualEmail1);
                            }
                            this.editableIndividualEmail1.IndividualEmailTypeId = 1;
                            this.editableIndividualEmail1.ContactSourceId = 29;
                            this.editableIndividualEmail1.ContactStatusId = 4;
                            this.editableIndividualEmail1.CanContactRestrictionId = 1;
                            this.editableIndividualEmail1.IsPreferred = false;
                            this.editableIndividualEmail1.Email = email;
                            this.editableIndividualEmail1.IsPreferred = !!this.getSubmissionValue('emailPersonalPreferred');
                        }

                        const emailWork = this.getSubmissionValue('emailWork');
                        if (emailWork) {
                            const individualEmail2 = this.getIndividualEmailByType(2);
                            if (individualEmail2) {
                                this.editableIndividualEmail2 = clone(individualEmail2);
                            }
                            this.editableIndividualEmail2.IndividualEmailTypeId = 2;
                            this.editableIndividualEmail2.ContactSourceId = 29;
                            this.editableIndividualEmail2.ContactStatusId = 4;
                            this.editableIndividualEmail2.CanContactRestrictionId = 1;
                            this.editableIndividualEmail2.IsPreferred = false;
                            this.editableIndividualEmail2.Email = emailWork;
                            this.editableIndividualEmail2.IsPreferred = !!this.getSubmissionValue('emailWorkPreferred');
                        }

                        const paymentToken = JSON.parse(this.getSubmissionValue('Token'));
                        if (paymentToken) {
                            const paymentMethodId = paymentToken?.CardDetails ? 4 : 3;
                            this.editableIndividualAffiliate.PaymentMethodId = paymentMethodId;
                            this.editableIndividualCope.CopePaymentMethodId = paymentMethodId;
                        } else {
                            this.editableIndividualCope.CopePaymentMethodId = this.individualCope.CopePaymentMethodId || 1;

                            if (parseInt(this.templateId, 10) === 7) {
                                this.editableIndividualCope.CopePaymentMethodId = 2; //Cash if DataForm
                            }
                        }
                        if (!this.editableIndividualCope.CopeAmount) {
                            this.editableIndividualCope.CopePaymentMethodId = null;
                            this.editableIndividualCope.CopePaymentFrequencyId = null;
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },

            getSubmissionValue(key) {
                const data = this.submissionData.find((data) => data.data_name === key);
                return data ? data.data_value : null;
            },
            getIndividualEmployer(EmployerId) {
                return this.individualEmployers.find((data) => data.EmployerId === EmployerId);
            },
            getLocalDuesCategory(LocalDuesCategoryId) {
                return this.duesCategories.find((data) => data.LocalDuesCategoryId === LocalDuesCategoryId);
            },
            getIndividualEmailByType(typeId) {
                return this.individualEmails.find((data) => data.IndividualEmailTypeId === typeId);
            },
            getIndividualAddressByType(typeId, individualAddressesOrdered) {
                return individualAddressesOrdered
                    ? individualAddressesOrdered.find((data) => data.IndividualAddressTypeId === typeId) ?? {}
                    : {};
            },
            getIndividualAddressesByType(typeId, individualAddresses) {
                return individualAddresses
                    ? individualAddresses.filter((data) => data.IndividualAddressTypeId === typeId)
                    : [];
            },
            getIndividualPhoneByType(typeId) {
                return this.individualPhones.find((data) => data.IndividualPhoneTypeId === typeId);
            },
            getIndividualPhonesByType(typeId, individualPhones) {
                return individualPhones
                    ? individualPhones.filter((data) => data.IndividualPhoneTypeId === typeId)
                    : [];
            },
            getEmailTypeName(typeId) {
                const emailType = this.emailTypes.find((data) => data.IndividualEmailTypeId === typeId);
                return emailType ? emailType.IndividualEmailTypeName : '';
            },
            getIndividualEmailsByType(typeId, individualEmails) {
                return individualEmails
                    ? individualEmails.filter((data) => data.IndividualEmailTypeId === typeId)
                    : [];
            },
            getPhoneTypeName(typeId) {
                const phoneType = this.phoneTypes.find((data) => data.IndividualPhoneTypeId === typeId);
                return phoneType
                    ? phoneType.IndividualPhoneTypeName
                    : '';
            },
            onSavedIndividual(individual) {
                this.flipped = false;
                this.individual = individual;
            },

            updateBasicData() {
                this.basicMessage = "";
                let data = {
                    FirstName: this.editableIndividual.FirstName,
                    LastName: this.editableIndividual.LastName,
                    MiddleName: this.editableIndividual.MiddleName,
                    PreviousName: this.editableIndividual.PreviousName,
                    PreferredName: this.editableIndividual.PreferredName,
                    LocalDuesCategoryId: this.editableIndividual.selectedDuesCategory,
                    ChapterId: this.editableIndividual.selectedChapter,
                    PaymentMethodId: this.editableIndividual.selectedPaymentMethod,
                    PaymentFrequencyId: this.editableIndividual.selectedPaymentFrequency,
                    AffiliateId: this.selectedAffiliate,
                };

                axios.put('/api/v2/individual/' + this.individual.IndividualId, data).then((response) => {
                   // this.afterSave(this.editableIndividual);
                   this.basicMessage = "Successfully Updated Basic Information";
                   this.basicDisabled = true;
                   this.hideCancelBtn = true;
                }).finally();
            },

            updateDemographics() {
                this.demographicMessage = "";
                axios.put('/api/v2/individual/' + this.individual.IndividualId + '?include=individualAffiliates.Affiliate,Gender,MaritalStatus', {
                    MonthOfBirth: this.editableIndividual.MonthOfBirth,
                    DayOfBirth: this.editableIndividual.DayOfBirth,
                    YearOfBirth: this.editableIndividual.YearOfBirth,
                    GenderId: this.editableIndividual.GenderId,
                    MaritalStatusId: this.editableIndividual.MaritalStatusId,
                }).then((response) => {
                    //this.afterSave(response.data.data);
                    this.demographicMessage = "Successfully Updated Demographics";
                    this.demographicsDisabled = true;
                    this.hideCancelBtn = true;
                }).finally();
            },

            updateEmployer() {
                if (!this.$refs.employerForm.validate()) {
                    return;
                }
                this.employerMessage = "";
                this.editableIndividualEmployer.IndividualId = this.individual.IndividualId;
                this.editableIndividualEmployer.StartDate = this.editableIndividualEmployer.StartDate ? this.editableIndividualEmployer.StartDate : formatISO(new Date());
                this.editableIndividualEmployer.HireDate = this.editableIndividualEmployer.HireDate ? this.editableIndividualEmployer.HireDate : formatISO(new Date());
                this.editableIndividualEmployer.CurrentlyWorking = this.editableIndividualEmployer.CurrentlyWorking ? this.editableIndividualEmployer.CurrentlyWorking : true;
                this.editableIndividualEmployer.FullTimeEquivalent = this.editableIndividualEmployer.FullTimeEquivalent ? parseInt(this.editableIndividualEmployer.FullTimeEquivalent) : 0;
                this.editableIndividualEmployer.IsPreferred = this.editableIndividualEmployer.IsPreferred ? true : false;
                // if (this.individualEmployer && this.individualEmployer.IndividualEmployerId) {
                if (this.doesEmployerAndUnitExistForIndividual(this.editableIndividualEmployer.EmployerId, this.editableIndividualEmployer.UnitId)) {
                    axios.put('/api/v2/individualEmployer/' + this.individualEmployer.IndividualEmployerId + '?include=Employer,Subject,Unit,WorkLocation,WorkStructure,LocalJobClass,LocalJobClass.Unit,LocalJobClass.NationalJobClass,JobTitle', this.editableIndividualEmployer)
                    .then((response) => {
                        this.employerMessage = "Successfully Updated Employer";
                        this.employerDisabled = true;
                    });
                } else {
                    if (this.editableIndividualEmployer && this.editableIndividualEmployer.hasOwnProperty('IndividualEmployerId')) {
                        delete this.editableIndividualEmployer.IndividualEmployerId;
                    }
                    this.editableIndividualEmployer.IsPartTime = !!this.editableIndividualEmployer.IsPartTime;
                    this.editableIndividualEmployer.IsTenured = !!this.editableIndividualEmployer.IsTenured;
                    this.editableIndividualEmployer.CurrentlyWorking = true;
                    axios.post('/api/v2/individualEmployer' + '?include=Employer,Subject,Unit,WorkLocation,WorkStructure,LocalJobClass,LocalJobClass.Unit,LocalJobClass.NationalJobClass,JobTitle', this.editableIndividualEmployer).then((response) => {
                        this.employerMessage = "Successfully Created Employer";
                        this.employerDisabled = true;
                        this.hideCancelBtn = true;
                    });
                }
            },
            onAffiliateStartDate(value) {
                this.individualAffiliate.StartDate = value ? format(value, 'yyyy-MM-dd') : null;
            },
            onEditableAffiliateStartDate(value) {
                this.editableIndividualAffiliate.StartDate = value ? format(value, 'yyyy-MM-dd') : null;
            },
            onHireDate(value) {
                this.editableIndividualEmployer.HireDate = value ? format(value, 'yyyy-MM-dd') : null;
            },
            onEmployerStartDate(value) {
                this.editableIndividualEmployer.StartDate = value ? format(value, 'yyyy-MM-dd') : null;
            },
            onEmployerEndDate(value) {
                this.editableIndividualEmployer.EndDate = value ? format(value, 'yyyy-MM-dd') : null;
            },
            doesEmployerAndUnitExistForIndividual(EmployerId, UnitId) {
                if (!this.individualEmployers) {
                    return false;
                }
                const individualEmployer = this.individualEmployers.filter(ie => {
                    return (ie.EmployerId === EmployerId && ie.UnitId === UnitId);
                }).pop();
                return individualEmployer ? true : false;
            },
            getFormTemplateDetailsFromSubmission(submissionId) {
                let url = '/api/v3/memberforms/admin/submission/' + submissionId;
                return axios.get(url)
                    .then(response => {
                        const form = response.data.Form;
                        this.templateId = form.form_template_id;
                    });
            },
            updateUnionRelationship() {
                this.unionRelationshipMessage = "";
                this.editableIndividualAffiliate.IndividualId = this.individual.IndividualId;
                this.editableIndividualAffiliate.AffiliateId = this.selectedAffiliate;
                this.editableIndividualAffiliate.IndividualCope = this.editableIndividualCope;
                this.editableIndividualAffiliate.IndividualCope.IndividualCopeId = this.individualCope.IndividualCopeId;
                this.editableIndividualAffiliate.oldUnionRelationshipTypeId = this.oldUnionRelationshipTypeId;
                this.editableIndividualAffiliate.StartDate = this.editableIndividualAffiliate.StartDate ? this.editableIndividualAffiliate.StartDate : formatISO(new Date());
                this.editableIndividualAffiliate.EndDate = this.editableIndividualAffiliate.StartDate ? this.editableIndividualAffiliate.EndDate : formatISO(new Date());
                const IndividualAffiliateId = this.individualAffiliate.IndividualAffiliateId ? this.individualAffiliate.IndividualAffiliateId : 0;
                axios.put('/api/v2/custom/individualaffiliate/' + IndividualAffiliateId + '/mfpUpdate?include=Affiliate,UnionRelationshipType,LocalDuesCategory,IndividualDeactivationReason,PaymentMethod,PaymentFrequency&scope=global', this.editableIndividualAffiliate)
                        .then((response) => {
                            //this.afterSave(response)
                            this.unionRelationshipMessage = "Successfully Updated Union Relationship";
                            this.unionDisabled = true;
                            this.hideCancelBtn = true;
                        });
            },
            updateAddress(addressType) {
                if(addressType === 'billing'){
                    this.billingAddressMessage = "";
                    this.editableIndividualBillingAddress.IndividualId = this.individual.IndividualId;
                    this.editableIndividualBillingAddress.IsPreferred = !!this.editableIndividualBillingAddress.IsPreferred;
                    this.editableIndividualBillingAddress.CanVisitRestrictionId = (this.editableIndividualBillingAddress.DoNotVisit === true) ? 2 : 1;
                    /*
                    if (this.editableIndividualBillingAddress.IndividualAddressId) {
                        axios.put('/api/v2/IndividualAddress/' + this.editableIndividualBillingAddress.IndividualAddressId + '?include=ContactStatus,ContactSource,StateTerritory,CanSendMailRestriction', this.editableIndividualBillingAddress).then((response) => {
                            this.billingAddressMessage = "Successfully Created Billing Address";
                            this.billingAddressDisabled = true;
                            this.hideCancelBtn = true;
                        });
                    } else {
                        delete this.editableIndividualBillingAddress.IndividualAddressId;
                        axios.post('/api/v2/IndividualAddress?include=ContactStatus,ContactSource,StateTerritory,CanSendMailRestriction', this.editableIndividualBillingAddress).then((response) => {
                            this.billingAddressMessage = "Successfully Created Billing Address";
                            this.billingAddressDisabled = true;
                            this.hideCancelBtn = true;
                        });
                    }
                    */
                    delete this.editableIndividualBillingAddress.IndividualAddressId;
                    axios.post('/api/v2/IndividualAddress?include=ContactStatus,ContactSource,StateTerritory,CanSendMailRestriction', this.editableIndividualBillingAddress).then((response) => {
                        this.billingAddressMessage = "Successfully Created Billing Address";
                        this.billingAddressDisabled = true;
                        this.hideCancelBtn = true;
                    });

                } else {
                    this.addressMessage = "";
                    this.editableIndividualAddress.IndividualId = this.individual.IndividualId;
                    this.editableIndividualAddress.IsPreferred = !!this.editableIndividualAddress.IsPreferred;
                    this.editableIndividualAddress.CanVisitRestrictionId = (this.editableIndividualAddress.DoNotVisit === true) ? 2 : 1;
                    /*
                    if (this.editableIndividualAddress.IndividualAddressId) {
                        axios.put('/api/v2/IndividualAddress/' + this.editableIndividualAddress.IndividualAddressId + '?include=ContactStatus,ContactSource,StateTerritory,CanSendMailRestriction', this.editableIndividualAddress).then((response) => {
                            this.addressMessage = "Successfully Created Address";
                            this.addressDisabled = true;
                            this.hideCancelBtn = true;
                        });
                    } else {
                        delete this.editableIndividualAddress.IndividualAddressId;
                        axios.post('/api/v2/IndividualAddress?include=ContactStatus,ContactSource,StateTerritory,CanSendMailRestriction', this.editableIndividualAddress).then((response) => {
                            this.addressMessage = "Successfully Created Address";
                            this.addressDisabled = true;
                            this.hideCancelBtn = true;
                        });
                    }
                    */
                    delete this.editableIndividualAddress.IndividualAddressId;
                    axios.post('/api/v2/IndividualAddress?include=ContactStatus,ContactSource,StateTerritory,CanSendMailRestriction', this.editableIndividualAddress).then((response) => {
                        this.addressMessage = "Successfully Created Address";
                        this.addressDisabled = true;
                        this.hideCancelBtn = true;
                    });
                }
            },
            updateEmail1() {
                this.emailMessage = "";
                this.editableIndividualEmail1.IndividualId = this.individual.IndividualId;
                this.editableIndividualEmail1.IsPreferred = (typeof this.editableIndividualEmail1.IsPreferred === 'undefined' || this.editableIndividualEmail1.IsPreferred === null) ? false : this.editableIndividualEmail1.IsPreferred;
                // @TODO: change this after it is decided which way to go:
                /*
                if (this.editableIndividualEmail1.IndividualEmailId) {
                    axios.put('/api/v2/IndividualEmail/' + this.editableIndividualEmail1.IndividualEmailId + '?include=ContactStatus,ContactSource', this.editableIndividualEmail1).then((response) => {
                        //update success message
                    this.emailMessage = "Successfully Created Home Email";
                    this.emailDisabled = true;
                    this.hideCancelBtn = true;
                    });
                } else {
                    axios.post('/api/v2/IndividualEmail?include=ContactStatus,ContactSource,CanContactRestriction', this.editableIndividualEmail1).then((response) => {
                      //update success message
                    this.emailMessage = "Successfully Created Email";
                    this.emailDisabled = true;
                    this.hideCancelBtn = true;
                    });
                }
                */
                delete this.editableIndividualEmail1.IndividualEmailId;
                axios.post('/api/v2/IndividualEmail?include=ContactStatus,ContactSource,CanContactRestriction', this.editableIndividualEmail1).then((response) => {
                    //update success message
                    this.emailMessage = "Successfully Created Email";
                    this.emailDisabled = true;
                    this.hideCancelBtn = true;
                });
            },
            updateEmail2() {
                this.email2Message = "";
                this.editableIndividualEmail2.IndividualId = this.individual.IndividualId;
                this.editableIndividualEmail2.IsPreferred = (typeof this.editableIndividualEmail2.IsPreferred === 'undefined' || this.editableIndividualEmail2.IsPreferred === null) ? false : this.editableIndividualEmail2.IsPreferred;
                // @TODO: change this after it is decided which way to go:
                /*
                if (this.editableIndividualEmail2.IndividualEmailId) {
                    axios.put('/api/v2/IndividualEmail/' + this.editableIndividualEmail2.IndividualEmailId + '?include=ContactStatus,ContactSource', this.editableIndividualEmail2).then((response) => {
                        //update success message
                    this.email2Message = "Successfully Created Work Email";
                    this.email2Disabled = true;
                    this.hideCancelBtn = true;
                    });
                } else {
                    axios.post('/api/v2/IndividualEmail?include=ContactStatus,ContactSource,CanContactRestriction', this.editableIndividualEmail2).then((response) => {
                    //update success message
                    this.email2Message = "Successfully Created Email";
                    this.email2Disabled = true;
                    this.hideCancelBtn = true;
                    });
                }
                */
                delete this.editableIndividualEmail2.IndividualEmailId;
                axios.post('/api/v2/IndividualEmail?include=ContactStatus,ContactSource,CanContactRestriction', this.editableIndividualEmail2).then((response) => {
                    //update success message
                    this.email2Message = "Successfully Created Email";
                    this.email2Disabled = true;
                    this.hideCancelBtn = true;
                });
            },
            updatePhone1() {
                this.phoneMessage = "";
                this.editableIndividualPhone1.IndividualId = this.individual.IndividualId;
                this.editableIndividualPhone1.IsPreferred = (typeof this.editableIndividualPhone1.IsPreferred === 'undefined' || this.editableIndividualPhone1.IsPreferred === null) ? false : this.editableIndividualPhone1.IsPreferred;
                this.editableIndividualPhone1.CanTextRestrictionId = (this.editableIndividualPhone1.isTextAllowed === true) ? 1 : 2;
                this.editableIndividualPhone1.CanCallRestrictionId = (this.editableIndividualPhone1.isDoNotCall === true) ? 2 : 1;
                // @TODO: change this after it is decided which way to go:
                /*
                if (this.editableIndividualPhone1.IndividualPhoneId) {
                    axios.put('/api/v2/IndividualPhone/' + this.editableIndividualPhone1.IndividualPhoneId + '?include=ContactStatus,ContactSource', this.editableIndividualPhone1).then((response) => {
                        this.phoneMessage = "Successfully Created Home Phone";
                        this.phoneDisabled = true;
                        this.hideCancelBtn = true;
                    });
                } else {
                    axios.post('/api/v2/IndividualPhone?include=ContactStatus,ContactSource', this.editableIndividualPhone1).then((response) => {
                        this.phoneMessage = "Successfully Created Home Phone";
                        this.phoneDisabled = true;
                        this.hideCancelBtn = true;
                    });
                }
                */
                delete this.editableIndividualPhone1.IndividualPhoneId;
                axios.post('/api/v2/IndividualPhone?include=ContactStatus,ContactSource', this.editableIndividualPhone1).then((response) => {
                    this.phoneMessage = "Successfully Created Home Phone";
                    this.phoneDisabled = true;
                    this.hideCancelBtn = true;
                });
            },
            updatePhone2() {
                this.phone2Message = "";
                this.editableIndividualPhone2.IndividualId = this.individual.IndividualId;
                this.editableIndividualPhone2.IsPreferred = (typeof this.editableIndividualPhone2.IsPreferred === 'undefined' || this.editableIndividualPhone2.IsPreferred === null) ? false : this.editableIndividualPhone2.IsPreferred;
                this.editableIndividualPhone2.CanTextRestrictionId = (this.editableIndividualPhone2.isTextAllowed === true) ? 1 : 2;
                this.editableIndividualPhone2.CanCallRestrictionId = (this.editableIndividualPhone2.isDoNotCall === true) ? 2 : 1;
                // @TODO: change this after it is decided which way to go:
                /*
                if (this.editableIndividualPhone2.IndividualPhoneId) {
                    axios.put('/api/v2/IndividualPhone/' + this.editableIndividualPhone2.IndividualPhoneId + '?include=ContactStatus,ContactSource', this.editableIndividualPhone2).then((response) => {
                        this.phone2Message = "Successfully Created Mobile Phone";
                        this.phone2Disabled = true;
                        this.hideCancelBtn = true;
                    });
                } else {
                    axios.post('/api/v2/IndividualPhone?include=ContactStatus,ContactSource', this.editableIndividualPhone2).then((response) => {
                        this.phone2Message = "Successfully Created Mobile Phone";
                        this.phone2Disabled = true;
                        this.hideCancelBtn = true;
                    });
                }
                */
                delete this.editableIndividualPhone2.IndividualPhoneId;
                axios.post('/api/v2/IndividualPhone?include=ContactStatus,ContactSource', this.editableIndividualPhone2).then((response) => {
                    this.phone2Message = "Successfully Created Mobile Phone";
                    this.phone2Disabled = true;
                    this.hideCancelBtn = true;
                });
            },
            updatePhone3() {
                this.phone3Message = "";
                this.editableIndividualPhone3.IndividualId = this.individual.IndividualId;
                this.editableIndividualPhone3.IsPreferred = (typeof this.editableIndividualPhone3.IsPreferred === 'undefined' || this.editableIndividualPhone3.IsPreferred === null) ? false : this.editableIndividualPhone3.IsPreferred;
                this.editableIndividualPhone3.CanTextRestrictionId = (this.editableIndividualPhone3.isTextAllowed === true) ? 1 : 2;
                this.editableIndividualPhone3.CanCallRestrictionId = (this.editableIndividualPhone3.isDoNotCall === true) ? 2 : 1;
                // @TODO: change this after it is decided which way to go:
                /*
                if (this.editableIndividualPhone3.IndividualPhoneId) {
                    axios.put('/api/v2/IndividualPhone/' + this.editableIndividualPhone3.IndividualPhoneId + '?include=ContactStatus,ContactSource', this.editableIndividualPhone3).then((response) => {
                        this.phone3Message = "Successfully Created Work Phone";
                        this.phone3Disabled = true;
                        this.hideCancelBtn = true;
                    });
                } else {
                    axios.post('/api/v2/IndividualPhone?include=ContactStatus,ContactSource', this.editableIndividualPhone3).then((response) => {
                        this.phone3Message = "Successfully Created Work Phone";
                        this.phone3Disabled = true;
                        this.hideCancelBtn = true;
                    });
                }
                */
                delete this.editableIndividualPhone3.IndividualPhoneId;
                axios.post('/api/v2/IndividualPhone?include=ContactStatus,ContactSource', this.editableIndividualPhone3).then((response) => {
                    this.phone3Message = "Successfully Created Work Phone";
                    this.phone3Disabled = true;
                    this.hideCancelBtn = true;
                });
            },
            cancelAction(){
                 this.$router.push({ name: 'Individuals' });
                 this.dialog = false;
            },
            openConfirmAction() {
                this.dialog = true;
            },
            saveAction(){
                // If Submission is eligible for eDues
                if (this.isEduesEligible) {
                    try {
                        this.individualEDuesEnrollment(this.submissionId, this.selectedAffiliate, this.individual);
                        //this.$router.push({ name: 'IndividualDetails', params: { id: this.individual.IndividualId } });
                    } catch {
                    }
                }

                axios.get('/api/v3/memberforms/update-existing-individual/'+this.submissionId+'/'+this.individual.IndividualId+'/3').then((response) => {
                    this.$router.push({ name: 'IndividualDetails', params: { id: this.individual.IndividualId } });
                });
                this.dialog = false;
            },
            isSubmissionEDuesEligible(submissionId) {
                let url = '/api/v3/memberforms/admin/is-edues-eligible/' + submissionId;
                return axios.get(url)
                    .then(response => {
                        this.isEduesEligible = response.data.isSubmissionEligibleForEDues;
                    })
                    .finally(() => {
                    });
            },
            individualEDuesEnrollment(submissionId, affiliateId, individual) {
                let url = '/api/v3/memberforms/admin/edues-enrollment';
                return axios.post(url,{
                    IndividualId: individual.IndividualId,
                    AffiliateId: affiliateId,
                    SubmissionId: submissionId,
                    Source: 'Membership Forms Portal',
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .finally(() => {
                        this.loading = false;
                        this.searched = true;
                    });
            },
            setupStaticData() {
                for (let i = 1; i <= 31; i++) {
                    this.dates.push({
                        label: i.toString(),
                        value: i
                    });
                }
                for (let i = 1; i <= 20; i++) {
                    this.dependents.push({
                        label: i.toString(),
                        value: i
                    });
                }
                this.dates = [...this.dates];
                this.dependents = [...this.dependents];
                for (let i = 1900; i <= new Date().getFullYear(); i++) {
                    this.years.push({
                        label: i.toString(),
                        value: i
                    });
                }
                this.years = [...this.years];
            },
            fieldVisible(fieldName) {

                if (!this.individualAffiliate.UnionRelationshipTypeId || this.unionRelationships.length === 0) {
                    return false;
                }
                let unionRelationship = this.unionRelationships.filter(unionRelationship => {
                    return unionRelationship.UnionRelationshipTypeId === this.individualAffiliate.UnionRelationshipTypeId;
                }).pop();

                if (!unionRelationship) {
                    unionRelationship = this.individualAffiliate.UnionRelationshipType;
                }

                if (!unionRelationship) {
                    return false;
                }
                switch (fieldName) {
                    case 'Dues category':
                        return unionRelationship.UnionRelationshipTypeName === 'Member' || unionRelationship.UnionRelationshipTypeName === 'Agency Fee Payer' || unionRelationship.UnionRelationshipTypeName === 'Retired Member' || this.isJoiningUnion();
                    case 'Cope':
                        return unionRelationship.UnionRelationshipTypeName === 'Member';
                    case 'Stop Reason':
                        return unionRelationship.UnionRelationshipTypeName === 'Potential Member';
                }

                return false;
            },

            getSelectedUnionRelationshipLabel() {
                if (this.editableIndividualAffiliate.UnionRelationshipType) {
                    return this.editableIndividualAffiliate.UnionRelationshipType.UnionRelationshipTypeName;
                }
                const index = this.unionRelationships.findIndex((unionRelationship) => {
                    return unionRelationship.UnionRelationshipTypeId === this.selectedUnionRelationshipTypeId;
                });

                return (index >= 0) ? this.unionRelationships[index].UnionRelationshipTypeName : '';
            },


            isJoiningUnion() {
                if (!this.individualAffiliate.IndividualDeactivationReasonId) {
                    return false;
                }

                const stopReason = this.stopReasons.find((stopReason) => {return stopReason.IndividualDeactivationReasonId === this.individualAffiliate.IndividualDeactivationReasonId});

                return stopReason ? stopReason.IndividualDeactivationReasonName.toLowerCase() === 'joined union' : false;
            },

            setupFormData() {
                this.selectedAffiliateName = this.$store.getters['user/selectedAffiliate'].AffiliateName;
                this.loadLocalDuesCategories();
            },

            loadLocalDuesCategories() {
                if (this.editableIndividualAffiliate.UnionRelationshipTypeId) {
                    axios.get('/api/v2/custom/localduescategory/byunionrelationshiptypewithfrequency/' + this.editableIndividualAffiliate.UnionRelationshipTypeId).then((response) => {
                        this.duesCategories = response.data.data;
                    });
                }
            },

            loadOptions(employerId) {
                axios.get('/api/v2/aggregate/employer/units/' + employerId).then((response) => {
                    this.units = response.data.data;
                });
            },

            setPropertyValue(propertyName, value) {
                this.editableIndividualEmployer[propertyName] = value;
            },

            setWorkStructureId(value) {
                this.editableIndividualEmployer['WorkStructureId'] = value;
                this.WorkStructureId  = value;
            },

            setWorkLocationId(value) {
                this.editableIndividualEmployer['WorkLocationId'] = value;
                this.WorkLocationId  = value;
            }

        },
        // watch: {
        //     $route(to, from) {
        //         this.id = to.params.id;
        //         //this.getDataFromApi();
        //     }
        // }
    }
</script>

<style>
    .compare-container {
        max-width: 1200px;
    }
    .empty-btn {
        height: 60px;
    }
    .unionRelationships {
        height: 560px;
    }
    .employer {
        height: 746px;
    }
    .address {
        min-height: 114%;
    }
    .email {
        height: 474px;
    }
    .phone {
        height: 572px;
    }
    .btns-row {
        position: relative;
    }
    .btns-row .success-message {
        position: absolute;
        top: -16px;
        right: 16px;
    }
    .success-message {
        color: #092a5c;
        font-weight: bold;
        height: 21px;
    }
    .contact-message {
        color: #F44336;
        font-weight: bold;
        height: 21px;
    }
    .pop-btn:hover:before,
    .pop-btn:focus:before {
        height: 36px;
    }
    .v-overlay__scrim {
        background-color: #fcfcff!important;
    }
</style>
