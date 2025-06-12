<?php

namespace App\Http\Controllers\Custom;

use App\Filters\UnionRelationshipType\AffiliateFilter;
use App\Http\Controllers\UnionRelationshipTypeController as BaseController;
use Spatie\QueryBuilder\AllowedFilter;

class UnionRelationshipTypeController extends BaseController
{
    protected function getFilterMapping(string $filter): ?AllowedFilter
    {
        if ($filter === 'Affiliate') {
            return AllowedFilter::custom($filter, new AffiliateFilter(), 'Affiliate');
        }

        return parent::getFilterMapping($filter);
    }
}
