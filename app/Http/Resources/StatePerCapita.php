<?php

namespace App\Http\Resources;

class StatePerCapita extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'StatePerCapitaId',
            'StatePerCapitaName',
            'NationalDuesCategoryId',
            'AffiliateId',
            'PaymentFrequencyId',
        ];
    }
}
