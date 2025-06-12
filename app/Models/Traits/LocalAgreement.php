<?php

namespace App\Models\Traits;

use App\Models\Unit;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait LocalAgreement
{
    public function Units(): HasMany
    {
        return $this->hasMany(Unit::class, 'LocalAgreementId', 'LocalAgreementId');
    }

    public function NonStructuralUnits(): HasMany
    {
        return $this->hasMany(Unit::class, 'LocalAgreementId', 'LocalAgreementId')->nonStructural();
    }
}
