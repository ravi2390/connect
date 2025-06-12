<?php

namespace App\Http\Resources;

use App\Http\Resources\LocalEducationLevel as LocalEducationLevelResource;

class IndividualEducationLevel extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'LocalEducationLevel',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualEducationLevelId',
            'LocalEducationLevelId',
        ];
    }

    protected function includeLocalEducationLevel(): \App\Http\Resources\LocalEducationLevel
    {
        return new LocalEducationLevelResource($this->LocalEducationLevel);
    }
}
