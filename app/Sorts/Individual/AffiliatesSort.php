<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class
 */
class AffiliatesSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId');

        $query->leftJoin('Affiliate', function ($query): void {
            $query->on('Affiliate.AffiliateId', '=', 'IndividualAffiliate.AffiliateId');
        });

        Query::addSelectClause($query->getQuery(), 'Affiliate.AffiliateNumber');

        $query->orderBy('Affiliate.AffiliateNumber', $descending ? 'DESC' : 'ASC');
    }
}
