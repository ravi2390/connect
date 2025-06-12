<?php

namespace App\Models\Traits;

trait AffiliateSector
{
    public function scopeByAffiliate($query, int $affiliateId)
    {
        return $query->where('AffiliateId', $affiliateId);
    }
}
