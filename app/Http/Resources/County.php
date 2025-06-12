<?php

namespace App\Http\Resources;

class County extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'CountyId',
            'CountyName',
            'StateTerritoryId',
        ];
    }
}
