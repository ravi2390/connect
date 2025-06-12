<?php

namespace App\Http\Resources;

use App\Http\Resources\NationalPerCapita as NationalPerCapitaResource;
use App\Http\Resources\PaymentFrequency as PaymentFrequencyResource;
use App\Http\Resources\StatePerCapita as StatePerCapitaResource;

class LocalDuesCategory extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'StatePerCapita',
            'NationalPerCapita',
            'PaymentFrequency',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'LocalDuesCategoryId',
            'LocalDuesCategoryName',
            'AffiliateId',
            'LocalDuesAmount',
            'LocalDuesPercentage',
            'StartDate',
            'EndDate',
            'ActiveIndividuals',
        ];
    }

    protected function includeStatePerCapita(): \App\Http\Resources\StatePerCapita
    {
        return new StatePerCapitaResource($this->StatePerCapita);
    }

    protected function includeNationalPerCapita(): \App\Http\Resources\NationalPerCapita
    {
        return new NationalPerCapitaResource($this->NationalPerCapita);
    }

    protected function includePaymentFrequency(): \App\Http\Resources\PaymentFrequency
    {
        return new PaymentFrequencyResource($this->PaymentFrequency);
    }
}
