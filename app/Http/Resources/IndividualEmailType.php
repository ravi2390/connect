<?php

namespace App\Http\Resources;

class IndividualEmailType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualEmailTypeId',
            'IndividualEmailTypeName',
        ];
    }
}
