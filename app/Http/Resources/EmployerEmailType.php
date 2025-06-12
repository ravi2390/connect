<?php

namespace App\Http\Resources;

class EmployerEmailType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'EmployerEmailTypeId',
            'EmployerEmailTypeName',
        ];
    }
}
