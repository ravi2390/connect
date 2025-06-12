<?php

namespace App\Http\Resources;

class AffiliateSocialMedia extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'AffiliateSocialMediaType',
            'ContactStatus',
            'ContactSource',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateSocialMediaId',
            'AffiliateId',
            'URL',
            'AffiliateSocialMediaTypeId',
            'ContactStatusId',
            'ContactSourceId',
        ];
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatus($this->ContactStatus);
    }

    protected function includeAffiliateSocialMediaType(): \App\Http\Resources\AffiliateSocialMediaType
    {
        return new AffiliateSocialMediaType($this->AffiliateSocialMediaType);
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSource($this->ContactSource);
    }
}
