<?php

namespace App\Models\Traits;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

trait AffiliateStaff
{
    public function scopeCurrent($query)
    {
        return $query->where('TermStartDate', '<=', Carbon::now()->startOfDay())->whereNull('TermEndDate')->orWhere(function ($queryTermEndDateNotNull): void {
            $queryTermEndDateNotNull->whereNotNull('TermEndDate')
                ->where('TermEndDate', '>', Carbon::now()->startOfDay())
                ->where('TermStartDate', '<=', Carbon::now()->startOfDay());
        });
    }

    protected static function boot()
    {
        parent::boot();

        self::deleting(function ($modal): void {
            $modal->UpdatedBy = Auth::user()->id;
            $modal->save();
        });
    }

    public function scopePast($query)
    {
        return $query->whereNull('TermEndDate')->orWhere('TermEndDate', '>', Carbon::now()->startOfDay())->orWhere('TermEndDate', '<', Carbon::now()->startOfDay())->where('TermStartDate', '<', Carbon::now()->startOfDay());
    }
}
