<?php

namespace App\Http\Resources;

class PaymentFrequency extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'PaymentFrequencyId',
            'PaymentFrequencyName',
        ];
    }
}
