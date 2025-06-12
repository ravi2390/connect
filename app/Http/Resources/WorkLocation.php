<?php

namespace App\Http\Resources;

use App\Http\Resources\WorkLocation as WorkLocationResource;
use App\Http\Resources\WorkLocationType as WorkLocationTypeResource;

/**
 * Class WorkLocation
 */
class WorkLocation extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'ParentWorkLocation',
            'WorkLocationType',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'WorkLocationId',
            'WorkLocationName',
            'WorkLocationCode',
            'WorkLocationArea',
            'WorkLocationTypeId',
            'ParentWorkLocationId',
        ];
    }

    protected function includeParentWorkLocation(): WorkLocationResource
    {
        return new WorkLocationResource($this->ParentWorkLocation);
    }

    protected function includeWorkLocationType(): WorkLocationTypeResource
    {
        return new WorkLocationTypeResource($this->WorkLocationType);
    }
}
