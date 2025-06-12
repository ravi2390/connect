<?php

namespace App\Models\Traits;

use App\Models\FiduciaryBondCoverage;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait AffiliatePerCapita
{
    public function FiduciaryBondCoverage(): HasOne
    {
        return $this->hasOne(FiduciaryBondCoverage::class, 'FiduciaryBondCoverageId', 'CurrentFiduciaryBondCoverageId');
    }
}
