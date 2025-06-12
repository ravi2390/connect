<?php

namespace App\Models\Traits;

use Carbon\Carbon;

trait AffiliateCommitteeMember
{
    public function scopeCurrent($query)
    {
        return $query->whereNull('EndDate')->orWhere('EndDate', '>', Carbon::now()->startOfDay())->where('StartDate', '<', Carbon::now()->startOfDay());
    }

    public function scopePast($query)
    {
        return $query->whereNull('EndDate')->orWhere('EndDate', '>', Carbon::now()->startOfDay())->orWhere('EndDate', '<', Carbon::now()->startOfDay())->where('StartDate', '<', Carbon::now()->startOfDay());
    }
}
