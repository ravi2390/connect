<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\JoinFinder;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class PreferredEmailSort
 */
class IndividualEmployerSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'IndividualEmployer')) {
            $query->leftJoin('IndividualEmployer', function ($query): void {
                $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId')->whereNull('IndividualEmployer.EndDate');
            });
        }

        Query::addSelectClause($query->getQuery(), 'IndividualEmployer.EmployeeId');

        $query->orderBy('IndividualEmployer.EmployeeId', $descending ? 'DESC' : 'ASC');
    }
}
