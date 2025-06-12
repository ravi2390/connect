<?php

namespace App\Http\Resources;

use App\Http\Resources\CommitteeType as CommitteeTypeResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AffiliateCommittee extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'CommitteeType',
            'affiliateCommitteeMember',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateCommitteeId',
            'AffiliateCommitteeName',
            'AffiliateId',
            'CommitteeTypeId',
            'Description',
            'CreatedBy',
            'UpdatedBy',
            'DeletedAt',
        ];
    }

    protected function includeCommitteeType(): \App\Http\Resources\CommitteeType
    {
        return new CommitteeTypeResource($this->CommitteeType);
    }

    protected function includeAffiliateCommitteeMember(): AnonymousResourceCollection
    {
        return AffiliateCommitteeMember::collection($this->affiliateCommitteeMember);
    }
}
