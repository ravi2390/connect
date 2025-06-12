<?php

namespace App\Http\Resources;

use App\Http\Resources\PoliticalParty as PoliticalPartyResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class Individual extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'individualAddresses',
            'individualAffiliates',
            'individualEmployers',
            'activeIndividualEmployers',
            'individualEmails',
            'individualMembers',
            'individualPhones',
            'individualSocialmedia',
            'individualQuickComments',
            'individualCope',
            'individualAssessments',
            'individualEducationLevels',
            'Gender',
            'Prefix',
            'Suffix',
            'MaritalStatus',
            'activeIndividualAffiliates',
            'inActiveIndividualAffiliates',
            'lastDeactivatedIndividualAffiliate',
            'individualAddressesOrdered',
            'individualEmailsOrdered',
            'individualPhonesOrdered',
            'PoliticalParty',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualId',
            'IndividualGuid',
            'FirstName',
            'LastName',
            'MiddleName',
            'FullName',
            'PreviousName',
            'PreferredName',
            'Dependents',
            'DayOfBirth',
            'YearOfBirth',
            'MonthOfBirth',
            'MonthOfBirth',
            'IsPoliticallyActive',
            'IsRegisteredVoter',
            'GenderId',
            'PrefixId',
            'SuffixId',
            'MaritalStatusId',
            'Dependents',
            'DayOfBirth',
            'MonthOfBirth',
            'YearOfBirth',
            'AffiliateAssignedId',
            'BillhighwayId',
            'IsPoliticallyActive',
            'IsRegisteredVoter',
            'VoterPrecinct',
            'Township',
            'Ward',
            'CongressionalDistrict',
            'StateSenateDistrict',
            'StateHouseDistrict',
            'ResidentialSchoolDistrict',
        ];
    }

    protected function includeIndividualAddresses(): AnonymousResourceCollection
    {
        return IndividualAddress::collection($this->individualAddresses);
    }

    protected function includeIndividualAffiliates(): AnonymousResourceCollection
    {
        return IndividualAffiliate::collection($this->individualAffiliates->sortByDesc('EndDate'));
    }

    protected function includeIndividualEmployers(): AnonymousResourceCollection
    {
        return IndividualEmployer::collection($this->individualEmployers->sortByDesc('CreatedAt'));
    }

    protected function includeActiveIndividualEmployers(): AnonymousResourceCollection
    {
        return IndividualEmployer::collection($this->activeIndividualEmployers);
    }

    protected function includeIndividualMembers(): AnonymousResourceCollection
    {
        return MemberIdMapping::collection($this->individualMembers);
    }

    protected function includeIndividualEmails(): AnonymousResourceCollection
    {
        return IndividualEmail::collection($this->individualEmails);
    }

    protected function includeIndividualPhones(): AnonymousResourceCollection
    {
        return IndividualPhone::collection($this->individualPhones);
    }

    protected function includeIndividualSocialMedia(): AnonymousResourceCollection
    {
        return IndividualSocialMedia::collection($this->individualSocialmedia);
    }

    protected function includeIndividualQuickComments(): AnonymousResourceCollection
    {
        return IndividualQuickComment::collection($this->individualQuickComments);
    }

    protected function includeIndividualCope(): AnonymousResourceCollection
    {
        return IndividualCope::collection($this->individualCope);
    }

    protected function includeIndividualAssessments(): AnonymousResourceCollection
    {
        return IndividualAssessment::collection($this->individualAssessments);
    }

    protected function includeIndividualEducationLevels(): AnonymousResourceCollection
    {
        return IndividualEducationLevel::collection($this->individualEducationLevels);
    }

    protected function includeGender(): Gender
    {
        return new Gender($this->Gender);
    }

    protected function includePrefix(): Prefix
    {
        return new Prefix($this->Prefix);
    }

    protected function includeSuffix(): Suffix
    {
        return new Suffix($this->Suffix);
    }

    protected function includeMaritalStatus(): MaritalStatus
    {
        return new MaritalStatus($this->MaritalStatus);
    }

    protected function includeActiveIndividualAffiliates(): AnonymousResourceCollection
    {
        return IndividualAffiliate::collection($this->activeIndividualAffiliates->sortByDesc('EndDate'));
    }

    protected function includeInActiveIndividualAffiliates(): AnonymousResourceCollection
    {
        return IndividualAffiliate::collection($this->inActiveIndividualAffiliates->sortByDesc('EndDate'));
    }

    protected function includeIndividualAddressesOrdered(): AnonymousResourceCollection
    {
        return IndividualAddress::collection($this->individualAddressesOrdered);
    }

    protected function includeIndividualPhonesOrdered(): AnonymousResourceCollection
    {
        return IndividualPhone::collection($this->individualPhonesOrdered);
    }

    protected function includeIndividualEmailsOrdered(): AnonymousResourceCollection
    {
        return IndividualEmail::collection($this->individualEmailsOrdered);
    }

    public function includePoliticalParty(): PoliticalPartyResource
    {
        return new PoliticalPartyResource($this->PoliticalParty);
    }

    #[\Override]
    protected function exportCell($fieldName)
    {
        $address = $this->individualAddressesOrdered->first();
        switch ($fieldName) {
            case 'FullName':
                return $this->FirstName.' '.$this->LastName;
            case 'HomeEmail.Email':
                $response = [];
                foreach ($this->individualEmailsOrdered as $email) {
                    if ($email->IndividualEmailTypeId == 1) {
                        $response[] = $email->Email;
                        break;
                    }
                }

                return implode(', ', $response);
            case 'WorkEmail.Email':
                $response = [];
                foreach ($this->individualEmailsOrdered as $email) {
                    if ($email->IndividualEmailTypeId == 2) {
                        $response[] = $email->Email;
                        break;
                    }
                }

                return implode(', ', $response);
            case 'activeIndividualAffiliates':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    $response[] = $individualAffiliate->Affiliate->AffiliateNumber;
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.ChapterName':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $response[] = $activeIndividualEmployers->Employer?->Chapter?->ChapterName;
                }

                return implode(', ', array_filter($response));
            case 'individualMembers':
                $response = [];
                foreach ($this->individualMembers as $individualMember) {
                    $response[] = $individualMember->MemberId;
                }

                return implode(', ', $response);
            case 'activeIndividualAffiliates.LocalDuesCategory':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    $response[] = $individualAffiliate->LocalDuesCategory?->LocalDuesCategoryName;
                }

                return implode(', ', $response);
            case 'activeIndividualAffiliates.LocalDuesAmount':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    if (! is_null($individualAffiliate->LocalDuesCategory)) {
                        if (! is_null($individualAffiliate->LocalDuesCategory->LocalDuesAmount)) {
                            $response[] = '$'.$individualAffiliate->LocalDuesCategory?->LocalDuesAmount;
                        }
                        if (! is_null($individualAffiliate->LocalDuesCategory->LocalDuesPercentage)) {
                            $response[] = $individualAffiliate->LocalDuesCategory?->LocalDuesPercentage.'%';
                        }
                    }
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.EmployeeId':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $response[] = $activeIndividualEmployers->EmployeeId;
                }

                return implode(', ', $response);
            case 'activeIndividualAffiliates.UnionRelationshipType':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    $response[] = $individualAffiliate->UnionRelationshipType->UnionRelationshipTypeName;
                }

                return implode(', ', $response);
            case 'activeIndividualAffiliates.individualCommitteeMember':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    if ($individualAffiliate->individualCommitteeMember) {
                        foreach ($individualAffiliate->individualCommitteeMember as $individualCommitteeMember) {
                            if ($individualCommitteeMember->AffiliateCommittee) {
                                $response[] = $individualCommitteeMember->AffiliateCommittee->AffiliateCommitteeName;
                            }
                        }
                    }
                }

                return implode(', ', array_values($response));
            case 'activeIndividualAffiliates.CommitteeMemberTypeName':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    if ($individualAffiliate->individualCommitteeMember) {
                        foreach ($individualAffiliate->individualCommitteeMember as $individualCommitteeMember) {
                            if ($individualCommitteeMember->CommitteeMemberType) {
                                $response[] = $individualCommitteeMember->CommitteeMemberType->CommitteeMemberTypeName;
                            }
                        }
                    }
                }

                return implode(', ', array_values($response));
            case 'activeIndividualAffiliates.PaymentMethod':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    $response[] = $individualAffiliate->PaymentMethod?->PaymentMethodName;
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.WorkLocation':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $workLocation = optional($activeIndividualEmployers->WorkLocation);
                    $e = $workLocation->WorkLocationName;
                    $parentWorkLocation = optional($workLocation->ParentWorkLocation);
                    $e .= ' '.$parentWorkLocation->WorkLocationType?->WorkLocationTypeName
                         .' '.$parentWorkLocation->WorkLocationName;
                    $parentParentWorkLocation = optional($parentWorkLocation->ParentWorkLocation);
                    $e .= ' '.$parentParentWorkLocation->WorkLocationType?->WorkLocationTypeName
                         .' '.$parentParentWorkLocation->WorkLocationName;
                    $response[] = $e;
                }

                return implode(',', $response);
            case 'activeIndividualEmployers.WorkStructure':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $workStructure = optional($activeIndividualEmployers->WorkStructure);
                    $e = $workStructure->WorkStructureType?->WorkStructureTypeName
                        .' :'.$workStructure->WorkStructureName;
                    $parentWorkStructure = optional($workStructure->ParentWorkStructure);
                    if ($workStructure->ParentWorkStructure) {
                        $e .= ' | ';
                        $e .= $parentWorkStructure->WorkStructureType?->WorkStructureTypeName
                        .' :'.$parentWorkStructure->WorkStructureName;
                    }
                    $parentParentWorkStructure = optional($parentWorkStructure->ParentWorkStructure);
                    if ($parentWorkStructure->ParentWorkStructure) {
                        $e .= ' | ';
                        $e .= $parentParentWorkStructure->WorkStructureType?->WorkStructureTypeName
                        .' :'.$parentParentWorkStructure->WorkStructureName;
                    }

                    $response[] = $e;
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.EmployerName':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $response[] = $activeIndividualEmployers->EmployerName;
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.EmploymentStartDate':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $response[] = $this->formatDate($activeIndividualEmployers->EmploymentStartDate);
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.EmploymentEndDate':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $response[] = $this->formatDate($activeIndividualEmployers->EmploymentEndDate);
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.Unit':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    if ($activeIndividualEmployers->LocalJobClass && $activeIndividualEmployers->LocalJobClass->Unit) {
                        $response[] = $activeIndividualEmployers->LocalJobClass->Unit->UnitName;
                    }
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.NationalJobClass':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    if ($activeIndividualEmployers->LocalJobClass && $activeIndividualEmployers->LocalJobClass->NationalJobClass) {
                        $response[] = $activeIndividualEmployers->LocalJobClass->NationalJobClass->NationalJobClassName;
                    }
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.LocalJobClassName':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $response[] = $activeIndividualEmployers->LocalJobClass?->LocalJobClassName;
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.JobTitle':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $response[] = $activeIndividualEmployers->JobTitle?->JobTitleName;
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.JobDescription':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $response[] = $activeIndividualEmployers->JobDescription;
                }

                return implode(', ', $response);
            case 'individualAssessments.Rating':
                $lastContactDate = null;
                $rating = '';
                foreach ($this->individualAssessments as $assessment) {
                    if (empty($lastContactDate) || $lastContactDate < $assessment->ContactDate) {
                        $lastContactDate = $assessment->ContactDate;
                        $rating = $assessment->Rating;
                    }
                }

                return $rating;
            case 'individualQuickComments.CommentDate':
                $lastContactDate = null;
                if ($this->individualQuickComments) {
                    foreach ($this->individualQuickComments as $IndividualQuickComments) {
                        if (empty($lastContactDate) || $lastContactDate < $IndividualQuickComments->CommentDate) {
                            $lastContactDate = $IndividualQuickComments->CommentDate;
                        }
                    }
                }
                return empty($lastContactDate) ? '' : $this->formatDateString($lastContactDate);
            case 'activeIndividualAffiliates.AffiliateOfficerRoleName':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    foreach ($individualAffiliate->individualOfficers as $officers) {
                        if (! empty($officers->AffiliateOfficerRole->AffiliateOfficerRoleName)) {
                            $response[$officers->AffiliateOfficerRoleId] = $officers->AffiliateOfficerRole->AffiliateOfficerRoleName;
                        }
                    }
                }

                return implode(', ', array_values($response));
            case 'activeIndividualAffiliates.StaffTitle':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    foreach ($individualAffiliate->individualStaff as $individualStaff) {
                        $response[] = $individualStaff->StaffTitle;
                    }
                }

                return implode(', ', $response);
            case 'individualCope':
                return $this->individualCope->count() ? 'Yes' : 'No';
            case 'activeIndividualAffiliates.IsCurrent':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    $response[] = $individualAffiliate->IsCurrent ? 'Yes' : 'No';
                }

                return implode(', ', $response);
            case 'HomePhone.PhoneNumber':
                $response = [];
                foreach ($this->individualPhonesOrdered as $phone) {
                    if ($phone->IndividualPhoneTypeId == 1) {
                        $response[] = $phone->fullPhone;
                        break;
                    }
                }

                return implode(', ', $response);
            case 'MobilePhone.PhoneNumber':
                $response = [];
                foreach ($this->individualPhonesOrdered as $phone) {
                    if ($phone->IndividualPhoneTypeId == 3) {
                        $response[] = $phone->fullPhone;
                        break;
                    }
                }

                return implode(', ', $response);
            case 'PreferredAddress.AddressLine':
                $response = '';
                if ($address) {
                    if (isset($address->AddressLine1) && ! empty($address->AddressLine1)) {
                        $response .= trim($address->AddressLine1).', ';
                    }
                    if (isset($address->AddressLine2) && ! empty($address->AddressLine2)) {
                        $response .= trim($address->AddressLine2).', ';
                    }
                    if (isset($address->City) && ! empty($address->City)) {
                        $response .= trim($address->City).', ';
                    }
                    if (isset($address->StateTerritory) && ! empty($address->StateTerritory)) {
                        $response .= trim($address->StateTerritory->StateTerritoryCode).', ';
                    }
                    if ($address) {
                        $response .= trim($address->PostalCode);
                    }
                }

                return $response;
            case 'PreferredAddress.AddressLine1':
                $response = '';
                if ($address && (isset($address->AddressLine1) && ! empty($address->AddressLine1))) {
                    $response = trim($address->AddressLine1);
                }

                return $response;
            case 'PreferredAddress.AddressLine2':
                $response = '';
                if ($address && (isset($address->AddressLine2) && ! empty($address->AddressLine2))) {
                    $response = trim($address->AddressLine2);
                }

                return $response;
            case 'PreferredAddress.City':
                $response = '';
                if ($address && (isset($address->City) && ! empty($address->City))) {
                    $response = trim($address->City);
                }

                return $response;
            case 'PreferredAddress.StateTerritoryCode':
                $response = '';
                if ($address && (isset($address->StateTerritory) && ! empty($address->StateTerritory))) {
                    $response = trim($address->StateTerritory->StateTerritoryCode);
                }

                return $response;
            case 'PreferredAddress.PostalCode':
                $response = '';
                $address = $this->individualAddressesOrdered->first();
                if ($address) {
                    $response = trim($address->PostalCode);
                }

                return $response;
            case 'activeIndividualEmployers.StartDate':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $response[] = $activeIndividualEmployers->StartDate;
                }

                return implode(', ', $response);
            case 'activeIndividualEmployers.EndDate':
                $response = [];
                foreach ($this->activeIndividualEmployers as $activeIndividualEmployers) {
                    $response[] = $activeIndividualEmployers->EndDate;
                }

                return implode(', ', $response);
            case 'activeIndividualAffiliates.individualGroupMember':
                $response = [];
                foreach ($this->activeIndividualAffiliates as $individualAffiliate) {
                    foreach ($individualAffiliate->individualGroupMember as $individualGroupMember) {
                        $response[] = $individualGroupMember->AffiliateGroup->AffiliateGroupName;
                    }
                }

                return implode(', ', $response);
            default:
                return parent::exportCell($fieldName);
        }
    }

    protected function includeLastDeactivatedIndividualAffiliate(): AnonymousResourceCollection
    {
        return IndividualAffiliate::collection($this->lastDeactivatedIndividualAffiliate);
    }
}
