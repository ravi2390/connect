<?php

namespace App\Http\Resources;

class MemberIdMapping extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'MemberIdMappingId',
            'IndiviudalId',
            'AffiliateId',
            'MemberId',
            'CardMailDate',
            'CardActivationDate',
            'CardExpirationDate',
            'CardActivationUser',
            'CardIssue',
            'CardComments',
            'IsReplacementCardRequested',
            'ReplacementCardRequestedDate',
            'DigitalCardRequestedDate',
            'DigitalCardRemovedDate',
            'DigitalCardEmailSentDate',
            'DigitalCardInstalledDate',
            'CreatedBy',
            'CreatedAt',
            'UpdatedBy',
            'UpdatedAt',
            'DeletedAt',
        ];
    }
}
