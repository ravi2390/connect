<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class PreferredEmailSort
 */
class IndividualEmployerStartDateSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('IndividualEmployer', function ($query): void {
            $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId')->whereNull('IndividualEmployer.EndDate');
        });
        Query::addSelectClause($query->getQuery(), 'IndividualEmployer.StartDate');

        $query->orderBy('IndividualEmployer.StartDate', $descending ? 'DESC' : 'ASC');
    }
}
