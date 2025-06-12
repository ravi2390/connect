<?php

namespace App\Http\Resources;

class Region extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'RegionId',
            'RegionName',
            'RegionCode',
        ];
    }
}
