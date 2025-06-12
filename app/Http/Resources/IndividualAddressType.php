<?php

namespace App\Http\Resources;

class IndividualAddressType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualAddressTypeId',
            'IndividualAddressTypeName',
        ];
    }
}
