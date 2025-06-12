<?php

namespace App\Http\Resources;

class EmployerType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'EmployerTypeId',
            'EmployerTypeName',
        ];
    }
}
