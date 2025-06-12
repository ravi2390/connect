<?php

namespace App\Http\Resources;

use App\Http\Resources\ContactSource as ContactSourceResource;

class EmployerEmail extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'EmployerEmailType',
            'ContactSource',
            'ContactStatus',
            'CanContactRestriction',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'EmployerEmailId',
            'Email',
            'EmployerEmailTypeId',
            'EmployerId',
            'ContactStatusId',
            'IsPreferred',
            'ContactSourceId',
            'CanContact',
            'CanContactRestrictionId',

        ];
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSourceResource($this->ContactSource);
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatus($this->ContactStatus);
    }

    protected function includeEmployerEmailType(): \App\Http\Resources\EmployerEmailType
    {
        return new EmployerEmailType($this->EmployerEmailType);
    }

    protected function includeCanContactRestriction(): \App\Http\Resources\ContactRestriction
    {
        return new ContactRestriction($this->CanContactRestriction);
    }
}
