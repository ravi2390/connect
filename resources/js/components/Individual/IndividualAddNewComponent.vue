<template>
    <v-overlay
        opacity=".5"
        :model-value="overlay"
        class="align-center justify-center"
        scrim="#FFF"
    >
        <v-progress-circular indeterminate :size="70" color="primary"></v-progress-circular>
    </v-overlay>
    <v-form ref="form" v-model="valid" validate-on="submit" @submit.prevent="saveData">
        <v-container>
            <v-row>
                <v-col class="d-flex flex-column ga-4">
                    <v-alert
                        v-show="valid === false"
                        density="compact"
                        type="error"
                        class="mb-2"
                    >
                        Please fill in all required fields
                    </v-alert>
                    <individual-edit-basic-data-component v-bind:individual="individual" :edit-mode="false" :switchAffiliate="switchAffiliate"></individual-edit-basic-data-component>
                    <edit-demographics-data-component :individual="individual" :edit-mode="false" :read-only="false"></edit-demographics-data-component>
                    <edit-employer-data-component :edit-mode="false" :show-save-button="false" :individual="individual" :read-only="false" v-bind:individual-employer="individualEmployer" :selectedEmployer="selectedEmployerId" :selectedUnit="selectedUnitId" :WorkLocation="WorkLocationId" :WorkStructure="WorkStructureId"></edit-employer-data-component>
                    <individual-address-component :edit-mode="false" :show-save-button="false" :individual="individual" :read-only="false" :individual-address="individualAddress" :reset-section="true"></individual-address-component>
                    <template  v-if="isEduesEligible">
                        <v-icon
                            class="closeIcon"
                            @click="removeExtraFields('billingAddress')"
                            icon="mdi:mdi-close"
                        />
                        <individual-billing-address-component :edit-mode="false" :show-save-button="false" :individual="individual" :read-only="false" :individual-billing-address="individualBillingAddress" :reset-section="true"></individual-billing-address-component>
                    </template>
                    <individual-email-component :edit-mode="false" :show-save-button="false" :individual="individual" :read-only="false" :individual-email="individualEmail"></individual-email-component>
                    <template v-if="individualEmailWork && individualEmailWork.Email !== undefined">
                        <v-icon
                            class="closeIcon"
                            @click="removeExtraFields('emailWork')"
                            icon="mdi:mdi-close"

                        />
                        <individual-email-work-component :edit-mode="false" :show-save-button="false" :individual="individual" :read-only="false" :individual-email-work="individualEmailWork"></individual-email-work-component>
                    </template>
                    <add-individual-phone-component :edit-mode="false" :show-save-button="false" :individual="individual" :read-only="false" :individual-phone="individualPhone"></add-individual-phone-component>
                    <template v-if="individualPhoneMobile && individualPhoneMobile.PhoneNumber !== undefined">
                        <v-icon
                            class="closeIcon"
                            @click="removeExtraFields('phoneMobile')"
                            icon="mdi:mdi-close"
                        />
                        <add-individual-phone-mobile-component :edit-mode="false" :show-save-button="false" :individual="individual" :read-only="false" :individual-phone-mobile="individualPhoneMobile"></add-individual-phone-mobile-component>
                    </template>
                    <template v-if="individualPhoneWork && individualPhoneWork.PhoneNumber !== undefined">

                        <v-icon
                            class="closeIcon"
                            @click="removeExtraFields('phoneWork')"
                            icon="mdi:mdi-close"
                        ></v-icon>
                        <add-individual-phone-work-component :edit-mode="false" :show-save-button="false" :individual="individual" :read-only="false" :individual-phone-work="individualPhoneWork"></add-individual-phone-work-component>
                    </template>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex justify-end ga-2">
                    <v-btn class="cancel-btn" color="darken-1" :to="{ name: 'IndividualAdd' }">Cancel</v-btn>
                    <v-btn color="success" href="" type="submit" :disabled="isButtonDisabled">Save</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import { format, formatISO, subDays } from 'date-fns';
    import AddIndividualAddressComponent from "./Partial/Contact/AddIndividualAddressComponent";
import AddIndividualBillingAddressComponent from "./Partial/Contact/AddIndividualBillingAddressComponent";
import IndividualEmailComponent from "./Partial/Contact/AddIndividualEmailComponent";
import IndividualEmailWorkComponent from "./Partial/Contact/AddIndividualEmailWorkComponent";
import AddIndividualPhoneComponent from "./Partial/Contact/AddIndividualPhoneComponent";
import AddIndividualPhoneMobileComponent from "./Partial/Contact/AddIndividualPhoneMobileComponent";
import AddIndividualPhoneWorkComponent from "./Partial/Contact/AddIndividualPhoneWorkComponent";
import BasicDataComponent from "./Partial/Edit/BasicDataComponent";
import EditDemographicsDataComponent from "./Partial/Edit/EditDemographicsDataComponent";
import EditEmployerDataComponent from "./Partial/Edit/EditEmployerDataComponent";

    export default {
        name: "IndividualAddNewComponent",
        components: {
            EditEmployerDataComponent,
            'individual-address-component': AddIndividualAddressComponent,
            'individual-billing-address-component': AddIndividualBillingAddressComponent,
            'individual-email-component': IndividualEmailComponent,
            'individual-email-work-component': IndividualEmailWorkComponent,
            'add-individual-phone-component': AddIndividualPhoneComponent,
            'add-individual-phone-mobile-component': AddIndividualPhoneMobileComponent,
            'add-individual-phone-work-component': AddIndividualPhoneWorkComponent,
            'individual-edit-basic-data-component': BasicDataComponent,
            'edit-demographics-data-component': EditDemographicsDataComponent
        },

        data() {
            return {
                individual: {},
                individualEmployer: {},
                individualAddress: {},
                individualBillingAddress: {},
                individualEmail: {},
                individualEmailWork: {},
                individualPhone: {},
                individualPhoneMobile: {},
                individualPhoneWork: {},
                flipped: false,
                loading: true,
                valid: true,
                submissionData:null,
                switchAffiliate:{},
                selectedEmployerId:null,
                selectedUnitId:null,
                WorkLocationId:null,
                WorkStructureId:null,
                isEduesEligible: false,
                isButtonDisabled: false,
                overlay: true,
            }
        },

        computed: {
            selectedAffiliate() {
                return this.$store.getters['user/selectedAffiliate'].AffiliateId;
            }
        },

        mounted() {
            this.loading = false;
            if (this.$route.params.firstName) {
                this.individual.FirstName = this.$route.params.firstName;
            }
            if (this.$route.params.preferredName) {
                this.individual.PreferredName = this.$route.params.preferredName;
            }
            if (this.$route.params.middleName) {
                this.individual.MiddleName = this.$route.params.middleName;
            }
            if (this.$route.params.lastName) {
                this.individual.LastName = this.$route.params.lastName;
            }
            if(this.$route.query.submissionId){
                this.isSubmissionEDuesEligible(this.$route.query.submissionId);
                this.getSubmissionDataFromApi(this.$route.query.submissionId);
            } else {
                this.overlay = false;
            }
        },

        methods: {
            removeExtraFields(type) {
                if(type ==='phoneMobile'){
                    this.individualPhoneMobile = {};
                }

                if(type ==='phoneWork'){
                    this.individualPhoneWork = {};
                }

                if(type ==='emailWork'){
                    this.individualEmailWork = {};
                }

                if(type ==='billingAddress'){
                    this.individualBillingAddress = {};
                }

            },

            afterSave(individual) {
                this.$refs.form.reset();
                this.$router.push({
                    name: 'IndividualDetails',
                    params: {
                        id: individual.IndividualId
                    }
                });
            },
            async saveData(event) {
                this.loading = true;
                const results = await event;
                this.loading = false;
                if (!results.valid) {
                    this.isButtonDisabled = false;
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    return;
                }
                this.isButtonDisabled = true;
                this.individualEmployer.IsTenured = !!this.individualEmployer.IsTenured;
                this.individualEmployer.IsPartTime = !!this.individualEmployer.IsPartTime;
                this.individualEmployer.CurrentlyWorking = true;
                this.individualEmployer.StartDate = this.individualEmployer.StartDate ? this.individualEmployer.StartDate : formatISO(new Date());
                this.individualEmployer.HireDate = this.individualEmployer.HireDate ? this.individualEmployer.HireDate : null;
                this.individualAddress.IndividualId = this.individual.IndividualId;
                this.individualAddress.IsPreferred = !!this.individualAddress.IsPreferred;
                this.individualAddress.CanVisitRestrictionId = (this.individualAddress.CanVisitRestriction === false) ? 2 : 1;
                this.individualEmail.IndividualId = this.individual.IndividualId;
                this.individualEmail.IsPreferred = (typeof this.individualEmail.IsPreferred === 'undefined' || this.individualEmail.IsPreferred === null) ? false : !!this.individualEmail.IsPreferred;
                this.individualPhone.IndividualId = this.individual.IndividualId;
                this.individualPhone.IsPreferred = (typeof this.individualPhone.IsPreferred === 'undefined' || this.individualPhone.IsPreferred === null) ? false : !!this.individualPhone.IsPreferred;
                this.individualPhone.CanTextRestrictionId = (this.individualPhone.isTextAllowed === true) ? 1 : 2;
                this.individualPhone.CanCallRestrictionId = (typeof this.individualPhone.isDoNotCall != 'undefined' && this.individualPhone.isDoNotCall === true) ? 2 : 1;
                if(this.individualBillingAddress && this.individualBillingAddress.AddressLine1) {
                    this.individualBillingAddress.IsPreferred = !!this.individualBillingAddress.IsPreferred;
                    this.individualBillingAddress.CanVisitRestrictionId = (this.individualBillingAddress.CanVisitRestriction === false) ? 2 : 1;
                }
                if(this.individualEmailWork && this.individualEmailWork.Email) {
                    this.individualEmailWork.IsPreferred = (typeof this.individualEmailWork.IsPreferred === 'undefined' || this.individualEmailWork.IsPreferred === null) ? false : !!this.individualEmailWork.IsPreferred;
                }
                if(this.individualPhoneMobile && this.individualPhoneMobile.PhoneNumber){
                    this.individualPhoneMobile.IsPreferred = (typeof this.individualPhoneMobile.IsPreferred === 'undefined' || this.individualPhoneMobile.IsPreferred === null) ? false : !!this.individualPhoneMobile.IsPreferred;
                    this.individualPhoneMobile.CanTextRestrictionId = (this.individualPhoneMobile.isTextAllowed === true) ? 1 : 2;
                    this.individualPhoneMobile.CanCallRestrictionId = (typeof this.individualPhoneMobile.isDoNotCall != 'undefined' && this.individualPhoneMobile.isDoNotCall === true) ? 2 : 1;
                }
                if(this.individualPhoneWork && this.individualPhoneWork.PhoneNumber){
                    this.individualPhoneWork.IsPreferred = (typeof this.individualPhoneWork.IsPreferred === 'undefined' || this.individualPhoneWork.IsPreferred === null) ? false : !!this.individualPhoneWork.IsPreferred;
                    this.individualPhoneWork.CanTextRestrictionId = (this.individualPhoneWork.isTextAllowed === true) ? 1 : 2;
                    this.individualPhoneWork.CanCallRestrictionId = (typeof this.individualPhoneWork.isDoNotCall != 'undefined' && this.individualPhoneWork.isDoNotCall === true) ? 2 : 1;
                }
                if (this.WorkLocationId) {
                    this.individualEmployer.WorkLocationId = this.WorkLocationId;
                }
                if (this.WorkStructureId) {
                    this.individualEmployer.WorkStructureId = this.WorkStructureId;
                }
                axios.post('/api/v2/individual', {
                    FirstName: this.individual.FirstName,
                    LastName: this.individual.LastName,
                    MiddleName: this.individual.MiddleName,
                    PreviousName: this.individual.PreviousName,
                    PreferredName: this.individual.PreferredName,
                    AffiliateId: this.selectedAffiliate,
                    UnionRelationshipTypeId: this.individual.selectedUnionRelationshipTypeId,
                    IsCurrent: true,
                    IsPoliticallyActive: false,
                    IsRegisteredVoter: false,
                    LocalDuesCategoryId: this.individual.selectedDuesCategory,
                    ChapterId: this.individual.selectedChapter,
                    StartDate: this.individual.startDate ? this.individual.startDate : formatISO(new Date()),
                    PaymentMethodId: this.individual.PaymentMethodId,
                    PaymentFrequencyId: this.individual.PaymentFrequencyId,
                    MonthOfBirth: this.individual.MonthOfBirth,
                    DayOfBirth: this.individual.DayOfBirth,
                    YearOfBirth: this.individual.YearOfBirth,
                    GenderId: this.individual.GenderId,
                    MaritalStatusId: this.individual.MaritalStatusId,
                    LocalEducationLevelId: this.individual.LocalEducationLevelId,
                    Dependents: this.individual.Dependents,
                    IndividualEmployer: this.individualEmployer,
                    IndividualAddress: this.individualAddress,
                    IndividualBillingAddress: this.individualBillingAddress,
                    IndividualEmail: this.individualEmail,
                    IndividualWorkEmail: this.individualEmailWork,
                    IndividualPhone: this.individualPhone,
                    IndividualMobilePhone: this.individualPhoneMobile,
                    IndividualWorkPhone: this.individualPhoneWork,
                    PrefixId: this.individual.PrefixId,
                    SuffixId: this.individual.SuffixId,
                    IndividualCope: {
                        CopePaymentMethodId: this.individual.selectedPaymentMethod,
                        CopePaymentFrequencyId: this.individual.selectedPaymentFrequency,
                        CopeAmount: this.individual.copeAmount
                    }
                }).then((response) => {

                    this.updateIndividualIdApi(this.$route.query.submissionId,response.data.data);

                    // Check if paymentProcessing template and execute BH workflow if token available
                    if (this.isEduesEligible) {
                        try {
                            this.individualEDuesEnrollment(this.$route.query.submissionId, this.selectedAffiliate, response.data.data);
                        } catch {
                        }
                    }

                    this.afterSave(response.data.data);

                }).finally();
            },

            getSubmissionDataFromApi(id) {
                // this.loading = true;
                let url = '/api/v3/memberforms/admin/submission/' + id;
                return axios.get(url)
                    .then(response => {
                        this.submissionData = response.data.FormSubmissionData;
                        const work_location_fields = response.data.Form ? response.data.Form.work_location_fields : null;
                        const submissionDate = response.data.CreatedAt;
                        const templateId = response.data.Form.form_template_id;
                        this.individual.FirstName = this.getSubmissionValue('firstName');
                        this.individual.LastName = this.getSubmissionValue('lastName');
                        this.individual.MiddleName = this.getSubmissionValue('middleName');
                        this.individual.PreferredName = this.getSubmissionValue('preferredName');
                        const dateOfBirth = this.getSubmissionValue('dateOfBirth');
                        if (dateOfBirth) {
                            const [y, m, d] = dateOfBirth.split("-").map((part) => parseInt(part));
                            this.individual.YearOfBirth = y;
                            this.individual.MonthOfBirth = m;
                            this.individual.DayOfBirth = d;
                        }
                        const localDuesCategory = this.getSubmissionValue('LocalDuesCategory');
                        if (localDuesCategory) {
                            this.individual.selectedDuesCategory = parseInt(localDuesCategory);
                            this.individual.PaymentMethodId = 1;
                        }
                        this.individual.selectedChapter = parseInt(this.getSubmissionValue('chapter')) || null;
                        if (submissionDate) {
                            this.individual.startDate =  format(subDays(submissionDate, 1), 'yyyy-MM-dd');
                        }
                        if (work_location_fields && work_location_fields.chapterId) {
                            this.individual.selectedChapter = work_location_fields.chapterId;
                        }
                        const copeAmount = this.getSubmissionValue('copeAmount');
                        if (copeAmount) {
                            this.individual.copeAmount = copeAmount.replace('$','');
                            this.individual.selectedPaymentMethod = 1;
                        }
                        this.individual.selectedUnionRelationshipTypeId = 2;
                        this.individualAddress.IndividualAddressTypeId = 1;
                        this.individualAddress.ContactSourceId = 29;
                        this.individualAddress.ContactStatusId = 4;
                        this.individualAddress.CanSendMailRestrictionId = 1;
                        this.individualAddress.IsPreferred = false;
                        this.individualAddress.AddressLine1 = this.getSubmissionValue('addressLine1');
                        this.individualAddress.AddressLine2 = this.getSubmissionValue('addressLine2');
                        this.individualAddress.IsPreferred = !!this.getSubmissionValue('addressHomePreferred');
                        this.individualAddress.City = this.getSubmissionValue('city');
                        this.individualAddress.StateTerritoryId = parseInt(this.getSubmissionValue('state')) || null;
                        this.individualAddress.PostalCode = this.getSubmissionValue('zip');
                        const billingAddressLine1 = this.getSubmissionValue('billingAddressLine1');
                        if (billingAddressLine1) {
                            this.individualBillingAddress.AddressLine1 = billingAddressLine1;
                            this.individualBillingAddress.IndividualAddressTypeId = 3;
                            this.individualBillingAddress.ContactSourceId = 29;
                            this.individualBillingAddress.ContactStatusId = 4;
                            this.individualBillingAddress.CanSendMailRestrictionId = 1;
                        }
                        this.individualBillingAddress.AddressLine2 = this.getSubmissionValue('billingAddressLine2');
                        this.individualBillingAddress.IsPreferred = !!this.getSubmissionValue('addressBillingPreferred');
                        this.individualBillingAddress.City = this.getSubmissionValue('billingCity');
                        this.individualBillingAddress.StateTerritoryId = parseInt(this.getSubmissionValue('billingState')) || null;
                        this.individualBillingAddress.PostalCode = this.getSubmissionValue('billingZip');

                        const phoneHome = this.getSubmissionValue('phoneHome');
                        if (phoneHome) {
                            this.individualPhone.PhoneNumber = phoneHome;
                            this.individualPhone.Extension = this.getSubmissionValue('phoneHomeExt');
                            this.individualPhone.IndividualPhoneTypeId = 1;
                            this.individualPhone.ContactSourceId = 29;
                            this.individualPhone.ContactStatusId = 4;
                            this.individualPhone.IsPreferred = !!this.getSubmissionValue('phoneHomePreferred');
                            this.individualPhone.CountryId = parseInt(this.getSubmissionValue('phoneHomeCountry')) || 4;
                        }
                        const phoneMobile = this.getSubmissionValue('phoneMobile');
                        if (phoneMobile) {
                            this.individualPhoneMobile.PhoneNumber = phoneMobile;
                            this.individualPhoneMobile.Extension = this.getSubmissionValue('phoneMobileExt');
                            this.individualPhoneMobile.IndividualPhoneTypeId = 3;
                            this.individualPhoneMobile.ContactSourceId = 29;
                            this.individualPhoneMobile.ContactStatusId = 4;
                            this.individualPhoneMobile.IsPreferred = !!this.getSubmissionValue('phoneMobilePreferred');
                            this.individualPhoneMobile.isTextAllowed = !!this.getSubmissionValue('agree');
                            this.individualPhoneMobile.CountryId = parseInt(this.getSubmissionValue('phoneMobileCountry')) || 4;
                        }
                        const phoneWork = this.getSubmissionValue('phoneWork');
                        if (phoneWork) {
                            this.individualPhoneWork.PhoneNumber = phoneWork;
                            this.individualPhoneWork.Extension = this.getSubmissionValue('phoneWorkExt');
                            this.individualPhoneWork.IndividualPhoneTypeId = 2;
                            this.individualPhoneWork.ContactSourceId = 29;
                            this.individualPhoneWork.ContactStatusId = 4;
                            this.individualPhoneWork.IsPreferred = !!this.getSubmissionValue('phoneWorkPreferred');
                            this.individualPhoneWork.CountryId = parseInt(this.getSubmissionValue('phoneWorkCountry')) || 4;
                        }
                        const email = this.getSubmissionValue('email');
                        if (email) {
                            this.individualEmail.IndividualEmailTypeId = 1;
                            this.individualEmail.ContactSourceId = 29;
                            this.individualEmail.ContactStatusId = 4;
                            this.individualEmail.CanContactRestrictionId = 1;
                            this.individualEmail.Email = email;
                            this.individualEmail.IsPreferred = !!this.getSubmissionValue('emailPersonalPreferred');
                        }

                        const emailWork = this.getSubmissionValue('emailWork');
                        if (emailWork) {
                            this.individualEmailWork.IndividualEmailTypeId = 2;
                            this.individualEmailWork.ContactSourceId = 29;
                            this.individualEmailWork.ContactStatusId = 4;
                            this.individualEmailWork.CanContactRestrictionId = 1;
                            this.individualEmailWork.Email = emailWork;
                            this.individualEmailWork.IsPreferred = !!this.getSubmissionValue('emailWorkPreferred');
                        }

                        this.switchAffiliate = response.data.Form.affiliate;
                        this.selectedEmployerId = parseInt(this.getSubmissionValue('employer')) || null;
                        this.selectedUnitId = parseInt(this.getSubmissionValue('unit')) || null;
                        this.WorkLocationId = parseInt(this.getSubmissionValue('workLocation')) || null;
                        this.WorkStructureId = parseInt(this.getSubmissionValue('workStructure')) || null;
                        this.individualEmployer.LocalJobClassId = parseInt(this.getSubmissionValue('localJobClass')) || null;
                        this.individualEmployer.JobTitleId = parseInt(this.getSubmissionValue('jobTitle')) || null;
                        this.individualEmployer.EmployeeId = this.getSubmissionValue('employeeID') || null;
                        this.individualEmployer.HireDate = this.getSubmissionValue('employerHireDate') || null;
                        this.individualEmployer.StartDate = this.getSubmissionValue('employerStartDate') || this.individual.startDate;
                        const paymentToken = JSON.parse(this.getSubmissionValue('Token'));
                        if (paymentToken) {
                            this.individual.PaymentMethodId = paymentToken.CardDetails ? 4 : 3;
                            this.individual.selectedPaymentMethod = paymentToken.CardDetails ? 4 : 3;
                        }
                        // @todo: why is this different from CompareIndividualComponent?
                        if (parseInt(templateId, 10) === 7) {
                            this.individual.PaymentMethodId = 2;
                            this.individual.selectedPaymentMethod = 2;
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                        this.searched = true;
                        //this.isSubmissionEDuesEligible(this.$route.query.submissionId);
                    });
            },
            updateIndividualIdApi(id,individual) {
                // this.loading = true;
                let url = '/api/v3/memberforms/admin/submission-update-individual/' + id;
                return axios.post(url,{IndividualId: individual.IndividualId,})
                    .then(response => {
                       console.log(response.data);
                    })
                    .finally(() => {
                        this.loading = false;
                        this.searched = true;
                    });
            },
            getSubmissionValue(key) {
                const data = this.submissionData.find((data) => data.data_name === key);
                return data ? data.data_value : null;
            },
            isSubmissionEDuesEligible(submissionId) {
                let url = '/api/v3/memberforms/admin/is-edues-eligible/' + submissionId;
                return axios.get(url)
                    .then(response => {
                        this.isEduesEligible = response.data.isSubmissionEligibleForEDues;
                    })
                    .finally(() => {
                        this.overlay = false;
                    });
            },
            individualEDuesEnrollment(submissionId, affiliateId, individual) {
                let url = '/api/v3/memberforms/admin/edues-enrollment';
                return axios.post(url, {
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
        }
    }
</script>
