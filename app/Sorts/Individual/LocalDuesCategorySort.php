<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class PreferredEmailSort
 */
class LocalDuesCategorySort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId');

        $query->leftJoin('LocalDuesCategory', function ($query): void {
            $query->on('LocalDuesCategory.LocalDuesCategoryId', '=', 'IndividualAffiliate.LocalDuesCategoryId');
        });

        Query::addSelectClause($query->getQuery(), 'LocalDuesCategory.LocalDuesCategoryName');

        $query->orderBy('LocalDuesCategory.LocalDuesCategoryName', $descending ? 'DESC' : 'ASC');
    }
}
