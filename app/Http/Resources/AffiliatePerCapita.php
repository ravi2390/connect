<?php

namespace App\Http\Resources;

use App\Http\Resources\FiduciaryBondCoverage as FiduciaryBondCoverageResource;

class AffiliatePerCapita extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'FiduciaryBondCoverage',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'FiscalYearEndMonth',
            'FiscalYearEndDay',
            'PayPerCapitaToAFT',
            'InvoicedByAFT',
            'IncludeStatePerCapita',
            'IncludeAFLCIOPerCapita',
            'AffiliateBillingFrequencyId',
            'HasOccupationalLiabilityInsurance',
            'AccidentInsuranceUnits',
            'HasCope',
            'HasPIPE',
            'IsDirectBargaining',
            'ConventionDelegationEligibility',
            'HasStateWebAccess',
            'CurrentFiduciaryBondCoverageId',
            'RequestedFiduciaryBondCoverageId',
        ];
    }

    public function includeFiduciaryBondCoverage(): \App\Http\Resources\FiduciaryBondCoverage
    {
        return new FiduciaryBondCoverageResource($this->FiduciaryBondCoverage);
    }
}
