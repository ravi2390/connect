<?php

namespace App\Http\Controllers\Aggregates\Employer;

use App\Http\Controllers\BaseAggregateController;
use App\Http\Resources\Unit;
use App\Models\Employer;
use App\Models\LocalAgreement;

class UnitController extends BaseAggregateController
{
    protected $class = Unit::class;

    protected $returnCollection = true;

    protected function getData($employerId)
    {
        return Employer::with('LocalAgreements', 'LocalAgreements.NonStructuralUnits')->find($employerId)->LocalAgreements()->get()->map(fn(LocalAgreement $localAgreement) => $localAgreement->NonStructuralUnits)->flatten();
    }
}
