<?php

namespace App\Http\Resources;

class AffiliateEmail extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

            'AffiliateEmailType',
            'ContactSource',
            'ContactStatus',
            'CanContactRestriction',

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateEmailId',
            'AffiliateId',
            'Email',
            'AffiliateEmailTypeId',
            'ContactStatusId',
            'IsPreferred',
            'ContactSourceId',
            'CanContact',
            'CanContactRestrictionId',
        ];
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatus($this->ContactStatus);
    }

    protected function includeAffiliateEmailType(): \App\Http\Resources\AffiliateEmailType
    {
        return new AffiliateEmailType($this->AffiliateEmailType);
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSource($this->ContactSource);
    }

    protected function includeCanContactRestriction(): \App\Http\Resources\ContactRestriction
    {
        return new ContactRestriction($this->CanContactRestriction);
    }
}
