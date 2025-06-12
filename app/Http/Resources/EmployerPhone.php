<?php

namespace App\Http\Resources;

use App\Http\Resources\ContactSource as ContactSourceResource;

class EmployerPhone extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'ContactStatus',
            'ContactSource',
            'EmployerPhoneType',
            'CanTextRestriction',
            'CanCallRestriction',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'EmployerPhoneId',
            'PhoneNumber',
            'IsPreferred',
            'ContactSourceId',
            'EmployerId',
            'Extension',
            'CanText',
            'EmployerPhoneTypeId',
            'ContactStatusId',
            'fullphone',
            'CanTextRestrictionId',
            'CanCallRestrictionId',
        ];
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatus($this->ContactStatus);
    }

    protected function includeEmployerPhoneType(): \App\Http\Resources\EmployerPhoneType
    {
        return new EmployerPhoneType($this->EmployerPhoneType);
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSourceResource($this->ContactSource);
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
