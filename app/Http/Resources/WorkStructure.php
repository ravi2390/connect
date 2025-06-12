<?php

namespace App\Http\Resources;

use App\Http\Resources\WorkStructure as WorkStructureResource;
use App\Http\Resources\WorkStructureType as WorkStructureTypeResource;

class WorkStructure extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'WorkStructureType',
            'ParentWorkStructure',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'WorkStructureId',
            'WorkStructureName',
            'WorkStructureCode',
            'WorkStructureTypeId',
            'ParentWorkStructureId',
        ];
    }

    protected function includeWorkStructureType(): \App\Http\Resources\WorkStructureType
    {
        return new WorkStructureTypeResource($this->WorkStructureType);
    }

    protected function includeParentWorkStructure(): \App\Http\Resources\WorkStructure
    {
        return new WorkStructureResource($this->ParentWorkStructure);
    }
}
