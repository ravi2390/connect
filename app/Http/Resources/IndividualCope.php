<?php

namespace App\Http\Resources;

class IndividualCope extends AbstractResource
{
    protected function getSimpleFields(): array
    {
        return [
            'IndividualCopeId',
            'IndividualId',
            'AffiliateId',
            'CopeAmount',
            'CopePaymentFrequencyId',
            'CopePaymentMethodId',
            'BillHighwayId',
            'CopePaymentFrequency',
            'CopePaymentMethod',
        ];
    }

    protected function getRelationshipFields(): array
    {
        return [

        ];
    }
}
