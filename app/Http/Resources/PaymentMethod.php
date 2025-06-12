<?php

namespace App\Http\Resources;

class PaymentMethod extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'PaymentMethodId',
            'PaymentMethodName',
        ];
    }
}
