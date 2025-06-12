<?php

namespace App\Http\Resources;

use App\Http\Resources\ContactSource as ContactSourceResource;
use App\Http\Resources\ContactStatus as ContactStatusResource;
use App\Http\Resources\StateTerritory as StateTerritoryResource;

class EmployerAddress extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'ContactSource',
            'StateTerritory',
            'ContactStatus',
            'EmployerAddressType',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'EmployerAddressId',
            'EmployerId',
            'AddressLine1',
            'AddressLine2',
            'City',
            'PostalCode',
            'StateTerritoryId',
            'IsPreferred',
            'EmployerAddressTypeId',
            'ContactStatusId',
            'ContactSourceId',
        ];
    }

    protected function includeStateTerritory(): \App\Http\Resources\StateTerritory
    {
        return new StateTerritoryResource($this->StateTerritory);
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSourceResource($this->ContactSource);
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatusResource($this->ContactStatus);
    }

    protected function includeEmployerAddressType(): \App\Http\Resources\EmployerAddressType
    {
        return new EmployerAddressType($this->EmployerAddressType);
    }
}
