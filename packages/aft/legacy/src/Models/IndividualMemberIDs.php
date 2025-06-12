<?php

namespace Aft\Legacy\Models;

class IndividualMemberIDs extends LegacyModel
{
    public function transform(int $newIndividualId, int $newAffiliateId): array
    {
        $attributes = [];
        $attributes['AffiliateId'] = $newAffiliateId;
        $attributes['IndividualId'] = $newIndividualId;
        $attributes['MemberId'] = $this->MemberId;
        $attributes['CardMailDate'] = $this->CardMailDate;
        $attributes['CardActivationDate'] = $this->CardActivationDate;
        $attributes['CardExpirationDate'] = $this->CardExpireDate;
        $attributes['CardActivationUser'] = $this->CardActivationUser;
        $attributes['CardIssue'] = $this->CardIssue;
        $attributes['CardComments'] = $this->CardComments;
        $attributes['IsReplacementCardRequested'] = $this->ReplacementRequestedTF;
        $attributes['ReplacementCardRequestedDate'] = $this->ReplacementRequestedDate;
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->Mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }
}
