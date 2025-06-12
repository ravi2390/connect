<?php

namespace App\Http\Resources;

class AffiliatePhone extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'ContactStatus',
            'ContactSource',
            'AffiliatePhoneType',
            'CanTextRestriction',
            'CanCallRestriction',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliatePhoneId',
            'AffiliateId',
            'PhoneNumber',
            'Extension',
            'CanText',
            'AffiliatePhoneTypeId',
            'ContactStatusId',
            'IsPreferred',
            'ContactSourceId',
            'fullPhone',
            'CanTextRestrictionId',
            'CanCallRestrictionId',
        ];
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatus($this->ContactStatus);
    }

    protected function includeAffiliatePhoneType(): \App\Http\Resources\AffiliatePhoneType
    {
        return new AffiliatePhoneType($this->AffiliatePhoneType);
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSource($this->ContactSource);
    }

    protected function includeCanTextRestriction(): \App\Http\Resources\ContactRestriction
    {
        return new ContactRestriction($this->CanTextRestriction);
    }

    protected function includeCanCallRestriction(): \App\Http\Resources\ContactRestriction
    {
        return new ContactRestriction($this->CanCallRestriction);
    }
}
