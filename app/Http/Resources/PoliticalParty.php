<?php

namespace App\Http\Resources;

class PoliticalParty extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'PoliticalPartyId',
            'PoliticalPartyName',
        ];
    }
}
