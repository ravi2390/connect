<?php

namespace App\Http\Resources;

class WorkStructureType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'WorkStructureTypeId',
            'WorkStructureTypeName',
        ];
    }
}
