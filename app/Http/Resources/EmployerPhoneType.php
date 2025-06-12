<?php

namespace App\Http\Resources;

class EmployerPhoneType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'EmployerPhoneTypeId',
            'EmployerPhoneTypeName',
        ];
    }
}
