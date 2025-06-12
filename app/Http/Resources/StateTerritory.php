<?php

namespace App\Http\Resources;

class StateTerritory extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'StateTerritoryId',
            'StateTerritoryName',
            'StateTerritoryCode',
        ];
    }
}
