<?php

namespace App\Http\Resources;

class IndividualSocialMedia extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'IndividualSocialMediaType',
            'ContactStatus',
            'ContactSource',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualSocialMediaId',
            'IndiviudalId',
            'URL',
            'IndividualSocialMediaTypeId',
            'ContactStatusId',
            'ContactSourceId',
        ];
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatus($this->ContactStatus);
    }

    protected function includeIndividualSocialMediaType(): \App\Http\Resources\IndividualSocialMediaType
    {
        return new IndividualSocialMediaType($this->IndividualSocialMediaType);
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSource($this->ContactSource);
    }
}
