<?php

namespace App\Http\Resources;

class AffiliateCommitteeMember extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'AffiliateCommittee',
            'CommitteeMemberType',
            'Individual',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateCommitteeMemberId',
            'AffiliateCommitteeId',
            'CommitteeMemberTypeId',
            'StartDate',
            'EndDate',
        ];
    }

    protected function includeAffiliateCommittee(): \App\Http\Resources\AffiliateCommittee
    {
        return new AffiliateCommittee($this->AffiliateCommittee);
    }

    protected function includeCommitteeMemberType(): \App\Http\Resources\CommitteeMemberType
    {
        return new CommitteeMemberType($this->CommitteeMemberType);
    }

    protected function includeIndividual(): \App\Http\Resources\Individual
    {
        return new Individual($this->Individual);
    }
}
