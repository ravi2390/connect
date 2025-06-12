<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

interface CustomAffiliateFilter
{
    public function filterByAffiliate(Builder $query, array $affiliates);
}
