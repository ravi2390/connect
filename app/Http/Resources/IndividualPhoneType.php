<?php

namespace App\Http\Resources;

class IndividualPhoneType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualPhoneTypeId',
            'IndividualPhoneTypeName',
        ];
    }
}
