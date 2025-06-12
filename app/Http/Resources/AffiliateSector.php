<?php

namespace App\Http\Resources;

class AffiliateSector extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'Sector',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateId',
            'SectorId',
        ];
    }

    protected function includeSector(): \App\Http\Resources\Sector
    {
        return new Sector($this->Sector);
    }
}
