<?php

namespace App\Sorts\Employer;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class AffiliateSort
 */
class AffiliateSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('Chapter', function ($query): void {
            $query->on('Chapter.ChapterId', '=', 'Employer.ChapterId');
        });
        $query->leftJoin('Affiliate', function ($query): void {
            $query->on('Affiliate.AffiliateId', '=', 'Chapter.AffiliateId');
        });
        Query::addSelectClause($query->getQuery(), 'Affiliate.AffiliateName');

        $query->orderBy('Affiliate.AffiliateName', $descending ? 'DESC' : 'ASC');
    }
}
