<?php

namespace App\Http\Resources;

class IndividualPhone extends AbstractResource
{
    protected function getSimpleFields(): array
    {
        return [
            'IndividualPhoneId',
            'IndividualId',
            'PhoneNumber',
            'Extension',
            'IsPreferred',
            'CanTextRestrictionId',
            'CanCallRestrictionId',
            'IndividualPhoneTypeId',
            'ContactStatusId',
            'ContactSourceId',
            'fullPhone',
            'CountryId',
        ];
    }

    protected function getRelationshipFields(): array
    {
        return [
            'ContactStatus',
            'ContactSource',
            'IndividualPhoneType',
            'CanCallRestriction',
            'Country',
        ];
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatus($this->ContactStatus);
    }

    protected function includeIndividualPhoneType(): \App\Http\Resources\IndividualPhoneType
    {
        return new IndividualPhoneType($this->IndividualPhoneType);
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSource($this->ContactSource);
    }

    protected function includeCanCallRestriction(): \App\Http\Resources\ContactRestriction
    {
        return new ContactRestriction($this->CanCallRestriction);
    }

    protected function includeCountry(): \App\Http\Resources\Country
    {
        return new Country($this->Country);
    }
}
