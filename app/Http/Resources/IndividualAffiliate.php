<?php

namespace App\Http\Resources;

use App\Http\Resources\Chapter as ChapterResource;
use App\Http\Resources\IndividualDeactivationReason as IndividualDeactivationReasonResource;
use App\Http\Resources\IndividualEducationLevel as IndividualEducationLevelResource;
use App\Http\Resources\LocalDuesCategory as LocalDuesCategoryResource;
use App\Http\Resources\PaymentFrequency as PaymentFrequencyResource;
use App\Http\Resources\PaymentMethod as PaymentMethodResource;
use App\Http\Resources\UnionRelationshipType as UnionRelationshipTypeResource;

class IndividualAffiliate extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'Affiliate',
            'UnionRelationshipType',
            'Chapter',
            'LocalDuesCategory',
            'IndividualDeactivationReason',
            'individualOfficers',
            'currentIndividualOfficers',
            'pastIndividualOfficers',
            'individualStaff',
            'currentIndividualStaff',
            'pastIndividualStaff',
            'individualCommitteeMember',
            'currentIndividualCommitteeMember',
            'pastIndividualCommitteeMember',
            'individualGroupMember',
            'currentIndividualGroupMember',
            'pastIndividualGroupMember',
            'IndividualEducationLevel',
            'MemberIdMapping',
            'PaymentMethod',
            'PaymentFrequency',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualAffiliateId',
            'IndividualId',
            'HasLiabilityInsurance',
            'StartDate',
            'EndDate',
            'UnionRelationshipTypeId',
            'LocalDuesCategoryId',
            'ChapterId',
            'PaymentMethodId',
            'PaymentFrequencyId',
            'IndividualDeactivationReasonId',
            'IsCurrent',
        ];
    }

    public function includeAffiliate(): \App\Http\Resources\Affiliate
    {
        return new Affiliate($this->Affiliate);
    }

    public function includeUnionRelationshipType(): \App\Http\Resources\UnionRelationshipType
    {
        return new UnionRelationshipTypeResource($this->UnionRelationshipType);
    }

    public function includeChapter(): \App\Http\Resources\Chapter
    {
        return new ChapterResource($this->Chapter);
    }

    public function includeLocalDuesCategory(): \App\Http\Resources\LocalDuesCategory
    {
        return new LocalDuesCategoryResource($this->LocalDuesCategory);
    }

    public function includeIndividualDeactivationReason(): \App\Http\Resources\IndividualDeactivationReason
    {
        return new IndividualDeactivationReasonResource($this->IndividualDeactivationReason);
    }

    public function includeIndividualOfficers()
    {
        return AffiliateOfficer::collection($this->individualOfficers);
    }

    public function includeCurrentIndividualOfficers()
    {
        return AffiliateOfficer::collection($this->currentIndividualOfficers);
    }

    public function includePastIndividualOfficers()
    {
        return AffiliateOfficer::collection($this->pastIndividualOfficers);
    }

    public function includeIndividualStaff()
    {
        return AffiliateStaff::collection($this->individualStaff);
    }

    public function includeCurrentIndividualStaff()
    {
        return AffiliateStaff::collection($this->currentIndividualStaff);
    }

    public function includePastIndividualStaff()
    {
        return AffiliateStaff::collection($this->pastIndividualStaff);
    }

    public function includeIndividualCommitteeMember()
    {
        return AffiliateCommitteeMember::collection($this->individualCommitteeMember);
    }

    public function includeCurrentIndividualCommitteeMember()
    {
        return AffiliateCommitteeMember::collection($this->currentIndividualCommitteeMember);
    }

    public function includePastIndividualCommitteeMember()
    {
        return AffiliateCommitteeMember::collection($this->pastIndividualCommitteeMember);
    }

    public function includeIndividualGroupMember()
    {
        return AffiliateGroupMember::collection($this->individualGroupMember);
    }

    public function includeCurrentIndividualGroupMember()
    {
        return AffiliateGroupMember::collection($this->currentIndividualGroupMember);
    }

    public function includePastIndividualGroupMember()
    {
        return AffiliateGroupMember::collection($this->pastIndividualGroupMember);
    }

    public function includeIndividualEducationLevel(): \App\Http\Resources\IndividualEducationLevel
    {
        return new IndividualEducationLevelResource($this->IndividualEducationLevel);
    }

    public function includeMemberIdMapping()
    {
        return MemberIdMapping::collection($this->memberIdMapping);
    }

    public function includePaymentMethod(): \App\Http\Resources\PaymentMethod
    {
        return new PaymentMethodResource($this->PaymentMethod);
    }

    public function includePaymentFrequency(): \App\Http\Resources\PaymentFrequency
    {
        return new PaymentFrequencyResource($this->PaymentFrequency);
    }
}
