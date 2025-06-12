<?php

namespace App\Models\Traits;

use Carbon\Carbon;

trait IndividualEmployer
{
    public function scopeCurrent($query)
    {
        return $query
            ->where('IndividualEmployer.StartDate', '<=', Carbon::today())
            ->where(function ($query): void {
                $query->where('IndividualEmployer.EndDate', '>=', Carbon::today())
                    ->orWhereNull('IndividualEmployer.EndDate');
            });
    }
}
