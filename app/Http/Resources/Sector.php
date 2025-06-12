<?php

namespace App\Http\Resources;

class Sector extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            '',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'SectorId',
            'SectorName',
            'DisplayOrder',
        ];
    }
}
