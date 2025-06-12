<?php

namespace App\Http\Resources;

class NationalPerCapita extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'NationalPerCapitaId',
            'NationalPerCapitaName',
        ];
    }
}
