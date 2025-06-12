<?php

namespace App\Http\Resources;

class EmployerAddressType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'EmployerAddressTypeId',
            'EmployerAddressTypeName',
        ];
    }
}
