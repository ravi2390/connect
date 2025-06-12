<?php

namespace App\Http\Resources;

class WorkLocationType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'WorkLocationTypeId',
            'WorkLocationTypeName',
        ];
    }
}
